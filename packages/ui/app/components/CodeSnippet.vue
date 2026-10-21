<script setup lang="ts">
import type { UsageView } from '../../src/node/types'

const props = defineProps<{ usage: UsageView }>()

/** The line of the usage split around the key text. */
function split(text: string): { before: string, hit: string, after: string } {
  const start = props.usage.column - 1
  const end = Math.min(text.length, start + props.usage.length)
  return { before: text.slice(0, start), hit: text.slice(start, end), after: text.slice(end) }
}
</script>

<template>
  <pre class="of-x-auto border border-base py-1 font-mono text-xs leading-5"><code><span
    v-for="(text, i) in usage.snippet.lines"
    :key="i"
    class="block pr-3"
    :class="usage.snippet.line + i === usage.line ? 'bg-hover color-base' : 'color-muted'"
  ><span class="inline-block w-10 select-none pr-3 text-right tabular-nums color-faint" :class="usage.snippet.line + i === usage.line && 'shadow-[inset_2px_0_var(--x-fg)]'">{{ usage.snippet.line + i }}</span><template v-if="usage.snippet.line + i === usage.line">{{ split(text).before }}<mark class="bg-[var(--x-warn)]/25 color-base outline outline-1 outline-[var(--x-warn)]" data-usage-key>{{ split(text).hit }}</mark>{{ split(text).after }}</template><template v-else>{{ text }}</template></span></code></pre>
</template>
