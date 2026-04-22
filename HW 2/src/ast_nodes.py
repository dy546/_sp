"""
AST (Abstract Syntax Tree) node definitions for the language.
Each node represents a construct in the language grammar.
"""

class ASTNode:
    """Base class for all AST nodes."""
    def __init__(self):
        pass
    
    def __repr__(self):
        return f"{self.__class__.__name__}()"

class ProgramNode(ASTNode):
    """Represents an entire program."""
    def __init__(self, statements):
        super().__init__()
        self.statements = statements
    
    def __repr__(self):
        return f"ProgramNode(statements={self.statements})"

class VariableDeclarationNode(ASTNode):
    """Represents a variable declaration: let x = value"""
    def __init__(self, name, value):
        super().__init__()
        self.name = name
        self.value = value
    
    def __repr__(self):
        return f"VariableDeclarationNode(name='{self.name}', value={self.value})"

class AssignmentNode(ASTNode):
    """Represents an assignment: x = value"""
    def __init__(self, name, value):
        super().__init__()
        self.name = name
        self.value = value
    
    def __repr__(self):
        return f"AssignmentNode(name='{self.name}', value={self.value})"

class BinaryOpNode(ASTNode):
    """Represents a binary operation: left op right"""
    def __init__(self, left, op, right):
        super().__init__()
        self.left = left
        self.op = op
        self.right = right
    
    def __repr__(self):
        return f"BinaryOpNode(left={self.left}, op='{self.op}', right={self.right})"

class UnaryOpNode(ASTNode):
    """Represents a unary operation: op operand"""
    def __init__(self, op, operand):
        super().__init__()
        self.op = op
        self.operand = operand
    
    def __repr__(self):
        return f"UnaryOpNode(op='{self.op}', operand={self.operand})"

class NumberLiteralNode(ASTNode):
    """Represents a number literal: 123"""
    def __init__(self, value):
        super().__init__()
        self.value = value
    
    def __repr__(self):
        return f"NumberLiteralNode(value={self.value})"

class StringLiteralNode(ASTNode):
    """Represents a string literal: "hello" """
    def __init__(self, value):
        super().__init__()
        self.value = value
    
    def __repr__(self):
        return f"StringLiteralNode(value='{self.value}')"

class BooleanLiteralNode(ASTNode):
    """Represents a boolean literal: true or false"""
    def __init__(self, value):
        super().__init__()
        self.value = value
    
    def __repr__(self):
        return f"BooleanLiteralNode(value={self.value})"

class NullLiteralNode(ASTNode):
    """Represents a null literal: null"""
    def __init__(self):
        super().__init__()
    
    def __repr__(self):
        return "NullLiteralNode()"

class IdentifierNode(ASTNode):
    """Represents an identifier/variable name: x"""
    def __init__(self, name):
        super().__init__()
        self.name = name
    
    def __repr__(self):
        return f"IdentifierNode(name='{self.name}')"

class PrintNode(ASTNode):
    """Represents a print statement: print(expression)"""
    def __init__(self, expression):
        super().__init__()
        self.expression = expression
    
    def __repr__(self):
        return f"PrintNode(expression={self.expression})"

class FunctionDefinitionNode(ASTNode):
    """Represents a function definition: func name(params) { body }"""
    def __init__(self, name, params, body):
        super().__init__()
        self.name = name
        self.params = params
        self.body = body
    
    def __repr__(self):
        return f"FunctionDefinitionNode(name='{self.name}', params={self.params}, body={self.body})"

class FunctionCallNode(ASTNode):
    """Represents a function call: name(args)"""
    def __init__(self, name, args):
        super().__init__()
        self.name = name
        self.args = args
    
    def __repr__(self):
        return f"FunctionCallNode(name='{self.name}', args={self.args})"

class IfNode(ASTNode):
    """Represents an if statement: if condition { then } else { else }"""
    def __init__(self, condition, then_branch, else_branch=None):
        super().__init__()
        self.condition = condition
        self.then_branch = then_branch
        self.else_branch = else_branch
    
    def __repr__(self):
        return f"IfNode(condition={self.condition}, then={self.then_branch}, else={self.else_branch})"

class WhileNode(ASTNode):
    """Represents a while loop: while condition { body }"""
    def __init__(self, condition, body):
        super().__init__()
        self.condition = condition
        self.body = body
    
    def __repr__(self):
        return f"WhileNode(condition={self.condition}, body={self.body})"

class ReturnNode(ASTNode):
    """Represents a return statement: return value"""
    def __init__(self, value=None):
        super().__init__()
        self.value = value
    
    def __repr__(self):
        return f"ReturnNode(value={self.value})"

class ListNode(ASTNode):
    """Represents a list literal: [item1, item2, ...]"""
    def __init__(self, elements):
        super().__init__()
        self.elements = elements
    
    def __repr__(self):
        return f"ListNode(elements={self.elements})"