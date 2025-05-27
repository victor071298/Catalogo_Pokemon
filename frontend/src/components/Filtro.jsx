function Filtro({ buscaNome, setBuscaNome, filtroTipo, setFiltroTipo, tipos }) {
  return (
    <div style={{ textAlign: 'center', marginBottom: '20px' }}>
      <input
        type="text"
        placeholder="Buscar por nome..."
        value={buscaNome}
        onChange={(e) => setBuscaNome(e.target.value)}
        style={{
          padding: '8px 12px',
          fontSize: '16px',
          borderRadius: '8px',
          border: '1px solid #ccc',
          width: '250px',
          marginRight: '10px'
        }}
      />

      <select
        value={filtroTipo}
        onChange={(e) => setFiltroTipo(e.target.value)}
        style={{
          padding: '8px 12px',
          fontSize: '16px',
          borderRadius: '8px',
          border: '1px solid #ccc',
          width: '180px'
        }}
      >
        <option value="">Todos os tipos</option>
        {tipos.map(tipo => (
          <option key={tipo.codigo} value={tipo.nome}>{tipo.nome}</option>
        ))}
      </select>
    </div>
  );
}

export default Filtro;
