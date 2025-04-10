import { NextResponse } from "next/server";
import { db } from "@/lib/db";

// 🟢 Création d'un rendez-vous par un médecin
export async function POST(req: Request) {
  try {
    const { doctorId, date, reason } = await req.json();

    // Vérifier si l'utilisateur est bien un médecin
    const doctor = await db.user.findUnique({
      where: { id: doctorId },
    });

    if (!doctor || doctor.role !== "Doctor") {
      return NextResponse.json({ error: "Seuls les médecins peuvent créer des rendez-vous" }, { status: 403 });
    }

    // Créer le rendez-vous (sans patientId)
    const appointment = await db.appointment.create({
      data: {
        doctorId,
        date: new Date(date),
        reason,
        status: "PENDING",
        patientId: null, // Aucun patient n'est encore associé
      },
    });

    return NextResponse.json(appointment, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Erreur lors de la création du rendez-vous" }, { status: 500 });
  }
}
