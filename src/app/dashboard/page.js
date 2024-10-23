"use client"; // Ensures the code runs only on the client-side

import { useEffect, useState } from 'react';
import axios from 'axios';
import * as jwt_decode from 'jwt-decode';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // For notifications
import styles from './Dashboard.module.css'; // Import CSS module

export default function Dashboard() {
  const [user, setUser] = useState({
    "name": "John Doe",
  "email": "john@example.com",
  "password": "123456",
  "role": "patient"
  }); // Store user info
  const [appointments, setAppointments] = useState([
    { id: 1, doctor: 'Dr. Smith', date: '2024-10-25' },
    { id: 2, doctor: 'Dr. Johnson', date: '2024-10-30' },
  ]); // Appointments data
  const [profile, setProfile] = useState({
    name: 'John Doe',
    allergies: 'Peanuts',
    medications: 'Aspirin',
    healthTip: 'Exercise daily!',
  }); // Profile info
  const [loading, setLoading] = useState(false); // Loading state

//   useEffect(() => {
//     if (typeof window !== 'undefined') {
//       const token = localStorage.getItem('token'); // Retrieve JWT token from localStorage
//       if (token) {
//         // let decoded = jwt_decode(token);
//         // setUser(decoded); // Store decoded user info

//         // Fetch dashboard data
//         axios
//           .get('http://localhost:5000/api/patient/patient', {
//             headers: { Authorization: token },
//           })
//           .then((res) => {
//             setAppointments(res.data.appointments);
//             setProfile(res.data.profile);
//             setLoading(false);
//           })
//           .catch(() => toast.error('Failed to load dashboard data'));
//       } else {
//         toast.error('Please log in to access the dashboard');
//       }
//     }
//   }, []);

  if (loading) return <p className={styles.loading}>Loading dashboard...</p>;

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Welcome to Your Dashboard</h1>
      <h2 className={styles.subheading}>Hello, {profile?.name}</h2>

      <section className={styles.section}>
        <h3 className={styles.sectionTitle}>Health Tip of the Day</h3>
        <p className={styles.tip}>{profile?.healthTip || 'Stay hydrated and exercise daily!'}</p>
      </section>

      {user?.role === 'patient' && (
        <>
          <section className={styles.section}>
            <h3 className={styles.sectionTitle}>Upcoming Appointments</h3>
            {appointments.length > 0 ? (
              <ul className={styles.list}>
                {appointments.map((appt) => (
                  <li key={appt.id} className={styles.listItem}>
                    {`Appointment with Dr. ${appt.doctor} on ${appt.date}`}
                  </li>
                ))}
              </ul>
            ) : (
              <p className={styles.noData}>No upcoming appointments</p>
            )}
          </section>

          <section className={styles.section}>
            <h3 className={styles.sectionTitle}>Your Profile</h3>
            <p><strong>Allergies:</strong> {profile?.allergies || 'None'}</p>
            <p><strong>Medications:</strong> {profile?.medications || 'None'}</p>
            <button
              className={styles.editButton}
              onClick={() => toast.info('Edit Profile feature coming soon!')}
            >
              Edit Profile
            </button>
          </section>
        </>
      )}

      {user?.role === 'provider' && (
        <section className={styles.section}>
          <h3 className={styles.sectionTitle}>Patients List</h3>
          <ul className={styles.list}>
            {profile?.patients.map((patient) => (
              <li key={patient.id} className={styles.listItem}>
                {`${patient.name} - ${patient.email}`}
              </li>
            ))}
          </ul>
        </section>
      )}

      <ToastContainer />
    </div>
  );
}
