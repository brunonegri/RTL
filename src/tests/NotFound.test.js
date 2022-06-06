import React from 'react';
import { screen } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Testes Not Found', () => {
  beforeEach(() => {
    renderWithRouter(<App />);
  });
  test('Testa mensagem na tela "Page requested not found"', () => {
    const noFoundText = screen.getByRole('heading', {
      name: /page requested not found/i,
    });
    expect(noFoundText).toBeInTheDocument();
  });
  test('testa se mostra a Imagem na tela', () => {
    const imgElement = screen.getByRole('img', {
      name: /pikachu crying because the page requested was not found/i,
    });
    expect(imgElement).toHaveProperty('src', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
