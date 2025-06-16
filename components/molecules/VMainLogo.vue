<script lang="ts" setup>
import { NuxtLink } from '#components'
import VSvgLogo from '~/assets/images/logo.svg?component'

defineProps<{
	to?: string
}>()
</script>

<template>
    <component
        :is="to ? NuxtLink : 'div'"
        :to="to"
        :class="$style.link"
    >
        <VIcon
            name="logo"
            :class="[$style.logo, $style['logo--mask']]"
        />
        <VSvgLogo
            :class="[$style.logo, $style['logo--default']]"
        />
    </component>
</template>



<style lang="scss" module>
.link {
	--v-main-logo-height: var(--v-main-logo-size, #{rem(38)});

    position: relative;
    z-index: 101;
    display: flex;
    overflow: hidden;
    width: fit-content;
    align-items: center;
    justify-content: center;
}

.logo {
	&--mask {
		position: absolute;
		background-image: linear-gradient(100deg,
			#fff, #fff 10%, 
			var(--theme-color-primary) 10.1%, var(--theme-color-primary) 60%, 
			#fff 60.1%, #fff 70%,
			var(--theme-color-primary) 70.1%, var(--theme-color-primary) 95%, 
			#fff 95.1%
		);
		background-position: var(--v-main-logo-background-position-x, var(--v-main-logo-height)) 0;
		background-repeat: no-repeat;
		background-size: 100% 100%;
		color: transparent;
		font-size: var(--v-main-logo-height);
		opacity: 0.7;
        transition: background-position 0.4s ease(out-quart);

        // mix-blend-mode: hard-light;
        
        @media (hover: hover) {
            .link:hover & {
                background-position: calc(var(--v-main-logo-height) * -1) 0;
            }
        }
	}

    &--default {
        width: auto;
        height: var(--v-main-logo-height);
    }
}

@keyframes mask-translate {
	from {
		background-position: var(--v-main-logo-height) 0;
	}

	to {
		background-position: calc(var(--v-main-logo-height) * -1) 0;
	}
}
</style>