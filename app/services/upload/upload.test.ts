/**
 * @jest-environment node
 */
import { createAzureStorageService } from '~/services/upload/upload';

describe('demo upload service', () => {
  it('should no-op upload and delete operations', async () => {
    const service = createAzureStorageService();

    await expect(service.uploadFile()).resolves.toBeUndefined();
    await expect(service.deleteFile()).resolves.toBeUndefined();
  });

  it('should redirect blob streaming to the given absolute URL', async () => {
    const url = 'http://localhost/mock-blob/photos/placeholder.jpg';
    const response = await createAzureStorageService().streamBlob(url);

    expect(response.status).toBe(302);
    expect(response.headers.get('location')).toBe(url);
  });
});
