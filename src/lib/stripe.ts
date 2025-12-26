import Stripe from "stripe";

// Lazy initialization to avoid build-time errors
let stripeInstance: Stripe | null = null;

export function getStripe(): Stripe {
  if (!stripeInstance) {
    if (!process.env.STRIPE_SECRET_KEY) {
      throw new Error("STRIPE_SECRET_KEY is not set");
    }
    stripeInstance = new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: "2024-12-18.acacia",
      typescript: true,
    });
  }
  return stripeInstance;
}

// Subscription plans configuration
export const PLANS = {
  free: {
    name: "Starter",
    price: 0,
    priceId: null, // No Stripe price for free plan
    features: [
      "Subdomínio personalizado",
      "Até 5 artigos",
      "Tema básico",
      "Suporte por email",
    ],
  },
  professional: {
    name: "Professional",
    price: 97,
    priceId: process.env.STRIPE_PRICE_PROFESSIONAL,
    features: [
      "Tudo do Starter",
      "Artigos ilimitados",
      "Chatbot com IA",
      "6 temas premium",
      "Google Analytics",
      "Suporte prioritário",
    ],
  },
  enterprise: {
    name: "Enterprise",
    price: 297,
    priceId: process.env.STRIPE_PRICE_ENTERPRISE,
    features: [
      "Tudo do Professional",
      "Domínio customizado",
      "IA avançada",
      "Múltiplos usuários",
      "API access",
      "Suporte VIP",
    ],
  },
} as const;

export type PlanType = keyof typeof PLANS;
