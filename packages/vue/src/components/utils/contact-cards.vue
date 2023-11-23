<template>
  <div class="dx-card details-card">
    <dx-tab-panel
      :focus-state-enabled="false"
      :show-nav-buttons="true"
    >
      <dx-tab-item title="Tasks">
        <card-tasks
          :tasks="props.tasks"
          :is-loading="props.isLoading"
          :manager="props.contactName"
        />
      </dx-tab-item>

      <dx-tab-item title="Activities">
        <contact-activities
          :is-loading="props.isLoading"
          :items="props.activities"
          :show-by="true"
        />
      </dx-tab-item>

      <dx-tab-item title="Opportunities">
        <card-opportunities :contact-id="props.contactId" />
      </dx-tab-item>

      <dx-tab-item title="Notes">
        <card-notes
          :user="props.contactName"
          :contact-id="props.contactId"
        />
      </dx-tab-item>

      <dx-tab-item
        title="Messages"
      >
        <card-messages
          :user="props.contactName"
          :messages="messages"
          :is-loading="isMessagesLoading"
        />
      </dx-tab-item>
    </dx-tab-panel>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { DxTabPanel } from 'devextreme-vue/tab-panel';
import { DxItem as DxTabItem } from 'devextreme-vue/tabs';
import type { Task } from '@/types/task';
import type { Activity } from '@/types/activities';
import type { Message } from '@/types/messages';
import ContactActivities from '@/components/library/card-activities.vue';
import CardNotes from '@/components/library/card-notes.vue';
import CardMessages from '@/components/library/card-messages.vue';
// eslint-disable-next-line import/no-unresolved
import { getContactMessages } from 'dx-template-gallery-data';
import CardTasks from '@/components/library/card-tasks.vue';
import CardOpportunities from '@/components/library/card-opportunities.vue';

const props = withDefaults(defineProps<{
  contactId: number | null,
  isLoading: boolean,
  contactName: string,
  tasks: Task[],
  activities: Activity[],
}>(), {
  contactId: null,
  isLoading: true,
  contactName: '',
  tasks: () => [],
  activities: () => [],
});

const isMessagesLoading = ref<boolean>(true);
const messages = ref<Message[]>([]);

async function loadMessages() {
  if (!props.contactId) return;

  isMessagesLoading.value = true;

  messages.value = await getContactMessages(props.contactId);
  isMessagesLoading.value = false;
}

onMounted(() => {
  loadMessages();
});
</script>

<style scoped>
</style>
