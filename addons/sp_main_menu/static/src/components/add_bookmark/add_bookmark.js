import { Component } from "@odoo/owl";
import { DropdownItem } from "@web/core/dropdown/dropdown_item";
import { registry } from "@web/core/registry";
import { useService } from "@web/core/utils/hooks";
import { rpc } from "@web/core/network/rpc";
import { _t } from "@web/core/l10n/translation";

export class addBookmark extends Component {
    static template = "sp_main_menu.AddBookmark";
    static components = { DropdownItem };
    static props = {};

    setup() {
        this.action = useService("action");
    }

    addBookmark() {
        if (this.env.config.actionId) {
            rpc("/web/sp_bookmark/add", {
                window_action_id: this.env.config.actionId,
                name: this.env.config.actionName || _t("New Bookmark"),
            });
        }
    }
}

registry.category("cogMenu").add("add-bookmark", { Component: addBookmark }, { sequence: 1 });
