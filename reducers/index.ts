/**
 * Ref: https://github.com/ngrx/platform/blob/master/example-app/app/reducers/index.ts
 */

import {
    ActionReducerMap,
    createSelector,
    createFeatureSelector,
    ActionReducer,
    MetaReducer } from '@ngrx/store';

// Debug tools
import { storeLogger } from 'ngrx-store-logger';
import { storeFreeze } from 'ngrx-store-freeze';

import * as fromEntities from './entities';
import {
    topicReducer,
    offerReducer
} from './entities'

export interface State {
    //topics:
}

export const reducers: ActionReducerMap<State> = {
    topics: topicReducer,
    offers: offerReducer,
}