import { useState } from 'react';

import { HiOutlineViewList } from "react-icons/hi";

type propsType = {
  handleSectionSelect: (data:string) => void
}

export default function NavBarFormatos(props:propsType) {
    const [isOpen, setIsOpen] = useState<boolean>(false)

    const handleMenu = (data:string) => {
      props.handleSectionSelect(data)
      setIsOpen(false)
    }

  return (
    <div
      className={`w-[100%] h-16 flex justify-between items-center bg-Celifrut-green rounded-t-sm m-0 border-1 border-Celifrut-green-dark pl-5`}
    >
      <div className='flex justify-center items-center  hover:bg-Celifrut-green-dark rounded-full p-2'>
        <button className={` text-3xl text-white`} onClick={() => setIsOpen(!isOpen)}>
          <HiOutlineViewList />
        </button>
     
        {isOpen && (
        <div 
          className={` fixed inset-0 `}
          onClick={() => setIsOpen(false)}
        >
          <div 
           className='absolute left-48 top-40 w-64 rounded-md shadow-lg ml-2 bg-white z-10 flex flex-col'
            onClick={(e) => e.stopPropagation()}
          >
            <button onClick={() => handleMenu('Higiene Personal')} className='pb-1 hover:bg-slate-400' >
                Higiene Personal
            </button>
            <button onClick={() => handleMenu('Control Plagas')} className='pb-1  hover:bg-slate-400'>
                Control Plagas
            </button>
            <button onClick={() => handleMenu('Inspección Postcosecha')} className='pb-1  hover:bg-slate-400'>
                Inspección Postcosecha
            </button>
            <button onClick={() => handleMenu('Inspeccion Mensual')} className='pb-1  hover:bg-slate-400'>
                Inspeccion Mensual
            </button>
          </div>
        </div>
      )}
      </div>
 
    </div>
  )
}
