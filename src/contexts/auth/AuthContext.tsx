import { createContext, useContext, useEffect, useState } from "react";
import { User, onAuthStateChanged, signOut as firebaseSignOut } from "firebase/auth";
import { FIREBASE_AUTH } from "@/config/firebase/firebaseConfig";
import { useLoading } from "@/hooks/loading/useLoading";
import { LoadingStructure } from "@/types/loading/LoadingTypes";
import { useRequestToast } from "@/hooks/toast/useRequestToast";

interface AuthContextType {
    user: User | null;
    authLoadingState: LoadingStructure;
    signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const { success, error } = useRequestToast();
    const [user, setUser] = useState<User | null>(null);
    const authLoadingState = useLoading(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(FIREBASE_AUTH, (firebaseUser) => {
            setUser(firebaseUser);
            authLoadingState.setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    const signOut = async () => {
        try {
            await firebaseSignOut(FIREBASE_AUTH);
            setUser(null);
            success("Usuário deslogado com sucesso!")
        }
        catch (err) {
            console.error("Houveu um erro ao deslogar da conta: ", err);
            error("Houve um erro ao tentar deslogar usuário. Tente novamente.");
        }
    };

    return (
        <AuthContext.Provider value={{ user, authLoadingState, signOut }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);