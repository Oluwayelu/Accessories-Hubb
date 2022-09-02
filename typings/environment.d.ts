namespace NodeJS {
  interface ProcessEnv extends NodeJS.ProcessEnv {
    SMTP_HOST: string;
    SMTP_PORT: string;
    SMTP_USERNAME: string;
    SMTP_PASSWORD: string;
    SMTP_FROM_NAME: string;
    SMTP_FROM_EMAIL: string;

    NEXT_APP_MONGODB_URI: string;
    NEXT_APP_JWT_SECRET: string;
    NEXT_APP_API_URL: string;

    NEXTAUTH_URL: string;

    GOOGLE_API_KEY: string;
    PAYPAL_CLIENT_ID: string;

    CLOUDINARY_CLOUD_NAME: string;
    CLOUDINARY_API_KEY: string;
    CLOUDINARY_API_SECRET: string;

    PAYSTACK_SECRET_KEY: string;
    PAYSTACK_PUBLIC_KEY: string;
  }
}
