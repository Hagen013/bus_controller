import os

settings_dir = os.path.dirname(__file__)

# Корневая директория проекта
ROOT_DIR = os.path.abspath(os.path.join(settings_dir, "..", "..",))

# Расположение статических файлов
STATIC_ROOT = './static'

# DEBUG-флаг для development-режима
DEBUG = True

# HOST и PORT
SANIC_HOST = '127.0.0.1'
SANIC_PORT = '8000'
