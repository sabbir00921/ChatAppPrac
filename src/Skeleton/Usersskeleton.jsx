import React from 'react'

const Usersskeleton = () => {
    return (
        <div>
            {
                [...Array(5)].map((_, index) => (
                    <li key={index} className="py-3 sm:py-4 animate-pulse">
                        <div className="flex items-center">
                            <div className="shrink-0">
                                <div className="w-10 h-10 rounded-full bg-gray-300 dark:bg-gray-700"></div>
                            </div>
                            <div className="flex-1 min-w-0 ms-4">
                                <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-24 mb-2"></div>
                                <div className="h-3 bg-gray-200 dark:bg-gray-600 rounded w-36"></div>
                            </div>
                            <div className="w-[100px] h-8  bg-gray-300 dark:bg-gray-700 rounded-lg mx-4"></div>
                        </div>
                    </li>
                ))
            }
        </div>
    )
}

export default Usersskeleton
