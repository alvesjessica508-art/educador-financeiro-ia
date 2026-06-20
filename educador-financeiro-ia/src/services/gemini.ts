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
  try {
    const prompt = `
Você é um consultor financeiro pessoal.

Crie um relatório estruturado e fácil de entender com:

- Diagnóstico financeiro
- Principais problemas
- Sugestões práticas de melhoria
- Nota de saúde financeira (0 a 100)

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

    if (!data?.candidates?.length) {
      return "Erro: IA não retornou resposta.";
    }

    return data.candidates[0].content.parts[0].text;
  } catch (error) {
    console.error("Erro Gemini:", error);
    return "Erro ao gerar análise financeira.";
  }
}