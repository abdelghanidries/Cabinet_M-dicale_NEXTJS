import { LoginForm  } from "@/components/auth/login-form";

import Image from "next/image";

export default function Home() {
  return (
    <div className="flex ">
      <div className="flex relative justify-center items-center  bg-blue-500 w-2/3 h-screen px-20 overflow-auto  ">
      
      <Image src="/medecin.jpg" alt="hello" layout="fill" objectFit="cover" />
      </div>
      <div className="hidden absolute md:inset-y-full justify-center items-center bg-red-500 w-1/2 h-screen gap-8 flex-col ">


           <div className="grid grid-cols-9 bg-yellow-50 h-20 w-96 rounded-sm"> hello</div>
           <div className="grid grid-cols-9 bg-yellow-50 h-20 w-96 rounded-sm"> hello</div>
          
      </div>
      <div className="flex justify-center items-center bg-blue-400 w-1/2 h-screen gap-8 flex-col  ">

          
           <div className="grid grid-cols-9 bg-slate-300 w-96 h-full my-40 rounded-xl "> 
            
            
            <LoginForm  />
            </div>
           
           
           
          
      </div>
    </div>
  );
}
