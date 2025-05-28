function Filtro({ buscaNome, setBuscaNome, filtroTipo, setFiltroTipo, tipos }) {
  return (
    <div style={{ textAlign: 'center', marginBottom: '20px' }}>
      {/* Container com ícone de lupa embutido */}
      <div style={{ display: 'inline-block', position: 'relative', marginRight: '10px' }}>
        {/* Ícone de lupa*/}
        <span style={{
          position: 'absolute',
          left: '10px',
          top: '50%',
          transform: 'translateY(-50%)',
          fontSize: '16px',
          color: '#aaa'
        }}>
          🔍
        </span>

        {/* Campo de busca com espaço pro ícone */}
        <input
          type="text"
          placeholder="Buscar por nome..."
          value={buscaNome}
          onChange={(e) => setBuscaNome(e.target.value)}
          style={{
            padding: '8px 12px 8px 32px', // padding-left aumentado pra dar espaço à lupa
            fontSize: '16px',
            borderRadius: '8px',
            border: '1px solid #ccc',
            width: '250px'
          }}
        />
      </div>

      {/* Dropdown de filtro por tipo */}
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
