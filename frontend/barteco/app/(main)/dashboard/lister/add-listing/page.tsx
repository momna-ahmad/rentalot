
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/useAuth";
import useAxios from "@/hooks/useAxios";

export default function Page() {

    //server actions to mutate data
    async function create(formData: FormData) {
    'use server';
        

  const title = formData.get("title") ;
  const description = formData.get("description");
  const category = formData.get("category");
  const price = formData.get("price");
  const unit = formData.get("unit");
        const data = {
            title,
            description,
            category,
            price,
            unit,
            lister: user?.id
        };
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/add-listings`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });
        if(response?.status === 200){
          replace("/dashboard/lister/listings");
        }
  }

    /*const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) =>{
      console.log("Form submitted");
        event.preventDefault() ;
        const form = event.currentTarget;

  const title = form.title.value ;
  const description = form.description.value;
  const category = form.category.value;
  const price = form.price.value;
  const unit = form.unit.value;
        const data = {
            title,
            description,
            category,
            price,
            unit,
            lister: user?.id
        };
        const response = await request("post" , "/add-listings" , data) ;
        if(response?.status === 200){
          replace("/dashboard/lister/listings");
        }
    }*/

    return (
        <>
                <form action={create}  className="space-y-6 p-6 border border-gray-300 rounded-lg shadow-md max-w-md mx-auto bg-white">
  <div>
    <span>
            {error && <p className="text-red-500 text-sm mt-2">{error.value}</p>}  
        </span>
    <label className="block text-sm font-medium text-gray-700 mb-1">
      Title
    </label>
    <input
      name=""
      type="text"
      placeholder="Enter descriptive title"
      className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  </div>

  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">
      Description
    </label>
    <input
      name="description"
      type="text"
      placeholder="Add detailed description"
      className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  </div>

  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">
      Price
    </label>
    <input
      name="price"
      type="text"
      placeholder="Add price"
      className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  </div>

  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">
      Unit
    </label>
    <input
      name="unit"
      type="text"
      placeholder="Add unit (day, hour, etc.)"
      className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  </div>

  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">
      Category
    </label>
    <select
      name="category"
      className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      defaultValue=""
    >
      <option value="" disabled>Select a category</option>
      <option value="homes">Homes</option>
      <option value="vehicles">Vehicles</option>
      <option value="halls">Halls</option>
      <option value="others">Others</option>
    </select>
  </div>

  <button
    type="submit"
    className="w-full bg-blue-600 text-white font-medium py-2 px-4 rounded hover:bg-blue-700 transition"
  >
    Submit
  </button>
</form>

        </> 
        
    );
}