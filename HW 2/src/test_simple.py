#!/usr/bin/env python3
"""
Simple test to verify the language tools work.
"""
import sys
import os

# Add current directory to path
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

from parser import parse
from interpreter import interpret_source
from compiler import compile_source
from vm import run_bytecode

def test_lexer_parser():
    """Test lexer and parser."""
    print("Testing lexer and parser...")
    
    source_code = """
    let x = 10;
    print(x * 2);
    """
    
    ast = parse(source_code)
    print(f"✓ AST created: {type(ast).__name__}")
    print(f"  Statements: {len(ast.statements)}")
    
    return True

def test_interpreter():
    """Test interpreter."""
    print("\nTesting interpreter...")
    
    source_code = """
    let x = 10;
    let y = 20;
    let sum = x + y;
    print("Sum: " + sum);
    """
    
    print("Running interpreter...")
    interpret_source(source_code)
    
    return True

def test_compiler_vm():
    """Test compiler and VM."""
    print("\nTesting compiler and VM...")
    
    source_code = """
    let x = 10;
    print(x * 2);
    """
    
    print("Compiling...")
    code, constants = compile_source(source_code)
    
    print(f"  Generated {len(code)} bytecode instructions")
    print(f"  Constants: {constants}")
    
    print("Running VM...")
    run_bytecode(code, constants)
    
    return True

def test_control_flow():
    """Test control flow."""
    print("\nTesting control flow...")
    
    source_code = """
    let number = 15;
    
    if number > 10 {
        print("Greater than 10");
    }
    
    let count = 0;
    while count < 3 {
        print("Count: " + count);
        count = count + 1;
    }
    """
    
    print("Running interpreter with control flow...")
    interpret_source(source_code)
    
    return True

def main():
    """Run all tests."""
    print("=" * 60)
    print("Testing Language Implementation")
    print("=" * 60)
    
    tests = [
        test_lexer_parser,
        test_interpreter,
        test_compiler_vm,
        test_control_flow,
    ]
    
    passed = 0
    total = len(tests)
    
    for test in tests:
        try:
            if test():
                print(f"✓ {test.__name__} passed")
                passed += 1
            else:
                print(f"✗ {test.__name__} failed")
        except Exception as e:
            print(f"✗ {test.__name__} failed with error: {e}")
    
    print("\n" + "=" * 60)
    print(f"Test Results: {passed}/{total} passed")
    
    if passed == total:
        print("✓ All tests passed!")
        return 0
    else:
        print("✗ Some tests failed")
        return 1

if __name__ == "__main__":
    sys.exit(main())