import { IconMapSearch } from '@tabler/icons-react'
import React from 'react'

function LinkAddress({ place, className }) {
    return (
        <a
            href={'https://www.google.com/maps/place/' + place}
            className={'flex items-center gap-2 font-medium text-blue-500 underline hover:text-blue-700 ' + className}
            target="_blank"
        >
            <IconMapSearch />
            {place}
        </a>
    )
}
export default LinkAddress
