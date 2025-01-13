<script  lang="ts" setup>
const currentPage = useCurrentPage()
const title = computed(() => currentPage.value.webResponse?.data.title)

const anchor = computed(() => currentPage.value.webResponse?.id || '')

function onAnchorClicked(event: Event) {
    const target = document.querySelector(`#${anchor.value}`)
    if (!target) return

    event.preventDefault()
    target.scrollIntoView({ behavior: 'smooth' })
}
</script>

<template>
    <div :class="$style.root">
        <button
            :aria-label="$t('go_to_main_content')"
            :class="$style.anchor"
            @click="onAnchorClicked"
        >
            <VIcon
                name="arrow-down"
                width="42"
                height="42"
            />
        </button>
        <h1 :class="$style.title">
            {{ title }}
        </h1>
    </div>
</template>

<style lang="scss" module>
@use 'assets/scss/functions/rem' as *;
@use 'assets/scss/variables/fonts' as *;
@use 'assets/scss/mixins/font-size-fluid' as *;
@use 'assets/scss/mixins/property-fluid' as *;
@use 'sass:math';

$mongo-font-height: 1000;
$mongo-cap-top-offset: 84;
$mongo-cap-height: 700;
$mongo-cap-ratio: math.div($mongo-cap-height, $mongo-font-height);

.root {
    display: flex;
    align-items: center;
    margin-inline: var(--gutter);
    padding-block: rem(38);
}

.anchor {
    display: block;
    align-self: stretch;
    border: none;

    //border-radius: 34px 0 0 34px;
    margin-right: rem(3);
    background-color: var(--theme-color-primary);
    border-bottom-right-radius: 0 !important;
    border-top-right-radius: 0 !important;
    cursor: pointer;

    @include property-fluid(border-radius, (xs: 18, xl: 34));
    @include property-fluid(width, (xs: 30, xl: 62));

    svg {
        @include property-fluid(width, (xs: 22, xl: 42));
    }
}

.title {
    font-family: $font-mango-family;
    font-weight: 600;
    line-height: $mongo-cap-ratio;
    margin-block: 0;
    text-transform: uppercase;
    translate: 0 math.div($mongo-cap-top-offset, $mongo-font-height * $mongo-cap-ratio) * 100%;

    @include font-size-fluid((xs: 60, vl: 240, xl: 280, hd: 340));

}
</style>
