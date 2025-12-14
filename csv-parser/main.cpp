//
// Created by Balazs on 2025. 12. 07.
//

#include <iostream>

#include "CSVParser.h"

int main(int argc, char *argv[]) {
    try {
        CSVParser csv_parser;

        auto parsedFile = csv_parser.parse("../data/customers.csv");
    } catch (std::exception& e) {
        std::cerr << "Error: " << e.what() << std::endl;
    }

    return 0;
    //
    // parsedFile.display();
}
