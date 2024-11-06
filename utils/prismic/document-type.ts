import type { DocumentWithUidType, PrismicDocumentType } from '~/types/api'
import { prismicDocumentRoutes } from '~/utils/prismic/route-resolver'

export function isPrismicDocument() {}

export function isExistingDocumentType(type: string) {
    return !!prismicDocumentRoutes.find(route => route.type === type)
}

export function isHomeDocument(type: string) {
    return type === ('home_page' as PrismicDocumentType)
}

export function isProjectDocument(type: string) {
    return type === ('project' as PrismicDocumentType)
}

export function isProjectListingDocument(type: string) {
    return type === ('project_listing_page' as PrismicDocumentType)
}

export function isDynamicDocument(type: PrismicDocumentType) {
    const documentWithUidType: DocumentWithUidType[] = ['project']

    return documentWithUidType.some(uidType => uidType === type)
}
