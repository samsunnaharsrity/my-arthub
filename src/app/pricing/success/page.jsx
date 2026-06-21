import { redirect } from "next/navigation";
import SuccessContent from "@/app/components/SuccessContent";
import { stripe } from "@/lib/stripe";

export default async function Success({ searchParams }) {
  const { session_id } = await searchParams;

  if (!session_id) {
    throw new Error("Invalid session");
  }

  const session = await stripe.checkout.sessions.retrieve(
    session_id,
    {
      expand: ["line_items", "payment_intent"],
    }
  );

  const {
    status,
    customer_details: { email: customerEmail },
  } = session;

  if (status === "open") {
    return redirect("/");
  }

  if (status === "complete") {
    return (
      <SuccessContent customerEmail={customerEmail} />
    );
  }

  return redirect("/");
}