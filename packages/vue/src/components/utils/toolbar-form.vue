<template>
  <dx-toolbar>
    <dx-toolbar-item location="before">
      <span class="dx-form-group-caption">Details</span>
    </dx-toolbar-item>
    <dx-toolbar-item
      location="after"
      locate-in-menu="after"
      :visible="!props.isEditing"
    >
      <dx-button
        text="Edit"
        icon="edit"
        styling-mode="contained"
        type="default"
        @click="emit('editToggled')"
      />
    </dx-toolbar-item>
    <dx-toolbar-item
      location="after"
      locate-in-menu="after"
      :visible="props.isEditing"
    >
      <dx-button
        text="Save"
        styling-mode="contained"
        type="default"
        @click="emit('saveClicked', $event)"
      />
    </dx-toolbar-item>
    <dx-toolbar-item
      location="after"
      locate-in-menu="after"
      :visible="props.isEditing"
    >
      <dx-button
        text="Cancel"
        @click="emit('editCanceled')"
        styling-mode="outlined"
        type="normal"
      />
    </dx-toolbar-item>
  </dx-toolbar>
</template>

<script setup lang="ts">
import {
  DxToolbar,
  DxItem as DxToolbarItem,
} from 'devextreme-vue/toolbar';
import { DxButton } from 'devextreme-vue/button';

const props = withDefaults(defineProps<{
  isEditing: boolean,
}>(), {
  isEditing: false,
});

const emit = defineEmits(['editCanceled', 'saveClicked', 'editToggled']);
</script>

<style scoped lang="scss">
@use "@/variables.scss" as *;

.dx-toolbar {
  margin-bottom: var(--toolbar-margin-bottom);
}
</style>
