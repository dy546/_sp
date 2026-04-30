/*
 * ============================================================================
 * Unix System Calls Demo: fork, execvp, open, close, read, write, dup2
 * and Standard File Descriptors: stdin(0), stdout(1), stderr(2)
 * ============================================================================
 *
 * TABLE OF CONTENTS:
 *   1. Standard File Descriptors (0, 1, 2)
 *   2. open() / close()
 *   3. read() / write()
 *   4. fork() + execvp()
 *   5. dup2() - I/O redirection
 *   6. Putting it all together: a tiny shell
 */

#include <fcntl.h>      /* open(), O_RDONLY, O_WRONLY, O_CREAT, ... */
#include <stdio.h>      /* perror() */
#include <stdlib.h>     /* exit() */
#include <string.h>     /* strlen() */
#include <sys/wait.h>   /* waitpid() */
#include <unistd.h>     /* fork, execvp, close, read, write, dup2,
                           STDIN_FILENO, STDOUT_FILENO, STDERR_FILENO */

/* ─────────────────────────────────────────────────────────────────────
 * 1. STANDARD FILE DESCRIPTORS
 *
 *    Every Unix process inherits three open file descriptors:
 *
 *    ├─ 0  stdin   (STDIN_FILENO)   – default input  (keyboard)
 *    ├─ 1  stdout  (STDOUT_FILENO)  – default output (terminal)
 *    └─ 2  stderr  (STDERR_FILENO)  – error messages (terminal)
 *
 *    These are NOT variables — they are integer constants guaranteed
 *    by POSIX. You can use the numbers directly or the named macros.
 * ────────────────────────────────────────────────────────────────────*/

void demo_standard_fds(void)
{
    char buf[32];

    write(STDOUT_FILENO, "--- 1. Standard FDs ---\n", 24);

    /* Writing to 3 different destinations */
    write(STDOUT_FILENO, "  This goes to stdout (fd=1)\n", 29);
    write(STDERR_FILENO, "  This goes to stderr (fd=2)\n", 29);

    /* Reading from stdin — blocks until the user types something */
    write(STDOUT_FILENO, "  Type something and press Enter: ", 34);
    int n = read(STDIN_FILENO, buf, sizeof(buf) - 1);
    if (n > 0) {
        buf[n] = '\0';
        /* Strip trailing newline if present */
        if (buf[n-1] == '\n') buf[n-1] = '\0';
        write(STDOUT_FILENO, "  You typed: ", 13);
        write(STDOUT_FILENO, buf, strlen(buf));
        write(STDOUT_FILENO, "\n", 1);
    }

    /*
     * Summary:
     *   read(fd, buf, count)  — reads up to count bytes from fd into buf.
     *                           Returns number of bytes read, 0 on EOF, -1 on error.
     *   write(fd, buf, count) — writes count bytes from buf to fd.
     *                           Returns number written, -1 on error.
     */
}

/* ─────────────────────────────────────────────────────────────────────
 * 2. open() / close()
 *
 *    open(path, flags, mode) → returns a new file descriptor (smallest
 *    unused integer), or -1 on error.
 *
 *    Common flags:
 *      O_RDONLY  – read only
 *      O_WRONLY  – write only
 *      O_RDWR    – read + write
 *      O_CREAT   – create file if it doesn't exist
 *      O_TRUNC   – truncate file to zero length
 *
 *    close(fd) → releases the file descriptor so the kernel can
 *    recycle it.
 * ────────────────────────────────────────────────────────────────────*/

void demo_open_close(void)
{
    write(STDOUT_FILENO, "\n--- 2. open / close ---\n", 25);

    /* Create (or overwrite) a file for writing. 0644 = rw-r--r--    */
    int fd = open("demo_output.txt", O_WRONLY | O_CREAT | O_TRUNC, 0644);
    if (fd < 0) {
        perror("open");
        return;
    }
    write(STDOUT_FILENO, "  Opened 'demo_output.txt' for writing\n", 39);

    /* Write something into the file directly via its fd */
    const char *msg = "Hello from open/write!\n";
    write(fd, msg, strlen(msg));

    /* Always close file descriptors when done */
    close(fd);
    write(STDOUT_FILENO, "  Closed the file.\n", 19);

    /* Re-open for reading to prove the data is there */
    fd = open("demo_output.txt", O_RDONLY);
    if (fd < 0) {
        perror("open for read");
        return;
    }
    char buf[64];
    int n = read(fd, buf, sizeof(buf) - 1);
    if (n > 0) {
        buf[n] = '\0';
        write(STDOUT_FILENO, "  Read back: ", 13);
        write(STDOUT_FILENO, buf, n);
    }
    close(fd);
}

/* ─────────────────────────────────────────────────────────────────────
 * 3. read() / write()
 *
 *    Already demonstrated above and in demo_standard_fds().
 *
 *    Key points:
 *    - read()  may return fewer bytes than requested (partial read).
 *              Always check the return value and loop if needed.
 *    - write() may also write fewer bytes than requested (rare on
 *              regular files, common on pipes/sockets).
 *    - Both set errno on failure; use perror()/strerror() to report.
 * ────────────────────────────────────────────────────────────────────*/

void demo_read_write_loop(void)
{
    write(STDOUT_FILENO, "\n--- 3. read/write loop ---\n", 28);

    /* File copy: read 4 KB chunks, write until EOF               */
    int src = open("demo_output.txt", O_RDONLY);
    if (src < 0) { perror("open src"); return; }

    int dst = open("demo_copy.txt", O_WRONLY | O_CREAT | O_TRUNC, 0644);
    if (dst < 0) { perror("open dst"); close(src); return; }

    char buf[4096];
    ssize_t nread;
    while ((nread = read(src, buf, sizeof(buf))) > 0) {
        ssize_t nwritten = write(dst, buf, nread);
        if (nwritten != nread) {
            write(STDERR_FILENO, "Partial write!\n", 15);
            break;
        }
    }
    close(src);
    close(dst);
    write(STDOUT_FILENO, "  Copied 'demo_output.txt' -> 'demo_copy.txt'\n", 46);
}

/* ─────────────────────────────────────────────────────────────────────
 * 4. fork() + execvp()
 *
 *    fork()  — creates a child process. After fork(), BOTH parent and
 *              child continue executing from this point.
 *              Returns: 0 in the child, child-PID in the parent, -1
 *              on error.
 *
 *    execvp(file, argv) — replaces the CURRENT process image with
 *              the program `file` (searching PATH). Does NOT return
 *              on success; returns -1 on error.
 *
 *    Typical pattern:  fork() → in the child, execvp().
 *    The parent calls waitpid() to reap the child.
 * ────────────────────────────────────────────────────────────────────*/

void demo_fork_exec(void)
{
    write(STDOUT_FILENO, "\n--- 4. fork + execvp ---\n", 26);

    pid_t pid = fork();
    if (pid < 0) {
        perror("fork");
        return;
    }

    if (pid == 0) {
        /* ── CHILD ────────────────────────────────────────────── */
        write(STDOUT_FILENO, "  [child]  Running 'ls -l' via execvp:\n", 39);

        /* execvp() searches PATH for "ls".
         * argv[0] is the program name (convention), last element is NULL. */
        char *args[] = { "ls", "-l", "demo_copy.txt", NULL };
        execvp("ls", args);

        /* execvp only returns on error */
        perror("execvp");
        _exit(1);   /* _exit() skips stdio cleanup (no double-flush) */
    } else {
        /* ── PARENT ───────────────────────────────────────────── */
        write(STDOUT_FILENO, "  [parent] Waiting for child...\n", 32);
        int status;
        waitpid(pid, &status, 0);
        write(STDOUT_FILENO, "  [parent] Child exited.\n", 25);
    }
}

/* ─────────────────────────────────────────────────────────────────────
 * 5. dup2() — I/O Redirection
 *
 *    dup2(oldfd, newfd) — closes newfd (if open) and makes it a copy
 *    of oldfd. After the call, writes to newfd go to the same
 *    kernel file table entry as oldfd.
 *
 *    Common pattern (redirect output to a file):
 *      fd = open("out.txt", O_WRONLY | O_CREAT, 0644);
 *      dup2(fd, STDOUT_FILENO);  // now fd=1 → file
 *      close(fd);                // original fd no longer needed
 *
 *    After dup2, everything that goes to stdout ends up in the file.
 *    Combined with fork+exec, this is how shells implement ">", "<".
 * ────────────────────────────────────────────────────────────────────*/

void demo_dup2(void)
{
    write(STDOUT_FILENO, "\n--- 5. dup2 (I/O redirection) ---\n", 35);

    pid_t pid = fork();
    if (pid < 0) { perror("fork"); return; }

    if (pid == 0) {
        /* ── CHILD: redirect stdout to a file ────────────────── */
        int fd = open("redirected_out.txt",
                       O_WRONLY | O_CREAT | O_TRUNC, 0644);
        if (fd < 0) { perror("open"); _exit(1); }

        /* Make fd=1 (stdout) point to the same file as `fd` */
        dup2(fd, STDOUT_FILENO);
        close(fd);   /* the extra copy is no longer needed */

        /* Now exec 'ls' — its stdout goes to the file, not the terminal */
        char *args[] = { "ls", "-l", NULL };
        execvp("ls", args);
        perror("execvp");
        _exit(1);
    } else {
        int status;
        waitpid(pid, &status, 0);
        write(STDOUT_FILENO, "  [parent] Output redirected to 'redirected_out.txt'\n", 53);

        /* Read and display the redirected output */
        int fd = open("redirected_out.txt", O_RDONLY);
        if (fd >= 0) {
            char buf[4096];
            int n = read(fd, buf, sizeof(buf) - 1);
            if (n > 0) {
                buf[n] = '\0';
                write(STDOUT_FILENO, "  Contents:\n", 12);
                write(STDOUT_FILENO, buf, n);
            }
            close(fd);
        }
    }
}

/* ─────────────────────────────────────────────────────────────────────
 * 6. TINY SHELL DEMO — Putting it all together
 *
 *    A minimal interactive shell that demonstrates all the concepts.
 *    Supports:
 *      - Running external commands  (fork + execvp)
 *      - Output redirection >       (dup2)
 *    Type "exit" or Ctrl+D to quit.
 * ────────────────────────────────────────────────────────────────────*/

static void run_command(char *cmdline)
{
    char *argv[64];
    char *outfile = NULL;
    int argc = 0;

    /* Tokenize the command line */
    char *token = strtok(cmdline, " \t\n");
    while (token != NULL && argc < 63) {
        if (strcmp(token, ">") == 0) {
            /* Output redirection: next token is the filename */
            token = strtok(NULL, " \t\n");
            if (token) outfile = token;
            break;
        }
        argv[argc++] = token;
        token = strtok(NULL, " \t\n");
    }
    argv[argc] = NULL;

    if (argc == 0) return;                       /* empty command */

    if (strcmp(argv[0], "exit") == 0) exit(0);   /* built-in exit  */

    pid_t pid = fork();
    if (pid < 0) { perror("fork"); return; }

    if (pid == 0) {
        /* ── CHILD ────────────────────────────────────────────── */
        if (outfile) {
            int fd = open(outfile, O_WRONLY | O_CREAT | O_TRUNC, 0644);
            if (fd < 0) { perror("open"); _exit(1); }
            dup2(fd, STDOUT_FILENO);   /* redirect stdout → file  */
            close(fd);
        }

        execvp(argv[0], argv);
        /* execvp failed */
        write(STDERR_FILENO, argv[0], strlen(argv[0]));
        write(STDERR_FILENO, ": command not found\n", 20);
        _exit(127);
    } else {
        /* ── PARENT ───────────────────────────────────────────── */
        int status;
        waitpid(pid, &status, 0);
    }
}

void demo_tiny_shell(void)
{
    write(STDOUT_FILENO, "\n=== 6. Tiny Shell ===\n", 23);
    write(STDOUT_FILENO, "  Try:  ls -l\n", 14);
    write(STDOUT_FILENO, "  Try:  ls -l > out.txt\n", 24);
    write(STDOUT_FILENO, "  Type 'exit' to quit.\n\n", 24);

    char line[512];
    for (;;) {
        write(STDOUT_FILENO, "sh> ", 4);
        ssize_t n = read(STDIN_FILENO, line, sizeof(line) - 1);
        if (n <= 0) break;  /* EOF (Ctrl+D) or error */
        line[n] = '\0';
        run_command(line);
    }
    write(STDOUT_FILENO, "\n", 1);
}

/* ────────────────────────────────────────────────────────────────────*/

int main(void)
{
    write(STDOUT_FILENO,
          "\n╔══════════════════════════════════════════════╗\n"
          "║  Unix Syscall Demo: fork execvp open close   ║\n"
          "║  read write dup2 + fds 0/1/2               ║\n"
          "╚══════════════════════════════════════════════╝\n\n", 160);

    demo_standard_fds();
    demo_open_close();
    demo_read_write_loop();
    demo_fork_exec();
    demo_dup2();
    demo_tiny_shell();

    return 0;
}
