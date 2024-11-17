import { values } from "@/config/data";

const ShopValues = () => {
  return (
    <div className="mt-24 pt-16 border-t border-gray-200 w-full">
      <h1 className="heading-home text-center">Pourquoi Choisir Oshun ?</h1>
      <div className="flex flex-col items-center md:flex-row md:justify-between gap-4 md:gap-0 pt-5 md:pt-10">
        {values.map((value, index) => (
          <div
            key={index}
            className="flex flex-col items-center text-center p-4 max-w-sm"
          >
            <div className="mb-4 text-4xl">{value.icon}</div>
            <h3 className="text-lg font-semibold mb-2">{value.title}</h3>
            <p className="text-gray-600 text-sm">{value.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShopValues;
