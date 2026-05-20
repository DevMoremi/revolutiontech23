import Image from "next/image";

export default function Logo({ className = "" }: Readonly<{ className?: string }>) {
  return (
    <a
      href="#home"
      aria-label="RevolutionTech23"
      className={`inline-flex items-center ${className}`}
    >
      <Image
        src="/images/revolutiontechlogo.svg"
        alt="RevolutionTech23"
        width={1920}
        height={1080}
        className="h-12 w-auto sm:h-14 lg:h-16"
      />
    </a>
  );
}
