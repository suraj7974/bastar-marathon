import Image from "next/image";

export function Header() {
  return (
    <header className="absolute top-0 left-0 right-0 z-50 p-6 md:p-8 flex justify-between items-center">
      <div className="flex items-center gap-4">
        <Image
          src="/images/logo.png"
          alt="Bastar Marathon Logo"
          width={60}
          height={60}
          className="w-12 h-12 md:w-16 md:h-16 object-contain"
        />
      </div>
    </header>
  );
}
