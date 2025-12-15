# CSV Parser

A minimal CSV parser implementation in C++ for learning core language features.

## Features

- Read CSV files line by line
- Split fields by comma delimiter
- Handle basic quoted fields (e.g., `"field, with comma"`)
- Store data in memory as `vector<vector<string>>`
- Query parsed data with simple API

## Usage

```cpp
#include "CSVParser.h"
#include <iostream>

int main() {
    try {
        auto csv = CSVParser::parse("data/customers.csv");

        std::cout << "Rows: " << csv.getRowCount() << std::endl;
        std::cout << "Columns: " << csv.getColumnCount() << std::endl;

        // Access specific row
        const auto& header = csv.getRow(0);

        // Display all data
        csv.display();

    } catch (const std::exception& e) {
        std::cerr << "Error: " << e.what() << std::endl;
    }
}
```

## API Reference

### CSVParser

- `static LoadedCSV parse(const std::string& path)` - Parse a CSV file and return loaded data

### LoadedCSV

- `size_t getRowCount() const` - Get the number of rows
- `size_t getColumnCount() const` - Get the number of columns
- `const std::vector<std::string>& getRow(size_t index) const` - Get a specific row
- `void display() const` - Print all data to stdout

## Building

```bash
mkdir build && cd build
cmake ..
make
./csv_parser
```

## Limitations

This is a **learning project**, not production code. It does not handle:

- Embedded newlines within quoted fields
- Escape sequences (e.g., `\"` inside quotes)
- Large file streaming (entire file loaded into memory)
- CSV writing/serialization
- Malformed input validation
- Custom delimiters
- Header row type inference

## Learning Goals

- File I/O with `ifstream`
- String parsing algorithms
- STL containers (`vector`, exception handling)
- Header/implementation file organization
- Class design with static methods
- Modern C++17 features (`std::move`, RAII)