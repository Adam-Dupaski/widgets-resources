// This file was generated by Mendix Modeler.
//
// WARNING: Only the following code will be retained when actions are regenerated:
// - the code between BEGIN USER CODE and END USER CODE
// Other code you write will be lost the next time you deploy the project.

import { NativeModules, Platform } from "react-native";
import ReactNativeFirebase from "react-native-firebase";

/**
 * Notification permissions are required to send a user push messages. Calling this action displays the permission dialog to the user.
 * Returns true if permission is granted, otherwise it returns false.
 * @returns {Promise.<boolean>}
 */
export async function RequestNotificationPermission(): Promise<boolean> {
    // BEGIN USER CODE
    // Documentation https://rnfirebase.io/docs/v5.x.x/notifications/receiving-notifications

    if (NativeModules && !NativeModules.RNFirebase) {
        return Promise.reject(new Error("Firebase library is not currently imported in your app"));
    }
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const firebase: typeof ReactNativeFirebase = require("react-native-firebase");

    return firebase
        .messaging()
        .requestPermission()
        .then(() =>
            Platform.OS === "ios"
                ? firebase
                      .messaging()
                      .ios.registerForRemoteNotifications()
                      .then(() => true)
                : true
        )
        .catch(() => false);

    // END USER CODE
}
