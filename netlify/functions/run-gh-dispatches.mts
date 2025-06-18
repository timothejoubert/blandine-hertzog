
import type { Context } from "@netlify/functions";

export default async (req: Request, _context: Context) => {
    console.log('netlify function')

    if (req.method !== 'POST') {
        return new Response("wrong method to netlify function.", { status: 401 });
    }    

    const prismicWebhookPsw = Netlify.env.get("NUXT_PRISMIC_WEBHOOK_PASSWORD") || process.env.NUXT_PRISMIC_WEBHOOK_PASSWORD

    const requestBody = await req.json()
    const data = requestBody?.source
    console.log('data', req.body, requestBody, data)

    if (typeof data !== 'object') {
        return new Response(`Can't find body content, ${data}`); 
    }

    if (typeof data === 'object' && data?.["secret"] !== prismicWebhookPsw) {
        return new Response(`Webhook passphrase invalid`, { 
            status: 403,
        }); 
    }
    

    return fetch('https://api.github.com/repos/timothejoubert/blandine-hertzog/dispatches', {
        method: 'POST',
        headers: {
            Accept: 'application/vnd.github+json',
            Authorization: `token ${Netlify.env.get("NUXT_GITHUB_USER_TOKEN ") || process.env.NUXT_GITHUB_USER_TOKEN }`,
        },
        body: JSON.stringify({
            event_type: 'netlify_function_publish_trigger',
            client_payload: {
                unit: false,
                integration: true,
            },
        }),
    })
}