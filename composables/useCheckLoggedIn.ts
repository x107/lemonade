import { useAuthenticator } from "@aws-amplify/ui-vue"
export const useCheckLoggedIn = () => {

    const auth = useAuthenticator()

    const isLoggedIn = computed(() => auth.authStatus === 'authenticated');
    const isPending = computed(() => auth.authStatus === 'configuring');

    return {
        isLoggedIn,
        isPending
    }
}