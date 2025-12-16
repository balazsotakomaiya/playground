//
// Created by Balazs on 2025. 12. 16.
//

#include <gtest/gtest.h>
#include "MyVector.h"

TEST(MyVectorTest, InitialSize) {
    MyVector<int> vec;

    EXPECT_EQ(vec.size(), 0);
}

TEST(MyVectorTest, PushBackIncreasesSize) {
    MyVector<int> vec;

    vec.push_back(10);
    vec.push_back(20);

    EXPECT_EQ(vec.size(), 2);
}

TEST(MyVectorTest, PopDecreasesSize) {
    MyVector<int> vec;

    vec.push_back(10);

    EXPECT_EQ(vec.size(), 1);

    vec.pop_back();

    EXPECT_EQ(vec.size(), 0);
}

TEST(MyVectorTest, PopReturnsDeletedElement) {
    MyVector<int> vec;

    vec.push_back(10);
    const auto result = vec.pop_back();

    EXPECT_EQ(result, 10);
}

// TEST(MyVectorTest, GrowthTriggersAtCapacity) {
//     MyVector<int> vec;
//     // Push 5 elements (initial capacity is 4)
//     for (int i = 0; i < 5; ++i) {
//         vec.push_back(i);
//     }
//     // Verify all elements are intact after growth
//     for (int i = 0; i < 5; ++i) {
//         EXPECT_EQ(vec[i], i);
//     }
// }