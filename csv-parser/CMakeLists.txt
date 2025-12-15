cmake_minimum_required(VERSION 3.15)
project(csv_parser)

set(CMAKE_CXX_STANDARD 17)

add_executable(csv_parser main.cpp
        CSVParser.cpp
        CSVParser.h)