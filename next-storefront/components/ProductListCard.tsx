import {Product} from "@/types";
import React from "react";
import {useRouter} from "next/navigation";
import clsx from "clsx";
import Stars from "@/components/Stars";

interface Props {
    product: Product
}

const ProductListCard: React.FC<Props> = ({product}) => {
    const router = useRouter();

    // Determine if the product has a price range
    const isProductPriceRange = product.pricing.priceRange.start.gross.amount !== product.pricing.priceRange.stop.gross.amount
    const priceWithCurrency = `£${product.pricing.priceRange.start.gross.amount}`
    const strapLine = product.strapline.values[0].name
    const type = product.type.values[0].name

    return (
        <div
            className={clsx(
                'group relative border-b border-r border-gray-200 p-4 sm:p-6 cursor-pointer',
                !product.isAvailable ? 'opacity-50' : null
            )}
            onClick={() => router.push(`/products/${product.slug}`)}
        >
            <div className="aspect-h-1 aspect-w-1 overflow-hidden rounded-lg group-hover:opacity-75 duration-200">
                {/*todo: use Next/Image */}
                { product.thumbnail ? (
                    <img
                        src={product.thumbnail.url}
                        alt={product.thumbnail.alt}
                        className="h-full w-full object-cover object-center"
                    />
                ) : null}
            </div>
            <div className="pb-4 pt-10 text-center">
                <h3 className="text-2xl font-medium text-gray-900 font-script">
                    <span aria-hidden="true" className="absolute inset-0"/>
                    {product.name}
                </h3>
                <p className="mt-1.5 text-xs text-gray-500 uppercase">{type}</p>
                <p className="mt-1.5 text-sm text-gray-500">{strapLine}</p>
                <div className="mt-3 flex flex-col items-center">
                    <p className="sr-only">{product.rating} out of 5 stars</p>
                    <div className="flex items-center">
                        <Stars rating={product.rating} />
                    </div>
                </div>
                <p className="mt-4 text-base font-medium text-gray-900 flex justify-center items-center">
                    {
                        isProductPriceRange
                            ? `From ${priceWithCurrency}`
                            : `${priceWithCurrency}`
                    }

                    {!product.isAvailable && (
                        <span className="text-red-500 ml-2 text-sm font-light">Out of stock</span>
                    )}
                </p>
            </div>
        </div>
    )
}

export default ProductListCard
