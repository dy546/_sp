# Programming Language Implementation

A complete implementation of a programming language with parser, interpreter, and compiler in Python.

## Language Features

- **Dynamic typing** - Types determined at runtime
- **Automatic memory management** - No manual memory management needed
- **Basic syntax**:
  - Variable declarations: `let x = 10;`
  - Arithmetic: `+`, `-`, `*`, `/`
  - Comparisons: `==`, `!=`, `<`, `>`, `<=`, `>=`
  - Logical: `&&`, `||`, `!`
  - Control flow: `if/else`, `while`
  - Functions: `func name(params) { ... }`, `return`
  - Built-in: `print()`
  - Data structures: Lists `[1, 2, 3]`
  - Literals: integers, strings, booleans (`true`, `false`), `null`

## Project Structure

```
src/
├── ast_nodes.py          # AST node definitions
├── lexer.py             # Lexical analyzer (tokenizer)
├── parser.py            # Parser (builds AST from tokens)
├── interpreter.py       # Interpreter (executes AST directly)
├── compiler.py          # Compiler (AST to bytecode)
├── vm.py                # Virtual Machine (executes bytecode)
├── main.py              # Command-line interface
└── examples/            # Example programs
    ├── hello_world.lang
    ├── arithmetic.lang
    ├── control_flow.lang
    ├── functions.lang
    └── lists.lang
```

## Installation

1. Create and activate virtual environment:
```bash
python3 -m venv venv
source venv/bin/activate
```

2. Install dependencies:
```bash
pip install ply
```

## Usage

### Command Line Interface

```bash
# Parse and show AST
python src/main.py parse src/examples/hello_world.lang

# Interpret and execute
python src/main.py interpret src/examples/arithmetic.lang

# Compile to bytecode and run in VM
python src/main.py compile src/examples/control_flow.lang
```

### Interactive Mode

```bash
# Parse from stdin
python src/main.py parse
# Enter code, then Ctrl+D

# Interpret from stdin
python src/main.py interpret
```

### Direct Python API

```python
from parser import parse
from interpreter import interpret_source
from compiler import compile_source
from vm import run_bytecode

# Parse
ast = parse("let x = 10; print(x);")

# Interpret
interpret_source("let x = 10; print(x);")

# Compile and run
code, constants = compile_source("let x = 10; print(x);")
run_bytecode(code, constants)
```

## Example Programs

### Hello World
```javascript
print("Hello, World!");
```

### Arithmetic
```javascript
let x = 10;
let y = 20;
let sum = x + y;
print("Sum: " + sum);
```

### Control Flow
```javascript
let number = 15;
if number > 10 {
    print("Greater than 10");
}

let count = 0;
while count < 3 {
    print(count);
    count = count + 1;
}
```

### Functions
```javascript
func add(a, b) {
    return a + b;
}

let result = add(5, 7);
print("Result: " + result);
```

### Lists
```javascript
let numbers = [1, 2, 3, 4, 5];
print(numbers);
```

## Implementation Details

### Lexer (`lexer.py`)
- Tokenizes source code using `ply.lex`
- Recognizes keywords, identifiers, literals, operators
- Handles comments and whitespace

### Parser (`parser.py`)
- Builds AST from tokens using `ply.yacc`
- Implements grammar based on EBNF specification
- Creates AST nodes defined in `ast_nodes.py`

### Interpreter (`interpreter.py`)
- Executes AST directly using visitor pattern
- Manages variable scopes with `Environment` class
- Handles dynamic typing and runtime type checking
- Supports functions with local scopes

### Compiler (`compiler.py`)
- Compiles AST to bytecode instructions
- Defines opcodes for VM operations
- Manages constant pool and variable indices

### Virtual Machine (`vm.py`)
- Stack-based VM architecture
- Executes bytecode instructions
- Manages runtime stack and variables

## Grammar (EBNF)

```
program ::= statement*
statement ::= variable_declaration | assignment | function_definition
            | if_statement | while_statement | function_call
            | return_statement | print_statement
variable_declaration ::= "let" identifier "=" expression
assignment ::= identifier "=" expression
function_definition ::= "func" identifier "(" [parameter_list] ")" "{" statement* "}"
if_statement ::= "if" expression "{" statement* "}" ["else" "{" statement* "}"]
while_statement ::= "while" expression "{" statement* "}"
print_statement ::= "print" "(" expression ")"
expression ::= term (("+" | "-") term)*
term ::= factor (("*" | "/") factor)*
factor ::= literal | identifier | function_call | "(" expression ")"
literal ::= integer | string | "true" | "false" | "null"
```

## Limitations

1. **Current implementation**:
   - Basic arithmetic and control flow work
   - Functions work in interpreter but not fully in compiler
   - Lists work but indexing not implemented
   - No error recovery in parser

2. **Future enhancements**:
   - Complete bytecode implementation for functions
   - List indexing and operations
   - More built-in functions
   - Better error messages
   - Standard library

## Testing

Run the test examples:
```bash
cd src
python -m pytest tests/ -v
```

Or test individual components:
```bash
python lexer.py
python parser.py
python interpreter.py
python compiler.py
python vm.py
```