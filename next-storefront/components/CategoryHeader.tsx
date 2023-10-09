import React from "react";

interface Props {
    name: string
    description: string
}

const CategoryHeader: React.FC<Props> = ({ name, description }) => {
    return (
        <div className="px-4 py-24 text-center sm:px-6 lg:px-8 bg-bath-bomb-cover bg-cover bg-center">
            <h1 className="text-4xl font-bold tracking-tight text-white">{name}</h1>
            <p className="mx-auto mt-4 max-w-xl text-base text-white">
                {description}
            </p>
        </div>
    )
}

export default CategoryHeader
