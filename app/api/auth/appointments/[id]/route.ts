import { NextResponse } from "next/server";
import { db } from "@/lib/db";

// 🟡 Prendre un rendez-vous
export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const appointmentId = params.id;
    const { patientId } = await req.json();

    const patient = await db.user.findUnique({
      where: { id: patientId },
    });

    if (!patient || patient.role !== "USER") {
      return NextResponse.json({ error: "Seuls les patients peuvent réserver un rendez-vous" }, { status: 403 });
    }

    const appointment = await db.appointment.findUnique({
      where: { id: appointmentId },
    });

    if (!appointment) {
      return NextResponse.json({ error: "Rendez-vous introuvable" }, { status: 404 });
    }

    if (appointment.patientId) {
      return NextResponse.json({ error: "Ce rendez-vous est déjà pris" }, { status: 400 });
    }

    const updatedAppointment = await db.appointment.update({
      where: { id: appointmentId },
      data: {
        patientId,
        status: "CONFIRMED",
      },
    });

    return NextResponse.json(updatedAppointment, { status: 200 });
  } catch (error) {
    console.error("Erreur lors du PATCH :", error); // ✅ utilisation de la variable
    return NextResponse.json({ error: "Erreur lors de la réservation du rendez-vous" }, { status: 500 });
  }
}

export async function GET() {
  try {
    const pendingAppointments = await db.appointment.findMany({
      where: {
        status: "PENDING",
        patientId: null,
      },
    });
    return NextResponse.json(pendingAppointments, { status: 200 });
  } catch (error) {
    console.error("Erreur lors du GET :", error); // ✅ utilisation de la variable
    return NextResponse.json({ error: "Erreur lors de la récupération des rendez-vous" }, { status: 500 });
  }
}
