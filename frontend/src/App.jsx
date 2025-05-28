import { useEffect, useState } from 'react';
import api from './services/api'; // serviço que comunica com o backend
import Filtro from './components/Filtro';
import PokemonCard from './components/PokemonCard';
import PokemonModal from './components/PokemonModal';
import TipoModal from './components/TipoModal';
import TipoLista from './components/TipoLista';

function App() {
  // Lista de pokémons e tipos vindos da API
  const [pokemons, setPokemons] = useState([]);
  const [tipos, setTipos] = useState([]);

  // Filtros de busca
  const [buscaNome, setBuscaNome] = useState('');
  const [filtroTipo, setFiltroTipo] = useState('');
 
  // Controle do modal de Pokémon
  const [modalAberto, setModalAberto] = useState(false);
  const [editando, setEditando] = useState(false);
  const [codigoAntigo, setCodigoAntigo] = useState(null);
  const [novoPokemon, setNovoPokemon] = useState({ codigo: '', nome: '', tipoPrimario: '', tipoSecundario: '' });

  // Controle do modal de Tipo
  const [modalTipoAberto, setModalTipoAberto] = useState(false);
  const [editandoTipo, setEditandoTipo] = useState(false);
  const [codigoTipoAntigo, setCodigoTipoAntigo] = useState(null);
  const [novoTipo, setNovoTipo] = useState('');

  // Controle de qual lista será exibida (Pokémons ou Tipos)
  const [mostrarPokemons, setMostrarPokemons] = useState(false);
  const [mostrarTipos, setMostrarTipos] = useState(false);

  // Executa ao montar o componente: carrega os dados da API
  useEffect(() => {
    carregarDados();
  }, []);

  // Função que busca pokémons e tipos no backend
  const carregarDados = async () => {
    try {
      const tiposRes = await api.get('/tipos');
      setTipos(tiposRes.data);
      const pokemonsRes = await api.get('/pokemons');
      setPokemons(pokemonsRes.data);
    } catch (err) {
      console.error("Erro ao carregar dados:", err);
    }
  };

  // Lógica de cadastro ou atualização de Pokémon
  const handleCadastrar = async () => {
    if (!novoPokemon.nome || !novoPokemon.tipoPrimario || !novoPokemon.codigo) {
      alert("Preencha os campos obrigatórios.");
      return;
    }

    try {
      const payload = {
        codigo: parseInt(novoPokemon.codigo),
        nome: novoPokemon.nome,
        codigo_tipo_primario: parseInt(novoPokemon.tipoPrimario),
        codigo_tipo_secundario: novoPokemon.tipoSecundario ? parseInt(novoPokemon.tipoSecundario) : null
      };

      if (editando) {
        await api.put(`/pokemons/${codigoAntigo}`, payload);
      } else {
        await api.post('/pokemons', payload);
      }

      await carregarDados(); // atualiza a lista após salva
      resetarForm(); // fecha o modal e limpa os campos
    } catch (err) {
      console.error("Erro ao salvar Pokémon:", err);
      alert("Erro: " + (err.response?.data?.detail || err.message));
    }
  };

  // Lógica de cadastro ou atualização de Tipo
  const handleCadastrarTipo = async () => {
    if (!novoTipo.trim()) {
      alert("O nome do tipo é obrigatório.");
      return;
    }

    try {
      if (editandoTipo && codigoTipoAntigo !== null) {
        await api.put(`/tipos/${codigoTipoAntigo}`, { nome: novoTipo.trim() });
      } else {
        await api.post('/tipos', { nome: novoTipo.trim() });
      }

      await carregarDados();
      setNovoTipo('');
      setModalTipoAberto(false);
      setEditandoTipo(false);
      setCodigoTipoAntigo(null);
    } catch (err) {
      console.error("Erro ao salvar Tipo:", err);
      alert("Erro: " + (err.response?.data?.detail || err.message));
    }
  };

  // Reseta o formulário do Pokémon (fecha o modal)
  const resetarForm = () => {
    setNovoPokemon({ codigo: '', nome: '', tipoPrimario: '', tipoSecundario: '' });
    setModalAberto(false);
    setEditando(false);
    setCodigoAntigo(null);
  };

  // Preenche os dados do Pokémon no modal para edição
  const handleEditar = (poke) => {
    setCodigoAntigo(poke.codigo);
    setNovoPokemon({
      codigo: poke.codigo,
      nome: poke.nome,
      tipoPrimario: poke.codigo_tipo_primario,
      tipoSecundario: poke.codigo_tipo_secundario || ''
    });
    setEditando(true);
    setModalAberto(true);
  };

  // Exclui Pokémon por código
  const handleExcluir = async (codigo) => {
    if (!window.confirm("Tem certeza que deseja excluir este Pokémon?")) return;
    try {
      await api.delete(`/pokemons/${codigo}`);
      await carregarDados();
    } catch (err) {
      console.error("Erro ao excluir:", err);
      alert("Erro ao excluir Pokémon: " + (err.response?.data?.detail || err.message));
    }
  };

  // Preenche os dados do tipo no modal para edição
  const handleEditarTipo = (tipo) => {
    setNovoTipo(tipo.nome);
    setCodigoTipoAntigo(tipo.codigo);
    setEditandoTipo(true);
    setModalTipoAberto(true);
  };

  // Exclui Tipo
  const handleExcluirTipo = async (codigo) => {
    if (!window.confirm("Tem certeza que deseja excluir este tipo?")) return;
    try {
      await api.delete(`/tipos/${codigo}`);
      await carregarDados();
    } catch (err) {
      console.error("Erro ao excluir tipo:", err);
      alert("Erro ao excluir tipo: " + (err.response?.data?.detail || err.message));
    }
  };

  // Filtra os pokémons pelo nome e pelo tipo escolhido
  const pokemonsFiltrados = pokemons.filter(poke => {
    const nomeInclui = poke.nome.toLowerCase().includes(buscaNome.toLowerCase());
    const tipoPrimario = tipos.find(t => t.codigo === poke.codigo_tipo_primario)?.nome;
    const tipoSecundario = tipos.find(t => t.codigo === poke.codigo_tipo_secundario)?.nome;
    const tipoSelecionado = filtroTipo.toLowerCase();

    const correspondeTipo =
      !filtroTipo ||
      tipoPrimario?.toLowerCase() === tipoSelecionado ||
      tipoSecundario?.toLowerCase() === tipoSelecionado;

    return nomeInclui && correspondeTipo;
  });

  // Renderiza toda a aplicação
  return (
    <div>
      <h1 style={{ textAlign: 'center', margin: '20px 0' }}>Pokédex</h1>

       {/* Filtro de busca */}
      <Filtro
        buscaNome={buscaNome}
        setBuscaNome={setBuscaNome}
        filtroTipo={filtroTipo}
        setFiltroTipo={setFiltroTipo}
        tipos={tipos}
      />

      {/* Botões de ações principais */}
      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
         {/* Abre modal para novo Pokémon */}
        <button onClick={() => {
          setModalAberto(true);
          setEditando(false);
          setCodigoAntigo(null);
          setNovoPokemon({ codigo: '', nome: '', tipoPrimario: '', tipoSecundario: '' });
        }} style={{ padding: '8px 16px', fontSize: '16px', borderRadius: '8px', backgroundColor: '#4CAF50', color: 'white', border: 'none', marginRight: '10px' }}>
          Cadastrar Pokémon
        </button>

        {/* Abre modal de novo tipo */}
        <button onClick={() => setModalTipoAberto(true)}
          style={{ padding: '8px 16px', fontSize: '16px', borderRadius: '8px', backgroundColor: '#2196F3', color: 'white', border: 'none', marginRight: '10px' }}>
          Cadastrar Tipo
        </button>

        {/* Alternância de visualização */}
        <button onClick={() => { setMostrarPokemons(true); setMostrarTipos(false); }}
          style={{ padding: '8px 16px', fontSize: '16px', borderRadius: '8px', backgroundColor: '#9C27B0', color: 'white', border: 'none', marginRight: '10px' }}>
          Listar Pokémons
        </button>

        <button onClick={() => { setMostrarPokemons(false); setMostrarTipos(true); }}
          style={{ padding: '8px 16px', fontSize: '16px', borderRadius: '8px', backgroundColor: '#FF9800', color: 'white', border: 'none' }}>
          Listar Tipos
        </button>
      </div>

      {/* Modal de Pokémon */} 
      <PokemonModal
        aberto={modalAberto}
        editando={editando}
        novoPokemon={novoPokemon}
        setNovoPokemon={setNovoPokemon}
        tipos={tipos}
        onFechar={resetarForm}
        onSalvar={handleCadastrar}
      />

      {/*Modal de Tipo */}
      <TipoModal
        aberto={modalTipoAberto}
        editando={editandoTipo}
        novoTipo={novoTipo}
        setNovoTipo={setNovoTipo}
        onFechar={() => {
          setModalTipoAberto(false);
          setNovoTipo('');
          setEditandoTipo(false);
          setCodigoTipoAntigo(null);
        }}
        onSalvar={handleCadastrarTipo}
      />

      {/* Lista de Pokémons */}
      {mostrarPokemons && (
        <div className="pokemon-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '1rem', padding: '0 1rem' }}>
          {pokemonsFiltrados.map(poke => (
            <PokemonCard
              key={poke.codigo}
              poke={poke}
              tipos={tipos}
              onEditar={handleEditar}
              onExcluir={handleExcluir}
            />
          ))}
        </div>
      )}

      {/* Lista de Tipos */}
      {mostrarTipos && (
        <TipoLista
          tipos={tipos}
          onEditar={handleEditarTipo}
          onExcluir={handleExcluirTipo}
        />
      )}
    </div>
  );
}

export default App;