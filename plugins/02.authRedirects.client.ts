import { Amplify } from 'aws-amplify';
import outputs from '~/amplify_outputs.json';

if (import.meta?.client) {
    Amplify.configure(outputs, { ssr: true });
}

const unprotectedRoutes = ['/'];
const loginRoute = '/login';

export default defineNuxtPlugin({
    name: 'AmplifyAuthRedirect',
    enforce: 'pre',
    setup() {
        addRouteMiddleware(
            'AmplifyAuthMiddleware',
            defineNuxtRouteMiddleware(async (to, from) => {
                try {
                    // Skip check for unprotected routes
                    if (unprotectedRoutes.includes(to.path)) {
                        return true;
                    }

                    const session = await useNuxtApp().$Amplify.Auth.fetchAuthSession();

                    // Redirect to login if user is not logged in
                    if (session.tokens === undefined && to.path !== loginRoute) {
                        return navigateTo(loginRoute);
                    }

                    // Redirect to home if user is already logged in
                    if (session.tokens !== undefined && to.path === loginRoute) {
                        return navigateTo('/');
                    }
                } catch (e) {
                    if (to.path !== loginRoute) {
                        return navigateTo(loginRoute);
                    }
                }
            }),
            { global: true }
        );
    }
});