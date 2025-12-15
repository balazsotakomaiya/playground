//
// Created by Balazs on 2025. 12. 07.
//

#include <iostream>

#include "CSVParser.h"

int main(int argc, char *argv[]) {
    try {
        const auto parsedFile = CSVParser::parse("../data/customers.csv");

        parsedFile.display();
    } catch (std::exception& e) {
        std::cerr << "Error: " << e.what() << std::endl;
    }

    return 0;
}
