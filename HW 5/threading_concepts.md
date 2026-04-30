# Concurrency Concepts and Implementations

## Table of Contents

1. [Thread](#thread)
2. [Race Condition](#race-condition)
3. [Mutex (Mutual Exclusion)](#mutex-mutual-exclusion)
4. [Deadlock](#deadlock)
5. [Implementation: Bank Deposit/Withdrawal Simulation](#implementation-bank-depositwithdrawal-simulation)
6. [Implementation: Producer-Consumer Problem](#implementation-producer-consumer-problem)
7. [Implementation: Dining Philosophers Problem](#implementation-dining-philosophers-problem)

---

## Thread

A **thread** is the smallest unit of execution that can be scheduled by an operating system. Multiple threads can exist within a single process and share the same memory space (heap, global variables, file descriptors). Each thread has its own stack and register set but can access shared data, making inter-thread communication efficient yet prone to synchronization issues.

Threads enable **concurrency** — multiple tasks making progress within overlapping time periods. On multi-core systems, threads can also achieve true **parallelism** where tasks execute simultaneously on different cores.

### Key Properties

- **Shared memory**: All threads in a process share the same address space.
- **Lightweight**: Threads have lower creation and context-switching overhead than processes.
- **Independent execution**: Each thread runs its own sequence of instructions.
- **Scheduling**: The OS scheduler decides which thread runs at any given time. The order of execution is non-deterministic from the programmer's perspective.

### Python Example (Thread Creation)

```python
import threading

def worker(name):
    print(f"Thread {name} is running")

t1 = threading.Thread(target=worker, args=("A",))
t2 = threading.Thread(target=worker, args=("B",))
t1.start()
t2.start()
t1.join()
t2.join()
```

---

## Race Condition

A **race condition** occurs when multiple threads access shared data concurrently and at least one modifies it, but the final outcome depends on the unpredictable order of execution (the "race" between threads).

### Example Scenario

Consider two threads incrementing a shared counter `x`:

| Thread 1         | Thread 2         | `x` Value |
|------------------|------------------|-----------|
| Read x (= 0)     |                  | 0         |
|                  | Read x (= 0)     | 0         |
| x = 0 + 1 → 1    |                  | 1         |
|                  | x = 0 + 1 → 1    | 1         |

Even though two increments occurred, the final value is `1` instead of `2`. This happens because the read-modify-write sequence (`x = x + 1`) is not **atomic** — it can be interleaved.

### Consequences

- Data corruption
- Non-reproducible bugs
- Incorrect computation results

---

## Mutex (Mutual Exclusion)

A **mutex** (short for *mutual exclusion*) is a synchronization primitive used to protect **critical sections** — code segments that access shared resources and must not be executed by more than one thread at a time.

### How It Works

1. Before entering a critical section, a thread calls `acquire()` (or `lock()`) on the mutex.
2. If no other thread holds the mutex, the call succeeds and the thread enters the critical section.
3. If another thread holds the mutex, the calling thread **blocks** (waits) until the mutex is released.
4. After the critical section, the thread calls `release()` (or `unlock()`) to release the mutex.

### Properties

- **Ownership**: Only the thread that acquired the mutex can release it.
- **Binary state**: A mutex is either locked or unlocked.
- **Blocking**: Threads waiting for a locked mutex are put to sleep by the OS.

### Python Example

```python
import threading

counter = 0
lock = threading.Lock()

def increment():
    global counter
    for _ in range(100000):
        lock.acquire()
        counter += 1
        lock.release()
```

With the lock, only one thread modifies `counter` at a time, eliminating the race condition.

---

## Deadlock

A **deadlock** is a situation where two or more threads are blocked forever, each waiting for a resource held by another. No thread can proceed, and the program hangs.

### Four Necessary Conditions (Coffman Conditions)

1. **Mutual Exclusion**: Resources cannot be shared; only one thread can use a resource at a time.
2. **Hold and Wait**: A thread holding at least one resource is waiting to acquire additional resources held by other threads.
3. **No Preemption**: Resources cannot be forcibly taken away from a thread; they must be released voluntarily.
4. **Circular Wait**: A cycle exists: Thread A waits for a resource held by Thread B, which waits for a resource held by Thread C, ..., which waits for a resource held by Thread A.

### Example: Two Mutexes

```
Thread 1: acquire(lock_A) → acquire(lock_B)
Thread 2: acquire(lock_B) → acquire(lock_A)
```

If Thread 1 holds `lock_A` while Thread 2 holds `lock_B`, both will wait indefinitely for the other's lock.

### Prevention Strategies

- **Lock ordering**: Always acquire locks in a consistent global order.
- **Lock timeout**: Use `try_lock` with a timeout; if a lock cannot be acquired, release all held locks and retry.
- **Avoid nested locks**: Minimize the number of locks held simultaneously.
- **Resource hierarchy**: Assign a numerical rank to each resource; threads must acquire lower-ranked resources first.

---

## Implementation: Bank Deposit/Withdrawal Simulation

### Problem

Simulate a bank account where the same person makes 100,000 deposits and 100,000 withdrawals of **1 unit each**. The expected final balance is **0**. Threads are used to perform operations concurrently, and a mutex ensures correctness.

### Design

- **Shared resource**: `balance` (integer).
- **Threads**: Two threads — one performs 100,000 deposits, the other performs 100,000 withdrawals.
- **Synchronization**: A `threading.Lock` protects every deposit and withdrawal operation.
- **Verification**: After both threads complete, the final balance is printed and compared to 0.

### Key Points

- Without the mutex, race conditions cause the final balance to be unpredictable (non-zero).
- With the mutex, each operation is atomic and the final balance is exactly 0.
- The lock is acquired as a context manager (`with lock:`) for cleaner syntax and automatic release.

### Running the Program

```bash
python3 bank_simulation.py
```

---

## Implementation: Producer-Consumer Problem

### Problem

One or more **producer** threads generate data and place it into a shared buffer. One or more **consumer** threads remove and process data from the buffer. Producers must wait when the buffer is full; consumers must wait when the buffer is empty.

### Design

- **Shared buffer**: A bounded `queue.Queue` with a fixed capacity (default: 10).
- **Producers**: Generate items (integers) and place them into the queue.
- **Consumers**: Remove items from the queue and process them.
- **Synchronization**: Python's `queue.Queue` is thread-safe and handles all blocking/waking automatically. Producers block on `put()` when the queue is full; consumers block on `get()` when the queue is empty.
- **Termination**: A special sentinel value (`None`) signals consumers to exit.

### Key Points

- `queue.Queue` internally uses `threading.Condition` and `threading.Lock` to safely manage the buffer.
- The sentinel-based termination ensures all consumers shut down gracefully.
- This pattern is fundamental to many concurrent systems (message queues, job schedulers, pipelines).

### Running the Program

```bash
python3 producer_consumer.py
```

---

## Implementation: Dining Philosophers Problem

### Problem

Five philosophers sit at a round table. Each philosopher alternates between **thinking** and **eating**. Between each pair of adjacent philosophers lies a single fork (5 forks total). A philosopher needs both the left and right fork to eat. After eating, they put down both forks and resume thinking.

**Challenge**: If every philosopher picks up their left fork simultaneously, each will wait indefinitely for the right fork — a deadlock.

### Design

- **Philosophers**: Each is a thread that loops between thinking and eating.
- **Forks**: Represented by `threading.Lock` objects (5 locks).
- **Deadlock Prevention - Asymmetric Fork Acquisition**: Even-numbered philosophers pick up the left fork first, then the right fork. Odd-numbered philosophers pick up the right fork first, then the left fork. This breaks the circular wait condition.

### Key Points

- The asymmetric acquisition strategy is a classic deadlock prevention technique that alters the order of resource acquisition.
- Without this strategy, the program would deadlock consistently.
- Each philosopher holds both forks for the same duration (simulating eating), then releases both.
- `time.sleep()` introduces random delays to simulate thinking and eating times, making the execution interleaving more realistic and non-deterministic.

### Running the Program

```bash
python3 dining_philosophers.py
```

---

## Summary

| Concept | Definition | Mitigation |
|---------|-----------|------------|
| Thread | Independent unit of execution within a process | N/A |
| Race Condition | Uncontrolled interleaving corrupts shared state | Mutex, atomic operations |
| Mutex | Lock ensuring exclusive access to critical section | N/A — it is the solution |
| Deadlock | Cyclic waiting where threads block each other forever | Lock ordering, timeouts, resource hierarchy |
