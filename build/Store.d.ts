import { Observable, Subscription } from 'rxjs';
export declare class Store<T> {
    private _state;
    constructor(initialState: T);
    /**
     * Get a state within the store by its key
     * @param key The key of the state to get
     */
    get<K extends keyof T>(key: K): T[K];
    /**
     * Get the global current state of the store
     * @returns The current state of the store
     */
    getAll(): T;
    /**
     * Set a state by its key
     * @param key The key of the state to set
     * @param value The new value of the state
     */
    set<K extends keyof T>(key: K, newValue: T[K]): void;
    /**
     * Update a state by its key
     * @param key The key of the state to update
     * @param updater The updater function that takes the old value of the state and returns the new value
     */
    update<K extends keyof T>(key: K, updater: (oldValue: T[K]) => T[K]): void;
    /**
     * Select a state and hook onto it in order to subscribe to its changes
     * @param key The key of the state to select
     * @returns
     */
    select<K extends keyof T>(key: K): Observable<T[K]>;
    /**
     * Calls a function wherever a selected state or the global store changes
     * @param callback A callback function that will be called whenever the state changes
     * @returns
     */
    subscribe(callback: (state: T) => void): Subscription;
}
