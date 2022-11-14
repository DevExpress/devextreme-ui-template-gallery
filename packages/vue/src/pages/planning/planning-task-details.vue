<template>
  <div class="view-wrapper">
    <dx-toolbar>
      <dx-toolbar-item location="before">
        <dx-button icon="arrowleft" />
      </dx-toolbar-item>
      <dx-toolbar-item
        location="before"
        :text="taskName"
      />
      <dx-toolbar-item
        location="after"
        locate-in-menu="auto"
      >
        <dx-drop-down-button
          text="ACTIONS"
          styling-mode="contained"
        >
          <dx-drop-down-item text="Duplicate" />
          <dx-drop-down-item text="Close" />
          <dx-drop-down-item text="Delete" />
        </dx-drop-down-button>
      </dx-toolbar-item>

      <dx-toolbar-item
        location="after"
        locate-in-menu="auto"
        widget="dxButton"
        show-text="inMenu"
        :options="{
          text: 'Attach',
          icon: 'attach'
        }"
      />

      <dx-toolbar-item
        location="after"
        locate-in-menu="auto"
        widget="dxButton"
        show-text="inMenu"
        :options="{
          text: 'Refresh',
          icon: 'refresh',
          onClick: refresh
        }"
      />
    </dx-toolbar>

    <div class="panels">
      <div class="left">
        <task-form
          :data="taskData"
          :is-editing="false"
          :contentByScreen="{ xs: 2, sm: 2 }"
          :is-loading="isLoading && !taskData.name"
        />
      </div>

      <div class="right">
        <div class="dx-card details-card">
          <dx-tab-panel
            :show-nav-buttons="true"
            :defer-rendering="false"
          >
            <dx-item title="Activities">
              <card-activities
                :items="taskData.activities || []"
                :is-loading="false"
                :show-by="true"
              />
            </dx-item>
            <dx-item title="Notes">
              <card-notes
                :user="taskData.owner"
                :items="notes"
              />
            </dx-item>

            <dx-item
              title="Messages"
              :badge="messageBadge"
            >
              <card-messages
                :user="taskData.owner"
                :messages="taskData.messages"
                :is-loading="false"
              />
            </dx-item>
          </dx-tab-panel>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { DxButton } from 'devextreme-vue/button';
import { DxDropDownButton, DxItem as DxDropDownItem } from 'devextreme-vue/drop-down-button';
import {
  DxToolbar,
  DxItem as DxToolbarItem,
} from 'devextreme-vue/toolbar';
import { DxTabPanel, DxItem } from 'devextreme-vue/tab-panel';
// eslint-disable-next-line import/no-unresolved
import { getTask } from 'dx-rwa-data';
import type { Task } from '@/types/task';
import CardNotes from '@/components/card-notes.vue';
import CardActivities from '@/components/card-activities.vue';
import CardMessages from '@/components/card-messages.vue';
import TaskForm from './components/task-form.vue';

const taskId = 1;
const taskName = ref('');
const taskData = ref<Task | Record<string, any>>({ notes: [] });
const isLoading = ref(false);

const messageBadge = computed(() => {
  const length = taskData.value.messages?.length;
  return (length >= 0) ? `${length}` : '...';
});

const notes = computed(() => taskData.value.notes || []);

async function loadData() {
  isLoading.value = true;
  const data = await getTask(taskId);

  taskData.value = data;
  taskName.value = data.text;
  isLoading.value = false;
}

const refresh = () => {
  loadData();
};

onMounted(() => {
  loadData();
});
</script>

<style scoped lang="scss">
@use "@/variables" as *;

$left-panel-width: 400px;

.dx-toolbar {
  margin-bottom: calc(#{$toolbar-margin-bottom} / 2);

  :deep(.dx-toolbar-label > div) {
    @include header();
  }
}

.view-wrapper {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  padding: 20px 16px 0 16px;

  .panels {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    gap: 20px;

    .left {
      flex: 1 400px;
      margin-top: 8px;
    }

    .right {
      flex: 1 calc(100% - 400px - 20px);
      margin-top: 8px;
      min-width: 340px;
    }
  }
}
</style>
