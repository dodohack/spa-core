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

export class EntityActions {
    static SEARCH = '[Entity] Search';
    static search(etype: string, params: any): Action {
        return {
            type: EntityActions.SEARCH,
            payload: {etype: etype, data: params}
        };
    }

    static SEARCH_COMPLETE = '[Entity] Search Complete';
    static searchComplete(etype: string, results: Entity[]): Action {
        return {
            type: EntityActions.SEARCH_COMPLETE,
            payload: {etype: etype, data: results}
        };
    }

    static LOAD_ENTITIES = '[Entity] Load Entities';
    static loadEntities(etype: string, efilter: any): Action {
        return {
            type: EntityActions.LOAD_ENTITIES,
            payload: {etype: etype, data: efilter}
        };
    }

    static LOAD_ENTITIES_SUCCESS = '[Entity] Load Entities Success';
    static loadEntitiesSuccess(etype: string, results: any): Action {
        return {
            type: EntityActions.LOAD_ENTITIES_SUCCESS,
            payload: {etype: etype, data: results}
        };
    }

    static LOAD_ENTITIES_FAIL = '[Entity] Load Entities Fail';
    static loadEntitiesFail(/*etype: string*/): Action {
        return {
            type: EntityActions.LOAD_ENTITIES_FAIL/*,
             payload: {etype: etype}*/
        };
    }

    static LOAD_ENTITIES_ON_SCROLL = '[Entity] Load Entities On Scroll';
    static loadEntitiesOnScroll(etype: string, params: any): Action {
        return {
            type: EntityActions.LOAD_ENTITIES_ON_SCROLL,
            payload: {etype: etype, data: params}
        };
    }

    static LOAD_ENTITIES_ON_SCROLL_SUCCESS = '[Entity] Load Entities On Scroll Success';
    static loadEntitiesOnScrollSuccess(etype: string, results: any): Action {
        return {
            type: EntityActions.LOAD_ENTITIES_ON_SCROLL_SUCCESS,
            payload: {etype: etype, data: results}
        };
    }

    static LOAD_ENTITIES_ON_SCROLL_FAIL = '[Entity] Load Entities On Scroll Fail';
    static loadEntitiesOnScrollFail(/*etype: string*/): Action {
        return {
            type: EntityActions.LOAD_ENTITIES_ON_SCROLL_FAIL/*,
             payload: {etype: etype}*/
        };
    }

    static LOAD_ENTITY   = '[Entity] Load Entity';
    static loadEntity(etype: string, id: string): Action {
        return {
            type: EntityActions.LOAD_ENTITY,
            payload: {etype: etype, data: id}
        };
    }

    static LOAD_ENTITY_SUCCESS   = '[Entity] Load Entity Success';
    static loadEntitySuccess(etype: string, entity: Entity): Action {
        return {
            type: EntityActions.LOAD_ENTITY_SUCCESS,
            payload: { etype: etype, data: entity }
        };
    }

    static LOAD_ENTITY_FAIL = '[Entity] Load Entity Fail';
    static loadEntityFail(/*etype: string*/): Action {
        return {
            type: EntityActions.LOAD_ENTITY_FAIL/*,
             payload: {etype: etype}*/
        };
    }
}