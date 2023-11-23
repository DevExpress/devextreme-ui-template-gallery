import React, { useState, useCallback, useEffect } from 'react';

import TextArea from 'devextreme-react/text-area';
import Toolbar, { Item } from 'devextreme-react/toolbar';
import Button from 'devextreme-react/button';
import { formatDate } from 'devextreme/localization';
import Validator, { RequiredRule } from 'devextreme-react/validator';
import ValidationGroup from 'devextreme-react/validation-group';
import ScrollView from 'devextreme-react/scroll-view';

import { Notes, Note } from '../../../types/card-notes';

import './CardNotes.scss';

const Card = ({ note }: { note: Note }) => {
  return (
    <div className='note dx-card'>
      <div className='note-title'>
        <div>
          {formatDate(new Date(note.date), 'MM/dd/yyyy')} - {note.manager}
        </div>
        <div>
          <Button icon='overflow' stylingMode='text' />
        </div>
      </div>
      <div className='note-text'>{note.text}</div>
    </div>
  );
};

export const CardNotes = ({ items, user }: { items?: Notes; user?: string }) => {
  const [noteText, setNoteText] = useState('');
  const [data, setData] = useState(items);

  useEffect(() => {
    setData(items);
  }, [items]);

  const add = useCallback((e) => {
    if (!e.validationGroup.validate().isValid || !data || !user) {
      return;
    }
    setData([...data, { manager: user, date: new Date(), text: noteText }]);
    e.validationGroup.reset();
  }, [noteText, data, user]);

  const onNoteTextChanged = useCallback((value) => {
    setNoteText(value);
  }, []);

  return (
    <ValidationGroup>
      <div className='notes'>
        <div className='input-notes'>
          <TextArea label='New Note' stylingMode='filled' value={noteText} valueChangeEvent='keyup' onValueChange={onNoteTextChanged}>
            <Validator>
              <RequiredRule />
            </Validator>
          </TextArea>
          <Toolbar>
            <Item
              location='after'
              widget='dxButton'
              options={{
                text: 'Add',
                stylingMode: 'contained',
                type: 'default',
                onClick: add,
              }}
            />
          </Toolbar>
        </div>

        <div className='messages-content'>
          <ScrollView>
            <div className='message-list'>
              {data?.map((note, index) => (
                <Card key={index} note={note} />
              ))}
            </div>
          </ScrollView>
        </div>
      </div>
    </ValidationGroup>
  );
};
