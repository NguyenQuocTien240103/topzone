import * as dotenv from 'dotenv';
dotenv.config();
export const jwtConstants = {
    secret: process.env.SECRET,
};
export const oAuthConstants = {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_REDIRECT_URI,
}
