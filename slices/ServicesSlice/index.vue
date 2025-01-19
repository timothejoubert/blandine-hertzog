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
                        :class="$style.cta"
                    >En savoir plus</a>
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
        content: '';
        left: calc(var(--gutter) * -1);
        right: calc(var(--gutter) * -1);
        bottom: 0;
        height: 1px;
        background-color: var(--theme-color-line);
    }
}

.list {
    position: relative;

    @include media('>=lg') {
        &::before {
            position: absolute;
            content: '';
            top: 0;
            left: 50%;
            width: calc(50% + var(--gutter));
            height: 100%;
            background-color: rgba(255, 255, 255, 0.05);
        }
    }
}

.service {
    display: flex;
    flex-direction: column;
    width: 100%;

    @include media('>=lg') {
        width: 50%;
    }
}

.left-head {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-right: calc(var(--gutter) * 0.5);
    position: relative;
    padding-block: rem(14);

    &::after {
        position: absolute;
        content: '';
        left: 0;
        right: 0;
        bottom: 0;
        height: 1px;
        background-color: var(--theme-color-line);
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
        opacity: 0.5;
        transition: opacity 0.3s;

        .service[data-active="true"] & {
            opacity: 1;
        }
    }
}

.cta {
    display: block;
    color: inherit;

    @include media('>=lg') {
        opacity: 0;
        translate: rem(10) 0;
        transform-origin: right center;
        transition: opacity 0.45s, translate 0.45s;

        .service[data-active="true"] & {
            opacity: 1;
            translate: 0;
        }
    }
}

.content {
    padding-block: rem(32) rem(48);

    @include media('>=lg') {
        margin-block: 0;
        display: flex;
        position: absolute;
        align-items: center;
        justify-content: center;
        top: 0;
        left: 50%;
        width: calc(50% + var(--gutter));
        height: 100%;
        padding-block: rem(40);
        padding-inline: calc(#{flex-grid-value(1, 14)} + var(--gutter) * 0.5);
        opacity: 0;
        translate: 0 rem(8);
        transition: opacity 0s, translate 0.4s;

        .service[data-active="true"] & {
            opacity: 1;
            translate: 0;
            transition: opacity 0.5s ease(out-quad);
        }
    }
}
</style>
