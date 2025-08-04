import DisplayImg from "./display-images";

interface Listing {
  title: string;
  img_urls: string[];
  price: number;
  unit: string;
}

export default async function Listings() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/`);
  const listings: Listing[] = await res.json();
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-4">
      {listings.map((listing: Listing, index: number) => (
        <div
          key={index}
          className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col"
        >
            {
                listing.img_urls?.length > 0 && (
                     <DisplayImg imgs={listing.img_urls} />
                )
            }
         
          <div className="p-4 flex flex-col flex-grow">
            <h2 className="text-lg font-semibold mb-2">{listing.title}</h2>

            <div className="mt-auto">
              <p className="text-xl font-bold text-gray-900">
                PKR{listing.price} per {listing.unit}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
