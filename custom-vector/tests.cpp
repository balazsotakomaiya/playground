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

TEST(MyVectorTest, BracketOperator) {
    MyVector<int> vec;

    vec.push_back(10);
    vec.push_back(30);

    EXPECT_EQ(vec[0], 10);
    EXPECT_EQ(vec[1], 30);
}

TEST(MyVectorTest, CopyIsDeep) {
    MyVector<int> vec1;
    vec1.push_back(10);

    MyVector<int> vec2 = vec1;
    vec2.push_back(20);  // Modify copy

    EXPECT_EQ(vec1.size(), 1);  // Original unchanged
    EXPECT_EQ(vec2.size(), 2);
}

TEST(MyVectorTest, CopyAssignment) {
    MyVector<int> vec1;
    vec1.push_back(10);

    MyVector<int> vec2;
    vec2.push_back(99);

    vec2 = vec1;  // Should deep copy

    EXPECT_EQ(vec2[0], 10);
    EXPECT_EQ(vec2.size(), 1);
}

TEST(MyVectorTest, SelfAssignment) {
    MyVector<int> vec;
    vec.push_back(10);

    vec = vec;  // Should not crash

    EXPECT_EQ(vec[0], 10);
}

TEST(MyVectorTest, MoveConstructor) {
    MyVector<int> vec1;
    vec1.push_back(10);
    vec1.push_back(20);

    MyVector<int> vec2 = std::move(vec1);

    EXPECT_EQ(vec2.size(), 2);
    EXPECT_EQ(vec2[0], 10);
    EXPECT_EQ(vec2[1], 20);
}

TEST(MyVectorTest, MoveAssignment) {
    MyVector<int> vec1;
    vec1.push_back(10);

    MyVector<int> vec2;
    vec2.push_back(99);

    vec2 = std::move(vec1);  // Move assignment

    EXPECT_EQ(vec2.size(), 1);
    EXPECT_EQ(vec2[0], 10);
}

TEST(MyVectorTest, GrowthTriggersAtCapacity) {
    MyVector<int> vec;
    for (int i = 0; i < 5; ++i) {
        vec.push_back(i);
    }

    for (int i = 0; i < 5; ++i) {
        EXPECT_EQ(vec[i], i);
    }
}