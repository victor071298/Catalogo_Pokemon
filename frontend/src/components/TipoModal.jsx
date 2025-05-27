function TipoModal({
  aberto,
  editando,
  novoTipo,
  setNovoTipo,
  onFechar,
  onSalvar
}) {
  if (!aberto) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundColor: 'rgba(0,0,0,0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 9999
    }}>
      <div style={{
        background: 'white',
        padding: '24px',
        borderRadius: '12px',
        width: '320px'
      }}>
        <h2>{editando ? 'Editar Tipo' : 'Novo Tipo'}</h2>

        <label>Nome do Tipo*:<br />
          <input
            type="text"
            value={novoTipo}
            onChange={(e) => setNovoTipo(e.target.value)}
            style={{ width: '100%', padding: '8px', marginBottom: '16px' }}
          />
        </label>

        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
          <button onClick={onFechar} style={{ padding: '8px 12px' }}>Cancelar</button>
          <button
            onClick={onSalvar}
            style={{ padding: '8px 12px', backgroundColor: '#2196F3', color: 'white', border: 'none' }}
          >
            Salvar
          </button>
        </div>
      </div>
    </div>
  );
}

export default TipoModal;