{
    "name": "Main Menu",
    "version": "1.1.0",
    "summary": "Enhanced navigation module for Odoo Community Edition.",
    "description": """
        This module provides a centralized main menu for Odoo Community Edition, allowing users to quickly access core modules and enhance their workflow. 
        It features widget functionality for displaying the current date and posting announcements, which can be managed by administrators. 
        Users can create bookmarks for quick access to essential menus, as well as external links, improving overall navigation efficiency.
    """,
    "author": "Softparadox",
    "maintainer": "Softparadox",
    "website": "https://softparadox.com",
    "license": "LGPL-3",
    "category": "Softparadox/Softparadox",
    "depends": [
        "web",
    ],
    "data": [
        "security/ir.model.access.csv",
        "views/res_config_setting_views.xml",
        "views/sp_bookmark_views.xml",
        "views/sp_main_menu_views.xml",
    ],
    "assets": {
        "web.assets_backend": [
            "sp_main_menu/static/src/components/**/*",
        ],
    },
    "images": [
        "static/description/banner.png",
    ],
    "auto_install": True,
    "application": True,
    "installable": True,
}
