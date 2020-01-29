import React from 'react';
import { Badge } from 'molekule';

const getBadgeStatus = (status) => {
  if (status === 'pending') {
    return 'info';
  }

  return status;
};

const TaskBadge = ({ status }) => (
  <Badge variant={getBadgeStatus(status)}>{status.toUpperCase()}</Badge>
);

export default TaskBadge;
