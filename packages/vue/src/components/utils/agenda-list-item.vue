<template>
  <div class="agenda-list-item">
    <div class="time">
      <div class="start">
        {{ startTime }}
      </div>
      <div class="duration">
        {{ duration }}
      </div>
    </div>
    <div class="description">
      <div class="description-title">
        {{ appointment.text }}
      </div>
      <div class="description-resource">
        {{ resources[appointment.calendarId]?.text }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { Duration } from 'luxon';

const props = withDefaults(defineProps<{
  appointment: {startDate: Date},
  resources: Record<string, unknown>[],
}>(), {
  items: () => ({}),
  resources: () => [],
});

const startTime = computed(() => props.appointment.startDate.toLocaleTimeString(undefined, {
  hour: 'numeric',
  minute: 'numeric',
  hour12: false,
}));

const duration = computed(() => {
  const { startDate, endDate } = props.appointment;
  return Duration.fromMillis(endDate - startDate)
    .rescale()
    .toFormat("h'h' m'm'");
});

</script>

<style scoped lang="scss">
@use "@/variables.scss" as *;

.agenda-list-item {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  gap: 32px;

  .time {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: 36px;

    @include subtext();

    .duration {
      @include subtext(0.7);
    }
  }

  .description {
    overflow: hidden;

    .description-title {
      @include h2-header-text();

      overflow: hidden;
      text-overflow: ellipsis;
    }

    .description-resource {
      @include description-text(0.7);
    }
  }
}
</style>
