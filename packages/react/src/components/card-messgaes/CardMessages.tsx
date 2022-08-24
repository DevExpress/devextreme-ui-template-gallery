import React, { useState, useCallback, useEffect } from 'react';
import TextBox from 'devextreme-react/text-box';
import TextArea from 'devextreme-react/text-area';
import Toolbar, { Item } from 'devextreme-react/toolbar';
import Button from 'devextreme-react/button';
import Avatar from '../avatar/Avatar';
import { formatDate } from '../../shared/utils';
import { Message, Messages } from '../../shared/types/messages';
import './CardMessages.scss';

const getText = (text: string, user: string) => {
    return text.replace('{username}', user);
}

const Card = ({ data, user }: { data: Message, user: string }) => (
    <div className="message-container">
        <Avatar owner={data.manager}></Avatar>
        <div className="message dx-card">
            <div className="message-title">
                <div className="left-title">
                    <div className="subject">{data.subject}</div>
                    <div>{formatDate(data.date)} - {data.manager}</div>
                </div>
                <div>
                    <Button icon="overflow"></Button>
                </div>
            </div>
            <div className="message-text">{getText(data.text, user)}</div>
        </div>
    </div>
)

const CardMessages = ({ items, user, updateCountMessages }: 
    { items: Messages | undefined, user: string | undefined, updateCountMessages: any }) => {
    const [messages, setMessages] = useState(items);
    const [title, setTitle] = useState('');
    const [message, setMessage] = useState('');
    useEffect(() => {
        setMessages(items);
    }, [items]);
    const send = () => {
        if((message === '' && title === '') || !messages || !user) {
            return;
        }
        setMessages(messages.concat([{ manager: user, date: new Date(), text: message, subject: title }]));
        setTitle('');
        setMessage('');
        updateCountMessages(messages.length + 1);
    };
    const cancel = useCallback(() => {
        setTitle('');
        setMessage('');
    }, []);
    const onTitleChanged = useCallback((e) => {
        setTitle(e.value);
    }, []);
    const onMessageChanged = useCallback((e) => {
        setMessage(e.value);
    }, []);
    return (
    <div className="messages">
        <div className="input-content">
            <TextBox
                label="Title"
                stylingMode="outlined"
                value={title}
                valueChangeEvent='keyup'
                onValueChanged={onTitleChanged}
            ></TextBox>
            <TextArea
                label="New Message"
                stylingMode="outlined"
                value={message}
                valueChangeEvent='keyup'
                onValueChanged={onMessageChanged}
            ></TextArea>
            <Toolbar>
            <Item
                location="before"
                widget="dxButton"
                options={{
                    text: 'Attach File',
                    stylingMode: 'contained',
                    type: 'default',
                    icon: 'attach'
                }}
            >
            </Item>
            <Item
                location="after"
                widget="dxButton"
                options={{
                    text: 'Send',
                    stylingMode: 'outlined',
                    type: 'default',
                    onClick: send
                }}
            >
            </Item>
            <Item
                location="after"
                widget="dxButton"
                options={{ text: 'Cancel', onClick: cancel }}
            >
            </Item>
            </Toolbar>
        </div>
        <div className="messages-content">
            {messages?.map((message, index) => <Card key={index} data={message} user={user!}></Card>)}
        </div>
    </div>
)};

export default CardMessages;