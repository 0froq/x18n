<script setup lang="ts">
import { ref } from 'vue'
import { t } from '../i18n'
import { backend } from '../state'
import InfoPop from './InfoPop.vue'

const props = defineProps<{
  /** The prompt to copy. */
  text: string
  label: string
  hint: string
}>()
const copied = ref(false)

async function copy(): Promise<void> {
  await navigator.clipboard.writeText(props.text)
  copied.value = true
  setTimeout(() => copied.value = false, 1500)
}
</script>

<template>
  <InfoPop
    v-if="backend?.capabilities.prompts"
    :icon="copied ? 'i-ph-check-duotone' : 'i-ph-sparkle-duotone'"
    :label="label"
    :pinnable="false"
    @click="copy"
  >
    <div class="grid w-80 gap-2">
      <span class="text-xs font-medium">{{ copied ? t('prompt.copied') : label }}</span>
      <p class="text-xs color-muted">
        {{ hint }}
      </p>
      <pre class="max-h-64 of-auto whitespace-pre-wrap break-words border border-base p-2 font-mono text-[11px] leading-4">{{ text }}</pre>
    </div>
  </InfoPop>
</template>
