import Delete from "./delete";
import EditListing from "../app/(main)/dashboard/lister/[id]/edit-listing/page";

// No need to pass listing prop due to context
export default function ActionsOnListings() {
  return (
    <div className="flex flex-wrap gap-4 mt-6">
      <Delete />
      <EditListing />
    </div>
  );
}
