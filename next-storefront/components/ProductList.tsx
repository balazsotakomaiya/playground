'use client'

import React, {useMemo} from "react";
import {useInfiniteQuery} from "@tanstack/react-query";
import {ProductsResponse} from "@/types";
import {getProducts} from "@/lib/client";
import ProductListCard from "@/components/ProductListCard";
import Spinner from "@/components/Spinner";
import clsx from "clsx";

interface Props {
    products: ProductsResponse
}

const ProductList: React.FC<Props> = ({ products }) => {
    const { data, hasNextPage, fetchNextPage, isFetchingNextPage } = useInfiniteQuery({
        queryKey: ['products'],
        staleTime: 30 * 1000, // 30 seconds
        queryFn: ({ pageParam }) => getProducts(pageParam),
        initialData: {
            pageParams: [undefined],
            pages: [products]
        },
        getNextPageParam: (lastPage) => {
            return lastPage.pageInfo.hasNextPage
                ? lastPage.pageInfo.endCursor
                : undefined
        },
    })
    const shownProducts = useMemo(() => data?.pages.reduce((acc, page) => acc + page.edges.length, 0), [data?.pages])
    const maxProducts = data?.pages[0].totalCount

    return (
        <div className='flex w-full flex-col'>
            <div>
                {data?.pages.map((page) => (
                    <div className='w-full grid grid-cols-2 md:grid-cols-4' key={page.pageInfo.startCursor}>
                        {page.edges.map((product) => (
                            <ProductListCard
                                key={product.node.id}
                                product={product.node}
                            />
                        ))}
                    </div>
                ))}
            </div>

            <div className='flex mt-8 justify-center items-center flex-col gap-4'>
                { hasNextPage ? (
                    <>
                        <span className='text-sm text-gray-600'>Showing {shownProducts} of {maxProducts} results</span>
                        <button
                            disabled={isFetchingNextPage}
                            onClick={() => fetchNextPage()}
                            type="button"
                            className={clsx(`rounded-md bg-white px-4 py-3 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50`, isFetchingNextPage ? 'opacity-50 cursor-not-allowed' : null)}
                        >
                            {isFetchingNextPage ? <Spinner /> : 'Load more'}
                        </button>
                    </>
                ) : null}
            </div>
        </div>
    )
}

export default ProductList
