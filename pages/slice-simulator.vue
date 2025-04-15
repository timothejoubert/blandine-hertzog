<script setup lang="ts">
import { SliceSimulator } from '@slicemachine/adapter-nuxt/simulator'
import { components } from '~/slices'
</script>

<template>
    <SliceSimulator v-slot="{ slices }">
        <!-- <div class="text-h1">
            Slice simulator
        </div> -->
        <SliceZone
            :slices="slices"
            :components="components"
        />
    </SliceSimulator>
</template>
