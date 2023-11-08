<template>
  <div
    v-if="selectedAppointmentData"
    class="appointment-tooltip"
  >
    <div class="title">
      {{ selectedAppointmentData.text }}
    </div>
    <div class="content">
      <div class="date">
        <dx-button
          icon="clock"
          styling-mode="text"
          :focus-state-enabled="false"
          :active-state-enabled="false"
          :hover-state-enabled="false"
        />
        {{ timeString }}
      </div>
      <div
        v-if="selectedAppointmentData.description"
        class="description"
      >
        <dx-button
          icon="textdocument"
          styling-mode="text"
          :focus-state-enabled="false"
          :active-state-enabled="false"
          :hover-state-enabled="false"
        />
        {{ selectedAppointmentData.description }}
      </div>
    </div>
    <div class="buttons">
      <dx-button
        class="button-danger"
        text="Delete"
        type="danger"
        styling-mode="text"
        @click="() => emit('clickDeleteAppointment', selectedAppointmentData)"
      />
      <dx-button
        class="button-success"
        text="Edit"
        type="success"
        styling-mode="text"
        @click="() => emit('clickEditAppointment')"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { DxButton } from 'devextreme-vue';

const props = withDefaults(defineProps<{
  selectedAppointmentData: {startDate?: Date},
}>(), {
  selectedAppointmentData: () => ({}),
});

const timeString = computed(() => {
  const timeOptions = {
    hour: 'numeric',
    minute: 'numeric',
    hour12: false,
  };

  const dateOptions = {
    ...timeOptions,
    weekday: 'short',
    day: 'numeric',
    month: 'numeric',
    year: 'numeric',
  };

  return `${props.selectedAppointmentData?.startDate?.toLocaleString(undefined, dateOptions)} - ${props.selectedAppointmentData?.endDate?.toLocaleTimeString(undefined, timeOptions)}`;
});

const emit = defineEmits(['clickEditAppointment', 'clickDeleteAppointment']);
</script>

<style lang="scss">
@use "@/variables.scss" as *;

.dx-tooltip-wrapper > .dx-popup-normal {
  background-color: var(--base-bg) !important;
  color: var(--base-text-color) !important;
  border-radius: 8px !important;
  max-width: 360px;
  filter: drop-shadow(0 4px 24px rgba(0, 0, 0, 0.24));
}

.appointment-tooltip {
  white-space: normal;
  width: 100%;
  text-align: left;

  .title {
    padding: 8px 8px 8px 16px;

    @include h1-header-text();
  }

  .content {
    padding: 0 10px;
  }

  .date {
    width: 100%;
    height: 50px;
    padding: 8px 0;
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 16px;

    @include description-text(0.7);
  }

  .description {
    padding: 8px 0;
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    gap: 16px;

    @include description-text(0.7);
  }

  .buttons {
    display: flex;
    width: 100%;
    gap: 16px;
    padding: var(--theme-padding);

    .dx-button {
      width: calc((100% - var(--theme-padding)) / 2);
      border-radius: 4px;
    }

    .button-danger {
      background-color: var(--tooltip-danger-button-color);
    }

    .button-success {
      background-color: var(--tooltip-success-button-color);
    }
  }
}
</style>
