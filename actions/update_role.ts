"use server";

import * as z from "zod";
import { db } from "@/lib/db";
import { RoleSchema } from "@/schemas";
import { getUserByCode } from "@/data/data";
import { redirect } from "next/navigation";

export const updateRole = async (values: z.infer<typeof RoleSchema>) => {
  const validatedField = RoleSchema.safeParse(values);

  if (!validatedField.success) {
    return { error: "Invalid fields!" };
  }

  const { name, lastname, code, roleType } = validatedField.data;

  // Vérifie si un utilisateur avec ce code existe déjà
  const existingRole = await getUserByCode(code);

  if (!existingRole) {
    return { error: "Role not found!" };
  }

  try {
    await db.role.update({
      where: {
        code: code, // Assure-toi que 'code' est unique ou utilise un ID unique
      },
      data: {
        name,
        lastname,
        roleType,
      },
    });

    return { success: true };
  } catch (error) {
    console.error("Error updating role:", error);
    return { error: "Failed to update role!" };
  }
};
