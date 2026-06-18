import React from 'react';

import { StatusIndicator } from '../components';

export const editBeforeRender = (data?: string) => data
  ? <StatusIndicator text={data} />
  : null;

export const priorityItemRender = (data: string) => (
  <StatusIndicator text={`| ${data}`} />
);
export const statusItemRender = (data: string) => (
  <StatusIndicator text={data} />
);

export const priorityBeforeRender = (data?: string) => data
  ? <StatusIndicator text={`| ${data}`} />
  : null;
