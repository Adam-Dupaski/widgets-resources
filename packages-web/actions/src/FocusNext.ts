// This file was generated by Mendix Studio Pro.
//
// WARNING: Only the following code will be retained when actions are regenerated:
// - the import list
// - the code between BEGIN USER CODE and END USER CODE
// - the code between BEGIN EXTRA CODE and END EXTRA CODE
// Other code you write will be lost the next time you deploy the project.
import { focusNext } from "./FocusHelper";

// BEGIN EXTRA CODE
// END EXTRA CODE

/**
 * Move the keyboard focus to the next element that can be focused.
 * @returns {Promise.<void>}
 */
export async function FocusNext(): Promise<void> {
    // BEGIN USER CODE
    focusNext();
    return Promise.resolve();
    // END USER CODE
}