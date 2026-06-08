# llmscan - Hardware-Aware Local LLM Recommender

A cross-platform tool that scans machine hardware (CPU, RAM, GPU, storage) and recommends open-source LLMs that can run locally.

## Supported Platforms

| Platform | Script | Requirements |
|----------|--------|-------------|
| Linux    | `./llmscan` | bash ≥ 4, bc, nproc, lspci (optional) |
| macOS    | `./llmscan` | bash, bc, sysctl, vm_stat, system_profiler |
| Windows  | `llmscan.ps1` | PowerShell 5.1+ |
| WSL      | `./llmscan` | Same as Linux |

## Quick Start

```bash
# Linux / macOS / WSL
chmod +x llmscan
./llmscan                  # Standard scan & recommendations
./llmscan --json           # Machine-readable output
./llmscan --cpu-only       # Force CPU-only mode
./llmscan --model MODEL    # Check a specific model

# Windows
.\llmscan.ps1              # Standard hardware scan
.\llmscan.ps1 --json       # Machine-readable output
```

## Hardware Detection

### Linux
- **RAM**: `/proc/meminfo` (`MemTotal`, `MemAvailable`, `SwapTotal`)
- **CPU**: `nproc` / `/proc/cpuinfo` (cores, AVX512/AVX2/AVX/SSE4.2)
- **GPU**: `nvidia-smi` (NVIDIA), `lspci` (AMD/Intel)
- **Disk**: `df --output=avail`

### macOS
- **RAM**: `sysctl hw.memsize` (total), `vm_stat` + page size (available), `sysctl vm.swapusage` (swap)
- **CPU**: `sysctl hw.ncpu` (cores), `sysctl machdep.cpu.features` (AVX512/AVX2/AVX/SSE4.2)
- **GPU**: `system_profiler SPDisplaysDataType` — detects Apple Silicon (shared), AMD/NVIDIA discrete (parses VRAM), Intel integrated (shared)
- **Disk**: `df -k`

### Windows (PowerShell)
- **RAM**: `Win32_ComputerSystem.TotalPhysicalMemory` (total), `Win32_OperatingSystem.FreePhysicalMemory` (available)
- **Swap**: `Win32_PageFileUsage.AllocatedBaseSize`
- **CPU**: `Win32_Processor.NumberOfLogicalProcessors` + P/Invoke `IsProcessorFeaturePresent` for AVX/SSE
- **GPU**: `Win32_VideoController.Name` / `.AdapterRAM`
- **Disk**: `Win32_LogicalDisk.FreeSpace`

## Model Recommendation

1. Loads model database from cache (auto-generated static fallback with 7 models, or fetched from Ollama/HuggingFace API)
2. Estimates RAM/VRAM requirements from parameter count (Q4 quantisation: `params * 0.5 GB`)
3. Filters models by: available RAM + swap, GPU VRAM (if present), free disk space
4. Scores remaining models: `RAM_fit × 0.4 + VRAM_fit × 0.5 + CPU_score × 0.1`
5. Sorts by score descending, outputs top 5

### Built-in Model Database

| Model | Params | Size | Backend |
|-------|--------|------|---------|
| llama3.1:8b | 8B | 4.5 GB | ollama |
| mistral:7b | 7B | 4.1 GB | ollama |
| phi3:3.8b | 3.8B | 2.2 GB | ollama |
| gemma2:9b | 9B | 5.5 GB | ollama |
| mixtral:8x7b | 46.9B | 26 GB | llama.cpp |
| qwen2:72b | 72B | 41 GB | llama.cpp |
| deepseek-coder:6.7b | 6.7B | 3.8 GB | ollama |

## CLI Options

| Flag | Description |
|------|-------------|
| `--json` | Output in JSON format for scripting |
| `--model MODEL_ID` | Analyze a specific model from HuggingFace |
| `--refresh-cache` | Force refresh of remote model catalog |
| `--no-cache` | Do not use local cache |
| `--cpu-only` | Restrict to CPU-only recommendations |
| `--help` | Show help message |

## Output Example

```
$ ./llmscan

=== Hardware Summary ===
CPU: 12 cores, avx2 instruction set
RAM: 1.6 GiB available / 3.7 GiB total
GPU: CPU-only mode (no dedicated GPU detected)
Disk: 927 GiB free

=== Recommended LLMs (can run locally) ===

1. phi3:3.8b (Q4)
   → Score: 0.47/1.00
   → Parameters: 3.8B
   → Backend: ollama
   → Required RAM: 1.5GB
   → Install: ollama run phi3:3.8b
```

## JSON Output Schema

```json
{
  "timestamp": "2026-06-08T17:33:21+08:00",
  "hardware": {
    "total_ram_gb": 3.7,
    "available_ram_gb": 1.7,
    "swap_gb": 1.0,
    "cpu_cores": 12,
    "cpu_features": "avx2",
    "gpu": "|0",
    "free_disk_gb": 927
  },
  "models": [
    {
      "name": "phi3:3.8b",
      "score": 0.47,
      "parameters": "3.8B",
      "quantization": "Q4",
      "backend": "ollama",
      "estimated_ram": "1.5GB",
      "estimated_vram": "0GB"
    }
  ]
}
```

## Files

- `llmscan` — Bash script (Linux & macOS)
- `llmscan.ps1` — PowerShell script (Windows)

## Implementation Notes

- Hardware detection branches by OS via `uname -s` at startup
- All numeric comparisons use `bc` for floating-point arithmetic
- Model database is cached at `~/.cache/llmscan/models.json`
- No root privileges required — reads only world-accessible system files/interfaces
- Self-contained: no Python, containers, or external runtime dependencies
