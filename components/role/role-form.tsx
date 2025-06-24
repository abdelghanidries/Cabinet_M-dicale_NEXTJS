"use client";
import * as z from "zod";



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

import { role  } from "@/actions/add_role";
import { RoleSchema } from "@/schemas";

export const RoleForm = () => {
  

  const form = useForm<z.infer<typeof RoleSchema>>({
    resolver: zodResolver(RoleSchema),
    defaultValues: {
      name: "",
      lastname: "",
      code: "",
      roleType: "",
    },
  });
  const onSubmit = (values: z.infer<typeof RoleSchema>) => {
    startTransition(() => {
      role(values).then((data) => {
        console.log(data.success);
      });
    });
  };

  return (
    <div className="w-[300px] mx-10 my-10">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="">
          <h1 className="text-2xl font-bold text-white mb-6"> ADD ROLE</h1>
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
              className="brlock text-sm font-bold text-gray-300"
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

          
        

          <div className="mb-4">

          <Label
              className="block text-sm font-bold text-gray-300"
              htmlFor="role"
            >
              Role
            </Label>
            <Select
             onValueChange={(value) => form.setValue("roleType", value)} // ✅ Mise à jour de `role`
                  defaultValue={form.watch("roleType")}
               >
  <SelectTrigger className="mt-1 p-2 w-full bg-gray-700 border border-gray-600 rounded-md text-white">
    <SelectValue placeholder="Select a ROLE" />
  </SelectTrigger>
  <SelectContent>
    <SelectGroup>
      <SelectLabel>ROLE</SelectLabel>
      <SelectItem value="Doctor">Doctor</SelectItem>
      <SelectItem value="ADMIN_Imagery">ADMIN_Imagery</SelectItem>
      <SelectItem value="ADMIN_LAB_ANALYSE">ADMIN_LAB_ANALYSE</SelectItem>
      <SelectItem value="ADMIN">ADMIN</SelectItem>
    </SelectGroup>
  </SelectContent>
</Select>

           </div>
          <div className="flex justify-end">
            <Button
              type="submit"
              className="bg-gradient-to-r from-purple-600 via-purple-400 to-blue-500 text-white px-4 py-2 font-bold rounded-md hover:opacity-80"
            >
              Add Role
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};
