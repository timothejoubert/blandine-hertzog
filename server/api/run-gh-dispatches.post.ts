export default defineEventHandler(async (event) => {
    const runtimeConfig = useRuntimeConfig(event)

    const githubUserToken = runtimeConfig.github.userToken
    if (!githubUserToken) {
        return new Response('Missing userToken to run github dispatch event', { status: 403 })
    }

    const prismicWebhookPsw = runtimeConfig.prismic.webhookPassword
    const body = await readBody(event)

    if (prismicWebhookPsw && body?.secret !== prismicWebhookPsw) {
        return new Response("Invalid webhook secret.", { status: 403 });
    }

    try {
        await $fetch('https://api.github.com/repos/timothejoubert/blandine-hertzog/dispatches', {
            method: 'POST',
            headers: {
                Accept: 'application/vnd.github+json',
                Authorization: `token ${githubUserToken}`,
                'User-Agent': 'blandine-hertzog/1.0',
            },
            body: {
                event_type: 'preprod_api_publish_trigger',
                client_payload: {
                    unit: false,
                    integration: true,
                },
            },
        })

        return new Response(
            `GitHub dispatch event successfully sent with 'preprod_api_publish_trigger'`,
            { status: 200 }
        )

    } catch (err) {
        console.error('GitHub dispatch error:', err)
        return new Response('Error triggering GitHub dispatch.', { status: 500 })
    } 
})