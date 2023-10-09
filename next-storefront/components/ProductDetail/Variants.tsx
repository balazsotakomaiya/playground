'use client'

import React, {useState} from "react";
import {RadioGroup} from "@headlessui/react";
import {Product, Variant as VariantType} from "@/types";
import Variant from './Variant';
import QuantityPicker from "@/components/ProductDetail/QuantityPicker";

interface Props {
    product: Product
}

const Variants: React.FC<Props> = ({product}) => {
    const defaultVariant = product.variants[0]
    const [selectedVariant, setSelectedVariant] = useState<VariantType>(defaultVariant)
    const [quantity, setQuantity] = useState<number>(1)
    const selectedVariantPrice = selectedVariant.pricing.price.gross.amount * quantity

    return (
        <form>
            <div className="mt-8">
                <div className="flex items-center justify-between">
                    <h2 className="text-sm font-medium text-gray-900">Size</h2>
                </div>

                <RadioGroup value={selectedVariant} onChange={setSelectedVariant} className="mt-2">
                    {/*todo: how might we handle different variants, other than sizing dynamically?*/}
                    <RadioGroup.Label className="sr-only">Choose a size</RadioGroup.Label>
                    <div className="grid grid-cols-3 gap-3 sm:grid-cols-6">
                        {product.variants.map((variant) => <Variant key={variant.id} variant={variant}/>)}
                    </div>
                </RadioGroup>
            </div>

            <div className='mt-4'>
                <QuantityPicker
                    quantity={quantity}
                    setQuantity={setQuantity}
                />
            </div>

            <button
                type="submit"
                className="mt-8 flex w-full items-center justify-center rounded-md border border-transparent bg-gray-800 px-8 py-3 text-base font-medium text-white hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
            >
                {/*todo*/}
                Add to cart - £{selectedVariantPrice}
            </button>
        </form>
    )
}

export default Variants;
