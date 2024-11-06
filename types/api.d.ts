import type { PrismicDocumentWithoutUID, PrismicDocument, PrismicDocumentWithUID } from '@prismicio/types'
import type { AllDocumentTypes, SettingsDocument } from '~/prismicio-types'

// Document data
export type DocumentWithUid = IntersectDocument<AllDocumentTypes, PrismicDocumentWithUID>
export type DocumentWithoutUid = IntersectDocument<AllDocumentTypes, PrismicDocumentWithoutUID>
export type ReachableDocument = ExcludeDocument<AllDocumentTypes, (SettingsDocument)>

// Document type
export type PrismicDocumentType = ExtractDocumentType<AllDocumentTypes>
export type DocumentWithUidType = ExtractDocumentType<DocumentWithUid>
export type DocumentWithoutUidType = ExtractDocumentType<IntersectDocument<AllDocumentTypes, PrismicDocumentWithoutUID>>
export type ReachableDocumentType = ExtractDocumentType<ReachableDocument>

//  UTILS
type PickPrismicDocument<Type extends PrismicDocumentType> = Extract<ReachableDocument, { type: Type }>

type ExtractDocumentType<T extends PrismicDocument> = Pick<T, 'type'>['type']
type IntersectDocument<T extends PrismicDocument, FilterType extends PrismicDocument> = T extends FilterType ? T : never
type ExcludeDocument<T extends PrismicDocument, FilterType extends PrismicDocument> = T extends FilterType ? never : T

type T = prismic.PrismicDocumentWithoutUID
