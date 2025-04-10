// pages/patient/book-appointment.js
"use client"

import { useState, useEffect } from "react";
import {
  useBookAppointmentMutation,
  useGetAvailableAppointmentsQuery,
} from "@/state/api";

import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";  
import { useSession } from "next-auth/react";
import { Calendar } from "@/components/ui/calendar";

export default function BookAppointmentCalendar() {
  const { data: session } = useSession();
  const userId = session?.user.id;

  const {
    data: appointments,
    isLoading: isLoadingAppointments,
    error: getError,
  } = useGetAvailableAppointmentsQuery(undefined);

  const [patientId, setPatientId] = useState("");
  const [selectedDay, setSelectedDay] = useState(null);

  const [bookAppointment, { isLoading, error: bookError, data }] =
    useBookAppointmentMutation();

  useEffect(() => {
    if (userId) setPatientId(userId);
  }, [userId]);

  const groupedAppointments = appointments?.reduce((groups, appointment) => {
    const dateKey = new Date(appointment.date).toISOString().split("T")[0];
    if (!groups[dateKey]) groups[dateKey] = [];
    groups[dateKey].push(appointment);
    return groups;
  }, {});

  const handleReservation = async (appointmentId) => {
    try {
      await bookAppointment({ appointmentId, patientId }).unwrap();
      alert("Rendez-vous réservé !");
    } catch (err) {
      console.error("Erreur lors de la réservation", err);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Réserver un rendez-vous</h1>

      <div className="mb-6">
        <p>ID : {userId}</p>
        <label className="block text-sm font-medium mb-1">
          Identifiant du patient :
        </label>
        <input
          type="text"
          value={patientId}
          disabled
          className="w-full border border-gray-300 rounded-md p-2 bg-gray-100 text-gray-500"
        />
      </div>

      <hr className="mb-6" />

      {/* Calendrier basé sur shadcn-ui */}
      <div className="mb-6">
      <Calendar
  mode="single"
  selected={selectedDay ? new Date(selectedDay) : undefined}
  onSelect={(date) => {
    if (date) {
      const dateKey = date.toISOString().split("T")[0];
      setSelectedDay(dateKey);
    }
  }}
  className="rounded-md border shadow"
  dayRender={(date) => {
    const dateKey = date.toISOString().split("T")[0];
    const hasAppointments = groupedAppointments?.[dateKey];

    return (
      <div className="relative flex items-center justify-center">
        <span>{date.getDate()}</span>
        {hasAppointments && (
          <span className="absolute bottom-1 w-1.5 h-1.5 rounded-full bg-green-500" />
        )}
      </div>
    );
  }}
/>

      </div>

      {/* Affichage des rendez-vous pour le jour sélectionné */}
      {selectedDay && (
        <div>
          <h3 className="text-lg font-bold mb-4">
            Rendez-vous du {new Date(selectedDay).toLocaleDateString("fr-FR")}
          </h3>
          {groupedAppointments && groupedAppointments[selectedDay] ? (
            <Card className="p-4 shadow-sm border">
              <CardHeader>
                <h4 className="text-md font-semibold">
                  {groupedAppointments[selectedDay].length} rendez-vous disponibles
                </h4>
              </CardHeader>
              <CardContent>
                {groupedAppointments[selectedDay].map((appointment) => (
                  <div
                    key={appointment.id}
                    className="mb-4 border-b pb-2 last:border-0 last:pb-0"
                  >
                    <p className="text-sm">
                      <strong>Heure :</strong>{" "}
                      {new Date(appointment.date).toLocaleTimeString("fr-FR")}
                    </p>
                    <p className="text-sm">
                      <strong>Raison :</strong> {appointment.reason}
                    </p>
                    <Button
                      onClick={() => handleReservation(appointment.id)}
                      disabled={isLoading}
                      className="mt-2"
                      size="sm"
                    >
                      {isLoading ? "Réservation..." : "Réserver"}
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>
          ) : (
            <p>Aucun rendez-vous disponible pour cette date.</p>
          )}
        </div>
      )}

      {isLoadingAppointments && <p>Chargement des rendez-vous...</p>}
      {getError && <p>Erreur lors de la récupération des rendez-vous</p>}
      {bookError && (
        <p className="text-red-500 mt-4">
          Erreur: {bookError.error || "Erreur lors de la réservation"}
        </p>
      )}
      {data && (
        <pre className="mt-4 p-4 bg-gray-100 rounded-md">
          {JSON.stringify(data, null, 2)}
        </pre>
      )}
    </div>
  );
}
