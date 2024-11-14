import { Component, onWillStart } from "@odoo/owl";
import { registry } from "@web/core/registry";
import { useService } from "@web/core/utils/hooks";
import { WidgetHour } from "@sp_main_menu/components/widget_hour/widget_hour";
import { WidgetAnnouncement } from "@sp_main_menu/components/widget_announcement/widget_announcement";
import { user } from "@web/core/user";
import { standardActionServiceProps } from "@web/webclient/actions/action_service";

class MenuAction extends Component {
    static components = { WidgetHour, WidgetAnnouncement };
    static props = {...standardActionServiceProps};
    static template = "sp_main_menu.MainMenu";

    setup() {
        this.orm = useService("orm");
        this.menuService = useService("menu");
        const companyService = useService("company");
        this.currentCompanyId = companyService.currentCompany.id
        this.apps = this.menuService.getApps()
                        .filter(app => app.xmlid != "sp_main_menu.sp_main_menu_root")
                        .sort((a, b) => a.name.localeCompare(b.name));
        this.deg = `${90 + 180 * Math.atan(window.innerHeight / window.innerWidth) / Math.PI}deg`;

        onWillStart(async () => {
            try {
                this.userIsAdmin = await user.hasGroup("base.group_system");
                const res = await this.orm.searchRead(
                    "res.company",
                    [["id", "=", this.currentCompanyId]],
                    ["sp_announcement", "sp_show_widgets"]
                );
                this.announcement = res[0].sp_announcement;
                this.showWidgets = res[0].sp_show_widgets;
            } catch (error) {
                console.error("Error loading data:", error);
            }
        });
    }

    onClickModule(menu){
        menu && this.menuService.selectMenu(menu);
    }

    onChangeAnnouncement(value){
        this.announcement = value;
    }

    async onSaveAnnouncement(){
        try {
            await this.orm.write("res.company", [this.currentCompanyId], {
                "sp_announcement": this.announcement
            });
        } catch (error) {
            console.error("Error saving data:", error);
        }
    }
}

registry
    .category("actions")
    .add("sp_main_menu.action_open_main_menu", MenuAction);
