<script lang="ts" setup>
import { MAIN_MENU_ID } from '~/composables/use-mobile-menu'

  const isOpen = useMobileMenuState()

  function toggleNav() {
    isOpen.value = !isOpen.value
  }
</script>

<template>
    <button
        :class="[$style.root, isOpen && $style['root--open']]"
        :aria-expanded="isOpen"
        :aria-controls="MAIN_MENU_ID"
        :aria-label="$t('toggle_main_nav.aria')"
        class="text-over-title-md"
        @click="toggleNav"
    >
        <span :class="$style.span" />
    </button>
</template>

<style lang="scss" module>
.root {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    position: relative;
    transition: 0.2s;
    background: initial;
    border: initial;
    cursor: pointer;

    @include media('>=lg') {
        display: none;
    }
}

@mixin icon-line-style {
  position: absolute;
  display: block;
  background-color: color-mix(in srgb, var(--theme-color-on-background), transparent 20%);
  height: 3px;
  width: 30px;
}

.span {
  pointer-events: none;
  @include icon-line-style;

  &::before, &::after {
    content: '';
    transition: 0.2s;
    @include icon-line-style;
  }

  &::before {
      transform: translateY(-8px);
    // background-color: red;
  }

  &::after {
      // background-color: blue;
      transform: translateY(8px);
  }

  .root--open & {
    height: 0;
  }

  .root--open &::before {
    transform: rotate(45deg);
  }

  .root--open &::after {
    transform: rotate(-45deg);
  }
}
</style>