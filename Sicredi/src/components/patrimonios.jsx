import { useEffect, useState } from "react";
import axios from "axios";

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
      const res = await axios.get("http://localhost:5000/api/patrimonios");
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
      await axios.post("http://localhost:5000/api/patrimonios", form);
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
    <div style={{ padding: "2rem" }}>
      <h2>Cadastro de Patrimônio</h2>
      <form onSubmit={handleSubmit} style={{ marginBottom: "2rem" }}>
        <input
          type="text"
          name="codigo_patrimonio"
          placeholder="Código"
          value={form.codigo_patrimonio}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="descricao"
          placeholder="Descrição"
          value={form.descricao}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="categoria_id"
          placeholder="Categoria ID"
          value={form.categoria_id}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="agencia_id"
          placeholder="Agência ID"
          value={form.agencia_id}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="valor"
          placeholder="Valor"
          value={form.valor}
          onChange={handleChange}
        />
        <select name="status" value={form.status} onChange={handleChange}>
          <option value="Em uso">Em uso</option>
          <option value="Quebrado">Quebrado</option>
          <option value="Manutenção">Manutenção</option>
        </select>
        <button type="submit">Cadastrar</button>
      </form>

      <h2>Lista de Patrimônios</h2>
      <table border="1" cellPadding="5">
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
              <td>{p.valor}</td>
              <td>{p.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Patrimonios;
