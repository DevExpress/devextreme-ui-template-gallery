<template>
  <div id="task-form">
    <toolbar-form
      v-if="!isCreateMode"
      :is-editing="isEditing"
      @edit-canceled="handleCancelClick"
      @edit-toggled="handleEditClick"
      @save-clicked="handleSaveClick"
    />
    <dx-load-panel
      :visible="isLoading"
      :show-pane="false"
      width="auto"
      container="#task-form"
      :position="{ of: '#task-form' }"
    />
    <dx-form
      :form-data="data"
      class="plain-styled-form dx-form"
      :class="{ 'view-mode': !isEditing }"
      :screen-by-width="getSizeQualifier"
      v-if="!!props.data"
    >
      <dx-form-item
        v-if="isCreateMode"
        :col-span="2"
      >
        <form-textbox
          label="Subject"
          v-model="data.text"
          :is-editing="isEditing"
        />
      </dx-form-item>
      <dx-form-group-item :col-count="2">
        <dx-col-count-by-screen
          :xs="1"
          :sm="2"
          :md="2"
          :lg="2"
        />
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
            field-template="field"
            item-template="item"
            v-bind="formSelectBoxProps"
          >
            <template #field>
              <div class="task-editor-field">
                <status-indicator
                  :is-field="true"
                  :show-bar="true"
                  :value="data.priority"
                />
              </div>
            </template>
            <template #item="item">
              <status-indicator
                :show-bar="true"
                :value="item.data"
              />
            </template>
          </dx-select-box>
        </dx-form-item>

        <dx-form-item>
          <dx-select-box
            label="Status"
            v-model="data.status"
            :items="taskStatusList"
            :read-only="!isEditing"
            field-template="field"
            item-template="item"
            v-bind="formSelectBoxProps"
          >
            <template #field>
              <div class="task-editor-field">
                <status-indicator
                  :is-field="true"
                  :value="data.status"
                />
              </div>
            </template>
            <template #item="item">
              <status-indicator
                :value="item.data"
              />
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
</template>
<script setup lang="ts">
import { reactive, ref, watch } from 'vue';
import { getSizeQualifier } from '@/utils/media-query';
import StatusIndicator from '@/components/library/status-indicator.vue';
import { DxTextArea } from 'devextreme-vue/text-area';
import {
  taskPriorityList, Task, taskStatusList,
} from '@/types/task';
import {
  DxForm,
  DxItem as DxFormItem,
  DxGroupItem as DxFormGroupItem,
  DxColCountByScreen,
} from 'devextreme-vue/form';
import { DxSelectBox } from 'devextreme-vue/select-box';
import { DxButtonTypes } from 'devextreme-vue/button';
import DxLoadPanel from 'devextreme-vue/load-panel';
import FormTextbox from '@/components/utils/form-textbox.vue';
import FormDatebox from '@/components/utils/form-datebox.vue';
import { formSelectBoxProps } from '@/shared/form-editor-config';
import ToolbarForm from '@/components/utils/toolbar-form.vue';

const props = withDefaults(defineProps<{
  isCreateMode?: boolean,
  isLoading?: boolean,
  data?: Task,
  contentByScreen: { xs: number, sm: number },
  validationGroup?: string,
}>(), {
  data: undefined,
  isLoading: false,
  isCreateMode: false,
  validationGroup: undefined,
});

const isEditing = ref(props.isCreateMode);
const data = reactive({ ...props.data });

let newData: Task;

watch(
  () => props.data,
  (newValue) => {
    Object.assign(data, newValue);
  },
);

watch(
  data,
  (newValue) => {
    newData = { ...newValue };
  },
);

function handleEditClick() {
  isEditing.value = true;
}

function handleSaveClick({ validationGroup }: DxButtonTypes.ClickEvent) {
  if (validationGroup.validate().isValid) {
    isEditing.value = false;
  }
}

function handleCancelClick() {
  Object.assign(data, props.data);
  isEditing.value = false;
}

defineExpose<{getNewTaskData:() => Task}>({
  getNewTaskData: () => newData,
});
</script>
<style scoped lang="scss">
@use "@/variables.scss" as *;

#task-form {
  min-height: 250px;
}
</style>
