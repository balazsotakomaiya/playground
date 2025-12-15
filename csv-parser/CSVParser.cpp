//
// Created by Balazs on 2025. 12. 14.
//

#include "CSVParser.h"

#include <fstream>
#include <iostream>
#include <string>
#include <utility>

LoadedCSV::LoadedCSV(std::vector<std::vector<std::string>> newData) {
    data = std::move(newData);
}

void LoadedCSV::display() const {
    for (const auto& row : data) {
        for (const auto& cell : row) {
            std::cout << cell << ", ";
        }

        std::cout << std::endl;
    }
}

CSVParser::CSVParser() = default;

LoadedCSV CSVParser::parse(const std::string &path) {
    std::ifstream rawCSV(path);
    std::string loadedLine;
    std::vector<std::vector<std::string>> data;

    if (!rawCSV) {
        throw std::runtime_error("Failed to open CSV");
    }

    while (std::getline(rawCSV, loadedLine)) {
        // Strip Windows line ending
        if (!loadedLine.empty() && loadedLine.back() == '\r') {
            loadedLine.pop_back();
        }

        data.push_back(splitLine(loadedLine));
    };

    rawCSV.close();

    auto loadedCSV = LoadedCSV(data);

    return loadedCSV;
}

std::vector<std::string> CSVParser::splitLine(const std::string &line) {
    std::vector<std::string> result;
    std::string currentString;
    bool isInsideQuotes = false;

    for (const char c : line) {
        if (c == '"') {
            isInsideQuotes = !isInsideQuotes;
            continue;
        }

        if (isInsideQuotes == false && c == ',') {
            result.push_back(currentString);
            currentString = "";
            continue;
        }

        currentString.push_back(c);
    }

    result.push_back(currentString);

    return result;
}
