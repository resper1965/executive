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
        await supabase
          .from("tenants")
          .update({
            subscription_plan: planId,
            subscription_status: "active",
          })
          .eq("id", tenantId);
      }
      break;
    }

    case "customer.subscription.updated": {
      const subscription = event.data.object;
      const { tenantId } = subscription.metadata || {};
      const status = subscription.status;

      if (tenantId) {
        await supabase
          .from("tenants")
          .update({
            subscription_status: status === "active" ? "active" : "past_due",
          })
          .eq("id", tenantId);
      }
      break;
    }

    case "customer.subscription.deleted": {
      const subscription = event.data.object;
      const { tenantId } = subscription.metadata || {};

      if (tenantId) {
        await supabase
          .from("tenants")
          .update({
            subscription_plan: "free",
            subscription_status: "cancelled",
          })
          .eq("id", tenantId);
      }
      break;
    }
  }

  return NextResponse.json({ received: true });
}
