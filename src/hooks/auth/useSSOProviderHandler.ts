import { UseAuthService } from '../api/auth/useAuthService';
import { firebaseAuthService } from '@/api/firebase/firebaseAuthServices';
import { Request_SingleSignOnArgs } from '@/types/api/services/AuthServiceTypes';
import { useRequestToast } from '../toast/useRequestToast';
import { useMainNavigation } from '../navigation/main/useMainNavigation';
import { useLoading } from '../loading/useLoading';

export const useSSOProviderHandler = () => {
    const ssoProviderLoading = useLoading();
    const { performSingleSignOn } = UseAuthService(ssoProviderLoading.setLoading);
    const { success, error } = useRequestToast();
    const { goToRoot } = useMainNavigation();

    const handleGoogleLoginPopup = async () => {
        try {
            ssoProviderLoading.setLoading(true);

            const result = await firebaseAuthService.loginWithGooglePopup();

            const payload: Request_SingleSignOnArgs = {
                idToken: result.idToken,
                credentials: result.credentials,
            };

            const response = await performSingleSignOn(payload, false);

            if (response.success) {
                success("Usuário autenticado com sucesso!");
                goToRoot();
            } else {
                error(response.error || "Erro ao validar autenticação SSO");
                await firebaseAuthService.logoutFromFirebase();
                console.error("Erro ao validar SSO:", response.error);
            }
        } catch (err) {
            error("Erro ao processar login com Google");
            console.error("Erro ao processar login com Google:", err);
            await firebaseAuthService.logoutFromFirebase();
        } finally {
            ssoProviderLoading.setLoading(false);
        }
    };

    return {
        handleGoogleLoginPopup,
        ssoProviderLoading
    };
};