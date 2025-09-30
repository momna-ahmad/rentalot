'use client';

import React, { useState, useActionState , useEffect } from 'react';
import BookingCalendar from './booking-calender';
import { handleBooking } from '@/lib/action';
import { Booking } from './my-bookings';

export default function BookListing({ id, unit, cost , bookings }: { id: string; unit: string , cost: number , bookings:Booking[] }) {
  const [showModal, setShowModal] = useState(false);
  const [duration, setDuration] = useState('');
  const [startDateTime, setStartDateTime] = useState<string | null>(null);

  const initialState = {
    duration: '',
    start: '',
    unit ,
    listing: id,
    cost: cost ,
    error: null,
  };

  const [state, formAction, isPending] = useActionState(handleBooking, initialState);

  useEffect(() => {
  if (state?.error && !isPending) {
    alert(state.error);
  }
}, [state?.error, isPending]);

  const handleDateSelect = (selectInfo: any) => {
    const start = selectInfo.startStr;
    setStartDateTime(start);
  };

  return (
    <>
      <button
        className="flex-1 border border-gray-300 py-2 px-4 rounded-lg hover:bg-gray-100 transition"
        onClick={() => setShowModal(true)}
      >
        Book listing
      </button>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/30 px-4">
          {/* Modal container */}
          <form
            action={formAction}
            className="relative bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6"
            onSubmit={() => {
              if (!duration || !startDateTime) {
                alert('Please select both duration and a date/time.');
              } else {
                setShowModal(false); // Close on valid submission
              }
            }}
          >
            {/* Close (X) button */}
            <button
              type="button"
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 text-xl"
              onClick={() => setShowModal(false)}
              aria-label="Close modal"
            >
              &times;
            </button>

            <h2 className="text-xl font-semibold mb-4">Book Listing</h2>

            {/* Duration input */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                {unit === 'day' ? 'Number of days' : 'Number of hours'}
              </label>
              <input
                name="duration"
                type="number"
                min="1"
                required
                className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                placeholder={unit === 'day' ? 'e.g. 3' : 'e.g. 2'}
              />
            </div>

            {/* Calendar */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select start {unit === 'day' ? 'date' : 'time'}:
              </label>
              <BookingCalendar unit={unit} onDateSelect={handleDateSelect} bookings={bookings} />
            </div>

            {/* Hidden fields for form submission */}
            <input type="hidden" name="start" value={startDateTime ?? ''} />
            <input type="hidden" name="listing" value={id} />
            <input type="hidden" name="unit" value={unit} />
            <input type="hidden" name="cost" value={cost} />

            {/* Summary & Actions */}
            <div className="border-t pt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="text-sm text-gray-600">
                Start: {startDateTime || 'Not selected'}<br />
                Duration: {duration || 'Not entered'} {unit}(s)
              </div>

              <div className="flex gap-2 justify-end">
                <button
                  type="button"
                  className="bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300 transition"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                  disabled={!duration || !startDateTime || isPending}
                >
                  {isPending ? 'Booking...' : 'Confirm Booking'}
                </button>
              </div>
            </div>

          </form>
        </div>
      )}
    </>
  );
}
