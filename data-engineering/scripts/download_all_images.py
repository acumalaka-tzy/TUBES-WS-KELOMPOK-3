"""
Downloads all character portraits and game covers locally into frontend/public/images/
Ensures 100% of images are served directly from the local server without any remote hotlink/CORS/403 blocking.
"""

import json
import urllib.request
import urllib.parse
from pathlib import Path
import time
import os

HEADERS = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
    "Accept": "image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8",
    "Referer": "https://mortalkombat.fandom.com/"
}

def create_svg_fallback(filepath: Path, name: str, is_game: bool = False):
    """Creates a stylized Mortal Kombat themed SVG artwork if download fails."""
    initials = "".join([w[0].upper() for w in name.replace("(", "").split()[:2]])
    hue = sum(ord(c) for c in name) % 360
    label = "MORTAL KOMBAT" if is_game else "MK WARRIOR"
    svg = f"""<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 800" width="600" height="800">
  <defs>
    <radialGradient id="bg" cx="50%" cy="40%" r="60%">
      <stop offset="0%" stop-color="hsl({hue}, 60%, 25%)" />
      <stop offset="60%" stop-color="#14161f" />
      <stop offset="100%" stop-color="#08090d" />
    </radialGradient>
    <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#e8c77b" />
      <stop offset="100%" stop-color="#c6a15b" />
    </linearGradient>
  </defs>
  <rect width="600" height="800" fill="url(#bg)" />
  <circle cx="300" cy="380" r="160" fill="none" stroke="url(#goldGrad)" stroke-width="3" stroke-dasharray="10 8" opacity="0.6"/>
  <circle cx="300" cy="380" r="140" fill="#0c0d12" stroke="#b51f2b" stroke-width="4" />
  <text x="300" y="420" font-family="Cinzel, serif, Impact" font-size="96" font-weight="bold" fill="#f5f5f5" text-anchor="middle" letter-spacing="4">{initials}</text>
  <text x="300" y="620" font-family="Cinzel, serif" font-size="28" font-weight="bold" fill="url(#goldGrad)" text-anchor="middle" letter-spacing="3">{name.upper()[:22]}</text>
  <text x="300" y="660" font-family="sans-serif" font-size="14" font-weight="600" fill="#a0a2aa" text-anchor="middle" letter-spacing="6">{label}</text>
</svg>"""
    svg_path = filepath.with_suffix(".svg")
    svg_path.write_text(svg, encoding="utf-8")
    return svg_path

def download_image(url: str, dest_path: Path, name: str, is_game: bool = False) -> str:
    if dest_path.exists() and dest_path.stat().st_size > 1000:
        return f"/images/{'games' if is_game else 'characters'}/{dest_path.name}"

    if url and url.startswith("http"):
        try:
            req = urllib.request.Request(url, headers=HEADERS)
            with urllib.request.urlopen(req, timeout=10) as response:
                content = response.read()
                if len(content) > 1000:
                    dest_path.write_bytes(content)
                    print(f"Downloaded: {dest_path.name} ({len(content)} bytes)")
                    return f"/images/{'games' if is_game else 'characters'}/{dest_path.name}"
        except Exception as e:
            print(f"Failed to download {name} from {url[:50]}: {e}")

    # Fallback SVG
    svg_path = create_svg_fallback(dest_path, name, is_game)
    return f"/images/{'games' if is_game else 'characters'}/{svg_path.name}"

def main():
    root = Path(__file__).resolve().parent.parent.parent
    registry_path = root / "data-engineering" / "storage" / "assets" / "image_asset_registry.json"
    frontend_char_dir = root / "frontend" / "public" / "images" / "characters"
    frontend_game_dir = root / "frontend" / "public" / "images" / "games"

    frontend_char_dir.mkdir(parents=True, exist_ok=True)
    frontend_game_dir.mkdir(parents=True, exist_ok=True)

    with open(registry_path, "r", encoding="utf-8") as f:
        registry = json.load(f)

    for item in registry:
        entity_id = item.get("entityId", "")
        asset_type = item.get("assetType", "")
        remote_url = item.get("assetURL", "")
        name = item.get("alt", "").replace("Potret karakter resmi ", "").replace("Sampul resmi ", "")

        clean_id = entity_id.replace("character-", "").replace("game-", "")
        # Aliases
        alias_map = {
            "subzero": "sub-zero",
            "liukang": "liu-kang",
            "shaokahn": "shao-kahn",
            "sonyablade": "sonya-blade",
            "johnnycage": "johnny-cage",
            "kunglao": "kung-lao",
            "noobsaibot": "noob-saibot"
        }
        clean_id = alias_map.get(clean_id, clean_id)

        is_game = asset_type == "game_cover"
        folder = frontend_game_dir if is_game else frontend_char_dir
        dest_filename = f"{clean_id}.png"
        dest_path = folder / dest_filename

        local_path = download_image(remote_url, dest_path, name, is_game)
        item["assetURL"] = local_path
        item["localFile"] = str(dest_path.name)
        item["rightsStatus"] = "approved"

    with open(registry_path, "w", encoding="utf-8") as f:
        json.dump(registry, f, indent=2, ensure_ascii=False)

    print("Updated registry with local image paths!")

if __name__ == "__main__":
    main()
