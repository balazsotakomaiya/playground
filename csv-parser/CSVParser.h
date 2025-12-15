//
// Created by Balazs on 2025. 12. 14.
//

#ifndef CSV_PARSER_CSVPARSER_H
#define CSV_PARSER_CSVPARSER_H
#include <string>
#include <vector>

class LoadedCSV {
public:
    explicit LoadedCSV(std::vector<std::vector<std::string>> newData);
    void display() const;

private:
    std::vector<std::vector<std::string>> data;
};

class CSVParser {
public:
    CSVParser();

    static LoadedCSV parse(const std::string& path);

private:
    // Splits a CSV string into a vector of strings. Supports single quotes.
    // O(n) time complexity, O(1) space complexity
    static std::vector<std::string> splitLine(const std::string &line);
};

#endif //CSV_PARSER_CSVPARSER_H
