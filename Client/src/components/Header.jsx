import React from 'react'
import { GrLanguage } from "react-icons/gr";
import i18next from 'i18next';
import { useTranslation } from 'react-i18next';
//header component - design 
export default function Header() {

  const [t,i18n]=useTranslation('global')

    const changeLanguage = (lng) => {
      i18next.changeLanguage(lng);
    };
    
  return (
    <div className="bg-teal-500 p-[1%] flex flex-row justify-between">
    <div className='text-white font-bold mt-1 text-3xl'>{t('header.crmSystem')}</div>
    
    <div className="flex">
      <div className='mr-4 text-white mt-2'>{t('header.userName')}</div>
      <img className="h-10 w-10 object-cover rounded-full" src="https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1361&q=80" alt="Current profile photo" />

      <div>
        <select onChange={(e) => changeLanguage(e.target.value)} defaultValue="en" className='rounded ml-2 mt-3 text-sm'>
          <option value="en">EN</option>
          <option value="ar">AR</option>
          <option value="he">HE</option>
        </select>
      </div>
    </div>
  </div>
);
}