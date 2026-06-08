# Finalterm — Compiled Documentation (HW 1 ~ Midterm)

> 課程：系統程式 | 學生：周偉材 | 學號末兩碼：24 | 教師：陳鍾誠 | 金門大學資訊工程系

---

## Table of Contents

| # | Assignment | Directory |
|---|-----------|----------|
| 1 | [HW 1 — p0 Compiler: While Handler & Function Call](#hw-1--p0-compiler-while-handler--function-call) | [`HW 1/`](../HW%201/) |
| 2 | [HW 2 — Programming Language Implementation](#hw-2--programming-language-implementation) | [`HW 2/`](../HW%202/) |
| 3 | [HW 3 — Satellite & RF Intelligence Platform](#hw-3--satellite--rf-intelligence-platform) | [`HW 3/`](../HW%203/) |
| 4 | [HW 4 — System Programming Guide (Static Website)](#hw-4--system-programming-guide-static-website) | [`HW 4/`](../HW%204/) |
| 5 | [HW 5 — Concurrency Concepts & Implementations](#hw-5--concurrency-concepts--implementations) | [`HW 5/`](../HW%205/) |
| 6 | [HW 6 — Unix Syscall Demo](#hw-6--unix-syscall-demo) | [`HW 6/`](../HW%206/) |
| 7 | [Midterm — llmscan: Hardware-Aware Local LLM Recommender](#midterm--llmscan-hardware-aware-local-llm-recommender) | [`Midterm/`](../Midterm/) |

---

## HW 1 — p0 Compiler: While Handler & Function Call

**Directory:** [`HW 1/`](../HW%201/)

Extends the p0 educational C compiler with two major features:

### While Loop (Two-Jump Backpatching)
Implements `while (cond) { body }` using a forward `JMP_F` (exit on false) and a backward `JMP` (loop back). Both use backpatching — placeholder targets (`"?"`) are fixed after the body is parsed:
1. Record `loop_start` before condition
2. Emit `JMP_F` to placeholder
3. Parse body statements
4. Emit `JMP` to placeholder
5. Backpatch `JMP_F` to end-of-body, `JMP` to `loop_start`

### Function Call Mechanism
Stack-based calling convention with frame-based local variable management:
- **CALL**: Pushes a new `Frame` (saves `ret_pc`, copies arguments from `param_stack`, jumps to function PC)
- **FORMAL**: Binds incoming argument values to formal parameter names
- **RET_VAL**: Stores return value in caller's result variable, pops frame, jumps back to `ret_pc`
- **PARAM**: Pushes arguments onto a parameter stack before CALL

**Key files:** `compiler.c`, `p0/*.p0` (example programs)

---

## HW 2 — Programming Language Implementation

**Directory:** [`HW 2/`](../HW%202/)

A complete custom programming language implementation in Python, supporting dynamic typing, control flow, functions, and lists.

### Architecture (Pipeline)
```
Source → Lexer (ply.lex) → Parser (ply.yacc) → AST → Interpreter / Compiler → Bytecode → VM
```

### Components
| Module | Role |
|--------|------|
| `lexer.py` | Tokenizes source code into tokens |
| `parser.py` | Builds AST from tokens using EBNF grammar |
| `ast_nodes.py` | Defines AST node classes |
| `interpreter.py` | Walks AST directly via visitor pattern (`Environment` scopes) |
| `compiler.py` | Compiles AST to bytecode (opcodes + constant pool) |
| `vm.py` | Stack-based virtual machine executing bytecode |
| `main.py` | CLI: `parse`, `interpret`, `compile` modes |

### Language Features
- `let` variable declarations, arithmetic/comparison/logical operators
- `if/else`, `while` loops
- Functions with parameters and `return`
- `print()` built-in, list literals `[1, 2, 3]`
- Integer, string, boolean (`true`/`false`), `null` literals

**Key files:** `src/lexer.py`, `src/parser.py`, `src/interpreter.py`, `src/compiler.py`, `src/vm.py`, `src/examples/*.lang`

---

## HW 3 — Satellite & RF Intelligence Platform

**Directory:** [`HW 3/`](../HW%203/)

A full-stack geospatial intelligence platform for tracking satellites and radio frequency sources worldwide.

### Stack
- **Frontend:** React 18, Vite, Leaflet (dark map, orbital paths, heatmap), satellite.js
- **Backend:** Node.js, Express, satellite.js, Helmet, express-rate-limit
- **Deployment:** Frontend on Vercel, Backend on Render

### Key Features
- 50 satellites with real-time orbital propagation via satellite.js TLE data
- 100 RF sources across 26 countries with spectrum visualization
- Interactive Leaflet map with orbital path lines, heatmap overlay
- Filtering by status, orbit type, satellite type, service type
- Live camera feeds (ISS, GOES-16, SOHO, EarthCam)
- Satellite-to-RF analysis linking endpoints
- REST API with rate limiting (100 req/min general, 30 req/min propagation)
- Security headers (Helmet), CORS, input validation, graceful shutdown
- Light/dark theme toggle

**Key files:** `client/` (React SPA), `server/` (Express API), `start.sh`

---

## HW 4 — System Programming Guide (Static Website)

**Directory:** [`HW 4/`](../HW%204/)

A static informational website covering system programming concepts — no build step, pure HTML/CSS/JS.

### Features
- 8 chapters: OS overview, assembly, compilers, kernel, linkers, tools, security, advanced topics
- Dark/light mode toggle with `localStorage` persistence
- Responsive card-based layout
- Deployed on Vercel

**Key files:** `index.html`, `style.css`, `script.js`, `start.sh`

---

## HW 5 — Concurrency Concepts & Implementations

**Directory:** [`HW 5/`](../HW%205/)

Three Python threading simulations demonstrating core concurrency concepts:

### 1. Bank Deposit/Withdrawal (`bank_simulation.py`)
- Two threads: 100,000 deposits + 100,000 withdrawals of 1 unit each
- Mutex (`threading.Lock`) ensures atomic operations
- Expected final balance: 0 (verified with/without race condition)

### 2. Producer-Consumer (`producer_consumer.py`)
- 2 producers, 3 consumers, bounded buffer (size 10)
- Uses thread-safe `queue.Queue` with sentinel-based (`None`) termination
- Producers block on full queue, consumers block on empty queue

### 3. Dining Philosophers (`dining_philosophers.py`)
- 5 philosophers, 5 forks — classic deadlock problem
- **Deadlock prevention:** Asymmetric fork acquisition (even IDs: left→right; odd IDs: right→left) breaks circular wait
- Each philosopher thinks, eats, and repeats for 3 rounds

### Supporting Document
- `threading_concepts.md` — Detailed writeup covering threads, race conditions, mutexes, deadlocks (Coffman conditions), and all three implementations

**Key files:** `bank_simulation.py`, `producer_consumer.py`, `dining_philosophers.py`, `threading_concepts.md`

---

## HW 6 — Unix Syscall Demo

**Directory:** [`HW 6/`](../HW%206/)

A C program demonstrating foundational Unix system calls through six sequential demos.

### Demos
| # | Topic | Syscalls Used |
|---|-------|--------------|
| 1 | Standard file descriptors (0/1/2) | `read`, `write` |
| 2 | File open/close | `open`, `close` (creates `demo_output.txt`) |
| 3 | read/write loop (4 KB chunked copy) | `read`, `write` (creates `demo_copy.txt`) |
| 4 | Process fork + exec | `fork`, `execvp`, `waitpid` (runs `ls -l`) |
| 5 | I/O redirection via dup2 | `dup2`, `open`, `close` (redirects `ls` output to file) |
| 6 | Tiny shell | Combines all above; supports `ls`, `ls > out.txt`, `exit` |

### Build & Run
```bash
make          # compile with gcc
make run      # compile + run
./demo_syscalls
```

**Key files:** `demo_syscalls.c`, `Makefile`

---

## Midterm — llmscan: Hardware-Aware Local LLM Recommender

**Directory:** [`Midterm/`](../Midterm/)

A cross-platform shell tool that scans local hardware (CPU, RAM, GPU, storage) and recommends open-source LLMs that can run locally.

### Supported Platforms
- **Linux/macOS:** Bash script (`llmscan`) — uses `/proc/meminfo`, `nproc`, `nvidia-smi`, `lspci`, `sysctl`, `system_profiler`
- **Windows:** PowerShell script (`llmscan.ps1`) — uses WMI classes and P/Invoke for CPU features

### Recommendation Algorithm
1. Detect hardware: RAM total/available, swap, CPU cores + ISA features (AVX512/AVX2/AVX/SSE4.2), GPU VRAM, free disk
2. Load model database (7 built-in models from Ollama/HuggingFace, cacheable)
3. Estimate RAM/VRAM from parameter count (Q4: `params × 0.5 GB`)
4. Filter by available resources
5. Score remaining models: `RAM_fit × 0.4 + VRAM_fit × 0.5 + CPU_score × 0.1`
6. Output top 5 recommendations

### CLI Options
`--json`, `--model MODEL_ID`, `--refresh-cache`, `--no-cache`, `--cpu-only`

### Built-in Models
phi3:3.8b, mistral:7b, llama3.1:8b, deepseek-coder:6.7b, gemma2:9b, mixtral:8x7b, qwen2:72b

**Key files:** `llmscan` (Bash), `llmscan.ps1` (PowerShell)
