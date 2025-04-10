"use server"

import * as z from "zod";
import bcrypt from "bcrypt";
import { db } from "@/lib/db";  // Assure-toi que tu utilises la bonne instance Prisma ici
import { RegisterSchema } from "@/schemas";
import { getUserByEmail } from "@/data/data";
import { redirect } from "next/navigation";

// Fonction pour l'enregistrement de l'utilisateur
export const register = async (values: z.infer<typeof RegisterSchema>) => {
  // Validation des champs avec Zod
  const validatedField = RegisterSchema.safeParse(values);

  // Si la validation échoue, retourner une erreur
  if (!validatedField.success) {
    return { error: "Invalid fields!" };
  }

  const { email, password, name, lastname, role, code } = validatedField.data;

  // Hashing du mot de passe
  const hashedPassword = await bcrypt.hash(password, 10);

  // Vérifier si l'email est déjà utilisé
  const existingUser = await getUserByEmail(email);
  if (existingUser) {
    return { error: "Email already in use!" };
  }

  // Créer l'utilisateur avec ou sans code en fonction du rôle
  const createUserData = {
    name,
    lastname,
    email,
    password: hashedPassword,
    role,
    // Si le rôle est "USER", le code est optionnel, donc on le définit à null
    code: role === "USER" ? null : code,  // Si le rôle est "USER", le code est `null`
  };

  // Créer l'utilisateur dans la base de données
  await db.user.create({
    data: createUserData,
  });

  // TODO: Envoyer un email de vérification (code pour l'email ici)

  // Redirection après la création
  return redirect("/"); // Redirige l'utilisateur après l'enregistrement
};
