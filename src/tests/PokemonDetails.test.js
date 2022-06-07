import React from 'react';
import { screen } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../renderWithRouter';
import pokemons from '../data';

describe('Testes componente PokemonDetails', () => {
//   beforeEach(() => {
//     const { history } = renderWithRouter(<App />);
//     history.push('/pokemons/25');
//   });
  test('Testa se as informaçoes do pokemon selecionado são mostradas na tela', () => {
    pokemons.forEach((pokemon) => {
      const { history } = renderWithRouter(<App />);
      history.push(`/pokemons/${pokemon.id}`);
      const headingElement = screen.getByRole('heading',
        { name: `${pokemon.name} Details` });
      //   const summaryElement = screen.queryAllByText('Summary');
      //   expect(summaryElement).toBeInTheDocument();
      const gameLocation = screen.getByRole('heading',
        { name: `Game Locations of ${pokemon.name}` });
      expect(headingElement).toBeInTheDocument();
      expect(gameLocation).toBeInTheDocument();
    });
  });
  test('Teste se existe uma seção com os mapas das localizações do pokémon:', () => {
    pokemons.forEach((pokemon) => {
      const { history } = renderWithRouter(<App />);
      history.push(`/pokemons/${pokemon.id}`);
      const gameLocation = screen.getByRole('heading',
        { name: `Game Locations of ${pokemon.name}` });
      const mapLocation = screen.getByRole('img', {
        alt: `${pokemon.name} location`,
        src: `${pokemon.foundAt.map((map) => map)}`,
      });
      expect(gameLocation).toBeInTheDocument();
      expect(mapLocation).toHaveProperty('src', `${pokemon.foundAt[0].map}`);
      expect(mapLocation).toHaveProperty('alt', `${pokemon.name}`);
    });
  });
});
