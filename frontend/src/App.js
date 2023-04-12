// Challenge / Exercise

// 1. Add five new (dummy) page components (content can be simple <h1> elements)
//    - HomePage
//    - EventsPage
//    - EventDetailPage
//    - NewEventPage
//    - EditEventPage
// 2. Add routing & route definitions for these five pages
//    - / => HomePage
//    - /events => EventsPage
//    - /events/<some-id> => EventDetailPage
//    - /events/new => NewEventPage
//    - /events/<some-id>/edit => EditEventPage
// 3. Add a root layout that adds the <MainNavigation> component above all page components
// 4. Add properly working links to the MainNavigation
// 5. Ensure that the links in MainNavigation receive an "active" class when active
// 6. Output a list of dummy events to the EventsPage
//    Every list item should include a link to the respective EventDetailPage
// 7. Output the ID of the selected event on the EventDetailPage
// BONUS: Add another (nested) layout route that adds the <EventNavigation> component above all /events... page components

import { RouterProvider, createBrowserRouter } from "react-router-dom";
import HomePage from "./pages/HomePage";
import EventDetailPage, {
  loader as EventDetailLoader,
  action as deleteEventAction,
} from "./pages/EventDetail";
import NewEventPage, { action as newEventAction } from "./pages/NewEventPage";
import EditEventPage, { action as editEventAction } from "./pages/EditEvent";
import RootLayout from "./pages/Root";
import EventRootLayout from "./pages/EventRoot";
import EventsPage from "./pages/EventsPage";
import ErrorPage from "./pages/ErrorPage";
import NewsletterPage, {
  action as newsletterAction,
} from "./components/Newsletter";
const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/events",
        element: <EventRootLayout />,
        children: [
          {
            path: "/events",
            element: <EventsPage />,
          },
          {
            path: "/events/:eventId",
            id: "event-detail",
            loader: EventDetailLoader,
            // loader để load dữ liệu trước khi truy cập vào component
            // loader phát huy tác dụng ở việc truyền dữ liệu qua các đường link cha và con lồng nhau.
            //từ link cha có thể truyền tới con.
            children: [
              {
                path: "/events/:eventId", // index true là để sử dụng đườnng link của link cha haowjc có thể gõ
                //lại y hệt link cha cũng dk.
                //trang này để show cụ thể về 1 sản phẩm nên phải có biến Id động
                element: <EventDetailPage />,
                action: deleteEventAction, //do btn delete nam tren component cua rounter nay neen action phai nam trong pham vi
                //cua router đó. Do elemetn cua nó gọi tới component detail nên action cũng sẽ dk khai báo luôn trong
                // component để gọi đồng thời cho dễ
              },
              {
                path: "edit",
                element: <EditEventPage />,
                action: editEventAction,
              },
            ],
          },
          {
            path: "/events/new",
            action: newEventAction,
            element: <NewEventPage />,
          },
        ],
      },
    ],
  },
  {
    path: "/newsletter", //đường rounter để hiển thị các element (tức là hiển thị component NewsletterPage)
    element: <NewsletterPage />,
    action: newsletterAction, // request.formData() ở trong action này sẽ lấy
    // data gửi từ form từ element lên
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
