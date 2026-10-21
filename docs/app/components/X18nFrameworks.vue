<script setup lang="ts">
const frameworks = [
  { name: 'Vue', icon: 'logos:vue', to: '/presets/vue-i18n' },
  { name: 'Nuxt', icon: 'logos:nuxt-icon', to: '/presets/nuxt-i18n' },
  { name: 'React', icon: 'logos:react', to: '/presets/react-i18next' },
  { name: 'Next.js', icon: 'logos:nextjs-icon', to: '/presets/next-intl', mono: true },
  { name: 'Svelte', icon: 'logos:svelte-icon', to: '/presets/svelte-i18n' },
  { name: 'Angular', icon: 'logos:angular-icon', to: '/presets/ngx-translate' },
  { name: 'Ember', icon: 'logos:ember', to: '/presets/ember-intl' },
  { name: 'Laravel', icon: 'logos:laravel', to: '/presets/laravel' },
  { name: 'Joomla', icon: 'logos:joomla', to: '/presets/php-joomla' },
  { name: 'PHP', icon: 'logos:php', to: '/presets/php-gettext' },
  { name: 'Rails', icon: 'logos:rails', to: '/presets/ruby-rails' },
  { name: 'Jekyll', icon: 'logos:jekyll', to: '/presets/jekyll' },
  { name: 'Flutter', icon: 'logos:flutter', to: '/presets/flutter' },
  { name: 'Chrome', icon: 'logos:chrome', to: '/presets/chrome-extension' },
  { name: 'VS Code', image: '/logo-solid.png', to: '/presets/vscode-extension' },
]
</script>

<template>
  <div class="x18n-frameworks my-10 flex flex-col items-center gap-6 text-center not-prose">
    <h3 class="text-xl font-medium text-muted">
      Supported Frameworks
    </h3>
    <ul class="flex flex-wrap justify-center gap-x-8 gap-y-6 max-w-2xl">
      <li v-for="item in frameworks" :key="item.name">
        <NuxtLink
          :to="item.to"
          :title="item.name"
          :aria-label="item.name"
          class="block transition duration-200 hover:scale-110"
        >
          <img v-if="item.image" :src="item.image" :alt="item.name" class="size-10 object-contain">
          <UIcon v-else :name="item.icon" class="size-10" :class="item.mono && 'dark:invert'" />
        </NuxtLink>
      </li>
    </ul>
    <UButton to="/presets" color="neutral" variant="soft" trailing-icon="i-ph-arrow-right" label="Check full list" />
  </div>
</template>
