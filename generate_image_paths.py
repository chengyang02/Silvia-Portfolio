import os

def generate_image_paths(main_folder):
    image_paths = {}

    # Loop through each folder in the main directory
    for folder in os.listdir(main_folder):
        folder_path = os.path.join(main_folder, folder)
        
        # Check if the item is a folder
        if os.path.isdir(folder_path):
            # List all image files in the folder
            images = [os.path.join(folder_path, img) for img in os.listdir(folder_path)
                      if img.lower().endswith(('.png', '.jpg', '.jpeg', '.gif', '.heic'))]
            
            # Add folder and its images to the dictionary
            image_paths[folder] = images
    
    return image_paths

# Specify the main folder path containing the 16 subfolders
main_folder = 'pic'
image_paths = generate_image_paths(main_folder)

# Print the result
for folder, paths in image_paths.items():
    print(f"'{folder}': [")
    for path in paths:
        print(f"    '{path}',")
    print("],")
