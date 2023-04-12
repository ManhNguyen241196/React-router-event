import EventForm from "../components/EventForm";
import { json, useRouteLoaderData } from "react-router-dom";
import { redirect } from "react-router-dom";
function EditEventPage() {
  const data = useRouteLoaderData("event-detail"); // data  được load trước khi
  //chuyển trang bằng loader. chứ k phải chuyển  rồi mới load.
  return <EventForm event={data.event} />;
}

export default EditEventPage;

export async function action({ request, params }) {
  const data = await request.formData();
  const eventId = params.eventId; // truy xuat bien từ router
  const eventData = {
    title: data.get("title"),
    image: data.get("image"),
    date: data.get("date"),
    description: data.get("description"),
  };
  const response = await fetch("http://localhost:8080/events/edit/" + eventId, {
    method: "post", // Cùng chỏ tới 1 router nhưng method khác nhau sẽ trỏ tới các phuwong thức
    //khác nhau ở back end.
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(eventData),
  });
  if (!response.ok) {
    throw json({ message: "counld not edit event" });
  } else {
    return redirect("/events");
  }
}
