import threading
import time
import random

NUM_PHILOSOPHERS = 5

forks = [threading.Lock() for _ in range(NUM_PHILOSOPHERS)]


def philosopher(philosopher_id):
    left = philosopher_id
    right = (philosopher_id + 1) % NUM_PHILOSOPHERS

    for round_num in range(1, 4):
        print(f"[Philosopher {philosopher_id}] Round {round_num}: Thinking...")
        time.sleep(random.uniform(0.1, 0.5))

        if philosopher_id % 2 == 0:
            first, second = left, right
        else:
            first, second = right, left

        print(f"[Philosopher {philosopher_id}] Round {round_num}: Hungry, picking up fork {first}...")
        forks[first].acquire()
        print(f"[Philosopher {philosopher_id}] Round {round_num}: Picked up fork {first}.")

        print(f"[Philosopher {philosopher_id}] Round {round_num}: Picking up fork {second}...")
        forks[second].acquire()
        print(f"[Philosopher {philosopher_id}] Round {round_num}: Picked up fork {second}.")

        print(f"[Philosopher {philosopher_id}] Round {round_num}: >>> EATING <<<")
        time.sleep(random.uniform(0.1, 0.3))

        forks[second].release()
        forks[first].release()
        print(f"[Philosopher {philosopher_id}] Round {round_num}: Put down both forks.")

    print(f"[Philosopher {philosopher_id}] Done (full).")


def main():
    print("=== Dining Philosophers Simulation ===")
    print(f"Philosophers: {NUM_PHILOSOPHERS}")
    print("Deadlock prevention: Asymmetric fork acquisition (even: left→right, odd: right→left)")
    print()

    philosophers = []
    for i in range(NUM_PHILOSOPHERS):
        t = threading.Thread(target=philosopher, args=(i,), name=f"Philosopher-{i}")
        philosophers.append(t)
        t.start()

    for t in philosophers:
        t.join()

    print()
    print("All philosophers have eaten. Simulation complete.")


if __name__ == "__main__":
    main()
