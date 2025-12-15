//
// Created by Balazs on 2025. 12. 07.
//

#include <iostream>
#include "CSVParser.h"

int main() {
    try {
        auto csv = CSVParser::parse("../data/customers.csv");

        std::cout << "Loaded CSV with " << csv.getRowCount() << " rows and "
                  << csv.getColumnCount() << " columns\n" << std::endl;

        std::cout << "First 5 rows:\n" << std::endl;
        for (size_t i = 0; i < 5 && i < csv.getRowCount(); ++i) {
            const auto& row = csv.getRow(i);
            for (size_t j = 0; j < row.size(); ++j) {
                std::cout << row[j];
                if (j < row.size() - 1) {
                    std::cout << ", ";
                }
            }
            std::cout << std::endl;
        }

    } catch (const std::exception& e) {
        std::cerr << "Error: " << e.what() << std::endl;
        return 1;
    }

    return 0;
}
