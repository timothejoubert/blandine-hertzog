<script lang="ts" setup>
import { NuxtLink } from '#components'

const props = defineProps<{
  to: PossibleRouteReference
  label: string | undefined | null
  iconName?: string | 'auto'
}>()
const { url, isRelative, isExternal } = useLinkResolver(props.to)

const node = computed(() => {
  if(!url.value) return 'div'
  else if (isRelative.value) return NuxtLink
  else if (isExternal.value) return 'a'
  else return 'div'
})

const _iconName = computed(() => {
  if(!props.iconName || !url.value) return undefined

  if (props.iconName === 'auto' && isRelative.value) return 'arrow-right'
  if (props.iconName === 'auto' && isExternal.value) return 'arrow-up-right'

  return props.iconName
})
</script>

<template>
    <component
        :is="node"
        :href="url"
        :class="$style.root"
    >
        {{ label }}
        <VIcon
            v-if="_iconName"
            :name="_iconName"
            :class="$style.icon"
        />
    </component>
</template>

<style lang="scss" module>
.root {
  display: flex;
  align-items: center;
  gap: rem(8);
  text-decoration: none;
  color: var(--theme-color-primary);
  text-transform: uppercase;
  font-weight: 700;
}
</style>