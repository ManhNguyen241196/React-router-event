import { useEffect } from "react";
import classes from "./NewsletterSignup.module.css";
import { useFetcher } from "react-router-dom";
function NewsletterSignup() {
  // phan dien vaof input gui du lieu nayf
  //xđược đưa thành dưới dạng form để thuận tiện cho viêc gửi dữ liệu
  const fetcher = useFetcher();
  const { data, state } = fetcher;

  useEffect(() => {
    if (state === "idle" && data && data.message) {
      window.alert(data.message);
    }
    if (state === "loading") {
      console.log("loading");
    }
  }, [data, state]);
  return (
    <fetcher.Form
      method="post"
      action="/newsletter"
      className={classes.newsletter}
    >
      <input
        type="email"
        name="email"
        placeholder="Sign up for newsletter..."
        aria-label="Sign up for newsletter"
      />
      <button type="submit">Sign up</button>
    </fetcher.Form>
  );
}

export default NewsletterSignup;
