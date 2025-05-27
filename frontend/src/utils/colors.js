// utils/colors.js

export const getColorByType = (type) => {
  const cores = {
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

  return cores[type] || '#DDDDDD'; // fallback
};
