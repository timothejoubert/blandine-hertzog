<script  lang="ts" setup>
// const splashScreenState = useSplashScreen()
</script>

<template>
    <div
        :class="$style.root"
        class="grid"
    >
        <!--        <VSplashScreen v-if="splashScreenState !== 'done'" /> -->
        <!--        <VSplashScreen /> -->
        <NuxtPage :class="$style.page" />
        <VNav :class="$style.nav" />
        <VFooter :class="$style.footer" />
    </div>
</template>

<style lang="scss" module>
.root {
    position: relative;

    @include media('>=md') {
        &::after {
            position: absolute;
            left: calc(var(--gutter) + #{flex-grid-value(11, 14, '%', false)});
            top: 0;
            height: 100%;
            content: '';
            width: 1px;
            background-color: var(--color-main-darker-80);
        }
    }
}
.page {
    grid-column: 1 / -1;
    min-height: calc(100vh - ($v-footer-height + $v-footer-margin-bottom + $v-footer-margin-top));

    @include media('>=md') {
        grid-column: 1 / 12;
    }
}

.nav {
    position: relative;
    grid-column: 1 / -1;

    @include media('>=md') {
        grid-column: 12 / -1;
        width: calc(100% + var(--gutter));
    }
}

.footer {
    grid-column: 1 / -1;
}
</style>
