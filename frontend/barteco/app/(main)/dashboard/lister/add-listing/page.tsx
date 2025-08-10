'use client'
import { useRouter } from "next/navigation";
import { useActionState, useState } from "react";
import { handleSubmit } from "@/lib/action";
import SearchLocation from "@/components/search-location";
import Testing from "@/components/testing";

//for when image error returned by backend and form values need ot be restored
const initialState = {
  
  title : '' ,
  description : '' ,
  price : '',
  unit  : '',
  category : '' ,
  location : '' ,
  error : null
}

export default function Page() {
  
  const [state , formAction, isPending] = useActionState(
      handleSubmit,
      initialState,
    );




    return (
        <>
        <form action={formAction} 
        key={JSON.stringify(state)} 
        className="space-y-6 p-6 border border-gray-300 rounded-lg shadow-md max-w-md mx-auto bg-white" >
          <div>
            { state.error !='' && (
            <p className="text-red-500 text-sm mt-2 text-center">
              {state.error}
            </p>
          )}
    <label className="block text-sm font-medium text-gray-700 mb-1">
      Title
    </label>
    <input
      name="title"
      type="text"
      placeholder="Enter descriptive title"
      defaultValue={state.title}
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
      defaultValue={state.description}
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
      defaultValue={state.price}
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
      defaultValue={state.unit}
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
      defaultValue={state.category}
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
        name="images"
          type="file"
          multiple
          accept="image/*"
          
          className="w-full"
        />
      </div>
      
      <SearchLocation location={state.location}/>

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