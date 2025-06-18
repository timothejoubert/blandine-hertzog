
import type { Context } from "@netlify/functions";

export default async (req: Request, _context: Context) => {
    console.log(req)

    if (req.method !== 'POST') {
        return new Response("wrong method to netlify function.", { status: 401 });
        return 
    }    

    // const prismicWebhookPsw = Netlify.env.get("NUXT_PRISMIC_WEBHOOK_PASSWORD") || process.env.NUXT_PRISMIC_WEBHOOK_PASSWORD
    // if (req.donKnow !== prismicWebhookPsw) {
    //     console.log(req, 'Webhook passphrase invalid')
    //     return new Response("Webhook passphrase invalid", { status: 403 }); 
    // }
    

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