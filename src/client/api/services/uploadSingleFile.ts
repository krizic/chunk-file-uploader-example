import { type SingleFileUploadPostRequest } from '../models';

export const uploadSingleFile: SingleFileUploadPostRequest = async (file) => {
    const formData = new FormData();
    formData.append('file', file);

    try {
        const response = await fetch('/api/upload-single', {
            method: 'POST',
            body: formData,
        });
        return response;
    } catch (error) {
        // TODO Error handling
        console.error('Error uploading file:', error);
        throw error;
    }
};
