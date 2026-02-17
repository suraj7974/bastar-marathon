import Image from "next/image";
import Link from "next/link";

const NavLinkItem = ({ href, label }: { href: string; label: string }) => {
  return (
    <Link
      href={href}
      className="text-sm flex flex-col items-center group font-medium text-gray-700 hover:text-gray-900"
    >
      <p className="group-hover:text-amber-500 transition-all duration-300">{label}</p>
      <span className="w-0 h-0.5 bg-amber-500 rounded-full group-hover:w-full  transition-all duration-300" />
    </Link>
  );
};

export function Header() {
  return (
    <header className="fixed h-18 top-0 left-0 bg-white shadow-sm right-0 z-50  flex justify-between items-center">
      <div className="container mx-auto flex items-center justify-between gap-4">
        <Image
          src="/images/logo.png"
          alt="Bastar Marathon Logo"
          width={60}
          height={60}
          className="size-14 object-contain"
        />
        <nav className="flex items-center gap-5">
          <NavLinkItem href="/" label="Home" />
          <NavLinkItem href="/registration" label="Registration" />
          <NavLinkItem href="/prizes" label="Prizes" />
        </nav>
        <div className="flex items-center gap-5">
          <Image
            src="/images/tourism.png"
            alt="Tourism Logo"
            width={60}
            height={60}
            className="size-14 object-contain"
          />
          <Image
            src="/images/cg-police.png"
            alt="CG Police Logo"
            width={60}
            height={60}
            className="size-14 object-contain"
          />
        </div>
      </div>
    </header>
  );
}
