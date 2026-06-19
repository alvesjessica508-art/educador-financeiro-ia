const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

export async function gerarAnaliseFinanceira(dados: any) {
  const prompt = `
Você é um consultor financeiro pessoal.

Analise os dados abaixo e gere:
- Diagnóstico financeiro
- Pontos de atenção
- Recomendações práticas
- Nota de saúde financeira (0 a 100)

Dados do usuário:
${JSON.stringify(dados, null, 2)}
`;

  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: prompt
              }
            ]
          }
        ]
      })
    }
  );

  const data = await response.json();

  return data.candidates?.[0]?.content?.parts?.[0]?.text;
}