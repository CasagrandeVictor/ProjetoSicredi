import { useEffect, useState } from "react";
import axios from "axios";
import "./patrimonios.css"

function Patrimonios() {
  const [patrimonios, setPatrimonios] = useState([]);
  const [form, setForm] = useState({
    codigo_patrimonio: "",
    descricao: "",
    categoria_id: "",
    agencia_id: "",
    valor: "",
    status: "Em uso",
  });

  const fetchPatrimonios = async () => {
    try {
      const res = await axios.get("http://127.0.0.1:5000/api/patrimonios/");
      setPatrimonios(res.data);
    } catch (err) {
      console.error("Erro ao buscar patrimônios:", err);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://127.0.0.1:5000/api/patrimonios/", form);
      setForm({
        codigo_patrimonio: "",
        descricao: "",
        categoria_id: "",
        agencia_id: "",
        valor: "",
        status: "Em uso",
      });
      fetchPatrimonios(); // atualiza a lista
    } catch (err) {
      console.error("Erro ao cadastrar:", err);
    }
  };

  useEffect(() => {
    fetchPatrimonios();
  }, []);

  return (
    <div className="sicredi-container">
      <header className="sicredi-header">
        <div className="sicredi-logo">
          <div className="logo-icon"></div>
          <span className="logo-text">Sicredi</span>
        </div>
        <h1 className="page-title">Sistema de Gestão de Patrimônio</h1>
      </header>

      <main className="main-content">
        <section className="form-section">
          <div className="form-card">
            <h2 className="section-title">Cadastro de Patrimônio</h2>
            <form onSubmit={handleSubmit} className="patrimonio-form">
              <div className="form-grid">
                <div className="form-group">
                  <label htmlFor="codigo_patrimonio">Código do Patrimônio</label>
                  <input
                    type="text"
                    id="codigo_patrimonio"
                    name="codigo_patrimonio"
                    placeholder="Digite o código"
                    value={form.codigo_patrimonio}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="descricao">Descrição</label>
                  <input
                    type="text"
                    id="descricao"
                    name="descricao"
                    placeholder="Descrição do patrimônio"
                    value={form.descricao}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="categoria_id">Categoria ID</label>
                  <input
                    type="number"
                    id="categoria_id"
                    name="categoria_id"
                    placeholder="ID da categoria"
                    value={form.categoria_id}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="agencia_id">Agência ID</label>
                  <input
                    type="number"
                    id="agencia_id"
                    name="agencia_id"
                    placeholder="ID da agência"
                    value={form.agencia_id}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="valor">Valor</label>
                  <input
                    type="number"
                    id="valor"
                    name="valor"
                    placeholder="Valor do patrimônio"
                    value={form.valor}
                    onChange={handleChange}
                    step="0.01"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="status">Status</label>
                  <select id="status" name="status" value={form.status} onChange={handleChange}>
                    <option value="Em uso">Em uso</option>
                    <option value="Quebrado">Quebrado</option>
                    <option value="Manutenção">Manutenção</option>
                  </select>
                </div>
              </div>

              <button type="submit" className="submit-btn">
                <span>Cadastrar Patrimônio</span>
              </button>
            </form>
          </div>
        </section>

        <section className="table-section">
          <div className="table-card">
            <h2 className="section-title">Lista de Patrimônios</h2>
            <div className="table-container">
              <table className="patrimonios-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Código</th>
                    <th>Descrição</th>
                    <th>Categoria</th>
                    <th>Agência</th>
                    <th>Valor</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {patrimonios.map((p) => (
                    <tr key={p.id}>
                      <td>{p.id}</td>
                      <td>{p.codigo_patrimonio}</td>
                      <td>{p.descricao}</td>
                      <td>{p.categoria_id}</td>
                      <td>{p.agencia_id}</td>
                      <td>
                        {p.valor ? 
                          new Intl.NumberFormat('pt-BR', {
                            style: 'currency',
                            currency: 'BRL'
                          }).format(p.valor) 
                          : '-'
                        }
                      </td>
                      <td>
                        <span className={`status-badge status-${p.status.toLowerCase().replace(' ', '-')}`}>
                          {p.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default Patrimonios;

