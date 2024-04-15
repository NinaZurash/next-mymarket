import { Resend } from "resend";

export default function ResetPage() {
  const resend = new Resend("re_Tivf8UeN_FD7aECikyuYYwN3K3HJ783mP");

  resend.emails.send({
    from: "onboarding@resend.dev",
    to: "nini.zurashvili@gmail.com",
    subject: "Hello World",
    html: "<p>Congrats on sending your <strong>first email</strong>!</p>",
  });

  return <div>ResetPage</div>;
}
