<script lang="ts" setup>
import VLogo from '~/assets/images/logo.svg?component'
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

        if (counter.value >= 4) {
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
            :class="$style.body"
        >
            <VLogo />
            <VTitleTranslate
                ref="vTitleTranslate"
                :class="$style.loading"
                class="text-h4"
                title="Loading"
            />
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

.loading {
    --v-title-translate-position: absolute;

    right: var(--gutter);
    bottom: var(--gutter);
}
</style>
