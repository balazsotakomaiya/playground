// todo: codegen all of this

export interface Product {
    id: string
    name: string
    slug: string
    rating: number
    thumbnail?: Thumbnail
    pricing: Pricing
    seoDescription?: string
    description?: string
    isAvailable: boolean
    type: Attribute
    strapline: Attribute
    media: Media[]
    variants: Variant[]
}

export interface Variant {
    id: string
    name: string
    pricing: VariantPricing
    attributes: {
        attribute: {
            slug: string
        }
        values: AttributeValue[]
    }[]
}

export interface VariantPricing {
    price: {
        gross: {
            amount: number
        }
    }
}

export interface Media {
    id: string
    url: string
    alt: string
}

export interface Attribute {
    values: AttributeValue[]
}

export interface AttributeValue {
    name: string
}

export interface Thumbnail {
    url: string
    alt: string
}

export interface Pricing {
    priceRange: {
        start: {
            gross: {
                amount: number
            }
        }
        stop: {
            gross: {
                amount: number
            }
        }
    }
}

export interface ResponseEdge<T> {
    node: T
    cursor: string
}

export interface PageInfo {
    hasNextPage: boolean
    hasPreviousPage: boolean
    startCursor: string
    endCursor: string
}

export interface ProductsResponse {
    totalCount: number
    pageInfo: PageInfo
    edges: ResponseEdge<Product>[]
}
