import { NextRequest, NextResponse } from "next/server";
import { getStripe } from "@/lib/stripe";
import { createClient } from "@/lib/supabase/server";

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(req: NextRequest) {
  const body = await req.text();
  const signature = req.headers.get("stripe-signature")!;

  let event;

  try {
    const stripe = getStripe();
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (err) {
    console.error("Webhook signature verification failed:", err);
    return NextResponse.json(
      { error: "Webhook signature verification failed" },
      { status: 400 }
    );
  }

  const supabase = await createClient();

  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object;
      const { tenantId, planId } = session.metadata || {};

      if (tenantId && planId) {
        const { error } = await supabase
          .from("tenants")
          .update({
            subscription_plan: planId,
            subscription_status: "active",
          })
          .eq("id", tenantId);

        if (error) {
          console.error("Error updating tenant subscription:", error);
          return NextResponse.json(
            { error: "Failed to update subscription" },
            { status: 500 }
          );
        }
      } else {
        console.warn("Missing tenantId or planId in checkout session metadata");
      }
      break;
    }

    case "customer.subscription.updated": {
      const subscription = event.data.object;
      const { tenantId } = subscription.metadata || {};
      const status = subscription.status;

      if (tenantId) {
        const { error } = await supabase
          .from("tenants")
          .update({
            subscription_status: status === "active" ? "active" : "past_due",
          })
          .eq("id", tenantId);

        if (error) {
          console.error("Error updating tenant subscription status:", error);
          return NextResponse.json(
            { error: "Failed to update subscription status" },
            { status: 500 }
          );
        }
      } else {
        console.warn("Missing tenantId in subscription update metadata");
      }
      break;
    }

    case "customer.subscription.deleted": {
      const subscription = event.data.object;
      const { tenantId } = subscription.metadata || {};

      if (tenantId) {
        const { error } = await supabase
          .from("tenants")
          .update({
            subscription_plan: "free",
            subscription_status: "cancelled",
          })
          .eq("id", tenantId);

        if (error) {
          console.error("Error cancelling tenant subscription:", error);
          return NextResponse.json(
            { error: "Failed to cancel subscription" },
            { status: 500 }
          );
        }
      } else {
        console.warn("Missing tenantId in subscription deletion metadata");
      }
      break;
    }

    default:
      console.log(`Unhandled webhook event type: ${event.type}`);
  }

  return NextResponse.json({ received: true });
}
