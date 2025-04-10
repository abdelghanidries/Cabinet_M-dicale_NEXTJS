"use server";

import { LoginSchema } from "@/schemas";
import { signIn } from "@/auth";
import {
  ADMIN_DOCTOR_LOGIN_REDIRECT,
  ADMIN_IMAGERY_LOGIN_REDIRECT,
  ADMIN_LAB_ANALYSE_LOGIN_REDIRECT,
  ADMIN_LOGIN_REDIRECT,
  DEFAULT_LOGIN_REDIRECT,
} from "@/routes";
import { AuthError } from "next-auth";
import { z } from "zod";
import { getUserByEmail } from "@/data/data";

export const login = async (
  values: z.infer<typeof LoginSchema>,
  callbackUrl?: string | null
) => {
  const validatedFields = LoginSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  const { email, password } = validatedFields.data;

  try {
    await signIn("credentials", {
      email,
      password,
      redirect: false, // Désactiver la redirection automatique
    });

    // Vérification côté serveur du rôle
    const user = await getUserByEmail(email);

    if (!user) {
      return { error: "User not found!" };
    }

    let redirectTo = DEFAULT_LOGIN_REDIRECT;

    if (user.role === "ADMIN") {
      redirectTo = ADMIN_LOGIN_REDIRECT;
    } else if (user.role === "ADMIN_Imagery") {
      redirectTo = ADMIN_IMAGERY_LOGIN_REDIRECT;
    } else if (user.role === "ADMIN_LAB_ANALYSE") {
      redirectTo = ADMIN_LAB_ANALYSE_LOGIN_REDIRECT;
    }
    else if (user.role === "Doctor") {
      redirectTo = ADMIN_DOCTOR_LOGIN_REDIRECT;
    }

    return { success: true, redirectTo };
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid credentials!" };
        default:
          return { error: "Something went wrong!" };
      }
    }
    throw error;
  }
};
