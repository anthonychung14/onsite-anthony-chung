import React from 'react';
import { Modal, Flex, Box } from 'molekule';

import { humanizeName } from './lib/utils';

const TASK_DISPLAY_KEYS = ['id', 'name', 'status', 'createdAt', 'updatedAt'];

const TaskKeyValue = ({ task, name }) => (
  <Flex justifyContent="space-between" style={{ width: '100%' }} m={2}>
    <Flex flex={1} justifyContent="flex-end" mr={2}>
      <strong>{humanizeName(name)}</strong>
    </Flex>
    <Flex flex={3} justifyContent="flex-start">
      {task[name] || '<empty>'}
    </Flex>
  </Flex>
);

const TaskDetailsModal = ({ open, task, onClose }) => (
  <Modal minWidth={500} title={task.name} open={open} onClose={onClose}>
    <Flex alignItems="center" flexDirection="column" m={2}>
      {TASK_DISPLAY_KEYS.map((key) => (
        <TaskKeyValue key={key} name={key} task={task} />
      ))}
    </Flex>
  </Modal>
);

export default TaskDetailsModal;
