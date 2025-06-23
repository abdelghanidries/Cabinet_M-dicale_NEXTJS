import { useEffect, useState } from 'react';
import { useCreateAppointmentMutation } from '@/state/api';
import { useSession } from "next-auth/react";
import { CheckCircle } from "lucide-react";
import {
  Alert,
  AlertDescription,
  AlertTitle
} from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle
} from "@/components/ui/dialog";
import {
  format,
  addMinutes,
  startOfDay,
  isToday
} from "date-fns";
import { fr } from "date-fns/locale";

export default function CreateAppointment() {
  const { data: session } = useSession();
  const [doctorId, setDoctorId] = useState('');
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [reason, setReason] = useState('');
  const [type, setType] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const [timeSlots, setTimeSlots] = useState([]);
  const [openTimeDialog, setOpenTimeDialog] = useState(false);

  const [createAppointment, { isLoading, error }] = useCreateAppointmentMutation();

  useEffect(() => {
    if (session?.user?.id) {
      setDoctorId(session.user.id);
    }
  }, [session]);

  useEffect(() => {
    if (showSuccess) {
      const timer = setTimeout(() => setShowSuccess(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [showSuccess]);

  useEffect(() => {
    if (selectedDate) {
      generateTimeSlots(selectedDate);
      setOpenTimeDialog(true);
    }
  }, [selectedDate]);

  const generateTimeSlots = (date) => {
    const slots = [];
    const start = startOfDay(date);

    for (let i = 8 * 6; i < 18 * 6; i++) {
      const time = addMinutes(start, i * 10);
      if (time > new Date() || !isToday(date)) {
        slots.push(time);
      }
    }

    setTimeSlots(slots);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedDate || !selectedTime || !reason || !type) return;

    const startTime = new Date(selectedDate);
    startTime.setHours(selectedTime.getHours(), selectedTime.getMinutes());
    const endTime = addMinutes(startTime, 10);

    try {
      await createAppointment({
        doctorId,
        date: startTime.toISOString(),
        startTime: startTime.toISOString(),
        endTime: endTime.toISOString(),
        reason,
        type,
        doctorFirstName: session.user.name,
        doctorLastName: session.user.lastname,
        doctorSpeciality: session.user.doctorSpeciality,
        status: 'PENDING'
      }).unwrap();

      setShowSuccess(true);
      setSelectedDate(null);
      setSelectedTime(null);
      setReason('');
      setType('');
    } catch (err) {
      console.error('Erreur lors de la création du rendez-vous', err);
    }
  };

  const disabledDays = (date) => {
    return date < new Date() || [0, 6].includes(date.getDay());
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-violet-100 to-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <Card className="p-8 sm:p-10 bg-white shadow-lg rounded-2xl border border-violet-200">
          <h1 className="text-3xl sm:text-4xl font-bold text-center text-violet-800 mb-8">
            📅 Prendre un rendez-vous
          </h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="doctor-id" className="block text-sm font-medium text-violet-900 mb-1">
                Identifiant médecin
              </label>
              <Input
                id="doctor-id"
                value={doctorId}
                disabled
                className="bg-gray-100 text-violet-800 cursor-not-allowed"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-violet-900 mb-2">Date de consultation *</label>
              <Dialog>
                <DialogTrigger asChild>
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full justify-between text-left"
                  >
                    {selectedDate
                      ? format(selectedDate, "EEEE d MMMM yyyy", { locale: fr })
                      : "Choisissez une date"}
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-md w-full rounded-xl border border-gray-200 bg-white">
                  <DialogTitle className="text-lg font-medium text-violet-800 mb-2">
                    Sélectionner une date
                  </DialogTitle>
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    disabled={disabledDays}
                    locale={fr}
                    className="border border-violet-200 rounded-md"
                  />
                </DialogContent>
              </Dialog>
            </div>

            <Dialog open={openTimeDialog} onOpenChange={setOpenTimeDialog}>
              <DialogContent className="max-w-md w-full rounded-xl shadow-xl border border-gray-200 bg-white">
                <DialogTitle className="text-xl font-semibold text-gray-800 mb-4">
                  Choisissez un créneau horaire
                </DialogTitle>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {timeSlots.map((slot, idx) => (
                    <Button
                      key={idx}
                      type="button"
                      variant={selectedTime?.getTime() === slot.getTime() ? "default" : "outline"}
                      className={`h-10 rounded-lg text-sm transition ${
                        selectedTime?.getTime() === slot.getTime()
                          ? "bg-violet-600 text-white"
                          : "bg-white text-violet-800 hover:bg-violet-50 border border-violet-200"
                      }`}
                      onClick={() => {
                        setSelectedTime(slot);
                        setOpenTimeDialog(false);
                      }}
                    >
                      {format(slot, "HH:mm")}
                    </Button>
                  ))}
                </div>
              </DialogContent>
            </Dialog>

            <div>
              <label className="block text-sm font-medium text-violet-900 mb-2">Type de consultation *</label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value)}
                required
                className="p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-violet-500 bg-white w-full"
              >
                <option value="">-- Choisissez --</option>
                <option value="Présentiel">Présentiel</option>
                <option value="Téléconsultation">Téléconsultation</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-violet-900 mb-2">Raison *</label>
              <Textarea
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                required
                placeholder="Décrivez la raison de la consultation..."
                className="p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-violet-500 w-full"
              />
            </div>

            <Button
              type="submit"
              disabled={isLoading || !selectedDate || !selectedTime || !type || !reason}
              className="w-full bg-violet-700 hover:bg-violet-800 text-white font-medium py-3 rounded-lg transition"
            >
              {isLoading ? "Création..." : "📆 Confirmer le rendez-vous"}
            </Button>

            {error && (
              <div className="bg-red-100 text-red-800 p-4 rounded-md border border-red-300 text-sm">
                Erreur : {error?.data?.error || error?.error || "Une erreur est survenue"}
              </div>
            )}
          </form>
        </Card>

        {showSuccess && (
          <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/20">
            <Alert className="bg-white border border-violet-300 shadow-xl p-6 rounded-md max-w-md">
              <div className="flex items-center gap-4">
                <CheckCircle className="text-violet-600 w-6 h-6" />
                <div>
                  <AlertTitle className="text-lg font-semibold text-violet-800">Rendez-vous confirmé !</AlertTitle>
                  <AlertDescription className="text-sm text-violet-700">
                    Le rendez-vous a été créé avec succès.
                  </AlertDescription>
                </div>
              </div>
            </Alert>
          </div>
        )}
      </div>
    </div>
  );
}
