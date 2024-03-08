from djangorestframework_camel_case.render import CamelCaseJSONRenderer
import json


class UserRenderer(CamelCaseJSONRenderer):
    charset = 'utf-8'

    def render(self, data, accepted_media_type=None, renderer_context=None):
        # Call parent class's render method to convert to camelCase
        response = super().render(data, accepted_media_type, renderer_context)

        if 'ErrorDetail' in str(data):
            response = json.dumps({'errors': data})

        return response
