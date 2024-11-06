<script lang="ts" setup>
const menu = await usePrismicMenuDocument()

const links = menu.value?.data.links || []
console.log(links)
</script>

<template>
    <nav
        v-if="links.length"
        :class="$style.root"
        aria-label="Main"
    >
        <ul :class="$style.list">
            <li
                v-for="(link, i) in links"
                :key="i"
                :class="$style.item"
            >
                <VPrismicLink
                    :to="link.internal_page"
                    :url="link.external_url"
                    :class="$style.link"
                    :label="link.label"
                />
            </li>
        </ul>
    </nav>
</template>

<style lang="scss" module>
.root {
    position: fixed;
    bottom: rem(40);
    left: 50%;
    border-radius: rem(6);
    background-color: black;
    translate: -50% 0;
}

.list {
    display: flex;
    padding: initial;
    margin: initial;
    gap: rem(4);
}

.item {
    list-style: none;
}

.link {
    display: flex;
    height: rem(38);
    align-items: center;
    justify-content: center;
    border-radius: rem(3);
    color: white;
    padding-inline: rem(14);
    text-decoration: none;
}
</style>
