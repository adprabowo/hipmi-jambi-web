import { google } from 'googleapis';

const SCOPES = ['https://www.googleapis.com/auth/indexing'];

// Initialize auth from service account credentials
function getAuth() {
    const credentials = process.env.GOOGLE_SERVICE_ACCOUNT_KEY;

    if (!credentials) {
        throw new Error('GOOGLE_SERVICE_ACCOUNT_KEY environment variable is not set');
    }

    const serviceAccount = JSON.parse(credentials);

    const auth = new google.auth.GoogleAuth({
        credentials: serviceAccount,
        scopes: SCOPES,
    });

    return auth;
}

export type IndexingAction = 'URL_UPDATED' | 'URL_DELETED';

export interface IndexingResult {
    success: boolean;
    url: string;
    action: IndexingAction;
    message?: string;
    error?: string;
}

/**
 * Notify Google that a URL has been updated or deleted
 * @param url - The full URL to index/deindex
 * @param action - 'URL_UPDATED' for new/updated content, 'URL_DELETED' for removed content
 */
export async function notifyGoogleIndexing(
    url: string,
    action: IndexingAction = 'URL_UPDATED'
): Promise<IndexingResult> {
    try {
        const auth = getAuth();
        const indexing = google.indexing({ version: 'v3', auth });

        const response = await indexing.urlNotifications.publish({
            requestBody: {
                url: url,
                type: action,
            },
        });

        console.log(`[Google Indexing] ${action} for ${url}:`, response.data);

        return {
            success: true,
            url,
            action,
            message: `Successfully notified Google about ${action} for ${url}`,
        };
    } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        console.error(`[Google Indexing] Error for ${url}:`, errorMessage);

        return {
            success: false,
            url,
            action,
            error: errorMessage,
        };
    }
}

/**
 * Notify Google about multiple URLs (batch)
 * @param urls - Array of URLs to notify
 * @param action - 'URL_UPDATED' or 'URL_DELETED'
 */
export async function notifyGoogleIndexingBatch(
    urls: string[],
    action: IndexingAction = 'URL_UPDATED'
): Promise<IndexingResult[]> {
    const results: IndexingResult[] = [];

    // Google Indexing API has rate limits, so we process sequentially
    for (const url of urls) {
        const result = await notifyGoogleIndexing(url, action);
        results.push(result);

        // Small delay to avoid rate limiting
        await new Promise(resolve => setTimeout(resolve, 100));
    }

    return results;
}

/**
 * Get the URL status from Google Indexing API
 * @param url - The URL to check
 */
export async function getGoogleIndexingStatus(url: string) {
    try {
        const auth = getAuth();
        const indexing = google.indexing({ version: 'v3', auth });

        const response = await indexing.urlNotifications.getMetadata({
            url: url,
        });

        return {
            success: true,
            url,
            metadata: response.data,
        };
    } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        return {
            success: false,
            url,
            error: errorMessage,
        };
    }
}
