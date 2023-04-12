import { useActionData, useNavigate, useNavigation } from "react-router-dom";
import { Form } from "react-router-dom";
import classes from "./EventForm.module.css";

function EventForm({ method, event }) {
  const data = useActionData(); // useActionData sẽ lấy Data phản hồi từ response
  // dưới dạng 1 object như khi khai báo tại res ở backend
  const navigate = useNavigate();
  const navigation = useNavigation();
  let cmtError;
  const isSubmitting = navigation.state === "submitting";

  function cancelHandler() {
    // điều hướng router trở lại trước đó nếu back lại
    navigate("..");
  }
  if (data) {
    cmtError = data.errors;
    console.log("object loi la:" + data.errors);
  }
  return (
    <Form method="post" className={classes.form}>
      <p>
        <label htmlFor="title">Title</label>
        <input
          id="title"
          type="text"
          name="title"
          // required
          defaultValue={event ? event.title : ""}
        />
        {cmtError ? cmtError.title : ""}
      </p>
      <p>
        <label htmlFor="image">Image</label>
        <input
          id="image"
          type="url"
          name="image"
          // required
          defaultValue={event ? event.image : ""}
        />
        {cmtError ? cmtError.image : ""}
      </p>
      <p>
        <label htmlFor="date">Date</label>
        <input
          id="date"
          type="date"
          name="date"
          // required
          defaultValue={event ? event.date : ""}
        />
      </p>
      <p>
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          name="description"
          rows="5"
          // required
          defaultValue={event ? event.description : ""}
        />
      </p>
      <div className={classes.actions}>
        <button type="button" onClick={cancelHandler}>
          Cancel
        </button>
        <button> {isSubmitting ? "is Submitting" : "save"}</button>
      </div>
    </Form>
  );
}

export default EventForm;
