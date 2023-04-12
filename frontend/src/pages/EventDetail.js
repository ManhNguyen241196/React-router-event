//khi này react truy cập vào đường link API để lấy dữ liệu từ backend chứ k có quá trình xử lí để lấy được dữ
//liệu đó. Mọi xử lí phải được xử lí wor backend và trả về dạng json API ở
// 1 đường link backend nào đó. QUÁ TRÌNH XỬ LÍ DƯ LIỆU KHÔNG ĐƯỢC LÀM TRÊN FRONT-END

import { useRouteLoaderData, json, redirect } from "react-router-dom";

import EventItem from "../components/EventItem";

function EventDetailPage() {
  const data = useRouteLoaderData("event-detail");
  console.log(data);
  return (
    <EventItem event={data.event} /> // sẽ filler ra 1 object có chứa id trùng với params
  );
}

export default EventDetailPage;

export async function loader({ request, params }) {
  // quá trình truy cập link bacjend để lấy data từ API
  const id = params.eventId;
  const response = await fetch("http://localhost:8080/events/" + id);
  if (!response.ok) {
    throw json({ message: "counld not fetch" });
  } else {
    return response;
  }
}

export async function action({ request, params }) {
  const eventId = params.eventId;
  const response = await fetch("http://localhost:8080/events/xoa/" + eventId, {
    method: "post", // Cùng chỏ tới 1 router nhưng method khác nhau sẽ trỏ tới các phuwong thức
    //khác nhau ở back end.
  });
  if (!response.ok) {
    throw json({ message: "counld not delete event" });
  } else {
    return redirect("/events");
  }
}
