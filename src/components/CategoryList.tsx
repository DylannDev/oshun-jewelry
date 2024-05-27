import { wixClientServer } from "@/lib/wixClientServer";
import CategoryCard from "./CategoryCard";
import { collections } from "@wix/stores";

const CategoryList = async () => {
  const wixClient = await wixClientServer();
  const categories = await wixClient.collections.queryCollections().find();

  return (
    <div className="flex gap-4 md:gap-8 overflow-x-scroll scrollbar-hide mt-8">
      {categories.items.map((category: collections.Collection) => (
        <CategoryCard key={category._id} category={category} />
      ))}
    </div>
  );
};

export default CategoryList;
