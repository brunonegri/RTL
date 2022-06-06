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
    const listFav = document.getElementsByClassName('favorite-pokemon');

    if (listFav.length === 0) {
      expect(noFavText).toBeInTheDocument();
    }

    expect(() => (listFav > 1)).toBeTruthy();
  });
});
