import React, { Component } from 'react';
import axios from 'axios';
import { Box, Flex, Form, Formbot, Input, Button, Text } from 'molekule';

import TaskBadge from './task-badge';
import TaskDetailsModal from './task-details';

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

    axios
      .post('http://localhost:5000/api/tasks', values)
      .then((response) => {
        alert(`Task #${response.data.id} Created`);
        this.loadTasks();
      })
      .catch((err) => console.error(err));
  };

  runTask = (id) => {
    axios
      .patch(`http://localhost:5000/api/tasks/${id}`, { status: 'success' })
      .then(() => {
        alert(`Task #${id} Complete`);
        this.loadTasks();
      })
      .catch((err) => console.error(err));
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

    axios
      .get('http://localhost:5000/api/tasks', {})
      .then((response) => {
        this.setState({
          tasks: response.data,
          loading: false,
        });
      })
      .catch((err) => console.error(err));
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
                <Box flex={1}>
                  <strong>{`#${task.id}`}</strong>
                </Box>
                <Box
                  flex={4}
                  style={{ overflow: 'hidden', textOverflow: 'ellipsis' }}
                >
                  {task.name}
                </Box>
                <Box flex={2}>
                  <Text fontSize={12}>
                    {new Date(task.createdAt).toLocaleString()}
                  </Text>
                </Box>
                <Box flex={1}>
                  <TaskBadge status={task.status} />
                </Box>
                <Box flex={1}>
                  {task.status === 'pending' ? (
                    <Button onClick={() => this.runTask(task.id)}>Run</Button>
                  ) : (
                    <Button
                      variant="secondary"
                      onClick={() => this.toggleTaskDetailsModal(task.id)}
                    >
                      Details
                    </Button>
                  )}
                </Box>
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
