const getEnv = (key: string): string => {
    const value = process.env[key];
    if (!value) {
        throw new Error(`Missing environment variable: ${key}`);
    }
    return value;
}

export const jwtConstants = {
    accessTokenSecret: getEnv('ACCESS_TOKEN_SECRET'),
    refreshTokenSecret: getEnv('REFRESH_TOKEN_SECRET'),
};

export const oAuthConstants = {
    clientId: getEnv('GOOGLE_CLIENT_ID'),
    clientSecret: getEnv('GOOGLE_CLIENT_SECRET'),
    callbackUrl: getEnv('GOOGLE_REDIRECT_URI'),
};

export const sgMailConstants = {
    apiKey: getEnv('SENDGRID_API_KEY'),
};
