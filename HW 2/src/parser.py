"""
Parser for the language.
Parses tokens into an Abstract Syntax Tree (AST).
"""
import ply.yacc as yacc
from lexer import lexer, tokens
from ast_nodes import *

# Precedence rules for operators (from lowest to highest)
precedence = (
    ('left', 'OR'),
    ('left', 'AND'),
    ('left', 'EQ', 'NE'),
    ('left', 'LT', 'GT', 'LE', 'GE'),
    ('left', 'PLUS', 'MINUS'),
    ('left', 'MULTIPLY', 'DIVIDE'),
    ('right', 'NOT', 'UMINUS'),
)

# Grammar rules

def p_program(p):
    '''program : statement_list'''
    p[0] = ProgramNode(p[1])

def p_statement_list(p):
    '''statement_list : statement
                     | statement statement_list'''
    if len(p) == 2:
        p[0] = [p[1]]
    else:
        p[0] = [p[1]] + p[2]

def p_statement(p):
    '''statement : variable_declaration
                 | assignment
                 | function_definition
                 | if_statement
                 | while_statement
                 | function_call SEMICOLON
                 | return_statement
                 | print_statement'''
    p[0] = p[1]

def p_variable_declaration(p):
    '''variable_declaration : LET ID ASSIGN expression SEMICOLON'''
    p[0] = VariableDeclarationNode(p[2], p[4])

def p_assignment(p):
    '''assignment : ID ASSIGN expression SEMICOLON'''
    p[0] = AssignmentNode(p[1], p[3])

def p_function_definition(p):
    '''function_definition : FUNC ID LPAREN parameter_list RPAREN LBRACE statement_list RBRACE'''
    p[0] = FunctionDefinitionNode(p[2], p[4], p[7])

def p_parameter_list(p):
    '''parameter_list : 
                     | ID
                     | ID COMMA parameter_list'''
    if len(p) == 1:
        p[0] = []
    elif len(p) == 2:
        p[0] = [p[1]]
    else:
        p[0] = [p[1]] + p[3]

def p_if_statement(p):
    '''if_statement : IF expression LBRACE statement_list RBRACE
                    | IF expression LBRACE statement_list RBRACE ELSE LBRACE statement_list RBRACE'''
    if len(p) == 6:
        p[0] = IfNode(p[2], p[4])
    else:
        p[0] = IfNode(p[2], p[4], p[8])

def p_while_statement(p):
    '''while_statement : WHILE expression LBRACE statement_list RBRACE'''
    p[0] = WhileNode(p[2], p[4])

def p_return_statement(p):
    '''return_statement : RETURN expression SEMICOLON
                        | RETURN SEMICOLON'''
    if len(p) == 4:
        p[0] = ReturnNode(p[2])
    else:
        p[0] = ReturnNode()

def p_print_statement(p):
    '''print_statement : PRINT LPAREN expression RPAREN SEMICOLON'''
    p[0] = PrintNode(p[3])

# Expression rules
def p_expression_binop(p):
    '''expression : expression PLUS expression
                  | expression MINUS expression
                  | expression MULTIPLY expression
                  | expression DIVIDE expression
                  | expression EQ expression
                  | expression NE expression
                  | expression LT expression
                  | expression GT expression
                  | expression LE expression
                  | expression GE expression
                  | expression AND expression
                  | expression OR expression'''
    p[0] = BinaryOpNode(p[1], p[2], p[3])

def p_expression_unary(p):
    '''expression : NOT expression
                  | MINUS expression %prec UMINUS'''
    p[0] = UnaryOpNode(p[1], p[2])

def p_expression_group(p):
    '''expression : LPAREN expression RPAREN'''
    p[0] = p[2]

def p_expression_literal(p):
    '''expression : literal'''
    p[0] = p[1]

def p_expression_id(p):
    '''expression : ID'''
    p[0] = IdentifierNode(p[1])

def p_expression_function_call(p):
    '''expression : function_call'''
    p[0] = p[1]

def p_expression_list_literal(p):
    '''expression : list_literal'''
    p[0] = p[1]

def p_function_call(p):
    '''function_call : ID LPAREN argument_list RPAREN'''
    p[0] = FunctionCallNode(p[1], p[3])

def p_argument_list(p):
    '''argument_list : 
                     | expression
                     | expression COMMA argument_list'''
    if len(p) == 1:
        p[0] = []
    elif len(p) == 2:
        p[0] = [p[1]]
    else:
        p[0] = [p[1]] + p[3]

def p_literal(p):
    '''literal : INTEGER
               | STRING
               | TRUE
               | FALSE
               | NULL'''
    if p.slice[1].type == 'INTEGER':
        p[0] = NumberLiteralNode(p[1])
    elif p.slice[1].type == 'STRING':
        p[0] = StringLiteralNode(p[1])
    elif p.slice[1].type == 'TRUE':
        p[0] = BooleanLiteralNode(True)
    elif p.slice[1].type == 'FALSE':
        p[0] = BooleanLiteralNode(False)
    else:  # NULL
        p[0] = NullLiteralNode()

def p_list_literal(p):
    '''list_literal : LBRACKET RBRACKET
                    | LBRACKET expression_list RBRACKET'''
    if len(p) == 3:
        p[0] = ListNode([])
    else:
        p[0] = ListNode(p[2])

def p_expression_list(p):
    '''expression_list : expression
                       | expression COMMA expression_list'''
    if len(p) == 2:
        p[0] = [p[1]]
    else:
        p[0] = [p[1]] + p[3]

# Error rule for syntax errors
def p_error(p):
    if p:
        print(f"Syntax error at line {p.lineno}: Unexpected token '{p.value}'")
    else:
        print("Syntax error: Unexpected end of input")

# Build the parser
parser = yacc.yacc()

def parse(source_code):
    """Parse source code and return AST."""
    return parser.parse(source_code, lexer=lexer)

if __name__ == '__main__':
    # Test the parser
    test_code = """
    let x = 10;
    print(x * 2);
    if x > 5 {
        print("Greater than 5");
    }
    """
    
    print("Testing parser with code:")
    print(test_code)
    
    ast = parse(test_code)
    print("\nAST:")
    print(ast)
    
    # Print statements in the AST
    print("\nStatements in program:")
    for i, stmt in enumerate(ast.statements):
        print(f"  {i}: {stmt}")