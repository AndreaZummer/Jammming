import {render, screen } from '@testing-library/react';
import App from './App';
import {expect, vi} from 'vitest';
import {getProfile} from './files/utilities/utilities';
import React from 'react';
import userEvent from '@testing-library/user-event';

describe('App', () => {
  vi.mock('./files/utilities/utilities', () => ({
    getProfile: vi.fn(),
  }))

  it('should call getProfile function on mount', () => {
    render(<App />)

    expect(getProfile).toBeCalledTimes(1);
  })

  it('should check that success message is hidden', () => {
    render(<App />)

    expect(screen.queryByText('success')).not.toBeInTheDocument();
  })

  it('should display empty input for playlist name and button to set the name of playlist', () => {
    render(<App />)

    expect(screen.getByRole('button')).toHaveTextContent(/create/i);
    expect(screen.getByRole('textbox')).toHaveAttribute('value', "");
  })

  it('should set playlist name on pressing enter', async () => {
    render(<App />)

    const user = userEvent.setup();
    const playlistNameInput = screen.getByRole('textbox');
    // setting up playlist name
    await user.click(playlistNameInput);
    await user.keyboard('super songs');

    expect(playlistNameInput).toHaveAttribute('value', "super songs");
    // pressing enter
    await user.keyboard('{Enter}');

    expect(screen.getByText(/results/i)).toBeInTheDocument();
  })

  it('should set playlist name on button click', async () => {
    render(<App />)

    const user = userEvent.setup();
    const button = screen.getByRole('button');
    const playlistNameInput = screen.getByRole('textbox');
    // setting up playlist name and click on create button 
    await user.click(playlistNameInput);
    await user.keyboard('super songs');
    await user.click(button);

    expect(screen.getByText(/results/i)).toBeInTheDocument();
  })
})
