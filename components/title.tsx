import React from 'react'

const Title = ({title,description,truncate}:{title:string,description:string,truncate : boolean}) => {
    return (
        <div className='flex flex-col leading-1 container gap-2'>
            <h1 className='text-sm text-[#FCF9F2]'>{title}</h1>
            <h1 className={`text-xs text-left text-white/50 ${truncate? 'truncate':''}`}>{truncate ? description.substring(0, 50) + "...": description}</h1>
        </div>
    )
}

export default Title