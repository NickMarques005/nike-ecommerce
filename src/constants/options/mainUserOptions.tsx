import { ReactNode } from "react";
import { FaUser, FaCog, FaBox, FaSignOutAlt } from "react-icons/fa";

export type MainUserOptionKey = "profile" | "orders" | "settings" | "logout"

export interface MainUserOption {
    label: string;
    icon: ReactNode;
    key: MainUserOptionKey;
}

export const mainUserOptions: MainUserOption[] = [
    {
        label: "Ver Perfil",
        icon: <FaUser/>,
        key: "profile"
    },
    {
        label: "Pedidos",
        icon: <FaBox />,
        key: "orders"
    },
    {
        label: "Configurações",
        icon: <FaCog />,
        key:  "settings"
    },
    {
        label: "Sair",
        icon: <FaSignOutAlt />,
        key: "logout"
    },
];