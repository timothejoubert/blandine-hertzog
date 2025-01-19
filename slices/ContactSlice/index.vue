<script setup lang="ts">
import type { Content } from '@prismicio/client'

const props = defineProps(
    getSliceComponentProps<Content.ContactSliceSlice>(),
)

const primary = computed(() => props.slice.primary)

const linkReference = computed(() => primary.value.external_url || primary.value.internal_page)

const toastMessage = ref<string | null>(null)
const { addToast } = useToast()

const { t } = useI18n()
function copyToClipBoard(_event: MouseEvent) {
    const mail = primary.value.mail?.replace('[at]', '@')
    if (!mail) return

    navigator.clipboard.writeText(mail).then(() => {
        addToast({
            id: 'email_clipboard',
            type: 'success',
            message: t('email.copied__success'),
            duration: 2000,
        })
    }).catch((error) => {
        console.log('error', error)
    })
}
</script>

<template>
    <VSlice
        :slice="slice"
    >
        <VHeadSection
            :title="primary.title"
            :link-label="primary.link_label"
            :link-reference="linkReference"
        />
        <VText
            v-if="primary.content"
            :class="$style.content"
            :content="primary.content"
            class="text-body-md"
        />
        <button
            v-if="primary.mail"
            :class="$style.mail"
            class="text-h4"
            @click="copyToClipBoard"
        >
            {{ primary.mail }}
        </button>
        <div
            v-if="primary.phone"
            :class="$style.phone"
            class="text-h5"
        >
            {{ primary.phone }}
        </div>
        <Teleport to="#teleports">
            <VToast
                v-if="toastMessage"
                :message="toastMessage"
            />
        </Teleport>
    </VSlice>
</template>

<style lang="scss" module>
@use 'assets/scss/functions/rem' as *;
@use "assets/scss/mixins/include-media" as *;

.content {
    margin-top: rem(44);
    max-width: 48ch;
    grid-column: 1 / -1;

    @include media('>=lg') {
        grid-column: 1 / 6;
    }
}

.mail {
    background-color: initial;
    color: inherit;
    border: none;
    margin-inline: auto;
    cursor: pointer;
    display: block;
    margin-top: rem(130);
    text-align: center;
}

.phone {
    margin-top: rem(20);
    text-align: center;
}
</style>
