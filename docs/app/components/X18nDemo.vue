<script setup lang="ts">
const tabs = [
  { id: 'cli', label: 'CLI', icon: 'i-ph-terminal-window-duotone' },
  { id: 'ui', label: 'Interactive UI', icon: 'i-ph-table-duotone' },
  { id: 'vscode', label: 'VS Code', icon: 'i-bxl-visual-studio' },
  { id: 'try', label: 'Try it now', icon: 'i-ph-rocket-launch-duotone' },
] as const

const active = ref<(typeof tabs)[number]['id']>('cli')
const uid = useId()

// Cycle through the tabs after each animation, until the user picks one.
const auto = ref(true)
// The running animation: `run` restarts the progress bar, `ms` is its length.
const progress = ref({ run: 0, ms: 0 })

function onStart(ms: number) {
  progress.value = { run: progress.value.run + 1, ms }
}

function select(id: (typeof tabs)[number]['id']) {
  auto.value = false
  active.value = id
}

function next() {
  if (!auto.value)
    return
  const index = tabs.findIndex(t => t.id === active.value)
  active.value = tabs[(index + 1) % tabs.length]!.id
}

function onKeydown(event: KeyboardEvent) {
  const step = { ArrowRight: 1, ArrowLeft: -1 }[event.key]
  if (!step)
    return
  event.preventDefault()
  auto.value = false
  const target = (tabs.findIndex(t => t.id === active.value) + step + tabs.length) % tabs.length
  active.value = tabs[target]!.id
  document.getElementById(`${uid}-${active.value}`)?.focus()
}
</script>

<template>
  <div class="not-prose x18n-demo w-full text-left">
    <div class="mb-3">
      <div role="tablist" aria-label="x18n surfaces" class="flex flex-wrap items-center gap-0.5 sm:gap-1 max-sm:px-3" @keydown="onKeydown">
        <button
          v-for="tab in tabs"
          :id="`${uid}-${tab.id}`"
          :key="tab.id"
          role="tab"
          :aria-selected="active === tab.id"
          :tabindex="active === tab.id ? 0 : -1"
          class="flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-md px-2 py-1.5 text-sm transition-colors sm:px-3"
          :class="active === tab.id ? 'bg-elevated text-highlighted' : 'text-muted hover:text-highlighted'"
          @click="select(tab.id)"
        >
          <UIcon :name="tab.icon" class="size-4" />
          {{ tab.label }}
        </button>
      </div>
    </div>
    <div role="tabpanel" :aria-labelledby="`${uid}-${active}`" class="relative h-[33rem] overflow-hidden border-y border-muted bg-default rounded-lg border">
      <svg
        v-if="auto && progress.ms && active !== 'try'"
        viewBox="0 0 20 20"
        class="pointer-events-none absolute right-3 top-3 z-30 size-3.5 -rotate-90 opacity-40"
        aria-hidden="true"
      >
        <circle cx="10" cy="10" r="8" fill="none" stroke="currentColor" stroke-width="3" class="text-accented/25" />
        <circle
          :key="progress.run"
          cx="10"
          cy="10"
          r="8"
          fill="none"
          stroke="currentColor"
          stroke-width="3"
          class="x18n-progress text-primary"
          :style="{ animationDuration: `${progress.ms}ms` }"
        />
      </svg>
      <Transition name="x18n-pane" mode="out-in">
        <X18nDemoCli v-if="active === 'cli'" @start="onStart" @done="next" />
        <X18nDemoUi v-else-if="active === 'ui'" @start="onStart" @done="next" />
        <X18nDemoVscode v-else-if="active === 'vscode'" @start="onStart" @done="next" />
        <X18nDemoTry v-else />
      </Transition>
    </div>
  </div>
</template>

<style>
/* Below the container's `sm` gutter (1rem), run edge to edge. */
@media (max-width: 639px) {
  .x18n-demo {
    margin-inline: -2rem;
    width: calc(100% + 4rem);
  }
}
/* Bleed past the hero column, but only into the space beside the 80rem container. */
@media (min-width: 1024px) {
  .x18n-demo {
    --x18n-bleed: clamp(0px, calc((100vw - 80rem) / 2), 11rem);
    margin-right: calc(-1 * var(--x18n-bleed));
    width: calc(100% + var(--x18n-bleed));
  }
}
.x18n-pane-enter-active,
.x18n-pane-leave-active {
  transition: opacity 0.18s ease, transform 0.18s ease;
}
.x18n-pane-enter-from {
  opacity: 0;
  transform: translateY(10px);
}
.x18n-pane-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
.x18n-progress {
  stroke-dasharray: 50.27;
  animation: x18n-progress linear forwards;
}
@keyframes x18n-progress {
  from { stroke-dashoffset: 50.27; }
  to { stroke-dashoffset: 0; }
}
</style>
