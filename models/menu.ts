/**
 * A common data type for a menu item, we use menu type to index the menu we
 * are going to display.
 *
 * Desktop menu name for current BANGLI global SPA design, we use combination of
 * device, type, name to determine which menu to show, for desktop, device is
 * always 'DESKTOP'.
 *
 * --type---name----description------------------------------------------------
 *  HOME   topbar - Home page topbar menu,
 *                  show countries as level 1 menu and cities as dropdown
 *  HOME   main   - Home page main menu,
 *                  show channels as level 1 menu and selected cat/topic as dropdown
 *
 * CHANNEL topbar - All other page topbar menu except home_page,
 *                  show list of channels as level 1 menu
 *
 * CHANNEL shopping - Shopping channel main menu,
 *                    showing categories of shopping channel as level 1 menu,
 *                    and sub categories and hot topics as dropdown
 *
 * CHANNEL travel   - Travel channel main menu
 * CHANNEL deal     - Deal channel main menu
 * CHANNEL culture  - Culture channel main menu
 * CHANNEL migration- Migration channel main menu
 * ......
 *
 * CATEGORY beauty  - Main menu of beauty category of shopping channel
 * CATEGORY fashion - Main menu of fashion category of shopping channel
 * CATEGORY luxury  - ...
 * CATEGORY health  - ...
 * CATEGORY home    - 购物频道日用版块主目录
 * CATEGORY appliance - 购物频道小家电版块主目录
 * CATEGORY baby    - ...
 * CATEGORY guide   - ...
 * ......
 *
 *
 * Mobile menu types:
 * ...
 *
 * E.g, home page topbar menu data retrived from API server:
 *
 * { id: 123, parent_id: 0,   name: 'home_topbar', ... }
 * { id: 129, parent_id: 123, name: '英格兰‘, url: '/map/place/england', ... order: 1, ... }
 * { id: 130, parent_id: 123, name: '苏格兰‘, url: '/map/place/scotland', ... order: 2, ... }
 * { id: 131, parent_id: 123, name: '威尔士‘, url: '/map/place/welsh', ... order: 3, ... }
 * ...... # We take group 1 as hot places in the context
 * { id: 151, parent_id: 129, name: '伦敦', url: '/place/london', group: 1, order: 1, ... }
 * { id: 152, parent_id: 129, name: '南安普顿', url: '/place/south-amption', group: 1, order: 2, ... }
 * ...... # We take group 2 as all other places
 * { id: 193, parent_id: 129, name: 'Watford', url: '/place/watford', group: 2, order: 1, ... }
 * { id: 194, parent_id: 129, name: 'St Albans', url: '/place/st-albans', group: 2, order: 2, ... }
 * ......
 */

export class Menu {
    id: number;
    parent_id: number; // Parent menu id, we use menu with parent_id 0 as menu
                       // selector, each type of menu has 1 menu with parent_id = 0,
                       // So all level 1 menus belong to the menu has the same
                       // parent_id
    type: string;      // Menu type
    name: string;      // Menu name, it has special use for menu with parent_id 0
    url:  string;      // Pre-generated menu url
    group: number;     // Do we display menus grouped with group number?
                       // 0: no group, 1 - n: group number

    order: number;     // Order of the menu to display, starts from 1
    external: boolean; // In app link or external link, in app link starts with
                       // '/', external link starts with domain name.
    icon:  string;     // Menu icon class if any
    style: string;     // Extra style apply to the menu if any
};
