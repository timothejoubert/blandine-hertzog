<script setup lang="ts">
import type { Content } from '@prismicio/client'
import { isFilled } from '@prismicio/client'
import VSectionTitle from '~/components/atoms/VSectionTitle.vue'
import VTitleTranslate from '~/components/molecules/VTitleTranslate.vue'

const props = defineProps(
    getSliceComponentProps<Content.ServicesSliceSlice>(),
)

const primary = computed(() => props.slice.primary)
// const linkReference = computed(() => primary.value.external_url || primary.value.internal_page)

const services = computed(() => {
    const fields = primary.value.services
    if (!fields.length) return

    return fields.map((field, index) => {
        return {
            index,
            title: isFilled.keyText(field.title) ? field.title : '',
            content: field.content,
        }
    })
})

const {
    setRefList,
    listElements,
    activeIndex,
    offsetTop,
    targetRect
} = useActiveElementPosition({ defaultIndex: 0, resetOnLeave: false })

const activeElementHeight = computed(() => {
    if (!targetRect.value?.height || typeof activeIndex.value !== 'number') return '0px'

    return Math.floor(targetRect.value.height) + 'px'
})

const activeElementTopDist = computed(() => {
    return Math.floor(offsetTop.value) + 'px'
})

function toggleActiveIndex(index: number) {
    if (index === activeIndex.value) activeIndex.value = null
    else activeIndex.value = index
}
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
            :class="$style.body"
        >
            <div
                v-for="(service, index) in services"
                :key="service.title + index"
                :ref="setRefList"
                :class="$style.item"
                :data-active="activeIndex === index"
                @click="toggleActiveIndex(index)"
            >
                <VTitleTranslate
                    :active="activeIndex === index"
                    :class="[$style.item__title]"
                    :hover-element="listElements[index]"
                    class="text-h6"
                    tag="h3"
                    :title="service.title"
                >
                    <VIcon
                        :name="activeIndex === index ? 'minus' : 'plus'"
                        :class="$style.icon"
                        size="20px"
                    />   
                </VTitleTranslate>
                <VText
                    :class="$style.item__content"
                    class="text-body-md"
                    :content="service.content"
                />
            </div>
        </div>
    </VSlice>
</template>

<style lang="scss" module>
@use 'assets/scss/functions/flex-grid' as *;

.root {
    position: relative;
}

.title {
    margin-bottom: rem(120);
    grid-column: 1 / -1;
}

.body {
    position: relative;
    width: 100%;
    padding-left: 20px;
    grid-column: 1 / -1;

    &::before,
    &::after {
        position: absolute;
        z-index: -1;
        top: 0;
        left: 0;
        width: 1px;
        content: '';
    }

    &::before {
        height: 100%;
        background-color: var(--theme-color-line);

    }

    &::after {
        height: v-bind('activeElementHeight');
        background-color: var(--theme-color-primary);
        transform-origin: top;
        transition: translate 0.3s ease(out-quad), height 0.3s ease(out-quad);
        translate: 0 v-bind('activeElementTopDist');
    }

    @include media('>=lg') {
        grid-column: 3 / -3;
    }
}

.item {
    display: grid;
    margin-bottom: rem(18);
    grid-template-rows: min-content 0fr;
    transition: grid-template-rows 0.4s ease(out-quad);

    &:last-child {
        margin-bottom: initial;
    }

    &[data-active="true"] {
        grid-template-rows: min-content 1fr;
    }

    @include media('>=lg') {
        width: fit-content;
        margin-bottom: rem(48);
        margin-bottom: initial;
        transition: initial;
    }
}

.item__title {
    --v-title-translate-wrapper-padding-block: 4px;

    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-block: 0;

    @include media('>=lg') {
        opacity: 0.4;
        transition: opacity 0.3s;

        .item[data-active="true"] & {
            opacity: 1;
        }
    }
}

.icon {
    @include media('>=lg') {
        display: none;
    }
}

.item__content {
	overflow: hidden;
    pointer-events: none;

    > * {
        max-width: 62ch;
        margin-bottom: initial;
        padding-block: rem(12) 0;
    }

    @include media('>=lg') {
        position: absolute;
        top: 0;
        right: 0;
        display: flex;
        width: calc(50% - var(--gutter) * 0.5);
        height: 100%;
        align-items: center;
        justify-content: center;
        margin-block: 0;
        opacity: 0;
        padding-block: rem(40);
        transition: opacity 0s, translate 0.4s;
        translate: 0 rem(8);

        > * {
            max-width: 46ch;
        }

        .item[data-active="true"] & {
            opacity: 1;
            transition: opacity 0.5s ease(out-quad);
            translate: 0;
        }
    }
}
</style>
