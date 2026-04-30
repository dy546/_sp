import threading
import queue
import time
import random

BUFFER_SIZE = 10
NUM_PRODUCERS = 2
NUM_CONSUMERS = 3
ITEMS_PER_PRODUCER = 15


def producer(q, producer_id, num_items):
    for i in range(num_items):
        item = random.randint(1, 100)
        q.put(item)
        print(f"[Producer {producer_id}] Produced item {item:>3}  (buffer: {q.qsize()}/{BUFFER_SIZE})")
        time.sleep(random.uniform(0.01, 0.1))
    print(f"[Producer {producer_id}] Done producing.")


def consumer(q, consumer_id):
    while True:
        item = q.get()
        if item is None:
            q.task_done()
            break
        print(f"[Consumer {consumer_id}] Consumed item {item:>3}  (buffer: {q.qsize()}/{BUFFER_SIZE})")
        time.sleep(random.uniform(0.05, 0.2))
        q.task_done()
    print(f"[Consumer {consumer_id}] Done consuming.")


def main():
    print("=== Producer-Consumer Simulation ===")
    print(f"Producers: {NUM_PRODUCERS}, Consumers: {NUM_CONSUMERS}")
    print(f"Buffer size: {BUFFER_SIZE}, Items per producer: {ITEMS_PER_PRODUCER}")
    print()

    q = queue.Queue(maxsize=BUFFER_SIZE)

    producers = []
    for i in range(NUM_PRODUCERS):
        t = threading.Thread(target=producer, args=(q, i + 1, ITEMS_PER_PRODUCER), name=f"Producer-{i+1}")
        producers.append(t)
        t.start()

    consumers = []
    for i in range(NUM_CONSUMERS):
        t = threading.Thread(target=consumer, args=(q, i + 1), name=f"Consumer-{i+1}")
        consumers.append(t)
        t.start()

    for t in producers:
        t.join()

    for _ in range(NUM_CONSUMERS):
        q.put(None)

    for t in consumers:
        t.join()

    q.join()

    total_items = NUM_PRODUCERS * ITEMS_PER_PRODUCER
    print()
    print(f"All {total_items} items produced and consumed successfully.")
    print("Simulation complete.")


if __name__ == "__main__":
    main()
