<script  lang="ts" setup>
import type { ProjectPageDocument } from '~/prismicio-types'

interface VProjectCardProps {
    project: ProjectPageDocument | null
}

const props = defineProps<VProjectCardProps>()

const {
    title,
    date,
    tags,
} = useProjectUtils(props.project)
</script>

<template>
    <VPrismicLink
        :to="props.project"
        :class="$style.root"
    >
        <div :class="$style.title">
            {{ title }}
        </div>
        <VTime
            v-if="date"
            :date="date"
        />
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
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid black;
    gap: rem(14);
    padding-block: rem(13);
}

.title {
    margin-right: auto;
}
</style>
