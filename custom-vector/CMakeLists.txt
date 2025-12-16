cmake_minimum_required(VERSION 4.0)
project(custom_vector)

set(CMAKE_CXX_STANDARD 17)

# Fetch Google Test
include(FetchContent)
FetchContent_Declare(
        googletest
        URL https://github.com/google/googletest/archive/refs/tags/v1.14.0.zip
)
FetchContent_MakeAvailable(googletest)

# Your test executable
add_executable(vector_tests tests.cpp)
target_link_libraries(vector_tests gtest_main)

# Enable testing
enable_testing()
add_test(NAME vector_tests COMMAND vector_tests)

add_executable(custom_vector main.cpp
        MyVector.h
)