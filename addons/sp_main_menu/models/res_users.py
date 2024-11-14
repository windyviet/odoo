from odoo import fields, models


class ResUsers(models.Model):
    _inherit = 'res.users'

    sp_bookmark_ids = fields.One2many('sp.bookmark', 'user_id', 'Bookmarks')
