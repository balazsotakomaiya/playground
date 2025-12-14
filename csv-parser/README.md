# CSV Parser

A minimal CSV parser implementation in C++ for learning core language features.

## Scope

- Read CSV files line by line
- Split fields by comma delimiter
- Handle basic quoted fields (e.g., `"field, with comma"`)
- Store data in memory as `vector<vector<string>>`
- Query and display parsed data

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
- String parsing techniques
- STL containers (`vector`, `stringstream`)
- Header/implementation file organization
- Class design and RAII principles

## Usage

```cpp
CSVParser parser;
auto parsedCSV = parser.parse("data.csv");
parsedCSV.display();
```