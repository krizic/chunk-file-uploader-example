import { renderHook, act } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import useFileSelect from './useFileSelect';

describe('useFileSelect', () => {
    it('should initialize with an empty file list', () => {
        const { result } = renderHook(() => useFileSelect());
        expect(result.current.files).toEqual([]);
    });

    it('should update files when handleFileChange is called', () => {
        const { result } = renderHook(() => useFileSelect());
        const mockFiles = [new File(['content'], 'test.txt')];

        act(() => {
            result.current.handleFileChange({
                target: { files: mockFiles },
            } as unknown as React.ChangeEvent<HTMLInputElement>);
        });

        expect(result.current.files).toEqual(mockFiles);
    });

    it('should set files correctly', () => {
        const { result } = renderHook(() => useFileSelect());
        const mockFiles = [new File(['content'], 'test.txt')];

        act(() => {
            result.current.setFiles(mockFiles);
        });

        expect(result.current.files).toEqual(mockFiles);
    });
});
