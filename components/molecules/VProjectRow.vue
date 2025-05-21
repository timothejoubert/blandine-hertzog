<script  lang="ts" setup>
import type { ProjectPageDocument } from '~/prismicio-types'

interface VProjectCardProps {
    project: ProjectPageDocument | null
}

const props = defineProps<VProjectCardProps>()

const { title, tags } = useProjectUtils(props.project)
</script>

<template>
    <VPrismicLink
        :to="props.project"
        :class="$style.root"
    >
        <div
            :class="$style.title"
            class="text-over-title-sm"
        >
            {{ title }}
        </div>
        <VTag
            v-for="tag in tags"
            :key="tag"
            :label="tag"
        />
        <VIcon name="arrow-up-right" />
    </VPrismicLink>
</template>

<style lang="scss" module>
@use 'assets/scss/functions/rem' as *;

.root {
    position: relative;
    display: flex;
    width: 100%;
    height: var(--v-project-row-height);
    align-items: center;
    justify-content: space-between;
    color: inherit;
    gap: rem(14);
    padding-block: var(--v-project-row-padding-block, rem(14));
    text-decoration: none;
}

.title {
    margin-right: auto;
    overflow: hidden; 
    white-space: nowrap;
    text-overflow: ellipsis;
}
</style>
