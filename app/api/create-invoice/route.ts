import { errorResponse } from '~/utils/apiResponse';

export async function POST() {
  return errorResponse(['Donations are disabled for this demo.'], 503);
}
