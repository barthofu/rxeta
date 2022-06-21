"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Store = void 0;
const rxjs_1 = require("rxjs");
class Store {
    constructor(initialState) {
        this._state = new rxjs_1.BehaviorSubject(initialState);
    }
    // =======================
    // === CRUD operations ===
    // =======================
    /**
     * Get a state within the store by its key
     * @param key The key of the state to get
     */
    get(key) {
        return this._state.getValue()[key];
    }
    /**
     * Get the global current state of the store
     * @returns The current state of the store
     */
    getAll() {
        return this._state.getValue();
    }
    /**
     * Set a state by its key
     * @param key The key of the state to set
     * @param value The new value of the state
     */
    set(key, newValue) {
        const oldState = this._state.getValue();
        const newState = { ...oldState, [key]: newValue };
        this._state.next(newState);
    }
    /**
     * Update a state by its key
     * @param key The key of the state to update
     * @param updater The updater function that takes the old value of the state and returns the new value
     */
    update(key, updater) {
        const oldState = this._state.getValue();
        const newState = { ...oldState, [key]: updater(oldState[key]) };
        this._state.next(newState);
    }
    // ===========================
    // === Changes dispatching ===
    // ===========================
    /**
     * Select a state and hook onto it in order to subscribe to its changes
     * @param key The key of the state to select
     * @returns
     */
    select(key) {
        return this._state.pipe((0, rxjs_1.distinctUntilKeyChanged)(key), (0, rxjs_1.pluck)(key));
    }
    /**
     * Calls a function wherever a selected state or the global store changes
     * @param callback A callback function that will be called whenever the state changes
     * @returns
     */
    subscribe(callback) {
        return this._state.subscribe(callback);
    }
}
exports.Store = Store;
