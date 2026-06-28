AUTHOR = 'Zhe Xun'
SITENAME = 'Recipe Lab'
SITEURL = ""
THEME = "pelican-themes/simple-bootstrap"
PATH = "content"
EXTRA_PATH_METADATA = {"extra/custom.css": {"path": "theme/css/custom.css"},}
THEME_TEMPLATES_OVERRIDES = ["templates"]
STATIC_PATHS = ['images']
PAGE_PATHS = ['pages']
ARTICLE_PATHS = ['recipes']
TIMEZONE = 'Asia/Singapore'

DEFAULT_LANG = 'en'

# Feed generation is usually not desired when developing
FEED_ALL_ATOM = None
CATEGORY_FEED_ATOM = None
TRANSLATION_FEED_ATOM = None
AUTHOR_FEED_ATOM = None
AUTHOR_FEED_RSS = None

# Blogroll
LINKS = (
    # ("Pelican", "https://getpelican.com/"),
    # ("Python.org", "https://www.python.org/"),
    # ("Jinja2", "https://palletsprojects.com/p/jinja/"),
    # ("You can modify those links in your config file", "#"),
)

# Social widget
SOCIAL = (
    # ("You can add links in your config file", "#"),
    # ("Another social link", "#"),
)

DEFAULT_PAGINATION = False

# Uncomment following line if you want document-relative URLs when developing
# RELATIVE_URLS = True
import json

# Custom Jinja filter
def parse_json(value):
    try:
        return json.loads(value)
    except:
        return []

# Register it with Jinja
JINJA_FILTERS = {
    'parse_json': parse_json
}