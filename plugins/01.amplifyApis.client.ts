import type { Schema } from '~/amplify/data/resource';
import { Amplify } from 'aws-amplify';
import {
    fetchAuthSession,
    fetchUserAttributes,
    signIn,
    signOut
} from 'aws-amplify/auth';
import { list } from 'aws-amplify/storage';
import { generateClient } from 'aws-amplify/api';
import outputs from '../amplify_outputs.json';

const client = generateClient<Schema>();

export default defineNuxtPlugin({
    name: 'AmplifyAPIs',
    enforce: 'pre',
    setup() {
        Amplify.configure(outputs, { ssr: true });

        return {
            provide: {
                Amplify: {
                    Auth: {
                        fetchAuthSession,
                        fetchUserAttributes,
                        signIn,
                        signOut
                    },
                    Storage: {
                        list
                    },
                    GraphQL: {
                        client
                    }
                }
            }
        };
    }
});