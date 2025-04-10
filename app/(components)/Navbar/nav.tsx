"use client"; // Ajoutez cette directive en haut du fichier

import { Button } from '@/components/ui/button';
import { handleSignOut } from "@/actions/authActions"; // Utilisez l'action serveur externe
import { useAppDispatch, useAppSelector } from '@/app/redux';
import { setIsDarkMode, setIsSidebarCollapsed } from '@/state';
import { Bell, Menu } from 'lucide-react';


const Nav = () => { const dispatch = useAppDispatch();
  const isSidebarCollapsed = useAppSelector(
    (state) => state.global.isSidebarCollapsed,
  );

  const isDarkMode = useAppSelector((state) => state.global.isDarkMode);

  const toggleDarkMode = () => {
    dispatch(setIsDarkMode(!isDarkMode));
  }
  const toggleSidebar = () => {
    dispatch(setIsSidebarCollapsed(!isSidebarCollapsed));
  };

  return (
    
    <div className='flex justify-between items-center w-full mb-7 gap-5'>
      {/* LEFT SIDE*/}
      <div className='flex justify-between items-center gap-5'>
        <button
          className='px-3 py-3 bg-gray-100 rounded-full hover:bg-blue-100'
          onClick={toggleSidebar}
        >
          <Menu className='w-4 h-4' />
        </button>
      
      
      </div>
    <div>
      </div>

      {/* RIGHT SIDE */}

      
     
      <div className="flex flex-row justify-around items-center w-screen h-16 gap-4 bg-white  border-t-4 rounded-lg"> 
        <div className="grid grid-cols-9 bg-[#007BFF] w-3xs h-12 rounded-xl ml-2">
          hello
        </div>
        <div className="grid grid-cols-9 bg-[#007BFF] w-1/2 h-12 rounded-xl my-2">
          hello
        </div>
        <div className="grid grid-cols-9 bg-[#007BFF] w-64 h-12 rounded-xl mr-2">
          <div className="flex justify-around items-center col-span-9 w-full gap-2">
            <Button className="bg-[#4CAF50] w-28">Sign In</Button>
            
            {/* Utilisez l'action importée directement */}
            <form action={handleSignOut}>
              <Button className="bg-[#D32F2F] w-28">Sign Out</Button>
            </form>
          </div>
        </div>
      
      </div>
      </div>
    
  );
};

export default Nav;