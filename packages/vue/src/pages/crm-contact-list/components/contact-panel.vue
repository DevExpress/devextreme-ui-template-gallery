<template>
  <div id="contact-panel" class="panel" v-bind:class="{ pin: isPin, open: props.isPanelOpen }">
    <div class="data-wrapper">
      <load-component :width="300" container-selector="#contact-panel" :is-loading="isLoading">
        <template v-if="panelData">
          <div class="data-part">
            <dx-toolbar>
              <dx-item location="before">
                <div class="contact-name">{{ panelData?.name }}</div>
              </dx-item>
              <dx-item location="before">
                <user-status :status="panelData?.status"/>
              </dx-item>

              <dx-item
                location="after"
                widget="dxButton"
                :visible="isPinEnabled"
                :options="{ icon: isPin ? 'unpin' : 'pin', onClick: () => isPin = !isPin }"
              >
              </dx-item>

              <dx-item
                location="after"
                widget="dxButton"
                :options="{ icon: 'close', onClick: () => emit('close') }"
              >
              </dx-item>
            </dx-toolbar>
          </div>

          <dx-scroll-view class="panel-scroll">
            <div class="data-part border form-compact">
              <dx-form
                :formData="panelData"
                labelMode="floating"
                :readOnly="!isEditing"
              >
                <dx-form-group-item :colCount="2" cssClass="photo-row">
                  <dx-form-item dataField="image" cssClass="photo-box">
                    <user-photo :link="panelData.image" ></user-photo>
                  </dx-form-item>

                  <dx-form-group-item>
                    <dx-form-item
                      dataField="company"
                      :editorOptions="editorOptions"
                    >
                      <form-item-plain class="accent"
                      :value="panelData['company']"
                      :label="'Company'"
                      :isEditing = "isEditing"
                      />
                    </dx-form-item>

                    <dx-form-item
                      dataField="position"
                      :editorOptions="editorOptions"
                    >
                      <form-item-plain :value="panelData['position']"
                                       :label="'Position'"
                                       :isEditing = "isEditing"
                      />
                    </dx-form-item>

                    <dx-form-item
                      dataField="manager"
                      :editorOptions="editorOptions"
                    >
                      <form-item-plain class="accent"
                        :value="panelData['manager']"
                        :label="'Assigned to'"
                        :isEditing = "isEditing"
                      />
                    </dx-form-item>
                  </dx-form-group-item>
                </dx-form-group-item>

                <dx-form-group-item>
                  <dx-form-item v-for="(item, index) in underContactFields"
                                v-bind:key="index"
                                :dataField="item.name"
                                :editorOptions="item.editorOptions"
                  >
                    <form-item-plain :icon="item.editorOptions?.icon"
                                     :value="panelData[item.name]"
                                     :isEditing = "isEditing"
                                     :mask="item.editorOptions.mask"
                                     :rendered-value="item.name === 'phone'?
                                               formatPhone(panelData[item.name]):
                                                panelData[item.name]"
                    />
                  </dx-form-item>
                </dx-form-group-item>
              </dx-form>
            </div>

            <div class="data-part border">
              <dx-toolbar class="panel-toolbar">
                <dx-item
                  location="before"
                  widget="dxButton"
                  :options="isEditing ? {
                    icon: false,
                  stylingMode: 'outlined',
                   text: 'Save',
                    type: 'default',
                    onClick: toggleEdit} :
                  { icon: 'edit',
                  stylingMode: 'outlined',
                   text: 'Edit',
                   type: 'default',
                    onClick: toggleEdit
                  }"
                >
                </dx-item>

                <dx-item
                  location="before"
                  :visible="isEditing"
                  widget="dxButton"
                  :options="{ icon: false,
                  stylingMode: 'text',
                   text: 'Cancel',
                     onClick: toggleEdit}"
                >
                </dx-item>

                <dx-item
                  location="after"
                  widget="dxDropDownButton"
                  :options="{
                text: 'Actions',
                stylingMode: 'contained',
                items: ['Call', 'Send Fax', 'Send Email', 'Make a Meeting']
              }"
                ></dx-item>
              </dx-toolbar>
            </div>
            <div class="data-part">
              <dx-accordion :multiple="true" :collapsible="true">
                <template #title="{ data }">
                  <span class="accordion-title">{{ data.title }}</span>
                  <dx-button
                    icon="add"
                    type="default"
                    stylingMode="text"
                    @click="e => {e.event.stopPropagation(); accordionPlusClick(e);}"
                  ></dx-button>
                </template>

                <dx-accordion-item title="Opportunities">
                  <div v-for="(opportunity, i) in panelData.opportunities"
                       v-bind:key="i"
                       class="opportunities"
                  >
                    <span class="value">{{ opportunity.name }} </span>
                    <br />
                    <span class="value black small">{{
                        formatPrice(opportunity.price)
                      }}</span>
                    <br />
                  </div>
                </dx-accordion-item>

                <dx-item title="Activities">
                  <contact-activities :items="panelData.activities" :is-loading="false"/>
                </dx-item>
              </dx-accordion>
            </div>
          </dx-scroll-view>
        </template>
      </load-component>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  onBeforeUnmount, onMounted, ref, watch,
} from 'vue';
// eslint-disable-next-line import/no-unresolved
import { getContact } from 'dx-rwa-data';
import DxAccordion, { DxItem as DxAccordionItem } from 'devextreme-vue/accordion';
import DxButton from 'devextreme-vue/button';
import {
  DxForm,
  DxItem as DxFormItem,
  DxGroupItem as DxFormGroupItem,
} from 'devextreme-vue/form';
import DxScrollView from 'devextreme-vue/scroll-view';
import DxToolbar, { DxItem } from 'devextreme-vue/toolbar';
import UserPhoto from '@/components/user-photo.vue';
import UserStatus from '@/components/user-status.vue';
import { sizes, subscribe, unsubscribe } from '@/utils/media-query';
import { formatPrice, formatPhone } from '@/utils/formatters';
import ContactActivities from '@/components/contact-activities.vue';
import LoadComponent from '@/components/load-component.vue';

import type { Contact } from '@/types/contact';
import FormItemPlain from '@/components/form-item-plain.vue';

const isEditing = ref(false);
const isLoading = ref(false);
const isPin = ref(false);
const isPinEnabled = ref(true);
const panelData = ref<Contact | null>(null);
const props = withDefaults(defineProps<{
  isPanelOpen: boolean,
  userId: number | null
}>(), { isPanelOpen: false, userId: null });

const editorOptions = ref({ stylingMode: 'underlined' });
const toggleEdit = () => {
  isEditing.value = !isEditing.value;
  editorOptions.value = { stylingMode: isEditing.value ? 'filled' : 'underlined' };
};

const emit = defineEmits(['close']);

const underContactFields = [
  {
    name: 'phone',
    editorOptions: {
      stylingMode: editorOptions.value.stylingMode,
      mask: '+1(000)000-0000',
      icon: 'tel',
    },
  },
  {
    name: 'email',
    editorOptions: {
      stylingMode: editorOptions.value.stylingMode,
      icon: 'email',
    },
  },
  {
    name: 'address',
    editorOptions: {
      stylingMode: editorOptions.value.stylingMode,
      icon: 'home',
    },
  }];

const screenSizeChanged = () => {
  isPinEnabled.value = sizes()['screen-medium'] || sizes()['screen-large'];
  if (isPinEnabled.value === false) {
    isPin.value = false;
  }
};

const loadContact = async (userId: number) => {
  isLoading.value = true;
  panelData.value = await getContact(userId);
  isLoading.value = false;
};

// eslint-disable-next-line @typescript-eslint/no-empty-function
function accordionPlusClick(/* e : Event */) {
}

watch(
  () => props.userId,
  (newUserId) => {
    if (newUserId !== null) {
      loadContact(newUserId);
    }
  },
);

onMounted(() => {
  subscribe(screenSizeChanged);
});

onBeforeUnmount(() => {
  unsubscribe(screenSizeChanged);
});
</script>

<style scoped lang="scss">
@use "@/variables" as *;

$side-panel-toolbar-height: 58px;

.screen-medium {
  .panel.open {
    top: $side-panel-toolbar-height;
  }
}

.dx-drawer-overlap {
  .panel.opne {
    top: $side-panel-toolbar-height;
  }
}

.panel {
  position: fixed;
  right: -350px;
  top: $side-panel-toolbar-height;
  bottom: 0;
  background: $base-bg;
  transition: right 400ms;

  .embedded.dx-viewport & {
    top: 0;
  }

  &.open {
    right: 0;
    box-shadow: 0 0 16px rgba(0, 0, 0, 0.12);
  }

  &.pin {
    position: absolute;
    transition: none;
    box-shadow: none;
    border-left: 1px solid $base-border-color;

    &.open {
      top: 0;
      position: relative;
    }
  }
  &:deep(.photo-row) > .dx-field-item-content > .dx-form-group .dx-box-flex {
    & > .dx-item > .dx-item-content > .dx-item:first-child {
      max-width: 140px;

      .dx-field-item:not(.dx-last-col) {
        padding-right: 0;
      }
    }
  }

  &:deep(.data-wrapper) {
    width: 350px;
    padding-bottom: 16px;
    height: 100%;

    .data-part {
      padding: 0 16px;

      &.border {
        padding-bottom: 5px;
        border-bottom: 1px solid $base-border-color;
      }
    }

    .panel-scroll {
      height: calc(100% - #{$side-panel-toolbar-height});
    }

    .contact-name {
      font-weight: bold;
      margin-right: 8px;
    }

    .panel-toolbar {
      padding: 10px 3px 0 0;
    }

    .opportunities {
      padding-bottom: 10px;
    }

    .accordion-title {
      vertical-align: middle;
      padding-right: 10px;
    }

    .dx-accordion {
      margin: 0;
    }

    .dx-accordion-item {
      box-shadow: none;
      border: none;

      &.dx-accordion-item-opened {
        margin: 0;
      }
    }

    .dx-state-focused >,
    .dx-state-hover > {
      .dx-accordion-item-title {
        background-color: transparent;
      }
    }
    .dx-accordion-item-title {
      padding: 6px 0;
      background-color: transparent;

      .dx-accordion-item-title-caption {
        left: 0;
      }
    }

    .dx-accordion-item-body {
      padding: 0;
      margin-right: 2px;
    }
  }
}

.icon-editor {
  display: flex;
  gap: 15px;

  .dx-textbox {
    flex: 1;
  }
}
</style>
