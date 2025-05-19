<script lang="ts" setup>
import { MAIN_MENU_ID } from '~/composables/use-main-menu'

  const isOpen = useMainMenuState()

  function toggleNav() {
    isOpen.value = !isOpen.value
  }
</script>

<template>
    <button
        :class="$style.toggle"
        :aria-expanded="isOpen"
        :aria-controls="MAIN_MENU_ID"
        :aria-label="$t('toggle_main_nav.aria')"
        class="text-over-title-md"
        @click="toggleNav"
    >
        {{ $t('toggle_main_nav') }}
    </button>
</template>

<style lang="scss" module>
.root {
      @include media('>=lg') {
        display: none;
    }
}
</style>