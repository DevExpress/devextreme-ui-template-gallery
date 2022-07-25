import React, { useState, useEffect } from 'react';
import ScrollView from 'devextreme-react/scroll-view';
import Sortable from 'devextreme-react/sortable';
import LoadPanel from 'devextreme-react/load-panel';
import List from './list/List';
import './PlanningKanban.scss';

const initialStatuses = ['Open', 'In Progress', 'Deferred', 'Completed'];

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
    const onListReorder = (e) => {
        setLists(reorder(lists, lists[e.fromIndex], e.fromIndex, e.toIndex));
        setStatuses(reorder(statuses, statuses[e.fromIndex], e.fromIndex, e.toIndex));
    }

    const onTaskDragStart = (e) => {
        e.itemData = lists[e.fromData][e.fromIndex];
    }

    const onTaskDrop = (e) => {
        updateTask(e.fromData, e.itemData, e.fromIndex, -1);
        updateTask(e.toData, e.itemData, -1, e.toIndex);
    }

    const reorder = (items, item, fromIndex, toIndex) => {
        let result = items;
        if (fromIndex >= 0) {
            result = [...items.slice(0, fromIndex), ...items.slice(fromIndex + 1)];
        }

        if (toIndex >= 0) {
            result = [...items.slice(0, toIndex), item, ...items.slice(toIndex)];
        }

        return result;
    }

    const updateTask = (listIndex, itemData, fromIndex, toIndex) => {
        const updatedLists = lists.slice();

        updatedLists[listIndex] = reorder(updatedLists[listIndex], itemData, fromIndex, toIndex);

        setLists(updatedLists);
    }

    return (
        loading ? <LoadPanel visible /> :
        <div id="kanban">
        <ScrollView
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