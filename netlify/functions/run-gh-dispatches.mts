
import type { Context } from "@netlify/functions";

export default async (req: Request, _context: Context) => {
    console.log('netlify function')

    if (req.method !== 'POST') {
        return new Response("wrong method to netlify function.", { status: 401 });
    }    

    const prismicWebhookPsw = Netlify.env.get("NUXT_PRISMIC_WEBHOOK_PASSWORD") || process.env.NUXT_PRISMIC_WEBHOOK_PASSWORD
    const rawBody = req.body
    console.log(req.body, rawBody)

    if (rawBody?.["secret"] !== prismicWebhookPsw) {
        return Response.json({...req, _context});
        // return new Response(`Webhook passphrase invalid, ${JSON.stringify(rawBody)}`, { 
        //     status: 403,
        //     headers: { 
        //         "content-type": "application/json" 
        //     },
        //     body: JSON.parse(req.body), 
        // }); 
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