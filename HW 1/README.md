# p0 Compiler - While Handler Design & Function Call Mechanism

## While Handler Design Principles

### Two-Jump Mechanism

The while handler uses a two-jump approach to implement loops:

```
while (condition) {
    body
}
```

Generates the following quad sequence:

1. **Condition Evaluation**: Emit comparison quads (e.g., `CMP_LT`, `CMP_EQ`, etc.)
2. **JMP_F**: Conditional jump - exit loop if condition is false
3. **Body**: Loop body statements
4. **JMP**: Unconditional jump - loop back to condition

### Backpatching Technique

The handler emits jumps with placeholder targets ("?") and fixes them after the loop body is parsed:

```c
} else if (cur_token.type == TK_WHILE) {
    next_token();
    next_token();
    int loop_start = quad_count;
    char cond[32];
    expression(cond);
    next_token();
    next_token();
    int jmp_f_idx = quad_count;
    emit("JMP_F", cond, "-", "?");
    while (cur_token.type != TK_RBRACE)
      statement();
    next_token();
    int jmp_idx = quad_count;
    emit("JMP", "-", "-", "?");
    sprintf(quads[jmp_f_idx].result, "%d", quad_count);
    sprintf(quads[jmp_idx].result, "%d", loop_start);
}
```

1. Record `loop_start` = current PC before parsing condition
2. Emit `JMP_F` with placeholder "?" - records position in `jmp_f_idx`
3. Parse body statements
4. Emit unconditional `JMP` - records position in `jmp_idx`
5. Backpatch: JMP_F target = current PC (after loop body)
6. Backpatch: JMP target = loop_start (back to condition)

### Consistency with IF Handler

The while handler follows the same pattern as the existing if handler for consistency:
- Uses the same backpatching technique
- Uses the same `JMP_F` quad instruction
- Token-based parsing approach

### VM Support

The VM needs one additional opcode:
```c
else if (strcmp(q.op, "JMP") == 0) {
    pc = atoi(q.result) - 1;
}
```

---

## Function Call Mechanism

The p0 compiler uses a stack-based calling convention with frame-based local variable management.

### Parsing Phase

During parsing, function calls are handled in `factor()` (lines 200-215):

```c
if (cur_token.type == TK_LPAREN) {
    next_token();
    int count = 0;
    while (cur_token.type != TK_RPAREN) {
        char arg[32];
        expression(arg);
        emit("PARAM", arg, "-", "-");
        count++;
        if (cur_token.type == TK_COMMA)
            next_token();
    }
    next_token();
    new_t(res);
    char c_str[10];
    sprintf(c_str, "%d", count);
    emit("CALL", name, c_str, res);
}
```

1. Parse arguments, emit `PARAM` for each
2. Count arguments
3. Emit `CALL func_name, arg_count, result_var`

### VM Execution Phase

#### CALL Handler (lines 464-481)

```c
} else if (strcmp(q.op, "CALL") == 0) {
    int p_count = atoi(q.arg2);
    int target_pc = -1;
    for (int i = 0; i < f_count; i++)
        if (strcmp(func_names[i], q.arg1) == 0)
            target_pc = func_pc[i];

    sp++;
    stack[sp].count = 0;
    stack[sp].ret_pc = pc + 1;
    strcpy(stack[sp].ret_var, q.result);
    stack[sp].formal_idx = 0;

    for (int i = 0; i < p_count; i++)
        stack[sp].incoming_args[i] = param_stack[param_sp - p_count + i];
    param_sp -= p_count;
    pc = target_pc;
    continue;
}
```

Steps:
1. Look up function's PC from func_names table
2. Push new frame: `sp++`
3. Save return PC (pc + 1) for returning
4. Save result variable name (where to store return value)
5. Copy arguments from param_stack to frame's incoming_args array
6. Jump to function's PC

#### FORMAL Handler (lines 482-483)

```c
} else if (strcmp(q.op, "FORMAL") == 0) {
    set_var(q.arg1, stack[sp].incoming_args[stack[sp].formal_idx++]);
}
```

Bind each formal parameter name to the incoming argument value.

#### RET_VAL Handler (lines 484-492)

```c
} else if (strcmp(q.op, "RET_VAL") == 0) {
    int ret_val = get_var(q.arg1);
    int ret_address = stack[sp].ret_pc;
    char target_var[32];
    strcpy(target_var, stack[sp].ret_var);
    sp--;
    set_var(target_var, ret_val);
    pc = ret_address;
    continue;
}
```

Steps:
1. Get the return value from the current frame
2. Pop the frame: `sp--`
3. Store return value in the caller's result variable
4. Jump back to return PC

### Frame Structure

```c
typedef struct {
    char names[100][32];      // variable names in this frame
    int values[100];          // variable values
    int count;               // number of variables
    int ret_pc;             // return address
    char ret_var[32];        // where to store return value
    int incoming_args[10];    // arguments passed to this function
    int formal_idx;          // index for reading incoming args
} Frame;
```

### Call Flow Summary

```
Caller:
  1. emit PARAM arg1
  2. emit PARAM arg2
  3. emit CALL foo, 2, result_var

Callee (at new PC):
  4. emit FORMAL param1   // binds incoming_args[0] to param1
  5. emit FORMAL param2  // binds incoming_args[1] to param2
  ... body statements ...
  6. emit RET_VAL result_var

VM execution:
  - CALL: pushes frame, saves ret_pc, copies args
  - FORMAL: binds args to param names in frame
  - RET_VAL: restores pc to ret_pc, stores return value
```

---

## Implementation Summary

### Files Modified
- `compiler.c`: Added while handler support

### Changes Made
1. Added `TK_WHILE` token type (line 40)
2. Added lexer recognition for "while" keyword (line 121)
3. Added while handler in `statement()` function (lines 303-319)
4. Added `JMP` opcode handling in VM (line 461)

### Supported Syntax

```ebnf
while_statement = "while" "(" expression ")" "{" statement_list "}"
statement_list = statement { statement }
statement = assignment | if_statement | while_statement | return_statement
```
