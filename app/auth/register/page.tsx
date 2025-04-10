
import { RegisterForm } from "@/components/auth/register-form"



const RegisterPage = () => {
  return (
    <div className="flex justify-center items-center">
    <div className="flex justify-center items-center bg-white-300 w-full h-screen gap-8 flex-col  ">

          
       <div className="max-w-md mx-auto relative overflow-hidden z-10 bg-gray-800 p-8 rounded-lg shadow-md before:w-24 before:h-24 before:absolute before:bg-purple-600 before:rounded-full before:-z-10 before:blur-2xl after:w-32 after:h-32 after:absolute after:bg-sky-400 after:rounded-full after:-z-10 after:blur-xl after:top-24 after:-right-12space-y-6"> 
       <RegisterForm />
       </div>    
    
    </div>
    </div>
  )
}

export default RegisterPage