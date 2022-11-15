import React, { useState, useCallback, useEffect } from 'react';

import TextArea from 'devextreme-react/text-area';
import Toolbar, { Item } from 'devextreme-react/toolbar';
import Button from 'devextreme-react/button';
import { formatDate } from 'devextreme/localization';
import Validator, { RequiredRule } from 'devextreme-react/validator';
import ValidationGroup from 'devextreme-react/validation-group';

import { Notes, Note } from '../../shared/types/card-notes';

import './CardNotes.scss';

let forceValidationBypass = true;
const extendDefaultValidator = (e) => {
  const defaultAdapter = e.component.option('adapter');
  const newAdapter = {
    ...defaultAdapter,
    applyValidationResults: defaultAdapter.applyValidationResults,
    getValue: defaultAdapter.getValue,
    bypass: () => {
      return forceValidationBypass;
    }
  };

  e.component.option('adapter', newAdapter);
};

const Card = ({ note }: { note: Note }) => {
  return (
    <div className='note dx-card'>
      <div className='note-title'>
        <div>
          {formatDate(new Date(note.date), 'MM/dd/yyyy')} - {note.manager}
        </div>
        <div>
          <Button icon='overflow' />
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

  const add = useCallback((e) => {
    forceValidationBypass = false;
    if (!e.validationGroup.validate().isValid || !data || !user) {
      return;
    }
    setData([...data, { manager: user, date: new Date(), text: noteText }]);
    setNoteText('');
    forceValidationBypass = true;
  }, [noteText, data, user]);

  const onNoteTextChanged = useCallback((value) => {
    forceValidationBypass = true;
    setNoteText(value);
  }, []);

  return (
    <ValidationGroup>
      <div className='notes'>
        <div className='input-notes'>
          <TextArea label='New Note' stylingMode='outlined' value={noteText} valueChangeEvent='keyup' onValueChange={onNoteTextChanged}>
            <Validator onInitialized={extendDefaultValidator}>
              <RequiredRule />
            </Validator>
          </TextArea>
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
    </ValidationGroup>
  );
};
