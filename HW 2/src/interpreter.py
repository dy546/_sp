"""
Interpreter for the language.
Executes the AST directly.
"""
from ast_nodes import *

class Environment:
    """Manages variable scopes."""
    def __init__(self, parent=None):
        self.variables = {}
        self.parent = parent
    
    def define(self, name, value):
        """Define a new variable in the current scope."""
        self.variables[name] = value
    
    def assign(self, name, value):
        """Assign a value to an existing variable."""
        if name in self.variables:
            self.variables[name] = value
        elif self.parent:
            self.parent.assign(name, value)
        else:
            raise NameError(f"Undefined variable: {name}")
    
    def get(self, name):
        """Get the value of a variable."""
        if name in self.variables:
            return self.variables[name]
        elif self.parent:
            return self.parent.get(name)
        else:
            raise NameError(f"Undefined variable: {name}")
    
    def has(self, name):
        """Check if a variable exists in this or parent scope."""
        if name in self.variables:
            return True
        elif self.parent:
            return self.parent.has(name)
        else:
            return False

class ReturnException(Exception):
    """Exception used to return from functions."""
    def __init__(self, value):
        self.value = value

class Interpreter:
    """Interprets and executes the AST."""
    def __init__(self):
        self.global_env = Environment()
        self.functions = {}
        self._setup_builtins()
    
    def _setup_builtins(self):
        """Setup built-in functions."""
        # print is handled specially in the interpreter
        pass
    
    def interpret(self, program_node):
        """Interpret a program."""
        try:
            for statement in program_node.statements:
                self._execute(statement, self.global_env)
        except ReturnException:
            # Return from top-level is an error
            raise RuntimeError("Cannot return from top-level")
    
    def _execute(self, node, env):
        """Execute a statement node."""
        if isinstance(node, VariableDeclarationNode):
            value = self._evaluate(node.value, env)
            env.define(node.name, value)
        
        elif isinstance(node, AssignmentNode):
            value = self._evaluate(node.value, env)
            env.assign(node.name, value)
        
        elif isinstance(node, FunctionDefinitionNode):
            self.functions[node.name] = node
        
        elif isinstance(node, IfNode):
            condition = self._evaluate(node.condition, env)
            if self._is_truthy(condition):
                for stmt in node.then_branch:
                    self._execute(stmt, env)
            elif node.else_branch:
                for stmt in node.else_branch:
                    self._execute(stmt, env)
        
        elif isinstance(node, WhileNode):
            while self._is_truthy(self._evaluate(node.condition, env)):
                for stmt in node.body:
                    self._execute(stmt, env)
        
        elif isinstance(node, PrintNode):
            value = self._evaluate(node.expression, env)
            print(self._stringify(value))
        
        elif isinstance(node, ReturnNode):
            if node.value:
                value = self._evaluate(node.value, env)
                raise ReturnException(value)
            else:
                raise ReturnException(None)
        
        elif isinstance(node, FunctionCallNode):
            self._call_function(node, env)
        
        else:
            raise RuntimeError(f"Unknown statement type: {type(node)}")
    
    def _evaluate(self, node, env):
        """Evaluate an expression node."""
        if isinstance(node, NumberLiteralNode):
            return node.value
        
        elif isinstance(node, StringLiteralNode):
            return node.value
        
        elif isinstance(node, BooleanLiteralNode):
            return node.value
        
        elif isinstance(node, NullLiteralNode):
            return None
        
        elif isinstance(node, IdentifierNode):
            return env.get(node.name)
        
        elif isinstance(node, BinaryOpNode):
            left = self._evaluate(node.left, env)
            right = self._evaluate(node.right, env)
            
            # Perform the operation
            if node.op == '+':
                # Allow string concatenation and number addition
                if isinstance(left, str) and isinstance(right, str):
                    return left + right
                elif isinstance(left, (int, float)) and isinstance(right, (int, float)):
                    return left + right
                else:
                    # Try to convert to string for concatenation
                    try:
                        return str(left) + str(right)
                    except:
                        raise TypeError(f"Cannot add {type(left).__name__} and {type(right).__name__}")
            elif node.op == '-':
                # Type checking for subtraction
                if not (isinstance(left, (int, float)) and isinstance(right, (int, float))):
                    raise TypeError(f"Cannot perform {node.op} on {type(left).__name__} and {type(right).__name__}")
                return left - right
            elif node.op == '*':
                # Type checking for multiplication
                if not (isinstance(left, (int, float)) and isinstance(right, (int, float))):
                    raise TypeError(f"Cannot perform {node.op} on {type(left).__name__} and {type(right).__name__}")
                return left * right
            elif node.op == '/':
                # Type checking for division
                if not (isinstance(left, (int, float)) and isinstance(right, (int, float))):
                    raise TypeError(f"Cannot perform {node.op} on {type(left).__name__} and {type(right).__name__}")
                if right == 0:
                    raise ZeroDivisionError("Division by zero")
                return left / right
            elif node.op == '==':
                return left == right
            elif node.op == '!=':
                return left != right
            elif node.op == '<':
                return left < right
            elif node.op == '>':
                return left > right
            elif node.op == '<=':
                return left <= right
            elif node.op == '>=':
                return left >= right
            elif node.op == '&&':
                return self._is_truthy(left) and self._is_truthy(right)
            elif node.op == '||':
                return self._is_truthy(left) or self._is_truthy(right)
            else:
                raise RuntimeError(f"Unknown operator: {node.op}")
        
        elif isinstance(node, UnaryOpNode):
            operand = self._evaluate(node.operand, env)
            
            if node.op == '!':
                return not self._is_truthy(operand)
            elif node.op == '-':
                if not isinstance(operand, (int, float)):
                    raise TypeError(f"Cannot negate {type(operand).__name__}")
                return -operand
            else:
                raise RuntimeError(f"Unknown unary operator: {node.op}")
        
        elif isinstance(node, FunctionCallNode):
            return self._call_function(node, env, as_expression=True)
        
        elif isinstance(node, ListNode):
            return [self._evaluate(elem, env) for elem in node.elements]
        
        else:
            raise RuntimeError(f"Unknown expression type: {type(node)}")
    
    def _call_function(self, node, env, as_expression=False):
        """Call a function."""
        if node.name == 'print':
            # Built-in print function
            if len(node.args) != 1:
                raise TypeError(f"print() takes exactly 1 argument, got {len(node.args)}")
            value = self._evaluate(node.args[0], env)
            print(self._stringify(value))
            return None
        
        # User-defined function
        if node.name not in self.functions:
            raise NameError(f"Undefined function: {node.name}")
        
        func_def = self.functions[node.name]
        
        # Check argument count
        if len(node.args) != len(func_def.params):
            raise TypeError(f"{node.name}() takes {len(func_def.params)} arguments, got {len(node.args)}")
        
        # Create new environment for function
        func_env = Environment(self.global_env)
        
        # Bind arguments to parameters
        for param, arg in zip(func_def.params, node.args):
            value = self._evaluate(arg, env)
            func_env.define(param, value)
        
        # Execute function body
        try:
            for stmt in func_def.body:
                self._execute(stmt, func_env)
            return None  # No return statement
        except ReturnException as e:
            return e.value
    
    def _is_truthy(self, value):
        """Determine if a value is truthy."""
        if value is None:
            return False
        elif isinstance(value, bool):
            return value
        elif isinstance(value, (int, float)):
            return value != 0
        elif isinstance(value, str):
            return len(value) > 0
        elif isinstance(value, list):
            return len(value) > 0
        else:
            return True
    
    def _stringify(self, value):
        """Convert a value to a string for printing."""
        if value is None:
            return "null"
        elif isinstance(value, bool):
            return "true" if value else "false"
        elif isinstance(value, list):
            items = [self._stringify(item) for item in value]
            return f"[{', '.join(items)}]"
        else:
            return str(value)

def interpret_source(source_code):
    """Convenience function to interpret source code."""
    from parser import parse
    ast = parse(source_code)
    interpreter = Interpreter()
    interpreter.interpret(ast)

if __name__ == '__main__':
    # Test the interpreter
    test_code = """
    let x = 10;
    print(x * 2);
    
    if x > 5 {
        print("Greater than 5");
    }
    
    let count = 0;
    while count < 3 {
        print(count);
        count = count + 1;
    }
    
    func add(a, b) {
        return a + b;
    }
    
    let result = add(5, 7);
    print("Result: " + result);
    
    let my_list = [1, "hello", true];
    print(my_list);
    """
    
    print("Testing interpreter with code:")
    print(test_code)
    print("\nOutput:")
    
    try:
        interpret_source(test_code)
    except Exception as e:
        print(f"Error: {e}")