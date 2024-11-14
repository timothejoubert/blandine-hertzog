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
    >
        <div
            class="text-h3"
            :class="$style.title"
        >
            {{ data.title }}
        </div>
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
                    <div>{{ attribute.label }}</div>
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
        />
    </VSlice>
</template>

<style lang="scss" module>
.root {
    display: grid;
    grid-template-areas:
            'title'
            'content'
            'attributes'
            'link';

    @include media('>=md') {
        gap: rem(32) var(--gutter);
        grid-template-columns: repeat(2, minmax(0 , 1fr));
        grid-template-areas:
            'title .'
            'content attributes'
            'link attributes';
    }

}
.title {
    grid-area: title;
}

.attributes {
    grid-area: attributes;
    margin-top: rem(24);

    @include media('>=md') {
        margin-top: initial;
    }
}

.attribute {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-block: rem(10);
    border-bottom: 1px solid var(--color-main-lighter-10);
}

.content {
    grid-area: content;
    max-width: 48ch;
}

.link {
    grid-area: linl;
}
</style>
