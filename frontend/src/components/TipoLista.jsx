import { getColorByType } from '../utils/colors';

function TipoLista({ tipos, onEditar, onExcluir }) {
  if (!tipos || tipos.length === 0) return <p style={{ textAlign: 'center' }}>Nenhum tipo cadastrado.</p>;

  return (
    <div style={{ padding: '1rem', textAlign: 'center' }}>
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
            <span
              style={{
                display: 'inline-block',
                width: '20px',
                height: '20px',
                borderRadius: '50%',
                backgroundColor: getColorByType(tipo.nome)
              }}
            />
            <strong>{tipo.nome}</strong> (Código: {tipo.codigo})

            <button
              onClick={() => onEditar(tipo)}
              style={{ marginLeft: '10px', background: 'transparent', border: 'none', cursor: 'pointer' }}
            >✏️</button>

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
