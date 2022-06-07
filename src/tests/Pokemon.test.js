import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../renderWithRouter';
// import pokemons from '../data';

describe('Testes componente Pokemon', () => {
  // beforeEach(() => {
  //   const { history } = renderWithRouter(<App />);
  //   history.push('/');
  // });
  test('Testa se é renderizado um card do Pokemon', () => {
    renderWithRouter(<App />);
    const nameElement = screen.getByTestId('pokemon-name').textContent;
    const typeElement = screen.getByTestId('pokemon-type').textContent;
    const weightElement = screen.getByTestId('pokemon-weight').textContent;
    const imgElement = screen.getByAltText('Pikachu sprite');
    expect(nameElement).toBe('Pikachu');
    expect(typeElement).toBe('Electric');
    expect(weightElement).toBe('Average weight: 6.0 kg');
    expect(imgElement).toHaveProperty('src', 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png');
  });

  test('Teste se o card renderizado tem um link', () => {
    renderWithRouter(<App />);
    const linkElement = screen.getByRole('link', { name: /more details/i });
    expect(linkElement).toBeInTheDocument();
  });

  test('Teste se ao clicar no link, é feito o redirecionamento', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/');
    const linkElement = screen.getByRole('link', { name: /more details/i });
    userEvent.click(linkElement);
    const { pathname } = history.location;

    expect(pathname).toBe('/pokemons/25');
  });

  test('Teste se existe um ícone de estrela nos pokémons favoritados:', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/pokemons/25');

    const favSelect = screen.getByText(/pokémon favoritado\?/i);
    userEvent.click(favSelect);

    const favoritePoke = screen.getByAltText('Pikachu is marked as favorite');
    expect(favoritePoke).toBeInTheDocument();
    expect(favoritePoke).toHaveProperty('alt', 'Pikachu is marked as favorite');
    expect(favoritePoke).toHaveProperty('src', 'http://localhost/star-icon.svg');
  });
});
