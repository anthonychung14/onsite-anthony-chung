const { sequelize } = require('./db');

sequelize.addHook('beforeSync', () => {
  console.log('Starting database sync...\n');
});

sequelize.addHook('afterSync', () => {
  console.log('\nCompleted database sync!');
});

sequelize.sync({ force: true });
