import { taskStatusToBadgeStatus } from './utils';
import { TaskStatuses } from '../constants';

describe('taskStatusToBadgeStatus', () => {
  test('pending -> info', () => {
    expect(taskStatusToBadgeStatus(TaskStatuses.PENDING)).toEqual('info');
  });

  test('* -> *', () => {
    Object.values(TaskStatuses)
      .filter((status) => status != TaskStatuses.PENDING)
      .forEach((status) =>
        expect(taskStatusToBadgeStatus(status)).toEqual(status),
      );
  });
});
