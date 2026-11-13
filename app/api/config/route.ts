import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    turnstileSiteKey: null,
    turnstileEnabled: false
  });
}
