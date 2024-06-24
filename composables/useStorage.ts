import { getUrl } from 'aws-amplify/storage';

export const useStorage = () => {
    async function getS3Url(path: string, expiresInSeconds: number = 240) {
        const result = await getUrl({
            path,
            options: {
                validateObjectExistence: false,
                expiresIn: expiresInSeconds,
                // useAccelerateEndpoint: true
            }
        });

        return result.url;
    }
    return {
        getUrl: getS3Url
    };
};