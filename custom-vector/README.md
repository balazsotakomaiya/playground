# Custom Vector Implementation

A minimal dynamic array implementation in C++ for learning memory management and foundational data structures.

## Scope

- Dynamic array with automatic growth
- Template-based generic container (`MyVector<T>`)
- Manual memory management using `new`/`delete`
- Growth strategy: double capacity when full
- Core operations: `push_back`, `pop_back`, `operator[]`, `size`, `capacity`
- **The Rule of 5**: proper copy/move semantics and resource management

## Learning Goals

### Memory Management
- Understand stack vs heap allocation
- Manual memory allocation and deallocation
- Preventing memory leaks through RAII
- Deep copy vs shallow copy

### C++ Language Features
- Template classes (generic programming)
- The Rule of 5 (copy constructor, copy assignment, move constructor, move assignment, destructor)
- Move semantics and performance optimization
- Operator overloading (`[]`, `=`)

### Performance Concepts
- Amortized time complexity
- Capacity over-allocation strategy
- Reallocation cost and growth factor trade-offs

## Limitations

This is a **learning project**, not production code. It does not implement:

- Iterators (`begin()`, `end()`)
- `insert`/`erase` at arbitrary positions
- Custom allocators
- `reserve`, `shrink_to_fit`, `emplace_back`
- Full exception safety guarantees
- Small buffer optimization
- Complete STL compatibility

## Project Structure

```
custom-vector/
├── README.md
├── MyVector.h      // Template implementation (all in header)
├── tests.cpp       // Test cases
└── main.cpp        // Usage examples
```

## Usage

```cpp
#include "MyVector.h"

// Create vector of integers
MyVector<int> numbers;
numbers.push_back(10);
numbers.push_back(20);
numbers.push_back(30);

// Access elements
std::cout << numbers[0] << std::endl;  // 10
std::cout << numbers.size() << std::endl;  // 3

// Copy semantics
MyVector<int> copy = numbers;  // Deep copy

// Move semantics
MyVector<int> moved = std::move(numbers);  // Transfer ownership
```

## Time Complexity

| Operation | Average | Worst Case | Notes |
|-----------|---------|------------|-------|
| `push_back` | O(1)* | O(n) | *Amortized constant time |
| `pop_back` | O(1) | O(1) | |
| `operator[]` | O(1) | O(1) | No bounds checking |
| `size` | O(1) | O(1) | |
| Copy | O(n) | O(n) | Deep copy of all elements |

## Design Decisions

**Growth Factor: 2x**
- Industry standard (used by many `std::vector` implementations)
- Balances memory overhead vs reallocation frequency
- Achieves amortized O(1) for push_back

**Why Templates Live in Headers**
- C++ templates require full definition at compile-time
- Compiler generates code for each instantiation (`MyVector<int>`, `MyVector<string>`, etc.)
- Cannot split into .h/.cpp like regular classes

**The Rule of 5**
- Necessary when managing raw pointers/resources
- Default compiler-generated versions would cause double-free bugs
- Modern C++ best practice for resource-owning classes