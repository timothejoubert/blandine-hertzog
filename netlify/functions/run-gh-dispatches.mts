
import type { Context } from "@netlify/functions";

export default async (request: Request, _context: Context) => {
    console.log('-- netlify function ---')

    if (request.method !== 'POST') {
        return new Response("wrong HTTP method to netlify function.", { status: 401 });
    }    

    const data = await request.json()
    console.log('request data: ', request, data)

    if (!data || typeof data !== 'object') {
        return new Response(`Can't find body content, ${request}, ${data}`); 
    }

    const prismicWebhookPsw = Netlify.env.get("NUXT_PRISMIC_WEBHOOK_PASSWORD") || process.env.NUXT_PRISMIC_WEBHOOK_PASSWORD
    if (data?.secret !== prismicWebhookPsw) {
        return new Response(`Webhook passphrase invalid`, { 
            status: 403,
        }); 
    }
    
    console.log('--- call netlify_function_publish_trigger dispatch event on github ---')
    return fetch('https://api.github.com/repos/timothejoubert/blandine-hertzog/dispatches', {
        method: 'POST',
        headers: {
            Accept: 'application/vnd.github+json',
            Authorization: `token ${Netlify.env.get("NUXT_GITHUB_USER_TOKEN") || process.env.NUXT_GITHUB_USER_TOKEN }`,
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