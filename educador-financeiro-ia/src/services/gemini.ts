const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

if (!API_KEY) {
  console.warn("VITE_GEMINI_API_KEY não encontrada");
}

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

export async function gerarAnaliseFinanceira(dados: any): Promise<string> {
  if (!API_KEY) {
    return "Erro: API Key não configurada.";
  }

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

  const MAX_RETRIES = 3;

  for (let tentativa = 0; tentativa < MAX_RETRIES; tentativa++) {
    try {
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
                role: "user",
                parts: [{ text: prompt }],
              },
            ],
          }),
        }
      );

      const data = await response.json();

      console.log(`🔥 GEMINI RAW RESPONSE (tentativa ${tentativa + 1}):`, data);

      // Rate limit — espera e tenta de novo
      if (response.status === 429) {
        const waitMs = Math.pow(2, tentativa) * 1500; // 1.5s, 3s, 6s
        console.warn(`⚠️ Rate limit atingido. Aguardando ${waitMs}ms antes de tentar novamente...`);
        await sleep(waitMs);
        continue;
      }

      if (!response.ok) {
        return `Erro HTTP ${response.status}: ${
          data?.error?.message || "Erro desconhecido"
        }`;
      }

      const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;

      if (!text) {
        return "IA não retornou resposta (estrutura inválida).";
      }

      return text;
    } catch (error: any) {
      console.error(`Erro Gemini (tentativa ${tentativa + 1}):`, error);

      if (tentativa === MAX_RETRIES - 1) {
        return `Erro ao conectar com IA: ${error?.message || "desconhecido"}`;
      }

      await sleep(1000 * (tentativa + 1));
    }
  }

  return "Limite de tentativas atingido. Aguarde alguns segundos e tente novamente.";
}