import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../renderWithRouter';
import pokemons from '../data';

describe('Testes Pokedex', () => {
  beforeEach(() => {
    const { history } = renderWithRouter(<App />);
    history.push('/');
  });
  test('Testa mensagem na tela "Encountered pokémons"', () => {
    const textElement = screen.getByRole('heading', {
      name: /encountered pokémons/i,
    });
    expect(textElement).toBeInTheDocument();
  });
  test('testa se é exibido o proximo Pokemon', () => {
    const button = screen.getByRole('button', {
      name: /próximo pokémon/i,
    });

    const pokemonSegundoIndex = pokemons.slice([1]);

    pokemonSegundoIndex.forEach((pokemon) => {
      userEvent.click(button);
      expect(screen.getByText(pokemon.name)).toBeInTheDocument();
    });
  });
  test('testa se é mostrado apenas um pokemon', () => {
    const pokemon = document.getElementsByClassName('pokemon');
    expect(pokemon).toHaveLength(1);
  });
  test('Teste se é mostrado os botões de filtro', () => {
    const buttons = screen.getAllByTestId('pokemon-type-button');
    buttons.forEach((button) => {
      expect(button).toBeInTheDocument();
      const btnType = screen.getByRole('button', { name: button.textContent });
      userEvent.click(btnType);

      const pokemonName = screen.getByTestId('pokemon-name');
      const pokemonType = screen.getByTestId('pokemon-type');
      const pokemonNext = screen.getByTestId('next-pokemon');

      const typesPokemon = pokemons.filter((pokemon) => (
        pokemon.type === button.textContent
      ));

      typesPokemon.forEach((pokemon) => {
        expect(pokemon.type).toBe(button.textContent);
        expect(pokemonType.textContent).toBe(pokemon.type);
        expect(pokemonName.textContent).toBe(pokemon.name);
        userEvent.click(pokemonNext);
      });
    });
  });

  test('Mostra botão de reset na tela', () => {
    const buttonReset = screen.getByRole('button', {
      name: 'All',
    });
    userEvent.click(buttonReset);

    expect(buttonReset.textContent).toBe('All');
    expect(buttonReset).toBeInTheDocument();
  });
});
