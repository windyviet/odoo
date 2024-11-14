from odoo import fields, models


class BookmarkBookMark(models.Model):
    _name = 'sp.bookmark'
    _description = 'Bookmark'
    _order = 'sequence, name'

    name = fields.Char(string='Name', required=True)
    type = fields.Selection([('url', 'URL'), ('menu', 'Menu')], string='Type', default='url', required=True)
    url = fields.Char(string='URL')
    target = fields.Selection([('_self', 'Current Tab'), ('_blank', 'New Tab')], default='_self')
    window_action_id = fields.Many2one('ir.actions.act_window', string='Menu')
    user_id = fields.Many2one('res.users', string='User', default=lambda self: self.env.user, required=True)
    sequence = fields.Integer()
