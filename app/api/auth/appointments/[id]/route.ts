import { NextResponse } from "next/server";
import { db } from "@/lib/db";

// 🟡 Prendre un rendez-vous
export async function PATCH(
  req: Request,
  { params }: { params: { id: string } } // ✅ On destructure directement params
) {
  try {
    const appointmentId = params.id; // ✅ Accès correct
    const { patientId } = await req.json();

    // Vérifier si le patient existe
    const patient = await db.user.findUnique({
      where: { id: patientId },
    });

    if (!patient || patient.role !== "USER") {
      return NextResponse.json({ error: "Seuls les patients peuvent réserver un rendez-vous" }, { status: 403 });
    }

    // Vérifier si le rendez-vous est disponible
    const appointment = await db.appointment.findUnique({
      where: { id: appointmentId },
    });

    if (!appointment) {
      return NextResponse.json({ error: "Rendez-vous introuvable" }, { status: 404 });
    }

    if (appointment.patientId) {
      return NextResponse.json({ error: "Ce rendez-vous est déjà pris" }, { status: 400 });
    }

    // Mettre à jour le rendez-vous avec le patientId
    const updatedAppointment = await db.appointment.update({
      where: { id: appointmentId },
      data: {
        patientId,
        status: "CONFIRMED",
      },
    });

    return NextResponse.json(updatedAppointment, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Erreur lors de la réservation du rendez-vous" }, { status: 500 });
  }
}


export async function GET() {
  try {
    // Récupérer les rendez-vous en attente (status PENDING et sans patient)
    const pendingAppointments = await db.appointment.findMany({
      where: {
        status: "PENDING",
        patientId: null,
      },
    });
    return NextResponse.json(pendingAppointments, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Erreur lors de la récupération des rendez-vous" }, { status: 500 });
  }
}