import { addPlugin, Flipper } from 'react-native-flipper';
import * as dayjs from 'dayjs';
import { useCallback } from 'react';
const cycle = require('cycle');
let currentConnection: Flipper.FlipperConnection | null = null;

const createStateForAction = (state: any) => {

  return cycle.decycle(state);
}

// To initiate initial state tree
const createInitialAction = (state: any) => {
  const startTime = Date.now();

  const data = {
    id: startTime,
    time: dayjs(startTime).format('HH:mm:ss.SSS'),
    took: '-',
    action: { type: '@@INIT' },
    before: createStateForAction({}),
    after: createStateForAction(state),
  };

  if (currentConnection) {
    currentConnection.send('actionInit', data);
  }

};

const processState = (state: any, action: any, next: any) => {
  const startTime = Date.now();
  if (currentConnection) {
    const now = Date.now();

    const data = {
      id: startTime,
      time: dayjs(startTime).format('HH:mm:ss.SSS'),
      took: `${now - startTime} ms`,
      action: createStateForAction(action),
      before: createStateForAction(state),
      after: createStateForAction(next),
    };

    currentConnection.send('actionDispatched', data);
  }
};

const flipperLogger = (reducer: any) => {
  const reducerWithLogger = useCallback(
    (state: any, action:any) => {
      const next = reducer(state, action);
      processState(state, action, next);
      return next;
    },
    [reducer]
  );

  if (currentConnection == null) {
    addPlugin({
      getId() {
        return 'flipper-plugin-redux-debugger';
      },
      onConnect(connection: any) {
        currentConnection = connection;
        createInitialAction(reducer);
      },
      onDisconnect() {
        currentConnection = null;
      },
      runInBackground() {
        return true;
      },
    });
  }

  return reducerWithLogger;
};

export default flipperLogger;
