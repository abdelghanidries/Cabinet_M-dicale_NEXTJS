import { NextResponse } from "next/server";
import { db } from "@/lib/db";

// 🟢 Création d'un rendez-vous par un médecin
export async function POST(req: Request) {
  try {
    const reqBody = await req.json();

    const { 
      date,
      startTime,
      endTime,
      reason,
      type,
      doctorFirstName,
      doctorLastName,
      doctorSpeciality,
      doctorId 
    } = reqBody;

    console.log("Contenu de reqBody:", reqBody);

    // Vérification du médecin
    const doctor = await db.user.findUnique({
      where: { id: doctorId },
    });

    if (!doctor || doctor.role !== "Doctor") {
      return NextResponse.json({ error: "Seuls les médecins peuvent créer des rendez-vous" }, { status: 403 });
    }

    // Vérification du chevauchement de rendez-vous
    const conflict = await db.appointment.findFirst({
      where: {
        doctorId,
        startTime: new Date(startTime),
        endTime: new Date(endTime),
        status: { in: ["PENDING", "CONFIRMED"] },
      },
    });

    if (conflict) {
      return NextResponse.json({ error: "Créneau déjà réservé" }, { status: 409 });
    }

    // Création du rendez-vous
    const appointment = await db.appointment.create({
      data: {
        date: new Date(date),
        startTime: new Date(startTime),
        endTime: new Date(endTime),
        reason,
        type,
        doctorFirstName,
        doctorLastName,
        doctorSpeciality,
        patientId: null,
        status: "PENDING",
        doctorId,
      },
    });

    return NextResponse.json(appointment, { status: 201 });

  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Erreur détaillée:", error);
      return NextResponse.json(
        { error: "Erreur lors de la création du rendez-vous: " + error.message },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { error: "Erreur inconnue lors de la création du rendez-vous." },
      { status: 500 }
    );
  }
}
