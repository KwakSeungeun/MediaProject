import shutil

def removeFolder(directory):
    try:
        shutil.rmtree(directory)
    except OSError:
        print('Error: Removing directory.' + directory)