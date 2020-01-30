export const taskStatusToBadgeStatus = (status) => {
  if (status === 'pending') {
    return 'info';
  }

  return status;
};

export const humanizeName = (name) =>
  name
    .split(/(?=[A-Z])/)
    .map((s) => s[0].toUpperCase() + s.slice(1).toLowerCase())
    .join(' ');
