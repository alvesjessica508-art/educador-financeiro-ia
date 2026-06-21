import type { VercelRequest, VercelResponse } from "@vercel/node";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método não permitido" });
  }

  const dados = req.body;

  const prompt = `
Você é um consultor financeiro pessoal especialista.

Crie um relatório estruturado e direto:

1. Diagnóstico financeiro
2. Problemas encontrados
3. Sugestões práticas
4. Nota de saúde financeira (0 a 100)

Seja claro, objetivo e humano.

Dados do usuário:
${JSON.stringify(dados, null, 2)}
`;

  try {
    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.ANTHROPIC_API_KEY || "",
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-haiku-4-5-20251001",
        max_tokens: 1024,
        messages: [{ role: "user", content: prompt }],
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json({ error: data?.error?.message || "Erro desconhecido" });
    }

    const texto = data?.content?.[0]?.text;
    return res.status(200).json({ resultado: texto });
  } catch (error: any) {
    return res.status(500).json({ error: error?.message || "Erro interno" });
  }
}