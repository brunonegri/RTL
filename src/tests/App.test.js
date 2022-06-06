import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

test('Verifica os links', () => {
  renderWithRouter(<App />);
  const homeElement = screen.getByRole('link', { name: 'Home' });
  const homeAbout = screen.getByRole('link', { name: 'About' });
  const homeFavorites = screen.getByRole('link', { name: 'Favorite Pokémons' });
  expect(homeElement).toBeInTheDocument();
  expect(homeAbout).toBeInTheDocument();
  expect(homeFavorites).toBeInTheDocument();
});
test('Testa redirecionamento para Home', () => {
  const { history } = renderWithRouter(<App />);
  const linkHome = screen.getByRole('link', { name: 'Home' });
  userEvent.click(linkHome);

  const { pathname } = history.location;
  expect(pathname).toBe('/');
});
test('Testa redirecionamento para About', () => {
  const { history } = renderWithRouter(<App />);
  const linkAbout = screen.getByRole('link', { name: 'About' });
  userEvent.click(linkAbout);

  const { pathname } = history.location;
  expect(pathname).toBe('/about');
});
test('Testa redirecionamento para Pokemons Favoritos', () => {
  const { history } = renderWithRouter(<App />);
  const linkFavorite = screen.getByRole('link', { name: 'Favorite Pokémons' });
  userEvent.click(linkFavorite);

  const { pathname } = history.location;
  expect(pathname).toBe('/favorites');
});
test('Testa redirecionamento para Not Found', () => {
  const { history } = renderWithRouter(<App />);
  const url = '/pagina/que-nao-existe/';
  history.push(url);

  const notFoundText = screen.getByRole('heading', {
    name: /page requested not found/i,
  });

  expect(notFoundText).toBeInTheDocument();
});
