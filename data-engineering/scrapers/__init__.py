from .base_adapter import BaseAdapter
from .fandom_adapter import FandomAdapter
from .official_adapter import OfficialAdapter
from .wb_adapter import WBGamesAdapter
from .wikidata_adapter import WikidataAdapter
from .mobygames_adapter import MobyGamesAdapter
from .external_discovery import ExternalReferenceDiscovery

__all__ = [
    "BaseAdapter",
    "FandomAdapter",
    "OfficialAdapter",
    "WBGamesAdapter",
    "WikidataAdapter",
    "MobyGamesAdapter",
    "ExternalReferenceDiscovery"
]
