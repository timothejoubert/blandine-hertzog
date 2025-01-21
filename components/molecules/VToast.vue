<script  lang="ts" setup>
import type { ToastData } from '~/composables/use-toast'

function shakeToast(toast: ToastData) {
    const el = document.getElementById(toast.id)
    if (!el) return

    el.animate(
        [
            { rotate: '2deg' },
            { rotate: '-2deg' },
        ],
        {
            duration: 100,
            easing: 'ease-in-out',
            iterations: 3,
        }, f,
    )
}

const { toasts, removeToast } = useToast()

watch(toasts, (list) => {
    const alreadyExistToast = list.find(toast => !!toast.repeat)
    if (alreadyExistToast) shakeToast(alreadyExistToast)
}, { deep: true })
</script>

<template>
    <TransitionGroup
        :name="$style['transition-slide-in']"
        tag="ul"
        :class="$style.root"
    >
        <template v-if="toasts.length">
            <li
                v-for="toast in toasts"
                :id="toast.id"
                :key="toast.id"
                :class="[$style.toast, toast.type && $style[`toast--type-${toast.type}`]]"
                class="text-body-sm"
            >
                {{ toast.message }}
                <button
                    :aria-label="$t('close')"
                    :class="$style.close"
                    @click="removeToast(toast)"
                >
                    <VIcon name="close-small" />
                </button>
            </li>
        </template>
    </TransitionGroup>
</template>

<style lang="scss" module>
@use 'assets/scss/functions/rem' as *;
@use 'assets/scss/functions/ease' as *;

.root {
    position: fixed;
    display: flex;
    flex-direction: column;
    gap: rem(8);
    right: var(--gutter);
    bottom: var(--gutter);
}

.toast {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: rem(20);
    padding: rem(16) rem(16) rem(16) rem(24);
    background-color: var(--theme-color-primary);
    color: var(--theme-color-background);
    border-radius: rem(4);
    transform-origin: center;
}

.close {
    cursor: pointer;
    background-color: initial;
    border: initial;
    color: inherit;

    svg {
        width: rem(12);
    }
}

.transition-slide-in {
    &:global(#{'-move'}),
    &:global(#{'-enter-active'}),
    &:global(#{'-leave-active'}) {
        transition: translate 0.5s ease(out-quad), opacity 0.3s;
    }

    &:global(#{'-enter-from'}) {
        translate: 0 100%;
    }

    &:global(#{'-leave-to'}) {
        translate: 0 rem(-10);
        opacity: 0;
    }

    //&:global(#{'-leave-active'}) {
    //    position: absolute;
    //}
}

@keyframes shake {
    30% {
        rotate: 10%;
    }
    70% {
        rotate: -10%;
    }
}
</style>
