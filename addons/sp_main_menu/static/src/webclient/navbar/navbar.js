import { patch } from "@web/core/utils/patch";
import { NavBar } from "@web/webclient/navbar/navbar";
import { computeAppsAndMenuItems } from "@web/webclient/menus/menu_helpers";

patch(NavBar.prototype, {
    onClickMenu(){
        let { apps } = computeAppsAndMenuItems(this.menuService.getMenuAsTree("root"));
        this.onNavBarDropdownItemSelection(apps.find(app => app.xmlid = "sp_main_menu.sp_main_menu_root"));
    }
});
