import EventType from '~/constants/event-type'
import type { ReachableDocument } from '~/types/api'

export interface Page {
    title?: string
    document?: ReachableDocument | null | undefined
}

type UsePageOptions = Page

export function usePage(options?: UsePageOptions) {
    const nextPage = useNextPage()
    const currentPage = useCurrentPage()

    nextPage.value = {
        title: options?.title,
        document: options?.document,
    }

    function updatePage() {
        currentPage.value = { ...nextPage.value }
    }

    usePageTransitionEvent(EventType.PAGE_TRANSITION_AFTER_LEAVE, updatePage)
}
