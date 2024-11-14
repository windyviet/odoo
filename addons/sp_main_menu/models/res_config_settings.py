from odoo import fields, models


class ResConfigSettings(models.TransientModel):
    _inherit = 'res.config.settings'

    sp_show_widgets = fields.Boolean(related='company_id.sp_show_widgets', readonly=False)
