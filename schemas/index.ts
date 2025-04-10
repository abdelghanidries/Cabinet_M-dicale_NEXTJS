import * as z from "zod"
import { UserRole } from "@prisma/client";



export const LoginSchema = z.object({
    email: z.string().email({
        message: "Email is required"
    }),
    password: z.string().min(1, {
        message: "password is required"
    })
});

export const RegisterSchema = z.object({
    name: z.string().min(1, {
        message: "Name is required" 
         }),
    lastname: z.string().min(1, {
        message: "Last Name is required" 
         }),
    email: z.string().email({
        message: "Email is required"
    }),
    password: z.string().min(6, {
        message: "Minimum 6 characters required"
    }),
    role: z.nativeEnum(UserRole).optional(), // ✅ Vérifie que `role` est une valeur de `UserRole
    code: z.string().optional(),
   
});


export const RoleSchema = z.object({
    name: z.string().min(1, {
        message: "Name is required" 
         }),
    lastname: z.string().min(1, {
        message: "Last Name is required" 
         }),
    
    code: z.string().min(1, {
        message: "Code is required" 
         }),
    roleType: z.enum(["ADMIN", "Doctor", "ADMIN_Imagery", "ADMIN_LAB_ANALYSE"]),
});

