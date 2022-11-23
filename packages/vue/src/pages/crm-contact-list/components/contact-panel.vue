<template>
  <div
    id="contact-panel"
    class="panel"
    :class="{ pin: isPinned, open: props.isPanelOpened }"
  >
    <div class="data-wrapper">
      <load-component
        :width="300"
        container-selector="#contact-panel"
        :is-loading="isLoading"
      >
        <template v-if="panelData">
          <div class="data-part">
            <dx-toolbar class="panel-toolbar">
              <dx-item location="before">
                <div class="contact-name">
                  {{ panelData?.name }}
                </div>
              </dx-item>
              <dx-item location="before">
                <contact-status :value="panelData?.status" />
              </dx-item>

              <dx-item
                location="after"
                widget="dxButton"
                :visible="isPinEnabled"
                :options="{ icon: isPinned ? 'pin' : 'unpin', onClick: () => isPinned = !isPinned }"
              />

              <dx-item
                location="after"
                widget="dxButton"
                :options="{ icon: 'close', onClick: () => emit('close') }"
              />
            </dx-toolbar>
          </div>

          <dx-scroll-view class="panel-scroll">
            <dx-validation-group>
              <div class="data-part border">
                <dx-form
                  :class="{'view-mode': !isEditing, 'plain-styled-form dx-form': true}"
                >
                  <dx-form-group-item
                    :col-count="2"
                    css-class="photo-row"
                  >
                    <DxColCountByScreen :xs="2" />
                    <dx-form-item css-class="photo-box">
                      <form-photo :link="panelData.image" />
                    </dx-form-item>

                    <dx-form-group-item>
                      <dx-form-item css-class="accent">
                        <form-textbox
                          :label="'Company'"
                          v-model="panelData['company']"
                          :is-editing="isEditing"
                        />
                      </dx-form-item>

                      <dx-form-item>
                        <form-textbox
                          v-model="panelData['position']"
                          :label="'Position'"
                          :is-editing="isEditing"
                        />
                      </dx-form-item>

                      <dx-form-item css-class="accent">
                        <form-textbox
                          :label="'Assigned to'"
                          v-model="panelData['manager']"
                          :is-editing="isEditing"
                        />
                      </dx-form-item>
                    </dx-form-group-item>
                  </dx-form-group-item>

                  <dx-form-group-item css-class="contact-fields-group">
                    <dx-form-item
                      v-for="(item, index) in underContactFields"
                      :key="index"
                    >
                      <form-textbox
                        :icon="item.icon"
                        v-model="panelData[item.name]"
                        :is-editing="isEditing"
                        :mask="item.mask"
                      />
                    </dx-form-item>
                  </dx-form-group-item>
                </dx-form>
              </div>

              <div class="data-part data-part-toolbar border">
                <dx-toolbar>
                  <dx-item
                    location="before"
                    :visible="!isEditing"
                  >
                    <dx-button
                      text="Edit"
                      icon="edit"
                      styling-mode="outlined"
                      type="default"
                      @click="toggleEdit()"
                    />
                  </dx-item>

                  <dx-item
                    location="before"
                    :visible="!isEditing"
                  >
                    <dx-button
                      text="Details"
                      styling-mode="outlined"
                      type="default"
                      @click="navigateToDetails()"
                    />
                  </dx-item>

                  <dx-item
                    location="before"
                    locate-in-menu="before"
                    :visible="isEditing"
                  >
                    <dx-button
                      text="Save"
                      icon="save"
                      styling-mode="outlined"
                      type="default"
                      @click="handleSaveClick"
                    />
                  </dx-item>

                  <dx-item
                    location="before"
                    locate-in-menu="before"
                    :visible="isEditing"
                  >
                    <dx-button
                      text="Cancel"
                      @click="toggleEdit()"
                      styling-mode="text"
                    />
                  </dx-item>

                  <dx-item
                    location="after"
                    widget="dxDropDownButton"
                    :options="{
                      width: 120,
                      text: 'Actions',
                      stylingMode: 'contained',
                      items: ['Call', 'Send Fax', 'Send Email', 'Make a Meeting']
                    }"
                  />
                </dx-toolbar>
              </div>
            </dx-validation-group>

            <div class="data-part">
              <dx-accordion
                :multiple="true"
                :collapsible="true"
              >
                <template #title="{ data }">
                  <div class="accordion-title">
                    <span>{{ data.title }}</span>
                    <dx-button
                      icon="add"
                      type="default"
                      styling-mode="text"
                      @click="e => {e.event.stopPropagation(); accordionPlusClick(e);}"
                    />
                  </div>
                </template>

                <dx-accordion-item title="Opportunities">
                  <div
                    v-for="(opportunity, i) in panelData.opportunities"
                    :key="i"
                    class="opportunities"
                  >
                    <span class="value">{{ opportunity.name }} </span>
                    <br>
                    <span class="value black small">{{
                      formatPrice(opportunity.price)
                    }}</span>
                    <br>
                  </div>
                </dx-accordion-item>

                <dx-item title="Activities">
                  <contact-activities
                    :items="panelData.activities"
                    :is-loading="false"
                  />
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
import { ref, watch } from 'vue';
import { router } from '@/router';
// eslint-disable-next-line import/no-unresolved
import { getContact } from 'dx-template-gallery-data';
import { DxAccordion, DxItem as DxAccordionItem } from 'devextreme-vue/accordion';
import { DxButton } from 'devextreme-vue/button';
import {
  DxForm,
  DxItem as DxFormItem,
  DxGroupItem as DxFormGroupItem,
  DxColCountByScreen,
} from 'devextreme-vue/form';
import { DxScrollView } from 'devextreme-vue/scroll-view';
import { DxToolbar, DxItem } from 'devextreme-vue/toolbar';
import { DxValidationGroup } from 'devextreme-vue/validation-group';
import FormPhoto from '@/components/form-photo.vue';
import ContactStatus from '@/components/contact-status.vue';
import { screenInfo } from '@/utils/media-query';
import { formatPrice } from '@/utils/formatters';
import ContactActivities from '@/components/card-activities.vue';
import LoadComponent from '@/components/load-component.vue';
import type { Contact } from '@/types/contact';
import FormTextbox from '@/components/form-textbox.vue';

const isEditing = ref(false);
const isLoading = ref(false);
const isPinned = ref(false);
const isPinEnabled = ref(true);
const panelData = ref<Contact | null>(null);
const props = withDefaults(defineProps<{
  isPanelOpened: boolean,
  contactId: number | null
}>(), { isPanelOpened: false, contactId: null });

const toggleEdit = () => {
  isEditing.value = !isEditing.value;
};

const emit = defineEmits(['close']);

const underContactFields = [
  {
    name: 'phone',
    mask: '+1(000)000-0000',
    icon: 'tel',
  },
  {
    name: 'email',
    icon: 'email',
  },
  {
    name: 'address',
    icon: 'home',
  }];

watch(
  screenInfo,
  (newScreenInfo) => {
    isPinEnabled.value = newScreenInfo.isLarge || newScreenInfo.isMedium;
    if (isPinEnabled.value === false) {
      isPinned.value = false;
    }
  },
);

const loadContact = async (contactId: number) => {
  isLoading.value = true;
  panelData.value = await getContact(contactId);
  isLoading.value = false;
};

// eslint-disable-next-line @typescript-eslint/no-empty-function
function accordionPlusClick(/* e : Event */) {
}

function handleSaveClick({ validationGroup }: {validationGroup: Record<string, any>}) {
  if (validationGroup.validate().isValid) {
    isEditing.value = false;
  }
}

watch(
  () => props.contactId,
  (newId) => {
    if (newId !== null) {
      loadContact(newId);
    }
  },
);

const navigateToDetails = () => {
  router.push('/crm-contact-details');
};
</script>

<style lang="scss">
#contact-panel {
  --contact-side-panel-toolbar-top: 58px;
  --contact-side-panel-width: 350px;
}

.screen-x-small #contact-panel {
  --contact-side-panel-width: 100vw;
}
</style>
<style scoped lang="scss">
@use "@/variables" as *;

.panel {
  position: fixed;
  right: calc(-1 * var(--contact-side-panel-width));
  top: var(--contact-side-panel-toolbar-top);
  bottom: 0;
  background: $base-bg;
  transition: right 400ms;

  .embedded.dx-viewport & {
    top: 0;
  }

  .panel-toolbar {
    :deep(.dx-toolbar-items-container) {
      height: $toolbar-items-container-height;
    }
  }

  &.open {
    right: 0;
    box-shadow: 0 0 16px $base-border-color;
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
    padding-bottom: 16px;
    height: 100%;
    width: var(--contact-side-panel-width);

    .data-part {
      padding: 0 16px;

      &.border {
        border-bottom: 1px solid $base-border-color;
      }

      &-toolbar {
        padding: 10px 16px;
        margin-bottom: $toolbar-margin-bottom;

        .dx-button {
          min-width: 90px;
        }
      }
    }

    .panel-scroll {
      height: calc(100% - 20px);
    }

    .contact-name {
      font-weight: bold;
      margin-right: 8px;
    }

    .opportunities {
      padding-bottom: 10px;
    }

    .dx-accordion {
      .accordion-title {
        vertical-align: middle;
        padding-right: 10px;
        display: flex;
        align-items: center;
      }
    }
  }
}
</style>
