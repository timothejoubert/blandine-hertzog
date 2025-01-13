<script setup lang="ts">
import type { Content } from '@prismicio/client'
import { VPrismicLink } from '#components'

// The array passed to `getSliceComponentProps` is purely optional.
// Consider it as a visual hint for you when templating your slice.
const props = defineProps(
    getSliceComponentProps<Content.ContactSliceSlice>(),
)

const data = computed(() => props.slice.primary)

const attributes = computed(() => {
    return data.value.attributs.map((attribute) => {
        return {
            label: attribute.label,
            externalUrl: attribute.external_url,
            icon: attribute.icon === 'Phone' ? 'phone' : attribute.icon === 'Email' ? 'email' : 'arrow-up-small',
        }
    })
})
</script>

<template>
    <VSlice
        :slice="slice"
        :class="$style.root"
        :title="data.title"
        class="grid"
    >
        <div
            v-if="attributes.length"
            :class="$style.attributes"
        >
            <template
                v-for="(attribute, i) in attributes"
                :key="attribute.label || i"
            >
                <component
                    :is="attribute.externalUrl ? VPrismicLink : 'div'"
                    :to="attribute.externalUrl"
                    :class="$style.attribute"
                >
                    <div class="text-over-title-sm">
                        {{ attribute.label }}
                    </div>
                    <VIcon
                        v-if="attribute.icon"
                        :name="attribute.icon"
                    />
                </component>
            </template>
        </div>
        <VText
            v-if="data.content"
            :class="$style.content"
            :content="data.content"
            class="text-body-md"
        />
    </VSlice>
</template>

<style lang="scss" module>
@use 'assets/scss/functions/rem' as *;
@use "assets/scss/mixins/include-media" as *;

.root {
}

.attributes {
    margin-top: rem(24);
    grid-area: attributes;
    grid-column: 1 / -1;

    @include media('>=md') {
        margin-top: initial;
        grid-column: 8 / -1;
    }
}

.attribute {
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid currentcolor;
    padding-block: rem(10);
}

.content {
    grid-column: 1 / -1;
    max-width: 48ch;

    @include media('>=lg') {
        grid-column: 1 / 6;
    }

}

.link {
}
</style>
