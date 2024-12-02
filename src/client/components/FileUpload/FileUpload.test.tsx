import { render, screen, fireEvent } from '@testing-library/react';
import { describe, expect, it, vi, type MockedFunction, beforeEach } from 'vitest';

import '@testing-library/jest-dom';
import useFileSelect from '../../hooks/useFileSelect';

import FileUpload from './FileUpload';

vi.mock('../../hooks/useFileSelect');

describe('FileUpload Component', () => {
    const mockUseFileSelect = useFileSelect as MockedFunction<typeof useFileSelect>;

    beforeEach(() => {
        mockUseFileSelect.mockReturnValue({
            handleFileChange: vi.fn(),
            files: [],
            setFiles: vi.fn(),
        });
    });

    it('renders file input and label', () => {
        render(<FileUpload onFilesUpload={vi.fn()} />);
        expect(screen.getByTestId('select-files-label').tagName).toBe('LABEL');
    });

    it('calls handleFileChange on file input change', () => {
        const handleFileChange = vi.fn();
        mockUseFileSelect.mockReturnValueOnce({
            handleFileChange,
            files: [],
            setFiles: vi.fn(),
        });

        render(<FileUpload onFilesUpload={vi.fn()} />);
        const fileInput: HTMLInputElement = screen.getByTestId('selected-files-input');
        fireEvent.change(fileInput, { target: { files: [new File(['file'], 'file.png')] } });

        expect(handleFileChange).toHaveBeenCalled();
    });

    it('calls onFilesUpload and clears files on upload button click', () => {
        const onFilesUpload = vi.fn();
        const setFiles = vi.fn();
        const files = [new File(['file'], 'file.png')];

        mockUseFileSelect.mockReturnValueOnce({
            handleFileChange: vi.fn(),
            files,
            setFiles,
        });

        render(<FileUpload onFilesUpload={onFilesUpload} />);
        const uploadButton = screen.getByText('Upload');
        fireEvent.click(uploadButton);

        expect(onFilesUpload).toHaveBeenCalledWith(files);
        expect(setFiles).toHaveBeenCalledWith([]);
    });

    it('disables upload button when inProgress is true', () => {
        const files = [new File(['file'], 'file.png')];

        mockUseFileSelect.mockReturnValueOnce({
            handleFileChange: vi.fn(),
            files,
            setFiles: vi.fn(),
        });

        render(<FileUpload onFilesUpload={vi.fn()} inProgress={true} />);
        const uploadButton: HTMLButtonElement = screen.getByText('Upload');

        expect(uploadButton.disabled).toBe(true);
    });
});
