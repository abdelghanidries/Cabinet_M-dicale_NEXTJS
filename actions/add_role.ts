"use server"

import *  as z from "zod";

import { db } from "@/lib/db";

import { RoleSchema } from "@/schemas";
import { getUserByCode } from "@/data/data";
import { redirect } from "next/navigation";




export const role = async (values : z.infer<typeof RoleSchema >) => {
    const validatedField = RoleSchema.safeParse(values);
   

    if (!validatedField.success) {
        return { error: "Invalid fields!"};
      }

      const { name, lastname ,code , roleType } = validatedField.data;

      
      

      const existingRole = await getUserByCode(code);
      if(existingRole){
        return {error : "Role already in use!"}
      }


      await db.role.create({
        data: {
          name,
          lastname,
          code,
          roleType,


        },
      });

     // TODO: send verification token email


    return redirect("/");

}