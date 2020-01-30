import React from 'react';
import { Badge } from 'molekule';

import { taskStatusToBadgeStatus } from './lib/utils';

const TaskBadge = ({ status }) => (
  <Badge variant={taskStatusToBadgeStatus(status)}>
    {status.toUpperCase()}
  </Badge>
);

export default TaskBadge;
