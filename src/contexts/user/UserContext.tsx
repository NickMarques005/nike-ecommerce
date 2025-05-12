import { createContext, useContext, useEffect, useState } from "react";

import { useLoading } from "@/hooks/loading/useLoading";
import { LoadingStructure } from "@/types/loading/LoadingTypes";
import { UserData } from "@/types/user/UserTypes";
import { useAuth } from "../auth/AuthContext";
import { UseUserService } from "@/hooks/api/user/useUserServices";

interface UserContextType {
    userData: UserData | null;
    userDataLoadingState: LoadingStructure;
    fetchUserData: () => Promise<void>;
}

const UserContext = createContext<UserContextType>({} as UserContextType);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
    const { user } = useAuth();
    const [userData, setUserData] = useState<UserData | null>(null);
    const userDataLoadingState = useLoading();
    const { performGetUserData } = UseUserService(userDataLoadingState.setLoading)

    const fetchUserData = async () => {
        if (!user) {
            setUserData(null);
            return;
        }

        try {
            userDataLoadingState.setLoading(true);
            const token = await user.getIdToken();  // Token do usuário autenticado
            console.log("Autenticação feita com sucesso, buscar dados do usuário!");
            const response = await performGetUserData(token);
            if(response.success)
            {
                if(response.data)
                {
                    console.log("Dados buscados com sucesso: ", response.data);
                    setUserData(response.data);
                }
            }
            
        } catch (err) {
            console.error("Erro ao buscar dados do usuário:", err);
            setUserData(null);
        } finally {
            userDataLoadingState.setLoading(false);
        }
    };

    useEffect(() => {
        fetchUserData();
    }, [user]);

    return (
        <UserContext.Provider value={{ userData, userDataLoadingState, fetchUserData }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => useContext(UserContext);