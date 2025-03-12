import Track from '../src/files/components/Track';
import React from "react";
import { render, screen } from "@testing-library/react";
import { expect, vi } from "vitest";
import userEvent from '@testing-library/user-event';

describe('Track', () => {
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

    it('should render track title, artist, album name and album image', () => {
        render(<Track track={track} />)
        
        expect(screen.getByRole('heading', {level: 3})).toHaveTextContent('Song');
        expect(screen.getByRole('heading', {level: 5})).toHaveTextContent('Best album');
        expect(screen.getByRole('heading', {level: 4})).toHaveTextContent('best artist');
        expect(screen.getByAltText(/album/i)).toHaveAttribute('src', '222/222')
    })

    it('should render 3 artists if 3 are provided', () => {
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
                {name: 'best artist'},
                {name: 'second best'},
                {name: 'worst artist'} 
            ]
        }
        render(<Track track={track}/>)
        expect(screen.getByRole('heading', {level:4})).toHaveTextContent('best artist, second best, worst artist');
    })

    it('should render only 3 artists if more then 3 are provided', () => {
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
                {name: 'best artist'},
                {name: 'second best'},
                {name: 'third best'},
                {name: 'worst artist'} 
            ]
        }

        render(<Track track={track}/>);

        expect(screen.getByRole('heading', {level:4})).toHaveTextContent('best artist, second best, third best');
    })

    it('should render remove image if removeClick property is provided and call removeClick on click', async () => {
        const mockRemoveClick = vi.fn();
        render(<Track removeClick={mockRemoveClick} track={track}/>);

        const removeImage = screen.getByAltText(/remove/i);
        const user = userEvent.setup();
        await user.click(removeImage);

        expect(mockRemoveClick).toBeCalledTimes(1);
        expect(mockRemoveClick).toBeCalledWith(track);
    })

    it('should render add image if removeClick property is not provided and call handleAdd on click', async () => {
        const mockSelectionClick = vi.fn();
        render(<Track track={track} selectionClick={mockSelectionClick}/>);

        const addImage = screen.getByAltText(/add/i);
        const user = userEvent.setup();

        await user.click(addImage);

        expect(mockSelectionClick).toBeCalledTimes(1);
        expect(mockSelectionClick).toBeCalledWith({
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
        })
    })
})