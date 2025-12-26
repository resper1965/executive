import { NextRequest, NextResponse } from "next/server";
import { getStripe, PLANS } from "@/lib/stripe";
import { createClient } from "@/lib/supabase/server";

export async function POST(req: NextRequest) {
  try {
    const { planId, tenantId } = await req.json();

    if (!planId || !PLANS[planId as keyof typeof PLANS]) {
      return NextResponse.json(
        { error: "Plano inválido" },
        { status: 400 }
      );
    }

    const plan = PLANS[planId as keyof typeof PLANS];

    if (!plan.priceId) {
      return NextResponse.json(
        { error: "Plano gratuito não requer checkout" },
        { status: 400 }
      );
    }

    // Get tenant info
    const supabase = await createClient();
    const { data: tenant } = await supabase
      .from("tenants")
      .select("*")
      .eq("id", tenantId)
      .single();

    if (!tenant) {
      return NextResponse.json(
        { error: "Tenant não encontrado" },
        { status: 404 }
      );
    }

    // Create Stripe checkout session
    const stripe = getStripe();
    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      payment_method_types: ["card"],
      line_items: [
        {
          price: plan.priceId,
          quantity: 1,
        },
      ],
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/admin/settings?success=true`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/admin/settings?canceled=true`,
      metadata: {
        tenantId,
        planId,
      },
      subscription_data: {
        metadata: {
          tenantId,
          planId,
        },
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("Checkout error:", error);
    return NextResponse.json(
      { error: "Erro ao criar checkout" },
      { status: 500 }
    );
  }
}
