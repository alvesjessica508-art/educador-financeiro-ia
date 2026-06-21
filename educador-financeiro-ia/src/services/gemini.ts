export async function gerarAnaliseFinanceira(dados: any): Promise<string> {
  try {
    const response = await fetch("/api/analisar", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dados),
    });

    const data = await response.json();

    if (!response.ok) {
      return `Erro: ${data?.error || "Erro desconhecido"}`;
    }

    return data.resultado;
  } catch (error: any) {
    return `Erro ao conectar com a IA: ${error?.message || "desconhecido"}`;
  }
}