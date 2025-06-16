<script lang="ts" setup>
import type VTitleTranslate from '~/components/molecules/VTitleTranslate.vue'

const state = useSplashScreenState()

const LOCK_CLASS = 'splash-screen-displayed'
const isScrollLocked = computed(() => {
    return state.value === 'pending' || state.value === 'enter' || state.value === 'leave'
})

watch(isScrollLocked, (isLock) => {
    if (!isLock) {
        document.body.classList.remove(LOCK_CLASS)
    }
    else if(isLock && !document.body.classList.contains(LOCK_CLASS)) {
        document.body.classList.add(LOCK_CLASS)
    }
})

useServerHead({
    bodyAttrs: {
        class: {
            [LOCK_CLASS]: isScrollLocked.value
        }
    }
})


const scrollToTop = () => (window.scrollTo({ top: 0 }))

function onAfterLeave() {
    state.value = 'done'
}

const vTitleTranslate = useTemplateRef<InstanceType<typeof VTitleTranslate>>('vTitleTranslate')
const counter = ref(0)
const { pause, resume } = useIntervalFn(
    () => {
        counter.value = counter.value + 1
        console.log('Loading counter:', counter.value)

        if (counter.value >= 3) {
            pause()
            state.value = 'done'
        }
        else if(vTitleTranslate.value) {
            const fnDirection = counter.value % 2 ? 'slideTop' : 'slideTop'
            vTitleTranslate.value[fnDirection]?.()
        }
    }, 
    1000
)

const rootStyle = computed(() => {
    if (state.value === 'done') return {}

    return {
        '--v-main-logo-background-position-x': counter.value % 2 ? '-60px' : '60px'
    }
})

onMounted(() => {
    window.scrollTo({ top: 0 })
    state.value = 'enter'
    resume()
})
</script>

<template>
    <Transition
        :name="$style.root"
        @after-leave="onAfterLeave"
        @leave="scrollToTop"
    >
        <div
            v-if="state !== 'done'"
            class="body-lg"
            :style="rootStyle"
            :class="$style.body"
        >
            <VMainLogo
                :class="$style.logo"
                size="100px"
            />
            <div :class="$style.loading">
                <VTitleTranslate
                    ref="vTitleTranslate"
                    class="text-h6"
                    title="Loading"
                />
                <VSpinner
                    :class="$style.spinner"
                    size="32"
                />
            </div>
        </div>
    </Transition>
</template>

 <style lang="scss">
 body.splash-screen-displayed {
     overflow: hidden;
     max-height: 100vh;
 }
 </style>

<style lang="scss" module>
.root {
    &:global(#{'-enter-active'}),
    &:global(#{'-leave-active'}) {
        transition: opacity 0.8s ease(out-quad) 0.4s, translate 0.8s ease(out-quad) 0.4s;
    }

    &:global(#{'-enter-from'}),
    &:global(#{'-leave-to'}) {
        // opacity: 0;
        translate: 0 -100%;
    }
}

.body {
    position: fixed;
    z-index: 1001;
    display: flex;
    height: 100svh;
    align-items: center;
    justify-content: center;
    background-color: var(--theme-color-background);
    inset: 0;
}

.logo {
    --v-main-logo-size: #{rem(60)};
}

.loading {
    position: absolute;
    display: flex;
    align-items: center;
    gap: rem(12);
    right: var(--gutter);
    bottom: var(--gutter);
    // text-transform: uppercase;
}

.spinner {
    margin-top: -4%;
    opacity: 0.3;
}
</style>
