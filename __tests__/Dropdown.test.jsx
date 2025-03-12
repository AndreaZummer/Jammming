import Dropdown from "../src/files/components/Dropdown";
import React from "react";
import userEvent from "@testing-library/user-event";
import { screen, render, fireEvent } from "@testing-library/react";
import { expect, vi } from "vitest";

describe('Dropdown', () => {
    it('should render specification for image upload', () => {
        render(<Dropdown />)
        
        expect(screen.getByTestId('fileInput')).toBeInTheDocument();
        expect(screen.getByText(/format/i)).toBeInTheDocument();
        expect(screen.getByText(/size/i)).toBeInTheDocument();
    })

    it('should call props function on click on rename or rename image', async () => {
        const mock = vi.fn();
        render(<Dropdown nameChangeHandle={mock}/>)

        const image = screen.getByAltText(/rename/i);
        const text = screen.getByText(/rename/i);
        const user = userEvent.setup();
        await user.click(image);

        expect(mock).toBeCalledTimes(1);

        await user.click(text);

        expect(mock).toBeCalledTimes(2);
    })

    /*it('should call function for uploading file on click on image for adding cover image or text next to it', async () => {
        render(<Dropdown/>);

        const text = screen.getByText(/cover/i);
        const image = screen.getByAltText(/add/i);

        const user = userEvent.setup();
        // mock function for simulating opening dialog for uploading file
        let mockUploadFunction = vi.fn();
        const label = screen.getByTestId('fileLabel');
        mockUploadFunction = fireEvent(label, 'click')
        // clicking on text to add file
        await user.click(text);

        expect(mockUploadFunction).toBeCalledTimes(1);
    })*/
})