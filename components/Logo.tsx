export default function Logo({ className = "" }: Readonly<{ className?: string }>) {
  return (
    <a
      href="#home"
      aria-label="RevolutionTech23"
      className={`inline-flex items-center ${className}`}
    >
      <img
        src="/images/revolutiontechlogo.svg"
        alt="RevolutionTech23"
        className="h-12 w-auto sm:h-14 lg:h-16"
      />
    </a>
  );
}
