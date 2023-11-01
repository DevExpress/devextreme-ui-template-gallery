<template>
  <dx-scroll-view class="view-wrapper-scroll">
    <div class="view-wrapper">
      <dx-toolbar class="toolbar-details">
        <dx-toolbar-item location="before">
          <dx-button
            icon="arrowleft"
            styling-mode="text"
          />
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
            text="Actions"
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
          :options="attachOptions"
        />

        <dx-toolbar-item
          location="after"
          locate-in-menu="auto"
          widget="dxButton"
          show-text="inMenu"
          :options="refreshOptions"
        />
      </dx-toolbar>

      <div class="panels">
        <div class="left">
          <dx-validation-group>
            <task-form
              :data="taskData"
              :is-editing="false"
              :content-by-screen="{ xs: 2, sm: 2 }"
              :is-loading="isLoading"
            />
          </dx-validation-group>
        </div>

        <div class="right">
          <div class="dx-card details-card">
            <dx-tab-panel
              :show-nav-buttons="true"
              :defer-rendering="false"
            >
              <dx-item title="Activities">
                <card-activities
                  :items="taskData?.activities"
                  :is-loading="isLoading"
                  :show-by="true"
                />
              </dx-item>
              <dx-item title="Notes">
                <card-notes
                  :user="taskData?.owner"
                  :items="notes"
                />
              </dx-item>

              <dx-item
                title="Messages"
                :badge="messageBadge"
              >
                <card-messages
                  :user="taskData?.owner"
                  :messages="taskData?.messages"
                  :is-loading="false"
                />
              </dx-item>
            </dx-tab-panel>
          </div>
        </div>
      </div>
    </div>
  </dx-scroll-view>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { DxScrollView } from 'devextreme-vue/scroll-view';
import { DxDropDownButton, DxItem as DxDropDownItem } from 'devextreme-vue/drop-down-button';
import {
  DxToolbar,
  DxItem as DxToolbarItem,
} from 'devextreme-vue/toolbar';
import { DxTabPanel, DxItem } from 'devextreme-vue/tab-panel';
import { DxValidationGroup, DxButton } from 'devextreme-vue';
// eslint-disable-next-line import/no-unresolved
import { getTask } from 'dx-template-gallery-data';
import type { Task } from '@/types/task';
import CardNotes from '@/components/library/card-notes.vue';
import CardActivities from '@/components/library/card-activities.vue';
import CardMessages from '@/components/library/card-messages.vue';
import TaskForm from '@/components/library/task-form.vue';

const taskId = 1;
const taskName = ref('');
const taskData = ref<Task>();
const isLoading = ref(false);

const messageBadge = computed(() => {
  const length = taskData.value ? taskData.value.messages?.length : 0;
  return (length >= 0) ? `${length}` : '...';
});

const notes = computed(() => taskData.value?.notes);

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

const attachOptions = {
  text: 'Attach',
  icon: 'attach',
  stylingMode: 'text',
};

const refreshOptions = {
  text: 'Refresh',
  icon: 'refresh',
  onClick: refresh,
  stylingMode: 'text',
};
</script>

<style scoped lang="scss">
@use "@/variables" as *;
@use "sass:math";

@media only screen and (max-width: 875px) {
  :deep(.contact-name-toolbar-item) {
    min-width: calc(var(--left-panel-width) + var(--right-panel-width) - 145px);
  }
}

.dx-toolbar {
  margin-bottom: calc(var(--toolbar-margin-bottom) / 2);

  :deep(.dx-toolbar-label > div) {
    @include header();
  }
}

.view-wrapper {
  --left-panel-width: 400px;
  --right-panel-width: 360px;

  padding: var(--content-padding) var(--content-padding) 0 var(--content-padding);

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
