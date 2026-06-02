<template>
  <div class="chat-empty-view"
:aria-label="`${message}. ${prompt}`">
    <div class="chat-empty-view__header">
      <div class="chat-empty-view__title">Ask AI Assistant</div>
    </div>

    <div class="chat-empty-view__prompts">
      <button
        v-for="p in prompts"
        :key="p.id"
        type="button"
        class="chat-empty-view__prompt"
        :aria-label="`${p.title}. ${p.description}`"
        @click="$emit('prompt-click', p.messageText)"
      >
        <span class="chat-empty-view__prompt-content">
          <span class="chat-empty-view__prompt-title">{{ p.title }}</span>
          <span class="chat-empty-view__prompt-description">{{ p.description }}</span>
        </span>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  message: string;
  prompt: string;
}>();

defineEmits<{
  (e: 'prompt-click', messageText: string): void;
}>();

const prompts = [
  {
    id: 'trends',
    title: '🎯 Trends',
    description: 'Identify trends in your business',
    messageText: 'Identify trends in the business shown in this dashboard.',
  },
  {
    id: 'predictions',
    title: '📊 Predictions',
    description: 'Predict which deals are at risk of closing',
    messageText: 'Predict which deals are at risk of closing based on this dashboard.',
  },
];
</script>

<style lang="scss">
.chat-empty-view {
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  min-height: 100%;
}

.chat-empty-view__header {
  padding-bottom: 28px;
  text-align: center;
}

.chat-empty-view__title {
  font-size: 18px;
  font-weight: 600;
  line-height: 1.25;
  color: var(--base-text-color);
}

.chat-empty-view__prompts {
  display: grid;
  gap: 16px;
  width: 100%;
}

.dark .chat-empty-view__prompt {
  border: 1px solid color-mix(in srgb, var(--border-color) 30%, var(--base-bg));
  background: var(--card-background);
}

.dark .chat-empty-view__prompt:hover {
  border: 1px solid var(--border-color);
  background: var(--background-gray-color);
  box-shadow: var(--card-shadow);
}

.light .chat-empty-view__prompt {
  border: 1px solid var(--border-color);
  background: var(--card-background);
}

.light .chat-empty-view__prompt:hover {
  border: 1px solid var(--border-color);
  background: var(--base-bg-darken-4);
  box-shadow: var(--card-shadow);
}

.chat-empty-view__prompt {
  display: block;
  width: 100%;
  padding: 18px 20px;
  border-radius: 12px;
  text-align: left;
  cursor: pointer;
  transition:
    transform 160ms ease,
    border-color 160ms ease,
    box-shadow 160ms ease;
}

.chat-empty-view__prompt:hover,
.chat-empty-view__prompt:focus-visible {
  transform: translateY(-1px);
}

.chat-empty-view__prompt:focus-visible {
  outline: 2px solid color-mix(in srgb, var(--accent-color) 35%, transparent);
  outline-offset: 2px;
}

.chat-empty-view__prompt-content {
  display: flex;
  flex-direction: column;
  gap: 6px;
  min-width: 0;
}

.chat-empty-view__prompt-title {
  display: block;
  font-size: 16px;
  font-weight: 600;
  line-height: 1.25;
  color: var(--base-text-color);
}

.chat-empty-view__prompt-description {
  display: block;
  font-size: 14px;
  line-height: 1.4;
  color: var(--texteditor-label-color);
}

@media only screen and (max-width: 700px) {
  .chat-empty-view {
    padding-top: 24px;
  }

  .chat-empty-view__header {
    padding-bottom: 20px;
  }
}
</style>
