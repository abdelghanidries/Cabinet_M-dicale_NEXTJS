// /app/api/auth/usersManagement/route.ts
import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET() {
  try {
    const getUsers = await db.role.findMany(); // ou ajouter un filtre ici si nécessaire
    return NextResponse.json(getUsers, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Erreur lors de la récupération des utilisateurs" }, { status: 500 });
  }
}
