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
        <VIcon name="fullscreen" />
    </VPrismicLink>
</template>

<style lang="scss" module>
.root {
    position: relative;
    display: flex;
    width: 100%;
    height: var(--v-project-row-height);
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid black;
    gap: rem(14);
    padding-block:  var(--v-project-row-padding-block, rem(14));
    color: inherit;
    text-decoration: none;
}

.title {
    margin-right: auto;
}
</style>
