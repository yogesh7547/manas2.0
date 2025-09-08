import React from 'react'
import { Link } from 'react-router'
import SettingIcon from '../../assets/SettingIcon.png'
import ChatIcon from '../../assets/ChatIcon.png'
import JournalIcon from '../../assets/JournalIcon.png'

const Navigation:React.FC= () => {
  return (
    <div className='mx-auto w-[100%] h-[12%] bg-[#ffffff] flex items-center justify-between px-10'>
        <Link to='/chat'>
        
       <img src={ChatIcon} alt="ChatIcon" />
       </Link>
       <Link to='/journal'>
       <img src={JournalIcon} alt="JournalIcon" />
       </Link>
       <Link to='/settings'>
       <img src={SettingIcon} alt="SettingIcon" />
       </Link>
    </div>
  )
}

export default Navigation