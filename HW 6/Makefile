CC      = gcc
CFLAGS  = -Wall -Wextra -std=c99 -pedantic
TARGET  = demo_syscalls

all: $(TARGET)

$(TARGET): demo_syscalls.c
	$(CC) $(CFLAGS) -o $@ $<

clean:
	rm -f $(TARGET) demo_output.txt demo_copy.txt redirected_out.txt

run: $(TARGET)
	./$(TARGET)

.PHONY: all clean run
