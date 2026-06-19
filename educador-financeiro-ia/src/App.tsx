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
    lazer: ""
  });

  return (
    <div>
      <h1>Educador Financeiro IA</h1>

      {/* Etapa 1 */}
      {step === 1 && (
        <div>
          <h2>Etapa 1 - Dados Pessoais</h2>

          <input
            type="text"
            placeholder="Nome"
            value={formData.nome}
            onChange={(e) =>
              setFormData({ ...formData, nome: e.target.value })
            }
            style={{ display: "block", marginBottom: "10px" }}
          />

          <input
            type="number"
            placeholder="Idade"
            value={formData.idade}
            onChange={(e) =>
              setFormData({ ...formData, idade: e.target.value })
            }
            style={{ display: "block" }}
          />
        </div>
      )}

      {/* Etapa 2 */}
      {step === 2 && (
        <div>
          <h2>Etapa 2 - Receitas</h2>

          <input
            type="number"
            placeholder="Salário"
            value={formData.salario}
            onChange={(e) =>
              setFormData({ ...formData, salario: e.target.value })
            }
            style={{ display: "block", marginBottom: "10px" }}
          />

          <input
            type="number"
            placeholder="Renda Extra"
            value={formData.rendaExtra}
            onChange={(e) =>
              setFormData({ ...formData, rendaExtra: e.target.value })
            }
            style={{ display: "block" }}
          />
        </div>
      )}

      {/* Etapa 3 */}
      {step === 3 && (
        <div>
          <h2>Etapa 3 - Despesas</h2>

          <input
            type="number"
            placeholder="Moradia"
            value={formData.moradia}
            onChange={(e) =>
              setFormData({ ...formData, moradia: e.target.value })
            }
            style={{ display: "block", marginBottom: "10px" }}
          />

          <input
            type="number"
            placeholder="Transporte"
            value={formData.transporte}
            onChange={(e) =>
              setFormData({ ...formData, transporte: e.target.value })
            }
            style={{ display: "block", marginBottom: "10px" }}
          />

          <input
            type="number"
            placeholder="Alimentação"
            value={formData.alimentacao}
            onChange={(e) =>
              setFormData({ ...formData, alimentacao: e.target.value })
            }
            style={{ display: "block", marginBottom: "10px" }}
          />

          <input
            type="number"
            placeholder="Lazer"
            value={formData.lazer}
            onChange={(e) =>
              setFormData({ ...formData, lazer: e.target.value })
            }
            style={{ display: "block" }}
          />
        </div>
      )}

      {/* Etapa 4 */}
      {step === 4 && (
        <div>
          <h2>Etapa 4 - Objetivos</h2>
        </div>
      )}

      {/* Etapa 5 */}
      {step === 5 && (
        <div>
          <h2>Etapa 5 - Análise IA</h2>

          <button
            onClick={async () => {
              try {
                const { gerarAnaliseFinanceira } = await import("./services/gemini");

                const resultado = await gerarAnaliseFinanceira(formData);

                console.log("Resposta da IA:", resultado);

                alert(resultado);
              } catch (error) {
                console.error(error);
                alert("Erro ao gerar análise da IA");
              }
            }}
          >
            Gerar análise com IA
          </button>
        </div>
      )}

      {/* Botões */}
      <div style={{ marginTop: "20px" }}>
        {step > 1 && (
          <button onClick={() => setStep(step - 1)}>
            Voltar
          </button>
        )}

        {step < 5 && (
          <button
            onClick={() => setStep(step + 1)}
            style={{ marginLeft: "10px" }}
          >
            Próximo
          </button>
        )}
      </div>
    </div>
  );
}

export default App;