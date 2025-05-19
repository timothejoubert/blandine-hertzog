<script setup lang="ts">
defineProps<{
    customIcon?: boolean
    type?: 'checkbox' | 'radio'
}>()
</script>

<template>
    <span :class="$style.root">
        <VIcon
            v-if="customIcon"
            :name="type === 'radio' ? 'asterix-5' : 'check'"
            :class="$style.icon"
            width="12"
            height="12"
        />
    </span>
</template>

<style lang="scss" module>
$check-border-width: 2px;

.root {
    position: var(--v-checkbox-position, relative);
    display: inline-flex;
    width: var(--v-checkbox-size, 28px);
    height: var(--v-checkbox-size, 28px);
    align-items: center;
    justify-content: center;
    border-radius: 3px;
    color: inherit;
    transition: background-color 0.3s;

    :global(input)[type='radio'] + & {
        --v-checkbox-border-radius: 50%;

        border-radius: 100%;
    }

    &::before {
        position: absolute;
        width: 16px;
        height: 16px;
        border: $check-border-width solid currentColor;
        border-radius: var(--v-checkbox-border-radius);
        content: '';
    }

    // Checkbox
    :global(input)[type='checkbox']:checked + &::before {
        background-color: currentcolor;
    }

    // Radio
    :global(input)[type='radio'] + &:not(:has( .icon))::after {
        position: absolute;
        width: 8px;
        height: 8px;
        border-radius: 50%;
        content: '';
    }

    :global(input)[type='radio']:checked + &::after {
        background-color: var(--theme-color-primary, currentcolor);
    }

    :global(input):focus-visible + &,
    &:focus-visible {
        outline: 2px solid var(--theme-color-content-primary, currentColor);
    }

    @media (hover: hover) {
        label:hover > &,
        &:hover {
            background-color: var(--colors-form-checkbox---radio-bg-pressed); /* stylelint-disable-line custom-property-pattern */
        }
    }
}

.icon {
    position: absolute;
    color: var(--v-checkbox-icon-color, var(--theme-color-background));
    font-size: 24px;
    visibility: hidden;
    z-index: 2;

    :global(input)[type='radio']:checked + .root &,
    :global(input)[type='checkbox']:checked + .root & {
        visibility: inherit;
    }
}
</style>
