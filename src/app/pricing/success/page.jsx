import { redirect } from "next/navigation";
import SuccessContent from "@/app/components/SuccessContent";
import { stripe } from "@/lib/stripe";
import { createSubscription } from "@/lib/actions/subscription";

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
    metadata
  } = session;
  
  console.log("Stripe Metadata:", metadata);

  if (status === "open") {
    return redirect("/dashboard/user");
  }

  if (status === "complete") {
  
    const subscriptionInfo = {
      email: customerEmail,
      plan: metadata?.planId || "user_free" 
    };

    await createSubscription(subscriptionInfo);

    return (
      <SuccessContent customerEmail={customerEmail} />
    );
  }

  return redirect("/");
}