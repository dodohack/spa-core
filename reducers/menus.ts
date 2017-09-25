import { Action }         from '@ngrx/store';
import { Observable }     from 'rxjs/Observable';

import { Menu }           from '../models';
import  * as menu         from '../actions/menu';

/*
 export interface MenuGroup {
 [gid: number]: Menu [];
 }
 */

export interface MenusState {
    curTopMenuId:  number; // Current topbar menu root id, we have fixed name 'topbar'
    curMainMenuId: number; // Current main menu root id
    curFootMenuId: number; // Current footer menu root id, we have fixed name 'footer'
    rootIds: number[];     // The menus whose parent_id is 0
    parentIds: number[];   // All parent ids
    // Types and names for root menu
    roots: { [id: number]: {type: string, name: string}};
    // Array of menus grouped by parent id and group id, top level menu always
    // in group id 0
    menus: { [pid: number]: {[gid: number]: Menu[]} };
    // Corresponding group ids in array for menus, used to index menus
    menuGids: { [pid: number]: number[] };
};

const initialState: MenusState = {
    curTopMenuId:          0,
    curMainMenuId:         0,
    curFootMenuId:         0,
    rootIds:               [],
    parentIds:             [],
    roots:                 {},
    menus:                 {},
    menuGids:              {},
};

export function reducer(state = initialState,
                        action: menu.Actions): MenusState {
    switch (action.type)
    {
        // TODO: This reduce costs several ms to dozens of ms if number of menus
        // TODO: are huge, we should always cache menu into localStorage.
        case menu.LoadMenuSuccess: {
            const menusAry: Menu[] = action.payload;
            const rootMenusAry = menusAry.filter(m => m.parent_id === 0);
            const rootIds      = rootMenusAry.map(menu => menu.id);

            const parentIds    = menusAry.map(m => m.parent_id).filter(
                (elem, idx, self) => idx == self.indexOf(elem));

            const roots        = rootMenusAry.reduce(
                (roots: {[id: number]: { type: string, name: string}}, m: Menu) => {
                    return Object.assign(roots, {[m.id]: {type: m.type, name: m.name}});
                }, {});


            // Generate grouped menu can be indexed by parent_id and group_id
            let menus: {[pid: number]: {[gid:number]: Menu[]}};
            let menuGids: {[pid: number]: number[]};

            parentIds.forEach((id, idx, ids) => {
                // Turn menus with the same parent into grouped by group_id
                let groupMenus = menusAry.filter(m => m.parent_id === id)
                    .reduce((gms: {[gid: number]: Menu[]}, m: Menu) => {
                        if (gms[m.group])
                        // Add menu to existing menu group
                            return Object.assign(gms, {[m.group]: [...gms[m.group], m]});
                        else
                        // Create a new menu group with this menu
                            return Object.assign(gms, {[m.group]: [m]});
                    }, {});
                menus = Object.assign({}, menus, {[id]: groupMenus});
                menuGids = Object.assign({}, menuGids, {[id]: Object.keys(groupMenus)});

                // Sort each group of menus by ascending order
                menuGids[id].forEach((gid, idx, gids) => {
                    menus[id][gid].sort((a, b) => a.order - b.order);
                }, {});
            });

            return {
                curTopMenuId:  state.curTopMenuId,
                curMainMenuId: state.curMainMenuId,
                curFootMenuId: state.curFootMenuId,
                rootIds:       rootIds,
                parentIds:     parentIds,
                roots:         roots,
                menus:         menus,
                menuGids:      menuGids,
            };
        }

        // Refresh current menu state
        case menu.RefreshMenu: {
            // Menu type for main menu, 'topbar' and 'footer' menu
            const menuType = action.payload.menu_type;
            // Main menu name, we have name fixed 'topbar' and 'footer' menu
            const menuName = action.payload.menu_name;

            let curTopMenuId:number, curMainMenuId:number, curFootMenuId:number;

            state.rootIds.forEach((id, idx, ids) => {
                // TODO: We could make this more generic by removing hardcoded
                // topbar & footer, Revisit is needed.
                if (state.roots[id].type === menuType) {
                    switch (state.roots[id].name) {
                        case menuName:
                            curMainMenuId = id;
                            break;
                        case 'topbar':
                            curTopMenuId = id;
                            break;
                        case 'footer':
                            curFootMenuId = id;
                            break;
                    }
                }
            });

            // Return the updated root menu ids
            return Object.assign({}, state, {
                curTopMenuId:  curTopMenuId,
                curMainMenuId: curMainMenuId,
                curFootMenuId: curFootMenuId
            });
        }

        default:
            return state;
    }
}


/*****************************************************************************
 * Helper functions
 *****************************************************************************/

/**
 * Return array of sorted top menus
 */
export const getTopMenus =
    (state: MenusState) => state.curTopMenuId && state.menus[state.curTopMenuId][0];

/**
 * Return array of sorted main menus
 */
export const getMainMenus =
    (state: MenusState) => state.curMainMenuId && state.menus[state.curMainMenuId][0];

/**
 * Return array of sorted footer menus
 */
export const getFootMenus =
    (state: MenusState) => state.curFootMenuId && state.menus[state.curFootMenuId][0];


/**
 * Return group index of submenus object
 * FIXME: Parameters?
 */
export function getSubMenuGids(pid: number) {
    return (state$: Observable<MenusState>) => state$
        .select(m => m.menuGids[pid]);
}

/**
 * Return current topbar menu root id
 */
export const getTopMenuRootId = (state: MenusState) => state.curTopMenuId;

/**
 * Return current main menu root id
 */
export const getMainMenuRootId = (state: MenusState) => state.curMainMenuId;

/**
 * Return current footer menu root id
 */
export const getFootMenuRootId = (state: MenusState) => state.curFootMenuId;

/**
 * Return root menu ids
 */
export const getRootMenuIds = (state: MenusState) => state.rootIds;

/**
 * Return all menus
 */
export const getMenus = (state: MenusState) => state.menus;
