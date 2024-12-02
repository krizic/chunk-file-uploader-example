import { type GetFilesResponse } from '../models';

export const getFiles = async (): Promise<GetFilesResponse> => {
    try {
        const response = await fetch('/api/files', {
            method: 'GET',
        });

        if (response.ok) {
            return (await response.json()) as GetFilesResponse;
        } else {
            // TODO Error handling
            return { files: [] };
        }
    } catch (error) {
        // TODO Error handling
        console.error('Error fetching files', error);
        throw error;
    }
};
