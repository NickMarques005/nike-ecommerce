import { FIREBASE_AUTH } from "@/config/firebase/firebaseConfig";
import { SSOCredentials } from "@/types/auth/SSOTypes";
import {
    GoogleAuthProvider,
    signInWithEmailAndPassword,
    signOut,
    UserCredential,
    signInWithPopup
} from "firebase/auth";

export const firebaseAuthService = {
    /**
     * Faz login com email/senha e retorna o ID token
     */
    async loginWithEmailPassword(email: string, password: string): Promise<string> {
        const userCredential: UserCredential = await signInWithEmailAndPassword(FIREBASE_AUTH, email, password);
        return await userCredential.user.getIdToken();
    },

    /**
     * Faz login com o provedor da Google através de Popup
     */
    async loginWithGooglePopup(): Promise<{
        idToken: string;
        credentials: SSOCredentials;
    }> {
        const provider = new GoogleAuthProvider();
        provider.setCustomParameters({ prompt: "select_account" });

        const result = await signInWithPopup(FIREBASE_AUTH, provider);
        const user = result.user;
        const idToken = await user.getIdToken();

        return {
            idToken,
            credentials: {
                email: user.email!,
                name: user.displayName ?? "Usuário",
                avatar: user.photoURL ?? "",
                uid: user.uid
            }
        };
    },

    /**
     * Logout do Firebase Auth
     */
    async logoutFromFirebase(): Promise<void> {
        await signOut(FIREBASE_AUTH);
    }
};