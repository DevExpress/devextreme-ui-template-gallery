import React, { useState, useEffect, useCallback } from 'react';
import ScrollView from 'devextreme-react/scroll-view';
import Sortable from 'devextreme-react/sortable';
import LoadPanel from 'devextreme-react/load-panel';
import List from './list/List';
import './PlanningKanban.scss';

const initialStatuses = ['Open', 'In Progress', 'Deferred', 'Completed'];
const reorder = (items, item, fromIndex, toIndex) => {
  let result = items;
  if (fromIndex >= 0) {
      result = [...items.slice(0, fromIndex), ...items.slice(fromIndex + 1)];
  }

  if (toIndex >= 0) {
      result = [...items.slice(0, toIndex), item, ...items.slice(toIndex)];
  }

  return result;
};

const PlanningKanban = ({ dataSource }) => {
    const initialLists = [] as any;

    useEffect(() => {
        if(dataSource.length !== 0) {
          setLoading(false);
        }
      }, [dataSource]);  

    const [loading, setLoading] = useState(true);
    const [data, setData] = useState(dataSource);
    initialStatuses.forEach((status) => {
        initialLists.push(data.filter((task) => task.status === status));
    });
    const [lists, setLists] = useState(initialLists);
    const [statuses, setStatuses] = useState(initialStatuses);
    const onListReorder = useCallback((e) => {
        setLists(reorder(lists, lists[e.fromIndex], e.fromIndex, e.toIndex));
        setStatuses(reorder(statuses, statuses[e.fromIndex], e.fromIndex, e.toIndex));
    }, [lists, statuses]);

    const onTaskDragStart = useCallback((e) => {
        e.itemData = lists[e.fromData][e.fromIndex];
    }, [lists]);

    const updateTask = useCallback((listIndex, itemData, fromIndex, toIndex) => {
      const updatedLists = lists.slice();

      updatedLists[listIndex] = reorder(updatedLists[listIndex], itemData, fromIndex, toIndex);

      setLists(updatedLists);
  }, [lists]);

    const onTaskDrop = useCallback((e) => {
        updateTask(e.fromData, e.itemData, e.fromIndex, -1);
        updateTask(e.toData, e.itemData, -1, e.toIndex);
    }, [updateTask]);

    return (
      loading ? <LoadPanel container=".content" visible position={{ of: '.content' }} /> :
      <div id="kanban">
        <ScrollView
          className="scrollable-board"
          direction="horizontal"
          showScrollbar="always">
          <Sortable
            className="sortable-lists"
            itemOrientation="horizontal"
            handle=".list-title"
            onReorder={onListReorder}>
            {lists.map((tasks, listIndex) => {
              const status = statuses[listIndex];
              return <List
                key={status}
                title={status}
                index={listIndex}
                tasks={tasks}
                onTaskDragStart={onTaskDragStart}
                onTaskDrop={onTaskDrop} />
            })}
          </Sortable>
        </ScrollView>
      </div>
    );
};

export default PlanningKanban;