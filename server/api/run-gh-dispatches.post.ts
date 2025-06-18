export default defineEventHandler((event) => {
    const runtimeConfig = useRuntimeConfig(event)

    if (!runtimeConfig.github.userToken) {
      return setResponseStatus(event, 503, 'Missing userToken to run github dispatch event')
    }

    return $fetch('https://api.github.com/repos/timothejoubert/blandine-hertzog/dispatches', {
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
})