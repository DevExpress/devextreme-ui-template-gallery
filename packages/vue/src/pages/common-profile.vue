<template>
  <dx-scroll-view class="view-wrapper-scroll">
    <div class="view-wrapper">
      <dx-toolbar>
        <dxi-item location="before">
          <div class="header-text">
            User Profile
          </div>
        </dxi-item>
        <dxi-item
          location="after"
          locate-in-menu="never"
        >
          <dx-button
            text="Cancel"
            styling-mode="contained"
          />
        </dxi-item>
        <dxi-item
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
        </dxi-item>
      </dx-toolbar>

      <dx-load-panel
        :visible="isLoading"
        :show-pane="false"
        :position="{ of: 'common-profile' }"
        container=".view-wrapper-scroll"
      />
      <div
        v-if="!isLoading"
        class="cards-container"
      >
        <profile-card
          class="profile-card basic-info-card"
          title="Basic Info"
          :col-count="4"
          :card-data="profileData"
          :items="basicInfoItems"
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
                  (click)="copyToClipboard(profileData.id)"
                  :active-state-enabled="false"
                  :focus-state-enabled="false"
                  :hover-state-enabled="false"
                />
              </div>
              <dx-button
                text="Change Password"
                icon="lock"
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
        >
          <div class="contacts-top-item">
            <div class="image-wrapper">
              <img
                alt=""
                src="icons/at.svg"
              >
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
                  @click="copyToClipboard(profileData.email)"
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
        >
          <div class="address-top-item">
            <div class="image-wrapper">
              <img
                alt=""
                src="icons/geo-position.svg"
              >
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
    </div>
  </dx-scroll-view>
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
  DxItem as DxiItem,
} from 'devextreme-vue/toolbar';
import { DxButton } from 'devextreme-vue/button';
import FormPhoto from '@/components/form-photo.vue';
import notify from 'devextreme/ui/notify';
import ProfileCard from '@/components/profile-card.vue';
import ChangeProfilePasswordForm from '@/components/change-profile-password-form.vue';
import { getProfile, getSupervisors } from 'dx-template-gallery-data';
import { formatPhone } from '@/utils/formatters';
import { Profile } from '@/types/profile';
import { contactStatusList } from '@/types/contact';
import { SimpleObject } from '@/types';

const isDataChanged = ref(false);
const isLoading = ref(true);

const profileData = reactive<Profile>({} as Profile);
const supervisorsList = ref<SimpleObject[]>([]);
const isChangePasswordPopupVisible = ref(false);

let savedData: Profile | null = null;
const basicInfoItems: SimpleObject[] = [
  { dataField: 'firstName', colSpan: 2 },
  { dataField: 'lastName', colSpan: 2 },
  {
    dataField: 'gender',
    editorType: 'dxSelectBox',
    colSpan: 2,
    editorOptions: {
      items: ['male', 'female'],
    },
  },
  {
    dataField: 'birthDate',
    colSpan: 2,
    editorType: 'dxDateBox',
  },
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
    colSpan: 2,
  },
];
const contactItems = reactive([
  {
    dataField: 'phone',
    editorOptions: {
      mask: '+1(000)000-0000',
    },
  },
  { dataField: 'email' },
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
  isDataChanged.value = JSON.stringify(value) !== JSON.stringify(savedData);
});

Promise.all([getProfile(22), getSupervisors()]).then(([profile, supervisors]) => {
  Object.assign(profileData, profile);
  supervisorsList.value = supervisors;
  savedData = { ...profile };
  isLoading.value = false;
});

function changePassword() {
  isChangePasswordPopupVisible.value = true;
}

function save() {
  notify('Data saved', 'success');
  isDataChanged.value = false;
  savedData = { ...profileData };
}

function copyToClipboard(text: string) {
  window.navigator.clipboard?.writeText(text);
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

$gap-padding: 24px;

.view-wrapper-scroll {
  height: 100%;
}

.view-wrapper {
  padding: $content-padding calc($content-padding * 2);

  .dx-button[text="Cancel"] {
    margin-right: 5px;
  }

  .cards-container {
    display: flex;
    flex-wrap: wrap;
    margin-top: $content-padding;
    gap: 24px;
  }

  .profile-card {
    .image-wrapper {
      flex: 0 0 44px;
      height: 44px;
      border-radius: 50%;
      margin-right: $gap-padding;

      img {
        height: 20px;
        width: 20px;
        margin: auto;
      }
    }

    .with-clipboard-copy {
      display: flex;

      .dx-button {
        max-width: 18px;
        min-width: 18px;
        height: 18px;
        margin-left: 8px;

        :deep(.dx-icon:active) {
          color: $accent-color;
        }
      }
    }

    :deep(.copy-clipboard-button) {
      .dx-icon {
        color: $subtitle-text-color;
      }
    }
  }

  .contacts-card .image-wrapper {
    background-color: #ffebee;
  }

  .address-card .image-wrapper {
    background-color: #e1f5fe;
  }

  .basic-info-top-item,
  .address-top-item,
  .contacts-top-item, {
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
        margin-right: $content-padding;

        :deep(.photo) {
          border-radius: 50%;
        }
      }

      .change-password-button {
        margin-top: calc($content-padding / 2);
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
