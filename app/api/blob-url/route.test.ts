/**
 * @jest-environment node
 */
import * as util from 'util';

if (typeof global.TextDecoder === 'undefined') {
  (global as any).TextDecoder = util.TextDecoder;
  (global as any).TextEncoder = util.TextEncoder;
}

if (typeof global.Request === 'undefined') {
  (global as any).Request = class {
    constructor(public url: string) {}
  };
}

jest.mock('~/utils/apiResponse', () => ({
  errorResponse: jest.fn()
}));

jest.mock('~/utils/validateRequestData', () => ({
  validateWithZod: jest.fn()
}));

describe('Blob URL API Route', () => {
  let GET: any;
  let validateWithZod: any;
  let errorResponse: any;

  beforeAll(async () => {
    const route = await import('./route');
    const validate = await import('~/utils/validateRequestData');
    const apiRes = await import('~/utils/apiResponse');

    GET = route.GET;
    validateWithZod = validate.validateWithZod;
    errorResponse = apiRes.errorResponse;
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return not-found error when the mock blob file does not exist', async () => {
    validateWithZod.mockReturnValue({
      valid: true,
      value: { blobName: 'video.mp4', folderName: 'movies' }
    });

    const mockReq = {
      url: 'http://localhost/api/blob-url?blobName=video.mp4'
    };

    await GET(mockReq as any);

    expect(validateWithZod).toHaveBeenCalled();
    expect(errorResponse).toHaveBeenCalledWith(['No mock blob found: /mock-blob/movies/video.mp4'], 404);
  });

  it('should return errorResponse when validation fails', async () => {
    validateWithZod.mockReturnValue({
      valid: false,
      errors: ['Invalid name']
    });

    const mockReq = {
      url: 'http://localhost/api/blob-url'
    };

    await GET(mockReq as any);

    expect(errorResponse).toHaveBeenCalledWith(['Invalid name']);
  });
});
