"use client"


import { BackButton } from "@/components/auth/back";



interface FooterProps {
    children :React.ReactNode;
    
    backButtonLabel: string;
    backButtonHref: string;
    
}

export const Footer = ( 
    {
        
        
        backButtonLabel,
        backButtonHref,
        
    } : FooterProps
 ) =>  {
  return(
    

    <div >
        <BackButton  
        label= {backButtonLabel}
        href={backButtonHref}/>
    </div>

   ) 
 }