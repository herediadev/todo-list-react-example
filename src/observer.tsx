export const observers: any = {
    callbacks: {},
    on: (eventName: string, functionCallback: Function) => {
        if (!observers.callbacks[eventName])
            observers.callbacks[eventName] = [];

        observers.callbacks[eventName].push(functionCallback);
    },
    trigger: (eventName: string, params?: any) => {
        if (observers.callbacks[eventName])
            observers.callbacks[eventName].forEach((callback: any) => callback(params));
    },
    remove: (eventName: string, callback: (param?: any) => void) => {
        const callbacks = observers.callbacks[eventName];
        const callbackIndexOfIsFound = (callbackFunctionIndexOf: number) => callbackFunctionIndexOf > -1;
        const removeCallback = (callbackFunctionIndexOf: number) => {
            if (callbackIndexOfIsFound(callbackFunctionIndexOf))
                callbacks.splice(callbackFunctionIndexOf, 1);
        };

        if (callbacks)
            removeCallback(callbacks.indexOf(callback));
    }
};
