import React from "react";
import {PlusIcon, MinusIcon} from '@heroicons/react/20/solid'

interface Props {
    quantity: number
    setQuantity: (quantity: number) => void
}

const QuantityPicker: React.FC<Props> = ({ quantity, setQuantity }) => {
    const onMinusClick = () => {
        if (quantity > 0) {
            setQuantity(quantity - 1)
        }
    }

    const onPlusClick = () => {
        setQuantity(quantity + 1)
    }

    return (
        <div>
            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                Quantity
            </label>
            <div className="mt-2 flex rounded-md shadow-sm">
                <button
                    onClick={onMinusClick}
                    type="button"
                    className="relative -mr-px inline-flex items-center gap-x-1.5 rounded-l-md px-8 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                >
                    <MinusIcon className="-ml-0.5 h-5 w-5 text-gray-400" aria-hidden="true"/>
                </button>

                <div className="relative flex flex-grow items-stretch focus-within:z-10">
                    <input
                        type="number"
                        className="block w-full text-center rounded-none border-0 py-1.5 pl-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-500 sm:text-sm sm:leading-6"
                        placeholder="0"
                        value={quantity}
                        onChange={(e) => setQuantity(parseInt(e.target.value))}
                    />
                </div>
                <button
                    onClick={onPlusClick}
                    type="button"
                    className="relative -ml-px inline-flex items-center gap-x-1.5 rounded-r-md px-8 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                >
                    <PlusIcon className="-ml-0.5 h-5 w-5 text-gray-400" aria-hidden="true"/>
                </button>
            </div>
        </div>
    )
}

export default QuantityPicker;
