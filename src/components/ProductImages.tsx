import Image from "next/image";

const ProductImages = ({ images }: { images: any }) => {
  return (
    <div>
      <div className="relative w-full pt-[100%]">
        <Image
          src={images[0].image?.url}
          alt="oshun jewelery bijoux artisanaux"
          fill
          sizes="100%"
          className="object-cover rounded-lg"
        />
      </div>
      <div className=""></div>
    </div>
  );
};

export default ProductImages;
