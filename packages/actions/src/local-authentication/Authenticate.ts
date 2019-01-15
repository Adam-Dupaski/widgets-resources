// This file was generated by Mendix Modeler.
//
// WARNING: Only the following code will be retained when actions are regenerated:
// - the code between BEGIN USER CODE and END USER CODE
// Other code you write will be lost the next time you deploy the project.

import ReactNativeTouchId from "react-native-touch-id";

/**
 * @param {string} reason - Required
 * @returns {boolean}
 */
function Authenticate(reason?: string): Promise<boolean> {
    // BEGIN USER CODE
    // Documentation https://github.com/naoufal/react-native-touch-id

    const TouchID: typeof ReactNativeTouchId = require("react-native-touch-id").default;

    if (!reason) {
        throw new TypeError("Input parameter 'reason' is required");
    }

    return TouchID.authenticate(reason)
        .then(() => true)
        .catch(() => false);

    // END USER CODE
}
