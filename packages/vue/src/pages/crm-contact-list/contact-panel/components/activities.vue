<template>
  <div id="activities-list">
    <dx-list
        class="activities-list"
        :items="props.items"
        :scrollingEnabled="false"
    >
      <template #item="{ data: item }">
        <div >
          <div class="activity">
            <div class="name">{{ item.name }}</div>
            <div class="date" :class="{ by: props.showBy }">
            <span>{{
                formatDate(new Date(item.date))
              }}</span>
              <span v-if="props.showBy">by</span>
              <span>{{ item.manager }}</span>
            </div>
            <dx-button icon="overflow"></dx-button>
          </div>

        </div>
      </template>
    </dx-list>
  </div>

</template>

<script setup lang="ts">
import DxList from 'devextreme-vue/list';
import DxButton from 'devextreme-vue/button';
import { formatDate } from '@/utils/formatters';


const props = withDefaults(defineProps<{
  showBy?: boolean,
  items: Array<any>
}>(), {
  showBy: false,
  items: []
})
</script>

<style lang="scss">
@use '@/variables' as *;

#activities-list {
  padding: 10px;
  min-height: 300px;
  position: relative;
  display: block;

  .dx-list-item {
    margin: 10px 0;
    overflow: visible;
    background: transparent;
  }
}

.activities-list {
  &.load {
    min-height: auto;
  }



  .dx-list-item-content {
    padding: 0;
    overflow: visible;
  }

  .activity {
    box-shadow: 0 1px 4px 0 #00000026;
    border-left: 2px solid $base-accent;
    margin-right: 4px;
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
      color: #757575de;
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

      .dx-button {
        position: absolute;
        right: 15px;
      }
    }
  }
}

</style>
