import type { PickPrismicDocument, PrismicDocumentType } from '~/types/api'

export type PageComponentProps<Type extends PrismicDocumentType> = {
    document: PickPrismicDocument<Type>
    slices?: unknown
}
