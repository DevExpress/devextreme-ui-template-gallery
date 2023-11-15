<template>
  <div
    class="card dx-theme-text-color dx-theme-background-color"
    @click="navigateToDetails()"
  >
    <div
      class="card-wrapper"
      :class="`priority-${ task.priority.toLowerCase() }`"
    >
      <div class="card-priority" />
      <dx-button
        icon="edit"
        styling-mode="text"
        @click="notifyByCard"
      />
      <div class="card-content">
        <div class="card-subject dx-theme-text-color">
          {{ task.text }}
        </div>
        <div class="card-data">
          <span class="priority">{{ task.priority }}</span>
          <span class="date dx-theme-text-color">{{
            formatDate(task.dueDate)
          }}</span>
        </div>
        <div class="card-assignee">
          <span class="company dx-theme-text-color">{{ task.company }}</span>
          <avatar :data-letters="getAvatarText(task.owner)" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Task } from '@/types/task';
import notify from 'devextreme/ui/notify';
import { DxButton } from 'devextreme-vue/button';
import { formatDate } from '@/utils/formatters';
import { router } from '@/router';
import Avatar from '@/components/library/user-avatar.vue';

const props = withDefaults(defineProps<{
  task: Task | null
}>(), {
  task: () => null,
});

const getAvatarText = (name: string) => name.split(' ').map((namePart) => namePart[0]).join('');

const notifyByCard = (event: {event: Event}) => {
  event.event.stopPropagation();
  notify(`Edit '${props.task?.text}' card event`);
};

const navigateToDetails = () => {
  router.push('/planning-task-details');
};
</script>

<style scoped lang="scss">
@use "@/variables.scss" as *;

@mixin priority($priorety-color) {
  .card-priority {
    background: $priorety-color;
  }

  span.priority {
    color: $priorety-color;
  }
}

.card {
  --low-priorety-color: #dfb32f;
  --normal-priorety-color: #6fbaca;
  --high-priorety-color: #d9534f;

  position: relative;
  box-sizing: border-box;
  cursor: pointer;
  display: block;
}

:deep(.card-wrapper) {
  padding: 10px;

  .dx-button {
    position: absolute;
    right: 10px;
    font-size: 18px;
    opacity: 0.87;
  }

  &.priority-low {
    @include priority(var(--low-priorety-color));
  }

  &.priority-normal {
    @include priority(var(--normal-priorety-color));
  }

  &.priority-high {
    @include priority(var(--high-priorety-color));
  }

  .card-content {
    padding-left: 14px;

    span.priority {
      font-weight: 500;
      font-size: 12px;
      line-height: 14px;
    }

    span.date {
      padding-left: 8px;
      font-size: 12px;
      line-height: 14px;
      opacity: 0.87;
    }
  }

  .card-subject {
    font-weight: 500;
    font-size: 14px;
    line-height: 16px;
    padding-right: 40px;
  }

  .card-assignee {
    padding-top: 14px;
    font-size: 12px;
    line-height: 14px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .card-priority {
    position: absolute;
    top: 10px;
    bottom: 10px;
    left: 10px;
    width: 4px;
  }
}
</style>
