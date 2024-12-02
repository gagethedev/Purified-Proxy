'use client'

import { Search as MagnifyingGlass } from 'lucide-react'
import { FormEvent } from 'react'
interface Props {
    onSubmit: (input: string, event: FormEvent<HTMLFormElement>) => void
}
export default function SearchInput({ onSubmit }: Props) {
    return (
        <form className="flex items-center" id="search-form" onSubmit={(event: FormEvent<HTMLFormElement>) => onSubmit((event.currentTarget.elements.namedItem('input') as HTMLInputElement).value, event)}>
            <div className="relative">
                <input
                    type="text"
                    placeholder="Search..."
                    name="input"
                    className="w-64 h-12 border-2 border-black pl-5 pr-12 rounded-full bg-transparent bg-opacity-50 backdrop-blur-md text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-300"
                />

                <button
                    type="submit"
                    className="absolute right-1 top-1 text-white p-2 rounded-full hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-300"
                >
                    <MagnifyingGlass className="h-5 w-5" />
                </button>
            </div>
        </form>
    )
}