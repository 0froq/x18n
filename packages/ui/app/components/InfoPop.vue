<script setup lang="ts">
import { onClickOutside } from '@vueuse/core'
import { ref, useTemplateRef, watch } from 'vue'

const { pinnable = true, align = 'right' } = defineProps<{
  /** The icon of the default button; unused with a `trigger` slot. */
  icon?: string
  label: string
  /** Which edge of the trigger the panel lines up with. */
  align?: 'left' | 'right'
  /** Click pins the panel open. Off, the panel shows on hover only and click goes to the parent. */
  pinnable?: boolean
}>()
const emit = defineEmits<{ show: [], click: [] }>()

const root = useTemplateRef<HTMLElement>('root')
const hovered = ref(false)
const pinned = ref(false)

onClickOutside(root, () => pinned.value = false)
watch(() => hovered.value || pinned.value, (open) => {
  if (open)
    emit('show')
})

function onClick(): void {
  if (pinnable)
    pinned.value = !pinned.value
  else
    emit('click')
}
</script>

<template>
  <span ref="root" class="relative inline-flex" @mouseenter="hovered = true" @mouseleave="hovered = false" @keydown.escape="pinned = false">
    <slot name="trigger">
      <button type="button" class="btn-icon h-6 w-6 text-sm" :class="pinned && 'bg-hover color-base'" :aria-label="label" :aria-expanded="hovered || pinned" @click="onClick" @focus="hovered = true" @blur="hovered = false">
        <span :class="icon" />
      </button>
    </slot>
    <div v-if="hovered || pinned" class="absolute top-full z-10 w-max max-w-96 pt-1" :class="align === 'left' ? 'left-0' : 'right-0'" role="tooltip">
      <div class="border border-strong bg-base p-2 shadow-lg">
        <slot />
      </div>
    </div>
  </span>
</template>
