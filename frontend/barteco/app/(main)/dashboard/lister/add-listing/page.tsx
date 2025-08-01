'use client'
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/useAuth";
import useAxios from "@/hooks/useAxios";
import { useActionState } from 'react';
import { useState } from "react";


export default function Page() {
  const { replace } = useRouter() ;
  const [files, setFiles] = useState<FileList | null>(null);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    price: '',
    unit: ''
  });
  const [error,  setError] = useState('') ;
  

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) =>{
      event.preventDefault() ;
      const { title, description, category, price, unit } = formData;
   if (!title || !description || !category || !price || !unit) {
    setError("All fields are required.");
   }
   else{
    const payload = new FormData();
    payload.append('title', title);
    payload.append('description', description);
    payload.append('price', price);
    payload.append('unit', unit);
    payload.append('category', category);

    // Append all selected images
    if(files != null)
    Array.from(files).forEach((file) => {
      payload.append('images', file);
    });

    //json header causes error because file data cant be read as json
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/add-listings`, {
          method: 'POST',
          credentials: 'include',
          body: payload
        });

        if(response.status === 200)
          replace('/dashboard/lister') ;
        else
          setError('unexpected error');
   }
       

    }

    return (
        <>
                <form onSubmit={handleSubmit} className="space-y-6 p-6 border border-gray-300 rounded-lg shadow-md max-w-md mx-auto bg-white" 
                encType="multipart/form-data"
                >
  <div>
    { error !='' && (
            <p className="text-red-500 text-sm mt-2 text-center">
              {error}
            </p>
          )}
    <label className="block text-sm font-medium text-gray-700 mb-1">
      Title
    </label>
    <input
      name="title"
      type="text"
      placeholder="Enter descriptive title"
      onChange={(e)=>{
        setFormData((prev) => ({ ...prev, title: e.target.value }));
      }}
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
      onChange={(e)=>{
        setFormData((prev) => ({ ...prev, description: e.target.value }));
      }}
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
      onChange={(e)=>{
        setFormData((prev) => ({ ...prev, price: e.target.value }));
      }}
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
      onChange={(e)=>{
        setFormData((prev) => ({ ...prev, unit: e.target.value }));
      }}
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
      onChange={(e)=>{
        setFormData((prev) => ({ ...prev, category: e.target.value }));
      }}
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

  <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Images (max 5)</label>
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={(e) => setFiles(e.target.files)}
          className="w-full"
        />
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