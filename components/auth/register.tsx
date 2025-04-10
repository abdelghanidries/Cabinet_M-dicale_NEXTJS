"use client" 
import * as z from "zod"

import {  useTransition } from "react";

import  { useForm} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";



import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import {
  Form,
 


} from "@/components/ui/form"




import { Button } from "../ui/button";
import { Footer } from "./footer";

import { register } from "@/actions/register";
import { RegisterSchema} from "@/schemas";


export const RegisterForm =  () => {
    
    const [isPending , startTransition] = useTransition();

    const form = useForm<z.infer<typeof RegisterSchema>>({
        resolver : zodResolver(RegisterSchema),
        defaultValues: {
            name:"",
            lastname:"",
            email: "",
            password: "",
            
        },
    });
    const onSubmit = (values: z.infer<typeof RegisterSchema>) => {
       
        startTransition(() => {
            register(values).then((data) => {
                console.log(data.success)
                
            });
        }) ;
        
     }
     
    return (
        <div className="w-[300px] mx-10 my-10">
        <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6"
          >
                  
                  <div className="grid w-full max-w-sm items-center gap-1.5"  >
                    <Label htmlFor="name">First Name</Label>
                    <Input type="" id="name" {...form.register("name")} placeholder="First Name"  />
                   </div>
                   <div className="grid w-full max-w-sm items-center gap-1.5">
                    <Label htmlFor="lastname">Last Name</Label>
                    <Input type="" id="lastname" {...form.register("lastname")} placeholder="Last Name"  />
                   </div>


                    <div className="grid w-full max-w-sm items-center gap-1.5">
                    <Label htmlFor="email">Email</Label>
                    <Input type="email" id="email" {...form.register("email")} placeholder="Email"  />
                   </div>

                   <div className="grid w-full max-w-sm items-center gap-1.5">
                    <Label htmlFor="password">Password</Label>
                 <Input type="password" id="password" {...form.register("password")} placeholder="Password" />
                   </div>
                
                    
                    
                 <Button
                 disabled={isPending}
                 type="submit"
                 className="w-full bg-blue-400 hover:bg-blue-300 hover:text-black">
                    Register
                 </Button>
                </form>

            
        </Form>
        <Footer
        
        backButtonLabel="Already heve an account?"
         backButtonHref="/"
        >
        </Footer>
        </div>
    )
}