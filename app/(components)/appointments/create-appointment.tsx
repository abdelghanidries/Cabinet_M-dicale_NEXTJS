// pages/doctor/create-appointment.js
import { useEffect, useState } from 'react';
import { useCreateAppointmentMutation } from '@/state/api';
import { useSession } from "next-auth/react";

import { CheckCircle } from "lucide-react"

import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert"

export default function CreateAppointment() {
   const { data: session } = useSession();
    const userId = session?.user.id;
  const [doctorId, setDoctorId] = useState('');
  const [date, setDate] = useState('');
  const [reason, setReason] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    if (showSuccess) {
      const timer = setTimeout(() => setShowSuccess(false), 3000); // 3s
      return () => clearTimeout(timer);
    }
  }, [showSuccess]);

  const [createAppointment, { isLoading, error, data }] = useCreateAppointmentMutation();

  useEffect(() => {
      if (userId) setDoctorId(userId);
    }, [userId]);
  

    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        await createAppointment({ doctorId, date, reason }).unwrap();
        setShowSuccess(true); // ✅ afficher l'alerte
        // Optionnel : vider les champs
        setDate('');
        setReason('');
      } catch (err) {
        console.error('Erreur lors de la création du rendez-vous', err);
      }
    };

  return (
    <div>
      <h1>Créer un rendez-vous</h1>
      <form onSubmit={handleSubmit}>

      <div className="mb-6">
        <p>ID : {userId}</p>
        <label className="block text-sm font-medium mb-1">
          Identifiant du patient :
        </label>
        <input
          type="text"
          value={doctorId}
          disabled
          className="w-full border border-gray-300 rounded-md p-2 bg-gray-100 text-gray-500"
        />
      </div>

      
        <div>
          <label>Date (ISO format) :</label>
          <input
            type="datetime-local"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Raison :</label>
          <input
            type="text"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            required
          />
        </div>
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Création...' : 'Créer le rendez-vous'}
        </button>
      </form>
      {error && <p>Erreur: {error.error || 'Erreur lors de la création'}</p>}
      {data && <pre>{JSON.stringify(data, null, 2)}</pre>}

      {/* ✅ Alerte de succès affichée ici */}
      {showSuccess && (
  <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none">
    <Alert
      variant="default"
      className="pointer-events-auto bg-white shadow-lg border border-green-500 max-w-md w-full mx-auto rounded-lg p-4 flex gap-4"
    >
      <CheckCircle className="h-5 w-5 text-green-600 mt-1" />
      <div>
        <AlertTitle className="text-green-700">Succès</AlertTitle>
        <AlertDescription className="text-gray-700">
          Le rendez-vous a été créé avec succès.
        </AlertDescription>
      </div>
    </Alert>
  </div>
)}

    </div>
  );
}
