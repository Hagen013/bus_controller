from sanic import Sanic, response
from jinja2 import Environment, PackageLoader, select_autoescape
import time

from config.settings import base as settings
from reloader import Reloader

# Load the template environment with async support
template_env = Environment(
    loader=PackageLoader('app', 'templates'),
    autoescape=select_autoescape(['html', 'xml', 'js']),
    enable_async=True
)


app = Sanic(__name__)

# Load the template from file
template = template_env.get_template("index.html")


@app.route('/')
async def test(request):
    rendered_template = await template.render_async(
        knights='that say nih; asynchronously')
    return response.html(rendered_template)


def run_server(
        host=settings.SANIC_HOST,
        port=settings.SANIC_PORT,
        debug=settings.DEBUG):
    app.static('/static', settings.STATIC_ROOT)
    app.run(host, port, debug)


if __name__ == "__main__":
    if settings.DEBUG:
        Reloader(settings.ROOT_DIR, run_server).watch()
        while True:
            time.sleep(1)
    else:
        run_server()
    app.run(host="0.0.0.0", port=8000, debug=True)


