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
import {
  inject,
  onBeforeUnmount,
  onMounted,
  ref,
} from 'vue';
import Rx from 'rxjs';
import { DxTabPanel } from 'devextreme-vue/tab-panel';
import { DxItem as DxTabItem } from 'devextreme-vue/tabs';
import type { Task } from '@/types/task';
import type { Activity } from '@/types/activities';
import type { Message } from '@/types/messages';
import ContactActivities from '@/components/contact-activities.vue';
import CardNotes from '@/components/card-notes/card-notes.vue';
import CardMessages from '@/components/card-messages/card-messages.vue';
import MessagesService from '@/components/card-messages/messages-service';
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

function loadMessages() {
  if (!props.contactId) return;

  isMessagesLoading.value = true;

  MessagesService.getContactMessages(props.contactId).then((data) => {
    messages.value = data;
    isMessagesLoading.value = false;
  });
}

const refreshSubscription = inject<Rx.Subject<void>>('refresh-notifier')
  ?.subscribe(loadMessages);

onMounted(() => {
  loadMessages();
});

onBeforeUnmount(() => {
  refreshSubscription?.unsubscribe();
});
</script>

<style scoped>
</style>
