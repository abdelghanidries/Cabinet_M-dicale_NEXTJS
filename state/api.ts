// services/appointmentApi.js
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Interface CompteData - vous pouvez l'ajuster selon les besoins réels
export interface CompteData {
  id : string;
  name: string;
  lastname: string;
  role: string;
  code: string;
}

export interface Users {
  code  : string;
  roleType: string;
  name: string;
  lastname: string;
  
}



  


 

export const appointmentApi = createApi({
  reducerPath: 'appointmentApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api/auth',
    prepareHeaders: (headers) => {
      headers.set('Content-Type', 'application/json');
      return headers;
    },
   }),
  tagTypes: ['Appointment'],
  endpoints: (builder) => ({
    // Endpoint pour créer un rendez-vous par le médecin
    createAppointment: builder.mutation({
      query: ({
        doctorId,
        date,
        startTime,
        endTime,
        reason,
        type,
        doctorFirstName,
        doctorLastName,
        doctorSpeciality,
        status,
      }) => ({
        url: '/appointments',
        method: 'POST',
        body: {
          doctorId,
          date,
          startTime,
          endTime,
          reason,
          type,
          doctorFirstName,
          doctorLastName,
          doctorSpeciality,
          status,
        },
      }),
    
      invalidatesTags: ['Appointment'],
    }),
    // Endpoint pour réserver un rendez-vous par le patient
    bookAppointment: builder.mutation({
      query: ({ appointmentId, patientId }) => ({
        url: `/appointments/${appointmentId}`, // On suppose que l'API PATCH se trouve sur /api/appointments/[id]
        method: 'PATCH',
        body: { patientId },
      }),
      invalidatesTags: ['Appointment'],
    }),
    // Vous pouvez ajouter d'autres endpoints pour récupérer ou supprimer des rendez-vous par exemple
    getAppointments: builder.query({
      query: () => '/appointments',
      providesTags: ['Appointment'],
    }),

    // Endpoint pour récupérer les rendez-vous disponibles (en attente)
    getAvailableAppointments: builder.query({
      query: ({ specialty, doctorId }) => ({
        url: '/appointments/available',
        params: { 
          specialty, 
          doctorId: doctorId || undefined 
        }
      }),
      providesTags: ['Appointment'],
    }),
  
    fetchCompteData: builder.query<CompteData , void>({
      query: () => ({
        url: "api/auth",
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`, // Ajouter le token ici
        },
      }),
    }),


     // Endpoint pour récupérer les utilsateurs 
     getUsers: builder.query({
      query: () => '/usersManagement',
      providesTags: ['Appointment'],
    }),

    getDoctors: builder.query({
      query: () => '/doctor', // Changement du chemin d'accès
  providesTags: ['Appointment'],
    }),
   
   
  }),

  // Endpoint pour récupérer les données du compte
 
});

// Exportation des hooks pour utilisation dans vos composants
export const {
  useCreateAppointmentMutation,
  useBookAppointmentMutation,
  useGetAppointmentsQuery,
  useGetAvailableAppointmentsQuery,
  useFetchCompteDataQuery,
  useGetUsersQuery,
  useGetDoctorsQuery,

} = appointmentApi;
