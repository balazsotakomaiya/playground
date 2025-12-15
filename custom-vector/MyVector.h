//
// Created by Balazs on 2025. 12. 15..
//

#ifndef CUSTOM_VECTOR_MYVECTOR_H
#define CUSTOM_VECTOR_MYVECTOR_H
#include <cstddef>

template<typename T>
class MyVector {
public:
    explicit MyVector()
        : data(new T[INITIAL_CAPACITY]) {
    }

private:
    T *data;

    static constexpr std::size_t INITIAL_CAPACITY = 4;
};

#endif //CUSTOM_VECTOR_MYVECTOR_H
