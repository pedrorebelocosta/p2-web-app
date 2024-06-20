import { Appointment } from "@/types/system.types"
import { Modal, ModalProps } from "../Modal/Modal"
import { useCallback } from "react"
import { createPortal } from "react-dom";

const ScheduleAppointment = ({ open, onConfirm, onCancel }: ModalProps<Appointment>) => {
    const onSaveAppointment = useCallback(() => {
        // todo format data and pass to paren
        onConfirm({} as Appointment);
    }, [onConfirm]);
    return <Modal open={open} customClass={'overflow-visible'} onConfirm={onSaveAppointment} onCancel={onCancel}></Modal>
}

export const ScheduleAppointmentModal = (props: ModalProps<Appointment>) => createPortal(<ScheduleAppointment {...props} />, document.body);