/**
 * Entity reducer
 */

import { Observable } from 'rxjs/Observable';
import { Action }     from '@ngrx/store';

import { Entity }        from '../models';
import { ENTITY }        from '../models';
import { EntityActions } from '../actions';

export interface EntityFilter {
    key: string;
    params: [{key: string, value: string}];
    paginator: Paginator;
    ids: string[];
}

export interface EntitiesState {
    keys: string[];
    efilters: { [key: string]: EntityFilter };

    ids: string[];
    entities: {[id: string]: Entity };

    // Current active entity id
    id: string;
}

/**
 * Initial state
 */
const initState: EntitiesState = {keys: [], efilters: {}, ids: [], entities: {}, id: '0'};


/**
 * Topic(includes Merchant) reducer
 */
export function topicReducer(state = initState, action: any): EntitiesState {
    if (!action.payload) return state;

    if (action.payload.etype === ENTITY.TOPIC)
        return entitiesReducer(action.payload.etype, state, action);

    return state;
}

/**
 * Offer reducer
 */
export function offerReducer(state = initState, action: any): EntitiesState {
    if (!action.payload) return state;

    if (action.payload.etype === ENTITY.OFFER)
        return entitiesReducer(action.payload.etype, state, action);

    return state;
}

/**
 * A generic reducer for all entity types
 */
function entitiesReducer(etype: string,
                         state: EntitiesState,
                         // FIXME: Extend 'Action' in ngrx4 with a payload
                         action: any): EntitiesState {

    switch (action.type)
    {
        case EntityActions.LOAD_ENTITIES_SUCCESS:
        {
            let key     = action.payload.data.key;
            let pager   = action.payload.data.paginator;
            let entities: Entity[] = action.payload.data.entities;

            let idx: string;
            if (etype === ENTITY.OFFER)
                idx = 'guid';
            else
                idx = 'id';


            // Extract entity ids and form new group of entities
            let ids         = entities.map(e => e[idx]);
            let newEntities = entities.reduce((entities, entity) =>
                Object.assign(entities, {[entity[idx]]: entity}), {});

            // Update the filter created when the load action dispatched
            let efilter: any;
            if (key in state.efilters) {
                // Cache hit
                efilter = {
                    key: key,
                    params: state.efilters[key].params,
                    paginator: pager,
                    ids: ids
                }
            } else {
                // Cache miss
                efilter = {
                    key: key,
                    params: null,
                    paginator: pager,
                    ids: ids
                }
            }

            // Get deduplicated keys and ids
            let newKeys = state.keys.indexOf(key) == -1 ?
                [...state.keys, key] : state.keys;
            let newIds = [...state.ids, ...ids].filter(
                (elem, idx, self) => idx == self.indexOf(elem));

            // Merge the key, filter, ids and entities
            return Object.assign({}, state, {
                keys: newKeys,
                efilters: Object.assign({}, state.efilters, {[key]: efilter}),
                ids: newIds,
                entities: Object.assign({}, state.entities, newEntities)
            });
        }

        // Load individual entity, we don't put this entity in to the filters
        case EntityActions.LOAD_ENTITY_SUCCESS:
        {
            let id: string;
            if (etype === ENTITY.OFFER)
                id = action.payload.data['guid'];
            else
                id = action.payload.data['id'];

            // Merge loaded entity into the top level id array
            // FIXME: We can't use state.ids.indexOf(id) due to TSC build error
            let newIds = [...state.ids, id].filter(
                (elem, idx, self) => idx == self.indexOf(elem));

            return Object.assign({}, state, {
                ids: newIds,
                entities: Object.assign({}, state.entities,
                    {[id]: action.payload.data}),
                id: id,
            });
        }

        // DO NOT MISS THIS!
        default:
            return state;
    }

}