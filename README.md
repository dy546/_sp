# Systems Programming — Notes, Homework & Reports

**Course:** Systems Programming (114th Academic Year, 2nd Semester)  
**Student:** Zhou Weicai  
**Instructor:** Prof. Chen Zhongcheng  
**University:** National Quemoy University, Department of Computer Science and Engineering

| Resource | Link |
|----------|------|
| CPU2OS | https://github.com/ccc114b/cpu2os |
| AI Teaches You SP | https://github.com/cccbook/ai-teach-you/blob/main/sp/tw/README.md |
| c0 Computer | https://github.com/ccc-c/c0computer |

---

## Project Structure

| Directory | Topic | Language | Description |
|-----------|-------|----------|-------------|
| `HW 1/` | p0 Compiler | C | Tiny compiler + VM for a custom language (`p0`) with lexer, parser, quad code generation, stack-based VM supporting functions and while-loops |
| `HW 2/` | Custom Language | Python | Complete programming language with PLY-based parser, AST interpreter, bytecode compiler, and stack VM with dynamic typing, functions, lists |
| `HW 3/` | Satellite & RF Platform | Node.js / React | Full-stack geospatial intelligence web app: satellite tracking, RF source mapping, orbital propagation, live camera feeds |
| `HW 4/` | SP Study Guide | HTML/CSS/JS | Static reference website on systems programming concepts (8 chapters) with dark/light theme |
| `HW 5/` | Concurrency | Python | Threading simulations: bank race condition, producer-consumer, dining philosophers with mutexes and deadlock prevention |
| `HW 6/` | Unix Syscalls | C | Interactive demo of POSIX system calls: file I/O, fork/exec, pipe/dup2, and a minimal shell |
| `Midterm/` | llmscan | Bash / PowerShell | Cross-platform hardware-aware LLM recommender — detects CPU/GPU/RAM and suggests local models |

---

## HW 1 — p0 Compiler (C)

A small compiler and virtual machine for the `p0` language.

- **Lexer:** Tokenizes keywords, identifiers, numbers, operators, and symbols
- **Parser:** Recursive-descent parser for expressions, if/else, while loops, and function definitions
- **Code Generator:** Emits quadruples (`IMM`, `ADD`, `CALL`, `JMP_F`, `FUNC_BEG`, etc.)
- **VM:** Stack-based execution with frame support for recursive calls
- **Examples:** `add.p0`, `fact.p0`, `if.p0`, `while.p0`, `prime.p0`

### Build & Run
```bash
cd "HW 1"
gcc compiler.c -o compiler
./compiler p0/while.p0
```

---

## HW 2 — Custom Language (Python)

A custom language implementation with three execution modes.

- **Lexer:** PLY-based tokenizer
- **Parser:** LALR(1) grammar with PLY yacc, builds AST
- **Interpreter:** AST-walking interpreter with lexical scoping
- **Compiler:** AST-to-bytecode with 20 opcodes
- **VM:** Stack-based bytecode executor
- **Features:** Dynamic typing, `let` variables, arithmetic, comparisons, `if/else`, `while`, functions with params/return, lists, `print()`

### Usage
```bash
cd "HW 2/src"
python main.py examples/hello_world.lang         # AST interpreter
python main.py examples/hello_world.lang --exec vm # Bytecode VM
python main.py examples/hello_world.lang --dump   # AST pretty-print
```

---

## HW 3 — Satellite & RF Intelligence Platform (Node.js / React)

A full-stack geospatial intelligence web application.

### Backend (Express)
- REST API with 13 endpoints for satellites (50), RF sources (100), countries, cameras, propagation, analysis
- Security: Helmet, CORS, rate limiting (100 req/min general, 30 req/min propagation)
- Real-time orbital propagation via `satellite.js`
- WebSocket support

### Frontend (React + Vite)
- Interactive Leaflet dark-mode map with orbital paths, heatmap, labels
- Filtering by status, orbit type, satellite type, service type
- Detail panels, live camera feeds (ISS, GOES-16, SOHO, EarthCam)
- Statistics bar, light/dark theme toggle

### Deployment
- Frontend: Vercel
- Backend: Render

### Local Dev
```bash
bash "HW 3/start.sh"
```

---

## HW 4 — SP Study Guide (HTML/CSS/JS)

A static reference website covering 8 chapters of systems programming concepts.

- **Chapters:** Overview, Assembly & Machine Code, Compilers, OS Kernel, Linkers, System Tools, Security, Advanced Topics
- **Features:** Responsive card layout, smooth-scroll nav, dark/light theme toggle with `localStorage`
- **Dependencies:** Zero (vanilla HTML/CSS/JS)

### Open
```bash
open "HW 4/index.html"
```

---

## HW 5 — Concurrency & Threading (Python)

Three threading simulation programs demonstrating concurrency concepts.

1. **bank_simulation.py** — Two threads (depositor/withdrawer) on shared balance with `threading.Lock`
2. **producer_consumer.py** — 2 producers + 3 consumers with bounded `queue.Queue`
3. **dining_philosophers.py** — 5 philosophers with asymmetric fork acquisition to prevent deadlock

### Run
```bash
cd "HW 5"
python bank_simulation.py
python producer_consumer.py
python dining_philosophers.py
```

---

## HW 6 — Unix Syscall Demo (C)

Interactive demo of 6 fundamental POSIX system calls.

- Demo 1: Standard file descriptors (stdin/stdout/stderr)
- Demo 2: `open()` / `close()` file operations
- Demo 3: `read()` / `write()` loop with 4KB buffer
- Demo 4: `fork()` + `execvp()` child process
- Demo 5: `dup2()` I/O redirection
- Demo 6: Minimal shell with external commands and `>` redirection

### Build & Run
```bash
cd "HW 6"
make
make run
```

---

## Midterm — llmscan (Bash / PowerShell)

A cross-platform hardware-aware local LLM recommender.

### Features
- Detects CPU cores, features (AVX512, AVX2, AVX, SSE4.2), total/available RAM, swap, GPU vendor/VRAM, free disk
- 7 built-in models with Q4 quantization RAM estimates
- Model scoring: RAM fit (40%) + VRAM fit (50%) + CPU score (10%)
- Outputs top 5 recommendations in human-readable or JSON format
- Optional remote model database fetch from Ollama/HuggingFace APIs
- CLI flags: `--json`, `--model`, `--cpu-only`, `--refresh-cache`, `--no-cache`

### Platforms
| Platform | Script |
|----------|--------|
| Linux / macOS | `Midterm/llmscan` (Bash) |
| Windows | `Midterm/llmscan.ps1` (PowerShell) |

### Usage
```bash
./Midterm/llmscan                        # Normal mode
./Midterm/llmscan --json                 # JSON output
./Midterm/llmscan --model meta-llama/Llama-2-7b-hf  # Query specific model
./Midterm/llmscan --cpu-only             # Force CPU-only recommendations
```

---

## Tech Stack Summary

| Area | Technologies |
|------|-------------|
| Languages | C, Python, JavaScript, Bash, PowerShell, HTML/CSS |
| Backend | Node.js, Express, WebSocket, satellite.js |
| Frontend | React 18, Vite, Leaflet, Leaflet.heat |
| Tools | PLY (Python Lex-Yacc), GCC, Make, Vercel, Render |
| Concepts | Compilers, VMs, Bytecode, OS Syscalls, Concurrency, Threading, Geolocation |
