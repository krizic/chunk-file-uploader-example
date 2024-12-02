// Hellper types for the client
export type ResponseStatus = {
    // TODO: Add more fields
    ok: boolean;
    status?: number;
};

export type SingleFileUploadPostRequest = (file: File) => Promise<ResponseStatus>;

// Responses
export interface GetFilesResponse {
    files: FileDescription[];
}

// Domain
export interface FileDescription {
    name: string;
    size: number;
}
