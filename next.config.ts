import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    SUPABASE_URL: process.env.SUPABASE_URL,
    SUPABASE_ANON_KEY: process.env.SUPABASE_ANON_KEY,
    PAYU_KEY: process.env.PAYU_KEY,
    PAYU_SALT: process.env.PAYU_SALT,
    SMTP_HOST: process.env.SMTP_HOST,
    SMTP_PORT: process.env.SMTP_PORT,
    SMTP_SECURE: process.env.SMTP_SECURE,
    SMTP_USER: process.env.SMTP_USER,
    SMTP_PASS: process.env.SMTP_PASS,
    ICICI_MERCHANT_ID: process.env.MERCHANT_ID,
    ICICI_AGGREGATOR_ID: process.env.AGGREGATOR_ID,
    ICICI_URL: process.env.ICICI_URL,
    ICICI_KEY: process.env.ICICI_KEY,
  },
  images: {
    qualities: [75, 100],
  },
};

export default nextConfig;
