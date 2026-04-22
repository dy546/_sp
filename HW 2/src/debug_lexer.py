#!/usr/bin/env python3
"""Debug lexer."""
import sys
sys.path.insert(0, '.')

from lexer import tokenize

code = 'let x = [1, 2, 3]; print(x);'
print(f"Code: {code}")
print("\nTokens:")

for token in tokenize(code):
    print(f"  {token.type}: {repr(token.value)} at line {token.lineno}")