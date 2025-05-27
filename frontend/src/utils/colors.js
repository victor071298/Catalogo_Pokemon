// utils/colors.js

const coresFixas = {
  fire: '#F08030',
  water: '#6890F0',
  grass: '#78C850',
  electric: '#F8D030',
  psychic: '#F85888',
  normal: '#A8A878',
  fighting: '#C03028',
  ground: '#E0C068',
  rock: '#B8A038',
  bug: '#A8B820',
  ghost: '#705898',
  poison: '#A040A0',
  ice: '#98D8D8',
  dragon: '#7038F8',
  dark: '#705848',
  fairy: '#EE99AC',
  steel: '#B8B8D0',
  flying: '#A890F0',
};

const corDinamicaCache = {};

function gerarCorSuave() {
  const hue = Math.floor(Math.random() * 360);
  const saturation = 60 + Math.random() * 20;
  const lightness = 60 + Math.random() * 20;
  return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
}

export const getColorByType = (type) => {
  const tipo = type?.toLowerCase();
  if (coresFixas[tipo]) return coresFixas[tipo];

  if (!corDinamicaCache[tipo]) {
    corDinamicaCache[tipo] = gerarCorSuave();
  }

  return corDinamicaCache[tipo];
};
