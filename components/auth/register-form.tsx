"use client";
import * as z from "zod";

import { useTransition } from "react";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Form } from "@/components/ui/form";

import { Button } from "../ui/button";
import { Footer } from "./footer";

import { register } from "@/actions/register";
import { RegisterSchema } from "@/schemas";

export const RegisterForm = () => {
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      name: "",
      lastname: "",
      email: "",
      password: "",
      role: "",
    },
  });
  const onSubmit = (values: z.infer<typeof RegisterSchema>) => {
    startTransition(() => {
      register(values).then((data) => {
        console.log(data.success);
      });
    });
  };

  return (
    <div className="w-[300px] mx-10 my-10">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="">
          <h1 className="text-2xl font-bold text-white mb-6"> Sign in </h1>
          <div className="mb-4">
            <Label
              className="block text-sm font-bold text-gray-300"
              htmlFor="name"
            >
              First Name
            </Label>
            <Input
              className="mt-1 p-2 w-full bg-gray-700 border border-gray-600 rounded-md text-white"
              type=""
              id="name"
              {...form.register("name")}
              placeholder="First Name"
            />
          </div>
          <div className="mb-4">
            <Label
              className="block text-sm font-bold text-gray-300"
              htmlFor="lastname"
            >
              Last Name
            </Label>
            <Input
              className="mt-1 p-2 w-full bg-gray-700 border border-gray-600 rounded-md text-white"
              type=""
              id="lastname"
              {...form.register("lastname")}
              placeholder="Last Name"
            />
          </div>

          <div className="mb-4">
            <Label
              className="block text-sm font-bold text-gray-300"
              htmlFor="email"
            >
              Email
            </Label>
            <Input
              className="mt-1 p-2 w-full bg-gray-700 border border-gray-600 rounded-md text-white"
              type="email"
              id="email"
              {...form.register("email")}
              placeholder="Email"
            />
          </div>

          <div className="mb-4">
            <Label
              className="block text-sm font-bold text-gray-300"
              htmlFor="password"
            >
              Password
            </Label>
            <Input
              className="mt-1 p-2 w-full bg-gray-700 border border-gray-600 rounded-md text-white"
              type="password"
              id="password"
              {...form.register("password")}
              placeholder="Password"
            />
          </div>
        

          <div className="mb-4">

          <Label
              className="block text-sm font-bold text-gray-300"
              htmlFor="role"
            >
              Role
            </Label>
            <Select
  onValueChange={(value) => form.setValue("role", value)} // ✅ Mise à jour de `role`
  defaultValue={form.watch("role")}
>
  <SelectTrigger className="mt-1 p-2 w-full bg-gray-700 border border-gray-600 rounded-md text-white">
    <SelectValue placeholder="Select a ROLE" />
  </SelectTrigger>
  <SelectContent>
    <SelectGroup>
      <SelectLabel>ROLE</SelectLabel>
      <SelectItem value="USER">USER</SelectItem>
      <SelectItem value="Doctor">Doctor</SelectItem>
      <SelectItem value="ADMIN_Imagery">ADMIN_Imagery</SelectItem>
      <SelectItem value="ADMIN_LAB_ANALYSE">ADMIN_LAB_ANALYSE</SelectItem>
      <SelectItem value="ADMIN">ADMIN</SelectItem>
    </SelectGroup>
  </SelectContent>
</Select>  

<div className="mb-4">
            <Label
              className="block text-sm font-bold text-gray-300"
              htmlFor="code"
            >
              Code
            </Label>
            <Input
              className="mt-1 p-2 w-full bg-gray-700 border border-gray-600 rounded-md text-white"
              type=""
              id="code"
              {...form.register("code")}
              placeholder="Code"
            />
          </div>

           </div>
          <div className="flex justify-end">
            <Button
              type="submit"
              className="bg-gradient-to-r from-purple-600 via-purple-400 to-blue-500 text-white px-4 py-2 font-bold rounded-md hover:opacity-80"
            >
              Register
            </Button>
          </div>
        </form>
      </Form>
      <Footer
        backButtonLabel="Already heve an account?"
        backButtonHref="/"
      ></Footer>
    </div>
  );
};
