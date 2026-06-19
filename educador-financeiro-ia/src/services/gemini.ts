const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

type FormDataType = {
  nome: string;
  idade: string;
  salario: string;
  rendaExtra: string;
  moradia: string;
  transporte: string;
  alimentacao: string;
  lazer: string;
};

export async function gerarAnaliseFinanceira(dados: FormDataType): Promise<string> {
  const prompt = `
Você é um consultor financeiro pessoal.

Analise os dados do usuário e gere:

- Diagnóstico financeiro
- Problemas encontrados
- Recomendações práticas
- Nota de saúde financeira (0 a 100)

Dados:
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

  return data.candidates?.[0]?.content?.parts?.[0]?.text;
}