
// This redirection is used in production for client only
// SSR redirection is made by .htaccess file in apache ionos webhost 
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

const projectList = [
    '/page-pompotes.html',
    '/page-lustucru.html',
    '/page-dermophil.html',
    '/page-bandai.html',
    '/page-ctlmgaming.html',
    '/page-intruders.html',
    '/page-lesieur--on.html',
    '/page-happymeal.html',
    '/page-mentors.html',
    '/page-continuity.html',
    '/page-saltodrogo.html',
    '/page-thesepro.html',
    '/page-iletaitjo.html',
    '/page-feelsfinder.html',
    '/page-pulco.html',
    '/page-memoire.html',
    '/page-bretez.html',
    '/page-nearly.html',
    '/page-flv.html',
    '/page-ldo.html',
    '/page-objetgraphique.html',
    '/page-windows.html',
    '/page-deafparade.html',
    '/page-pentel.html',
    '/page-109lagence.html',
    '/page-lesensdelavie.html',
    '/page-portraitspresse.html',
    '/page-peauneuve.html',
    '/page-clermont.html',
    '/page-nb.html',
    '/page-northface.html',
    '/page-swiss.html',
    '/page-confluence.html',
    '/page-cabaroc.html',
    '/vjing/index.html',
    '/page-typomonstre.html',
    '/page-planeite.html',
    '/page-klafouti.html',
    '/page-orus.html',
    '/page-deslettres.html'
]

export default defineNuxtRouteMiddleware((to) => {
    if(projectList.includes(to.path)) {
        return '/projets'
    }

    const toRedirectIndex = redirectList.findIndex(redirect => redirect.from.includes(to.path)) 
    if (toRedirectIndex !== -1) {
        return navigateTo(redirectList[toRedirectIndex].to, { redirectCode: 301 })
    }
});