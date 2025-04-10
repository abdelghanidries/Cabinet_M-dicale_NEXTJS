// pages/patient/book-appointment.js
import { useState, useEffect } from "react";
import {
  useBookAppointmentMutation,
  useGetAvailableAppointmentsQuery,
} from "@/state/api";

// Importations des composants UI inspirés de shadcn-ui
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";  
import { useSession } from "next-auth/react";


export default function BookAppointmentCalendar() {

  const { data: session } = useSession();
  
    const userId = session?.user.id;
    const userRole = session?.user.role;
  // Récupérer les rendez-vous en attente via RTK Query
  const {
    data: appointments,
    isLoading: isLoadingAppointments,
    error: getError,
  } = useGetAvailableAppointmentsQuery(undefined);

  const [patientId, setPatientId] = useState("");

  useEffect(() => {
    if (userId) {
      setPatientId(userId);
    }
  }, [userId]);
  
   
  const [bookAppointment, { isLoading, error: bookError, data }] =
    useBookAppointmentMutation();

  // État pour le mois courant affiché (Date représentant le 1er du mois)
  const [currentMonth, setCurrentMonth] = useState(() => {
    const today = new Date();
    return new Date(today.getFullYear(), today.getMonth(), 1);
  });
  // État pour le jour sélectionné (format "YYYY-MM-DD")
  const [selectedDay, setSelectedDay] = useState(null);

  // Calculer les jours à afficher dans le calendrier (incluant décalage pour le premier jour de la semaine)
  const [calendarDays, setCalendarDays] = useState([]);
  useEffect(() => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    // Nombre de jours dans le mois
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    // Jour de la semaine du premier jour du mois (0 = dimanche, 6 = samedi)
    const startDay = currentMonth.getDay();
    // Remplir avec des cases vides pour l'alignement
    const daysArray = [];
    for (let i = 0; i < startDay; i++) {
      daysArray.push(null);
    }
    // Ajouter les jours du mois
    for (let i = 1; i <= daysInMonth; i++) {
      daysArray.push(new Date(year, month, i));
    }
    setCalendarDays(daysArray);
    // Réinitialiser le jour sélectionné si le mois change
    setSelectedDay(null);
  }, [currentMonth]);

  // Navigation entre les mois
  const handlePrevMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1)
    );
  };
  const handleNextMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1)
    );
  };

  // Grouper les rendez-vous par date au format "YYYY-MM-DD"
  const groupedAppointments = appointments?.reduce((groups, appointment) => {
    const dateKey = new Date(appointment.date).toISOString().split("T")[0];
    if (!groups[dateKey]) groups[dateKey] = [];
    groups[dateKey].push(appointment);
    return groups;
  }, {});

  // Réservation d'un rendez-vous
  const handleReservation = async (appointmentId) => {
    try {
      await bookAppointment({ appointmentId, patientId }).unwrap();
      alert("Rendez-vous réservé !");
    } catch (err) {
      console.error("Erreur lors de la réservation du rendez-vous", err);
    }
  };

  // Sélection d'un jour
  const handleSelectDay = (date) => {
    const dateKey = date.toISOString().split("T")[0];
    setSelectedDay(dateKey);
  };

  // Tableau des noms des jours de la semaine
  const weekDays = ["Dim", "Lun", "Mar", "Mer", "Jeu", "Ven", "Sam"];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Réserver un rendez-vous</h1>

      

      {/* Saisie de l'identifiant du patient */}
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

      {/* En-tête du calendrier avec navigation */}
      <div className="flex items-center justify-between mb-4">
        <Button onClick={handlePrevMonth} variant="outline">
          Précédent
        </Button>
        <h2 className="text-xl font-semibold">
          {currentMonth.toLocaleString("fr-FR", {
            month: "long",
            year: "numeric",
          })}
        </h2>
        <Button onClick={handleNextMonth} variant="outline">
          Suivant
        </Button>
      </div>

      {/* Affichage des jours de la semaine */}
      <div className="grid grid-cols-7 gap-2 mb-2 text-center font-bold">
        {weekDays.map((day, index) => (
          <div key={index}>{day}</div>
        ))}
      </div>

      {/* Affichage du calendrier */}
      <div className="grid grid-cols-7 gap-2 mb-6">
        {calendarDays.map((date, index) => {
          if (!date) {
            return <div key={index} className="h-10"></div>;
          }
          const dateKey = date.toISOString().split("T")[0];
          // Si des rendez-vous sont disponibles pour ce jour, on peut mettre en évidence
          const hasAppointments =
            groupedAppointments && groupedAppointments[dateKey];
          return (
            <Button
              key={index}
              variant={selectedDay === dateKey ? "default" : "outline"}
              onClick={() => handleSelectDay(date)}
              className={`h-10 ${
                hasAppointments ? "border-green-500" : ""
              }`}
            >
              {date.getDate()}
            </Button>
          );
        })}
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
