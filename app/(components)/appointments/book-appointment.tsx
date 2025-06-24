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
  const [bookAppointment, { isLoading: isBooking, error: bookError }] = useBookAppointmentMutation();

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
        <div className="grid grid-cols-1 lg:grid-cols-[400px_1fr] h-full gap-8 p-8">
          {/* Liste des médecins */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-100 dark:border-gray-700 overflow-y-auto">
            <h2 className="text-xl font-semibold mb-6 text-gray-800 dark:text-gray-200">
              Liste des médecins
            </h2>
            <div className="space-y-4 mb-6">
              <select
                value={selectedSpecialty}
                onChange={(e) => {
                  setSelectedSpecialty(e.target.value);
                  setSelectedDoctor("");
                }}
                className="w-full p-2 border rounded-md bg-white dark:bg-gray-800"
              >
                <option value="">Toutes les spécialités</option>
                {uniqueSpecialties.map((specialty) => (
                  <option key={specialty} value={specialty}>
                    {specialty}
                  </option>
                ))}
              </select>
            </div>
            {isLoadingDoctors ? (
              <div className="space-y-4">
                {[...Array(3)].map((_, i) => (
                  <Skeleton key={i} className="h-20 w-full rounded-lg" />
                ))}
              </div>
            ) : (
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-1">
                {filteredDoctors?.map((doctor: Doctor) => (
                  <Card
                    key={doctor.id}
                    className={`cursor-pointer transition-all hover:border-primary ${
                      selectedDoctor === doctor.id ? "border-2 border-primary" : ""
                    }`}
                  >
                    <CardContent className="p-4 flex items-center justify-between">
                      <div className="flex-1">
                        <h3 className="font-semibold">
                          Dr. {doctor.lastname} {doctor.name}
                        </h3>
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
            )}
          </div>

          {/* Calendrier et rendez-vous */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden flex flex-col border border-gray-100 dark:border-gray-700">
            {selectedDoctor ? (
              <>
                <div className="p-6 border-b border-gray-100 dark:border-gray-700">
                  <div className="flex justify-between items-center">
                    <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
                      Disponibilités du Dr. {doctors?.find(d => d.id === selectedDoctor)?.lastname}
                    </h2>
                    <Button variant="ghost" onClick={() => {
                      setSelectedDoctor("");
                      setSelectedDay(null);
                    }}>
                      ← Changer
                    </Button>
                  </div>
                </div>

                <div className="flex-1 overflow-y-auto">
                  <div className="p-6">
                    <Calendar
                      mode="single"
                      selected={selectedDay}
                      onSelect={setSelectedDay}
                      locale={fr}
                      components={{ DayContent }}
                      classNames={{
                        month: "w-full",
                        head_cell: "text-gray-500 dark:text-gray-400 text-sm font-medium",
                        day_today: "bg-transparent",
                        button: "hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full",
                        cell: "h-12",
                        nav_button: "size-7 bg-transparent hover:bg-gray-100 dark:hover:bg-gray-700"
                      }}
                    />
                  </div>

                  <div className="p-6 border-t border-gray-100 dark:border-gray-700">
                    <h3 className="text-lg font-semibold mb-4">
                      {selectedDay
                        ? format(selectedDay, "EEEE d MMMM yyyy", { locale: fr })
                        : "Sélectionnez une date"}
                    </h3>

                    {isLoadingAppointments ? (
                      <div className="space-y-4">
                        {[...Array(3)].map((_, i) => (
                          <Skeleton key={i} className="h-20 w-full rounded-lg" />
                        ))}
                      </div>
                    ) : selectedDay &&
                      groupedAppointments?.[format(selectedDay, "yyyy-MM-dd")]?.length > 0 ? (
                      <div className="grid gap-4">
                        {groupedAppointments[format(selectedDay, "yyyy-MM-dd")].map((appointment) => (
                          <Card key={appointment.id} className="hover:shadow-md transition-shadow">
                            <CardContent className="p-4 flex items-center justify-between">
                              <div>
                                <p className="font-medium">
                                  {format(parseISO(appointment.startTime), "HH'h'mm")} - {format(parseISO(appointment.endTime), "HH'h'mm")}
                                </p>
                                <p className="text-sm text-muted-foreground">
                                  {appointment.reason}
                                </p>
                                <p className="text-sm text-muted-foreground">
                                  Type : {appointment.type}
                                </p>
                              </div>
                              <Button
                                onClick={() => handleReservation(appointment.id)}
                                disabled={isBooking}
                              >
                                {isBooking ? "..." : "Réserver"}
                              </Button>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center text-muted-foreground py-8">
                        Aucune disponibilité pour cette date
                      </div>
                    )}
                  </div>
                </div>
              </>
            ) : (
              <div className="h-full flex items-center justify-center text-muted-foreground p-8">
                <p className="text-center">
                  {isLoadingDoctors ? "Chargement..." : "Sélectionnez un médecin"}
                </p>
              </div>
            )}
          </div>
        </div>
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
