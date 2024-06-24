import type { CookieRef } from 'nuxt/app';
import type {
    LibraryOptions,
    FetchAuthSessionOptions
} from '@aws-amplify/core';
import {
    createKeyValueStorageFromCookieStorageAdapter,
    createUserPoolsTokenProvider,
    createAWSCredentialsAndIdentityIdProvider,
    runWithAmplifyServerContext
} from 'aws-amplify/adapter-core';
import { parseAmplifyConfig } from 'aws-amplify/utils';
import {
    fetchAuthSession,
    fetchUserAttributes,
    getCurrentUser
} from 'aws-amplify/auth/server';
import outputs from '../amplify_outputs.json';

const amplifyConfig = parseAmplifyConfig(outputs);
const userPoolClientId = amplifyConfig.Auth!.Cognito.userPoolClientId;
const lastAuthUserCookieName = `CognitoIdentityServiceProvider.${userPoolClientId}.LastAuthUser`;

const getAmplifyAuthKeys = (lastAuthUser: string) =>
    ['idToken', 'accessToken', 'refreshToken', 'clockDrift']
        .map(
            (key) =>
                `CognitoIdentityServiceProvider.${userPoolClientId}.${lastAuthUser}.${key}`
        )
        .concat(lastAuthUserCookieName);

export default defineNuxtPlugin({
    name: 'AmplifyAPIs',
    enforce: 'pre',
    setup() {

        const expires = new Date();
        expires.setDate(expires.getDate() + 30);

        const lastAuthUserCookie = useCookie(lastAuthUserCookieName, {
            sameSite: 'lax',
            expires,
            secure: true
        });

        // Get all Amplify auth token cookie names
        const authKeys = lastAuthUserCookie.value
            ? getAmplifyAuthKeys(lastAuthUserCookie.value)
            : [];


        const amplifyCookies = authKeys
            .map((name) => ({
                name,
                cookieRef: useCookie(name, { sameSite: 'lax', expires, secure: true })
            }))
            .reduce<Record<string, CookieRef<string | null | undefined>>>(
                (result, current) => ({
                    ...result,
                    [current.name]: current.cookieRef
                }),
                {}
            );


        const keyValueStorage = createKeyValueStorageFromCookieStorageAdapter({
            get(name) {
                const cookieRef = amplifyCookies[name];

                if (cookieRef && cookieRef.value) {
                    return { name, value: cookieRef.value };
                }

                return undefined;
            },
            getAll() {
                return Object.entries(amplifyCookies).map(([name, cookieRef]) => {
                    return { name, value: cookieRef.value ?? undefined };
                });
            },
            set(name, value) {
                const cookieRef = amplifyCookies[name];
                if (cookieRef) {
                    cookieRef.value = value;
                }
            },
            delete(name) {
                const cookieRef = amplifyCookies[name];

                if (cookieRef) {
                    cookieRef.value = null;
                }
            }
        });

        const tokenProvider = createUserPoolsTokenProvider(
            amplifyConfig.Auth!,
            keyValueStorage
        );

        const credentialsProvider = createAWSCredentialsAndIdentityIdProvider(
            amplifyConfig.Auth!,
            keyValueStorage
        );

        const libraryOptions: LibraryOptions = {
            Auth: {
                tokenProvider,
                credentialsProvider
            }
        };

        return {
            provide: {
                Amplify: {
                    Auth: {
                        fetchAuthSession: (options: FetchAuthSessionOptions) =>
                            runWithAmplifyServerContext(
                                amplifyConfig,
                                libraryOptions,
                                (contextSpec) => fetchAuthSession(contextSpec, options)
                            ),
                        fetchUserAttributes: () =>
                            runWithAmplifyServerContext(
                                amplifyConfig,
                                libraryOptions,
                                (contextSpec) => fetchUserAttributes(contextSpec)
                            ),
                        getCurrentUser: () =>
                            runWithAmplifyServerContext(
                                amplifyConfig,
                                libraryOptions,
                                (contextSpec) => getCurrentUser(contextSpec)
                            )
                    }
                }
            }
        };
    }
});