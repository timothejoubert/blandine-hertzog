<script setup lang="ts">
import type { Content } from '@prismicio/client'
import VHeadSection from '~/components/atoms/VHeadSection.vue'

// The array passed to `getSliceComponentProps` is purely optional.
// Consider it as a visual hint for you when templating your slice.
const props = defineProps(
    getSliceComponentProps<Content.IntroSliceSlice>([
        'slice',
        'index',
        'slices',
        'context',
    ]),
)

const primary = computed(() => props.slice.primary)
const secondaryTitle = computed(() => primary.value.secondary_title)

const tagList = computed(() => {
    const tags = primary.value.attributes
    if (!tags.length) return []

    return tags.filter(field => field.attribut).map(field => field.attribut)
})
</script>

<template>
    <VSlice
        :slice="slice"
        :title="primary.title"
        :class="$style.root"
        class="grid"
    >
        <div :class="$style.main">
            <VHeadSection
                :title="primary.title"
                :class="$style.head"
            />
            <VText
                class="text-h4"
                :content="slice.primary.content"
                :class="$style.content"
            />
        </div>
        <aside :class="$style.aside">
            <h2
                class="text-over-title-sm"
                :class="$style['title-right']"
            >
                {{ secondaryTitle }}
            </h2>
            <ul :class="$style.list">
                <li
                    v-for="(attribute, i) in tagList"
                    :key="attribute || i"
                    :class="$style.item"
                    class="text-over-title-sm"
                >
                    {{ attribute }}
                </li>
            </ul>
        </aside>
    </VSlice>
</template>

<style lang="scss" module="">
@use 'assets/scss/variables/fonts' as *;
@use 'assets/scss/functions/rem' as *;
@use 'assets/scss/functions/flex-grid' as *;
@use "assets/scss/mixins/include-media" as *;

.root {
    --intro-slice-paddin-block-content: #{rem(42)};

    position: relative;

    &::after {
        position: absolute;
        right: calc(var(--gutter) * -1);
        bottom: 0;
        left: calc(var(--gutter) * -1);
        height: 1px;
        background-color: var(--theme-color-line);
        content: '';
    }
}

.main {
    grid-column: 1 / -1;

    @include media('>=lg') {
        grid-column: 1 / 12;
    }
}

.content {
    max-width: 38ch;
    grid-column: 1 / -1;
    margin-block: var(--intro-slice-paddin-block-content);

    & p {
        margin-block: 0;
    }

    @include media('>=lg') {
        grid-column: 1 / span 12;
    }
}

.aside {
    display: flex;
    flex-direction: column;
    grid-column: 1 / -1;

    @include media('>=lg') {
        width: calc(100% + var(--gutter) * 2);
        border-left: 1px solid var(--theme-color-line);
        margin-left: calc(var(--gutter) * -1);
        grid-column: 12 / -1;
    }
}

.title-right {
    position: relative;
    margin-block: 0;
    padding-block: var(--spacing-over-title-padding-block);

    &::before,
    &::after {
        position: absolute;
        right: calc(var(--gutter) * -1);
        left: calc(var(--gutter) * -1);
        height: 1px;
        background-color: var(--theme-color-line);
        content: '';
    }

    &::before {
        top: 0;
    }

    &::after {
        bottom: 0;
    }

    @include media('>=lg') {
        padding-left: var(--gutter);

        &::before,
        &::after {
            right: 0;
            left: 0;
        }
    }
}

.list {
    display: flex;
    height: 100%;
    flex-direction: column;
    justify-content: center;
    gap: rem(12);
    margin-block: var(--intro-slice-paddin-block-content);

    @include media('>=lg') {
        padding-left: var(--gutter);
    }
}

.item {
    font-family: $font-space-mono-family;
    list-style: none;
}
</style>
