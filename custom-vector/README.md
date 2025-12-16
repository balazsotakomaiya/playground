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

## Project Structure
```
custom-vector/
├── README.md
├── CMakeLists.txt  // Build configuration with Google Test
├── MyVector.h      // Template implementation (all in header)
├── tests.cpp       // Test cases
└── main.cpp        // Usage examples
```

## Time Complexity

| Operation    | Average | Worst Case | Notes                     |
|--------------|---------|------------|---------------------------|
| `push_back`  | O(1)*   | O(n)       | *Amortized constant time  |
| `pop_back`   | O(1)    | O(1)       |                           |
| `operator[]` | O(1)    | O(1)       | No bounds checking        |
| `size`       | O(1)    | O(1)       |                           |
| Copy         | O(n)    | O(n)       | Deep copy of all elements |

## Design Decisions

**Growth Factor: 2x**
- Industry standard, balances memory overhead vs reallocation frequency
- Achieves amortized O(1) for push_back

**Why Templates Live in Headers**
- C++ templates require full definition at compile-time
- Compiler generates code for each instantiation (`MyVector<int>`, `MyVector<string>`, etc.)

**The Rule of 5**
- Necessary when managing raw pointers/resources
- Default compiler-generated versions would cause double-free bugs

## Learning Log
- C++ uses "m_" prefix for member variables or trailing underscore like "size_"
- No standard package manager (like npm)—CMake FetchContent is common for small projects
- CLion's code indexer works separately from build system—"Reload CMake Project" syncs them
- Template code must live in headers (compiler needs full definition at instantiation)
- `delete[]` immediately frees memory—accessing it after is undefined behavior
- Google Test is industry standard, integrates with CLion via CMake FetchContent