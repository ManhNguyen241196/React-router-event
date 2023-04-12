import NewsletterSignup from "../components/NewsletterSignup";
import PageContent from "../components/PageContent";

function NewsletterPage() {
  return (
    <PageContent title="Join our awesome newsletter!">
      <NewsletterSignup />
    </PageContent>
  );
}

export default NewsletterPage;

export async function action({ request, params }) {
  const data = await request.formData();
  const email = data.get("email");
  console.log(email);

  // send to backend newsletter server ...
  return { message: "Signup successful!" };
}
