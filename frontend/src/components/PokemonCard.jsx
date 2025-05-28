import { getColorByType } from '../utils/colors';

function PokemonCard({ poke, tipos, onEditar, onExcluir }) {
  // Pega o nome dos tipos a partir dos códigos salvos no Pokémon
  const tipoPrimario = tipos.find(t => t.codigo === poke.codigo_tipo_primario)?.nome;
  const tipoSecundario = tipos.find(t => t.codigo === poke.codigo_tipo_secundario)?.nome;
  
  return (
    <div
      style={{
        backgroundColor: getColorByType(tipoPrimario),
        color: 'white',
        padding: '16px',
        borderRadius: '10px',
        boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
        position: 'relative'
      }}
    > 
      {/* Botão de excluir Pokémon */}
      <button
        onClick={() => onExcluir(poke.codigo)}
        style={{
          position: 'absolute',
          top: '8px',
          right: '8px',
          background: 'transparent',
          color: 'white',
          border: 'none',
          fontWeight: 'bold',
          fontSize: '18px',
          cursor: 'pointer'
        }}
      >
        ❌
      </button>

      {/* Botão de editar Pokémon */}
      <button
        onClick={() => onEditar(poke)}
        style={{
          position: 'absolute',
          top: '8px',
          left: '8px',
          background: 'transparent',
          color: 'white',
          border: 'none',
          fontSize: '18px',
          cursor: 'pointer'
        }}
      >
        ✏️
      </button>

      {/* Exibição dos dados do Pokémon */}
      <p style={{ fontSize: '12px', marginTop: '28px', marginBottom: '4px' }}>
        Código: {poke.codigo}
      </p>
      <h2 style={{ fontSize: '18px', fontWeight: 'bold' }}>{poke.nome}</h2>
      <p>Tipo Primário: {tipoPrimario}</p>
      {/* Só mostra tipo secundário se houver */}
      {tipoSecundario && <p>Tipo Secundário: {tipoSecundario}</p>}
    </div>
  );
}

export default PokemonCard;
