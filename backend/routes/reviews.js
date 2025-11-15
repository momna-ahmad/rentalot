import express from 'express' ;
import supabase from '../utils/supabase-client.js';
import authenticate from '../middleware/authentication.js';
import fetchUser from '../utils/fetchuser.js';

const router = express.Router() ;

//insert review in review table and updates the review id array in listings or user tbale based on type of review
router.post('/post-review', authenticate, async (req, res) => {
  try {
    console.log('Review payload received:', req.body);
    const user = await fetchUser(req.user.sub);
    const { type, listingId, ownerId, rating, reviewText } = req.body;

    // Insert review in "reviews" table
    const { data: reviewData, error: reviewError } = await supabase
      .from("reviews")
      .insert([
        {
          reviewer: user.id,
          listing: type === "listing" ? listingId : null,
          owner: type === "owner" ? ownerId : null,
          rating,
          review: reviewText,
        },
      ])
      .select("id"); // select inserted id

    if (reviewError) throw reviewError;
    if (!reviewData || reviewData.length === 0) {
      return res.status(500).json({ error: "Failed to insert review" });
    }

    const reviewId = reviewData[0].id;

    // Update the review_ids array in listings or users
    if (type === "listing" && listingId) {
      // Fetch current review_ids
      const { data: listingData, error: fetchListingError } = await supabase
        .from("listings")
        .select("review_ids")
        .eq("id", listingId)
        .single();

      if (fetchListingError) throw fetchListingError;

      const updatedReviewIds = [...(listingData.review_ids || []), reviewId];

      const { error: listingUpdateError } = await supabase
        .from("listings")
        .update({ review_ids: updatedReviewIds })
        .eq("id", listingId);

      if (listingUpdateError) throw listingUpdateError;
    } else if (type === "owner" && ownerId) {
      // Fetch current review_ids for the user
      const { data: userData, error: fetchUserError } = await supabase
        .from("users")
        .select("review_ids")
        .eq("id", ownerId)
        .single();

      if (fetchUserError) throw fetchUserError;

      const updatedReviewIds = [...(userData.review_ids || []), reviewId];

      const { error: userUpdateError } = await supabase
        .from("users")
        .update({ review_ids: updatedReviewIds })
        .eq("id", ownerId);

      if (userUpdateError) throw userUpdateError;
    }

    return res.status(200).json({ success: true, reviewId });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: err.message || "Server error" });
  }
});


export default router;