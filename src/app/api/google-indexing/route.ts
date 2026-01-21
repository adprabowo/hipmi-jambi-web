import { NextRequest, NextResponse } from 'next/server';
import { notifyGoogleIndexing, getGoogleIndexingStatus, IndexingAction } from '@/lib/google-indexing';

// POST - Notify Google about URL update/delete
export async function POST(request: NextRequest) {
    try {
        // Check if API key is set (basic protection)
        if (!process.env.GOOGLE_SERVICE_ACCOUNT_KEY) {
            return NextResponse.json(
                { error: 'Google Indexing API is not configured' },
                { status: 503 }
            );
        }

        const body = await request.json();
        const { url, action = 'URL_UPDATED' } = body as { url: string; action?: IndexingAction };

        if (!url) {
            return NextResponse.json(
                { error: 'URL is required' },
                { status: 400 }
            );
        }

        // Validate action
        if (!['URL_UPDATED', 'URL_DELETED'].includes(action)) {
            return NextResponse.json(
                { error: 'Action must be URL_UPDATED or URL_DELETED' },
                { status: 400 }
            );
        }

        const result = await notifyGoogleIndexing(url, action);

        if (result.success) {
            return NextResponse.json(result);
        } else {
            return NextResponse.json(result, { status: 500 });
        }
    } catch (error) {
        console.error('[Google Indexing API] Error:', error);
        return NextResponse.json(
            { error: 'Failed to notify Google Indexing API' },
            { status: 500 }
        );
    }
}

// GET - Get URL status from Google
export async function GET(request: NextRequest) {
    try {
        if (!process.env.GOOGLE_SERVICE_ACCOUNT_KEY) {
            return NextResponse.json(
                { error: 'Google Indexing API is not configured' },
                { status: 503 }
            );
        }

        const { searchParams } = new URL(request.url);
        const url = searchParams.get('url');

        if (!url) {
            return NextResponse.json(
                { error: 'URL query parameter is required' },
                { status: 400 }
            );
        }

        const result = await getGoogleIndexingStatus(url);

        if (result.success) {
            return NextResponse.json(result);
        } else {
            return NextResponse.json(result, { status: 500 });
        }
    } catch (error) {
        console.error('[Google Indexing API] Error:', error);
        return NextResponse.json(
            { error: 'Failed to get status from Google Indexing API' },
            { status: 500 }
        );
    }
}
