<script setup lang="ts">
import type { Content } from '@prismicio/client'
import { isFilled } from '@prismicio/client'

const props = defineProps(
    getSliceComponentProps<Content.ContactSliceSlice>(),
)
const primary = computed(() => props.slice.primary)

const bodyContent = computed(() => {
    if (!isFilled.group(primary.value.body)) return

    return primary.value.body[0]
})
</script>

<template>
    <VSlice
        :slice="slice"
        :class="$style.root"
        class="grid"
        :spacing="primary.spacing"
    >
        <VSectionTitle
            v-if="primary.title"
            :label="primary.title"
            :class="$style.title"
        />
        <div
            v-if="bodyContent"
            :class="$style.body"
        >
            <div :class="$style['inner-title']">
                {{ bodyContent.title }}
            </div>
            <VText
                v-if="bodyContent.content"
                :class="$style.content"
                :content="bodyContent.content"
            />
        </div>
        <VSocials
            :class="$style.socials"
            display-label
            filter
        />
    </VSlice>
</template>

<style lang="scss" module>
.root {
    align-items: flex-start;
}

.title {
    margin-bottom: rem(94);
    grid-column: 1 / -1;

    @include media('>=lg') {
        margin-bottom: initial;
        grid-column: 1 / span 4;
    }
}

.body {
    margin-bottom: rem(64);
    grid-column: 1 / -1;

    @include media('>=lg') {
        margin-bottom: initial;
        grid-column: 6 / span 4;
    }
}

.inner-title {
    text-transform: uppercase;
}

.content {
    margin-top: rem(16);
}

.socials {
    width: fit-content;
    flex-direction: column;
    align-items: flex-start;
    gap: rem(14);
    grid-column: 1 / -1;
    text-transform: uppercase;

    @include media('>=lg') {
        gap: rem(8);
        grid-column: 11 / -1;
    }
}
</style>
