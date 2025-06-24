"use client";

import {
  useBookAppointmentMutation,
  useGetAvailableAppointmentsQuery,
  useGetDoctorsQuery
} from "@/state/api";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { useSession } from "next-auth/react";
import { format, parseISO } from "date-fns";
import { fr } from "date-fns/locale";
import React, { useState } from "react";

interface Appointment {
  id: string;
  startTime: string;
  endTime: string;
  reason: string;
  type: string;
}

interface Doctor {
  id: string;
  name: string;
  lastname: string;
  doctorSpeciality: string;
}

export default function BookAppointmentCalendar() {
  const { data: session } = useSession();
  const userId = session?.user.id;
  const [selectedSpecialty, setSelectedSpecialty] = useState("");
  const [selectedDoctor, setSelectedDoctor] = useState("");
  const [selectedDay, setSelectedDay] = useState<Date | null>(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const { data: doctors, isLoading: isLoadingDoctors } = useGetDoctorsQuery();
  const [bookAppointment, { isLoading, error: bookError }] = useBookAppointmentMutation();

  const {
    data: appointments,
    isLoading: isLoadingAppointments,
    error: getError,
    refetch: refetchAppointments,
  } = useGetAvailableAppointmentsQuery({
    specialty: selectedSpecialty,
    doctorId: selectedDoctor
  });

  const uniqueSpecialties = [...new Set(
    doctors?.map((doctor: Doctor) => doctor.doctorSpeciality).filter(Boolean) || []
  )];

  const filteredDoctors = selectedSpecialty 
    ? doctors?.filter((doctor: Doctor) => doctor.doctorSpeciality === selectedSpecialty)
    : doctors;

  const groupedAppointments = appointments?.reduce((acc: Record<string, Appointment[]>, appointment: Appointment) => {
    try {
      const date = format(parseISO(appointment.startTime), "yyyy-MM-dd");
      acc[date] = acc[date] || [];
      acc[date].push(appointment);
    } catch (e: unknown) {
      console.error("Error parsing date for appointment:", {
        error: e,
        startTime: appointment?.startTime,
      });
    }
    return acc;
  }, {});

  const handleReservation = async (appointmentId: string) => {
    try {
      await bookAppointment({ appointmentId, patientId: userId }).unwrap();
      await refetchAppointments();
      setSuccessMessage("Rendez-vous confirmé");
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (err: unknown) {
      const error = err as { data?: { message?: string } };
      setErrorMessage(error?.data?.message || "Erreur de réservation");
      setTimeout(() => setErrorMessage(""), 5000);
    }
  };

  const DoctorsList = () => {
    if (isLoadingDoctors) {
      return (
        <div className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <Skeleton key={i} className="h-20 w-full rounded-lg" />
          ))}
        </div>
      );
    }

    if (!filteredDoctors?.length) {
      return (
        <div className="text-center text-muted-foreground py-8">
          Aucun médecin trouvé
        </div>
      );
    }

    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-1">
        {filteredDoctors.map((doctor: Doctor) => (
          <Card 
            key={doctor.id}
            className={`cursor-pointer transition-all hover:border-primary ${
              selectedDoctor === doctor.id ? 'border-2 border-primary' : ''
            }`}
          >
            <CardContent className="p-4 flex items-center justify-between">
              <div className="flex-1">
                <h3 className="font-semibold">Dr. {doctor.lastname} {doctor.name}</h3>
                <div className="flex gap-2 mt-2">
                  <Badge variant="outline" className="text-sm">
                    {doctor.doctorSpeciality}
                  </Badge>
                </div>
              </div>
              <Button 
                variant="outline"
                onClick={() => {
                  setSelectedDoctor(doctor.id);
                  setSelectedSpecialty(doctor.doctorSpeciality);
                  setSelectedDay(null);
                }}
              >
                Voir les créneaux
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  };

  const DayContent = ({ date }: { date: Date }) => {
    const dateKey = format(date, "yyyy-MM-dd");
    const hasAppointments = groupedAppointments?.[dateKey];
    const isToday = format(new Date(), "yyyy-MM-dd") === dateKey;
    const isSelected = selectedDay && format(selectedDay, "yyyy-MM-dd") === dateKey;

    return (
      <div className={`
        relative h-10 w-10 flex items-center justify-center
        ${isSelected ? "bg-primary text-white rounded-full" : ""}
        ${isToday && !isSelected ? "border-2 border-primary" : ""}
      `}>
        <span className="z-10 font-medium">{date.getDate()}</span>
        {hasAppointments && !isSelected && (
          <div className="absolute bottom-1 right-1 w-2 h-2 bg-green-500 rounded-full" />
        )}
      </div>
    );
  };

  return (
    <div className="h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      <div className="flex-1 overflow-hidden">
        {/* Le reste de la structure HTML reste inchangé */}
      </div>

      <div className="fixed bottom-6 left-6 space-y-2">
        {successMessage && (
          <div className="bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg flex items-center">
            <span className="mr-2">✓</span>
            {successMessage}
          </div>
        )}
        {(errorMessage || bookError) && (
          <div className="bg-red-500 text-white px-4 py-2 rounded-lg shadow-lg flex items-center">
            <span className="mr-2">✕</span>
            {errorMessage || (bookError as { data?: { message?: string } })?.data?.message}
          </div>
        )}
        {getError && (
          <div className="bg-yellow-500 text-white px-4 py-2 rounded-lg shadow-lg flex items-center">
            <span className="mr-2">⚠</span>
            Erreur de chargement des données
          </div>
        )}
      </div>
    </div>
  );
}
