import React, { useState, useEffect } from 'react';
import LoadPanel from 'devextreme-react/load-panel';
import List from 'devextreme-react/list';
import Button from 'devextreme-react/button';
import formatDate from '../../utils/format-date';
import classNames from 'classnames';
import { Activities, Activity } from '../../shared/types/activities';
import './CardActivities.scss';

const ListTemplate = (item: Activity) => {
    return (
        <div className="activity">
            <div className="name">{item.name}</div>
                <div className="date">
                    <span>{formatDate(item.date)}</span>
                    <span>by</span>
                    <span>{item.manager}</span>
                </div>
            <Button icon="overflow"></Button>
        </div>
    )
}

const CardActivities = ({ activities }: { activities: Activities | undefined }) => {
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        activities && setLoading(false);
    }, [activities]);
    return (
        <div className={classNames({'card-activities': true, 'load': loading})}>
            {loading ? 
                <LoadPanel container=".card-activities" visible position={{ of: '.card-activities' }} /> :
                <List
                    className="activities-list"
                    dataSource={activities}
                    scrollingEnabled={false}
                    itemRender={ListTemplate}
                />
            }
        </div>
    );
}

export default CardActivities;