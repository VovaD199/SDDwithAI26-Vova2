import { errorResponse } from '~/utils/apiResponse';

export async function POST() {
  return errorResponse(['Captcha verification is disabled for this demo.'], 503);
}
