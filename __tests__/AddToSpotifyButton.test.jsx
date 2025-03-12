import AddToSpotifyButton from '../src/files/components/AddToSpotifyButton';
import userEvent from '@testing-library/user-event';
import { screen, render } from '@testing-library/react';
import React from 'react';
import {expect, vi} from 'vitest';

describe('AddToSpotifyButton', () => {
    it('should onclick call two functions', async () => {
        const mock1 = vi.fn();
        const mock2 = vi.fn();

        render(<AddToSpotifyButton onAdd={mock1} refreshing={mock2}/>)
        const user = userEvent.setup();

        const button = screen.getByRole('button');
        await user.click(button);

        expect(mock1).toBeCalledTimes(1);
        expect(mock2).toBeCalledTimes(1);
    })
})