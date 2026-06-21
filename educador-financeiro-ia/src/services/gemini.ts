```ts
const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

export async function gerarAnaliseFinanceira(dados: any): Promise<string> {
  try {
    if (!API_KEY) {
      return "Erro: API Key não configurada.";
    }

    const prompt = `
Você é um consultor financeiro pessoal.

Crie um relatório estruturado:

1. Diagnóstico financeiro
2. Problemas encontrados
3. Sugestões práticas
4. Nota de saúde financeira (0 a 100)

Dados:
${JSON.stringify(dados, null, 2)}
`;

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [{ text: prompt }],
            },
          ],
        }),
      }
    );

    const data = await response.json();

    console.log("GEMINI RESPONSE:", data);

    if (!response.ok) {
      console.log("ERRO COMPLETO:", data);
      return JSON.stringify(data, null, 2);
    }

    const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!text) {
      console.log("Resposta inválida:", data);
      return "IA não retornou resposta.";
    }

    return text;
  } catch (error) {
    console.error("Erro Gemini:", error);
    return "Erro ao conectar com a IA.";
  }
}
```
