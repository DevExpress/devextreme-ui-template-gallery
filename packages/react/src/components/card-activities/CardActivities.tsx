import React, { useState, useEffect } from 'react';
import LoadPanel from 'devextreme-react/load-panel';
import List from 'devextreme-react/list';
import Button from 'devextreme-react/button';
import './CardActivities.scss';

const ListTemplate = (item) => {
    const date = new Date(item.date);
    const day = date.getDate();
    const month = date.getMonth();
    const year = date.getFullYear();
    return (
        <div className="activity">
            <div className="name">{item.name}</div>
                <div className="date">
                    <span>{month + 1}/{day}/{year}</span>
                    <span>by</span>
                    <span>{item.manager}</span>
                </div>
            <Button icon="overflow"></Button>
        </div>
    )
}

const CardActivities = ({ activities }) => {
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        activities && setLoading(false);
    }, [activities]);
    return (
        loading ? <LoadPanel container=".card-activities" visible position={{ of: '.card-activities' }} /> :
        <div className='card-activities'>
            <List
                className="activities-list"
                dataSource={activities}
                scrollingEnabled={false}
                itemRender={ListTemplate}
            />
        </div>
    );
}

export default CardActivities;