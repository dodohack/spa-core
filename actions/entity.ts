/**
 * This action is used by almost everything, basically, an entity is the
 * abstract of everything, such as offer, post, page etc.
 * We centralize ngrx behavior for different entities because they shares
 * more than 90% common behaviors, the difference between them is the
 * view templates.
 */
import { Action }            from '@ngrx/store';
import { Entity }            from '../models';
import { EntityParams }      from '../models';

export const SEARCH = '[Entity] Search';
export const SEARCH_COMPLETE = '[Entity] Search Complete';
export const LOAD_ENTITIES = '[Entity] Load Entities';
export const LOAD_ENTITIES_SUCCESS = '[Entity] Load Entities Success';
export const LOAD_ENTITIES_FAIL = '[Entity] Load Entities Fail';
export const LOAD_ENTITIES_ON_SCROLL = '[Entity] Load Entities On Scroll';
export const LOAD_ENTITIES_ON_SCROLL_SUCCESS = '[Entity] Load Entities On Scroll Success';
export const LOAD_ENTITIES_ON_SCROLL_FAIL = '[Entity] Load Entities On Scroll Fail';
export const LOAD_ENTITY   = '[Entity] Load Entity';
export const LOAD_ENTITY_SUCCESS   = '[Entity] Load Entity Success';
export const LOAD_ENTITY_FAIL = '[Entity] Load Entity Fail';

export class Search implements Action {
    readonly type = SEARCH;
    // FIXME: payload: {etype: etype, data: params}
    constructor(public payload: {etype: string, data: any}) {}
}

export class SearchComplete implements Action {
    readonly type = SEARCH_COMPLETE;
    // FIXME: payload: {etype: etype, data: results}
    constructor(public payload: {etype: string, data: any}) {}
}

export class LoadEntities implements Action {
    readonly type = LOAD_ENTITIES;
    // FIXME: payload: {etype: etype, data: efilter}
    constructor(public payload: {etype: string, data: any}) {}
}

export class LoadEntitiesSuccess implements Action {
    readonly type = LOAD_ENTITIES_SUCCESS;
    // FIXME: payload: {etype: etype, data: results}
    constructor(public payload: {etype: string, data: any}) {}
}

export class LoadEntitiesFail implements Action {
    readonly type = LOAD_ENTITIES_FAIL;
    // TODO: Do we need an 'etype' as payload?
    // FIXME: WE COULD NOT GET A 'etype' FROM EXCEPTION OF SIDE EFFECT.
    constructor(public payload: any = null) {}
}

export class LoadEntitiesOnScroll implements Action {
    readonly type = LOAD_ENTITIES_ON_SCROLL;
    // FIXME: payload: {etype: etype, data: params}
    constructor(public payload: {etype: string, data: any}) {}
}

export class LoadEntitiesOnScrollSuccess implements Action {
    readonly type = LOAD_ENTITIES_ON_SCROLL_SUCCESS;
    // FIXME: payload: {etype: etype, data: results}
    constructor(public payload: {etype: string, data: any}) {}
}

export class LoadEntitiesOnScrollFail implements Action {
    readonly type = LOAD_ENTITIES_ON_SCROLL_FAIL;
    // TODO: Do we need an 'etype' as payload?
    constructor(public payload: any = null) {}
}

export class LoadEntity implements Action {
    readonly type = LOAD_ENTITY;
    // FIXME: payload: {etype: etype, data: id}
    constructor(public payload: {etype: string, data: any}) {}
}

export class LoadEntitySuccess implements Action {
    readonly type = LOAD_ENTITY_SUCCESS;
    // FIXME: payload: { etype: etype, data: entity }
    constructor(public payload: {etype: string, data: any}) {}
}

export class LoadEntityFail implements Action {
    readonly type = LOAD_ENTITY_FAIL;
    // TODO: Do we need an 'etype' as payload
    constructor(public payload: any = null) {}
}

export type Actions = Search
    | SearchComplete
    | LoadEntities
    | LoadEntitiesSuccess
    | LoadEntitiesFail
    | LoadEntitiesOnScroll
    | LoadEntitiesOnScrollSuccess
    | LoadEntitiesOnScrollFail
    | LoadEntity
    | LoadEntitySuccess
    | LoadEntityFail;
