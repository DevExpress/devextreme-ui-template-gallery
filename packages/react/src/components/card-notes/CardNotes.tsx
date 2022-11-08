import React, { useState, useCallback, useEffect } from 'react';

import TextArea from 'devextreme-react/text-area';
import Toolbar, { Item } from 'devextreme-react/toolbar';
import Button from 'devextreme-react/button';
import { formatDate } from 'devextreme/localization';

import { Notes, Note } from '../../shared/types/card-notes';

import './CardNotes.scss';

const Card = ({ note }: { note: Note }) => {
  return (
    <div className='note dx-card'>
      <div className='note-title'>
        <div>
          {formatDate(new Date(note.date), 'MM/dd/yyyy')} - {note.manager}
        </div>
        <div>
          <Button icon='overflow'></Button>
        </div>
      </div>
      <div className='note-text'>{note.text}</div>
    </div>
  );
};

export const CardNotes = ({ items, user }: { items: Notes | undefined; user: string | undefined }) => {
  const [noteText, setNoteText] = useState('');
  const [data, setData] = useState(items);

  useEffect(() => {
    setData(items);
  }, [items]);

  const add = useCallback(() => {
    if (noteText === '' || !data || !user) {
      return;
    }
    setData([...data, { manager: user, date: new Date(), text: noteText }]);
    setNoteText('');
  }, [noteText, data, user]);

  const onNoteTextChanged = useCallback((value) => {
    setNoteText(value);
  }, []);

  return (
    <div className='notes'>
      <div className='input-notes'>
        <TextArea label='New Note' stylingMode='outlined' value={noteText} valueChangeEvent='keyup' onValueChange={onNoteTextChanged}></TextArea>
        <Toolbar>
          <Item
            location='after'
            widget='dxButton'
            options={{
              text: 'Add',
              stylingMode: 'outlined',
              type: 'default',
              onClick: add,
            }}
          />
        </Toolbar>
      </div>

      <div className='notes-content'>
        {data?.map((note, index) => (
          <Card key={index} note={note} />
        ))}
      </div>
    </div>
  );
};
