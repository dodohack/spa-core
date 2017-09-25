/**
 * Ref: https://github.com/ngrx/platform/blob/master/example-app/app/reducers/index.ts
 */

import {
    ActionReducerMap,
    createSelector,
    createFeatureSelector,
    ActionReducer,
    MetaReducer,
} from '@ngrx/store';
import * as fromRouter from '@ngrx/router-store';
import { Observable }  from 'rxjs/Rx';

// Debug tools
import { storeLogger } from 'ngrx-store-logger';
import { storeFreeze } from 'ngrx-store-freeze';

import { RouterStateUrl } from '../utils';
import * as fromEntities  from './entities';
import { EntitiesState }  from './entities';
import {ENTITY_INFO}      from "../models/entity";

import {
    topicReducer,
    postReducer,
    offerReducer,
} from './entities';



export interface AppState {
    topics: EntitiesState;
    posts:  EntitiesState;
    offers: EntitiesState;
    routerReducer: fromRouter.RouterReducerState<RouterStateUrl>;
};

export const reducers: ActionReducerMap<AppState> = {
    topics: topicReducer,
    posts:  postReducer,
    offers: offerReducer,
    routerReducer: fromRouter.routerReducer,
};

// Console.log all actions

export function logger(reducer: ActionReducer<AppState>): ActionReducer<AppState> {
    return storeLogger()(reducer);
}


/**
 * By default, @ngrx/store uses combineReducers with the reducer map to compose
 * the root meta-reducer. To add more meta-reducers, provide an array of
 * meta-reducers that will be composed to from the root meta-reducer.
 */
export const metaReducers: MetaReducer<AppState>[] = process.env.ENV != 'production'
    ? [logger, storeFreeze]
    : [];



/*****************************************************************************
 * Entities - must be called with entity type
 *****************************************************************************/

// TODO: Read https://github.com/reactjs/reselect/blob/master/README.md#q-how-do-i-create-a-selector-that-takes-an-argument
// TODO: https://stackoverflow.com/questions/45108947/selectors-for-multiple-instance-of-ngrx-reducers

export const getTopicsState = (state: AppState) => state.topics;
export const getOffersState = (state: AppState) => state.offers;
export const getPostsState  = (state: AppState) => state.posts;

export const getCurTopicId = createSelector(
    getTopicsState,
    fromEntities.getCurID
);

export const getCurOfferId = createSelector(
    getOffersState,
    fromEntities.getCurID
);

export const getCurPostId = createSelector(
    getPostsState,
    fromEntities.getCurID
);

export const getTopicEntities = createSelector(
    getTopicsState,
    fromEntities.getEntities
);

export const getOfferEntities = createSelector(
    getOffersState,
    fromEntities.getEntities
);

export const getPostEntities = createSelector(
    getPostsState,
    fromEntities.getEntities
);

export const getCurTopic = createSelector(
    getTopicEntities,
    getCurTopicId,
    (entities, id) => { return id && entities[id]; }
);

export const getCurOffer = createSelector(
    getOfferEntities,
    getCurOfferId,
    (entities, id) => { return id && entities[id]; }
);

export const getCurPost = createSelector(
    getPostEntities,
    getCurPostId,
    (entities, id) => { return id && entities[id]; }
);
