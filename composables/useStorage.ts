
export const useStorage = () => {
    const storage = useNuxtApp().$Amplify?.Storage;

    async function getS3Url(path: string, expiresInSeconds: number = 240) {
        const result = await storage?.getUrl({
            path,
            options: {
                validateObjectExistence: false,
                expiresIn: expiresInSeconds,
            }
        });

        return result.url;
    }
    return {
        getUrl: getS3Url
    };
};