export type TaskPanelItemsIds = 'grid' | 'kanban' | 'gantt';
export const taskPanelItems: Array<{id: TaskPanelItemsIds, text: string }> = [
  { id: 'grid', text: 'List' },
  { id: 'kanban', text: 'Kanban Board' },
  { id: 'gantt', text: 'Gantt' },
];

export const analyticsPanelItems: Array<{ text: string, value: string, key: number }> = [
  {
    text: 'Week',
    value: '2020-01-24/2020-01-31',
    key: 1,
  }, {
    text: '2 Weeks',
    value: '2020-01-14/2020-01-31',
    key: 2,
  }, {
    text: 'Month',
    value: '2020-01-01/2020-02-01',
    key: 3,
  }, {
    text: 'Year',
    value: '2020-01-01/2021-01-01',
    key: 4,
  }, {
    text: 'All',
    value: '2018-01-01/2022-01-01',
    key: 5,
  }];
