'use client';

import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';

interface Suggestion {
  display_name: string; // LocationIQ returns display_name
  place_id: string;
}
 
export default function SearchLocation({location}:{location : string}) {
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [locationValue, setLocationValue] = useState(location || ""); // track the value

  const handleSearch = useDebouncedCallback(async (term: string) => {

    const res = await fetch(
      `https://api.locationiq.com/v1/autocomplete?key=${process.env.NEXT_PUBLIC_LOCATION_IQ_ACCESS_TOKEN}&q=${term}`
    );

    if (!res.ok) return;

    const data: Suggestion[] = await res.json();
    setSuggestions(data);
    setShowDropdown(true);
  }, 300);

  const handleSelect = (value: string) => {
    setLocationValue(value); // set the input value
    setShowDropdown(false);
  };

  return (
    <div className="relative flex flex-col">
      <label htmlFor="search" className="sr-only">Search</label>

      
      
      <div className="relative w-full">
        <input
          type="text"
          onChange={(e) => handleSearch(e.target.value)}
          
          className="peer block w-full rounded-md border border-gray-300 py-[9px] pl-10 text-sm outline-none placeholder:text-gray-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          placeholder="Search Location"
        />
        <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
      </div>
      <input name='location'  value={locationValue} hidden  readOnly />
      <p className="
      mt-2 
      mb-4 
      text-base/7 
      leading-relaxed 
      tracking-wide">
        Location: {locationValue}
        </p>
      {showDropdown && suggestions.length > 0 && (
        <ul className="absolute top-full left-0 w-full bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto z-50">
          {suggestions.map((s, index) => (
            <li
            key={index}
            onClick={() => handleSelect(s.display_name)}
            className="px-4 py-2 cursor-pointer hover:bg-blue-100 text-sm"
            >
              {s.display_name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
