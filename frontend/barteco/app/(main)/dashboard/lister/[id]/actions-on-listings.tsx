
import Delete from "./delete";
import EditListing from "./edit-listing/page";

//no need to pass listing prop from this component to children component because of context

export default function ActionsOnListings(){
    return(
        <>
        
      <Delete/>
      <EditListing/>
   
        </>
    );
}