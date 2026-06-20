import { useState } from "react";

function App() {
  const [step, setStep] = useState(1);

  const [formData, setFormData] = useState({
    nome: "",
    idade: "",
    salario: "",
    rendaExtra: "",
    moradia: "",
    transporte: "",
    alimentacao: "",
    lazer: "",
    objetivo: "",
    valorObjetivo: "",
    prazo: ""
  });

  const container = {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #6B73FF 0%, #000DFF 100%)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "20px"
  };

  const card = {
    width: "100%",
    maxWidth: "520px",
    background: "#fff",
    borderRadius: "20px",
    padding: "24px",
    boxShadow: "0 20px 60px rgba(0,0,0,0.25)"
  };

  const input = {
    width: "100%",
    padding: "12px",
    marginBottom: "12px",
    borderRadius: "10px",
    border: "1px solid #ddd",
    outline: "none"
  };

  const button = {
    padding: "10px 14px",
    borderRadius: "10px",
    border: "none",
    cursor: "pointer",
    fontWeight: 600
  };

  const primary = {
    ...button,
    background: "#4F46E5",
    color: "#fff"
  };

  const secondary = {
    ...button,
    background: "#E5E7EB",
    color: "#111"
  };

  return (
    <div style={container}>
      <div style={card}>
        <h2 style={{ marginBottom: 5 }}>💰 Educador Financeiro IA</h2>
        <p style={{ marginTop: 0, color: "#666" }}>
          Organize sua vida financeira em poucos passos
        </p>

        {/* STEP 1 */}
        {step === 1 && (
          <>
            <h3>Dados pessoais</h3>

            <input
              style={input}
              placeholder="Nome"
              value={formData.nome}
              onChange={(e) =>
                setFormData({ ...formData, nome: e.target.value })
              }
            />

            <input
              style={input}
              placeholder="Idade"
              type="number"
              value={formData.idade}
              onChange={(e) =>
                setFormData({ ...formData, idade: e.target.value })
              }
            />
          </>
        )}

        {/* STEP 2 */}
        {step === 2 && (
          <>
            <h3>Receitas</h3>

            <input
              style={input}
              placeholder="Salário"
              type="number"
              value={formData.salario}
              onChange={(e) =>
                setFormData({ ...formData, salario: e.target.value })
              }
            />

            <input
              style={input}
              placeholder="Renda extra"
              type="number"
              value={formData.rendaExtra}
              onChange={(e) =>
                setFormData({ ...formData, rendaExtra: e.target.value })
              }
            />
          </>
        )}

        {/* STEP 3 */}
        {step === 3 && (
          <>
            <h3>Despesas</h3>

            <input style={input} placeholder="Moradia"
              value={formData.moradia}
              onChange={(e) =>
                setFormData({ ...formData, moradia: e.target.value })
              }
            />

            <input style={input} placeholder="Transporte"
              value={formData.transporte}
              onChange={(e) =>
                setFormData({ ...formData, transporte: e.target.value })
              }
            />

            <input style={input} placeholder="Alimentação"
              value={formData.alimentacao}
              onChange={(e) =>
                setFormData({ ...formData, alimentacao: e.target.value })
              }
            />

            <input style={input} placeholder="Lazer"
              value={formData.lazer}
              onChange={(e) =>
                setFormData({ ...formData, lazer: e.target.value })
              }
            />
          </>
        )}

        {/* STEP 4 */}
        {step === 4 && (
          <>
            <h3>Objetivo financeiro</h3>

            <input
              style={input}
              placeholder="Ex: Comprar uma casa"
              value={formData.objetivo}
              onChange={(e) =>
                setFormData({ ...formData, objetivo: e.target.value })
              }
            />

            <input
              style={input}
              placeholder="Valor desejado"
              type="number"
              value={formData.valorObjetivo}
              onChange={(e) =>
                setFormData({ ...formData, valorObjetivo: e.target.value })
              }
            />

            <input
              style={input}
              placeholder="Prazo (meses)"
              type="number"
              value={formData.prazo}
              onChange={(e) =>
                setFormData({ ...formData, prazo: e.target.value })
              }
            />
          </>
        )}

        {/* STEP 5 */}
        {step === 5 && (
          <>
            <h3>Análise IA</h3>

            <button
              style={primary}
              onClick={async () => {
                const { gerarAnaliseFinanceira } = await import(
                  "./services/gemini"
                );

                const resultado = await gerarAnaliseFinanceira(formData);

                alert(resultado);
              }}
            >
              Gerar análise inteligente
            </button>
          </>
        )}

        {/* NAVIGATION */}
        <div style={{ marginTop: 20, display: "flex", gap: 10 }}>
          {step > 1 && (
            <button style={secondary} onClick={() => setStep(step - 1)}>
              Voltar
            </button>
          )}

          {step < 5 && (
            <button style={primary} onClick={() => setStep(step + 1)}>
              Próximo
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;