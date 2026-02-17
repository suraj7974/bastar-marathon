"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";

export default function InaugurationRedirect() {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Check if inauguration is complete
    const inaugurationComplete = sessionStorage.getItem("inaugurationComplete");

    // Only redirect to inauguration if not complete and not already there
    if (!inaugurationComplete && pathname !== "/inauguration") {
      router.push("/inauguration");
    }
  }, [pathname, router]);

  return null;
}
