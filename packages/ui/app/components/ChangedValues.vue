<script setup lang="ts">
import type { KeyDetail } from '../../src/node/types'
import { computed, ref } from 'vue'
import { t } from '../i18n'
import { locales as allLocales, backend } from '../state'
import InfoPop from './InfoPop.vue'
import LocaleFlag from './LocaleFlag.vue'
import MessageText from './MessageText.vue'

const props = defineProps<{
  project: string
  keyName: string
  /** The locales the table lists; every locale of the project by default. */
  locales?: readonly string[] | undefined
}>()

const shown = computed(() => props.locales ?? allLocales.value.map(l => l.code))
const detail = ref<KeyDetail | null>()

/** Read on every open, so the table shows the messages as they are now. */
async function load(): Promise<void> {
  detail.value = await backend.value?.key(props.project, props.keyName)
}
</script>

<template>
  <InfoPop :label="t('history.locales', { count: shown.length })" align="left" @show="load">
    <template #trigger>
      <slot>
        <span class="inline-flex items-center gap-1 font-mono text-xs color-muted">
          <template v-if="shown.length === 1">
            <LocaleFlag :code="shown[0]!" />{{ shown[0] }}
          </template>
          <template v-else>{{ t('history.locales', { count: shown.length }) }}</template>
        </span>
      </slot>
    </template>
    <div v-if="detail" class="grid grid-cols-[auto_1fr] gap-x-3 gap-y-1 text-xs">
      <template v-for="locale in shown" :key="locale">
        <span class="flex items-center gap-1.5 font-mono"><LocaleFlag :code="locale" />{{ locale }}</span>
        <MessageText :value="detail.messages.find(m => m.locale === locale)?.value" :placeholders="detail.messages.find(m => m.locale === locale)?.placeholders ?? []" />
      </template>
    </div>
  </InfoPop>
</template>
