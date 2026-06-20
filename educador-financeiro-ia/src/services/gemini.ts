const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

export async function gerarAnaliseFinanceira(dados: any): Promise<string> {
  try {
    if (!API_KEY) {
      return "Erro: API Key não configurada (VITE_GEMINI_API_KEY).";
    }

    const prompt = `
Você é um consultor financeiro pessoal especialista em educação financeira.

Crie um relatório claro, humano e estruturado:

1. Diagnóstico financeiro
2. Principais problemas
3. Sugestões práticas
4. Nota de saúde financeira (0 a 100)

Use linguagem simples e objetiva.

Dados do usuário:
${JSON.stringify(dados, null, 2)}
`;

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [{ text: prompt }]
            }
          ]
        })
      }
    );

    const data = await response.json();

    console.log("🔥 GEMINI RESPONSE:", data);

    if (!response.ok) {
      return `Erro HTTP: ${response.status}`;
    }

    const text =
      data?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!text) {
      console.log("Resposta inválida:", data);
      return "IA não retornou resposta. Verifique API Key ou quota.";
    }

    return text;
  } catch (error) {
    console.error("Erro Gemini:", error);
    return "Erro ao conectar com a IA.";
  }
}