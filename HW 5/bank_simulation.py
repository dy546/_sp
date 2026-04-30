import threading
import time

balance = 0
lock = threading.Lock()
NUM_TRANSACTIONS = 100_000


def deposit():
    global balance
    for _ in range(NUM_TRANSACTIONS):
        with lock:
            balance += 1


def withdraw():
    global balance
    for _ in range(NUM_TRANSACTIONS):
        with lock:
            balance -= 1


def main():
    print("=== Bank Deposit/Withdrawal Simulation ===")
    print(f"Transactions: {NUM_TRANSACTIONS} deposits + {NUM_TRANSACTIONS} withdrawals")
    print("Expected final balance: 0")
    print()

    start = time.time()

    t1 = threading.Thread(target=deposit, name="Depositor")
    t2 = threading.Thread(target=withdraw, name="Withdrawer")

    t1.start()
    t2.start()

    t1.join()
    t2.join()

    elapsed = time.time() - start

    print(f"Final balance: {balance}")
    print(f"Time taken: {elapsed:.3f} seconds")

    if balance == 0:
        print("SUCCESS: Balance is correct (no race condition).")
    else:
        print("FAILURE: Race condition detected — balance is incorrect.")


if __name__ == "__main__":
    main()
