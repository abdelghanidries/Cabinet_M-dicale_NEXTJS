"use client";

import { Button } from '@/components/ui/button';
import { handleSignOut } from "@/actions/authActions";
import { useAppDispatch, useAppSelector } from '@/app/redux';
import { setIsDarkMode, setIsSidebarCollapsed } from '@/state';
import { Bell, Menu, User, LogOut } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { useSession } from "next-auth/react";
import { useEffect, useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const Nav = () => {
  const { data: session } = useSession();
  const userId = session?.user.id;
  const name = session?.user.name;
  const lastname = session?.user.lastname;
  const email = session?.user.email;

  
  const dispatch = useAppDispatch();
  const isSidebarCollapsed = useAppSelector((state) => state.global.isSidebarCollapsed);
  
  const toggleSidebar = () => dispatch(setIsSidebarCollapsed(!isSidebarCollapsed));

  const getUserInitials = () => {
    if (name && lastname) return `${name[0]}${lastname[0]}`.toUpperCase();
    return <User className="w-4 h-4" />;
  };

  useEffect(() => {
    if (userId) setDoctorId(userId);
  }, [userId]);

  return (
    <nav className="flex items-center justify-between w-full h-16 px-4 bg-white shadow-sm dark:bg-gray-800 border-b dark:border-gray-700">
      {/* Left Side */}
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleSidebar}
          className="rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
        >
          <Menu className="w-5 h-5 text-gray-600 dark:text-gray-300" />
        </Button>
      </div>

      {/* Right Side */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" className="relative rounded-full text-gray-600 dark:text-gray-300">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="rounded-full p-0.5 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <Avatar className="w-8 h-8">
                <AvatarImage src="/path-to-user-image.jpg" />
                <AvatarFallback className="bg-primary-100 dark:bg-gray-600 text-primary-600 dark:text-gray-200">
                  {getUserInitials()}
                </AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          
          <DropdownMenuContent align="end" className="w-64 p-2">
            <DropdownMenuLabel className="p-3">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">
                  {name} {lastname}
                </p>
                <p className="text-xs leading-none text-gray-500 dark:text-gray-400">
                  {email}
                </p>
              </div>
            </DropdownMenuLabel>
            
            <DropdownMenuSeparator className="my-1" />
            
            <form action={handleSignOut}>
              <DropdownMenuItem asChild>
                <button 
                  type="submit"
                  className="flex items-center w-full px-3 py-2 text-sm rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 text-red-600 dark:text-red-400 cursor-pointer"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Déconnexion
                </button>
              </DropdownMenuItem>
            </form>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  );
};

export default Nav;