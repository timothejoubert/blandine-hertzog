<script lang="ts" setup>
const settings = await usePrismicSettingsDocument()
const siteName = settings.value?.data.site_name

const START_VALUE = 0
const LAST_VALUE = 100

const startDelay = 200
const counterDuration = 1200
const leaveDuration = 600

const state = useSplashScreen()
const counterOutput = ref(0)

onMounted(() => {
    window.setTimeout(() => {
        state.value = 'enter'
        startCounter()
    }, startDelay)
})

// Utils
function startCounter() {
    let startTimestamp: null | number = null

    const increaseCounter = (timestamp: number) => {
        if (!startTimestamp) startTimestamp = timestamp

        const progress = Math.min((timestamp - startTimestamp) / counterDuration, 1)

        counterOutput.value = Math.floor(progress * (LAST_VALUE - START_VALUE) + START_VALUE)

        if (progress < 1) {
            window.requestAnimationFrame(increaseCounter)
        }
        else {
            leave()
        }
    }

    window.requestAnimationFrame(increaseCounter)
}

function leave() {
    // Leave animation
    state.value = 'leave'
    // Action
    state.value = 'done'
}

// Style
const $style = useCssModule()
const rootClasses = computed(() => {
    return [
        $style.root,
        state.value !== 'pending' && $style['root--started'],
        state.value === 'leave' && $style['root--leave'],
    ]
})
</script>

<template>
    <div :class="rootClasses">
        <div>
            <VSplitText :content="siteName || 'content'" />
        </div>
        <div />

        <div>{{ counterOutput }}%</div>
    </div>
</template>

<style lang="scss" module>
.root {
    position: absolute;
    z-index: 1001;
    display: flex;
    height: 100svh;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    inset: 0;
    background-color: white;
}
</style>
