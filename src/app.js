import React, { Component } from 'react';
import { ToastContainer } from 'molekule';

import TaskList from './task-list';

class App extends Component {
  render() {
    return (
      <>
        <ToastContainer />
        <section
          style={{
            margin: 20,
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
          }}
        >
          <div style={{ width: '100%', maxWidth: 720 }}>
            <h1>HeyDoctor Task Queue</h1>
            <TaskList />
          </div>
        </section>
      </>
    );
  }
}

export default App;
