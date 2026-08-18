import { CreditCard } from 'lucide-react'
import React from 'react'

const CreditDisplay = ({credits}) => {
    return (
        <div className='flex items-center gap-1 bg-blue-50 px-3 py-1 rounded-full text-blue-700'>
            <CreditCard size={16}/>
            <span className='font-medium '>
                {credits}
            </span>
            <span className='text-md my-auto font-medium '>
                Credits
            </span>
        
        </div>
    )
}

export default CreditDisplay
