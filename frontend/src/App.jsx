import { useEffect, useState } from 'react';
import api from './services/api';
import { getColorByType } from './utils/colors';

function App() {
  const [pokemons, setPokemons] = useState([]);
  const [tipos, setTipos] = useState({});
  const [buscaNome, setBuscaNome] = useState('');
  const [filtroTipo, setFiltroTipo] = useState('');

  const [modalAberto, setModalAberto] = useState(false);
  const [editando, setEditando] = useState(false);
  const [novoPokemon, setNovoPokemon] = useState({ id: '', codigo: '', nome: '', tipoPrimario: '', tipoSecundario: '' });

  useEffect(() => {
    carregarDados();
  }, []);

  const carregarDados = async () => {
    try {
      const tiposRes = await api.get('/tipos');
      const mapa = {};
      tiposRes.data.forEach(t => {
        mapa[t.id] = t.nome;
      });
      setTipos(mapa);

      const pokemonsRes = await api.get('/pokemons');
      setPokemons(pokemonsRes.data);
    } catch (err) {
      console.error("Erro ao carregar dados:", err);
    }
  };

  const handleCadastrar = async () => {
    if (!novoPokemon.nome || !novoPokemon.tipoPrimario || !novoPokemon.codigo) {
      alert("Preencha os campos obrigatórios.");
      return;
    }

    try {
      if (editando) {
        await api.put(`/pokemons/${novoPokemon.id}`, {
          codigo: parseInt(novoPokemon.codigo),
          nome: novoPokemon.nome,
          tipo_primario_id: parseInt(novoPokemon.tipoPrimario),
          tipo_secundario_id: novoPokemon.tipoSecundario ? parseInt(novoPokemon.tipoSecundario) : null
        });
      } else {
        await api.post('/pokemons', {
          codigo: parseInt(novoPokemon.codigo),
          nome: novoPokemon.nome,
          tipo_primario_id: parseInt(novoPokemon.tipoPrimario),
          tipo_secundario_id: novoPokemon.tipoSecundario ? parseInt(novoPokemon.tipoSecundario) : null
        });
      }

      await carregarDados();
      setNovoPokemon({ id: '', codigo: '', nome: '', tipoPrimario: '', tipoSecundario: '' });
      setModalAberto(false);
      setEditando(false);
    } catch (err) {
      console.error("Erro ao salvar Pokémon:", err);
      alert("Erro: " + (err.response?.data?.detail || err.message));
    }
  };

  const handleExcluir = async (id) => {
    if (!window.confirm("Tem certeza que deseja excluir este Pokémon?")) return;
    try {
      await api.delete(`/pokemons/${id}`);
      await carregarDados();
    } catch (err) {
      console.error("Erro ao excluir:", err);
      alert("Erro ao excluir Pokémon: " + (err.response?.data?.detail || err.message));
    }
  };

  const handleEditar = (poke) => {
    setNovoPokemon({
      id: poke.id,
      codigo: poke.codigo,
      nome: poke.nome,
      tipoPrimario: poke.tipo_primario_id,
      tipoSecundario: poke.tipo_secundario_id || ''
    });
    setEditando(true);
    setModalAberto(true);
  };

  const pokemonsFiltrados = pokemons.filter(poke => {
    const nomeInclui = poke.nome.toLowerCase().includes(buscaNome.toLowerCase());
    const tipoPrimario = tipos[poke.tipo_primario_id];
    const tipoSecundario = tipos[poke.tipo_secundario_id];
    const tipoSelecionado = filtroTipo.toLowerCase();

    const correspondeTipo =
      !filtroTipo ||
      tipoPrimario?.toLowerCase() === tipoSelecionado ||
      tipoSecundario?.toLowerCase() === tipoSelecionado;

    return nomeInclui && correspondeTipo;
  });

  return (
    <div>
      <h1 style={{ textAlign: 'center', margin: '20px 0' }}>Pokédex</h1>

      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        <input
          type="text"
          placeholder="Buscar por nome..."
          value={buscaNome}
          onChange={(e) => setBuscaNome(e.target.value)}
          style={{
            padding: '8px 12px', fontSize: '16px', borderRadius: '8px', border: '1px solid #ccc', width: '250px', marginRight: '10px'
          }}
        />

        <select
          value={filtroTipo}
          onChange={(e) => setFiltroTipo(e.target.value)}
          style={{
            padding: '8px 12px', fontSize: '16px', borderRadius: '8px', border: '1px solid #ccc', width: '180px', marginRight: '10px'
          }}
        >
          <option value="">Todos os tipos</option>
          {Object.values(tipos).map(tipo => (
            <option key={tipo} value={tipo}>{tipo}</option>
          ))}
        </select>

        <button
          onClick={() => {
            setModalAberto(true);
            setEditando(false);
            setNovoPokemon({ id: '', codigo: '', nome: '', tipoPrimario: '', tipoSecundario: '' });
          }}
          style={{
            padding: '8px 16px', fontSize: '16px', borderRadius: '8px', backgroundColor: '#4CAF50', color: 'white', border: 'none'
          }}
        >
          Cadastrar Pokémon
        </button>
      </div>

      {modalAberto && (
        <div style={{
          position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
          backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center',
          zIndex: 9999
        }}>
          <div style={{ background: 'white', padding: '24px', borderRadius: '12px', width: '320px' }}>
            <h2>{editando ? 'Editar Pokémon' : 'Novo Pokémon'}</h2>

            <label>Código*:<br/>
              <input
                type="number"
                value={novoPokemon.codigo}
                onChange={(e) => setNovoPokemon({ ...novoPokemon, codigo: e.target.value })}
                style={{ width: '100%', padding: '8px', marginBottom: '12px' }}
              />
            </label>

            <label>Nome*:<br/>
              <input
                type="text"
                value={novoPokemon.nome}
                onChange={(e) => setNovoPokemon({ ...novoPokemon, nome: e.target.value })}
                style={{ width: '100%', padding: '8px', marginBottom: '12px' }}
              />
            </label>

            <label>Tipo Primário*:<br/>
              <select
                value={novoPokemon.tipoPrimario}
                onChange={(e) => setNovoPokemon({ ...novoPokemon, tipoPrimario: e.target.value })}
                style={{ width: '100%', padding: '8px', marginBottom: '12px' }}
              >
                <option value="">Selecione...</option>
                {Object.entries(tipos).map(([id, nome]) => (
                  <option key={id} value={id}>{nome}</option>
                ))}
              </select>
            </label>

            <label>Tipo Secundário (opcional):<br/>
              <select
                value={novoPokemon.tipoSecundario}
                onChange={(e) => setNovoPokemon({ ...novoPokemon, tipoSecundario: e.target.value })}
                style={{ width: '100%', padding: '8px', marginBottom: '16px' }}
              >
                <option value="">Nenhum</option>
                {Object.entries(tipos).map(([id, nome]) => (
                  <option key={id} value={id}>{nome}</option>
                ))}
              </select>
            </label>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
              <button onClick={() => { setModalAberto(false); setEditando(false); }} style={{ padding: '8px 12px' }}>Cancelar</button>
              <button onClick={handleCadastrar} style={{ padding: '8px 12px', backgroundColor: '#4CAF50', color: 'white', border: 'none' }}>
                {editando ? 'Salvar Alterações' : 'Salvar'}
              </button>
            </div>
          </div>
        </div>
      )}

      <div
        className="pokemon-grid"
        style={{
          display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
          gap: '1rem', padding: '0 1rem'
        }}
      >
        {pokemonsFiltrados.map(poke => {
          const tipoPrimario = tipos[poke.tipo_primario_id];
          const tipoSecundario = tipos[poke.tipo_secundario_id];

          return (
            <div
              key={poke.codigo}
              style={{
                backgroundColor: getColorByType(tipoPrimario),
                color: 'white', padding: '16px', borderRadius: '10px', boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
                position: 'relative'
              }}
            >
              <button
                onClick={() => handleExcluir(poke.id)}
                style={{
                  position: 'absolute', top: '8px', right: '8px', background: 'transparent', color: 'white', border: 'none', fontWeight: 'bold', fontSize: '18px', cursor: 'pointer'
                }}
              >
                ❌
              </button>
              <button
                onClick={() => handleEditar(poke)}
                style={{
                  position: 'absolute', top: '8px', left: '8px', background: 'transparent', color: 'white', border: 'none', fontSize: '18px', cursor: 'pointer'
                }}
              >
                ✏️
              </button>
              <p style={{ fontSize: '12px', marginTop: '28px', marginBottom: '4px' }}>Código: {poke.codigo}</p>
              <h2 style={{ fontSize: '18px', fontWeight: 'bold' }}>{poke.nome}</h2>
              <p>Tipo Primário: {tipoPrimario}</p>
              {tipoSecundario && <p>Tipo Secundário: {tipoSecundario}</p>}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;