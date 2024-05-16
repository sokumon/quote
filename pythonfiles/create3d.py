import json
import ast 
import os
with open('quote.txt', 'r') as file:
    file_contents = file.read()

from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support.ui import Select
from selenium.webdriver.support.wait import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.chrome.options import Options


prefs = {"download.default_directory" : os.path.join(os.getcwd(), 'models'),
    "download.prompt_for_download": False,
    "download.directory_upgrade": True,
    "safebrowsing.enabled": True
}    
options = Options()

options.add_argument("--allow-running-insecure-content")  # Allow insecure content
options.add_argument("--unsafely-treat-insecure-origin-as-secure=http://localhost:8000")
options.add_argument("--disable-features=InsecureDownloadWarnings")
options.add_experimental_option("prefs",prefs)
# # Set up the Chrome webdriver


# # Open the website



data = ast.literal_eval(file_contents)
words = []

print(type(data))
for word in data:
    
    words.append(word['text'])

driver = webdriver.Chrome(options=options)
words = ['plan', 'is', 'like', 'beautiful', 'tapestry.', 'of', 'human', 'is', 'that', 'get', 'ragged', 'colors.', 'get', 'beauty', 'that', 'would', 'whole', 'pattern', 'on', 'side,', 'does.']
for word in words:
    url = f"http://localhost:8000?word={word}"
    driver.implicitly_wait(100)
    driver.get(url)
    driver.implicitly_wait(100) 
driver.quit()


def list_files_without_extension(directory):
    # Check if directory exists
    if not os.path.isdir(directory):
        print(f"Directory '{directory}' does not exist.")
        return []

    # Get list of files in the directory
    files = os.listdir(directory)

    # Filter out only files with .gltf extension
    gltf_files = [file for file in files if file.endswith('.gltf')]

    # Remove the .gltf extension from filenames
    filenames_without_extension = [file[:-5] for file in gltf_files]

    return filenames_without_extension

# Example usage:
directory_path = os.path.join(os.getcwd(), 'models')
filenames = list_files_without_extension(directory_path)

print(len(filenames))
# print(words)
print(len(words))

new_words = list(set(filenames) - set(words))
print(new_words)



with open("quote.json", 'w') as file:
    # Write content to the file
    file.write(json.dumps(data))