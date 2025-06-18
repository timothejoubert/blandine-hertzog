
import type { Context } from "@netlify/functions";

export default async (req: Request, context: Context) => {
    const token = Netlify.env.get("NUXT_GITHUB_USER_TOKEN ") || process.env.NUXT_GITHUB_USER_TOKEN 
    
    console.log(token, req.method, req.url, req.body, context.path)

    return fetch('https://api.github.com/repos/timothejoubert/blandine-hertzog/dispatches', {
        method: 'POST',
        headers: {
            Accept: 'application/vnd.github+json',
            Authorization: `token ${token}`,
        },
        body: JSON.stringify({
            event_type: 'prismic_publish_trigger',
            client_payload: {
                unit: false,
                integration: true,
            },
        }),
    })
}