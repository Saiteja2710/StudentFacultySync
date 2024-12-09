# College Appointment System Backend

## Overview
This project implements a backend system for a **College Appointment System**. The system allows:
- Professors to specify their availability and manage bookings.
- Students to authenticate, view available slots, and book appointments.
- End-to-end (E2E) automated tests to validate key functionalities.

---

## Features
- **Student Authentication**: Secure login to access the system.
- **Professor Authentication**: Secure login to specify availability and manage appointments.
- **Availability Management**: Professors can define available time slots.
- **Slot Booking**: Students can view available slots and book appointments.
- **Appointment Management**: Professors can cancel appointments.
- **E2E Automated Test**: Validates the full user flow.

---

## User Flow
1. **Student A1** authenticates to access the system.
2. **Professor P1** authenticates to access the system.
3. **Professor P1** specifies available time slots.
4. **Student A1** views available time slots for **Professor P1**.
5. **Student A1** books an appointment with **Professor P1** for time **T1**.
6. **Student A2** authenticates to access the system.
7. **Student A2** books an appointment with **Professor P1** for time **T2**.
8. **Professor P1** cancels the appointment with **Student A1**.
9. **Student A1** checks their appointments and finds no pending appointments.

---

## API Endpoints

### **Authentication**
- `POST /api/auth/login`  
  Authenticate users (students or professors).

### **Professor Availability**
- `POST /api/professors/availability`  
  Specify available time slots for professors.  
- `GET /api/professors/:id/availability`  
  View available slots for a specific professor.

### **Appointments**
- `POST /api/appointments/book`  
  Book an appointment for a specific time slot.  
- `DELETE /api/appointments/:id`  
  Cancel an appointment.  
- `GET /api/appointments`  
  View a list of user-specific appointments.

---

## Database Schema
- **Users Collection**:
  - `_id`: Unique identifier.
  - `name`: Name of the user.
  - `email`: Email address.
  - `password`: Hashed password.
  - `role`: `student` or `professor`.

- **Availability Collection**:
  - `_id`: Unique identifier.
  - `professor_id`: Reference to the professor.
  - `slots`: Array of available time slots (date and time).

- **Appointments Collection**:
  - `_id`: Unique identifier.
  - `student_id`: Reference to the student.
  - `professor_id`: Reference to the professor.
  - `date`: Date of the appointment.
  - `time`: Time of the appointment.
  - `status`: `booked` or `canceled`.

---

## Technologies Used
- **Backend Framework**: Express.js
- **Database**: MongoDB
- **Testing Framework**: Jest and Supertest for E2E testing
- **Authentication**: JSON Web Tokens (JWT)

---

## Setup Instructions
1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/college-appointment-system.git
   cd college-appointment-system
