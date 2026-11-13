const mockErrorResponse = jest.fn((errors, status) => ({ _testErrors: errors, status }));

jest.mock('~/utils/apiResponse', () => ({
  errorResponse: (...args: unknown[]) => mockErrorResponse(...args)
}));

import { POST } from './route';

describe('Create Invoice API Route (POST)', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return demo placeholder response', async () => {
    const res = await POST();

    expect(mockErrorResponse).toHaveBeenCalledWith(['Donations are disabled for this demo.'], 503);
    expect(res.status).toBe(503);
  });
});
