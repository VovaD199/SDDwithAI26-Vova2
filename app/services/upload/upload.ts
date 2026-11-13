const toDemoBlobUrl = (folderName = 'photos', blobName = 'placeholder.jpg') =>
  blobName.startsWith('/') ? blobName : `/mock-blob/${folderName}/${encodeURIComponent(blobName).replaceAll('%2F', '/')}`;

export const createAzureStorageService = () => {
  return {
    uploadFile: async (): Promise<void> => {},
    deleteFile: async (): Promise<void> => {},
    constructBlobUrl: (folderName?: string, blobName?: string): string => toDemoBlobUrl(folderName, blobName),
    streamBlob: async (url?: string): Promise<Response> => Response.redirect(url || toDemoBlobUrl())
  };
};
