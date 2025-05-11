import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { BackendResponse } from '@/lib/types';

const BACKEND_URL = process.env.BACKEND_URL || 'http://localhost:8000';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { repoUrl, requirementsFolder } = body;

    const response = await fetch(`${BACKEND_URL}/connect-repository`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ repoUrl, requirementsFolder }),
    });

    const data: BackendResponse = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'Backend service error');
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error('Error connecting repository:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to connect repository' },
      { status: 500 }
    );
  }
}