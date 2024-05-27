import Image from "next/image";
import Link from "next/link";
import { collections } from "@wix/stores";

type CategoryCardProps = { category: collections.Collection };

const CategoryCard = ({ category }: CategoryCardProps) => {
  return (
    <Link
      href={`/list?cat=${category.slug}`}
      className="cursor-pointer flex-shrink-0 w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/6"
    >
      <div className="relative w-full h-96 border border-gray-300 rounded-lg">
        {category.media?.mainMedia?.image?.url && (
          <Image
            src={category.media?.mainMedia?.image?.url}
            alt="baya bin bin oshun jewelry bijoux fantaisie"
            fill
            sizes="25vw"
            className="object-cover rounded-lg"
          />
        )}
      </div>
      <h1 className="mt-8 font-semibold text-clip tracking-wide uppercase text-center">
        {category.name}
      </h1>
    </Link>
  );
};

export default CategoryCard;
