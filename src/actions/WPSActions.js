// This is where action creators are put
import { doWPSExecuteCall } from '../utils/WPSRunner.js';
import { START_WPS_EXECUTE_START, START_WPS_EXECUTE_FAILED, START_WPS_EXECUTE_END, WPS_STATUS_UPDATE, WPS_COMPLETED } from '../constants/WPSLabels';

const startWPSExecute = (accessToken, identifier, dataInputs, nrOfStartedProcesses) => {
  return (dispatch) => {
    dispatch({
      type: START_WPS_EXECUTE_START,
      payload: {
        id: nrOfStartedProcesses,
        accessToken: accessToken,
        identifier: identifier,
        dataInputs: dataInputs
      }
    });
    try {
      let wps = 'https://bhw451.knmi.nl:8090/wps?' + 'service=wps&request=Execute&identifier=binaryoperatorfornumbers_10sec&version=1.0.0&' +
      'DataInputs=inputa=1000;inputb=2;operator=divide;&storeExecuteResponse=true&status=true&';
      let statusUpdateCallback = (message, percentageComplete) => {
        dispatch({ type: WPS_STATUS_UPDATE, payload: { message: message, percentageComplete: percentageComplete, id: nrOfStartedProcesses } });
      };
      let executeCompletCallback = (json, processSucceeded) => {
        dispatch({ type: WPS_COMPLETED, payload: { json: json, processSucceeded: processSucceeded, id: nrOfStartedProcesses } });
      };
      doWPSExecuteCall(wps, accessToken, statusUpdateCallback, executeCompletCallback);
    } catch (e) {
      return dispatch({ type: START_WPS_EXECUTE_FAILED, payload: { error: e, id: nrOfStartedProcesses } });
    }
    dispatch({ type: START_WPS_EXECUTE_END });
  };
};

const actions = {
  startWPSExecute
};

export default actions;
