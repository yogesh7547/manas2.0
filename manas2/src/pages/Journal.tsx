import React from 'react'
import JournalCard from '../components/Journal/JournalCard'

const Journal: React.FC= () => {
  return (
   <div className='flex h-[75%] w-full flex-col justify-start gap-8 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]'>
   
   <div className='text-center mt-5'>
    <h1 className="font-extrabold text-[25px]">Journal</h1>
    <p className='font-medium'>Track your Journey and reflect</p>
   </div>

    <JournalCard/>
    <JournalCard/>
    <JournalCard/>
    <JournalCard/>
    <JournalCard/>
    <JournalCard/>

    
    
   </div>
  )
}

export default Journal