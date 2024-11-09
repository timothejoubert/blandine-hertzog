<script  lang="ts" setup>
const splashScreenState = useSplashScreen()
</script>

<template>
    <div :class="$style.root">
        <!--        <VSplashScreen v-if="splashScreenState !== 'done'" /> -->
        <!--        <VSplashScreen /> -->
        <NuxtPage />
        <VNav />
    </div>
</template>

<style lang="scss" module>
.root {
    position: relative;
}
</style>
