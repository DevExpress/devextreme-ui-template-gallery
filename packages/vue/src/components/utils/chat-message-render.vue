<template>
  <span v-html="renderedHtml" />
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { micromark } from 'micromark';

const props = defineProps<{
  text: string;
}>();

const renderedHtml = computed(() => {
  const html = micromark(props.text);
  return html.replace(/^<p>/, '').replace(/<\/p>$/, '');
});
</script>

<style lang="scss">
.dx-chat-messagegroup-content .dx-chat-messagebubble {
  h1, h2, h3, h4, h5, h6 {
    font-size: inherit;
    font-weight: 600;
    margin: 0;
    line-height: inherit;
  }

  p {
    margin: 0;

    + p {
      margin-top: 2px;
    }
  }

  ul, ol {
    margin: 2px 0;
    padding-left: 18px;
  }

  li {
    margin: 0;
    padding: 0;
  }

  strong {
    font-weight: 600;
  }

  code {
    font-size: 0.9em;
    padding: 1px 4px;
    border-radius: 3px;
    background: rgba(0, 0, 0, 0.06);
  }

  pre {
    margin: 2px 0;
    padding: 8px;
    border-radius: 4px;
    background: rgba(0, 0, 0, 0.06);
    overflow-x: auto;

    code {
      padding: 0;
      background: transparent;
    }
  }

  blockquote {
    margin: 2px 0;
    padding-left: 8px;
    border-left: 3px solid rgba(0, 0, 0, 0.15);
    opacity: 0.85;
  }
}
</style>
