'use client' 

import { useContext } from 'react' ;
import { ListingContext } from '../../../../../../context/useListingContext';
import { useState } from 'react' ;
import { useRouter } from 'next/navigation';

export default function EditListing(){
    const listing = useContext(ListingContext) ;
    const [open , setOpen] = useState(false) ;
    const categories = ['home', 'vehicle', 'hall', 'Other'];
    const router = useRouter();



    async function handleEdit(formData: FormData){
  const title = formData.get('title') ;
  const description = formData.get('description') ;
  const price = formData.get('price') ;
  const unit = formData.get('unit') ;
  const cateogory = formData.get('category') ;

  await fetch(`${process.env.NEXT_PUBLIC_API_URL}/edit-listing/${listing?.id}`,
    {
        method: 'post' ,
      headers: {
            'Content-Type': 'application/json',
          },
        body: JSON.stringify({
            title , 
            description,
            price,
            unit, 
            cateogory
        })
    });

    router.back();


}

    return (
        <>
        <button onClick={()=>
            {
                setOpen(true) ;
            }
        }>
            Edit
        </button>

        {
            open && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          {/* Modal content */}
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md relative">
            <h2 className="text-xl font-semibold mb-4">Edit Listing</h2>
            
            {/* Your form or edit UI goes here */}
            <form action={handleEdit}>
                <div>
        <label className="block text-sm font-medium mb-1" htmlFor="title">Title</label>
        <input
          type="text"
          id="title"
          name="title"
          defaultValue={listing?.title}
          className="w-full border px-3 py-2 rounded focus:outline-none focus:ring focus:border-blue-300"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1" htmlFor="description">Description</label>
        <textarea
          id="description"
          name="description"
          defaultValue={listing?.description}
          rows={3}
          className="w-full border px-3 py-2 rounded focus:outline-none focus:ring focus:border-blue-300"
          required
        />
      </div>

      {/* Price */}
      <div>
        <label className="block text-sm font-medium mb-1" htmlFor="price">Price</label>
        <input
          type="number"
          id="price"
          name="price"
          defaultValue={listing?.price}
          className="w-full border px-3 py-2 rounded focus:outline-none focus:ring focus:border-blue-300"
          required
        />
      </div>

      {/* Unit */}
      <div>
        <label className="block text-sm font-medium mb-1" htmlFor="unit">Unit</label>
        <input
          type="text"
          id="unit"
          name="unit"
          defaultValue={listing?.unit}
          placeholder="e.g., day, hour, item"
          className="w-full border px-3 py-2 rounded focus:outline-none focus:ring focus:border-blue-300"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1" htmlFor="category">Category</label>
        <select
          id="category"
          name="category"
          defaultValue={listing?.category}
          className="w-full border px-3 py-2 rounded focus:outline-none focus:ring focus:border-blue-300"
          required
        >
          <option value="" disabled>Select a category</option>
          {categories.map(cat => (
            <option key={cat} defaultValue={cat}>{cat}</option>
          ))}
        </select>

        <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                Save
              </button>
      </div>


            </form>

            {/* Modal buttons */}
            <div className="flex justify-end space-x-2">
              <button
                onClick={()=>
                {
                    setOpen(false) ;
                }
                }
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
              
            </div>


            {/* Close icon */}
            <button
              onClick={()=>
                {
                    setOpen(false) ;
                }
            }
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-xl"
            >
              &times;
            </button>
          </div>
        </div>
            )
        }

        </>
    )
}