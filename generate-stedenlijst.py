import csv
import json
import re
import sys
import urllib.request

SOURCE_URL = "https://metatopos.dijkewijk.nl/metatopos-places.json"


def normalize_place_name(name: str) -> str:
    name = (name or "").strip()
    name = re.sub(r"\s+", " ", name)
    return name


def city_to_slug(place: str) -> str:
    slug = place.lower()
    slug = slug.replace(" ", "-")
    slug = re.sub(r"[^a-z0-9\-]", "", slug)
    return slug


def main():
    out_txt = "steden_nl.txt"
    out_csv = "plaatsen_nl.csv"

    print(f"Downloading: {SOURCE_URL}")
    with urllib.request.urlopen(SOURCE_URL) as resp:
        data = json.loads(resp.read().decode("utf-8"))

    places = data.get("places", [])
    if not isinstance(places, list):
        raise ValueError("Unexpected JSON: places is not a list")

    rows = []
    unique_names = set()

    for item in places:
        place = normalize_place_name(item.get("place"))
        if not place:
            continue

        municipality = normalize_place_name(item.get("municipality"))
        province = normalize_place_name(item.get("province"))
        placecode = (item.get("placecode") or "").strip()

        # Avoid duplicates in txt list; keep first occurrence
        if place not in unique_names:
            unique_names.add(place)

        rows.append(
            {
                "place": place,
                "slug": city_to_slug(place),
                "municipality": municipality,
                "province": province,
                "placecode": placecode,
            }
        )

    # Write sorted unique list
    sorted_names = sorted(unique_names, key=lambda s: s.lower())
    with open(out_txt, "w", encoding="utf-8") as f:
        for name in sorted_names:
            f.write(name + "\n")

    # Write full mapping CSV
    with open(out_csv, "w", encoding="utf-8", newline="") as f:
        writer = csv.DictWriter(
            f,
            fieldnames=["place", "slug", "municipality", "province", "placecode"],
        )
        writer.writeheader()
        for r in rows:
            writer.writerow(r)

    print(f"Done. Unique places: {len(sorted_names)}")
    print(f"Wrote: {out_txt}")
    print(f"Wrote: {out_csv}")


if __name__ == "__main__":
    sys.exit(main())
