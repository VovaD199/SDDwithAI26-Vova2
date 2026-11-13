import { errorResponse, successResponse } from '~/utils/apiResponse';
import { type ContactFormData, validateContactData } from '~/utils/validateContactData';
import { validateRequestData } from '~/utils/validateRequestData';

export async function POST(request: Request) {
  try {
    const data = await request.json();

    const validationResult = validateRequestData<ContactFormData>(data, validateContactData);

    if (!validationResult.valid) {
      return errorResponse(validationResult.errors, 400);
    }

    const { value } = validationResult;

    return successResponse(
      {
        success: true,
        data: value,
        message: 'Your collaboration request was accepted in demo mode.'
      },
      200
    );
  } catch (error) {
    console.error('Error processing collaboration request:', error);
    return errorResponse(['An unexpected error occurred. Please try again later.'], 500);
  }
}
