<template>
  <dx-scroll-view
    class="scrollable-board"
    show-scrollbar="always"
    direction="both"
  >
    <dx-sortable
      class="sortable-lists"
      item-orientation="horizontal"
      handle=".list-title"
      @reorder="onListReorder"
    >
      <div
        class="list"
        v-for="board in kanbanDataSource"
      >
        <div class="list-title dx-theme-text-color">
          <span>{{ board.name }}</span>
          <card-menu :items="boardMenuItems" />
        </div>
        <dx-scroll-view
          class="scrollable-list"
          direction="vertical"
          show-scrollbar="always"
        >
          <dx-sortable
            class="sortable-cards"
            group="cardsGroup"
            :data="board"
            @drag-start="onTaskDragStart"
            @reorder="onTaskDrop"
            @add="onTaskDrop"
          >
            <div v-for="task in board.cards">
              <task-kanban-card
                class="dx-card"
                :task="task"
              />
            </div>
          </dx-sortable>

          <div class="add-task">
            <dx-button
              icon="plus"
              text="Add Task"
              styling-mode="text"
              width="100%"
              @click="addTask"
            />
          </div>
        </dx-scroll-view>
      </div>
    </dx-sortable>
  </dx-scroll-view>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import 'jspdf-autotable';
import { Task, TaskStatus, taskStatusList } from '@/types/task';
import { DxScrollView } from 'devextreme-vue/scroll-view';
import { DxSortable, DxSortableTypes } from 'devextreme-vue/sortable';
import { DxButton } from 'devextreme-vue/button';

import CardMenu from '@/components/library/card-menu.vue';
import TaskKanbanCard from '@/components/library/task-kanban-card.vue';

interface Board {
  name: TaskStatus
  cards: Task[]
}

const props = withDefaults(defineProps<{
  tasks: Task[]
}>(), {
  tasks: () => [],
});

const emit = defineEmits(['add-task']);

const statuses = taskStatusList;
const boardMenuItems: Array<{ text: string }> = [
  { text: 'Add card' },
  { text: 'Copy list' },
  { text: 'Move list' },
];

const fillOutBoard = (cards: Task[]): Board[] => {
  const result: Board[] = [];
  statuses.forEach((status) => {
    const value = cards.filter((item) => item.status === status);

    result.push({ name: status, cards: value });
  });

  return result;
};
const kanbanDataSource = computed(
  () => (props.tasks ? fillOutBoard(props.tasks) : []),
);

function onListReorder(e: DxSortableTypes.ReorderEvent) {
  const { fromIndex, toIndex } = e;
  const list = kanbanDataSource.value.splice(fromIndex, 1)[0];
  kanbanDataSource.value.splice(toIndex, 0, list);
}

function onTaskDragStart(e: DxSortableTypes.DragStartEvent) {
  const { fromData, fromIndex } = e;
  e.itemData = fromData.cards[fromIndex];
}

function onTaskDrop(e: DxSortableTypes.ReorderEvent | DxSortableTypes.AddEvent) {
  const {
    fromData, toData, fromIndex, toIndex, itemData,
  } = e;

  itemData.status = toData.name;

  fromData.cards.splice(fromIndex, 1);
  toData.cards.splice(toIndex, 0, itemData);
}

const addTask = () => {
  emit('add-task');
};
</script>

<style scoped lang="scss">
@use "@/variables.scss" as *;

.scrollable-board {
  white-space: nowrap;
}

.list {
  border-radius: 4px;
  margin: 10px;
  background-color: var(--background-gray-color);
  display: inline-block;
  vertical-align: top;
  white-space: normal;

  .list-title {
    font-size: 16px;
    padding: 10px;
    margin-bottom: -10px;
    font-weight: 500;
    cursor: pointer;
    display: flex;
    justify-content: space-between;

    .dx-button {
      background-color: rgba(0, 0, 0, 0);
    }
  }
}

.scrollable-list {
  width: 260px;
}

:deep(.sortable-cards) {
  padding: 10px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  min-height: 100px;

  .dx-sortable {
    display: block;
  }
}

.add-task {
  padding: 10px;
}

:deep(.add-task) {
  .dx-icon,
  .dx-button-text {
    color: var(--accent-color);
  }
}
</style>
