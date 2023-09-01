import Image from "next/image";

const Loader = ({ caption = "Onyx is thinking..." }) => {
  return (
    <div className="h-full flex flex-col gap-y-4 items-center justify-center">
      <div className="w-10 h-10 relative animate-spin">
        <Image alt="logo" fill src="/logo.svg" />
      </div>

      <p className="text-sm text-muted-foreground">{caption}</p>
    </div>
  );
};

export default Loader;
