<template>
  <div class="view-wrapper">
    <div :class="{ scrolled: isContentScrolled, 'toolbar-wrapper': true, 'theme-dependent': true }">
      <dx-toolbar class="theme-dependent">
        <dx-item location="before">
          <div class="header-text">
            User Profile
          </div>
        </dx-item>
        <dx-item
          location="after"
          locate-in-menu="never"
        >
          <dx-button
            text="Cancel"
            styling-mode="outlined"
            type="normal"
            :disabled="!isDataChanged"
            @click="cancel()"
          />
        </dx-item>
        <dx-item
          location="after"
          locate-in-menu="never"
        >
          <dx-button
            :disabled="!isDataChanged"
            text="Save"
            icon="save"
            type="default"
            styling-mode="contained"
            @click="save()"
          />
        </dx-item>
      </dx-toolbar>
    </div>
    <dx-load-panel
      :visible="isLoading"
      :show-pane="false"
      :position="{ of: '.view-wrapper' }"
      container=".view-wrapper"
    />
    <dx-scroll-view
      v-if="!isLoading"
      class="view-wrapper-scroll"
      @scroll="scroll"
    >
      <div class="cards-container">
        <profile-card
          class="profile-card basic-info-card"
          title="Basic Info"
          :col-count="4"
          :card-data="profileData"
          :items="basicInfoItems"
          @data-changed="dataChanged()"
        >
          <div class="basic-info-top-item">
            <form-photo
              class="form-photo"
              :link="profileData?.image"
              :editable="true"
              :size="80"
            />
            <div>
              <div class="title-text">
                {{ profileData.name }}
              </div>
              <div class="subtitle-text with-clipboard-copy">
                ID: {{ profileData.id }}
                <dx-button
                  icon="copy"
                  class="copy-clipboard-button"
                  styling-mode="text"
                  @click="copyToClipboard(profileData.id, $event)"
                  :active-state-enabled="false"
                  :focus-state-enabled="false"
                  :hover-state-enabled="false"
                />
              </div>
              <dx-button
                text="Change Password"
                :icon="screenInfo.isXSmall ? null : 'lock'"
                class="change-password-button"
                styling-mode="contained"
                @click="changePassword()"
              />
            </div>
          </div>
        </profile-card>

        <profile-card
          class="profile-card contacts-card"
          title="Contacts"
          :card-data="profileData"
          :items="contactItems"
          @data-changed="dataChanged()"
        >
          <div class="contacts-top-item">
            <div class="image-wrapper">
              <i class="dx-icon dx-icon-mention" />
            </div>
            <div>
              <div class="title-text">
                {{ formatPhone(profileData.phone) }}
              </div>
              <div class="subtitle-text with-clipboard-copy">
                {{ profileData.email }}
                <dx-button
                  icon="copy"
                  class="copy-clipboard-button"
                  styling-mode="text"
                  @click="copyToClipboard(profileData.email, $event)"
                  :active-state-enabled="false"
                  :focus-state-enabled="false"
                  :hover-state-enabled="false"
                />
              </div>
            </div>
          </div>
        </profile-card>

        <profile-card
          class="profile-card address-card"
          title="Address"
          :card-data="profileData"
          :items="addressItems"
          @data-changed="dataChanged()"
        >
          <div class="address-top-item">
            <div class="image-wrapper">
              <i class="dx-icon dx-icon-map" />
            </div>
            <div>
              <div class="title-text">
                {{ profileData.address }},
                {{ profileData.city }}, {{ profileData.state }}, {{ profileData.country }}
              </div>
            </div>
          </div>
        </profile-card>
      </div>
    </dx-scroll-view>
  </div>
  <change-profile-password-form
    v-model:visible="isChangePasswordPopupVisible"
  />
</template>

<script setup lang="ts">
import { reactive, ref, watch } from 'vue';
import { DxScrollView } from 'devextreme-vue/scroll-view';
import { DxLoadPanel } from 'devextreme-vue/load-panel';
import {
  DxToolbar,
  DxItem,
} from 'devextreme-vue/toolbar';
import { DxButton } from 'devextreme-vue/button';
import { screenInfo } from '@/utils/media-query';
import FormPhoto from '@/components/utils/form-photo.vue';
import notify from 'devextreme/ui/notify';
import ProfileCard from '@/components/library/profile-card.vue';
import ChangeProfilePasswordForm from '@/components/library/change-profile-password-form.vue';
import { getProfile, getSupervisors } from 'dx-template-gallery-data';
import { formatPhone } from '@/utils/formatters';
import { Profile } from '@/types/profile';
import { contactStatusList } from '@/types/contact';
import { SimpleObject } from '@/types';

const isDataChanged = ref(false);
const isLoading = ref(true);

const profileData = ref<Profile>({} as Profile);
const supervisorsList = ref<SimpleObject[]>([]);
const isChangePasswordPopupVisible = ref(false);
const isContentScrolled = ref(false);

let savedData: Profile | null = null;
const basicInfoItems: SimpleObject[] = [
  { dataField: 'firstName', colSpan: 2 },
  { dataField: 'lastName', colSpan: 2 },
  {
    dataField: 'department',
    editorType: 'dxSelectBox',
    colSpan: 1,
    editorOptions: {
      items: ['UI/UX', 'Backend Developers'],
    },
  },
  {
    dataField: 'position',
    editorType: 'dxSelectBox',
    colSpan: 1,
    editorOptions: {
      items: ['Designer', 'Developer', 'Technical Writer'],
    },
  },
  {
    dataField: 'hiredDate',
    editorType: 'dxDateBox',
    colSpan: 1,
  },
  {
    dataField: 'birthDate',
    colSpan: 1,
    editorType: 'dxDateBox',
  },
];
const contactItems = reactive([
  {
    dataField: 'phone',
    editorOptions: {
      mask: '+1(000)000-0000',
    },
  },
  {
    dataField: 'email',
    validators: [
      { type: 'email' },
    ],
  },
  {
    dataField: 'domainUsername',
    colSpan: 2,
  },
  {
    dataField: 'status',
    colSpan: 2,
    itemsList: contactStatusList,
  },
  {
    dataField: 'supervisor',
    label: 'Supervisor',
    colSpan: 2,
    itemsList: supervisorsList,
    editorType: 'dxSelectBox',
  },
]);
const addressItems: SimpleObject[] = [
  { dataField: 'country' },
  { dataField: 'city' },
  {
    dataField: 'state',
    colSpan: 2,
    label: 'State/province/area',
    editorOptions: {
      label: 'State/province/area',
    },
  },
  {
    dataField: 'address',
    colSpan: 2,
  },
  {
    dataField: 'zipCode',
    editorType: 'dxNumberBox',
    colSpan: 2,
  },
];

watch(profileData, (value) => {
  setTimeout(() => {
    isDataChanged.value = JSON.stringify(value) !== JSON.stringify(savedData);
  }, 0);
});

Promise.all([getProfile(22), getSupervisors()]).then(([profile, supervisors]) => {
  profileData.value = profile;
  supervisorsList.value = supervisors;
  savedData = { ...profile };
  isLoading.value = false;
});

function changePassword() {
  isChangePasswordPopupVisible.value = true;
}

function scroll({ reachedTop = false }) {
  isContentScrolled.value = !reachedTop;
}

function dataChanged() {
  isDataChanged.value = true;
}

function save() {
  notify({ message: 'Data saved', position: { at: 'bottom center', my: 'bottom center' } }, 'success');
  isDataChanged.value = false;
  savedData = { ...profileData.value };
}

function cancel() {
  profileData.value = { ...savedData } as Profile;
}

function copyToClipboard(text: string, { event }: { event: Event }) {
  window.navigator.clipboard?.writeText(text);
  const tipText = 'Text copied';
  notify(
    {
      message: tipText,
      minWidth: `${tipText.length + 2}ch`,
      width: 'auto',
      position: { of: event.target, offset: '0 -30' },
    },
    'info',
    500,
  );
}
</script>
<style lang="scss">
.screen-x-small, .screen-small {
  .profile-card {
    min-width: 100%;
    flex: 1;
  }
}

.profile-card {
  flex: 0.5;
}
</style>
<style scoped lang="scss">
@use "@/variables.scss" as *;
@use "sass:math";

.view-wrapper {
  --gap-padding: 24px;

  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  padding-top: var(--content-padding);
  max-width: 1200px;
  margin: 0 auto;

  .view-wrapper-scroll {
    width: 100%;
    margin-top: calc(var(--content-padding) / 2);
  }

  .toolbar-wrapper {
    &.scrolled {
      padding-bottom: 8px;
      box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
    }

    .dx-toolbar {
      width: auto;

      .dx-button[aria-label="Cancel"] {
        margin-right: 5px;
      }
    }
  }

  .cards-container {
    display: flex;
    flex-wrap: wrap;
    margin: 0 1px;
    padding: calc(var(--content-padding) / 2) 0 var(--content-padding);
    gap: 24px;

    .profile-card {
      .image-wrapper {
        flex: 0 0 44px;
        height: 44px;
        border-radius: 50%;
        margin-right: var(--gap-padding);

        .dx-icon {
          margin: auto;
        }
      }

      .with-clipboard-copy {
        display: flex;
        align-items: flex-end;

        .dx-button {
          max-width: 18px;
          min-width: 18px;
          height: 18px;
          margin: 0 0 2px 5px;

          :deep(.dx-button-content) {
            padding: 0;
          }

          :deep(.dx-icon:active) {
            color: var(--accent-color);
          }
        }

        :deep(.copy-clipboard-button) {
          background-color: transparent;
          border-radius: unset;
          border-color: transparent;

          .dx-icon {
            color: var(--subtitle-text-color);
          }
        }
      }
    }

    .contacts-card .image-wrapper {
      background-color: color-mix(in sRGB, var(--error-color) 12%, transparent);
      color: var(--error-color);
    }

    .address-card .image-wrapper {
      background-color: color-mix(in sRGB, var(--info-color) 12%, transparent);
      color: var(--info-color);
    }

    .basic-info-top-item,
    .address-top-item,
    .contacts-top-item {
      display: flex;
      min-height: 50px;

      & > div {
        display: flex;
        flex-flow: column;
        gap: 5px;
      }
    }

    .basic-info-card {
      flex: 1;
      min-width: 100%;

      .basic-info-top-item {
        flex: 1;

        .form-photo {
          margin-right: var(--content-padding);

          :deep(.photo) {
            border-radius: 50%;
          }
        }

        .change-password-button {
          margin-top: calc(var(--content-padding) / 2);
        }
      }
    }
  }
}

:deep(.change-profile-password-popup .dx-popup-normal) {
  border-radius: 8px;
  padding: 8px 0;

.dx-toolbar {
  padding: 0 24px 8px;
}
}
</style>
