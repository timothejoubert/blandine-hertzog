export function useRouteQuery(queryKey: string) {
    const route = useRoute()
    const router = useRouter()

    const currentQueries = computed(() => {
        const query = route.query[queryKey]
        return (Array.isArray(query) ? query : [query]).filter(q => !!q)
    })

    const hasQuery = computed(() => !!currentQueries.value.length)

    function toggleQuery(query: string) {
        const current = [...currentQueries.value.slice()]

        const hasQuery = current.includes(query)
        const newQueries = hasQuery ? current.filter(q => q !== query) : [...current, query]

        router.replace({ ...route, query: newQueries.length ? { [queryKey]: newQueries } : undefined })
    }

    return { currentQueries, hasQuery, toggleQuery }
}
