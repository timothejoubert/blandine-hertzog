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

const activeService = ref(0)
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
            :class="$style.body"
        >
            <div
                v-for="(service, index) in services"
                :key="service.title"
                :class="$style.item"
                :data-active="activeService === index"
                @mouseenter="() => activeService = index"
            >
                <VLabel v-slot="{ componentClass }">
                    <VTitleTranslate
                        :active="activeService === index"
                        :class="[$style.item__title, componentClass]"
                        class="text-h5"
                        tag="h3"
                        :title="service.title"
                    />
                </VLabel>
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
    margin-block: 240px 180px;

    @include media('>=vl') {
        grid-column: 3 / -3;
    }
}

.item {
    width: fit-content;
}

.item__title {
    --v-title-translate-wrapper-padding-block: 4px;

    padding-left: 20px;
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
    z-index: -1;
    padding-block: rem(32) rem(48);

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
