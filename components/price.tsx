import { Plus } from 'lucide-react'
import React from 'react'

const Price = ({price, className=""} :{price:number; className? : string}) => {
    return (
        <div className={`flex container flex-row justify-between w-full ${className}`}>
            <h1>$ {price.toFixed(1)}</h1>
            <Plus fill='yellow' color='yellow' />
        </div>
    )
}

export default Price