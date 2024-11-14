import Image from "next/image";
import { products } from "@wix/stores";

type ProductImagesProps = products.MediaItem[];

const ProductImages = ({ images }: { images: ProductImagesProps }) => {
  return (
    <div className="grid grid-cols-2 gap-4">
      {images.map((image) => (
        <Image
          key={image._id}
          src={image.image?.url || ""}
          alt="oshun jewelry bijoux artisanaux"
          width={image.image?.width || 300}
          height={image.image?.height || 500}
        />
      ))}
    </div>
  );
};

export default ProductImages;
