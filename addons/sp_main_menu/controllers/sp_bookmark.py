from odoo import http
from odoo.http import request, route


class SpBookmark(http.Controller):
    @route('/web/sp_bookmark/data', methods=['POST'], type='json', auth='user')
    def sp_bookmark_data(self, **kwargs):
        return request.env['sp.bookmark'].search_read([('user_id', '=', request.session.uid)], [])

    @route('/web/sp_bookmark/add', methods=['POST'], type='json', auth='user')
    def sp_bookmark_add(self, **kwargs):
        new_bookmark = {
            'name': kwargs.get('name'),
            'type': 'menu',
            'window_action_id': kwargs.get('window_action_id'),
            'user_id': request.session.uid,
        }
        return request.env['sp.bookmark'].create(new_bookmark).id
