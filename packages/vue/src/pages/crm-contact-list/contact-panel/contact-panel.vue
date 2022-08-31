<template>
  <div class="panel" v-bind:class="{ pin: isPin, open: props.isPanelOpen }">
    <dx-load-panel :width="300"
                   :visible="isLoading"
                   container=".panel"
                   :position="{ of: '.panel' }"/>
    <div class="data-wrapper">
      <template v-if="panelData && !isLoading">
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
          <div class="data-part border">
            <dx-form
                :formData="panelData"
                labelMode="floating"
                :readOnly="!isEditing"
            >
              <dx-form-group-item :colCount="2">
                <dx-form-item dataField="image">
                  <user-photo :link="panelData.image" ></user-photo>
                </dx-form-item>

                <dx-form-group-item>
                  <dx-form-item
                      dataField="company"
                      :editorOptions="editorOptions"
                  >
                    <form-item-editable
                        :data="panelData"
                        :dataField="'company'"
                        :isEditing = "isEditing"
                        :editorOptions="editorOptions"
                    ></form-item-editable>
                  </dx-form-item>

                  <dx-form-item
                      dataField="position"
                      :editorOptions="editorOptions"
                  ></dx-form-item>

                  <dx-form-item
                      dataField="manager"
                      :editorOptions="editorOptions"
                  >
                    <form-item-editable
                        :data="panelData"
                        :dataField="'manager'"
                        :label="'Assigned to'"
                        :isEditing = "isEditing"
                        :editorOptions="editorOptions"
                    ></form-item-editable>
                  </dx-form-item>
                </dx-form-group-item>
              </dx-form-group-item>

              <dx-form-group-item>
                <dx-form-item v-for="(item, index) in underContactFields"
                              v-bind:key="index"
                              :dataField="item.name"
                              :editorOptions="item.editorOptions"
                ><div class="icon-editor">
                  <i class="dx-icon" :class="'dx-icon-' + item.editorOptions?.icon"></i>
                  <dx-text-box
                      :value="panelData[item.name]"
                      :stylingMode="editorOptions.stylingMode"
                      :mask="item.editorOptions.mask"
                      :readOnly="!isEditing"
                  ></dx-text-box>
                </div>
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
                <user-activities :items="panelData.activities"></user-activities>
              </dx-item>
            </dx-accordion>
          </div>
        </dx-scroll-view>
      </template>

    </div>
  </div>
</template>

<script setup lang="ts">
import {
  onBeforeUnmount, onMounted, ref, watch,
} from 'vue';

import DxAccordion, { DxItem as DxAccordionItem } from 'devextreme-vue/accordion';
import DxButton from 'devextreme-vue/button';
import {
  DxForm,
  DxItem as DxFormItem,
  DxGroupItem as DxFormGroupItem,
} from 'devextreme-vue/form';
import DxLoadPanel from 'devextreme-vue/load-panel';
import DxScrollView from 'devextreme-vue/scroll-view';
import { DxTextBox } from 'devextreme-vue/text-box';
import DxToolbar, { DxItem } from 'devextreme-vue/toolbar';

import { Contact } from '@/types/contact';
import UserPhoto from '@/components/user-photo.vue';
import UserStatus from '@/components/user-status.vue';
import { sizes, subscribe, unsubscribe } from '@/utils/media-query';
import { formatPrice } from '@/utils/formatters';
import FormItemEditable from '@/components/form-item-editable.vue';
import UserActivities from './components/user-activities.vue';
import ContactService from '../../api/contact-service';

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

const getContact = (userId: number) => {
  isLoading.value = true;
  ContactService.getContact(userId).then((response:any) => {
    isLoading.value = false;
    panelData.value = response.data;
  }).catch((e: string) => {
    console.log(e);
  });
};

// eslint-disable-next-line @typescript-eslint/no-empty-function
function accordionPlusClick(/* e : Event */) {
}

watch(
  () => props.userId,
  (newUserId, _) => {
    if (newUserId !== null) {
      getContact(newUserId);
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

<style lang="scss">
@use "@/variables" as *;

$side-panel-toolbar-height: 58px;

.screen-medium {
  .panel.open {
    top: $side-panel-toolbar-height;
  }
}

.screen-large {
  .panel.open {
    top: 0;
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

  .data-wrapper {
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
