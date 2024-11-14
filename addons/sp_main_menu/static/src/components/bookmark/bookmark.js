import { rpc } from "@web/core/network/rpc";
import { registry } from "@web/core/registry";
import { useService } from "@web/core/utils/hooks";
import { Component, onMounted } from "@odoo/owl";
import { Deferred } from "@web/core/utils/concurrency";
import { Dropdown } from "@web/core/dropdown/dropdown";
import { DropdownItem } from "@web/core/dropdown/dropdown_item";
import { useDropdownState } from "@web/core/dropdown/dropdown_hooks";

export class Bookmark extends Component {
    static components = { Dropdown, DropdownItem };
    static props = [];
    static template = "sp_main_menu.Bookmark";

    setup() {
        this.action = useService("action");
        this.dropdown = useDropdownState();
        this.fetchDeferred = new Deferred();
        this.bookmarks = [];

        onMounted(() => {
            this.fetchBookmarks();
        });
    }

    openMyBookmarks() {
        this.dropdown.close();
        this.action.doAction("sp_main_menu.sp_bookmark_action_my_bookmarks", { clearBreadcrumbs: true });
    }

    openBookmark(bookmark) {
        if (bookmark.type === "url") {
            window.open(bookmark.url, bookmark.target);
        }
        else {
            this.action.doAction(bookmark.window_action_id[0], {clearBreadcrumbs: true});
        }
    }

    onBeforeOpen() {
        const fetchDeferred = this.fetchDeferred;
        this.fetchBookmarks();
        return fetchDeferred;
    }

    async fetchBookmarks() {
        const fetchDeferred = this.fetchDeferred;
        rpc("/web/sp_bookmark/data").then(
            (data) => {
                this.bookmarks = data;
                fetchDeferred.resolve(data);
            },
            (error) => {
                fetchDeferred.reject(error);
            }
        );
        this.fetchDeferred = new Deferred();
    }
}

registry
    .category("systray")
    .add("sp_main_menu.bookmark", { Component: Bookmark }, { sequence: 10 });
