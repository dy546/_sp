# Unix Syscall Demo

Interactive demo of the foundational Unix system calls: `fork`, `execvp`, `open`, `close`, `read`, `write`, `dup2`, and the standard file descriptors `stdin`(0), `stdout`(1), `stderr`(2).

## Quick Start

```bash
make          # compile
make run      # compile + run
./demo_syscalls
```

**Prerequisites:** `gcc`, `make` (both pre-installed on most Linux systems).

## Program Walkthrough

The binary runs six sequential demos when launched without arguments:

### 1. Standard File Descriptors (0, 1, 2)

Every Unix process inherits three open file descriptors:

| fd | Name   | Macro         | Default target |
|----|--------|---------------|----------------|
| 0  | stdin  | STDIN_FILENO  | keyboard       |
| 1  | stdout | STDOUT_FILENO | terminal       |
| 2  | stderr | STDERR_FILENO | terminal       |

The demo reads a line from stdin with `read()` and echoes it to stdout with `write()`.

### 2. open / close

- **`open(path, flags, mode)`** — returns the lowest available file descriptor integer.
- **`close(fd)`** — releases the descriptor back to the kernel.
- Common flags: `O_RDONLY`, `O_WRONLY`, `O_RDWR`, `O_CREAT`, `O_TRUNC`.

The demo creates `demo_output.txt`, writes a line, closes it, then re-opens for reading.

### 3. read / write Loop

- **`read(fd, buf, count)`** — reads ≤ *count* bytes. Returns 0 at EOF, -1 on error.
- **`write(fd, buf, count)`** — writes ≤ *count* bytes. May write less than requested.

The demo copies `demo_output.txt` → `demo_copy.txt` using 4 KB chunked reads.

### 4. fork + execvp

- **`fork()`** — clones the calling process. Returns 0 in the child, child PID in the parent.
- **`execvp(file, argv)`** — replaces process image with `file` (searched on `PATH`). Never returns on success.
- Parent reaps the child with **`waitpid()`**.

The demo forks, the child runs `ls -l`, the parent waits.

### 5. dup2 (I/O Redirection)

- **`dup2(oldfd, newfd)`** — makes `newfd` point to the same kernel file entry as `oldfd`.

```
fd = open("out.txt", O_WRONLY|O_CREAT|O_TRUNC, 0644);
dup2(fd, STDOUT_FILENO);  // fd 1 now writes to out.txt
close(fd);                // original copy no longer needed
execvp("ls", args);       // ls output goes to out.txt
```

This is how shells implement `>`, `<`, `2>`, and pipes.

### 6. Tiny Shell

A minimal interactive shell combining all concepts. Supports:

| Command | Description |
|---------|-------------|
| `ls -l` | Run any external program |
| `ls -l > out.txt` | Redirect stdout to a file |
| `exit` | Quit the shell |
| `Ctrl+D` | Quit via EOF |

## Generated Files

During execution the program creates:

| File | Created by |
|------|-----------|
| `demo_output.txt` | Section 2 (open/write demo) |
| `demo_copy.txt` | Section 3 (read/write loop) |
| `redirected_out.txt` | Section 5 (dup2 redirection) |

Clean up with `make clean`.

## API Quick Reference

```c
#include <unistd.h>
#include <fcntl.h>

// Process control
pid_t fork(void);
int   execvp(const char *file, char *const argv[]);
pid_t waitpid(pid_t pid, int *status, int options);

// File descriptors
int   open(const char *path, int flags, mode_t mode);
int   close(int fd);
int   dup2(int oldfd, int newfd);

// I/O
ssize_t read(int fd, void *buf, size_t count);
ssize_t write(int fd, const void *buf, size_t count);

// Standard fds (constants, no include needed — always available)
#define STDIN_FILENO  0
#define STDOUT_FILENO 1
#define STDERR_FILENO 2
```
