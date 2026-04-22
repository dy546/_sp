"""
Lexer for the language.
Tokenizes source code into a stream of tokens.
"""
import ply.lex as lex

# List of token names
tokens = [
    # Keywords
    'LET', 'PRINT', 'FUNC', 'RETURN', 'IF', 'ELSE', 'WHILE', 'TRUE', 'FALSE', 'NULL',
    
    # Identifiers
    'ID',
    
    # Literals
    'INTEGER', 'STRING',
    
    # Operators
    'PLUS', 'MINUS', 'MULTIPLY', 'DIVIDE',
    'ASSIGN', 'EQ', 'NE', 'LT', 'GT', 'LE', 'GE',
    'AND', 'OR', 'NOT',
    
    # Punctuation
    'LPAREN', 'RPAREN', 'LBRACE', 'RBRACE', 'LBRACKET', 'RBRACKET',
    'COMMA', 'SEMICOLON',
]

# Reserved keywords
reserved = {
    'let': 'LET',
    'print': 'PRINT',
    'func': 'FUNC',
    'return': 'RETURN',
    'if': 'IF',
    'else': 'ELSE',
    'while': 'WHILE',
    'true': 'TRUE',
    'false': 'FALSE',
    'null': 'NULL',
}

# Simple token definitions
t_PLUS = r'\+'
t_MINUS = r'-'
t_MULTIPLY = r'\*'
t_DIVIDE = r'/'
t_ASSIGN = r'='
t_EQ = r'=='
t_NE = r'!='
t_LT = r'<'
t_GT = r'>'
t_LE = r'<='
t_GE = r'>='
t_AND = r'&&'
t_OR = r'\|\|'
t_NOT = r'!'
t_LPAREN = r'\('
t_RPAREN = r'\)'
t_LBRACE = r'\{'
t_RBRACE = r'\}'
t_LBRACKET = r'\['
t_RBRACKET = r'\]'
t_COMMA = r','
t_SEMICOLON = r';'

# String literal
def t_STRING(t):
    r'\"([^\\\"]|\\.)*\"'
    # Remove quotes and handle escape sequences
    t.value = t.value[1:-1].replace('\\n', '\n').replace('\\t', '\t').replace('\\"', '"').replace('\\\\', '\\')
    return t

# Integer literal
def t_INTEGER(t):
    r'\d+'
    t.value = int(t.value)
    return t

# Identifier or keyword
def t_ID(t):
    r'[a-zA-Z_][a-zA-Z0-9_]*'
    # Check if it's a reserved keyword
    t.type = reserved.get(t.value, 'ID')
    return t

# Define a rule to track line numbers
def t_newline(t):
    r'\n+'
    t.lexer.lineno += len(t.value)

# Ignored characters (whitespace and tabs)
t_ignore = ' \t'

# Single-line comments
def t_COMMENT(t):
    r'//.*'
    pass  # No return value, token discarded

# Multi-line comments
def t_MULTILINE_COMMENT(t):
    r'/\*(.|\n)*?\*/'
    t.lexer.lineno += t.value.count('\n')
    pass  # No return value, token discarded

# Error handling
def t_error(t):
    print(f"Lexical error at line {t.lineno}: Illegal character '{t.value[0]}'")
    t.lexer.skip(1)

# Build the lexer
lexer = lex.lex()

def tokenize(source_code):
    """Tokenize source code and return list of tokens."""
    lexer.input(source_code)
    tokens = []
    while True:
        tok = lexer.token()
        if not tok:
            break
        tokens.append(tok)
    return tokens

if __name__ == '__main__':
    # Test the lexer
    test_code = """
    let x = 10
    print(x * 2)
    if x > 5 {
        print("Greater than 5")
    }
    """
    
    print("Testing lexer with code:")
    print(test_code)
    print("\nTokens:")
    
    for token in tokenize(test_code):
        print(f"  {token.type}: {repr(token.value)} at line {token.lineno}")