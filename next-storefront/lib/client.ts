import {gql, request} from "graphql-request";
import {Product, ProductsResponse} from "@/types";

const endpoint = "https://unicorn-staging.eu.saleor.cloud/graphql/"

interface GetProductsParams {
    after?: string
    categories: string[]
}

export const getProducts = async ({ after, categories }: GetProductsParams): Promise<ProductsResponse> => {


    const document = gql`
        query Products($after: String, $categories: [String!]) {
            products(
                channel: "uk", 
                first: 16, 
                after: $after,
                filter: {
                    attributes: [
                        {
                            slug: "type",
                            values: $categories
                        }
                    ]
                    stockAvailability: IN_STOCK
                },
                sortBy: { field: RATING, direction: DESC }
            ) {
                totalCount
                edges {
                    node {
                        id
                        name
                        rating
                        slug
                        isAvailable
                        strapline: attribute(slug: "strapline") {
                            values {
                                name
                            }
                        }

                        type: attribute(slug: "type") {
                            values {
                                name
                            }
                        }
                        thumbnail(size: 600, format: WEBP) {
                            url
                            alt
                        }
                        pricing {
                            priceRange {
                                stop {
                                    gross {
                                        amount
                                    }
                                }
                                start {
                                    gross {
                                        amount
                                    }
                                }
                            }
                        }
                    }
                }
                pageInfo {
                    hasNextPage
                    hasPreviousPage
                    startCursor
                    endCursor
                }
            }
        }
    `

    const response = await request<{
        products: ProductsResponse
    }>(endpoint, document, {
        after,
        categories,
    });

    return response['products']
}

interface GetProductParams {
    slug: string
}

export const getProduct = async ({ slug }: GetProductParams): Promise<Product> => {
    const document = gql`
        query Product($slug: String!) {
            product(
                channel: "uk", 
                slug: $slug,
            ) {
                id
                name
                description
                rating
                slug
                isAvailable
                seoDescription
                media {
                    id
                    alt
                    url
                }
                variants {
                    id
                    name
                    pricing {
                        price {
                            gross {
                                amount
                            }
                        }
                    }
                    attributes {
                        attribute {
                            slug
                        }
                        values {
                            name
                        }
                    }
                }
                strapline: attribute(slug: "strapline") {
                    values {
                        name
                    }
                }

                type: attribute(slug: "type") {
                    values {
                        name
                    }
                }
                pricing {
                    priceRange {
                        stop {
                            gross {
                                amount
                            }
                        }
                        start {
                            gross {
                                amount
                            }
                        }
                    }
                }
            }
        }
    `

    const response = await request<{
        product: Product
    }>(endpoint, document, {
        slug
    });

    return response['product']
}
