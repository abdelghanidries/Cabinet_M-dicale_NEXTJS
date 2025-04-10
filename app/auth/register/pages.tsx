
import { RegisterForm } from "@/components/auth/register-form"



const RegisterPage = () => {
  return (
    <div className="flex justify-center items-center">
    <div className="flex justify-center items-center bg-blue-400 w-full h-screen gap-8 flex-col  ">

          
           <div className="grid grid-cols-9 bg-slate-300 w-96 h-full my-40 rounded-xl "> 
    <RegisterForm />
    </div>
    </div>
    </div>
  )
}

export default RegisterPage