<script lang="ts" setup>
const props = defineProps<{
    label: string
    minLength?: number
    maxLength?: number
    size?: number
    spacing?: number
}>()

const duplicateTitle = computed(() => props.label.length < 20)

const formattedLabel = computed(() => {
    if(duplicateTitle.value) return `${props.label} • ${props.label} • `
    return `${props.label} • `
})
const length = computed(() => formattedLabel.value.length)

const canTrig = computed(() => {
    return import.meta.client && CSS.supports('(top: calc(sin(1) * 1px))')
})

const rootStyle = computed(() => {
    const part = canTrig.value ? 'sin(var(--inner-angle))' : (Math.sin(360 / length.value / (180 / Math.PI)))

    const spacing = props.spacing || mapRange(
        props.label.length, 
        props.minLength || 6, 
        props.maxLength || 40, 
        duplicateTitle.value ? 1.7 : 2,
        duplicateTitle.value ? 1 : 1.3
    )
    const size = props.size || 1 // mapRange(props.label.length, props.minLength || 4, props.maxLength || 40, 2, 1)

    return {
        '--char-count': length.value,
        '--inner-angle': `calc((360 / ${length.value}) * 1deg)`,
        '--character-width': spacing.toFixed(1),
        '--font-size': size,
        '--radius': `calc((${spacing} / ${part}) * -1ch)`,
    }
})
</script>

<template>
    <div
        :class="$style.root"
        :style="rootStyle"
        data-allow-mismatch
    >
        <span
            v-for="(letter, index) in formattedLabel"
            :key="`${letter}-${index}`"
            :class="$style.char"
            aria-hidden="true"
            :style="{ '--char-index': index }"
        >{{ letter }}</span>
    </div>
</template>

<style lang="scss" module>
.root {
	position: var(--v-text-ring-position, relative);
	animation: spin 15s infinite linear var(--v-text-ring-animation-play-state, paused);
	color: var(--theme-color-primary);
	font-family: monospace;
	font-size: calc(var(--font-size, 1) * 1rem);
	text-transform: uppercase;

	@media (prefers-reduced-motion: reduce) {
		animation: none;
	}
}

@keyframes spin {
	to {
		rotate: -360deg;
	}
}

.char {
	position: absolute;
	top: 50%;
	left: 50%;
	display: inline-block;
	transform:
		translate(-50%, -50%)
		rotate(calc(var(--inner-angle) * var(--char-index)))
		translateY(var(--radius));
}
</style>
