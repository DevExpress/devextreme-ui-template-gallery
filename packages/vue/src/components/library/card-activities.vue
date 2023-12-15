<template>
  <div
    id="activities-list"
    :class="{ load: props.items }"
  >
    <dx-load-panel
      :visible="props.isLoading"
      :show-pane="false"
      width="auto"
      container="#activities-list"
      :position="{ of: '#activities-list' }"
    />
    <dx-list
      class="activities-list"
      :items="props.items"
      :scrolling-enabled="false"
      v-if="!!props.items"
    >
      <template #item="{ data: item }">
        <div>
          <div class="activity">
            <div class="name">
              {{ item.name }}
            </div>
            <div
              class="date"
              :class="{ by: props.showBy }"
            >
              <span>{{
                formatDate(new Date(item.date))
              }}</span>
              <span v-if="props.showBy">by</span>
              <span>{{ item.manager }}</span>
            </div>
            <card-menu
              class="overflow-menu"
              :items="activityMenuItems"
            />
          </div>
        </div>
      </template>
    </dx-list>
  </div>
</template>

<script setup lang="ts">
import { DxList } from 'devextreme-vue/list';
import { formatDate } from '@/utils/formatters';
import type { Activity } from '@/types/activities';
import DxLoadPanel from 'devextreme-vue/load-panel';
import CardMenu from '@/components/library/card-menu.vue';

const props = withDefaults(defineProps<{
  isLoading: boolean,
  showBy?: boolean,
  items?: Activity[]
}>(), {
  isLoading: true,
  showBy: false,
  items: undefined,
});

const activityMenuItems: Array<{ text: string }> = [
  { text: 'View details' },
  { text: 'Delete' },
];
</script>
<style scoped lang="scss">
@use '@/variables' as *;

#activities-list {
  padding: 10px;
  min-height: 300px;
  position: relative;
  display: block;

  :deep(.dx-list-item) {
    margin: 10px 0;
    overflow: visible;
    background: transparent;
  }

  &.load {
    min-height: auto;
  }
}

.activities-list {
  .dx-list-item-content {
    padding: 0;
    overflow: visible;
  }

  .activity {
    box-shadow: 0 1px 4px 0 #00000026;
    border-left: 2px solid var(--accent-color);
    margin-right: 1px;
    padding: 8px 2px 8px 16px;
    display: grid;
    grid-template-columns: 3fr 1fr 0fr;
    align-items: center;

    .name {
      text-overflow: ellipsis;
      overflow: hidden;
    }

    .date {
      padding: 0 10px;
      font-size: 12px;
      color: var(--texteditor-label-color);
      display: flex;
      justify-content: flex-start;
      flex-wrap: wrap;
      gap: 5px;

      &.by {
        width: 170px;
      }
    }
  }
}

@media only screen and (max-width: 400px) {
  .activities-list {
    .activity {
      .date {
        grid-row-start: 2;
        padding: 0;
      }

      .overflow-menu {
        position: absolute;
        right: 15px;
      }
    }
  }
}
</style>
