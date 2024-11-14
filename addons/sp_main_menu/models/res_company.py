from odoo import fields, models


class ResCompany(models.Model):
    _inherit = 'res.company'

    sp_announcement = fields.Char(string='Announcement', size=140)
    sp_show_widgets = fields.Boolean(string='Show Widgets')
