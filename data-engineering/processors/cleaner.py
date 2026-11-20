from typing import Dict, Any

class DataCleaner:
    """Cleans and normalizes raw scraped web pages."""

    def clean_text(self, text: str) -> str:
        if not text:
            return ""
        return " ".join(text.split()).strip()

    def clean_record(self, raw_record: Dict[str, Any]) -> Dict[str, Any]:
        return {
            "cleanedId": raw_record.get("pageId"),
            "sourceId": raw_record.get("sourceId"),
            "content": self.clean_text(raw_record.get("rawContent", ""))
        }
