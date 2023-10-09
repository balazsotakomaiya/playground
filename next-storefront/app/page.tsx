import ProductList from "@/components/ProductList";
import React from "react";
import {getProducts} from "@/lib/client";
import CategoryHeader from "@/components/CategoryHeader";
import {Metadata} from "next";

const category = {
    id: 'bath-bomb',
    name: 'Bath Bombs',
    description: 'Bath bombs are a great way to enhance your bath time experience. They come in many different shapes, sizes, and scents so you can find the perfect one for you!',
}

export const metadata: Metadata = {
    title: `${category.name} – Storefront`,
    description: category.description,
}

const Home: React.FC = async () => {
    const products = await getProducts({
        categories: [category.id],
    })

    return (
        <main className="pb-24">
            <CategoryHeader
                name={category.name}
                description={category.description}
            />

            <ProductList products={products}/>
        </main>
    )
}

export default Home
