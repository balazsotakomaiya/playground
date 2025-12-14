//
// Created by Balazs on 2025. 12. 14.
//

#ifndef CSV_PARSER_CSVPARSER_H
#define CSV_PARSER_CSVPARSER_H
#include <string>

class LoadedCSV {
public:
    void display();
};

class CSVParser {
public:
    CSVParser();

    LoadedCSV* parse(std::string path);
};

#endif //CSV_PARSER_CSVPARSER_H
