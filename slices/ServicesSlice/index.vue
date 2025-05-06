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

const { setRefList, activeIndex, offsetTop, targetRect } = useActiveElementPosition()
</script>

<template>
    <VSlice
        :slice="slice"
        :class="$style.root"
        spacing="xxl"
        class="grid"
    >
        <VSectionTitle
            v-if="primary.title"
            :label="primary.title"
            :class="$style.title"
        />
        <div
            :style="{
                '--offset-top': `${Math.floor(offsetTop)}px`,
                '--target-height': targetRect?.height ? `${Math.floor(targetRect.height)}px` : undefined,
            }"
            :class="$style.body"
        >
            <div
                v-for="(service, index) in services"
                :key="service.title + index"
                :ref="setRefList"
                :class="$style.item"
                :data-active="activeIndex === index"
            >
                <VTitleTranslate
                    :active="activeIndex === index"
                    :class="[$style.item__title]"
                    class="text-h6"
                    tag="h3"
                    :title="service.title"
                />
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
    grid-column: 1 / -1;
}

.body {
    position: relative;
    width: 100%;
    grid-column: 1 / -1;
    margin-block: 180px;
    padding-left: 20px;

    &::before,
    &::after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 1px;
        z-index: -1;
    }

    &::before {
        height: 100%;
        background-color: var(--theme-color-line);

    }

    &::after {
        height: var(--target-height, calc(100% / var(--list-length, 5)));
        translate: 0 var(--offset-top);
        background-color: var(--theme-color-primary);
        transition: translate 0.3s ease(out-quad);
    }

    @include media('>=lg') {
        grid-column: 3 / -3;
    }
}

.item {
    margin-bottom: rem(48);
    
    @include media('>=lg') {
        width: fit-content;
        margin-bottom: initial;
    }
}

.item__title {
    --v-title-translate-wrapper-padding-block: 4px;

    margin-block: 0;

    @include media('>=lg') {
        opacity: 0.4;
        transition: opacity 0.3s;

        .item[data-active="true"] & {
            opacity: 1;
        }
    }
}

.item__content {
    padding-block: rem(12) 0;

    > * {
        max-width: 62ch;
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

        // padding-inline: calc(#{flex-grid-value(1, 14)} + var(--gutter) * 0.5);
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
