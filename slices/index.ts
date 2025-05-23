// Code generated by Slice Machine. DO NOT EDIT.

import { defineAsyncComponent } from 'vue'
import { defineSliceZoneComponents } from '@prismicio/vue'

export const components = defineSliceZoneComponents({
    contact_slice: defineAsyncComponent(() => import('./ContactSlice/index.vue')),
    content_slice: defineAsyncComponent(() => import('./ContentSlice/index.vue')),
    cta_slice: defineAsyncComponent(() => import('./CtaSlice/index.vue')),
    project_feed_slice: defineAsyncComponent(
        () => import('./ProjectFeedSlice/index.vue'),
    ),
    services_slice: defineAsyncComponent(
        () => import('./ServicesSlice/index.vue'),
    ),
    simple_text_slice: defineAsyncComponent(
        () => import('./SimpleTextSlice/index.vue'),
    ),
})
