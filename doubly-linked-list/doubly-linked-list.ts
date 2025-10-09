/**
 * Represents a single node in a doubly linked list.
 * Each node contains a value and pointers to both the previous and next nodes.
 * 
 * @template T - The type of value stored in the node
 */
class DoublyLinkedNode<T> {
    prev: DoublyLinkedNode<T> | null;
    next: DoublyLinkedNode<T> | null;
    val: T;

    constructor(val: T, prev: DoublyLinkedNode<T> | null, next: DoublyLinkedNode<T> | null) {
        this.val = val;
        this.prev = prev;
        this.next = next;
    }
}

/**
 * A doubly linked list implementation that supports generic types.
 * Provides O(1) insertion/deletion at head and tail, and O(n) operations at arbitrary indices.
 * 
 * @template T - The type of values stored in the list
 */
class DoublyLinkedList<T> {
    private head: DoublyLinkedNode<T> | null;
    private tail: DoublyLinkedNode<T> | null;
    private listLength: number;

    constructor() {
        this.head = null;
        this.tail = null;
        this.listLength = 0;
    }

    /**
     * Retrieves the value at the specified index.
     * Time complexity: O(n)
     * 
     * @param index - The zero-based index of the element to retrieve
     * @returns The value at the index, or -1 if the index is out of bounds
     */
    get(index: number): T | -1 {
        const element = this.findElementAtIndex(index);

        if (!element) {
            return -1;
        }

        return element.val;
    }

    /**
     * Returns the current length of the list.
     * Time complexity: O(1)
     */
    getLength(): number {
        return this.listLength;
    }

    /**
     * Adds a new node with the given value at the beginning of the list.
     * Time complexity: O(1)
     * 
     * @param val - The value to add at the head
     */
    addAtHead(val: T): void {
        const prevHead = this.head;

        // Create new head node pointing to the previous head
        this.head = new DoublyLinkedNode(val, null, prevHead);

        this.listLength++;

        // If list was empty, the new node is also the tail
        if (this.tail === null) {
            this.tail = this.head;
        }

        // Link the previous head back to the new head
        if (prevHead !== null) {
            prevHead.prev = this.head;
        }
    }

    /**
     * Adds a new node with the given value at the end of the list.
     * Time complexity: O(1)
     * 
     * @param val - The value to add at the tail
     */
    addAtTail(val: T): void {
        const prevTail = this.tail;

        // Create new tail node pointing back to the previous tail
        this.tail = new DoublyLinkedNode(val, prevTail, null);

        this.listLength++;

        // If list was empty, the new node is also the head
        if (this.head === null) {
            this.head = this.tail;
        }

        // Link the previous tail forward to the new tail
        if (prevTail !== null) {
            prevTail.next = this.tail;
        }
    }

    /**
     * Inserts a new node with the given value at the specified index.
     * If index equals 0, adds at head. If index equals list length, adds at tail.
     * Time complexity: O(n)
     * 
     * @param index - The zero-based index where the value should be inserted
     * @param val - The value to insert
     */
    addAtIndex(index: number, val: T): void {
        // Handle edge case: insert at beginning
        if (index === 0) {
            this.addAtHead(val);
            return;
        }

        // Handle edge case: insert at end
        if (this.listLength === index) {
            this.addAtTail(val);
            return;
        }

        const element = this.findElementAtIndex(index);

        // Invalid index
        if (!element) {
            return;
        }

        this.listLength++;

        const tmpPrev = element.prev;

        // Insert new node between tmpPrev and element
        if (tmpPrev !== null) {
            const newNode = new DoublyLinkedNode(val, tmpPrev, element);
            element.prev = newNode;
            tmpPrev.next = newNode;
        }
    }

    /**
     * Deletes the node at the specified index.
     * Time complexity: O(n)
     * 
     * @param index - The zero-based index of the element to delete
     */
    deleteAtIndex(index: number): void {
        const element = this.findElementAtIndex(index);

        if (!element) {
            return;
        }

        this.listLength--;

        const prev = element.prev;
        const next = element.next;

        // Update tail if we're deleting the last element
        if (next === null) {
            this.tail = prev;
        }

        // Update head if we're deleting the first element
        if (prev === null) {
            this.head = next;
        }

        // Relink the surrounding nodes to bypass the deleted element
        if (prev !== null) {
            prev.next = next;
        }

        if (next !== null) {
            next.prev = prev;
        }
    }

    /**
     * Finds and returns the node at the specified index.
     * Time complexity: O(n)
     * 
     * @param index - The zero-based index of the element to find
     * @returns The node at the index, or null if not found
     */
    private findElementAtIndex(index: number): DoublyLinkedNode<T> | null {
        if (this.head === null || index < 0) {
            return null;
        }

        let counter = 0;
        let curr: DoublyLinkedNode<T> | null = this.head;

        // Traverse the list until we reach the desired index
        while (curr !== null && counter < index) {
            curr = curr.next;
            counter++;
        }

        // Return the node if we found it (counter === index), otherwise null
        return counter === index ? curr : null;
    }
}