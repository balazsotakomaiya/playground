import React from "react";
import {getProduct} from "@/lib/client";
import {HeartIcon} from '@heroicons/react/20/solid'
import clsx from "clsx";
import Variants from "@/components/ProductDetail/Variants";
import Stars from "@/components/Stars";
import {Metadata} from "next";

interface Props {
    params: {
        slug: string
    }
}

export async function generateMetadata(
    { params }: Props
): Promise<Metadata> {
    const product = await getProduct(params.slug)

    return {
        title: `${product.name} – Storefront`,
        description: product.seoDescription
    }
}


const Product: React.FC<Props> = async ({params}) => {
    const product = await getProduct(params.slug)
    const isProductPriceRange = product.pricing.priceRange.start.gross.amount !== product.pricing.priceRange.stop.gross.amount
    const priceWithCurrency = `£${product.pricing.priceRange.start.gross.amount}`

    return (
        <main className="pb-24 pt-8">
            <main className="mx-auto mt-8 max-w-2xl px-4 pb-16 sm:px-6 sm:pb-24 lg:max-w-7xl lg:px-8">
                <div className="lg:grid lg:auto-rows-min lg:grid-cols-12 lg:gap-x-8">
                    <div className="lg:col-span-5 lg:col-start-8">
                        <div className="flex justify-between">
                            <div>
                                <h1 className="text-3xl font-medium text-gray-900 font-script">{product.name}</h1>
                                <h3 className="text-xs font-normal text-gray-600 uppercase">{product.type.values[0].name}</h3>
                            </div>
                            <p className="text-xl font-medium text-gray-900">
                                {
                                    isProductPriceRange
                                        ? `From ${priceWithCurrency}`
                                        : `${priceWithCurrency}`
                                }
                            </p>
                        </div>

                        {/* Reviews */}
                        <div className="mt-4">
                            <h2 className="sr-only">Reviews</h2>
                            <div className="flex items-center">
                                <p className="text-sm text-gray-700">
                                    {product.rating.toFixed(1)}
                                    <span className="sr-only"> out of 5 stars</span>
                                </p>
                                <div className="ml-1 flex items-center">
                                    <Stars rating={product.rating} />
                                </div>
                                <div aria-hidden="true" className="ml-4 text-sm text-gray-300">
                                    ·
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Image gallery */}
                    <div className="mt-8 lg:col-span-7 lg:col-start-1 lg:row-span-3 lg:row-start-1 lg:mt-0">
                        <h2 className="sr-only">Images</h2>

                        <div className="grid grid-cols-1 lg:grid-cols-2 lg:grid-rows-3 lg:gap-8">
                            {product.media.map((image, index) => (
                                <img
                                    key={image.id}
                                    src={image.url}
                                    alt={image.alt}
                                    className={clsx(
                                        index === 0 ? 'lg:col-span-2' : 'hidden lg:block',
                                        'rounded-lg'
                                    )}
                                />
                            ))}
                        </div>
                    </div>

                    <div className="lg:col-span-5">
                        <Variants product={product}/>

                        {/* Product details */}
                        <div className="mt-10">
                            <h2 className="text-sm font-medium text-gray-900">Description</h2>

                            <div
                                className="prose prose-sm mt-4 text-gray-500"
                            >
                                {product.seoDescription}
                            </div>
                        </div>

                        {/* Policies */}
                        <section aria-labelledby="policies-heading" className="mt-10">
                            <h2 id="policies-heading" className="sr-only">
                                Our Policies
                            </h2>

                            <dl className="grid grid-cols-1 gap-6">
                                <div className="rounded-lg border border-gray-200 bg-gray-50 p-6 text-center">
                                    <dt>
                                        <HeartIcon
                                            className="mx-auto h-6 w-6 flex-shrink-0 text-gray-400"
                                            aria-hidden="true"
                                        />
                                        <span className="mt-4 text-sm font-medium text-gray-900">
                                            Fighting Animal Testing
                                        </span>
                                    </dt>
                                    <dd className="mt-1 text-sm text-gray-500">
                                        We have been fighting against animal
                                        testing since before we opened our first shop, and the fight continues
                                        today. We test products on humans and promote, fund and use human biology
                                        relevant testing methods entirely animal and animal-product free.
                                    </dd>
                                </div>
                            </dl>
                        </section>
                    </div>
                </div>
            </main>

        </main>
    )
}

export default Product
