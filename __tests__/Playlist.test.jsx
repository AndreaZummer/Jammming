import Playlist from '../src/files/containers/Playlist';
import React from 'react';
import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';
import { vi, expect } from 'vitest';
import { addTracksToPlaylist } from '../src/files/utilities/utilities';

describe('Playlist', () => {
    const tracksArray = [{
        name: 'Song', 
        album: {
            name: 'Best album', 
            images: [
                {url: '123/456/789', size: '16KB'},
                {url: '111/111/111', size: '18KB'},
                {url: '222/222', size: '30KB'}
            ]
        }, 
        artists: [
            {name: 'best artist'}
        ],
        uri: 'uri1'
    },
    {
        name: 'Track No.2', 
        album: {
            name: 'Best album', 
            images: [
                {url: '123/456/889', size: '16KB'},
                {url: '111/331/111', size: '18KB'},
                {url: '222/522', size: '30KB'}
            ]
        }, 
        artists: [
            {name: 'best artist'}
        ],
        uri: 'uri2'
    },
    {
        name: 'Mysong', 
        album: {
            name: 'Best album2', 
            images: [
                {url: '123/456/789', size: '16KB'},
                {url: '111/11/111', size: '18KB'},
                {url: '222/222/852', size: '30KB'}
            ]
        }, 
        artists: [
            {name: 'best artist ever'}
        ],
        uri: 'uri3'
    }]

    it('should render playlist name', () => {
        render(<Playlist playlistName='My Playlist'/>);

        expect(screen.getByRole('heading', {level: 2})).toHaveTextContent('My Playlist');
    })

    it('should render input with old name as default value on rename click', async () => {
        render(<Playlist playlistName='My Playlist'/>);
        const user = userEvent.setup();
        const renameText = screen.getByText(/rename/i);

        await user.click(renameText);

        expect(screen.queryByRole('heading', {level: 2})).not.toBeInTheDocument();
        expect(screen.getByRole('textbox')).toHaveValue('My Playlist');
        expect(screen.getByRole('textbox')).toHaveFocus();
    })

    it('should allow to change entire name and submit it on Enter', async () => {
        const mockSubmit = vi.fn();
        render(<Playlist playlistName='My Playlist' handleSubmit={mockSubmit}/>);
        // setting up playlist name change inside input
        const user = userEvent.setup();
        const renameText = screen.getByText(/rename/i);
        await user.click(renameText);

        const playlistInput = screen.getByRole('textbox');
        const playlistName = playlistInput.value;
        // deleting of entire name
        for (let i=0; i< playlistName.length; i++) {
            await user.keyboard('{Backspace}');
        }
        // input new name
        await user.keyboard('New name');

        expect(playlistInput).toHaveValue('New name');

        // deleting part of new name
        await user.keyboard('{Backspace}');
        await user.keyboard('{Backspace}');

        // input new part of name
        await user.keyboard('M3');

        expect(playlistInput).toHaveValue('New naM3');

        // pressing Enter for submit
        await user.keyboard('{Enter}');

        expect(mockSubmit).toBeCalledTimes(1);
        expect(playlistInput).not.toBeInTheDocument();
        expect(screen.getByRole('heading', {level: 2})).toBeInTheDocument();
    })

    it('should render image for more settings', () => {
        render(<Playlist/>);

        expect(screen.getByAltText(/more options/i)).toBeInTheDocument();
    })

    it('should render empty tracklist if an empty array is provided', () => {
        render(<Playlist selected={[]}/>);

        expect(screen.getByTestId('tracklist')).toBeEmptyDOMElement();
    })

    it('should render track title if an array of length 1 is provided', () => {
        const track = {
            name: 'Song', 
            album: {
                name: 'Best album', 
                images: [
                    {url: '123/456/789', size: '16KB'},
                    {url: '111/111/111', size: '18KB'},
                    {url: '222/222', size: '30KB'}
                ]
            }, 
            artists: [
                {name: 'best artist'}
            ]
        }
        render(<Playlist selected={[track]}/>);

        expect(screen.getByTestId('tracklist')).toHaveTextContent('Song');
    })

    it('should render track title of all tracks in array', () => {
        
        render(<Playlist selected={tracksArray}/>);

        const titlesArray = screen.getAllByRole('heading', {level:3});

        expect(titlesArray).toHaveLength(3);
        expect(screen.getByText('Song')).toBeInTheDocument();
        expect(screen.getByText('Track No.2')).toBeInTheDocument();
        expect(screen.getByText('Mysong')).toBeInTheDocument();
    })

    it('should call mocked addToSpotify function on click', async () => {
        vi.mock('../src/files/utilities/utilities', () => ({
            addTracksToPlaylist: vi.fn()
        }))
        const mockRefreshing = vi.fn();
        render(<Playlist playlistName='Playlist' refreshing={mockRefreshing} selected={tracksArray}/>);

        const button = screen.getByRole('button');
        const user = userEvent.setup();
        await user.click(button);

        expect(addTracksToPlaylist).toBeCalledTimes(1);
        expect(addTracksToPlaylist).toBeCalledWith(['uri1', 'uri2', 'uri3'], 'Playlist');
        expect(mockRefreshing).toBeCalledTimes(1);
    })
})