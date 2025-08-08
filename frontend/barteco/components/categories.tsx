import Link from "next/link";

export default function Categories() {
  const categories: string[] = ["homes", "vehicles", "halls", "others"];

  return (
    <div className="flex justify-center gap-4 py-6">
      {categories.map((category, index) => (
        <Link href={`/${category}`} key={index}>
          <div className="px-4 py-2 bg-gray-100 rounded-md text-gray-800 capitalize cursor-pointer hover:bg-gray-200 transition-colors">
            {category}
          </div>
        </Link>
      ))}
    </div>
  );
}
