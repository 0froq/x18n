<script setup lang="ts">
// 1200x630 social card. Open /og in the docs dev server and screenshot the card.
// The right side is the hero's own demo panes, so the card tracks the docs design.
// The tabs are fake: they follow the look of the hero demo's tabs, and only the shown pane is selected.
const tabs = [
  { label: 'CLI', icon: 'i-ph-terminal-window-duotone' },
  { label: 'Interactive UI', icon: 'i-ph-table-duotone', active: true },
  { label: 'LSP', icon: 'i-ph-swap-duotone' },
  { label: 'VS Code', icon: 'i-bxl-visual-studio' },
  { label: 'CI/CD', icon: 'i-ph-git-branch-duotone' },
  { label: 'Prompts', icon: 'i-ph-chat-text-duotone' },
]
</script>

<template>
  <div class="og not-prose bg-default text-default">
    <header class="flex h-20 flex-none items-center justify-between border-b border-muted px-16">
      <span class="flex items-center gap-3 text-2xl font-semibold text-highlighted">
        <img src="/logo-light.svg" alt="" class="size-9 dark:hidden">
        <img src="/logo-dark.svg" alt="" class="hidden size-9 dark:block">
        x18n
      </span>
      <span class="font-mono text-sm tracking-[0.12em] text-muted">x18n.dev</span>
    </header>

    <main class="relative flex min-h-0 flex-1">
      <section class="flex w-[460px] flex-none flex-col justify-center pl-16 pr-8">
        <h1 class="m-0 text-[56px] font-semibold leading-[1.05] tracking-tight text-highlighted">
          i18n files, checked and maintained
        </h1>
        <p class="mt-6 text-xl leading-snug text-muted">
          Universal toolkits for linting, viewing and managing i18n for any frameworks. For humans, CI and coding agents.
        </p>

        <div class="mt-8 flex flex-wrap items-center gap-1">
          <span
            v-for="tab in tabs"
            :key="tab.label"
            class="flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm"
            :class="tab.active ? 'bg-elevated text-highlighted' : 'text-muted'"
          >
            <UIcon :name="tab.icon" class="size-4" />
            {{ tab.label }}
          </span>
        </div>
      </section>

      <section class="relative flex-1 min-w-0 overflow-hidden border-l border-muted">
        <div class="og-pane absolute left-10 top-10 h-[33rem] w-[700px] overflow-hidden rounded-lg border border-muted bg-default">
          <X18nDemoUi />
        </div>
      </section>
    </main>
  </div>
</template>

<style scoped>
.og {
  width: 1200px;
  height: 630px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}
</style>
