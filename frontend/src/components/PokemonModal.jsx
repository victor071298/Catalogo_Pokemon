function PokemonModal({
  aberto,
  editando,
  novoPokemon,
  setNovoPokemon,
  tipos,
  onFechar,
  onSalvar
}) {
  if (!aberto) return null;

  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
      backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center',
      zIndex: 9999
    }}>
      <div style={{ background: 'white', padding: '24px', borderRadius: '12px', width: '320px' }}>
        <h2>{editando ? 'Editar Pokémon' : 'Novo Pokémon'}</h2>

        <label>Código*:<br />
          <input
            type="number"
            value={novoPokemon.codigo}
            onChange={(e) => setNovoPokemon({ ...novoPokemon, codigo: e.target.value })}
            style={{ width: '100%', padding: '8px', marginBottom: '12px' }}
          />
        </label>

        <label>Nome*:<br />
          <input
            type="text"
            value={novoPokemon.nome}
            onChange={(e) => setNovoPokemon({ ...novoPokemon, nome: e.target.value })}
            style={{ width: '100%', padding: '8px', marginBottom: '12px' }}
          />
        </label>

        <label>Tipo Primário*:<br />
          <select
            value={novoPokemon.tipoPrimario}
            onChange={(e) => setNovoPokemon({ ...novoPokemon, tipoPrimario: e.target.value })}
            style={{ width: '100%', padding: '8px', marginBottom: '12px' }}
          >
            <option value="">Selecione...</option>
            {tipos.map(tipo => (
              <option key={tipo.codigo} value={tipo.codigo}>{tipo.nome}</option>
            ))}
          </select>
        </label>

        <label>Tipo Secundário (opcional):<br />
          <select
            value={novoPokemon.tipoSecundario}
            onChange={(e) => setNovoPokemon({ ...novoPokemon, tipoSecundario: e.target.value })}
            style={{ width: '100%', padding: '8px', marginBottom: '16px' }}
          >
            <option value="">Nenhum</option>
            {tipos.map(tipo => (
              <option key={tipo.codigo} value={tipo.codigo}>{tipo.nome}</option>
            ))}
          </select>
        </label>

        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
          <button onClick={onFechar} style={{ padding: '8px 12px' }}>Cancelar</button>
          <button
            onClick={onSalvar}
            style={{ padding: '8px 12px', backgroundColor: '#4CAF50', color: 'white', border: 'none' }}
          >
            {editando ? 'Salvar Alterações' : 'Salvar'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default PokemonModal;
