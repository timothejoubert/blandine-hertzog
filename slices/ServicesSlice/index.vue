<script setup lang="ts">
import type { Content } from '@prismicio/client'
import VTitleTranslate from '~/components/molecules/VTitleTranslate.vue'

const props = defineProps(
    getSliceComponentProps<Content.ServicesSliceSlice>([
        'slice',
        'index',
        'slices',
        'context',
    ]),
)

const primary = computed(() => props.slice.primary)
const linkReference = computed(() => primary.value.external_url || primary.value.internal_page)

const services = computed(() => {
    const fields = primary.value.services
    if (!fields.length) return

    return fields.map((field, index) => {
        return {
            index,
            title: field.title,
            content: field.content,
        }
    })
})

const activeService = ref(0)
</script>

<template>
    <VSlice
        :slice="slice"
        :class="$style.root"
    >
        <VHeadSection
            :title="primary.title"
            :link-label="primary.link_label"
            :link-reference="linkReference"
        />
        <div :class="$style.list">
            <div
                v-for="(service, index) in services"
                :key="service.title"
                :class="$style.service"
                :data-active="activeService === index"
                @mouseenter="() => activeService = index"
            >
                <div :class="$style['left-head']">
                    <VTitleTranslate
                        :active="activeService === index"
                        :class="$style.title"
                        class="text-h4"
                        tag="h3"
                        :title="service.title"
                    />
                    <a
                        :inert="activeService !== index"
                        href=""
                        class="text-over-title-sm"
                        :class="$style.cta"
                    >En savoir +</a>
                </div>
                <VText
                    :class="$style.content"
                    class="text-body-md"
                    :content="service.content"
                />
            </div>
        </div>
    </VSlice>
</template>

<style lang="scss" module>
@use 'assets/scss/functions/rem' as *;
@use 'assets/scss/functions/flex-grid' as *;
@use 'assets/scss/mixins/include-media' as *;

.root {
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

.list {
    position: relative;

    @include media('>=lg') {
        &::before {
            position: absolute;
            top: 0;
            left: 50%;
            width: calc(50% + var(--gutter));
            height: 100%;
            background-color: rgba(255, 255, 255, 5%);
            content: '';
        }
    }
}

.service {
    display: flex;
    width: 100%;
    flex-direction: column;

    @include media('>=lg') {
        width: 50%;
    }
}

.left-head {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-right: calc(var(--gutter) * 0.5);
    padding-block: rem(14);

    &::after {
        position: absolute;
        right: 0;
        bottom: 0;
        left: 0;
        height: 1px;
        background-color: var(--theme-color-line);
        content: '';
    }

    @include media('>=lg') {
        border-right: 1px solid var(--theme-color-line);

        &::after {
            left: calc(var(--gutter) * -1);
        }
    }
}

.title {
    margin-block: 0;

    @include media('>=lg') {
        opacity: 0.6;
        transition: opacity 0.3s;

        .service[data-active="true"] & {
            opacity: 1;
        }
    }
}

.cta {
    display: block;
    padding: rem(4) rem(8);
    border-radius: rem(2);
    background-color: var(--theme-color-primary);
    color: var(--theme-color-background);
    text-decoration: none;

    @include media('>=lg') {
        opacity: 0;
        transform-origin: right center;
        transition: opacity 0.45s, translate 0.45s;
        translate: rem(10) 0;

        .service[data-active="true"] & {
            opacity: 1;
            translate: 0;
        }
    }
}

.content {
    padding-block: rem(32) rem(48);

    > * {
        max-width: 42ch;
    }

    @include media('>=lg') {
        position: absolute;
        top: 0;
        left: 50%;
        display: flex;
        width: calc(50% + var(--gutter));
        height: 100%;
        align-items: center;
        justify-content: center;
        margin-block: 0;
        opacity: 0;
        padding-block: rem(40);
        padding-inline: calc(#{flex-grid-value(1, 14)} + var(--gutter) * 0.5);
        transition: opacity 0s, translate 0.4s;
        translate: 0 rem(8);

        .service[data-active="true"] & {
            opacity: 1;
            transition: opacity 0.5s ease(out-quad);
            translate: 0;
        }
    }
}
</style>
