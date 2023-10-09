'use client'

import React from "react";
import {RadioGroup} from "@headlessui/react";
import clsx from "clsx";
import {Variant} from "@/types";

interface Props {
    variant: Variant
}

const Variant: React.FC<Props> = ({ variant }) => {
    const displayName = variant
        .attributes
        .find((attribute) => attribute.attribute.slug === 'display_weight')
        ?.values[0].name

    if (!displayName) return null

    return (
        <RadioGroup.Option
            key={variant.id}
            value={variant}
            className={({ active, checked }) =>
                clsx(
                    'cursor-pointer focus:outline-none',
                    active ? 'ring-2 ring-gray-500 ring-offset-2' : '',
                    checked
                        ? 'border-transparent bg-gray-800 text-white hover:bg-gray-900'
                        : 'border-gray-200 bg-white text-gray-900 hover:bg-gray-50',
                    'flex items-center justify-center rounded-md border py-3 px-3 text-sm font-medium uppercase sm:flex-1'
                )
            }
        >
            <RadioGroup.Label as="span">{displayName}</RadioGroup.Label>
        </RadioGroup.Option>
    )
}

export default Variant;
