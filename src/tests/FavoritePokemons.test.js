import React from 'react';
import { screen } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Testes Favorites Pokemons', () => {
  beforeEach(() => {
    const { history } = renderWithRouter(<App />);
    history.push('/favorites');
  });
  test('Testa mensagem na tela "No favorite pokemon found"', () => {
    const noFavText = screen.getByText(/no favorite pokemon found/i);
    expect(noFavText).toBeInTheDocument();
  });
});
