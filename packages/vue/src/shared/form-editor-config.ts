export const formEditorProps = {
  'element-attr': { class: 'form-editor' },
  'input-attr': { class: 'form-editor-input' },
  'styling-mode': 'filled',
  'value-change-event': 'keyup input change',
};

export const { 'value-change-event': _, ...formSelectBoxProps } = formEditorProps;
