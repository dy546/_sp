"""
Compiler for the language.
Compiles AST to bytecode for the virtual machine.
"""
from ast_nodes import *

# Bytecode instruction opcodes
class Opcode:
    # Constants
    PUSH_CONST = 0
    PUSH_NULL = 1
    PUSH_TRUE = 2
    PUSH_FALSE = 3
    
    # Variables
    LOAD_VAR = 10
    STORE_VAR = 11
    DEFINE_VAR = 12
    
    # Arithmetic
    ADD = 20
    SUB = 21
    MUL = 22
    DIV = 23
    NEG = 24
    
    # Comparison
    EQ = 30
    NE = 31
    LT = 32
    GT = 33
    LE = 34
    GE = 35
    
    # Logical
    NOT = 40
    AND = 41
    OR = 42
    
    # Control flow
    JUMP = 50
    JUMP_IF_FALSE = 51
    JUMP_IF_TRUE = 52
    
    # Functions
    CALL = 60
    RETURN = 61
    
    # Built-ins
    PRINT = 70
    
    # Lists
    BUILD_LIST = 80

class Bytecode:
    """Represents a bytecode instruction."""
    def __init__(self, opcode, *args):
        self.opcode = opcode
        self.args = args
    
    def __repr__(self):
        opcode_name = {v: k for k, v in Opcode.__dict__.items() if not k.startswith('_')}[self.opcode]
        if self.args:
            return f"{opcode_name}({', '.join(map(str, self.args))})"
        else:
            return opcode_name

class Compiler:
    """Compiles AST to bytecode."""
    def __init__(self):
        self.code = []
        self.constants = []
        self.variables = {}
        self.functions = {}
        self.labels = {}
        self.next_label_id = 0
    
    def compile(self, program_node):
        """Compile a program to bytecode."""
        self.code = []
        self.constants = []
        self.variables = {}
        self.functions = {}
        self.labels = {}
        self.next_label_id = 0
        
        for statement in program_node.statements:
            self._compile_statement(statement)
        
        return self.code, self.constants
    
    def _emit(self, opcode, *args):
        """Emit a bytecode instruction."""
        self.code.append(Bytecode(opcode, *args))
    
    def _add_constant(self, value):
        """Add a constant to the constant pool and return its index."""
        self.constants.append(value)
        return len(self.constants) - 1
    
    def _new_label(self):
        """Create a new label."""
        label = f"L{self.next_label_id}"
        self.next_label_id += 1
        return label
    
    def _mark_label(self, label):
        """Mark a label at the current position."""
        self.labels[label] = len(self.code)
    
    def _compile_statement(self, node):
        """Compile a statement node."""
        if isinstance(node, VariableDeclarationNode):
            self._compile_expression(node.value)
            var_index = self._get_variable_index(node.name)
            self._emit(Opcode.DEFINE_VAR, var_index)
        
        elif isinstance(node, AssignmentNode):
            self._compile_expression(node.value)
            var_index = self._get_variable_index(node.name)
            self._emit(Opcode.STORE_VAR, var_index)
        
        elif isinstance(node, FunctionDefinitionNode):
            # Store function metadata
            self.functions[node.name] = {
                'params': node.params,
                'body': node.body,
                'local_vars': set(node.params)  # Parameters are local variables
            }
        
        elif isinstance(node, IfNode):
            self._compile_expression(node.condition)
            
            else_label = self._new_label()
            end_label = self._new_label()
            
            # Jump to else if condition is false
            self._emit(Opcode.JUMP_IF_FALSE, else_label)
            
            # Compile then branch
            for stmt in node.then_branch:
                self._compile_statement(stmt)
            
            # Jump to end (skip else)
            self._emit(Opcode.JUMP, end_label)
            
            # Else branch
            self._mark_label(else_label)
            if node.else_branch:
                for stmt in node.else_branch:
                    self._compile_statement(stmt)
            
            self._mark_label(end_label)
        
        elif isinstance(node, WhileNode):
            start_label = self._new_label()
            end_label = self._new_label()
            
            self._mark_label(start_label)
            self._compile_expression(node.condition)
            self._emit(Opcode.JUMP_IF_FALSE, end_label)
            
            for stmt in node.body:
                self._compile_statement(stmt)
            
            self._emit(Opcode.JUMP, start_label)
            self._mark_label(end_label)
        
        elif isinstance(node, PrintNode):
            self._compile_expression(node.expression)
            self._emit(Opcode.PRINT)
        
        elif isinstance(node, ReturnNode):
            if node.value:
                self._compile_expression(node.value)
            else:
                self._emit(Opcode.PUSH_NULL)
            self._emit(Opcode.RETURN)
        
        elif isinstance(node, FunctionCallNode):
            self._compile_expression(node)
        
        else:
            raise RuntimeError(f"Unknown statement type: {type(node)}")
    
    def _compile_expression(self, node):
        """Compile an expression node."""
        if isinstance(node, NumberLiteralNode):
            const_index = self._add_constant(node.value)
            self._emit(Opcode.PUSH_CONST, const_index)
        
        elif isinstance(node, StringLiteralNode):
            const_index = self._add_constant(node.value)
            self._emit(Opcode.PUSH_CONST, const_index)
        
        elif isinstance(node, BooleanLiteralNode):
            if node.value:
                self._emit(Opcode.PUSH_TRUE)
            else:
                self._emit(Opcode.PUSH_FALSE)
        
        elif isinstance(node, NullLiteralNode):
            self._emit(Opcode.PUSH_NULL)
        
        elif isinstance(node, IdentifierNode):
            var_index = self._get_variable_index(node.name)
            self._emit(Opcode.LOAD_VAR, var_index)
        
        elif isinstance(node, BinaryOpNode):
            self._compile_expression(node.left)
            self._compile_expression(node.right)
            
            if node.op == '+':
                self._emit(Opcode.ADD)
            elif node.op == '-':
                self._emit(Opcode.SUB)
            elif node.op == '*':
                self._emit(Opcode.MUL)
            elif node.op == '/':
                self._emit(Opcode.DIV)
            elif node.op == '==':
                self._emit(Opcode.EQ)
            elif node.op == '!=':
                self._emit(Opcode.NE)
            elif node.op == '<':
                self._emit(Opcode.LT)
            elif node.op == '>':
                self._emit(Opcode.GT)
            elif node.op == '<=':
                self._emit(Opcode.LE)
            elif node.op == '>=':
                self._emit(Opcode.GE)
            elif node.op == '&&':
                self._emit(Opcode.AND)
            elif node.op == '||':
                self._emit(Opcode.OR)
            else:
                raise RuntimeError(f"Unknown binary operator: {node.op}")
        
        elif isinstance(node, UnaryOpNode):
            self._compile_expression(node.operand)
            
            if node.op == '!':
                self._emit(Opcode.NOT)
            elif node.op == '-':
                self._emit(Opcode.NEG)
            else:
                raise RuntimeError(f"Unknown unary operator: {node.op}")
        
        elif isinstance(node, FunctionCallNode):
            # Compile arguments
            for arg in node.args:
                self._compile_expression(arg)
            
            # Call function
            if node.name == 'print':
                if len(node.args) != 1:
                    raise TypeError(f"print() takes exactly 1 argument, got {len(node.args)}")
                self._emit(Opcode.PRINT)
                self._emit(Opcode.PUSH_NULL)  # print returns null
            else:
                # User-defined function
                if node.name not in self.functions:
                    raise NameError(f"Undefined function: {node.name}")
                
                func = self.functions[node.name]
                if len(node.args) != len(func['params']):
                    raise TypeError(f"{node.name}() takes {len(func['params'])} arguments, got {len(node.args)}")
                
                # TODO: Implement function calls in bytecode
                # For now, we'll compile the function inline
                # This is a simplification for the prototype
                raise NotImplementedError("Function calls in bytecode not yet implemented")
        
        elif isinstance(node, ListNode):
            # Compile list elements
            for elem in node.elements:
                self._compile_expression(elem)
            
            # Build list
            self._emit(Opcode.BUILD_LIST, len(node.elements))
        
        else:
            raise RuntimeError(f"Unknown expression type: {type(node)}")
    
    def _get_variable_index(self, name):
        """Get or create a variable index."""
        if name not in self.variables:
            self.variables[name] = len(self.variables)
        return self.variables[name]

def compile_source(source_code):
    """Convenience function to compile source code to bytecode."""
    from parser import parse
    ast = parse(source_code)
    compiler = Compiler()
    return compiler.compile(ast)

if __name__ == '__main__':
    # Test the compiler
    test_code = """
    let x = 10;
    print(x * 2);
    
    if x > 5 {
        print("Greater than 5");
    }
    """
    
    print("Testing compiler with code:")
    print(test_code)
    
    code, constants = compile_source(test_code)
    
    print("\nConstants:")
    for i, const in enumerate(constants):
        print(f"  {i}: {repr(const)}")
    
    print("\nBytecode:")
    for i, instr in enumerate(code):
        print(f"  {i:3d}: {instr}")