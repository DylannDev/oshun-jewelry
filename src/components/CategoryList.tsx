import CategoryCard from "./CategoryCard";
import { collections } from "@wix/stores";

type CategoryListProps = {
  categories: collections.CollectionsQueryResult;
};

const CategoryList = ({ categories }: CategoryListProps) => {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 w-full">
      {categories.items.map((category) => (
        <CategoryCard key={category._id} category={category} />
      ))}
    </div>
  );
};

export default CategoryList;
