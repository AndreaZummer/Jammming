import Dropdown from "../src/files/components/Dropdown";
import React from "react";
import userEvent from "@testing-library/user-event";
import { screen, render} from "@testing-library/react";
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
})