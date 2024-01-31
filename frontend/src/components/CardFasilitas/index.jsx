import { BikeScooter } from '@mui/icons-material'
import React from 'react'

export const CardFasilitas = ({nama}) => {
  return (
    <div className="w-[5px] h-[5px] text-sm p-6 relative rounded-lg border border-zinc-300 flex flex-col justify-center items-center" >
        <BikeScooter style={{
          'font-size' : "1rem"
        }}/>
        <p className='text-sm'>{nama}</p>
    </div>
  )
}
