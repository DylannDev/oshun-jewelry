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
      <div className="relative w-full aspect-[7/11]">
        {category.media?.mainMedia?.image?.url && (
          <Image
            src={category.media?.mainMedia?.image?.url}
            alt="baya bin bin oshun jewelry bijoux fantaisie"
            fill
            sizes="(max-width: 900px) 50vw, 25vw"
            className="object-cover"
          />
        )}
      </div>
      <div className="flex items-center justify-center absolute bottom-5 px-2 w-full">
        <h1 className="py-2 px-3 sm:px-4 text-xs sm:text-sm xl:text-base font-semibold text-clip tracking-wide uppercase text-center bg-white/80 backdrop-blur-sm rounded-md md:rounded-lg">
          {category.slug === "all-products"
            ? "Tous nos articles"
            : category.name}
        </h1>
      </div>
    </Link>
  );
};

export default CategoryCard;
