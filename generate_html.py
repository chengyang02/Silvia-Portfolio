import os

folder_path = "2024season1 opening"

# get all of the pics from the folder
image_files = [f for f in os.listdir(folder_path) if f.lower().endswith(('.jpg', '.jpeg', '.png', '.gif'))]

# Generate HTML <img> tage
html_tags = ""
for image_file in image_files:
    img_path = f"{folder_path}/{image_file}".replace(" ", "%20")  # 替换空格为 %20
    html_tags += f'<img src="{img_path}" class="slideshow-image">\n'

print(html_tags)
