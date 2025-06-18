export default defineEventHandler((event) => {
    const runtimeConfig = useRuntimeConfig(event)

    if (!runtimeConfig.github.userToken || !runtimeConfig.github.repo) {
      return setResponseStatus(event, 503, 'Missing userToken or github repo to run github dispatch event')
    }
    
    const githubDispatchUrl = `${runtimeConfig.github.repo}/dispatches`

    return $fetch(githubDispatchUrl, {
        method: 'POST',
        headers: {
            Accept: 'application/vnd.github+json',
            Authorization: `token ${runtimeConfig.github.userToken}`,
        },
        body: {
            event_type: 'prismic_publish_trigger',
            client_payload: {
                unit: false,
                integration: true,
            },
        },
    })
})