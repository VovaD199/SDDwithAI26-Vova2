if (typeof global.Request === 'undefined') {
  (global as any).Request = class {
    constructor(
      public input: any,
      public init?: any
    ) {
      this.json = async () => JSON.parse(input);
    }
    json: () => Promise<any>;
  } as any;
  (global as any).Response = class {} as any;
}

jest.mock('~/utils/apiResponse', () => ({
  errorResponse: jest.fn(),
  successResponse: jest.fn()
}));

jest.mock('~/utils/validateRequestData', () => ({
  validateRequestData: jest.fn()
}));

import { POST } from './route';
import { errorResponse, successResponse } from '~/utils/apiResponse';
import { validateRequestData } from '~/utils/validateRequestData';

describe('Collaboration API Route (POST)', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should accept valid requests in demo mode without sending email', async () => {
    const value = {
      name: 'Test User',
      email: 'test@example.com',
      phoneNumber: '12345',
      message: 'Hello'
    };

    (validateRequestData as jest.Mock).mockReturnValue({
      valid: true,
      value
    });

    const mockReq = {
      json: async () => ({ name: 'Test User' })
    };

    await POST(mockReq as any);

    expect(validateRequestData).toHaveBeenCalled();
    expect(successResponse).toHaveBeenCalledWith(
      {
        success: true,
        data: value,
        message: 'Your collaboration request was accepted in demo mode.'
      },
      200
    );
  });

  it('should return 400 when validation fails', async () => {
    (validateRequestData as jest.Mock).mockReturnValue({
      valid: false,
      errors: ['Invalid email']
    });

    const mockReq = { json: async () => ({}) };

    await POST(mockReq as any);

    expect(errorResponse).toHaveBeenCalledWith(['Invalid email'], 400);
  });

  it('should handle unexpected errors with catch block', async () => {
    const mockReq = {
      json: async () => {
        throw new Error('Crashed');
      }
    };

    await POST(mockReq as any);

    expect(errorResponse).toHaveBeenCalledWith([expect.stringContaining('unexpected error')], 500);
  });
});
