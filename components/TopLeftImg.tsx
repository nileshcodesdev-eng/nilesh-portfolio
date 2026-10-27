import Image from "next/image";

const TopLeftImg = () => {
  return (
    <div className="absolute left-0 top-0 mix-blend-screen z-0 w-50 xl:w-96 opacity-20 pointer-events-none select-none">
      <Image
        src="/top-left-img.png"
        alt="left cover bg"
        width={400}
        height={400}
        priority
      />
    </div>
  );
};

export default TopLeftImg;
