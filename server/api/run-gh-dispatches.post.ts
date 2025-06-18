export default defineEventHandler(async (event) => {
    const runtimeConfig = useRuntimeConfig(event)

    if (!runtimeConfig.github.userToken) {
      return setResponseStatus(event, 403, 'Missing userToken to run github dispatch event')
    }

    await $fetch('https://api.github.com/repos/timothejoubert/blandine-hertzog/dispatches', {
        method: 'POST',
        headers: {
            Accept: 'application/vnd.github+json',
            Authorization: `token ${runtimeConfig.github.userToken}`,
        },
        body: {
            event_type: 'preprod_api_publish_trigger',
            client_payload: {
                unit: false,
                integration: true,
            },
        },
    })

    return new Response(`github dispatch event successfully send with 'preprod_api_publish_trigger' event_type`, { 
        status: 200,
    }); 
})