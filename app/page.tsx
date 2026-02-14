import Link from "next/link";

export default function Page() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <Link
        href="/registration"
        className="rounded-lg bg-primary px-4 py-2 text-primary-foreground font-medium"
      >
        Register for marathon
      </Link>
    </div>
  );
}
