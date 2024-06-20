export type CreateAppointmentData = {
    type: string;
    schedule_date: string;
    schedule_time: string;
    notes: string;
}

export type Appointment = {
    created_at: string;
    schedule_date: string;
    schedule_time: string;
    notes: string;
    type: string;
    state: string;
}