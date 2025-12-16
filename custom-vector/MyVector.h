//
// Created by Balazs on 2025. 12. 15..
//

#ifndef CUSTOM_VECTOR_MYVECTOR_H
#define CUSTOM_VECTOR_MYVECTOR_H

#include <algorithm>
#include <cstddef>

template<typename T>
class MyVector {
public:
    explicit MyVector()
        : data(new T[INITIAL_CAPACITY]), m_size(0), m_capacity(INITIAL_CAPACITY) {
    }

    size_t size() {
        return this->m_size;
    }

    void push_back(T value) {
        growIfNearCapacity();

        data[m_size] = value;
        m_size++;
    }

private:
    T *data;
    size_t m_size;
    size_t m_capacity;

    static constexpr std::size_t INITIAL_CAPACITY = 4;
    static constexpr std::size_t GROWTH_MULTIPLIER = 2;

    bool shouldGrow() {
        if (size() >= m_capacity) {
            return true;
        }

        return false;
    }

    void growIfNearCapacity() {
        if (!shouldGrow()) {
            return;
        }

        m_capacity = m_capacity * GROWTH_MULTIPLIER;
        T* newData = new T[m_capacity];
        std::copy(data, data + m_size, newData);
        delete[] data;
        data = newData;
    }
};

#endif //CUSTOM_VECTOR_MYVECTOR_H
