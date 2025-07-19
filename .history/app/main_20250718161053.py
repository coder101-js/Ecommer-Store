import json
from random import randint, choice, sample
from urllib.parse import quote

# Sample data to generate fake sneakers
brands = ["Zyke", "Adynas", "PumaX", "Rebok", "Sneako", "Dripster"]
models = ["AirMax", "UltraRun", "BoostX", "Phantom", "FlexZoom", "StealthKick"]
colors = {
    "Red": "FF0000",
    "Black": "000000",
    "White": "FFFFFF",
    "Blue": "0000FF",
    "Green": "00FF00",
    "Grey": "808080",
    "Orange": "FFA500"
}

sizes = [6, 7, 8, 9, 10, 11, 12]
descriptions = [
    "High-performance running shoe with breathable mesh.",
    "Lightweight sneaker designed for daily wear.",
    "Limited edition sneaker for streetwear lovers.",
    "Performance-focused design with cushioned sole.",
    "Built for comfort and speed with sleek design.",
]

def generate_shoe():
    brand = choice(brands)
    model = choice(models)
    color_variants = sample(colors, k=3)
    product = {
        "name": f"{brand} {model}",
        "price": randint(80, 250),
        "availableSizes": sample(sizes, k=5),
        "description": choice(descriptions),
        "colors": [
            {
                "color": color,
                "image": f"https://placehold.co/400x400/{colors[color]}/FFFFFF?text={brand}+{model}"


            }
            for color in color_variants
        ],
        "stock": randint(5, 50),
        "category": "sneakers"
    }
    return product

# Generate 15 fake products
fake_shoes = [generate_shoe() for _ in range(15)]

# Save to a JSON file
file_path = "./fake_shoes.json"
with open(file_path, "w") as f:
    json.dump(fake_shoes, f, indent=4)

file_path
