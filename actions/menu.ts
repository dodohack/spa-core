/**
 * Action to get pre-configured frontend menu, includes:
 * mobile menus and desktop menus
 */
import { Action }       from '@ngrx/store';
import { Menu }         from '../models';

export const LOAD_MENU = "[Menu] Load";
export const LOAD_MENU_SUCCESS = "[Menu] Load Success";
export const LOAD_MENU_FAIL = "[Menu] Load Fail";
export const REFRESH_MENU = "[Menu] Refresh";

export class LoadMenu implements Action {
    readonly type = LOAD_MENU;
}

export class LoadMenuSuccess implements Action {
    readonly type = LOAD_MENU_SUCCESS;
    constructor(public payload: Menu[]) {}
}

export class LoadMenuFail implements Action {
    readonly type = LOAD_MENU_FAIL;
}

// When a page is loaded, it emits an action to update the menu displayed
// on the page. Cause we only know which menu to show when data is loaded.
// We use this action instead of @Input() because we want a persistent
// site-header instead of creating a new one each time switching between
// different pages.
export class RefreshMenu implements Action {
    readonly type = REFRESH_MENU;
    // FIXME: Revisit payload
    constructor(public payload: {menu_type: 'HOME', menu_name: 'main'}){};
}

export type Actions = LoadMenu
    | LoadMenuSuccess
    | LoadMenuFail
    | RefreshMenu;