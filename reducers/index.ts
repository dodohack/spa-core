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

// Debug tools
import { storeLogger } from 'ngrx-store-logger';
import { storeFreeze } from 'ngrx-store-freeze';

import { RouterStateUrl } from '../utils';
import * as fromEntities  from './entities';
import { EntitiesState }  from './entities';

import {
    topicReducer,
    postReducer,
    offerReducer
} from './entities';


export interface AppState {
    topics: EntitiesState; /*
    posts:  EntitiesState;
    offers: EntitiesState; */
    routerReducer: fromRouter.RouterReducerState<RouterStateUrl>;
};

export const reducers: ActionReducerMap<AppState> = {
    topics: topicReducer,/*
    posts:  postReducer,
    offers: offerReducer,*/
    routerReducer: fromRouter.routerReducer,
};

// Console.log all actions
// FIXME: If we don't call logger, reducer will not be triggered.
export function logger(reducer: ActionReducer<AppState>): ActionReducer<AppState> {
    return function(state: AppState, action: any): AppState {
        console.log('state', state);
        console.log('action', action);

        return reducer(state, action);
    };
}


/**
 * By default, @ngrx/store uses combineReducers with the reducer map to compose
 * the root meta-reducer. To add more meta-reducers, provide an array of
 * meta-reducers that will be composed to from the root meta-reducer.
 */
export const metaReducers: MetaReducer<AppState>[] = process.env.ENV != 'production'
    //? [storeLogger, storeFreeze]
    ? [logger, storeFreeze]
    : [];



/*****************************************************************************
 * Entities - must be called with entity type
 *****************************************************************************/


/**
 * FIXME: Previously, we can parameterize getEntitiesState with 'etype', but
 * FIXME: how could we do it with the new way???
 **/

/*
export function getEntitiesState(etype: string) {
    return (state$: Observable<AppState>) => state$
        .select(ENTITY_INFO[etype].selector);
}
*/
/*
export const getEntitiesState =
    createFeatureSelector<AppState>(ENTITY_INFO['topic'].selector);
*/

// This equals to: getTopicsState = (state: AppState) => state.topics;
//export const getTopicsState = createFeatureSelector<AppState>('topics');
export const getTopicsState = (state: AppState) => state.topics;

/*
export const getOffersState = createFeatureSelector<AppState>('offers');

export const getPostsState = createFeatureSelector<AppState>('posts');
*/
/*
export const getTopicEntitiesState = createSelector(
    getTopicsState,
    state => state.entities
);
*/
/*
export const getPostEntitiesState = createSelector(
    getPostsState,
    state => state.posts
);

export const getOfferEntitiesState = createSelector(
    getOffersState,
    state => state.offers
);
*/
export const getCurTopicId = createSelector(
    getTopicsState,
    fromEntities.getCurID
);
/*
export const getCurOfferId = createSelector(
    getOfferEntitiesState,
    fromEntities.getCurID
);

export const getCurPostId = createSelector(
    getPostEntitiesState,
    fromEntities.getCurID
);
*/
export const getTopicEntities = createSelector(
    getTopicsState,
    fromEntities.getEntities
    //state => state.entities
);

/*
export const {
    selectIds: getTopicIds,
    selectEntities: getTopicEntities,
    selectAll: getAllTopics,
    selectTotal: getTotalTopics,
} = fromEntities.adapter.getSelectors(getTopicsState);
*/

/*
export function getEntity(etype: string, id: any) {
    return compose(fromEntities.getEntity(id), getEntitiesState(etype));
}

export function getCurEntity(etype: string) {
    return compose(fromEntities.getCurEntity(), getEntitiesState(etype));
}
*/
export const getCurTopic = createSelector(
    getTopicEntities,
    getCurTopicId,
    (entities, id) => { return id && entities[id]; }
);

/*
export const getCurOffer = createSelector(
    getOfferEntities,
    getCurOfferId,
    (entities, id) => { return id && entities[id]; }
);

export const getCurPost = createSelector(
    getPostsState,
    getCurPostId,
    (entities, id) => { return id && entities[id]; }
);
*/