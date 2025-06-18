
import type { Context } from "@netlify/functions";

export default async (request: Request, _context: Context) => {
    console.log('-- netlify function ---')

    if (request.method !== 'POST') {
        return new Response("Invalid HTTP method. Only POST is allowed.", { status: 405 });
    }

    const prismicWebhookPsw = Netlify.env.get("NUXT_PRISMIC_WEBHOOK_PASSWORD") || process.env.NUXT_PRISMIC_WEBHOOK_PASSWORD
    const githubToken = Netlify.env.get("NUXT_GITHUB_USER_TOKEN") || process.env.NUXT_GITHUB_USER_TOKEN

    if (!prismicWebhookPsw || !githubToken) {
        console.error("Missing secrets in environment.");
        return new Response("Server misconfigured: missing secrets.", { status: 500 });
    }

    try {
        const data = await request.json()

       if (data?.secret !== prismicWebhookPsw) {
            return new Response("Invalid webhook secret.", { status: 403 });
        }
        
        const dispatchRes = await fetch('https://api.github.com/repos/timothejoubert/blandine-hertzog/dispatches', {
            method: 'POST',
            headers: {
                Accept: 'application/vnd.github+json',
                Authorization: `token ${githubToken}`,
                'User-Agent': 'blandine-hertzog/1.0',
            },
            body: JSON.stringify({
                event_type: 'netlify_function_publish_trigger',
                client_payload: {
                    unit: false,
                    integration: true,
                },
            }),
        })

        if (!dispatchRes.ok) {
            const errorText = await dispatchRes.text();
            console.error("GitHub dispatch failed:", errorText);
            return new Response("GitHub dispatch failed: " + errorText, { status: 500 });
        }

        return new Response("GitHub dispatch triggered successfully with event_type: netlify_function_publish_trigger", { status: 200 });

    } catch (error) {
        console.error("Error handling request:", error);
        return new Response("Internal server error.", { status: 500 });
    }
}