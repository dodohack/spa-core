/**
 * Entity reducer
 */

//import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Observable } from 'rxjs/Observable';

import { Entity }        from '../models';
import { ENTITY }        from '../models';
import { Paginator }     from '../models';
import * as entity       from '../actions/entity';


export interface EntityFilter {
    key: string;
    params: [{key: string, value: string}];
    paginator: Paginator;
    ids: string[];
}

// TODO: Enable @ngrx/entity when everything works
export interface EntitiesState /*extends EntityState<Entity>*/ {
    keys: string[];
    efilters: { [key: string]: EntityFilter };

    ids: string[];
    entities: {[id: string]: Entity };

    // Current active entity id
    activeId: string | null;
}

/*
export const adapter: EntityAdapter<Entity> = createEntityAdapter<Entity>({
    selectId: (entity: Entity) => entity.id,
    sortComparer: false
});
*/

/**
 * Initial state
 */
const initState: EntitiesState = { //adapter.getInitialState({
    keys: [],
    efilters: {},
    ids: [],
    entities: {},
    activeId: null
}; //);


/**
 * Topic reducer
 */
export function topicReducer(state = initState,
                             action: entity.Actions): EntitiesState {
    if (!action.payload) return state;

    if (action.payload.etype === ENTITY.TOPIC)
        return entitiesReducer(action.payload.etype, state, action);

    return state;
}

/**
 * Post reducer
 */
export function postReducer(state = initState,
                            action: entity.Actions): EntitiesState {
    if (!action.payload) return state;

    if (action.payload.etype === ENTITY.POST)
        return entitiesReducer(action.payload.etype, state, action);

    return state;
}

/**
 * Offer reducer
 */
export function offerReducer(state = initState,
                             action: entity.Actions): EntitiesState {
    if (!action.payload) return state;

    if (action.payload.etype === ENTITY.OFFER)
        return entitiesReducer(action.payload.etype, state, action);

    return state;
}

/**
 * Helper function to return the index type of entities
 * @param etype
 * @returns {any}
 */
function getIdx(etype: string)
{
    if (etype === ENTITY.TOPIC) return 'guid';
    else return 'id';
}

/**
 * A generic reducer for all entity types
 */
function entitiesReducer(etype: string,
                         state: EntitiesState,
                         action: entity.Actions): EntitiesState {

    switch (action.type)
    {
        case entity.LOAD_ENTITIES_SUCCESS:
        {
            let key     = action.payload.data.key;
            let pager   = action.payload.data.paginator;
            let entities: Entity[] = action.payload.data.entities;

            let idx: string = getIdx(etype);

            // Extract entity ids and form new group of entities
            let ids         = entities.map(e => e[idx]);
            // FIXME: Object.assign mutates 'entities'!!
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
        case entity.LOAD_ENTITY_SUCCESS:
        {
            let idx: string = getIdx(etype);
            let id: string = action.payload.data[idx];

            // Merge loaded entity into the top level id array
            // FIXME: We can't use state.ids.indexOf(id) due to TSC build error
            let newIds = [...state.ids, id].filter(
                (elem, idx, self) => idx == self.indexOf(elem));

            return Object.assign({}, state, {
                ids: newIds,
                entities: Object.assign({}, state.entities,
                    {[id]: action.payload.data}),
                activeId: id,
            });
        }

        // DO NOT MISS THIS!
        default:
            return state;
    }

}

/*****************************************************************************
 * Helper functions
 *****************************************************************************/

/**
 * Get an entity by it's id
 */
/*
export function getEntity(eid: any) {
    return (state$: Observable<EntitiesState>) => state$
        .select(s => s.entities[eid]);
}
*/

/**
 * Get current loaded entity
 */
/*
export function getCurEntity() {
    return (state$: Observable<EntitiesState>) => state$
        .select(s => s.entities[s.id]);
}
*/

export const getCurID = (state: EntitiesState) => state.activeId;

export const getCurEntity =
    (state: EntitiesState) => state.activeId && state.entities[state.activeId];

export const getEntities = (state: EntitiesState) => state.entities;
