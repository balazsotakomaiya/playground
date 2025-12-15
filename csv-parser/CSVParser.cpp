//
// Created by Balazs on 2025. 12. 14.
//

#include "CSVParser.h"

#include <fstream>
#include <iostream>
#include <stdexcept>
#include <string>
#include <utility>

LoadedCSV::LoadedCSV(std::vector<std::vector<std::string>> newData) {
    data = std::move(newData);
}

void LoadedCSV::display() const {
    for (const auto& row : data) {
        for (size_t i = 0; i < row.size(); ++i) {
            std::cout << row[i];
            if (i < row.size() - 1) {
                std::cout << ", ";
            }
        }
        std::cout << std::endl;
    }
}

size_t LoadedCSV::getRowCount() const {
    return data.size();
}

size_t LoadedCSV::getColumnCount() const {
    return data.empty() ? 0 : data[0].size();
}

const std::vector<std::string>& LoadedCSV::getRow(size_t index) const {
    if (index >= data.size()) {
        throw std::out_of_range("Row index out of range");
    }
    return data[index];
}

LoadedCSV CSVParser::parse(const std::string &path) {
    std::ifstream file(path);
    std::string line;
    std::vector<std::vector<std::string>> data;

    if (!file) {
        throw std::runtime_error("Failed to open CSV");
    }

    while (std::getline(file, line)) {
        // Strip Windows line ending
        if (!line.empty() && line.back() == '\r') {
            line.pop_back();
        }

        data.push_back(splitLine(line));
    }

    file.close();

    return LoadedCSV(data);
}

std::vector<std::string> CSVParser::splitLine(const std::string &line) {
    std::vector<std::string> result;
    std::string field;
    bool inQuotes = false;

    for (const char c : line) {
        if (c == '"') {
            inQuotes = !inQuotes;
            continue;
        }

        if (!inQuotes && c == ',') {
            result.push_back(field);
            field.clear();
            continue;
        }

        field.push_back(c);
    }

    result.push_back(field);

    return result;
}
