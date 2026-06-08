#!/usr/bin/env pwsh
# llmscan.ps1 - Hardware Detection for Windows
# Usage: .\llmscan.ps1 [--json] [--help]

param(
    [switch]$Json = $false,
    [switch]$Help = $false
)

$Version = "1.0.0"

function usage {
    @"
llmscan v$Version - Hardware Detection for Windows
Usage: llmscan.ps1 [OPTIONS]

Options:
    --json   Output in JSON format for scripting
    --help   Show this help message

Examples:
    .\llmscan.ps1          # Standard hardware scan
    .\llmscan.ps1 --json   # Machine-readable output
"@
    exit 0
}

function Get-TotalRamGb {
    $bytes = (Get-CimInstance Win32_ComputerSystem).TotalPhysicalMemory
    if (-not $bytes) { return 0 }
    [math]::Round($bytes / 1GB, 1)
}

function Get-AvailableRamGb {
    $kb = (Get-CimInstance Win32_OperatingSystem).FreePhysicalMemory
    if (-not $kb) { return 0 }
    [math]::Round($kb / 1048576, 1)
}

function Get-SwapGb {
    $pagefile = Get-CimInstance Win32_PageFileUsage -ErrorAction SilentlyContinue
    if (-not $pagefile) { return 0 }
    $totalMb = ($pagefile | Measure-Object -Property AllocatedBaseSize -Sum).Sum
    if (-not $totalMb) { return 0 }
    [math]::Round($totalMb / 1024, 1)
}

function Get-CpuCores {
    $cpu = Get-CimInstance Win32_Processor -ErrorAction SilentlyContinue
    if (-not $cpu) { return 1 }
    $cores = ($cpu | Measure-Object -Property NumberOfLogicalProcessors -Sum).Sum
    if (-not $cores) { return 1 }
    $cores
}

function Get-CpuFeatures {
    $features = @()
    try {
        Add-Type -TypeDefinition @'
        using System;
        using System.Runtime.InteropServices;
        public class CpuCheck {
            [DllImport("kernel32.dll")]
            public static extern bool IsProcessorFeaturePresent(int processorFeature);
        }
'@ -ErrorAction Stop
        if ([CpuCheck]::IsProcessorFeaturePresent(41)) { return "avx512" }
        if ([CpuCheck]::IsProcessorFeaturePresent(40)) { return "avx2" }
        if ([CpuCheck]::IsProcessorFeaturePresent(21)) { return "avx" }
        if ([CpuCheck]::IsProcessorFeaturePresent(34)) { return "sse4_2" }
    } catch {}
    $cpu = Get-CimInstance Win32_Processor -ErrorAction SilentlyContinue | Select-Object -First 1
    if ($cpu) {
        $arch = $cpu.Architecture
        if ($arch -eq 9 -or $arch -eq 0) { return "sse4_2" }
    }
    "unknown"
}

function Get-GpuInfo {
    $gpu = Get-CimInstance Win32_VideoController -ErrorAction SilentlyContinue | Select-Object -First 1
    if (-not $gpu) { return "|0" }
    $name = $gpu.Name
    $vendor = ""
    if ($name -match "(?i)nvidia|geforce") { $vendor = "nvidia" }
    elseif ($name -match "(?i)amd|radeon|ati") { $vendor = "amd" }
    elseif ($name -match "(?i)intel") { $vendor = "intel" }
    else { $vendor = "unknown" }
    $vram = $gpu.AdapterRAM
    if (-not $vram -or $vram -eq 0) {
        if ($vendor -eq "intel") { return "intel|shared" }
        return "$vendor|0"
    }
    $vramGb = [math]::Round($vram / 1GB, 0)
    "$vendor|$vramGb"
}

function Get-FreeDiskGb {
    $drives = Get-CimInstance Win32_LogicalDisk -Filter "DriveType=3" -ErrorAction SilentlyContinue
    if (-not $drives) { return 0 }
    $osDrive = $drives | Where-Object { $_.DeviceID -eq $env:SystemDrive -or $_.Name -eq $env:SystemDrive } | Select-Object -First 1
    if (-not $osDrive) { $osDrive = $drives | Select-Object -First 1 }
    [math]::Round($osDrive.FreeSpace / 1GB, 0)
}

function Get-Timestamp {
    (Get-Date -Format "yyyy-MM-ddTHH:mm:ssK")
}

function Write-HumanOutput {
    $totalRam = Get-TotalRamGb
    $availRam = Get-AvailableRamGb
    $swap = Get-SwapGb
    $cpuCores = Get-CpuCores
    $cpuFeatures = Get-CpuFeatures
    $gpuInfo = Get-GpuInfo
    $freeDisk = Get-FreeDiskGb

    Write-Host "=== Hardware Summary ==="
    Write-Host "CPU: $cpuCores cores, $cpuFeatures instruction set"
    Write-Host "RAM: $availRam GiB available / $totalRam GiB total"
    $parts = $gpuInfo -split '\|'
    $gpuVendor = $parts[0]
    $gpuVram = $parts[1]
    if ($gpuVendor -eq "nvidia" -and $gpuVram -ne "0") {
        Write-Host "GPU: NVIDIA ($gpuVram GiB VRAM)"
    } elseif ($gpuVendor -eq "amd") {
        Write-Host "GPU: AMD ($gpuVram GiB VRAM)"
    } elseif ($gpuVendor -eq "intel") {
        Write-Host "GPU: Intel (shared memory)"
    } else {
        Write-Host "GPU: No dedicated GPU detected"
    }
    Write-Host "Disk: $freeDisk GiB free on $env:SystemDrive"
}

function Write-JsonOutput {
    $timestamp = Get-Timestamp
    $totalRam = Get-TotalRamGb
    $availRam = Get-AvailableRamGb
    $swap = Get-SwapGb
    $cpuCores = Get-CpuCores
    $cpuFeatures = Get-CpuFeatures
    $gpuInfo = Get-GpuInfo
    $freeDisk = Get-FreeDiskGb

    $json = @{
        timestamp = $timestamp
        hardware = @{
            total_ram_gb     = $totalRam
            available_ram_gb = $availRam
            swap_gb          = $swap
            cpu_cores        = $cpuCores
            cpu_features     = $cpuFeatures
            gpu              = $gpuInfo
            free_disk_gb     = $freeDisk
        }
        os = @{
            name    = "Windows"
            version = (Get-CimInstance Win32_OperatingSystem).Version
        }
    }
    $json | ConvertTo-Json
}

# --- Main ---
if ($Help) { usage }

if ($Json) {
    Write-JsonOutput
} else {
    Write-HumanOutput
}
