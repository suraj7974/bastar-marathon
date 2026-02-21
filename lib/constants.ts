const REGISTRATION_SCHEMA = "bastar_marathon";
const REGISTRATIONS_TABLE = "registrations" as const;

const MERCHANT_ID = process.env.ICICI_MERCHANT_ID!;
const AGGREGATOR_ID = process.env.ICICI_AGGREGATOR_ID!;
const ICICI_KEY = process.env.ICICI_KEY!;
const ICICI_URL = process.env.ICICI_URL!;

const ICICI_CONFIG = {
  merchantId: MERCHANT_ID,
  aggregatorID: AGGREGATOR_ID,
  key: ICICI_KEY,
  url: ICICI_URL,
};

export { ICICI_CONFIG, REGISTRATIONS_TABLE, REGISTRATION_SCHEMA };
