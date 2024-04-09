import { useProducts } from "@/providers/ProductsProvider";

export default function CategoriesList() {
  const { categories } = useProducts();
  console.log(categories);
  return (
    <div className="flex space-x-4 bg-white justify-center  w-2/3">
      <div className="flex-none w-36 h-24 bg-[#333] rounded-lg flex flex-col justify-center items-center text-white">
        <MenuIcon className="text-3xl" />
        <span className="mt-2">კატეგორიები</span>
      </div>
      {categories.map((category) => (
        <div
          key={category}
          className="flex-none w-40 h-24 bg-[#FFD600] rounded-2xl p-2"
        >
          <span className="p-3 items-center flex justify-center font-semibold  text-xl">
            {category[0].toUpperCase() + category.slice(1)}
          </span>
        </div>
      ))}
    </div>
  );
}

function MenuIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="4" x2="20" y1="12" y2="12" />
      <line x1="4" x2="20" y1="6" y2="6" />
      <line x1="4" x2="20" y1="18" y2="18" />
    </svg>
  );
}
