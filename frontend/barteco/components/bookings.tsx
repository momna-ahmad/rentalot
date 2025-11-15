'use client';

import React, { useState } from 'react'; 
import { Listing } from "@/context/useListingContext";
import { format } from "date-fns";
import { FiCalendar, FiClock, FiTag } from 'react-icons/fi';
import ReviewForm from './review-form'; 
import { postReview } from '@/lib/action';

type ReviewType = 'listing' | 'owner' | null;

export interface ReviewModalData {
    isOpen: boolean;
    type: ReviewType;
    listingId: number | null;
    ownerId: string; 
}

export interface Booking {
    start_date_time: string;
    end_date_time: string;
    cost: number;
    duration: number;
    listing: Listing & { id: number; owner: string }; 
}

function capitalizeFirstWord(str: string | undefined): string {
    if (!str) return "";
    return str.charAt(0).toUpperCase() + str.slice(1);
}

export default function Bookings({ bookings, text, allowReviews = false }: { bookings: Booking[], text?: string, allowReviews?: boolean }) {
    
    const [reviewModalData, setReviewModalData] = useState<ReviewModalData>({
        isOpen: false,
        type: null,
        listingId: null,
        ownerId: '',
    });

    const [rating, setRating] = useState(0);
    const [reviewText, setReviewText] = useState('');

    // Open modal and set current booking data
    const handleOpenReviewModal = (booking: Booking, type: ReviewType) => {
        setReviewModalData({
            isOpen: true,
            type,
            listingId: booking.listing.id, 
            ownerId: booking.listing.owner,
        });
    };

    // Close modal and reset form
    const handleCloseReviewModal = () => {
        setReviewModalData({
            isOpen: false,
            type: null,
            listingId: null,
            ownerId: '',
        });
        setRating(0);
        setReviewText('');
    };

    // Submit review
    const handleSubmitReview = async () => {
        // Use FormData with proper field names
        const formData = new FormData();
        formData.append('rating', rating.toString());
        formData.append('reviewText', reviewText);

        // Note: The action function expects ReviewModalData as the first arg and FormData as the second
        // The postReview action in action.ts will use the data from reviewModalData (listingId/ownerId) 
        // and the rating/reviewText from formData.
        await postReview(reviewModalData, formData);

        handleCloseReviewModal(); // close modal after submission
    };

    if (!bookings || bookings.length === 0) {
        return (
            <div className="p-6 text-center text-gray-500">
                <p className="text-lg">No upcoming bookings.</p>
            </div>
        );
    }

    const formattedText = capitalizeFirstWord(text);

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">{formattedText}</h2>
            
            <div className="flex flex-col space-y-4">
                {bookings.map((booking, index) => (
                    <article
                        key={index}
                        className="w-full rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-200 p-5 flex **flex-row justify-between** bg-white"
                    >
                        
                        {/* 1. LEFT SIDE: Listing Title and Booking Details */}
                        <div className="flex flex-col space-y-2 flex-grow pr-4"> 
                            {/* Title */}
                            <h3 className="text-xl font-semibold text-gray-900 truncate capitalize">{booking.listing.title}</h3>

                            {/* Date Range */}
                            <div className="text-sm text-gray-700 flex items-center gap-2">
                                <FiCalendar className="w-5 h-5 text-gray-500 flex-shrink-0" />
                                <time dateTime={booking.start_date_time}>
                                    {format(new Date(booking.start_date_time), 'MMM dd, yyyy h:mm a')}
                                </time>
                                <span className="text-gray-400">→</span>
                                <time dateTime={booking.end_date_time}>
                                    {format(new Date(booking.end_date_time), 'MMM dd, yyyy h:mm a')}
                                </time>
                            </div>
                            
                            {/* Duration */}
                            <div className="flex items-center gap-2 text-sm text-gray-700">
                                <FiClock className="w-5 h-5 text-gray-500 flex-shrink-0" />
                                <span>Duration: {booking.duration} {booking.listing.unit}(s)</span>
                            </div>
                            
                            {/* Category Tag */}
                            <div className="pt-2">
                                <span className="inline-block bg-gray-100 text-gray-700 text-xs font-medium px-3 py-1 rounded-full select-none">
                                    <FiTag className="inline w-3 h-3 mr-1" /> {booking.listing.category}
                                </span>
                            </div>
                        </div>

                        {/* 2. RIGHT SIDE: Price and Review Buttons */}
                        <div className="flex flex-col justify-start items-end space-y-3 flex-shrink-0">
                            {/* Price */}
                            <div className="text-xl text-gray-900 font-bold whitespace-nowrap">PKR {booking.cost.toFixed(2)}</div>
                            
                            {/* Review Buttons (Conditional) */}
                            {allowReviews && (
                                <div className="flex flex-col space-y-2 w-48"> 
                                    <button
                                        onClick={() => handleOpenReviewModal(booking, 'listing')}
                                        className="w-full px-3 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
                                    >
                                        Review Listing
                                    </button>
                                    <button
                                        onClick={() => handleOpenReviewModal(booking, 'owner')}
                                        className="w-full px-3 py-2 text-sm font-medium text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50 transition-colors"
                                    >
                                        Review Owner
                                    </button>
                                </div>
                            )}
                        </div>
                    </article>
                ))}
            </div>

            {/* Review Modal */}
            {reviewModalData.isOpen && (
                <ReviewForm
                    rating={rating}
                    setRating={setRating}
                    reviewText={reviewText}
                    setReviewText={setReviewText}
                    onClose={handleCloseReviewModal}
                    onSubmit={handleSubmitReview}
                />
            )}
        </div>
    );
}