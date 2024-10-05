declare namespace NodeJS {
    export interface ProcessEnv {
        DATABASE_URL: string;
        JWT_SECRET_KEY: string;
        JWT_REFRESH_TOKEN: string;
    }
}