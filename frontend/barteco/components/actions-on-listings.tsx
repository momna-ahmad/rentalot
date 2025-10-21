import Delete from "./delete";
import EditListing from "../app/(main)/dashboard/lister/[id]/edit-listing/page";

export default function ActionsOnListings() {
  return (
    <div className="flex gap-2">
      <EditListing />
      <Delete />
    </div>
  );
}
