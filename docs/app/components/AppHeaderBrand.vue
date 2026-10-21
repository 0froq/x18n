<script setup lang="ts">
// Shadows the comark-docs layer's AppHeaderBrand: drops the Vercel OSS mark
// and shows the full x18n logo with its name.
const { header } = useAppConfig()
const cms = useDocsContent()
</script>

<template>
  <div class="flex shrink-0 items-center gap-2.5">
    <NuxtLink
      :to="prefixLink(header?.to || '/', cms.base)"
      :aria-label="header?.logo?.alt || header?.title"
      class="flex items-center gap-2 text-highlighted! lg:mr-3"
    >
      <img src="/logo-light.svg" alt="" class="size-7 shrink-0 dark:hidden">
      <img src="/logo-dark.svg" alt="" class="hidden size-7 shrink-0 dark:block">
      <span class="text-lg font-semibold text-highlighted">{{ header?.title }}</span>
    </NuxtLink>
  </div>
</template>
