import React from 'react';
import { screen } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Tests About Component', () => {
  beforeEach(() => {
    const { history } = renderWithRouter(<App />);
    history.push('/about');
  });
  test('Testa informações Pokedex', () => {
    const aboutPokeElement = screen.getByText(
      /this application simulates a pokédex, a digital encyclopedia containing all/i,
    );
    expect(aboutPokeElement).toBeInTheDocument();
  });
  test('Testa se contem o heading About Pokedex', () => {
    const aboutPokedex = screen.getByRole('heading', {
      name: /about pokédex/i,
    });
    expect(aboutPokedex).toBeInTheDocument();
  });
  test('Testa se contem 2 paragrafos', () => {
    const primeiroParagrafo = screen.getByText(
      /this application simulates a pokédex, a digital encyclopedia containing all/i,
    );
    const segundoParagrafo = screen.getByText(
      /one can filter pokémons by type, and see more details for each one of them/i,
    );
    expect(primeiroParagrafo).toBeInTheDocument();
    expect(segundoParagrafo).toBeInTheDocument();
  });
  test('Testa src da Imagem', () => {
    const imgElement = screen.getByRole('img', {
      name: /pokédex/i,
    });
    expect(imgElement).toHaveProperty('src', 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
