from multiprocessing import Process

from watchdog.observers import Observer
from watchdog.events import PatternMatchingEventHandler

# Hot-reloader
class Reloader:

    class Handler(PatternMatchingEventHandler):
        patterns = ["*.py", "*.html"]
        ignore_patterns = ["*.scss"]
        ignore_directories = False
        case_sensitive = False

        def __init__(self, reloader):
            self.reloader = reloader

        def on_any_event(self, event):
            self.reloader.reload()

    def __init__(self, directory, callback):
        self.observer = None
        self.process = None
        self.handler = Reloader.Handler(self)
        self.directory = directory
        self.callback = callback

    def watch(self, first=True):
        if first:
            self.reload()
        else:
            self.observer = Observer()
            self.observer.schedule(
                self.handler, self.directory, recursive=True)
            self.observer.start()

    def reload(self):
        if self.observer:
            self.observer.stop()
            self.process.terminate()
            self.process.join()
        try:
            self.process = Process(target=self.callback)
            self.process.start()
        finally:
            self.watch(first=False)