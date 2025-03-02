import { Star } from 'lucide-react';
import React from 'react'

const Rating = ({rating,className=""}:{rating:number; className : string}) => {
    return (
        <div className={`flex  text-sm flex-row  gap-2 items-start
        ${className}`}>
            <Star color='yellow' className='w-4 h-4 relative top-[0.3]' fill='yellow' />
            {Number(rating.toFixed(1))}
        </div>
    )
}

export default Rating;