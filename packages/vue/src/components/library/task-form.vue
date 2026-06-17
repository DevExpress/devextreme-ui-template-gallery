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
            class="task-details-select-box"
            label="Priority"
            label-mode="static"
            v-model="data.priority"
            :items="taskPriorityList"
            :read-only="!isEditing"
            placeholder=""
            :field-addons="{ beforeTemplate: 'before' }"
            :display-expr="() => ''"
            item-template="item"
            v-bind="formSelectBoxProps"
          >
            <template #before="{ data: itemData }">
              <status-indicator
                :is-field="false"
                :show-bar="true"
                :value="itemData"
              />
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
            class="task-details-select-box"
            label="Status"
            label-mode="static"
            v-model="data.status"
            :items="taskStatusList"
            :read-only="!isEditing"
            placeholder=""
            :field-addons="{ beforeTemplate: 'before' }"
            :display-expr="() => ''"
            item-template="item"
            v-bind="formSelectBoxProps"
          >
            <template #before="{ data: itemData }">
              <status-indicator
                :is-field="false"
                :value="itemData"
              />
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

  :deep(.task-details-select-box .dx-dropdowneditor-field-before-template-wrapper) {
    min-width: 0;

    .status.status-indicator {
      display: inline-flex;
      align-items: center;
      white-space: nowrap;

      span {
        display: inline-flex;
        align-items: center;
      }
    }
  }

  :deep(.dx-form:not(.view-mode) .task-details-select-box .dx-dropdowneditor-field-before-template-wrapper .status.status-indicator) {
    padding-left: var(--list-padding-left);
  }
}
</style>
