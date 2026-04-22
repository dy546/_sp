"""
Main entry point for the language tools.
"""
import sys
import argparse
from parser import parse
from interpreter import interpret_source
from compiler import compile_source
from vm import run_bytecode

def run_interpreter(source_code):
    """Run source code using the interpreter."""
    print("Running with interpreter:")
    interpret_source(source_code)

def run_compiler(source_code):
    """Compile and run source code using the VM."""
    print("Compiling to bytecode...")
    code, constants = compile_source(source_code)
    
    print(f"Generated {len(code)} instructions")
    print(f"Constants pool: {constants}")
    
    print("\nRunning with VM...")
    run_bytecode(code, constants)

def main():
    parser = argparse.ArgumentParser(description="Language tools: parser, interpreter, and compiler")
    parser.add_argument("mode", choices=["parse", "interpret", "compile"], 
                       help="Mode: parse (show AST), interpret (execute), compile (to bytecode)")
    parser.add_argument("file", nargs="?", help="Source file (optional, uses stdin if not provided)")
    
    args = parser.parse_args()
    
    # Read source code
    if args.file:
        with open(args.file, 'r') as f:
            source_code = f.read()
    else:
        print("Enter source code (end with Ctrl+D):")
        source_code = sys.stdin.read()
    
    if args.mode == "parse":
        # Parse and show AST
        ast = parse(source_code)
        print("Abstract Syntax Tree:")
        print(ast)
        
        # Print statements
        print("\nStatements:")
        for i, stmt in enumerate(ast.statements):
            print(f"  {i}: {stmt}")
    
    elif args.mode == "interpret":
        run_interpreter(source_code)
    
    elif args.mode == "compile":
        run_compiler(source_code)

if __name__ == "__main__":
    main()