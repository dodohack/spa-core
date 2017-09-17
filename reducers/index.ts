/**
 * Ref: https://github.com/ngrx/platform/blob/master/example-app/app/reducers/index.ts
 */

import {
    ActionReducerMap,
    createSelector,
    createFeatureSelector,
    ActionReducer,
    MetaReducer } from '@ngrx/store';
import * as fromRouter from '@ngrx/router-store';

// Debug tools
import { storeLogger } from 'ngrx-store-logger';
import { storeFreeze } from 'ngrx-store-freeze';

import { RouterStateUrl } from '../utils';
import * as fromEntities  from './entities';
import { EntitiesState }  from './entities';

import {
    topicReducer,
    offerReducer
} from './entities';

export interface AppState {
    topics: EntitiesState;
    offers: EntitiesState;
    routerReducer: fromRouter.RouterReducerState<RouterStateUrl>;
}

export const reducers: ActionReducerMap<AppState> = {
    topics: topicReducer,
    offers: offerReducer,
    routerReducer: fromRouter.routerReducer,
}

// Console.log all actions
/*
export function logger(reducer: ActionReducer<AppState>): ActionReducer<AppState> {
    return function(state: AppState, action: any): AppState {
        console.log('state', state);
        console.log('action', action);

        return reducer(state, action);
    };
}
*/

/**
 * By default, @ngrx/store uses combineReducers with the reducer map to compose
 * the root meta-reducer. To add more meta-reducers, provide an array of
 * meta-reducers that will be composed to from the root meta-reducer.
 */
export const metaReducers: MetaReducer<AppState>[] = process.env.ENV != 'production'
    ? [storeLogger, storeFreeze]
    : [];
