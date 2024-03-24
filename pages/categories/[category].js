import React from "react";
import { useRouter } from "next/router";

export default function CategoriesPages() {
  const router = useRouter();
  const eventId = router.query.category;
  
  return <div>This is {eventId} </div>;
}
