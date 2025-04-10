

import { auth, signOut } from "@/auth"

import { Button } from "@/components/ui/button"


const Dashboard = async () =>  {
  const session = await auth();
  return (
    <div>
      <div className="flex flex-row justify-around items-center  w-screen h-16 gap-8  bg-[#007BFF] border-t-4  "> 
    <div className="grid grid-cols-9 bg-[#343A40] w-3xs h-12  rounded-xl my-2 ">
      hello </div>
    <div className="grid grid-cols-9 bg-[#343A40] w-1/2 h-12  rounded-xl my-2  ">hello </div>
    <div className="grid grid-cols-9 bg-[#F8F9FA] w-64 h-12  rounded-xl my-2 ">
      <div className="flex justify-around items-center col-span-9 w-full  gap-2 ">
      <Button className="bg-[#4CAF50] w-28 ">Sign In</Button> 
      
     <form action={async () => {
    "use server";
    await signOut();
         }}>
       <Button className="bg-[#D32F2F] w-28">Sign Out</Button>
         </form>


      
      </div>
       </div>
    
    </div>

          
    
    <div className="flex justify-center items-center ">
      <div
    className="flex py-10">
      {JSON.stringify(session)}
        <form action={async() =>  {
          "use server";
          await signOut();
        }}>
          <button type="submit" >
            Sign out
          </button>
        </form>
    </div>
    </div>
    </div>
    
  )
}

export default Dashboard




