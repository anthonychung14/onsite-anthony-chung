const Sequelize = require('sequelize');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: 'db.sqlite',
});

const TaskStatus = {
  PENDING: 'pending',
  SUCCESS: 'success',
};

const Task = sequelize.define(
  'task',
  {
    name: Sequelize.STRING,
    status: { type: Sequelize.STRING, defaultValue: TaskStatus.PENDING },
  },
  {
    timestamps: true,
  },
);

Task.Status = TaskStatus;

module.exports = {
  sequelize,
  Task,
};
