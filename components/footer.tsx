"use client";

import Image from "next/image";
import Link from "next/link";
import { Phone, MapPin, Mail } from "lucide-react";

const attractions = [
  "Chitrakote Falls",
  "Tirathgarh Falls",
  "Kanger Valley",
  "Danteshwari Temple",
  "Bastar Palace",
];

const usefulLinks = [
  { label: "About us", href: "/#about" },
  { label: "Race info", href: "/#route" },
  { label: "Registration", href: "/registration" },
  { label: "Marathon Office", href: "/#contact" },
];

const policyLinks = [
  { label: "Terms & Conditions", href: "/terms" },
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Disclaimer", href: "/disclaimer" },
];

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden text-white">
      <div className="absolute inset-0" aria-hidden />

      <div className="absolute top-0 left-0 w-full h-full">
        <Image
          src="/images/footer-bg.jpg"
          alt="Footer Background"
          fill
          className="w-full object-cover object-bottom opacity-"
        />
      </div>
      <div className="relative container mx-auto pt-12">
        {/* Logo */}
        <div className="flex justify-center mb-10">
          <Link
            href="/"
            className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-full"
          >
            <Image
              src="/images/logo.png"
              alt="Bastar Marathon"
              width={140}
              height={140}
              className="size-30 rounded-full object-contain"
            />
          </Link>
        </div>

        {/* Four columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10 mb-12 text-center lg:text-left">
          <div>
            <h3 className="text-lg font-bold mb-4 ">Top Attractions</h3>
            <ul className="space-y-2  text-sm">
              {attractions.map((name) => (
                <li key={name}>{name}</li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4">Useful Links</h3>
            <ul className="space-y-2 text-sm">
              {usefulLinks.map(({ label, href }) => (
                <li key={href}>
                  <Link href={href} className="transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4 ">Policy</h3>
            <ul className="space-y-2 text-sm">
              {policyLinks.map(({ label, href }) => (
                <li key={href}>
                  <Link href={href} className="transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4 ">Contact Us</h3>
            <ul className="space-y-3 text-sm ">
              <li className="flex items-start gap-2 justify-center lg:justify-start">
                <Phone className="size-4 shrink-0 mt-0.5" aria-hidden />
                <span>077122-22222, 222333</span>
              </li>
              <li className="flex items-start gap-2 justify-center lg:justify-start">
                <MapPin className="size-4 shrink-0 mt-0.5" aria-hidden />
                <span>District Administration, Jagdalpur, Bastar, Chhattisgarh</span>
              </li>
              <li className="flex items-start gap-2 justify-center lg:justify-start">
                <Mail className="size-4 shrink-0 mt-0.5" aria-hidden />
                <a href="mailto:marathonbastar@example.com" className=" transition-colors">
                  marathonbastar@example.com
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      {/* Bottom bar */}
      <div className="border-t py-2 bg-primary text-white font-medium flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
        <div className="container mx-auto flex items-center justify-between">
          <p className="text-center sm:text-left">
            Copyright &copy; {currentYear} Bastar Marathon. Content owned by Department of Tourism
            (Chhattisgarh).
          </p>
          <p className="text-center sm:text-right">Designed &amp; developed for Bastar Marathon.</p>
        </div>
      </div>
    </footer>
  );
}
