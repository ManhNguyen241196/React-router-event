import { Link, useSubmit } from "react-router-dom";
import classes from "./EventItem.module.css";

function EventItem({ event }) {
  const submit = useSubmit();
  function startDeleteHandler() {
    const proceed = window.confirm("ban co chac chan muon xoa?");
    if (proceed) {
      submit(null, { method: "post" }); // nó chính là nut submit như bên express
    }
  }
  return (
    <article className={classes.event}>
      <img src={event.image} alt={event.title} />
      <h1>{event.title}</h1>
      <time>{event.date}</time>
      <p>{event.description}</p>
      <menu className={classes.actions}>
        {/* nut de edit se chuyen toi 1 trang khac  */}
        <Link to={`/events/${event.id}/edit`}>Edit</Link>
        {/* nut de delete  */}
        <button onClick={startDeleteHandler}>Delete</button>
      </menu>
    </article>
  );
}

export default EventItem;
