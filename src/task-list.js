import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Box, Flex, Form, Formbot, Input, Button, Text } from 'molekule';

import { TaskStatuses } from './constants';
import TaskBadge from './task-badge';
import TaskDetailsModal from './task-details';

import alert from './lib/alert';
import * as http from './lib/http';

const ListCell = ({ children, ...props }) => (
  <Flex alignItems="center" m={2} {...props}>
    {children}
  </Flex>
);
ListCell.propTypes = {
  children: PropTypes.element.isRequired,
};

export default class TaskList extends Component {
  state = {
    tasks: [],
    loading: true,
    showDetailsModal: false,
    selectedTask: null,
  };

  componentDidMount() {
    this.loadTasks();
  }

  createTask = ({ isValid, values }) => {
    if (!isValid) {
      return;
    }

    http.post('/tasks', values).then((response) => {
      alert({ type: 'success', message: `Task #${response.data.id} Created` });
      this.loadTasks();
    });
  };

  runTask = (id) => {
    http.patch(`/tasks/${id}`, { status: 'success' }).then(() => {
      alert({ type: 'success', message: `Task #${id} Complete` });
      this.loadTasks();
    });
  };

  toggleTaskDetailsModal = (id) => {
    this.setState((prevState) => ({
      showDetailsModal: !prevState.showDetailsModal,
      ...(id && {
        selectedTask: prevState.tasks.find((task) => task.id === id),
      }),
    }));
  };

  loadTasks(status) {
    this.setState({
      loading: true,
      ...(status && { status }),
    });

    http.get('/tasks', {}).then((response) => {
      this.setState({
        tasks: response.data,
        loading: false,
      });
    });
  }

  render() {
    const { loading, tasks, showDetailsModal, selectedTask } = this.state;

    return (
      <div>
        <Box m={2}>
          <h3>Add a new task</h3>
          <Formbot
            onSubmit={this.createTask}
            validations={{
              name: (val) => {
                if (!val) {
                  throw new Error('Name is required');
                }
              },
            }}
          >
            <Form>
              <Input name="name" label="Task Name" type="text" />
              <Button mt={2} type="submit">
                Create Task
              </Button>
            </Form>
          </Formbot>
        </Box>
        <Box m={2}>
          <hr />
          {loading ? (
            <p>Loading...</p>
          ) : !tasks || tasks.length === 0 ? (
            <p>No Tasks</p>
          ) : (
            tasks.map((task) => (
              <Flex key={task.id} m={3}>
                <ListCell>
                  <strong>{`#${task.id}`}</strong>
                </ListCell>
                <ListCell
                  flex={4}
                  style={{ overflow: 'hidden', textOverflow: 'ellipsis' }}
                >
                  {task.name}
                </ListCell>
                <ListCell flex={2}>
                  <Text fontSize={12}>
                    {new Date(task.createdAt).toLocaleString()}
                  </Text>
                </ListCell>
                <ListCell flex={1}>
                  <TaskBadge status={task.status} />
                </ListCell>
                <ListCell flex={1}>
                  {task.status === TaskStatuses.PENDING ? (
                    <Button onClick={() => this.runTask(task.id)}>Run</Button>
                  ) : (
                    <Button
                      variant="secondary"
                      onClick={() => this.toggleTaskDetailsModal(task.id)}
                    >
                      Details
                    </Button>
                  )}
                </ListCell>
              </Flex>
            ))
          )}
        </Box>
        {selectedTask ? (
          <TaskDetailsModal
            open={showDetailsModal}
            task={selectedTask}
            onClose={this.toggleTaskDetailsModal}
          />
        ) : (
          undefined
        )}
      </div>
    );
  }
}
