<script setup lang="ts">
import type { Content } from '@prismicio/client'
import { isFilled } from '@prismicio/client'

const props = defineProps(
    getSliceComponentProps<Content.ContactSliceSlice>(),
)
const primary = computed(() => props.slice.primary)

console.log(primary.value)
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
            <div :class="$style.title">
                {{ bodyContent.title }}
            </div>
            <VText
                v-if="bodyContent.content"
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
    grid-column: 1 / -1;

    @include media('>=lg') {
        grid-column: 1 / span 4;
    }
}

.body {
    grid-column: 1 / -1;

    @include media('>=lg') {
        grid-column: 6 / span 4;
    }
}

.title {
    text-transform: uppercase;
}

.socials {
    width: fit-content;
    flex-direction: column;
    gap: rem(8);
    grid-column: 1 / -1;
    text-transform: uppercase;

    @include media('>=lg') {
        grid-column: 11 / -1;
    }
}
</style>
