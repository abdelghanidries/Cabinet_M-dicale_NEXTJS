"use client" 
import * as z from "zod"
import { useTransition } from "react";


import  { useForm} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";


import { LoginSchema } from "@/schemas";
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import {
  Form,
  


} from "@/components/ui/form"




import { Button } from "../ui/button";
import { Footer } from "./footer";
//import { FormError } from "../form-error";
//import { FormSucces } from "../form-success";
import { login } from "@/actions/login";


export const LoginForm =  () => {
    
    const [isPending , startTransition] = useTransition();

    const form = useForm<z.infer<typeof LoginSchema>>({
        resolver : zodResolver(LoginSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });
    const onSubmit = (values: z.infer<typeof LoginSchema>) => {
        
        startTransition(() => {
            login(values).then((data) => {
                
              if (data.success) {
                console.log("✅ Redirecting to:", data.redirectTo);
                window.location.href = data.redirectTo;
            } else {
                console.log("❌ Login error:", data.error);
            }
                
            });
        }) ;
        
     }
     
    return (

        <div className="w-[300px] mx-10 my-10">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6"
          >        

<h2 className="text-2xl font-bold text-white mb-6">Sign  Up</h2>
                    <div className="mb-4">
                    <Label className="block text-sm font-medium text-gray-300" htmlFor="email">Email</Label>
                    <Input className="mt-1 p-2 w-full bg-gray-700 border border-gray-600 rounded-md text-white" type="email" id="email" {...form.register("email")} placeholder="Email"  />
                   </div>

                   <div className="mb-4">
                    <Label  className="block text-sm font-medium text-gray-300" htmlFor="password">Password</Label>
                 <Input className="mt-1 p-2 w-full bg-gray-700 border border-gray-600 rounded-md text-white" type="password" id="password" {...form.register("password")} placeholder="Password" />
                   </div>
                    
                    
                 <Button
                 disabled={isPending}
                 type="submit"
                 className="w-full bg-gradient-to-r from-purple-600 via-purple-400 to-blue-500 text-white">
                    Login
                 </Button>
                </form>

            
        </Form>
        <Footer
        
        backButtonLabel="Don't have an account?"
        backButtonHref="/auth/register"
        >
        </Footer>
        </div>
    )
}