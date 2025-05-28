import { getColorByType } from '../utils/colors';

function TipoLista({ tipos, onEditar, onExcluir }) {
  // Se não houver tipos cadastrados, exibe a mensagem
  if (!tipos || tipos.length === 0) return <p style={{ textAlign: 'center' }}>Nenhum tipo cadastrado.</p>;

  return (
    <div style={{ padding: '1rem', textAlign: 'center' }}>

      {/* Lista não ordenada*/}
      <h2 style={{ marginBottom: '1rem' }}>Tipos cadastrados</h2>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {tipos.map(tipo => (
          <li
            key={tipo.codigo}
            style={{
              marginBottom: '8px',
              fontSize: '18px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '10px'
            }}
          >
            {/* Bolinha colorida representando o tipo */}
            <span
              style={{
                display: 'inline-block',
                width: '20px',
                height: '20px',
                borderRadius: '50%',
                backgroundColor: getColorByType(tipo.nome)
              }}
            />
            {/* Nome do tipo */}
            <strong>{tipo.nome}</strong>

             {/* Botão para editar tipo */}
            <button
              onClick={() => onEditar(tipo)}
              style={{ marginLeft: '10px', background: 'transparent', border: 'none', cursor: 'pointer' }}
            >✏️</button>

            {/* Botão para excluir tipo */}
            <button
              onClick={() => onExcluir(tipo.codigo)}
              style={{ background: 'transparent', border: 'none', cursor: 'pointer' }}
            >❌</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TipoLista;
