import { DropdownItem } from "@/types/util.types";

export const APPOINTMENT_TYPES: DropdownItem<string, string>[] = [
    {
        key: 'REPAIR_REQUEST',
        value: 'Repair Request'
    },
    {
        key: 'REPAIR_PICKUP',
        value: "Repair Pickup"
    },
    {
        key: 'CONTACT_REQUEST',
        value: "Contact Request"
    }
];
