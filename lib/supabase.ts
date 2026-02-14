import { createClient } from "@supabase/supabase-js";
import { REGISTRATION_SCHEMA, REGISTRATIONS_TABLE } from "@/lib/constants";

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Missing Supabase env: SUPABASE_URL, SUPABASE_ANON_KEY");
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
const UPPERCASE_ALPHANUMERIC = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const ID_LENGTH = 4;

function generateIdentificationNumber(): string {
  let result = "";
  const randomValues = new Uint8Array(ID_LENGTH);
  crypto.getRandomValues(randomValues);
  for (let i = 0; i < ID_LENGTH; i++) {
    result += UPPERCASE_ALPHANUMERIC[randomValues[i]! % UPPERCASE_ALPHANUMERIC.length];
  }
  return result;
}

async function isIdentificationNumberUnique(number: string): Promise<boolean> {
  const { data, error } = await supabase
    .schema(REGISTRATION_SCHEMA)
    .from(REGISTRATIONS_TABLE)
    .select("id")
    .eq("identification_number", number)
    .maybeSingle();

  if (error) {
    console.error("[Supabase] Check ID uniqueness error:", error);
    return false;
  }
  return data == null;
}

export async function getUniqueIdentificationNumber(): Promise<string> {
  let number = generateIdentificationNumber();
  while (!(await isIdentificationNumberUnique(number))) {
    number = generateIdentificationNumber();
  }
  return number;
}

export type RegistrationRow = {
  id?: number;
  phone: string;
  full_name: string;
  email: string;
  date_of_birth: string;
  category: string;
  gender: string;
  country: string;
  city: string;
  state?: string;
  wants_tshirt: boolean;
  t_shirt_size: string | null;
  payment_status: "PENDING" | "DONE" | "FAILED";
  identification_number: string;
  created_at?: string;
};

/** Use for all registration table access so schema is consistent. */
export function registrationsTable() {
  return supabase.schema(REGISTRATION_SCHEMA).from(REGISTRATIONS_TABLE);
}
