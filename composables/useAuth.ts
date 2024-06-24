import { useAuthenticator } from "@aws-amplify/ui-vue"
export const useAuth = () => {

    const auth = useAuthenticator()

    const isLoggedIn = computed(() => auth.authStatus === 'authenticated')

    async function logout() {
        await auth?.signOut()
        await navigateTo('/');
    }

    return {
        isLoggedIn,
        logout
    }
}