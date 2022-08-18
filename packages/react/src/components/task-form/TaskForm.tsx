import React, { useCallback, useEffect, useState } from 'react';
import './TaskForm.scss';
import Toolbar, { Item } from 'devextreme-react/toolbar';
import Button from 'devextreme-react/button';
import LoadPanel from 'devextreme-react/load-panel';
import PriorityTask from '../priority-task/PriorityTask';
import StatusTask from '../status-task/StatusTask';
import Form, { SimpleItem, GroupItem, Label } from 'devextreme-react/form';
import { DropDownButton, Calendar } from 'devextreme-react';

const editorOptions = { stylingMode: 'underlined' };
const onStartDateChanged = () => {

};
const onDueDateChanged = () => {

};

const CompanyField = (data) => (
    <FormContext.Consumer>
        {value => 
            <div className="info">
                <label className="dx-texteditor-label">{data.editorOptions.label}</label>
                <span className="default-label dx-theme-accent-as-text-color">{value.company}</span>
            </div>
        }
    </FormContext.Consumer>
);

const OwnerField = (data) => (
    <FormContext.Consumer>
        {value => 
            <div className="info">
                <label className="dx-texteditor-label">{data.editorOptions.label}</label>
                <span className="default-label dx-theme-accent-as-text-color">{value.owner}</span>
            </div>
        }
    </FormContext.Consumer>
);

const DropDownContentTemplate = () => {
    return <Calendar />
}

const DueDateTemplate = (data) => {
    return <DropDownButton
        icon="event"
        stylingMode="outlined"
        text={data.editorOptions.label}
        dropDownOptions={{ width: 'auto' }}
        dropDownContentRender={DropDownContentTemplate}
        showArrowIcon={false}
    ></DropDownButton>
};

const PriorityField = (data) => (
    <FormContext.Consumer>
        {value =>
            <div className="info">
                <label className="dx-texteditor-label">{data.editorOptions.label}</label>
                <PriorityTask text={value.priority}></PriorityTask>
            </div>
        }
    </FormContext.Consumer>
);

const PriorityEditing = (data) => {
    return <></>
};

const StatusEditing = () => {
    return <></>
};

const StatusField = (data) => (
    <FormContext.Consumer>
        {value =>
            <div className="info">
                <label className="dx-texteditor-label">{data.editorOptions.label}</label>
                <StatusTask text={value.status}></StatusTask>
            </div>
        }
    </FormContext.Consumer>
);

const FormContext = React.createContext({ priority: undefined, status: undefined, company: undefined, owner: undefined });

const TaskForm = ({ task }) => {
    const [loading, setLoading] = useState(true);
    const [editing, setEditing ] = useState(false);
    useEffect(() => {
        task && setLoading(false);
    }, [task]);
    const toggleEditing = useCallback(() => {
        setEditing(!editing);
    }, [editing]);
    return (
    <div className='task-form'>
        <Toolbar>
            <Item location="before" text='Details' cssClass='toolbar-details-title'></Item>
            <Item location="after" locateInMenu="after" visible={!editing}>
                <Button
                    text="Edit"
                    icon="edit"
                    stylingMode="outlined"
                    type="default"
                    onClick={toggleEditing}
                ></Button>
            </Item>
            <Item location="after" locateInMenu="after" visible={editing}>
                <Button
                    text="Save"
                    stylingMode="outlined"
                    type="default"
                    onClick={toggleEditing}
                ></Button>
            </Item>
            <Item location="after" locateInMenu="after" visible={editing}>
                <Button
                    text="Cancel"
                    stylingMode="text"
                    onClick={toggleEditing}
                ></Button>
            </Item>
        </Toolbar>
        { loading ? <LoadPanel container=".task-form" visible position={{ of: '.task-form' }} /> :
        <FormContext.Provider value={task}>
            <Form formData={task} labelMode="floating" readOnly={!editing}>
                <SimpleItem dataField="text" visible={editing}></SimpleItem>
                <GroupItem colCount={2}>
                    <SimpleItem dataField="company" render={editing ? undefined : CompanyField} editorOptions={editorOptions}></SimpleItem>
                    <SimpleItem dataField="owner" render={editing ? undefined : OwnerField} editorOptions={editorOptions}>
                        <Label text="Assigned to"></Label>
                    </SimpleItem>
                    <SimpleItem dataField="priority" render={editing ? PriorityEditing : PriorityField}></SimpleItem>
                    <SimpleItem dataField="status" render={editing ? StatusEditing : StatusField} editorOptions={editorOptions}></SimpleItem>
                    <SimpleItem
                        dataField="startDate"
                        editorType="dxDateBox"
                        editorOptions={{
                            name: 'Start Date',
                            placeholder: 'MM/dd/y',
                            displayFormat: 'MM/dd/y',
                            ...editorOptions
                        }}
                    ></SimpleItem>
                    <SimpleItem
                        dataField="dueDate"
                        editorType="dxDateBox"
                        render={DueDateTemplate}
                        editorOptions={{
                            name: 'Due Date',
                            placeholder: 'MM/dd/y',
                            displayFormat: 'MM/dd/y',
                            ...editorOptions
                        }}
                    ></SimpleItem>
                </GroupItem>

                <SimpleItem colSpan={2} dataField="description" editorType="dxTextArea" editorOptions={editorOptions}>
                    <Label text="Details"></Label>
                </SimpleItem>
            </Form>
        </FormContext.Provider>
        }
    </div>
    );
}

export default TaskForm;