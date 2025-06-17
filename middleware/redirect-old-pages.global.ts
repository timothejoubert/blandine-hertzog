const redirectList = [
    {
        from: ['/portfolio/index.html', '/portfolio'],
        to: '/projets',
    },
    {
        from: ['/timeline-cv/index.html', '/timeline-cv'],
        to: '/a-propos',
    }
]

export default defineNuxtRouteMiddleware((to) => {
    const toRedirectIndex = redirectList.findIndex(redirect => redirect.from.includes(to.path)) 

    if (toRedirectIndex !== -1) {
        return navigateTo(redirectList[toRedirectIndex].to, { redirectCode: 301 })
    }
});