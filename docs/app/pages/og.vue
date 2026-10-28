<script setup lang="ts">
definePageMeta({ layout: false })
useHead({ title: 'x18n OG image' })
// The card is dark, like the hero demo in dark mode.
const colorMode = useColorMode()
colorMode.preference = 'dark'
</script>

<template>
  <!-- The docs layer's app shell still renders around the page, so cover it. -->
  <div class="og-stage bg-default">
    <OgImage />
  </div>
</template>

<style>
.og-stage {
  position: fixed;
  inset: 0;
  z-index: 99999;
}
</style>
