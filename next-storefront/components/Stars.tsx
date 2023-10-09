import React from "react";
import {StarIcon} from "@heroicons/react/20/solid";
import clsx from "clsx";

interface Props {
    rating: number
}

/**
 * Render a list of stars for the product rating, rounded to whole numbers,
 * rendering a full star for each whole number and empty stars for the remainder (until 5)
 */
const Stars: React.FC<Props> = ({ rating }) => {
    const ratingRounded = Math.round(rating)
    const stars = []

    for (let i = 0; i < ratingRounded; i++) {
        stars.push(
            <StarIcon
                key={i}
                className={clsx(
                    'h-5 w-5 flex-shrink-0',
                    'text-yellow-400'
                )}
                aria-hidden="true"
            />
        )
    }

    for (let i = 0; i < 5 - ratingRounded; i++) {
        stars.push(
            <StarIcon
                key={i}
                className={clsx(
                    'h-5 w-5 flex-shrink-0',
                    'text-gray-200'
                )}
                aria-hidden="true"
            />
        )
    }

    return stars
}

export default Stars;
