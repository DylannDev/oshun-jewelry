import Image from "next/image";
import Link from "next/link";
import { collections } from "@wix/stores";

type CategoryCardProps = { category: collections.Collection };

const CategoryCard = ({ category }: CategoryCardProps) => {
  if (category.slug === "nouveautés" || category.slug === "tendances") {
    return null; // Ne rien afficher pour ces catégories
  }

  return (
    <Link
      href={`/list?cat=${category.slug}`}
      className="cursor-pointer w-full relative"
    >
      <div className="relative w-full h-[400px]">
        {category.media?.mainMedia?.image?.url && (
          <Image
            src={category.media?.mainMedia?.image?.url}
            alt="baya bin bin oshun jewelry bijoux fantaisie"
            fill
            sizes="25vw"
            className="object-cover"
          />
        )}
      </div>
      <div className="flex items-center justify-center">
        <h1 className="absolute bottom-5 font-semibold text-clip tracking-wide uppercase text-center bg-white/80 backdrop-blur-sm py-2 px-4 rounded-lg">
          {category.slug === "all-products"
            ? "Tous nos articles"
            : category.name}
        </h1>
      </div>
    </Link>
  );
};

export default CategoryCard;
