// app/api/appointments/available/route.ts
import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const doctorId = searchParams.get('doctorId');
    const specialty = searchParams.get('specialty');

    const whereClause: any = {
      status: 'PENDING',
      startTime: { gt: new Date() }
    };

    if (doctorId) whereClause.doctorId = doctorId;
    if (specialty) whereClause.doctor = { doctorSpeciality: specialty };

    const appointments = await db.appointment.findMany({
      where: whereClause,
      include: {
        doctor: {
          select: {
            id: true,
            name: true,
            lastname: true,
            doctorSpeciality: true
          }
        }
      },
      orderBy: { startTime: 'asc' }
    });

    return NextResponse.json(appointments);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Erreur lors de la récupération des rendez-vous" },
      { status: 500 }
    );
  }
}