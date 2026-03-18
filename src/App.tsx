import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [valor, setValor] = useState('');
  const [listaInvestidores, setListaInvestidores] = useState<any[]>([]);

  // 1. Função para carregar os dados
  const carregarInvestidores = async () => {
    try {
      const res = await fetch('http://localhost:3000/investidores');
      const dados = await res.json();
      setListaInvestidores(dados);
    } catch (err) {
      console.error("Erro ao carregar lista");
    }
  };

  useEffect(() => {
    carregarInvestidores();
  }, []);

  // 2. Função para eliminar um investidor
  const eliminarInvestidor = async (id: string | number) => {
    if (window.confirm("Tem certeza que deseja eliminar este registo?")) {
      try {
        await fetch(`http://localhost:3000/investidores/${id}`, {
          method: 'DELETE',
        });
        // Atualiza a lista após eliminar
        carregarInvestidores();
      } catch (err) {
        alert("Erro ao eliminar o registo.");
      }
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const novo = { nome, email, valor };
    await fetch('http://localhost:3000/investidores', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(novo)
    });
    setNome(''); setEmail(''); setValor('');
    carregarInvestidores();
  }

  return (
    <div className="container" style={{ maxWidth: '850px' }}>
      <h1>INSTITUTO IMPRINTING</h1>
      <h3>Captação de Investidores Estratégicos</h3>

      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Nome" value={nome} onChange={(e) => setNome(e.target.value)} required />
        <input type="email" placeholder="E-mail" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input type="number" placeholder="Valor R$" value={valor} onChange={(e) => setValor(e.target.value)} required />
        <button type="submit">CADASTRAR INTERESSE</button>
      </form>

      <hr style={{ margin: '40px 0', borderColor: '#333' }} />
      <h2 style={{ color: '#22d3ee' }}>Painel do Administrador</h2>

      import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

// Dentro do seu componente App, antes do return:
const dadosGrafico = listaInvestidores.map(inv => ({
  name: inv.nome,
  valor: Number(inv.valor)
}));

// No seu HTML (JSX), antes da <table>:
<div style={{ width: '100%', height: 300, marginTop: '20px' }}>
  <h3 style={{ color: '#22d3ee' }}>Resumo de Investimentos</h3>
  <ResponsiveContainer>
    <BarChart data={dadosGrafico}>
      <XAxis dataKey="name" stroke="#fff" />
      <YAxis stroke="#fff" />
      <Tooltip contentStyle={{ backgroundColor: '#333', border: 'none' }} />
      <Bar dataKey="valor" fill="#a855f7" radius={[5, 5, 0, 0]} />
    </BarChart>
  </ResponsiveContainer>
</div>
      
      <table style={{ width: '100%', marginTop: '20px', borderCollapse: 'collapse', color: '#fff' }}>
        <thead>
          <tr style={{ borderBottom: '2px solid #a855f7' }}>
            <th style={{ padding: '10px' }}>Nome</th>
            <th style={{ padding: '10px' }}>E-mail</th>
            <th style={{ padding: '10px' }}>Valor (R$)</th>
            <th style={{ padding: '10px' }}>Ações</th>
          </tr>
        </thead>
        <tbody>
          {listaInvestidores.map((inv) => (
            <tr key={inv.id} style={{ borderBottom: '1px solid #333' }}>
              <td style={{ padding: '10px' }}>{inv.nome}</td>
              <td style={{ padding: '10px' }}>{inv.email}</td>
              <td style={{ padding: '10px' }}>{inv.valor}</td>
              <td style={{ padding: '10px' }}>
                <button 
                  onClick={() => eliminarInvestidor(inv.id)}
                  style={{ 
                    backgroundColor: '#ff4d4d', 
                    padding: '5px 10px', 
                    fontSize: '0.7rem', 
                    width: 'auto',
                    boxShadow: '0 0 5px #ff4d4d'
                  }}
                >
                  X
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      
      <div className="footer">Desenvolvido por Humberto - Rid 164504</div>
    </div>
  )
}

export default App