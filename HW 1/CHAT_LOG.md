# Chat Log - p0 Compiler While Handler Implementation

## Session Summary

**Date**: 2026-04-22
**Task**: Add while syntax handling to p0 compiler and document function call mechanism

---

## User Request

> Add the handling of the while syntax, and then explain the design principles of your while handler code. Understand how the function call mechanism works in the p0 compiler.

---

## Actions Taken

### 1. Explored Compiler Structure

Analyzed `/home/user/System Programming/_sp/HW 1/compiler.c`:
- Token types (lines 36-57)
- Lexer with keyword recognition
- Statement parser with if-handler pattern
- VM with quad execution

### 2. Implemented While Handler

**Step 1**: Added `TK_WHILE` token type (line 40)
```c
TK_WHILE,
```

**Step 2**: Added lexer recognition (line 121)
```c
else if (strcmp(cur_token.text, "while") == 0)
  cur_token.type = TK_WHILE;
```

**Step 3**: Added while handler in statement() (lines 303-319)
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

**Step 4**: Added JMP opcode in VM (line 461)
```c
else if (strcmp(q.op, "JMP") == 0) {
    pc = atoi(q.result) - 1;
}
```

### 3. Tested Implementation

```bash
./compiler p0/while.p0
```

Output:
```
000: IMM        1          -          t1
001: STORE      t1         -          i
002: IMM        0          -          t2
003: STORE      t2         -          sum
004: IMM        11         -          t3
005: CMP_LT     i          t3         t4
006: JMP_F      t4         -          ?
007: ADD        sum        i          t5
008: STORE      t5         -          sum
009: IMM        1          -          t6
010: ADD        i          t6         t7
011: STORE      t7         -          i
012: JMP        -          -          ?

=== VM Execution ===
>> i = 11
>> sum = 55
```

---

## Design Principles

### While Handler

1. **Two-Jump Mechanism**: Uses JMP_F (conditional exit) + JMP (unconditional loop back)
2. **Backpatching**: Emits placeholder targets, fixes after parsing loop body
3. **Consistency**: Follows same pattern as existing if-handler

### Function Call Mechanism

1. **PARAM**: Push arguments during parsing
2. **CALL**: Create frame, save return PC, copy args
3. **FORMAL**: Bind incoming args to param names
4. **RET_VAL**: Store return value, pop frame, restore PC

---

## Documentation Created

Created `/home/user/System Programming/_sp/HW 1/README.md` with:
- While handler design principles
- Function call mechanism explanation
- Implementation summary
- Supported syntax
