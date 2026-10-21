<script setup lang="ts">
import { onClickOutside } from '@vueuse/core'
import { ref, useTemplateRef } from 'vue'

defineProps<{ icon: string, label: string }>()

const root = useTemplateRef<HTMLElement>('root')
const hovered = ref(false)
const pinned = ref(false)

onClickOutside(root, () => pinned.value = false)
</script>

<template>
  <span ref="root" class="relative inline-flex" @mouseenter="hovered = true" @mouseleave="hovered = false" @keydown.escape="pinned = false">
    <button type="button" class="btn-icon h-7 w-7" :class="pinned && 'bg-hover color-base'" :aria-label="label" :aria-expanded="hovered || pinned" @click="pinned = !pinned">
      <span :class="icon" />
    </button>
    <div v-if="hovered || pinned" class="absolute right-0 top-full z-10 w-max max-w-80 pt-1" role="tooltip">
      <div class="border border-strong bg-base p-2 shadow-lg">
        <slot />
      </div>
    </div>
  </span>
</template>
