<template>
  <div id="task-form">
    <dx-toolbar>
      <dx-toolbar-item location="before">
        <span class="dx-form-group-caption">Details</span>
      </dx-toolbar-item>
      <dx-toolbar-item
        location="after"
        locate-in-menu="after"
        :visible="!isEditing"
      >
        <dx-button
          text="Edit"
          icon="edit"
          styling-mode="outlined"
          type="default"
          :visible="!isLoading"
          @click="handleEditClick()"
        />
      </dx-toolbar-item>
      <dx-toolbar-item
        location="after"
        locate-in-menu="after"
        :visible="isEditing"
      >
        <dx-button
          text="Save"
          styling-mode="outlined"
          type="default"
          @click="handleSaveClick()"
        />
      </dx-toolbar-item>
      <dx-toolbar-item
        location="after"
        locate-in-menu="after"
        :visible="isEditing"
      >
        <dx-button
          text="Cancel"
          @click="handleCancelClick()"
          styling-mode="text"
        />
      </dx-toolbar-item>
    </dx-toolbar>
    <load-component
      :is-loading="isLoading"
      :container-selector="'#task-form'"
    >
      <div>
        <dx-form
          :form-data="data"
          class="plain-styled-form"
          :class="{'view-mode': !isEditing}"
          label-mode="floating"
        >
          <dx-form-group-item :col-count="2">
            <dx-col-count-by-screen :xs="2"/>
            <dx-form-item css-class="accent">
              <form-textbox
                label="Company"
                v-model="data.company"
                :is-editing="isEditing"
              />
            </dx-form-item>

            <dx-form-item css-class="accent">
              <form-textbox
                label="Assigned to"
                v-model="data.owner"
                :is-editing="isEditing"
              />
            </dx-form-item>

            <dx-form-item>
              <dx-select-box
                label="Priority"
                v-model="data.priority"
                :items="taskPriorityList"
                :read-only="!isEditing"
                :element-attr="{class: 'form-editor'}"
                field-template="field"
                item-template="item"
                styling-mode="filled"
              >
                <template #field>
                  <div class="task-editor-field">
                    <status-indicator
                      :is-field="true"
                      :show-bar="true"
                      :value="data.priority" />
                  </div>
                </template>
                <template #item="{ data }">
                  <status-indicator
                    :show-bar="true"
                    :value="data" />
                </template>
              </dx-select-box>
            </dx-form-item>

            <dx-form-item>
              <dx-select-box
                label="Status"
                v-model="data.status"
                :items="taskStatusList"
                :read-only="!isEditing"
                :element-attr="{class: 'form-editor'}"
                field-template="field"
                item-template="item"
                styling-mode="filled"
              >
                <template #field>
                  <div class="task-editor-field">
                    <status-indicator
                      :is-field="true"
                      :value="data.status" />
                  </div>
                </template>
                <template #item="{ data }">
                  <status-indicator
                    :value="data" />
                </template>
              </dx-select-box>
            </dx-form-item>

            <dx-form-item>
              <form-datebox
                label="Start Date"
                v-model="data.startDate"
                :is-editing="isEditing"
              />
            </dx-form-item>

            <dx-form-item>
              <form-datebox
                label="Due Date"
                v-model="data.dueDate"
                :is-editing="isEditing"
              />
            </dx-form-item>
          </dx-form-group-item>

          <dx-form-item>
            <dx-text-area
              label="Details"
              styling-mode="filled"
              v-model="data.description"
            />
          </dx-form-item>
        </dx-form>
      </div>
    </load-component>
  </div>
</template>
<script setup lang="ts">
import { ref, watch } from 'vue';
import StatusIndicator from '@/components/status-indicator.vue';
import { DxButton } from 'devextreme-vue/button';
import { DxTextArea } from 'devextreme-vue/text-area';
import { taskPriorityList, Task, taskStatusList } from '@/types/task';
import {
  DxToolbar,
  DxItem as DxToolbarItem,
} from 'devextreme-vue/toolbar';
import {
  DxForm,
  DxItem as DxFormItem,
  DxGroupItem as DxFormGroupItem,
  DxColCountByScreen,
} from 'devextreme-vue/form';
import { DxSelectBox } from 'devextreme-vue/select-box';
import { DxTextBox } from 'devextreme-vue/text-box';
import LoadComponent from '@/components/load-component.vue';
import FormTextbox from '@/components/form-textbox.vue';
import TaskStatus from '@/components/task-status.vue';
import FormDatebox from '@/components/form-datebox.vue';

const emptyData = {} as Task;

const props = withDefaults(defineProps<{
  isLoading: boolean,
  data: Task | null
}>(), {
  isLoading: true,
  data: null,
});

const isEditing = ref(false);
const data = ref(emptyData);

let dataSaved = emptyData;

watch(
  () => props.data,
  (contactDataNew: Task | null) => {
    data.value = contactDataNew || emptyData;
  },
);

function handleEditClick() {
  dataSaved = { ...data.value };
  isEditing.value = true;
}

function handleSaveClick() {
  isEditing.value = false;
}

function handleCancelClick() {
  data.value = dataSaved;
  isEditing.value = false;
}
</script>
<style scoped lang="scss">
@use "@/variables.scss" as *;

#task-form {
  min-height: 300px;

  .dx-toolbar {
    margin-bottom: $toolbar-margin-bottom;
  }
}
</style>
