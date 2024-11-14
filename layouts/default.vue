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
    --left-grid-column: 1 / -1;
    --right-grid-column: 1 / -1;

    position: relative;

    @include media('>=md') {
        --left-grid-column: 1 / 12;
        --right-grid-column: 12 / -1;

        &::after {
            position: absolute;
            top: 0;
            left: calc(var(--gutter) + #{flex-grid-value(11, 14, '%', false)});
            width: 1px;
            height: 100%;
            background-color: var(--color-main-darker-80);
            content: '';
        }
    }
}

.page {
    min-height: calc(100vh - ($v-footer-height + $v-footer-margin-bottom + $v-footer-margin-top));
    grid-column: var(--left-grid-column);
}

.nav {
    position: relative;
    grid-column: var(--right-grid-column);
    grid-row: 1;

    @include media('>=md') {
        width: calc(100% + var(--gutter));
    }
}

.footer {
    grid-column: 1 / -1;
}
</style>
