<template>
  <div class="dx-card">
    <dx-tab-panel :show-nav-buttons="true">
      <dx-tab-item title="Tasks">
        <card-tasks :tasks="props.tasks"
                    :is-loading="props.isLoading"
                    :manager="props.contactName"/>
      </dx-tab-item>

      <dx-tab-item title="Activities">
        <contact-activities :is-loading="props.isLoading"
                            :items="props.activities"
                            :show-by="true"/>
      </dx-tab-item>

      <dx-tab-item title="Opportunities">
        <card-opportunities :contact-id="props.contactId"/>
      </dx-tab-item>

      <dx-tab-item title="Notes">
        <card-notes :contact-name="props.contactName"
                    :contact-id="props.contactId"/>
      </dx-tab-item>

      <dx-tab-item title="Messages" :badge="messages?.length + ''">
        <card-messages :contact-name="props.contactName"
                       :messages="messages"
                       :isLoading="isMessagesLoading"/>
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
import ContactActivities from '@/components/contact-activities.vue';
import CardNotes from '@/components/card-notes/card-notes.vue';
import CardMessages from '@/components/card-messages/card-messages.vue';
// eslint-disable-next-line import/no-unresolved
import { getContactMessages } from 'dx-rwa-data';
import CardTasks from './components/card-tasks.vue';
import CardOpportunities from './components/card-opportunities.vue';

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
