import { openai } from "@ai-sdk/openai";
import { streamText } from "ai";
import { createClient } from "@/lib/supabase/server";
import { z } from "zod";

export const runtime = "edge";

const chatRequestSchema = z.object({
  messages: z.array(
    z.object({
      role: z.enum(["user", "assistant", "system"]),
      content: z.string().min(1).max(10000),
    })
  ).min(1).max(50),
  tenantId: z.string().uuid().optional(),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // Validate input
    const validation = chatRequestSchema.safeParse(body);
    if (!validation.success) {
      return new Response(
        JSON.stringify({ error: "Invalid request format", details: validation.error.flatten() }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const { messages, tenantId } = validation.data;

    // Get tenant info for personalized context
    let tenantContext = "Você é o assistente virtual da plataforma Executive.";
    
    if (tenantId) {
      const supabase = await createClient();
      const { data: tenant } = await supabase
        .from("tenants")
        .select("name, settings")
        .eq("id", tenantId)
        .single();
      
      if (tenant) {
        tenantContext = `Você é o assistente virtual de ${tenant.name}.`;
      }
    }

    const systemPrompt = `${tenantContext}
Você é um assistente especializado em saúde suplementar, gestão executiva e consultoria estratégica.

Suas responsabilidades:
- Responder dúvidas sobre serviços oferecidos
- Ajudar visitantes a entender como podem se beneficiar da consultoria
- Sugerir agendamento de reunião quando apropriado
- Ser cordial, profissional e objetivo

Responda sempre em português brasileiro.
Mantenha respostas concisas (máximo 3 parágrafos).
Se não souber algo específico, sugira entrar em contato diretamente.`;

    const result = streamText({
      model: openai("gpt-4o-mini"),
      system: systemPrompt,
      messages,
    });

    return result.toTextStreamResponse();
  } catch (error) {
    console.error("Chat API error:", error);
    return new Response(
      JSON.stringify({ error: "Erro ao processar mensagem" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
