import SearchBar from "../src/files/containers/SearchBar";
import React from "react";
import userEvent from "@testing-library/user-event";
import { screen, render } from "@testing-library/react";
import { afterEach, expect, vi } from "vitest";
import { getSearchResults } from "../src/files/utilities/utilities";

describe('Searchbar', () => {
    vi.mock('../src/files/utilities/utilities', () => ({
        getSearchResults: vi.fn()
    }))

    afterEach(() => {
        vi.clearAllMocks()
    })

    const user = userEvent.setup();
    const shortInput = 'he';
    const middleInput = 'hel';
    const longInput = 'hello';

    it('should accept user\'s search input without suggestions and on pressing Search button call API', async () => {
        render(<SearchBar/>);

        const button = screen.getByRole('button', {name:/search/i});
        const searchBox = screen.getByRole('textbox');

        // Inputting search query
        await user.click(searchBox);
        await user.keyboard(shortInput);
    
        expect(searchBox).toHaveValue('he');

        // Pressing button for searching
        await user.click(button);

        expect(getSearchResults).toBeCalledTimes(1);
        expect(getSearchResults).toBeCalledWith('he');
    })

    it('should accept user\'s search input with one displaying of suggestions and on pressing Search button call API', async () => {
        render(<SearchBar/>);

        const button = screen.getByRole('button', {name:/search/i});
        const searchBox = screen.getByRole('textbox');

        // Inputting search query
        await user.click(searchBox);
        await user.keyboard(middleInput);
    
        expect(searchBox).toHaveValue('hel');

        // Pressing button for searching
        await user.click(button);

        expect(getSearchResults).toBeCalledTimes(2);
        expect(getSearchResults).toBeCalledWith('hel');
    })

    it('should accept user\'s search input and display suggestions and on pressing Search button call API', async () => {
        render(<SearchBar/>);

        const button = screen.getByRole('button', {name:/search/i});
        const searchBox = screen.getByRole('textbox');

        // Inputting search query
        await user.click(searchBox);
        await user.keyboard(longInput);
    
        expect(searchBox).toHaveValue('hello');

        // Pressing button for searching
        await user.click(button);

        expect(getSearchResults).toBeCalledTimes(4);
        expect(getSearchResults).toBeCalledWith('hello');
    })

    it('should accept user\'s input and on Enter call API', async () => {
        render(<SearchBar/>);

        const searchBox = screen.getByRole('textbox');

        // Inputting search query
        await user.click(searchBox);
        await user.keyboard(shortInput);
    
        // Pressing Enter for searching
        await user.keyboard('{Enter}');

        expect(getSearchResults).toBeCalledTimes(1);
    })

    it('should disable Search button on mount', () => {
        render(<SearchBar/>);

        const button = screen.getByRole('button', {name:/search/i});

        expect(button).toBeDisabled();
    })
})