#!/usr/bin/env python3
"""
Simple script to create basic app icons for PWA
"""
from PIL import Image, ImageDraw, ImageFont
import os

def create_icon(size):
    # Create a new image with transparent background
    img = Image.new('RGBA', (size, size), (59, 130, 246, 255))  # Blue background
    draw = ImageDraw.Draw(img)

    # Try to use a system font, fallback to default
    try:
        font = ImageFont.truetype("/System/Library/Fonts/Arial.ttf", size//2)
    except:
        font = ImageFont.load_default()

    # Draw magic wand emoji
    emoji = "🪄"  # Magic wand
    bbox = font.getbbox(emoji)
    text_width = bbox[2] - bbox[0]
    text_height = bbox[3] - bbox[1]

    x = (size - text_width) // 2
    y = (size - text_height) // 2

    draw.text((x, y), emoji, font=font, fill=(255, 255, 255, 255))

    return img

def main():
    sizes = [72, 96, 128, 144, 152, 192, 384, 512]

    for size in sizes:
        icon = create_icon(size)
        filename = f"icon-{size}x{size}.png"
        icon.save(filename)
        print(f"Created {filename}")

if __name__ == "__main__":
    main()
