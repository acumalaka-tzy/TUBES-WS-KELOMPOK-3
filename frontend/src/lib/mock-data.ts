/**
 * DATASET UTAMA MORTAL KOMBAT KNOWLEDGE NEXUS
 * Disinkronkan langsung dari pipeline Data Engineering (entities.json & relationships.json).
 * Berisi 61 Karakter, 23 Game Standalone, 101 Abilities, 20 Weapons, 10 Clans, dan 25 Events.
 */
import type {
  Ability,
  Character,
  CharacterVersion,
  EntityRef,
  EntityType,
  Game,
  Organization,
  SourceRef,
  StoryEvent,
  Timeline,
  Weapon,
} from "./types";

export const characters: Character[] = [
  {
    "id": "scorpion",
    "name": "Scorpion",
    "aliases": [
      "Hanzo Hasashi"
    ],
    "summary": "Resurrected Shirai Ryu ninja specter fueled by vengeance against those who exterminated his clan and family.",
    "biography": "Resurrected Shirai Ryu ninja specter fueled by vengeance against those who exterminated his clan and family.",
    "firstAppearance": {
      "id": "mk-1992",
      "type": "game",
      "name": "Mortal Kombat (1992)"
    },
    "species": {
      "id": "human",
      "type": "species",
      "name": "Specter / Human"
    },
    "realm": {
      "id": "earthrealm",
      "type": "location",
      "name": "Earthrealm"
    },
    "faction": "Shirai Ryu",
    "role": "Antihero",
    "popular": true,
    "image": {
      "assetId": "asset-scorpion-portrait",
      "assetURL": "/images/characters/scorpion.png",
      "assetType": "character_portrait",
      "entityId": "scorpion",
      "rightsStatus": "approved",
      "attribution": "Mortal Kombat \u00a9 Warner Bros. Games / NetherRealm Studios / Fandom Community",
      "alt": "Potret karakter resmi Scorpion"
    },
    "versions": [
      {
        "id": "scorpion-mk1-1992",
        "label": "Mortal Kombat (1992)",
        "gameId": "mk1-1992",
        "gameTitle": "Mortal Kombat (1992)",
        "timelineId": "original",
        "timelineName": "Original Timeline",
        "abilities": [
          {
            "id": "hellfire",
            "type": "ability",
            "name": "Hellfire Manipulation"
          },
          {
            "id": "move-spear",
            "type": "ability",
            "name": "Kunai Spear (Get Over Here!)"
          },
          {
            "id": "fatality-toasty",
            "type": "ability",
            "name": "Fatality: Toasty!"
          }
        ],
        "weapons": [
          {
            "id": "kunai-spear",
            "type": "weapon",
            "name": "Kunai Spear"
          }
        ],
        "organizations": [
          {
            "id": "shirai-ryu",
            "type": "organization",
            "name": "Shirai Ryu"
          }
        ],
        "image": {
          "assetId": "asset-scorpion-portrait",
          "assetURL": "/images/characters/scorpion.png",
          "assetType": "character_portrait",
          "entityId": "scorpion",
          "rightsStatus": "approved",
          "attribution": "Mortal Kombat \u00a9 Warner Bros. Games / NetherRealm Studios / Fandom Community",
          "alt": "Potret karakter resmi Scorpion"
        },
        "verificationStatus": "verified"
      },
      {
        "id": "scorpion-mk11-2019",
        "label": "Mortal Kombat 11",
        "gameId": "mk11-2019",
        "gameTitle": "Mortal Kombat 11",
        "timelineId": "reboot",
        "timelineName": "Reboot Timeline",
        "abilities": [
          {
            "id": "hellfire",
            "type": "ability",
            "name": "Hellfire Manipulation"
          },
          {
            "id": "move-spear",
            "type": "ability",
            "name": "Kunai Spear (Get Over Here!)"
          },
          {
            "id": "fatality-toasty",
            "type": "ability",
            "name": "Fatality: Toasty!"
          }
        ],
        "weapons": [
          {
            "id": "kunai-spear",
            "type": "weapon",
            "name": "Kunai Spear"
          }
        ],
        "organizations": [
          {
            "id": "shirai-ryu",
            "type": "organization",
            "name": "Shirai Ryu"
          }
        ],
        "image": {
          "assetId": "asset-scorpion-portrait",
          "assetURL": "/images/characters/scorpion.png",
          "assetType": "character_portrait",
          "entityId": "scorpion",
          "rightsStatus": "approved",
          "attribution": "Mortal Kombat \u00a9 Warner Bros. Games / NetherRealm Studios / Fandom Community",
          "alt": "Potret karakter resmi Scorpion"
        },
        "verificationStatus": "verified"
      },
      {
        "id": "scorpion-mk1-2023",
        "label": "Mortal Kombat 1 (2023)",
        "gameId": "mk1-2023",
        "gameTitle": "Mortal Kombat 1 (2023)",
        "timelineId": "new-era",
        "timelineName": "New Era",
        "abilities": [
          {
            "id": "hellfire",
            "type": "ability",
            "name": "Hellfire Manipulation"
          },
          {
            "id": "move-spear",
            "type": "ability",
            "name": "Kunai Spear (Get Over Here!)"
          }
        ],
        "weapons": [
          {
            "id": "kunai-spear",
            "type": "weapon",
            "name": "Kunai Spear"
          }
        ],
        "organizations": [
          {
            "id": "lin-kuei",
            "type": "organization",
            "name": "Lin Kuei"
          }
        ],
        "image": {
          "assetId": "asset-scorpion-portrait",
          "assetURL": "/images/characters/scorpion.png",
          "assetType": "character_portrait",
          "entityId": "scorpion",
          "rightsStatus": "approved",
          "attribution": "Mortal Kombat \u00a9 Warner Bros. Games / NetherRealm Studios / Fandom Community",
          "alt": "Potret karakter resmi Scorpion"
        },
        "verificationStatus": "verified"
      }
    ],
    "relationships": [
      {
        "type": "enemyOf",
        "label": "Musuh",
        "target": {
          "id": "sub-zero",
          "type": "character",
          "name": "sub-zero"
        },
        "context": "Original Timeline & Early Reboot",
        "verificationStatus": "verified"
      },
      {
        "type": "enemyOf",
        "label": "Musuh",
        "target": {
          "id": "quanchi",
          "type": "character",
          "name": "Quan Chi"
        },
        "context": "All Timelines",
        "verificationStatus": "verified"
      },
      {
        "type": "alliedWith",
        "label": "Sekutu",
        "target": {
          "id": "sub-zero",
          "type": "character",
          "name": "sub-zero"
        },
        "context": "Reboot Timeline (MKX & MK11)",
        "verificationStatus": "verified"
      }
    ],
    "relatedCharacters": [
      {
        "id": "quanchi",
        "type": "character",
        "name": "Quan Chi"
      },
      {
        "id": "sub-zero",
        "type": "character",
        "name": "sub-zero"
      }
    ],
    "sources": [
      {
        "id": "fandom-scorpion",
        "title": "Mortal Kombat Wiki \u2014 Scorpion",
        "url": "https://mortalkombat.fandom.com/wiki/Scorpion",
        "sourceType": "community-wiki",
        "verificationStatus": "verified"
      }
    ]
  },
  {
    "id": "sub-zero",
    "name": "Sub-Zero",
    "aliases": [
      "Kuai Liang / Bi-Han"
    ],
    "summary": "Grandmaster of the Lin Kuei possessing lethal cryomantic powers to flash-freeze moisture into weapons and barriers.",
    "biography": "Grandmaster of the Lin Kuei possessing lethal cryomantic powers to flash-freeze moisture into weapons and barriers.",
    "firstAppearance": {
      "id": "mk-1992",
      "type": "game",
      "name": "Mortal Kombat (1992)"
    },
    "species": {
      "id": "human",
      "type": "species",
      "name": "Cryomancer"
    },
    "realm": {
      "id": "earthrealm",
      "type": "location",
      "name": "Earthrealm"
    },
    "faction": "Lin Kuei",
    "role": "Villain",
    "popular": true,
    "image": {
      "assetId": "asset-subzero-portrait",
      "assetURL": "/images/characters/sub-zero.png",
      "assetType": "character_portrait",
      "entityId": "sub-zero",
      "rightsStatus": "approved",
      "attribution": "Mortal Kombat \u00a9 Warner Bros. Games / NetherRealm Studios / Fandom Community",
      "alt": "Potret karakter resmi Sub-Zero"
    },
    "versions": [
      {
        "id": "sub-zero-mk1-1992",
        "label": "Mortal Kombat (1992)",
        "gameId": "mk1-1992",
        "gameTitle": "Mortal Kombat (1992)",
        "timelineId": "original",
        "timelineName": "Original Timeline",
        "abilities": [
          {
            "id": "cryomancy",
            "type": "ability",
            "name": "Cryomancy"
          },
          {
            "id": "move-ice-freeze",
            "type": "ability",
            "name": "Deep Freeze"
          },
          {
            "id": "fatality-spine-rip",
            "type": "ability",
            "name": "Fatality: Spine Rip"
          }
        ],
        "weapons": [
          {
            "id": "kori-blade",
            "type": "weapon",
            "name": "K\u014dri Blade"
          }
        ],
        "organizations": [
          {
            "id": "lin-kuei",
            "type": "organization",
            "name": "Lin Kuei"
          }
        ],
        "image": {
          "assetId": "asset-subzero-portrait",
          "assetURL": "/images/characters/sub-zero.png",
          "assetType": "character_portrait",
          "entityId": "sub-zero",
          "rightsStatus": "approved",
          "attribution": "Mortal Kombat \u00a9 Warner Bros. Games / NetherRealm Studios / Fandom Community",
          "alt": "Potret karakter resmi Sub-Zero"
        },
        "verificationStatus": "verified"
      },
      {
        "id": "sub-zero-mk11-2019",
        "label": "Mortal Kombat 11",
        "gameId": "mk11-2019",
        "gameTitle": "Mortal Kombat 11",
        "timelineId": "reboot",
        "timelineName": "Reboot Timeline",
        "abilities": [
          {
            "id": "cryomancy",
            "type": "ability",
            "name": "Cryomancy"
          },
          {
            "id": "move-ice-freeze",
            "type": "ability",
            "name": "Deep Freeze"
          },
          {
            "id": "ice-slide",
            "type": "ability",
            "name": "Ice Slide"
          }
        ],
        "weapons": [
          {
            "id": "kori-blade",
            "type": "weapon",
            "name": "K\u014dri Blade"
          }
        ],
        "organizations": [
          {
            "id": "lin-kuei",
            "type": "organization",
            "name": "Lin Kuei"
          }
        ],
        "image": {
          "assetId": "asset-subzero-portrait",
          "assetURL": "/images/characters/sub-zero.png",
          "assetType": "character_portrait",
          "entityId": "sub-zero",
          "rightsStatus": "approved",
          "attribution": "Mortal Kombat \u00a9 Warner Bros. Games / NetherRealm Studios / Fandom Community",
          "alt": "Potret karakter resmi Sub-Zero"
        },
        "verificationStatus": "verified"
      },
      {
        "id": "sub-zero-mk1-2023",
        "label": "Mortal Kombat 1 (2023)",
        "gameId": "mk1-2023",
        "gameTitle": "Mortal Kombat 1 (2023)",
        "timelineId": "new-era",
        "timelineName": "New Era",
        "abilities": [
          {
            "id": "cryomancy",
            "type": "ability",
            "name": "Cryomancy"
          },
          {
            "id": "move-ice-freeze",
            "type": "ability",
            "name": "Deep Freeze"
          }
        ],
        "weapons": [
          {
            "id": "kori-blade",
            "type": "weapon",
            "name": "K\u014dri Blade"
          }
        ],
        "organizations": [
          {
            "id": "lin-kuei",
            "type": "organization",
            "name": "Lin Kuei"
          }
        ],
        "image": {
          "assetId": "asset-subzero-portrait",
          "assetURL": "/images/characters/sub-zero.png",
          "assetType": "character_portrait",
          "entityId": "sub-zero",
          "rightsStatus": "approved",
          "attribution": "Mortal Kombat \u00a9 Warner Bros. Games / NetherRealm Studios / Fandom Community",
          "alt": "Potret karakter resmi Sub-Zero"
        },
        "verificationStatus": "verified"
      }
    ],
    "relationships": [],
    "relatedCharacters": [],
    "sources": [
      {
        "id": "fandom-sub-zero",
        "title": "Mortal Kombat Wiki \u2014 Sub-Zero",
        "url": "https://mortalkombat.fandom.com/wiki/Sub-Zero",
        "sourceType": "community-wiki",
        "verificationStatus": "verified"
      }
    ]
  },
  {
    "id": "raiden",
    "name": "Raiden",
    "aliases": [
      "God of Thunder"
    ],
    "summary": "Immortal God of Thunder and ancient Protector of Earthrealm, wielding crackling lightning and temporal visions.",
    "biography": "Immortal God of Thunder and ancient Protector of Earthrealm, wielding crackling lightning and temporal visions.",
    "firstAppearance": {
      "id": "mk-1992",
      "type": "game",
      "name": "Mortal Kombat (1992)"
    },
    "species": {
      "id": "human",
      "type": "species",
      "name": "God"
    },
    "realm": {
      "id": "earthrealm",
      "type": "location",
      "name": "Earthrealm"
    },
    "faction": "White Lotus Society",
    "role": "Hero",
    "popular": true,
    "image": {
      "assetId": "asset-raiden-portrait",
      "assetURL": "/images/characters/raiden.png",
      "assetType": "character_portrait",
      "entityId": "raiden",
      "rightsStatus": "approved",
      "attribution": "Mortal Kombat \u00a9 Warner Bros. Games / NetherRealm Studios / Fandom Community",
      "alt": "Potret karakter resmi Raiden"
    },
    "versions": [
      {
        "id": "raiden-mk1-1992",
        "label": "Mortal Kombat (1992)",
        "gameId": "mk1-1992",
        "gameTitle": "Mortal Kombat (1992)",
        "timelineId": "original",
        "timelineName": "Original Timeline",
        "abilities": [
          {
            "id": "thunder-mastery",
            "type": "ability",
            "name": "Thunder Mastery"
          },
          {
            "id": "electric-fly",
            "type": "ability",
            "name": "Electric Fly (Superman)"
          },
          {
            "id": "teleportation",
            "type": "ability",
            "name": "Dimensional Teleportation"
          }
        ],
        "weapons": [],
        "organizations": [
          {
            "id": "white-lotus",
            "type": "organization",
            "name": "White Lotus Society"
          }
        ],
        "image": {
          "assetId": "asset-raiden-portrait",
          "assetURL": "/images/characters/raiden.png",
          "assetType": "character_portrait",
          "entityId": "raiden",
          "rightsStatus": "approved",
          "attribution": "Mortal Kombat \u00a9 Warner Bros. Games / NetherRealm Studios / Fandom Community",
          "alt": "Potret karakter resmi Raiden"
        },
        "verificationStatus": "verified"
      },
      {
        "id": "raiden-mk11-2019",
        "label": "Mortal Kombat 11",
        "gameId": "mk11-2019",
        "gameTitle": "Mortal Kombat 11",
        "timelineId": "reboot",
        "timelineName": "Reboot Timeline",
        "abilities": [
          {
            "id": "thunder-mastery",
            "type": "ability",
            "name": "Thunder Mastery"
          },
          {
            "id": "electric-fly",
            "type": "ability",
            "name": "Electric Fly (Superman)"
          }
        ],
        "weapons": [],
        "organizations": [
          {
            "id": "white-lotus",
            "type": "organization",
            "name": "White Lotus Society"
          }
        ],
        "image": {
          "assetId": "asset-raiden-portrait",
          "assetURL": "/images/characters/raiden.png",
          "assetType": "character_portrait",
          "entityId": "raiden",
          "rightsStatus": "approved",
          "attribution": "Mortal Kombat \u00a9 Warner Bros. Games / NetherRealm Studios / Fandom Community",
          "alt": "Potret karakter resmi Raiden"
        },
        "verificationStatus": "verified"
      },
      {
        "id": "raiden-mk1-2023",
        "label": "Mortal Kombat 1 (2023)",
        "gameId": "mk1-2023",
        "gameTitle": "Mortal Kombat 1 (2023)",
        "timelineId": "new-era",
        "timelineName": "New Era",
        "abilities": [
          {
            "id": "thunder-mastery",
            "type": "ability",
            "name": "Thunder Mastery"
          }
        ],
        "weapons": [],
        "organizations": [
          {
            "id": "white-lotus",
            "type": "organization",
            "name": "White Lotus Society"
          }
        ],
        "image": {
          "assetId": "asset-raiden-portrait",
          "assetURL": "/images/characters/raiden.png",
          "assetType": "character_portrait",
          "entityId": "raiden",
          "rightsStatus": "approved",
          "attribution": "Mortal Kombat \u00a9 Warner Bros. Games / NetherRealm Studios / Fandom Community",
          "alt": "Potret karakter resmi Raiden"
        },
        "verificationStatus": "verified"
      }
    ],
    "relationships": [
      {
        "type": "enemyOf",
        "label": "Musuh",
        "target": {
          "id": "shinnok",
          "type": "character",
          "name": "Shinnok"
        },
        "context": "All Timelines",
        "verificationStatus": "verified"
      },
      {
        "type": "alliedWith",
        "label": "Sekutu",
        "target": {
          "id": "liu-kang",
          "type": "character",
          "name": "liu-kang"
        },
        "context": "Original & Reboot Timelines",
        "verificationStatus": "verified"
      }
    ],
    "relatedCharacters": [
      {
        "id": "liu-kang",
        "type": "character",
        "name": "liu-kang"
      },
      {
        "id": "shinnok",
        "type": "character",
        "name": "Shinnok"
      }
    ],
    "sources": [
      {
        "id": "fandom-raiden",
        "title": "Mortal Kombat Wiki \u2014 Raiden",
        "url": "https://mortalkombat.fandom.com/wiki/Raiden",
        "sourceType": "community-wiki",
        "verificationStatus": "verified"
      }
    ]
  },
  {
    "id": "liu-kang",
    "name": "Liu Kang",
    "aliases": [
      "Fire God Liu Kang"
    ],
    "summary": "Shaolin monk who won four consecutive Mortal Kombat tournaments, later ascending to become the Fire God and Architect of the New Era.",
    "biography": "Shaolin monk who won four consecutive Mortal Kombat tournaments, later ascending to become the Fire God and Architect of the New Era.",
    "firstAppearance": {
      "id": "mk-1992",
      "type": "game",
      "name": "Mortal Kombat (1992)"
    },
    "species": {
      "id": "human",
      "type": "species",
      "name": "God / Human"
    },
    "realm": {
      "id": "earthrealm",
      "type": "location",
      "name": "Earthrealm"
    },
    "faction": "White Lotus Society",
    "role": "Hero",
    "popular": true,
    "image": {
      "assetId": "asset-liukang-portrait",
      "assetURL": "/images/characters/liu-kang.png",
      "assetType": "character_portrait",
      "entityId": "liu-kang",
      "rightsStatus": "approved",
      "attribution": "Mortal Kombat \u00a9 Warner Bros. Games / NetherRealm Studios / Fandom Community",
      "alt": "Potret karakter resmi Liu Kang"
    },
    "versions": [
      {
        "id": "liu-kang-mk1-1992",
        "label": "Mortal Kombat (1992)",
        "gameId": "mk1-1992",
        "gameTitle": "Mortal Kombat (1992)",
        "timelineId": "original",
        "timelineName": "Original Timeline",
        "abilities": [
          {
            "id": "fireball-dragon",
            "type": "ability",
            "name": "Dragon Fireball"
          },
          {
            "id": "move-bicycle-kick",
            "type": "ability",
            "name": "Bicycle Kick"
          },
          {
            "id": "fatality-dragon-bite",
            "type": "ability",
            "name": "Fatality: Dragon Feast"
          }
        ],
        "weapons": [],
        "organizations": [
          {
            "id": "white-lotus",
            "type": "organization",
            "name": "White Lotus Society"
          }
        ],
        "image": {
          "assetId": "asset-liukang-portrait",
          "assetURL": "/images/characters/liu-kang.png",
          "assetType": "character_portrait",
          "entityId": "liu-kang",
          "rightsStatus": "approved",
          "attribution": "Mortal Kombat \u00a9 Warner Bros. Games / NetherRealm Studios / Fandom Community",
          "alt": "Potret karakter resmi Liu Kang"
        },
        "verificationStatus": "verified"
      },
      {
        "id": "liu-kang-mk11-2019",
        "label": "Mortal Kombat 11",
        "gameId": "mk11-2019",
        "gameTitle": "Mortal Kombat 11",
        "timelineId": "reboot",
        "timelineName": "Reboot Timeline",
        "abilities": [
          {
            "id": "fireball-dragon",
            "type": "ability",
            "name": "Dragon Fireball"
          },
          {
            "id": "move-bicycle-kick",
            "type": "ability",
            "name": "Bicycle Kick"
          },
          {
            "id": "thunder-mastery",
            "type": "ability",
            "name": "Thunder Mastery"
          }
        ],
        "weapons": [],
        "organizations": [
          {
            "id": "white-lotus",
            "type": "organization",
            "name": "White Lotus Society"
          }
        ],
        "image": {
          "assetId": "asset-liukang-portrait",
          "assetURL": "/images/characters/liu-kang.png",
          "assetType": "character_portrait",
          "entityId": "liu-kang",
          "rightsStatus": "approved",
          "attribution": "Mortal Kombat \u00a9 Warner Bros. Games / NetherRealm Studios / Fandom Community",
          "alt": "Potret karakter resmi Liu Kang"
        },
        "verificationStatus": "verified"
      },
      {
        "id": "liu-kang-mk1-2023",
        "label": "Mortal Kombat 1 (2023)",
        "gameId": "mk1-2023",
        "gameTitle": "Mortal Kombat 1 (2023)",
        "timelineId": "new-era",
        "timelineName": "New Era",
        "abilities": [
          {
            "id": "fireball-dragon",
            "type": "ability",
            "name": "Dragon Fireball"
          },
          {
            "id": "thunder-mastery",
            "type": "ability",
            "name": "Thunder Mastery"
          }
        ],
        "weapons": [],
        "organizations": [
          {
            "id": "white-lotus",
            "type": "organization",
            "name": "White Lotus Society"
          }
        ],
        "image": {
          "assetId": "asset-liukang-portrait",
          "assetURL": "/images/characters/liu-kang.png",
          "assetType": "character_portrait",
          "entityId": "liu-kang",
          "rightsStatus": "approved",
          "attribution": "Mortal Kombat \u00a9 Warner Bros. Games / NetherRealm Studios / Fandom Community",
          "alt": "Potret karakter resmi Liu Kang"
        },
        "verificationStatus": "verified"
      }
    ],
    "relationships": [],
    "relatedCharacters": [],
    "sources": [
      {
        "id": "fandom-liu-kang",
        "title": "Mortal Kombat Wiki \u2014 Liu Kang",
        "url": "https://mortalkombat.fandom.com/wiki/Liu_Kang",
        "sourceType": "community-wiki",
        "verificationStatus": "verified"
      }
    ]
  },
  {
    "id": "kitana",
    "name": "Kitana",
    "aliases": [
      "Kitana Kahn"
    ],
    "summary": "10,000-year-old royal princess of Edenia who broke free from Shao Kahn's control to lead Outworld as Kitana Kahn.",
    "biography": "10,000-year-old royal princess of Edenia who broke free from Shao Kahn's control to lead Outworld as Kitana Kahn.",
    "firstAppearance": {
      "id": "mk-1992",
      "type": "game",
      "name": "Mortal Kombat (1992)"
    },
    "species": {
      "id": "human",
      "type": "species",
      "name": "Edenian"
    },
    "realm": {
      "id": "edenia",
      "type": "location",
      "name": "Edenia"
    },
    "faction": "Neutral",
    "role": "Hero",
    "popular": true,
    "image": {
      "assetId": "asset-kitana-portrait",
      "assetURL": "/images/characters/kitana.png",
      "assetType": "character_portrait",
      "entityId": "kitana",
      "rightsStatus": "approved",
      "attribution": "Mortal Kombat \u00a9 Warner Bros. Games / NetherRealm Studios / Fandom Community",
      "alt": "Potret karakter resmi Kitana"
    },
    "versions": [
      {
        "id": "kitana-mk2-1993",
        "label": "Mortal Kombat II",
        "gameId": "mk2-1993",
        "gameTitle": "Mortal Kombat II",
        "timelineId": "original",
        "timelineName": "Original Timeline",
        "abilities": [
          {
            "id": "move-fan-lift",
            "type": "ability",
            "name": "Fan Lift"
          },
          {
            "id": "fatality-fan-decapitation",
            "type": "ability",
            "name": "Fatality: Decapitating Fans"
          },
          {
            "id": "move-square-wave",
            "type": "ability",
            "name": "Square Wave Flight"
          }
        ],
        "weapons": [
          {
            "id": "steel-fans",
            "type": "weapon",
            "name": "Steel War Fans"
          }
        ],
        "organizations": [],
        "image": {
          "assetId": "asset-kitana-portrait",
          "assetURL": "/images/characters/kitana.png",
          "assetType": "character_portrait",
          "entityId": "kitana",
          "rightsStatus": "approved",
          "attribution": "Mortal Kombat \u00a9 Warner Bros. Games / NetherRealm Studios / Fandom Community",
          "alt": "Potret karakter resmi Kitana"
        },
        "verificationStatus": "verified"
      },
      {
        "id": "kitana-mk11-2019",
        "label": "Mortal Kombat 11",
        "gameId": "mk11-2019",
        "gameTitle": "Mortal Kombat 11",
        "timelineId": "reboot",
        "timelineName": "Reboot Timeline",
        "abilities": [
          {
            "id": "move-fan-lift",
            "type": "ability",
            "name": "Fan Lift"
          },
          {
            "id": "fatality-fan-decapitation",
            "type": "ability",
            "name": "Fatality: Decapitating Fans"
          }
        ],
        "weapons": [
          {
            "id": "steel-fans",
            "type": "weapon",
            "name": "Steel War Fans"
          }
        ],
        "organizations": [],
        "image": {
          "assetId": "asset-kitana-portrait",
          "assetURL": "/images/characters/kitana.png",
          "assetType": "character_portrait",
          "entityId": "kitana",
          "rightsStatus": "approved",
          "attribution": "Mortal Kombat \u00a9 Warner Bros. Games / NetherRealm Studios / Fandom Community",
          "alt": "Potret karakter resmi Kitana"
        },
        "verificationStatus": "verified"
      }
    ],
    "relationships": [
      {
        "type": "enemyOf",
        "label": "Musuh",
        "target": {
          "id": "shao-kahn",
          "type": "character",
          "name": "shao-kahn"
        },
        "context": "Reboot Timeline",
        "verificationStatus": "verified"
      }
    ],
    "relatedCharacters": [
      {
        "id": "shao-kahn",
        "type": "character",
        "name": "shao-kahn"
      }
    ],
    "sources": [
      {
        "id": "fandom-kitana",
        "title": "Mortal Kombat Wiki \u2014 Kitana",
        "url": "https://mortalkombat.fandom.com/wiki/Kitana",
        "sourceType": "community-wiki",
        "verificationStatus": "verified"
      }
    ]
  },
  {
    "id": "mileena",
    "name": "Mileena",
    "aliases": [
      "Empress Mileena"
    ],
    "summary": "A savage genetic clone created in Shang Tsung's Flesh Pits combining Edenian royal DNA with ferocious Tarkatan physiology.",
    "biography": "A savage genetic clone created in Shang Tsung's Flesh Pits combining Edenian royal DNA with ferocious Tarkatan physiology.",
    "firstAppearance": {
      "id": "mk-1992",
      "type": "game",
      "name": "Mortal Kombat (1992)"
    },
    "species": {
      "id": "human",
      "type": "species",
      "name": "Edenian / Tarkatan Hybrid"
    },
    "realm": {
      "id": "outworld",
      "type": "location",
      "name": "Outworld"
    },
    "faction": "Neutral",
    "role": "Villain",
    "popular": true,
    "image": {
      "assetId": "asset-mileena-portrait",
      "assetURL": "/images/characters/mileena.png",
      "assetType": "character_portrait",
      "entityId": "mileena",
      "rightsStatus": "approved",
      "attribution": "Mortal Kombat \u00a9 Warner Bros. Games / NetherRealm Studios / Fandom Community",
      "alt": "Potret karakter resmi Mileena"
    },
    "versions": [
      {
        "id": "mileena-mk2-1993",
        "label": "Mortal Kombat II",
        "gameId": "mk2-1993",
        "gameTitle": "Mortal Kombat II",
        "timelineId": "original",
        "timelineName": "Original Timeline",
        "abilities": [
          {
            "id": "teleportation",
            "type": "ability",
            "name": "Dimensional Teleportation"
          }
        ],
        "weapons": [
          {
            "id": "sai-daggers",
            "type": "weapon",
            "name": "Twin Sai Daggers"
          }
        ],
        "organizations": [],
        "image": {
          "assetId": "asset-mileena-portrait",
          "assetURL": "/images/characters/mileena.png",
          "assetType": "character_portrait",
          "entityId": "mileena",
          "rightsStatus": "approved",
          "attribution": "Mortal Kombat \u00a9 Warner Bros. Games / NetherRealm Studios / Fandom Community",
          "alt": "Potret karakter resmi Mileena"
        },
        "verificationStatus": "verified"
      },
      {
        "id": "mileena-mkx-2015",
        "label": "Mortal Kombat X",
        "gameId": "mkx-2015",
        "gameTitle": "Mortal Kombat X",
        "timelineId": "reboot",
        "timelineName": "Reboot Timeline",
        "abilities": [
          {
            "id": "teleportation",
            "type": "ability",
            "name": "Dimensional Teleportation"
          }
        ],
        "weapons": [
          {
            "id": "sai-daggers",
            "type": "weapon",
            "name": "Twin Sai Daggers"
          }
        ],
        "organizations": [],
        "image": {
          "assetId": "asset-mileena-portrait",
          "assetURL": "/images/characters/mileena.png",
          "assetType": "character_portrait",
          "entityId": "mileena",
          "rightsStatus": "approved",
          "attribution": "Mortal Kombat \u00a9 Warner Bros. Games / NetherRealm Studios / Fandom Community",
          "alt": "Potret karakter resmi Mileena"
        },
        "verificationStatus": "verified"
      },
      {
        "id": "mileena-mk1-2023",
        "label": "Mortal Kombat 1 (2023)",
        "gameId": "mk1-2023",
        "gameTitle": "Mortal Kombat 1 (2023)",
        "timelineId": "new-era",
        "timelineName": "New Era",
        "abilities": [
          {
            "id": "teleportation",
            "type": "ability",
            "name": "Dimensional Teleportation"
          }
        ],
        "weapons": [
          {
            "id": "sai-daggers",
            "type": "weapon",
            "name": "Twin Sai Daggers"
          }
        ],
        "organizations": [],
        "image": {
          "assetId": "asset-mileena-portrait",
          "assetURL": "/images/characters/mileena.png",
          "assetType": "character_portrait",
          "entityId": "mileena",
          "rightsStatus": "approved",
          "attribution": "Mortal Kombat \u00a9 Warner Bros. Games / NetherRealm Studios / Fandom Community",
          "alt": "Potret karakter resmi Mileena"
        },
        "verificationStatus": "verified"
      }
    ],
    "relationships": [],
    "relatedCharacters": [],
    "sources": [
      {
        "id": "fandom-mileena",
        "title": "Mortal Kombat Wiki \u2014 Mileena",
        "url": "https://mortalkombat.fandom.com/wiki/Mileena",
        "sourceType": "community-wiki",
        "verificationStatus": "verified"
      }
    ]
  },
  {
    "id": "johnny-cage",
    "name": "Johnny Cage",
    "aliases": [
      "John Carlton"
    ],
    "summary": "Hollywood martial arts superstar possessing hereditary Mediterranean warrior heritage granting mystical green kinetic shields.",
    "biography": "Hollywood martial arts superstar possessing hereditary Mediterranean warrior heritage granting mystical green kinetic shields.",
    "firstAppearance": {
      "id": "mk-1992",
      "type": "game",
      "name": "Mortal Kombat (1992)"
    },
    "species": {
      "id": "human",
      "type": "species",
      "name": "Human"
    },
    "realm": {
      "id": "earthrealm",
      "type": "location",
      "name": "Earthrealm"
    },
    "faction": "Special Forces",
    "role": "Hero",
    "popular": true,
    "image": {
      "assetId": "asset-johnnycage-portrait",
      "assetURL": "/images/characters/johnny-cage.png",
      "assetType": "character_portrait",
      "entityId": "johnny-cage",
      "rightsStatus": "approved",
      "attribution": "Mortal Kombat \u00a9 Warner Bros. Games / NetherRealm Studios / Fandom Community",
      "alt": "Potret karakter resmi Johnny Cage"
    },
    "versions": [
      {
        "id": "johnny-cage-mk1-1992",
        "label": "Mortal Kombat (1992)",
        "gameId": "mk1-1992",
        "gameTitle": "Mortal Kombat (1992)",
        "timelineId": "original",
        "timelineName": "Original Timeline",
        "abilities": [
          {
            "id": "move-shadow-kick",
            "type": "ability",
            "name": "Shadow Kick"
          },
          {
            "id": "move-nut-punch",
            "type": "ability",
            "name": "Nut Punch"
          }
        ],
        "weapons": [],
        "organizations": [
          {
            "id": "special-forces",
            "type": "organization",
            "name": "Special Forces"
          }
        ],
        "image": {
          "assetId": "asset-johnnycage-portrait",
          "assetURL": "/images/characters/johnny-cage.png",
          "assetType": "character_portrait",
          "entityId": "johnny-cage",
          "rightsStatus": "approved",
          "attribution": "Mortal Kombat \u00a9 Warner Bros. Games / NetherRealm Studios / Fandom Community",
          "alt": "Potret karakter resmi Johnny Cage"
        },
        "verificationStatus": "verified"
      },
      {
        "id": "johnny-cage-mk11-2019",
        "label": "Mortal Kombat 11",
        "gameId": "mk11-2019",
        "gameTitle": "Mortal Kombat 11",
        "timelineId": "reboot",
        "timelineName": "Reboot Timeline",
        "abilities": [
          {
            "id": "move-shadow-kick",
            "type": "ability",
            "name": "Shadow Kick"
          },
          {
            "id": "move-nut-punch",
            "type": "ability",
            "name": "Nut Punch"
          }
        ],
        "weapons": [],
        "organizations": [
          {
            "id": "special-forces",
            "type": "organization",
            "name": "Special Forces"
          }
        ],
        "image": {
          "assetId": "asset-johnnycage-portrait",
          "assetURL": "/images/characters/johnny-cage.png",
          "assetType": "character_portrait",
          "entityId": "johnny-cage",
          "rightsStatus": "approved",
          "attribution": "Mortal Kombat \u00a9 Warner Bros. Games / NetherRealm Studios / Fandom Community",
          "alt": "Potret karakter resmi Johnny Cage"
        },
        "verificationStatus": "verified"
      }
    ],
    "relationships": [],
    "relatedCharacters": [],
    "sources": [
      {
        "id": "fandom-johnny-cage",
        "title": "Mortal Kombat Wiki \u2014 Johnny Cage",
        "url": "https://mortalkombat.fandom.com/wiki/Johnny_Cage",
        "sourceType": "community-wiki",
        "verificationStatus": "verified"
      }
    ]
  },
  {
    "id": "sonya-blade",
    "name": "Sonya Blade",
    "aliases": [
      "General Blade"
    ],
    "summary": "Commanding General of Earthrealm Special Forces, relentlessly hunting Kano and the Black Dragon with high-tech military ordinance.",
    "biography": "Commanding General of Earthrealm Special Forces, relentlessly hunting Kano and the Black Dragon with high-tech military ordinance.",
    "firstAppearance": {
      "id": "mk-1992",
      "type": "game",
      "name": "Mortal Kombat (1992)"
    },
    "species": {
      "id": "human",
      "type": "species",
      "name": "Human"
    },
    "realm": {
      "id": "earthrealm",
      "type": "location",
      "name": "Earthrealm"
    },
    "faction": "Special Forces",
    "role": "Hero",
    "popular": false,
    "image": {
      "assetId": "asset-sonyablade-portrait",
      "assetURL": "/images/characters/sonya-blade.png",
      "assetType": "character_portrait",
      "entityId": "sonya-blade",
      "rightsStatus": "approved",
      "attribution": "Mortal Kombat \u00a9 Warner Bros. Games / NetherRealm Studios / Fandom Community",
      "alt": "Potret karakter resmi Sonya Blade"
    },
    "versions": [
      {
        "id": "sonya-blade-mk1-1992",
        "label": "Mortal Kombat (1992)",
        "gameId": "mk1-1992",
        "gameTitle": "Mortal Kombat (1992)",
        "timelineId": "original",
        "timelineName": "Original Timeline",
        "abilities": [
          {
            "id": "move-ring-toss",
            "type": "ability",
            "name": "Energy Ring Toss"
          },
          {
            "id": "fatality-kiss-of-death",
            "type": "ability",
            "name": "Fatality: Kiss of Death"
          }
        ],
        "weapons": [],
        "organizations": [
          {
            "id": "special-forces",
            "type": "organization",
            "name": "Special Forces"
          }
        ],
        "image": {
          "assetId": "asset-sonyablade-portrait",
          "assetURL": "/images/characters/sonya-blade.png",
          "assetType": "character_portrait",
          "entityId": "sonya-blade",
          "rightsStatus": "approved",
          "attribution": "Mortal Kombat \u00a9 Warner Bros. Games / NetherRealm Studios / Fandom Community",
          "alt": "Potret karakter resmi Sonya Blade"
        },
        "verificationStatus": "verified"
      },
      {
        "id": "sonya-blade-mk11-2019",
        "label": "Mortal Kombat 11",
        "gameId": "mk11-2019",
        "gameTitle": "Mortal Kombat 11",
        "timelineId": "reboot",
        "timelineName": "Reboot Timeline",
        "abilities": [
          {
            "id": "move-ring-toss",
            "type": "ability",
            "name": "Energy Ring Toss"
          },
          {
            "id": "fatality-kiss-of-death",
            "type": "ability",
            "name": "Fatality: Kiss of Death"
          }
        ],
        "weapons": [],
        "organizations": [
          {
            "id": "special-forces",
            "type": "organization",
            "name": "Special Forces"
          }
        ],
        "image": {
          "assetId": "asset-sonyablade-portrait",
          "assetURL": "/images/characters/sonya-blade.png",
          "assetType": "character_portrait",
          "entityId": "sonya-blade",
          "rightsStatus": "approved",
          "attribution": "Mortal Kombat \u00a9 Warner Bros. Games / NetherRealm Studios / Fandom Community",
          "alt": "Potret karakter resmi Sonya Blade"
        },
        "verificationStatus": "verified"
      }
    ],
    "relationships": [
      {
        "type": "enemyOf",
        "label": "Musuh",
        "target": {
          "id": "kano",
          "type": "character",
          "name": "Kano"
        },
        "context": "All Timelines",
        "verificationStatus": "verified"
      }
    ],
    "relatedCharacters": [
      {
        "id": "kano",
        "type": "character",
        "name": "Kano"
      }
    ],
    "sources": [
      {
        "id": "fandom-sonya-blade",
        "title": "Mortal Kombat Wiki \u2014 Sonya Blade",
        "url": "https://mortalkombat.fandom.com/wiki/Sonya_Blade",
        "sourceType": "community-wiki",
        "verificationStatus": "verified"
      }
    ]
  },
  {
    "id": "jax",
    "name": "Jax Briggs",
    "aliases": [
      "Major Jackson Briggs"
    ],
    "summary": "Decorated Special Forces commander outfitted with titanium bionic cyber arms capable of generating devastating seismic shockwaves.",
    "biography": "Decorated Special Forces commander outfitted with titanium bionic cyber arms capable of generating devastating seismic shockwaves.",
    "firstAppearance": {
      "id": "mk-1992",
      "type": "game",
      "name": "Mortal Kombat (1992)"
    },
    "species": {
      "id": "human",
      "type": "species",
      "name": "Human Cyborg"
    },
    "realm": {
      "id": "earthrealm",
      "type": "location",
      "name": "Earthrealm"
    },
    "faction": "Special Forces",
    "role": "Hero",
    "popular": false,
    "image": {
      "assetId": "asset-jax-portrait",
      "assetURL": "/images/characters/jax.png",
      "assetType": "character_portrait",
      "entityId": "jax",
      "rightsStatus": "approved",
      "attribution": "Mortal Kombat \u00a9 Warner Bros. Games / NetherRealm Studios / Fandom Community",
      "alt": "Potret karakter resmi Jax Briggs"
    },
    "versions": [
      {
        "id": "jax-mk2-1993",
        "label": "Mortal Kombat II",
        "gameId": "mk2-1993",
        "gameTitle": "Mortal Kombat II",
        "timelineId": "original",
        "timelineName": "Original Timeline",
        "abilities": [
          {
            "id": "move-ground-pound",
            "type": "ability",
            "name": "Ground Pound"
          },
          {
            "id": "move-air-throw",
            "type": "ability",
            "name": "Aerial Combat Throw"
          }
        ],
        "weapons": [
          {
            "id": "cybernetic-arms",
            "type": "weapon",
            "name": "Bionic Cyber Arms"
          }
        ],
        "organizations": [
          {
            "id": "special-forces",
            "type": "organization",
            "name": "Special Forces"
          }
        ],
        "image": {
          "assetId": "asset-jax-portrait",
          "assetURL": "/images/characters/jax.png",
          "assetType": "character_portrait",
          "entityId": "jax",
          "rightsStatus": "approved",
          "attribution": "Mortal Kombat \u00a9 Warner Bros. Games / NetherRealm Studios / Fandom Community",
          "alt": "Potret karakter resmi Jax Briggs"
        },
        "verificationStatus": "verified"
      },
      {
        "id": "jax-mk11-2019",
        "label": "Mortal Kombat 11",
        "gameId": "mk11-2019",
        "gameTitle": "Mortal Kombat 11",
        "timelineId": "reboot",
        "timelineName": "Reboot Timeline",
        "abilities": [
          {
            "id": "move-ground-pound",
            "type": "ability",
            "name": "Ground Pound"
          },
          {
            "id": "move-air-throw",
            "type": "ability",
            "name": "Aerial Combat Throw"
          }
        ],
        "weapons": [
          {
            "id": "cybernetic-arms",
            "type": "weapon",
            "name": "Bionic Cyber Arms"
          }
        ],
        "organizations": [
          {
            "id": "special-forces",
            "type": "organization",
            "name": "Special Forces"
          }
        ],
        "image": {
          "assetId": "asset-jax-portrait",
          "assetURL": "/images/characters/jax.png",
          "assetType": "character_portrait",
          "entityId": "jax",
          "rightsStatus": "approved",
          "attribution": "Mortal Kombat \u00a9 Warner Bros. Games / NetherRealm Studios / Fandom Community",
          "alt": "Potret karakter resmi Jax Briggs"
        },
        "verificationStatus": "verified"
      }
    ],
    "relationships": [],
    "relatedCharacters": [],
    "sources": [
      {
        "id": "fandom-jax",
        "title": "Mortal Kombat Wiki \u2014 Jax Briggs",
        "url": "https://mortalkombat.fandom.com/wiki/Jax_Briggs",
        "sourceType": "community-wiki",
        "verificationStatus": "verified"
      }
    ]
  },
  {
    "id": "kung-lao",
    "name": "Kung Lao",
    "aliases": [
      "The Razor-Hat Monk"
    ],
    "summary": "Shaolin pacifist warrior descendant of the Great Kung Lao, master of whirlwind kicks and a razor-brimmed throwing hat.",
    "biography": "Shaolin pacifist warrior descendant of the Great Kung Lao, master of whirlwind kicks and a razor-brimmed throwing hat.",
    "firstAppearance": {
      "id": "mk-1992",
      "type": "game",
      "name": "Mortal Kombat (1992)"
    },
    "species": {
      "id": "human",
      "type": "species",
      "name": "Human"
    },
    "realm": {
      "id": "earthrealm",
      "type": "location",
      "name": "Earthrealm"
    },
    "faction": "White Lotus Society",
    "role": "Villain",
    "popular": false,
    "image": {
      "assetId": "asset-kunglao-portrait",
      "assetURL": "/images/characters/kung-lao.png",
      "assetType": "character_portrait",
      "entityId": "kung-lao",
      "rightsStatus": "approved",
      "attribution": "Mortal Kombat \u00a9 Warner Bros. Games / NetherRealm Studios / Fandom Community",
      "alt": "Potret karakter resmi Kung Lao"
    },
    "versions": [
      {
        "id": "kung-lao-mk2-1993",
        "label": "Mortal Kombat II",
        "gameId": "mk2-1993",
        "gameTitle": "Mortal Kombat II",
        "timelineId": "original",
        "timelineName": "Original Timeline",
        "abilities": [
          {
            "id": "move-hat-throw",
            "type": "ability",
            "name": "Razor Rim Hat Toss"
          },
          {
            "id": "move-wind-tornado",
            "type": "ability",
            "name": "Wind Tornado Vortex"
          },
          {
            "id": "teleportation",
            "type": "ability",
            "name": "Dimensional Teleportation"
          }
        ],
        "weapons": [],
        "organizations": [
          {
            "id": "white-lotus",
            "type": "organization",
            "name": "White Lotus Society"
          }
        ],
        "image": {
          "assetId": "asset-kunglao-portrait",
          "assetURL": "/images/characters/kung-lao.png",
          "assetType": "character_portrait",
          "entityId": "kung-lao",
          "rightsStatus": "approved",
          "attribution": "Mortal Kombat \u00a9 Warner Bros. Games / NetherRealm Studios / Fandom Community",
          "alt": "Potret karakter resmi Kung Lao"
        },
        "verificationStatus": "verified"
      },
      {
        "id": "kung-lao-mk11-2019",
        "label": "Mortal Kombat 11",
        "gameId": "mk11-2019",
        "gameTitle": "Mortal Kombat 11",
        "timelineId": "reboot",
        "timelineName": "Reboot Timeline",
        "abilities": [
          {
            "id": "move-hat-throw",
            "type": "ability",
            "name": "Razor Rim Hat Toss"
          },
          {
            "id": "move-wind-tornado",
            "type": "ability",
            "name": "Wind Tornado Vortex"
          }
        ],
        "weapons": [],
        "organizations": [
          {
            "id": "white-lotus",
            "type": "organization",
            "name": "White Lotus Society"
          }
        ],
        "image": {
          "assetId": "asset-kunglao-portrait",
          "assetURL": "/images/characters/kung-lao.png",
          "assetType": "character_portrait",
          "entityId": "kung-lao",
          "rightsStatus": "approved",
          "attribution": "Mortal Kombat \u00a9 Warner Bros. Games / NetherRealm Studios / Fandom Community",
          "alt": "Potret karakter resmi Kung Lao"
        },
        "verificationStatus": "verified"
      }
    ],
    "relationships": [],
    "relatedCharacters": [],
    "sources": [
      {
        "id": "fandom-kung-lao",
        "title": "Mortal Kombat Wiki \u2014 Kung Lao",
        "url": "https://mortalkombat.fandom.com/wiki/Kung_Lao",
        "sourceType": "community-wiki",
        "verificationStatus": "verified"
      }
    ]
  },
  {
    "id": "shangtsung",
    "name": "Shang Tsung",
    "aliases": [
      "The Soul Stealer"
    ],
    "summary": "Treacherous shapeshifting sorcerer who consumes mortal souls to sustain his youth and mimic enemy abilities.",
    "biography": "Treacherous shapeshifting sorcerer who consumes mortal souls to sustain his youth and mimic enemy abilities.",
    "firstAppearance": {
      "id": "mk-1992",
      "type": "game",
      "name": "Mortal Kombat (1992)"
    },
    "species": {
      "id": "human",
      "type": "species",
      "name": "Human Sorcerer"
    },
    "realm": {
      "id": "earthrealm",
      "type": "location",
      "name": "Earthrealm"
    },
    "faction": "Neutral",
    "role": "Villain",
    "popular": true,
    "image": {
      "assetId": "asset-shangtsung-portrait",
      "assetURL": "/images/characters/shangtsung.png",
      "assetType": "character_portrait",
      "entityId": "shangtsung",
      "rightsStatus": "approved",
      "attribution": "Mortal Kombat \u00a9 Warner Bros. Games / NetherRealm Studios / Fandom Community",
      "alt": "Potret karakter resmi Shang Tsung"
    },
    "versions": [
      {
        "id": "shangtsung-mk1-1992",
        "label": "Mortal Kombat (1992)",
        "gameId": "mk1-1992",
        "gameTitle": "Mortal Kombat (1992)",
        "timelineId": "original",
        "timelineName": "Original Timeline",
        "abilities": [
          {
            "id": "soul-stealing",
            "type": "ability",
            "name": "Soul Steal"
          },
          {
            "id": "move-soul-ball",
            "type": "ability",
            "name": "Green Soul Burst"
          }
        ],
        "weapons": [],
        "organizations": [],
        "image": {
          "assetId": "asset-shangtsung-portrait",
          "assetURL": "/images/characters/shangtsung.png",
          "assetType": "character_portrait",
          "entityId": "shangtsung",
          "rightsStatus": "approved",
          "attribution": "Mortal Kombat \u00a9 Warner Bros. Games / NetherRealm Studios / Fandom Community",
          "alt": "Potret karakter resmi Shang Tsung"
        },
        "verificationStatus": "verified"
      },
      {
        "id": "shangtsung-mk-deadly-alliance-2002",
        "label": "Mortal Kombat: Deadly Alliance",
        "gameId": "mk-deadly-alliance-2002",
        "gameTitle": "Mortal Kombat: Deadly Alliance",
        "timelineId": "original",
        "timelineName": "Original Timeline",
        "abilities": [
          {
            "id": "soul-stealing",
            "type": "ability",
            "name": "Soul Steal"
          }
        ],
        "weapons": [],
        "organizations": [],
        "image": {
          "assetId": "asset-shangtsung-portrait",
          "assetURL": "/images/characters/shangtsung.png",
          "assetType": "character_portrait",
          "entityId": "shangtsung",
          "rightsStatus": "approved",
          "attribution": "Mortal Kombat \u00a9 Warner Bros. Games / NetherRealm Studios / Fandom Community",
          "alt": "Potret karakter resmi Shang Tsung"
        },
        "verificationStatus": "verified"
      },
      {
        "id": "shangtsung-mk1-2023",
        "label": "Mortal Kombat 1 (2023)",
        "gameId": "mk1-2023",
        "gameTitle": "Mortal Kombat 1 (2023)",
        "timelineId": "new-era",
        "timelineName": "New Era",
        "abilities": [
          {
            "id": "soul-stealing",
            "type": "ability",
            "name": "Soul Steal"
          }
        ],
        "weapons": [],
        "organizations": [],
        "image": {
          "assetId": "asset-shangtsung-portrait",
          "assetURL": "/images/characters/shangtsung.png",
          "assetType": "character_portrait",
          "entityId": "shangtsung",
          "rightsStatus": "approved",
          "attribution": "Mortal Kombat \u00a9 Warner Bros. Games / NetherRealm Studios / Fandom Community",
          "alt": "Potret karakter resmi Shang Tsung"
        },
        "verificationStatus": "verified"
      }
    ],
    "relationships": [
      {
        "type": "alliedWith",
        "label": "Sekutu",
        "target": {
          "id": "quanchi",
          "type": "character",
          "name": "Quan Chi"
        },
        "context": "Original Timeline (Deadly Alliance)",
        "verificationStatus": "verified"
      }
    ],
    "relatedCharacters": [
      {
        "id": "quanchi",
        "type": "character",
        "name": "Quan Chi"
      }
    ],
    "sources": [
      {
        "id": "fandom-shangtsung",
        "title": "Mortal Kombat Wiki \u2014 Shang Tsung",
        "url": "https://mortalkombat.fandom.com/wiki/Shang_Tsung",
        "sourceType": "community-wiki",
        "verificationStatus": "verified"
      }
    ]
  },
  {
    "id": "quanchi",
    "name": "Quan Chi",
    "aliases": [
      "Arch-Sorcerer of the Netherrealm"
    ],
    "summary": "Scheming demonic necromancer from the Netherrealm who orchestrates proxy wars, resurrects revenants, and formed the Deadly Alliance.",
    "biography": "Scheming demonic necromancer from the Netherrealm who orchestrates proxy wars, resurrects revenants, and formed the Deadly Alliance.",
    "firstAppearance": {
      "id": "mk-1992",
      "type": "game",
      "name": "Mortal Kombat (1992)"
    },
    "species": {
      "id": "human",
      "type": "species",
      "name": "Demon Sorcerer"
    },
    "realm": {
      "id": "netherrealm",
      "type": "location",
      "name": "Netherrealm"
    },
    "faction": "Brotherhood of Shadow",
    "role": "Villain",
    "popular": false,
    "image": {
      "assetId": "asset-quanchi-portrait",
      "assetURL": "/images/characters/quanchi.png",
      "assetType": "character_portrait",
      "entityId": "quanchi",
      "rightsStatus": "approved",
      "attribution": "Mortal Kombat \u00a9 Warner Bros. Games / NetherRealm Studios / Fandom Community",
      "alt": "Potret karakter resmi Quan Chi"
    },
    "versions": [
      {
        "id": "quanchi-mk4-1997",
        "label": "Mortal Kombat 4",
        "gameId": "mk4-1997",
        "gameTitle": "Mortal Kombat 4",
        "timelineId": "original",
        "timelineName": "Original Timeline",
        "abilities": [
          {
            "id": "necromancy",
            "type": "ability",
            "name": "Necromancy"
          },
          {
            "id": "teleportation",
            "type": "ability",
            "name": "Dimensional Teleportation"
          }
        ],
        "weapons": [],
        "organizations": [
          {
            "id": "brotherhood-of-shadow",
            "type": "organization",
            "name": "Brotherhood of Shadow"
          }
        ],
        "image": {
          "assetId": "asset-quanchi-portrait",
          "assetURL": "/images/characters/quanchi.png",
          "assetType": "character_portrait",
          "entityId": "quanchi",
          "rightsStatus": "approved",
          "attribution": "Mortal Kombat \u00a9 Warner Bros. Games / NetherRealm Studios / Fandom Community",
          "alt": "Potret karakter resmi Quan Chi"
        },
        "verificationStatus": "verified"
      },
      {
        "id": "quanchi-mkx-2015",
        "label": "Mortal Kombat X",
        "gameId": "mkx-2015",
        "gameTitle": "Mortal Kombat X",
        "timelineId": "reboot",
        "timelineName": "Reboot Timeline",
        "abilities": [
          {
            "id": "necromancy",
            "type": "ability",
            "name": "Necromancy"
          },
          {
            "id": "teleportation",
            "type": "ability",
            "name": "Dimensional Teleportation"
          }
        ],
        "weapons": [],
        "organizations": [
          {
            "id": "brotherhood-of-shadow",
            "type": "organization",
            "name": "Brotherhood of Shadow"
          }
        ],
        "image": {
          "assetId": "asset-quanchi-portrait",
          "assetURL": "/images/characters/quanchi.png",
          "assetType": "character_portrait",
          "entityId": "quanchi",
          "rightsStatus": "approved",
          "attribution": "Mortal Kombat \u00a9 Warner Bros. Games / NetherRealm Studios / Fandom Community",
          "alt": "Potret karakter resmi Quan Chi"
        },
        "verificationStatus": "verified"
      }
    ],
    "relationships": [],
    "relatedCharacters": [],
    "sources": [
      {
        "id": "fandom-quanchi",
        "title": "Mortal Kombat Wiki \u2014 Quan Chi",
        "url": "https://mortalkombat.fandom.com/wiki/Quan_Chi",
        "sourceType": "community-wiki",
        "verificationStatus": "verified"
      }
    ]
  },
  {
    "id": "shao-kahn",
    "name": "Shao Kahn",
    "aliases": [
      "Emperor of Outworld / General Shao"
    ],
    "summary": "Colossal tyrannical warlord who ruled Outworld for ten millennia, conquering realms by force and wielding the mighty Wrath Hammer.",
    "biography": "Colossal tyrannical warlord who ruled Outworld for ten millennia, conquering realms by force and wielding the mighty Wrath Hammer.",
    "firstAppearance": {
      "id": "mk-1992",
      "type": "game",
      "name": "Mortal Kombat (1992)"
    },
    "species": {
      "id": "human",
      "type": "species",
      "name": "Outworlder / God"
    },
    "realm": {
      "id": "outworld",
      "type": "location",
      "name": "Outworld"
    },
    "faction": "Neutral",
    "role": "Villain",
    "popular": true,
    "image": {
      "assetId": "asset-shaokahn-portrait",
      "assetURL": "/images/characters/shao-kahn.png",
      "assetType": "character_portrait",
      "entityId": "shao-kahn",
      "rightsStatus": "approved",
      "attribution": "Mortal Kombat \u00a9 Warner Bros. Games / NetherRealm Studios / Fandom Community",
      "alt": "Potret karakter resmi Shao Kahn"
    },
    "versions": [
      {
        "id": "shao-kahn-mk2-1993",
        "label": "Mortal Kombat II",
        "gameId": "mk2-1993",
        "gameTitle": "Mortal Kombat II",
        "timelineId": "original",
        "timelineName": "Original Timeline",
        "abilities": [],
        "weapons": [
          {
            "id": "war-hammer",
            "type": "weapon",
            "name": "Wrath Hammer"
          }
        ],
        "organizations": [],
        "image": {
          "assetId": "asset-shaokahn-portrait",
          "assetURL": "/images/characters/shao-kahn.png",
          "assetType": "character_portrait",
          "entityId": "shao-kahn",
          "rightsStatus": "approved",
          "attribution": "Mortal Kombat \u00a9 Warner Bros. Games / NetherRealm Studios / Fandom Community",
          "alt": "Potret karakter resmi Shao Kahn"
        },
        "verificationStatus": "verified"
      },
      {
        "id": "shao-kahn-mk11-2019",
        "label": "Mortal Kombat 11",
        "gameId": "mk11-2019",
        "gameTitle": "Mortal Kombat 11",
        "timelineId": "reboot",
        "timelineName": "Reboot Timeline",
        "abilities": [],
        "weapons": [
          {
            "id": "war-hammer",
            "type": "weapon",
            "name": "Wrath Hammer"
          }
        ],
        "organizations": [],
        "image": {
          "assetId": "asset-shaokahn-portrait",
          "assetURL": "/images/characters/shao-kahn.png",
          "assetType": "character_portrait",
          "entityId": "shao-kahn",
          "rightsStatus": "approved",
          "attribution": "Mortal Kombat \u00a9 Warner Bros. Games / NetherRealm Studios / Fandom Community",
          "alt": "Potret karakter resmi Shao Kahn"
        },
        "verificationStatus": "verified"
      }
    ],
    "relationships": [],
    "relatedCharacters": [],
    "sources": [
      {
        "id": "fandom-shao-kahn",
        "title": "Mortal Kombat Wiki \u2014 Shao Kahn",
        "url": "https://mortalkombat.fandom.com/wiki/Shao_Kahn",
        "sourceType": "community-wiki",
        "verificationStatus": "verified"
      }
    ]
  },
  {
    "id": "kano",
    "name": "Kano",
    "aliases": [
      "Black Dragon Leader"
    ],
    "summary": "Cybernetically modified Australian mercenary and ruthless boss of the Black Dragon, possessing an infrared laser cyber-eye.",
    "biography": "Cybernetically modified Australian mercenary and ruthless boss of the Black Dragon, possessing an infrared laser cyber-eye.",
    "firstAppearance": {
      "id": "mk-1992",
      "type": "game",
      "name": "Mortal Kombat (1992)"
    },
    "species": {
      "id": "human",
      "type": "species",
      "name": "Human Cyborg"
    },
    "realm": {
      "id": "earthrealm",
      "type": "location",
      "name": "Earthrealm"
    },
    "faction": "Black Dragon",
    "role": "Villain",
    "popular": false,
    "image": {
      "assetId": "asset-kano-portrait",
      "assetURL": "/images/characters/kano.png",
      "assetType": "character_portrait",
      "entityId": "kano",
      "rightsStatus": "approved",
      "attribution": "Mortal Kombat \u00a9 Warner Bros. Games / NetherRealm Studios / Fandom Community",
      "alt": "Potret karakter resmi Kano"
    },
    "versions": [
      {
        "id": "kano-mk1-1992",
        "label": "Mortal Kombat (1992)",
        "gameId": "mk1-1992",
        "gameTitle": "Mortal Kombat (1992)",
        "timelineId": "original",
        "timelineName": "Original Timeline",
        "abilities": [
          {
            "id": "move-cannonball",
            "type": "ability",
            "name": "Cannonball Roll"
          }
        ],
        "weapons": [],
        "organizations": [
          {
            "id": "black-dragon",
            "type": "organization",
            "name": "Black Dragon"
          }
        ],
        "image": {
          "assetId": "asset-kano-portrait",
          "assetURL": "/images/characters/kano.png",
          "assetType": "character_portrait",
          "entityId": "kano",
          "rightsStatus": "approved",
          "attribution": "Mortal Kombat \u00a9 Warner Bros. Games / NetherRealm Studios / Fandom Community",
          "alt": "Potret karakter resmi Kano"
        },
        "verificationStatus": "verified"
      },
      {
        "id": "kano-mk11-2019",
        "label": "Mortal Kombat 11",
        "gameId": "mk11-2019",
        "gameTitle": "Mortal Kombat 11",
        "timelineId": "reboot",
        "timelineName": "Reboot Timeline",
        "abilities": [
          {
            "id": "move-cannonball",
            "type": "ability",
            "name": "Cannonball Roll"
          }
        ],
        "weapons": [],
        "organizations": [
          {
            "id": "black-dragon",
            "type": "organization",
            "name": "Black Dragon"
          }
        ],
        "image": {
          "assetId": "asset-kano-portrait",
          "assetURL": "/images/characters/kano.png",
          "assetType": "character_portrait",
          "entityId": "kano",
          "rightsStatus": "approved",
          "attribution": "Mortal Kombat \u00a9 Warner Bros. Games / NetherRealm Studios / Fandom Community",
          "alt": "Potret karakter resmi Kano"
        },
        "verificationStatus": "verified"
      }
    ],
    "relationships": [],
    "relatedCharacters": [],
    "sources": [
      {
        "id": "fandom-kano",
        "title": "Mortal Kombat Wiki \u2014 Kano",
        "url": "https://mortalkombat.fandom.com/wiki/Kano",
        "sourceType": "community-wiki",
        "verificationStatus": "verified"
      }
    ]
  },
  {
    "id": "baraka",
    "name": "Baraka",
    "aliases": [
      "Tarkatan War Chief"
    ],
    "summary": "Ferocious warlord of the nomadic Tarkatan tribe with razor-sharp teeth and long, retractable bone blades extending from his forearms.",
    "biography": "Ferocious warlord of the nomadic Tarkatan tribe with razor-sharp teeth and long, retractable bone blades extending from his forearms.",
    "firstAppearance": {
      "id": "mk-1992",
      "type": "game",
      "name": "Mortal Kombat (1992)"
    },
    "species": {
      "id": "human",
      "type": "species",
      "name": "Tarkatan"
    },
    "realm": {
      "id": "outworld",
      "type": "location",
      "name": "Outworld"
    },
    "faction": "Neutral",
    "role": "Villain",
    "popular": false,
    "image": {
      "assetId": "asset-baraka-portrait",
      "assetURL": "/images/characters/baraka.png",
      "assetType": "character_portrait",
      "entityId": "baraka",
      "rightsStatus": "approved",
      "attribution": "Mortal Kombat \u00a9 Warner Bros. Games / NetherRealm Studios / Fandom Community",
      "alt": "Potret karakter resmi Baraka"
    },
    "versions": [
      {
        "id": "baraka-mk2-1993",
        "label": "Mortal Kombat II",
        "gameId": "mk2-1993",
        "gameTitle": "Mortal Kombat II",
        "timelineId": "original",
        "timelineName": "Original Timeline",
        "abilities": [
          {
            "id": "move-tarkatan-chop",
            "type": "ability",
            "name": "Blade Fury"
          }
        ],
        "weapons": [],
        "organizations": [],
        "image": {
          "assetId": "asset-baraka-portrait",
          "assetURL": "/images/characters/baraka.png",
          "assetType": "character_portrait",
          "entityId": "baraka",
          "rightsStatus": "approved",
          "attribution": "Mortal Kombat \u00a9 Warner Bros. Games / NetherRealm Studios / Fandom Community",
          "alt": "Potret karakter resmi Baraka"
        },
        "verificationStatus": "verified"
      },
      {
        "id": "baraka-mk11-2019",
        "label": "Mortal Kombat 11",
        "gameId": "mk11-2019",
        "gameTitle": "Mortal Kombat 11",
        "timelineId": "reboot",
        "timelineName": "Reboot Timeline",
        "abilities": [
          {
            "id": "move-tarkatan-chop",
            "type": "ability",
            "name": "Blade Fury"
          }
        ],
        "weapons": [],
        "organizations": [],
        "image": {
          "assetId": "asset-baraka-portrait",
          "assetURL": "/images/characters/baraka.png",
          "assetType": "character_portrait",
          "entityId": "baraka",
          "rightsStatus": "approved",
          "attribution": "Mortal Kombat \u00a9 Warner Bros. Games / NetherRealm Studios / Fandom Community",
          "alt": "Potret karakter resmi Baraka"
        },
        "verificationStatus": "verified"
      }
    ],
    "relationships": [],
    "relatedCharacters": [],
    "sources": [
      {
        "id": "fandom-baraka",
        "title": "Mortal Kombat Wiki \u2014 Baraka",
        "url": "https://mortalkombat.fandom.com/wiki/Baraka",
        "sourceType": "community-wiki",
        "verificationStatus": "verified"
      }
    ]
  },
  {
    "id": "kenshi",
    "name": "Kenshi",
    "aliases": [
      "Kenshi Takahashi"
    ],
    "summary": "Blind telekinetic master swordsman guided by the spirits of his samurai ancestors housed within the ancestral blade Sento.",
    "biography": "Blind telekinetic master swordsman guided by the spirits of his samurai ancestors housed within the ancestral blade Sento.",
    "firstAppearance": {
      "id": "mk-1992",
      "type": "game",
      "name": "Mortal Kombat (1992)"
    },
    "species": {
      "id": "human",
      "type": "species",
      "name": "Human"
    },
    "realm": {
      "id": "earthrealm",
      "type": "location",
      "name": "Earthrealm"
    },
    "faction": "Special Forces",
    "role": "Villain",
    "popular": false,
    "image": {
      "assetId": "asset-kenshi-portrait",
      "assetURL": "/images/characters/kenshi.png",
      "assetType": "character_portrait",
      "entityId": "kenshi",
      "rightsStatus": "approved",
      "attribution": "Mortal Kombat \u00a9 Warner Bros. Games / NetherRealm Studios / Fandom Community",
      "alt": "Potret karakter resmi Kenshi"
    },
    "versions": [
      {
        "id": "kenshi-mk-deadly-alliance-2002",
        "label": "Mortal Kombat: Deadly Alliance",
        "gameId": "mk-deadly-alliance-2002",
        "gameTitle": "Mortal Kombat: Deadly Alliance",
        "timelineId": "original",
        "timelineName": "Original Timeline",
        "abilities": [
          {
            "id": "move-tele-flurry",
            "type": "ability",
            "name": "Tele-Flurry"
          },
          {
            "id": "move-telekinesis-slam",
            "type": "ability",
            "name": "Telekinetic Slam"
          }
        ],
        "weapons": [
          {
            "id": "sento",
            "type": "weapon",
            "name": "Sento"
          }
        ],
        "organizations": [
          {
            "id": "special-forces",
            "type": "organization",
            "name": "Special Forces"
          }
        ],
        "image": {
          "assetId": "asset-kenshi-portrait",
          "assetURL": "/images/characters/kenshi.png",
          "assetType": "character_portrait",
          "entityId": "kenshi",
          "rightsStatus": "approved",
          "attribution": "Mortal Kombat \u00a9 Warner Bros. Games / NetherRealm Studios / Fandom Community",
          "alt": "Potret karakter resmi Kenshi"
        },
        "verificationStatus": "verified"
      },
      {
        "id": "kenshi-mkx-2015",
        "label": "Mortal Kombat X",
        "gameId": "mkx-2015",
        "gameTitle": "Mortal Kombat X",
        "timelineId": "reboot",
        "timelineName": "Reboot Timeline",
        "abilities": [
          {
            "id": "move-tele-flurry",
            "type": "ability",
            "name": "Tele-Flurry"
          },
          {
            "id": "move-telekinesis-slam",
            "type": "ability",
            "name": "Telekinetic Slam"
          }
        ],
        "weapons": [
          {
            "id": "sento",
            "type": "weapon",
            "name": "Sento"
          }
        ],
        "organizations": [
          {
            "id": "special-forces",
            "type": "organization",
            "name": "Special Forces"
          }
        ],
        "image": {
          "assetId": "asset-kenshi-portrait",
          "assetURL": "/images/characters/kenshi.png",
          "assetType": "character_portrait",
          "entityId": "kenshi",
          "rightsStatus": "approved",
          "attribution": "Mortal Kombat \u00a9 Warner Bros. Games / NetherRealm Studios / Fandom Community",
          "alt": "Potret karakter resmi Kenshi"
        },
        "verificationStatus": "verified"
      },
      {
        "id": "kenshi-mk1-2023",
        "label": "Mortal Kombat 1 (2023)",
        "gameId": "mk1-2023",
        "gameTitle": "Mortal Kombat 1 (2023)",
        "timelineId": "new-era",
        "timelineName": "New Era",
        "abilities": [
          {
            "id": "move-tele-flurry",
            "type": "ability",
            "name": "Tele-Flurry"
          }
        ],
        "weapons": [
          {
            "id": "sento",
            "type": "weapon",
            "name": "Sento"
          }
        ],
        "organizations": [
          {
            "id": "shirai-ryu",
            "type": "organization",
            "name": "Shirai Ryu"
          }
        ],
        "image": {
          "assetId": "asset-kenshi-portrait",
          "assetURL": "/images/characters/kenshi.png",
          "assetType": "character_portrait",
          "entityId": "kenshi",
          "rightsStatus": "approved",
          "attribution": "Mortal Kombat \u00a9 Warner Bros. Games / NetherRealm Studios / Fandom Community",
          "alt": "Potret karakter resmi Kenshi"
        },
        "verificationStatus": "verified"
      }
    ],
    "relationships": [],
    "relatedCharacters": [],
    "sources": [
      {
        "id": "fandom-kenshi",
        "title": "Mortal Kombat Wiki \u2014 Kenshi",
        "url": "https://mortalkombat.fandom.com/wiki/Kenshi",
        "sourceType": "community-wiki",
        "verificationStatus": "verified"
      }
    ]
  },
  {
    "id": "noob-saibot",
    "name": "Noob Saibot",
    "aliases": [
      "Bi-Han (Shadow Wraith)"
    ],
    "summary": "The resurrected wraith of the original Sub-Zero Bi-Han, corrupted by the dark necromancy of Quan Chi into living shadow.",
    "biography": "The resurrected wraith of the original Sub-Zero Bi-Han, corrupted by the dark necromancy of Quan Chi into living shadow.",
    "firstAppearance": {
      "id": "mk-1992",
      "type": "game",
      "name": "Mortal Kombat (1992)"
    },
    "species": {
      "id": "human",
      "type": "species",
      "name": "Wraith"
    },
    "realm": {
      "id": "netherrealm",
      "type": "location",
      "name": "Netherrealm"
    },
    "faction": "Brotherhood of Shadow",
    "role": "Villain",
    "popular": false,
    "image": {
      "assetId": "asset-noobsaibot-portrait",
      "assetURL": "/images/characters/noob-saibot.png",
      "assetType": "character_portrait",
      "entityId": "noob-saibot",
      "rightsStatus": "approved",
      "attribution": "Mortal Kombat \u00a9 Warner Bros. Games / NetherRealm Studios / Fandom Community",
      "alt": "Potret karakter resmi Noob Saibot"
    },
    "versions": [
      {
        "id": "noob-saibot-mk2-1993",
        "label": "Mortal Kombat II",
        "gameId": "mk2-1993",
        "gameTitle": "Mortal Kombat II",
        "timelineId": "original",
        "timelineName": "Original Timeline",
        "abilities": [
          {
            "id": "shadow-magic",
            "type": "ability",
            "name": "Shadow Magic"
          },
          {
            "id": "move-shadow-slide",
            "type": "ability",
            "name": "Shadow Slide"
          }
        ],
        "weapons": [],
        "organizations": [
          {
            "id": "brotherhood-of-shadow",
            "type": "organization",
            "name": "Brotherhood of Shadow"
          }
        ],
        "image": {
          "assetId": "asset-noobsaibot-portrait",
          "assetURL": "/images/characters/noob-saibot.png",
          "assetType": "character_portrait",
          "entityId": "noob-saibot",
          "rightsStatus": "approved",
          "attribution": "Mortal Kombat \u00a9 Warner Bros. Games / NetherRealm Studios / Fandom Community",
          "alt": "Potret karakter resmi Noob Saibot"
        },
        "verificationStatus": "verified"
      },
      {
        "id": "noob-saibot-mk11-2019",
        "label": "Mortal Kombat 11",
        "gameId": "mk11-2019",
        "gameTitle": "Mortal Kombat 11",
        "timelineId": "reboot",
        "timelineName": "Reboot Timeline",
        "abilities": [
          {
            "id": "shadow-magic",
            "type": "ability",
            "name": "Shadow Magic"
          },
          {
            "id": "move-shadow-slide",
            "type": "ability",
            "name": "Shadow Slide"
          }
        ],
        "weapons": [],
        "organizations": [
          {
            "id": "brotherhood-of-shadow",
            "type": "organization",
            "name": "Brotherhood of Shadow"
          }
        ],
        "image": {
          "assetId": "asset-noobsaibot-portrait",
          "assetURL": "/images/characters/noob-saibot.png",
          "assetType": "character_portrait",
          "entityId": "noob-saibot",
          "rightsStatus": "approved",
          "attribution": "Mortal Kombat \u00a9 Warner Bros. Games / NetherRealm Studios / Fandom Community",
          "alt": "Potret karakter resmi Noob Saibot"
        },
        "verificationStatus": "verified"
      }
    ],
    "relationships": [],
    "relatedCharacters": [],
    "sources": [
      {
        "id": "fandom-noob-saibot",
        "title": "Mortal Kombat Wiki \u2014 Noob Saibot",
        "url": "https://mortalkombat.fandom.com/wiki/Noob_Saibot",
        "sourceType": "community-wiki",
        "verificationStatus": "verified"
      }
    ]
  },
  {
    "id": "smoke",
    "name": "Smoke",
    "aliases": [
      "Tomas Vrbada"
    ],
    "summary": "Lin Kuei warrior capable of dissolving his physical form into clouds of choking, defensive vapor.",
    "biography": "Lin Kuei warrior capable of dissolving his physical form into clouds of choking, defensive vapor.",
    "firstAppearance": {
      "id": "mk-1992",
      "type": "game",
      "name": "Mortal Kombat (1992)"
    },
    "species": {
      "id": "human",
      "type": "species",
      "name": "Enenra / Human"
    },
    "realm": {
      "id": "earthrealm",
      "type": "location",
      "name": "Earthrealm"
    },
    "faction": "Lin Kuei",
    "role": "Villain",
    "popular": false,
    "image": {
      "assetId": "asset-smoke-portrait",
      "assetURL": "/images/characters/smoke.png",
      "assetType": "character_portrait",
      "entityId": "smoke",
      "rightsStatus": "approved",
      "attribution": "Mortal Kombat \u00a9 Warner Bros. Games / NetherRealm Studios / Fandom Community",
      "alt": "Potret karakter resmi Smoke"
    },
    "versions": [
      {
        "id": "smoke-mk3-1995",
        "label": "Mortal Kombat 3",
        "gameId": "mk3-1995",
        "gameTitle": "Mortal Kombat 3",
        "timelineId": "original",
        "timelineName": "Original Timeline",
        "abilities": [
          {
            "id": "teleportation",
            "type": "ability",
            "name": "Dimensional Teleportation"
          }
        ],
        "weapons": [],
        "organizations": [
          {
            "id": "lin-kuei",
            "type": "organization",
            "name": "Lin Kuei"
          }
        ],
        "image": {
          "assetId": "asset-smoke-portrait",
          "assetURL": "/images/characters/smoke.png",
          "assetType": "character_portrait",
          "entityId": "smoke",
          "rightsStatus": "approved",
          "attribution": "Mortal Kombat \u00a9 Warner Bros. Games / NetherRealm Studios / Fandom Community",
          "alt": "Potret karakter resmi Smoke"
        },
        "verificationStatus": "verified"
      },
      {
        "id": "smoke-mk9-2011",
        "label": "Mortal Kombat (2011)",
        "gameId": "mk9-2011",
        "gameTitle": "Mortal Kombat (2011)",
        "timelineId": "reboot",
        "timelineName": "Reboot Timeline",
        "abilities": [
          {
            "id": "teleportation",
            "type": "ability",
            "name": "Dimensional Teleportation"
          }
        ],
        "weapons": [],
        "organizations": [
          {
            "id": "lin-kuei",
            "type": "organization",
            "name": "Lin Kuei"
          }
        ],
        "image": {
          "assetId": "asset-smoke-portrait",
          "assetURL": "/images/characters/smoke.png",
          "assetType": "character_portrait",
          "entityId": "smoke",
          "rightsStatus": "approved",
          "attribution": "Mortal Kombat \u00a9 Warner Bros. Games / NetherRealm Studios / Fandom Community",
          "alt": "Potret karakter resmi Smoke"
        },
        "verificationStatus": "verified"
      },
      {
        "id": "smoke-mk1-2023",
        "label": "Mortal Kombat 1 (2023)",
        "gameId": "mk1-2023",
        "gameTitle": "Mortal Kombat 1 (2023)",
        "timelineId": "new-era",
        "timelineName": "New Era",
        "abilities": [
          {
            "id": "teleportation",
            "type": "ability",
            "name": "Dimensional Teleportation"
          }
        ],
        "weapons": [],
        "organizations": [
          {
            "id": "lin-kuei",
            "type": "organization",
            "name": "Lin Kuei"
          }
        ],
        "image": {
          "assetId": "asset-smoke-portrait",
          "assetURL": "/images/characters/smoke.png",
          "assetType": "character_portrait",
          "entityId": "smoke",
          "rightsStatus": "approved",
          "attribution": "Mortal Kombat \u00a9 Warner Bros. Games / NetherRealm Studios / Fandom Community",
          "alt": "Potret karakter resmi Smoke"
        },
        "verificationStatus": "verified"
      }
    ],
    "relationships": [],
    "relatedCharacters": [],
    "sources": [
      {
        "id": "fandom-smoke",
        "title": "Mortal Kombat Wiki \u2014 Smoke",
        "url": "https://mortalkombat.fandom.com/wiki/Smoke",
        "sourceType": "community-wiki",
        "verificationStatus": "verified"
      }
    ]
  },
  {
    "id": "cyrax",
    "name": "Cyrax",
    "aliases": [
      "Unit LK-4D4"
    ],
    "summary": "Botswanan assassin mechanised into a lethal yellow cyborg unit equipped with an energy net and chest saw.",
    "biography": "Botswanan assassin mechanised into a lethal yellow cyborg unit equipped with an energy net and chest saw.",
    "firstAppearance": {
      "id": "mk-1992",
      "type": "game",
      "name": "Mortal Kombat (1992)"
    },
    "species": {
      "id": "human",
      "type": "species",
      "name": "Cyborg / Human"
    },
    "realm": {
      "id": "earthrealm",
      "type": "location",
      "name": "Earthrealm"
    },
    "faction": "Lin Kuei",
    "role": "Villain",
    "popular": false,
    "image": {
      "assetId": "asset-cyrax-portrait",
      "assetURL": "/images/characters/cyrax.png",
      "assetType": "character_portrait",
      "entityId": "cyrax",
      "rightsStatus": "approved",
      "attribution": "Mortal Kombat \u00a9 Warner Bros. Games / NetherRealm Studios / Fandom Community",
      "alt": "Potret karakter resmi Cyrax"
    },
    "versions": [
      {
        "id": "cyrax-mk3-1995",
        "label": "Mortal Kombat 3",
        "gameId": "mk3-1995",
        "gameTitle": "Mortal Kombat 3",
        "timelineId": "original",
        "timelineName": "Original Timeline",
        "abilities": [
          {
            "id": "move-net-tangle",
            "type": "ability",
            "name": "Energy Net"
          },
          {
            "id": "teleportation",
            "type": "ability",
            "name": "Dimensional Teleportation"
          }
        ],
        "weapons": [],
        "organizations": [
          {
            "id": "lin-kuei",
            "type": "organization",
            "name": "Lin Kuei"
          }
        ],
        "image": {
          "assetId": "asset-cyrax-portrait",
          "assetURL": "/images/characters/cyrax.png",
          "assetType": "character_portrait",
          "entityId": "cyrax",
          "rightsStatus": "approved",
          "attribution": "Mortal Kombat \u00a9 Warner Bros. Games / NetherRealm Studios / Fandom Community",
          "alt": "Potret karakter resmi Cyrax"
        },
        "verificationStatus": "verified"
      },
      {
        "id": "cyrax-mk9-2011",
        "label": "Mortal Kombat (2011)",
        "gameId": "mk9-2011",
        "gameTitle": "Mortal Kombat (2011)",
        "timelineId": "reboot",
        "timelineName": "Reboot Timeline",
        "abilities": [
          {
            "id": "move-net-tangle",
            "type": "ability",
            "name": "Energy Net"
          },
          {
            "id": "teleportation",
            "type": "ability",
            "name": "Dimensional Teleportation"
          }
        ],
        "weapons": [],
        "organizations": [
          {
            "id": "lin-kuei",
            "type": "organization",
            "name": "Lin Kuei"
          }
        ],
        "image": {
          "assetId": "asset-cyrax-portrait",
          "assetURL": "/images/characters/cyrax.png",
          "assetType": "character_portrait",
          "entityId": "cyrax",
          "rightsStatus": "approved",
          "attribution": "Mortal Kombat \u00a9 Warner Bros. Games / NetherRealm Studios / Fandom Community",
          "alt": "Potret karakter resmi Cyrax"
        },
        "verificationStatus": "verified"
      }
    ],
    "relationships": [],
    "relatedCharacters": [],
    "sources": [
      {
        "id": "fandom-cyrax",
        "title": "Mortal Kombat Wiki \u2014 Cyrax",
        "url": "https://mortalkombat.fandom.com/wiki/Cyrax",
        "sourceType": "community-wiki",
        "verificationStatus": "verified"
      }
    ]
  },
  {
    "id": "sektor",
    "name": "Sektor",
    "aliases": [
      "Unit LK-9T9"
    ],
    "summary": "Ruthless grandmaster's son who willingly embraced cybernetization, armed with thermal rockets and dual flamethrowers.",
    "biography": "Ruthless grandmaster's son who willingly embraced cybernetization, armed with thermal rockets and dual flamethrowers.",
    "firstAppearance": {
      "id": "mk-1992",
      "type": "game",
      "name": "Mortal Kombat (1992)"
    },
    "species": {
      "id": "human",
      "type": "species",
      "name": "Cyborg / Human"
    },
    "realm": {
      "id": "earthrealm",
      "type": "location",
      "name": "Earthrealm"
    },
    "faction": "Lin Kuei",
    "role": "Villain",
    "popular": false,
    "image": {
      "assetId": "asset-sektor-portrait",
      "assetURL": "/images/characters/sektor.png",
      "assetType": "character_portrait",
      "entityId": "sektor",
      "rightsStatus": "approved",
      "attribution": "Mortal Kombat \u00a9 Warner Bros. Games / NetherRealm Studios / Fandom Community",
      "alt": "Potret karakter resmi Sektor"
    },
    "versions": [
      {
        "id": "sektor-mk3-1995",
        "label": "Mortal Kombat 3",
        "gameId": "mk3-1995",
        "gameTitle": "Mortal Kombat 3",
        "timelineId": "original",
        "timelineName": "Original Timeline",
        "abilities": [
          {
            "id": "move-missile-salvo",
            "type": "ability",
            "name": "Homing Missile"
          },
          {
            "id": "teleportation",
            "type": "ability",
            "name": "Dimensional Teleportation"
          }
        ],
        "weapons": [],
        "organizations": [
          {
            "id": "lin-kuei",
            "type": "organization",
            "name": "Lin Kuei"
          }
        ],
        "image": {
          "assetId": "asset-sektor-portrait",
          "assetURL": "/images/characters/sektor.png",
          "assetType": "character_portrait",
          "entityId": "sektor",
          "rightsStatus": "approved",
          "attribution": "Mortal Kombat \u00a9 Warner Bros. Games / NetherRealm Studios / Fandom Community",
          "alt": "Potret karakter resmi Sektor"
        },
        "verificationStatus": "verified"
      },
      {
        "id": "sektor-mk9-2011",
        "label": "Mortal Kombat (2011)",
        "gameId": "mk9-2011",
        "gameTitle": "Mortal Kombat (2011)",
        "timelineId": "reboot",
        "timelineName": "Reboot Timeline",
        "abilities": [
          {
            "id": "move-missile-salvo",
            "type": "ability",
            "name": "Homing Missile"
          },
          {
            "id": "teleportation",
            "type": "ability",
            "name": "Dimensional Teleportation"
          }
        ],
        "weapons": [],
        "organizations": [
          {
            "id": "lin-kuei",
            "type": "organization",
            "name": "Lin Kuei"
          }
        ],
        "image": {
          "assetId": "asset-sektor-portrait",
          "assetURL": "/images/characters/sektor.png",
          "assetType": "character_portrait",
          "entityId": "sektor",
          "rightsStatus": "approved",
          "attribution": "Mortal Kombat \u00a9 Warner Bros. Games / NetherRealm Studios / Fandom Community",
          "alt": "Potret karakter resmi Sektor"
        },
        "verificationStatus": "verified"
      }
    ],
    "relationships": [],
    "relatedCharacters": [],
    "sources": [
      {
        "id": "fandom-sektor",
        "title": "Mortal Kombat Wiki \u2014 Sektor",
        "url": "https://mortalkombat.fandom.com/wiki/Sektor",
        "sourceType": "community-wiki",
        "verificationStatus": "verified"
      }
    ]
  },
  {
    "id": "reptile",
    "name": "Reptile",
    "aliases": [
      "Syzoth"
    ],
    "summary": "Last known Saurian humanoid, possessing camouflage invisibility and corrosive acid saliva, fighting desperately to revive his home realm.",
    "biography": "Last known Saurian humanoid, possessing camouflage invisibility and corrosive acid saliva, fighting desperately to revive his home realm.",
    "firstAppearance": {
      "id": "mk-1992",
      "type": "game",
      "name": "Mortal Kombat (1992)"
    },
    "species": {
      "id": "human",
      "type": "species",
      "name": "Saurian (Zaterran)"
    },
    "realm": {
      "id": "outworld",
      "type": "location",
      "name": "Outworld"
    },
    "faction": "Neutral",
    "role": "Villain",
    "popular": false,
    "image": {
      "assetId": "asset-reptile-portrait",
      "assetURL": "/images/characters/reptile.png",
      "assetType": "character_portrait",
      "entityId": "reptile",
      "rightsStatus": "approved",
      "attribution": "Mortal Kombat \u00a9 Warner Bros. Games / NetherRealm Studios / Fandom Community",
      "alt": "Potret karakter resmi Reptile"
    },
    "versions": [
      {
        "id": "reptile-mk1-1992",
        "label": "Mortal Kombat (1992)",
        "gameId": "mk1-1992",
        "gameTitle": "Mortal Kombat (1992)",
        "timelineId": "original",
        "timelineName": "Original Timeline",
        "abilities": [
          {
            "id": "move-acid-spit",
            "type": "ability",
            "name": "Corrosive Acid Spit"
          }
        ],
        "weapons": [],
        "organizations": [],
        "image": {
          "assetId": "asset-reptile-portrait",
          "assetURL": "/images/characters/reptile.png",
          "assetType": "character_portrait",
          "entityId": "reptile",
          "rightsStatus": "approved",
          "attribution": "Mortal Kombat \u00a9 Warner Bros. Games / NetherRealm Studios / Fandom Community",
          "alt": "Potret karakter resmi Reptile"
        },
        "verificationStatus": "verified"
      },
      {
        "id": "reptile-mkx-2015",
        "label": "Mortal Kombat X",
        "gameId": "mkx-2015",
        "gameTitle": "Mortal Kombat X",
        "timelineId": "reboot",
        "timelineName": "Reboot Timeline",
        "abilities": [
          {
            "id": "move-acid-spit",
            "type": "ability",
            "name": "Corrosive Acid Spit"
          }
        ],
        "weapons": [],
        "organizations": [],
        "image": {
          "assetId": "asset-reptile-portrait",
          "assetURL": "/images/characters/reptile.png",
          "assetType": "character_portrait",
          "entityId": "reptile",
          "rightsStatus": "approved",
          "attribution": "Mortal Kombat \u00a9 Warner Bros. Games / NetherRealm Studios / Fandom Community",
          "alt": "Potret karakter resmi Reptile"
        },
        "verificationStatus": "verified"
      },
      {
        "id": "reptile-mk1-2023",
        "label": "Mortal Kombat 1 (2023)",
        "gameId": "mk1-2023",
        "gameTitle": "Mortal Kombat 1 (2023)",
        "timelineId": "new-era",
        "timelineName": "New Era",
        "abilities": [
          {
            "id": "move-acid-spit",
            "type": "ability",
            "name": "Corrosive Acid Spit"
          }
        ],
        "weapons": [],
        "organizations": [],
        "image": {
          "assetId": "asset-reptile-portrait",
          "assetURL": "/images/characters/reptile.png",
          "assetType": "character_portrait",
          "entityId": "reptile",
          "rightsStatus": "approved",
          "attribution": "Mortal Kombat \u00a9 Warner Bros. Games / NetherRealm Studios / Fandom Community",
          "alt": "Potret karakter resmi Reptile"
        },
        "verificationStatus": "verified"
      }
    ],
    "relationships": [],
    "relatedCharacters": [],
    "sources": [
      {
        "id": "fandom-reptile",
        "title": "Mortal Kombat Wiki \u2014 Reptile",
        "url": "https://mortalkombat.fandom.com/wiki/Reptile",
        "sourceType": "community-wiki",
        "verificationStatus": "verified"
      }
    ]
  },
  {
    "id": "geras",
    "name": "Geras",
    "aliases": [
      "Guardian of the Hourglass"
    ],
    "summary": "Immortal artificial construct created to manage temporal sand, resurrecting stronger and wiser after every death.",
    "biography": "Immortal artificial construct created to manage temporal sand, resurrecting stronger and wiser after every death.",
    "firstAppearance": {
      "id": "mk-1992",
      "type": "game",
      "name": "Mortal Kombat (1992)"
    },
    "species": {
      "id": "human",
      "type": "species",
      "name": "Temporal Golem"
    },
    "realm": {
      "id": "earthrealm",
      "type": "location",
      "name": "Earthrealm"
    },
    "faction": "Neutral",
    "role": "Villain",
    "popular": false,
    "image": {
      "assetId": "asset-geras-portrait",
      "assetURL": "/images/characters/geras.png",
      "assetType": "character_portrait",
      "entityId": "geras",
      "rightsStatus": "approved",
      "attribution": "Mortal Kombat \u00a9 Warner Bros. Games / NetherRealm Studios / Fandom Community",
      "alt": "Potret karakter resmi Geras"
    },
    "versions": [
      {
        "id": "geras-mk11-2019",
        "label": "Mortal Kombat 11",
        "gameId": "mk11-2019",
        "gameTitle": "Mortal Kombat 11",
        "timelineId": "reboot",
        "timelineName": "Reboot Timeline",
        "abilities": [
          {
            "id": "teleportation",
            "type": "ability",
            "name": "Dimensional Teleportation"
          }
        ],
        "weapons": [],
        "organizations": [],
        "image": {
          "assetId": "asset-geras-portrait",
          "assetURL": "/images/characters/geras.png",
          "assetType": "character_portrait",
          "entityId": "geras",
          "rightsStatus": "approved",
          "attribution": "Mortal Kombat \u00a9 Warner Bros. Games / NetherRealm Studios / Fandom Community",
          "alt": "Potret karakter resmi Geras"
        },
        "verificationStatus": "verified"
      },
      {
        "id": "geras-mk1-2023",
        "label": "Mortal Kombat 1 (2023)",
        "gameId": "mk1-2023",
        "gameTitle": "Mortal Kombat 1 (2023)",
        "timelineId": "new-era",
        "timelineName": "New Era",
        "abilities": [
          {
            "id": "teleportation",
            "type": "ability",
            "name": "Dimensional Teleportation"
          }
        ],
        "weapons": [],
        "organizations": [],
        "image": {
          "assetId": "asset-geras-portrait",
          "assetURL": "/images/characters/geras.png",
          "assetType": "character_portrait",
          "entityId": "geras",
          "rightsStatus": "approved",
          "attribution": "Mortal Kombat \u00a9 Warner Bros. Games / NetherRealm Studios / Fandom Community",
          "alt": "Potret karakter resmi Geras"
        },
        "verificationStatus": "verified"
      }
    ],
    "relationships": [
      {
        "type": "alliedWith",
        "label": "Sekutu",
        "target": {
          "id": "liu-kang",
          "type": "character",
          "name": "liu-kang"
        },
        "context": "New Era Timeline",
        "verificationStatus": "verified"
      }
    ],
    "relatedCharacters": [
      {
        "id": "liu-kang",
        "type": "character",
        "name": "liu-kang"
      }
    ],
    "sources": [
      {
        "id": "fandom-geras",
        "title": "Mortal Kombat Wiki \u2014 Geras",
        "url": "https://mortalkombat.fandom.com/wiki/Geras",
        "sourceType": "community-wiki",
        "verificationStatus": "verified"
      }
    ]
  },
  {
    "id": "kronika",
    "name": "Kronika",
    "aliases": [
      "Keeper of Time"
    ],
    "summary": "Titan of Time and architect of universe cycles who sought to restart history when Raiden disrupted the balance between Good and Evil.",
    "biography": "Titan of Time and architect of universe cycles who sought to restart history when Raiden disrupted the balance between Good and Evil.",
    "firstAppearance": {
      "id": "mk-1992",
      "type": "game",
      "name": "Mortal Kombat (1992)"
    },
    "species": {
      "id": "human",
      "type": "species",
      "name": "Titan"
    },
    "realm": {
      "id": "earthrealm",
      "type": "location",
      "name": "Earthrealm"
    },
    "faction": "Neutral",
    "role": "Villain",
    "popular": false,
    "image": {
      "assetId": "asset-kronika-portrait",
      "assetURL": "/images/characters/kronika.png",
      "assetType": "character_portrait",
      "entityId": "kronika",
      "rightsStatus": "approved",
      "attribution": "Mortal Kombat \u00a9 Warner Bros. Games / NetherRealm Studios / Fandom Community",
      "alt": "Potret karakter resmi Kronika"
    },
    "versions": [
      {
        "id": "kronika-mk11-2019",
        "label": "Mortal Kombat 11",
        "gameId": "mk11-2019",
        "gameTitle": "Mortal Kombat 11",
        "timelineId": "reboot",
        "timelineName": "Reboot Timeline",
        "abilities": [
          {
            "id": "teleportation",
            "type": "ability",
            "name": "Dimensional Teleportation"
          }
        ],
        "weapons": [],
        "organizations": [],
        "image": {
          "assetId": "asset-kronika-portrait",
          "assetURL": "/images/characters/kronika.png",
          "assetType": "character_portrait",
          "entityId": "kronika",
          "rightsStatus": "approved",
          "attribution": "Mortal Kombat \u00a9 Warner Bros. Games / NetherRealm Studios / Fandom Community",
          "alt": "Potret karakter resmi Kronika"
        },
        "verificationStatus": "verified"
      }
    ],
    "relationships": [],
    "relatedCharacters": [],
    "sources": [
      {
        "id": "fandom-kronika",
        "title": "Mortal Kombat Wiki \u2014 Kronika",
        "url": "https://mortalkombat.fandom.com/wiki/Kronika",
        "sourceType": "community-wiki",
        "verificationStatus": "verified"
      }
    ]
  },
  {
    "id": "sindel",
    "name": "Sindel",
    "aliases": [
      "Empress Sindel"
    ],
    "summary": "Queen of Edenia and Empress of Outworld, commanding a devastating sonic banshee shriek and lethal prehensile hair.",
    "biography": "Queen of Edenia and Empress of Outworld, commanding a devastating sonic banshee shriek and lethal prehensile hair.",
    "firstAppearance": {
      "id": "mk-1992",
      "type": "game",
      "name": "Mortal Kombat (1992)"
    },
    "species": {
      "id": "human",
      "type": "species",
      "name": "Edenian"
    },
    "realm": {
      "id": "edenia",
      "type": "location",
      "name": "Edenia"
    },
    "faction": "Neutral",
    "role": "Villain",
    "popular": false,
    "image": {
      "assetId": "asset-sindel-portrait",
      "assetURL": "/images/characters/sindel.png",
      "assetType": "character_portrait",
      "entityId": "sindel",
      "rightsStatus": "approved",
      "attribution": "Mortal Kombat \u00a9 Warner Bros. Games / NetherRealm Studios / Fandom Community",
      "alt": "Potret karakter resmi Sindel"
    },
    "versions": [
      {
        "id": "sindel-mk3-1995",
        "label": "Mortal Kombat 3",
        "gameId": "mk3-1995",
        "gameTitle": "Mortal Kombat 3",
        "timelineId": "original",
        "timelineName": "Original Timeline",
        "abilities": [
          {
            "id": "move-banshee-scream",
            "type": "ability",
            "name": "Levitating Banshee Scream"
          },
          {
            "id": "move-hair-whip",
            "type": "ability",
            "name": "Prehensile Hair Whip"
          },
          {
            "id": "fatality-scream-queen",
            "type": "ability",
            "name": "Fatality: Scream Queen"
          }
        ],
        "weapons": [],
        "organizations": [],
        "image": {
          "assetId": "asset-sindel-portrait",
          "assetURL": "/images/characters/sindel.png",
          "assetType": "character_portrait",
          "entityId": "sindel",
          "rightsStatus": "approved",
          "attribution": "Mortal Kombat \u00a9 Warner Bros. Games / NetherRealm Studios / Fandom Community",
          "alt": "Potret karakter resmi Sindel"
        },
        "verificationStatus": "verified"
      },
      {
        "id": "sindel-mk1-2023",
        "label": "Mortal Kombat 1 (2023)",
        "gameId": "mk1-2023",
        "gameTitle": "Mortal Kombat 1 (2023)",
        "timelineId": "new-era",
        "timelineName": "New Era",
        "abilities": [
          {
            "id": "move-banshee-scream",
            "type": "ability",
            "name": "Levitating Banshee Scream"
          },
          {
            "id": "move-hair-whip",
            "type": "ability",
            "name": "Prehensile Hair Whip"
          }
        ],
        "weapons": [],
        "organizations": [],
        "image": {
          "assetId": "asset-sindel-portrait",
          "assetURL": "/images/characters/sindel.png",
          "assetType": "character_portrait",
          "entityId": "sindel",
          "rightsStatus": "approved",
          "attribution": "Mortal Kombat \u00a9 Warner Bros. Games / NetherRealm Studios / Fandom Community",
          "alt": "Potret karakter resmi Sindel"
        },
        "verificationStatus": "verified"
      }
    ],
    "relationships": [],
    "relatedCharacters": [],
    "sources": [
      {
        "id": "fandom-sindel",
        "title": "Mortal Kombat Wiki \u2014 Sindel",
        "url": "https://mortalkombat.fandom.com/wiki/Sindel",
        "sourceType": "community-wiki",
        "verificationStatus": "verified"
      }
    ]
  },
  {
    "id": "goro",
    "name": "Goro",
    "aliases": [
      "Prince of the Shokan"
    ],
    "summary": "Four-armed Shokan prince who held the title of Mortal Kombat Grand Champion for 500 years before being defeated by Liu Kang.",
    "biography": "Four-armed Shokan prince who held the title of Mortal Kombat Grand Champion for 500 years before being defeated by Liu Kang.",
    "firstAppearance": {
      "id": "mk-1992",
      "type": "game",
      "name": "Mortal Kombat (1992)"
    },
    "species": {
      "id": "human",
      "type": "species",
      "name": "Shokan"
    },
    "realm": {
      "id": "outworld",
      "type": "location",
      "name": "Outworld"
    },
    "faction": "Neutral",
    "role": "Villain",
    "popular": false,
    "image": {
      "assetId": "asset-goro-portrait",
      "assetURL": "/images/characters/goro.png",
      "assetType": "character_portrait",
      "entityId": "goro",
      "rightsStatus": "approved",
      "attribution": "Mortal Kombat \u00a9 Warner Bros. Games / NetherRealm Studios / Fandom Community",
      "alt": "Potret karakter resmi Goro"
    },
    "versions": [
      {
        "id": "goro-mk1-1992",
        "label": "Mortal Kombat (1992)",
        "gameId": "mk1-1992",
        "gameTitle": "Mortal Kombat (1992)",
        "timelineId": "original",
        "timelineName": "Original Timeline",
        "abilities": [
          {
            "id": "move-shokan-stomp",
            "type": "ability",
            "name": "Telestomp"
          },
          {
            "id": "fatality-shokan-tear",
            "type": "ability",
            "name": "Fatality: Limb Disassembly"
          }
        ],
        "weapons": [],
        "organizations": [],
        "image": {
          "assetId": "asset-goro-portrait",
          "assetURL": "/images/characters/goro.png",
          "assetType": "character_portrait",
          "entityId": "goro",
          "rightsStatus": "approved",
          "attribution": "Mortal Kombat \u00a9 Warner Bros. Games / NetherRealm Studios / Fandom Community",
          "alt": "Potret karakter resmi Goro"
        },
        "verificationStatus": "verified"
      },
      {
        "id": "goro-mkx-2015",
        "label": "Mortal Kombat X",
        "gameId": "mkx-2015",
        "gameTitle": "Mortal Kombat X",
        "timelineId": "reboot",
        "timelineName": "Reboot Timeline",
        "abilities": [
          {
            "id": "move-shokan-stomp",
            "type": "ability",
            "name": "Telestomp"
          }
        ],
        "weapons": [],
        "organizations": [],
        "image": {
          "assetId": "asset-goro-portrait",
          "assetURL": "/images/characters/goro.png",
          "assetType": "character_portrait",
          "entityId": "goro",
          "rightsStatus": "approved",
          "attribution": "Mortal Kombat \u00a9 Warner Bros. Games / NetherRealm Studios / Fandom Community",
          "alt": "Potret karakter resmi Goro"
        },
        "verificationStatus": "verified"
      }
    ],
    "relationships": [],
    "relatedCharacters": [],
    "sources": [
      {
        "id": "fandom-goro",
        "title": "Mortal Kombat Wiki \u2014 Goro",
        "url": "https://mortalkombat.fandom.com/wiki/Goro",
        "sourceType": "community-wiki",
        "verificationStatus": "verified"
      }
    ]
  },
  {
    "id": "kintaro",
    "name": "Kintaro",
    "aliases": [
      "Tigrar Shokan Champion"
    ],
    "summary": "Fierce feline-striped Tigrar Shokan general serving as Shao Kahn's vanguard during the Outworld tournament.",
    "biography": "Fierce feline-striped Tigrar Shokan general serving as Shao Kahn's vanguard during the Outworld tournament.",
    "firstAppearance": {
      "id": "mk-1992",
      "type": "game",
      "name": "Mortal Kombat (1992)"
    },
    "species": {
      "id": "human",
      "type": "species",
      "name": "Shokan (Tigrar)"
    },
    "realm": {
      "id": "outworld",
      "type": "location",
      "name": "Outworld"
    },
    "faction": "Neutral",
    "role": "Villain",
    "popular": false,
    "image": {
      "assetId": "asset-kintaro-portrait",
      "assetURL": "/images/characters/kintaro.png",
      "assetType": "character_portrait",
      "entityId": "kintaro",
      "rightsStatus": "approved",
      "attribution": "Mortal Kombat \u00a9 Warner Bros. Games / NetherRealm Studios / Fandom Community",
      "alt": "Potret karakter resmi Kintaro"
    },
    "versions": [
      {
        "id": "kintaro-mk2-1993",
        "label": "Mortal Kombat II",
        "gameId": "mk2-1993",
        "gameTitle": "Mortal Kombat II",
        "timelineId": "original",
        "timelineName": "Original Timeline",
        "abilities": [
          {
            "id": "move-shokan-stomp",
            "type": "ability",
            "name": "Telestomp"
          }
        ],
        "weapons": [],
        "organizations": [],
        "image": {
          "assetId": "asset-kintaro-portrait",
          "assetURL": "/images/characters/kintaro.png",
          "assetType": "character_portrait",
          "entityId": "kintaro",
          "rightsStatus": "approved",
          "attribution": "Mortal Kombat \u00a9 Warner Bros. Games / NetherRealm Studios / Fandom Community",
          "alt": "Potret karakter resmi Kintaro"
        },
        "verificationStatus": "verified"
      }
    ],
    "relationships": [],
    "relatedCharacters": [],
    "sources": [
      {
        "id": "fandom-kintaro",
        "title": "Mortal Kombat Wiki \u2014 Kintaro",
        "url": "https://mortalkombat.fandom.com/wiki/Kintaro",
        "sourceType": "community-wiki",
        "verificationStatus": "verified"
      }
    ]
  },
  {
    "id": "shinnok",
    "name": "Shinnok",
    "aliases": [
      "The Fallen Elder God"
    ],
    "summary": "Banished Elder God of Death and Darkness who plotted to conquer the realms using his powerful sacred amulet.",
    "biography": "Banished Elder God of Death and Darkness who plotted to conquer the realms using his powerful sacred amulet.",
    "firstAppearance": {
      "id": "mk-1992",
      "type": "game",
      "name": "Mortal Kombat (1992)"
    },
    "species": {
      "id": "human",
      "type": "species",
      "name": "Elder God (Fallen)"
    },
    "realm": {
      "id": "netherrealm",
      "type": "location",
      "name": "Netherrealm"
    },
    "faction": "Brotherhood of Shadow",
    "role": "Villain",
    "popular": false,
    "image": {
      "assetId": "asset-shinnok-portrait",
      "assetURL": "/images/characters/shinnok.png",
      "assetType": "character_portrait",
      "entityId": "shinnok",
      "rightsStatus": "approved",
      "attribution": "Mortal Kombat \u00a9 Warner Bros. Games / NetherRealm Studios / Fandom Community",
      "alt": "Potret karakter resmi Shinnok"
    },
    "versions": [
      {
        "id": "shinnok-mk4-1997",
        "label": "Mortal Kombat 4",
        "gameId": "mk4-1997",
        "gameTitle": "Mortal Kombat 4",
        "timelineId": "original",
        "timelineName": "Original Timeline",
        "abilities": [
          {
            "id": "necromancy",
            "type": "ability",
            "name": "Necromancy"
          },
          {
            "id": "teleportation",
            "type": "ability",
            "name": "Dimensional Teleportation"
          }
        ],
        "weapons": [],
        "organizations": [
          {
            "id": "brotherhood-of-shadow",
            "type": "organization",
            "name": "Brotherhood of Shadow"
          }
        ],
        "image": {
          "assetId": "asset-shinnok-portrait",
          "assetURL": "/images/characters/shinnok.png",
          "assetType": "character_portrait",
          "entityId": "shinnok",
          "rightsStatus": "approved",
          "attribution": "Mortal Kombat \u00a9 Warner Bros. Games / NetherRealm Studios / Fandom Community",
          "alt": "Potret karakter resmi Shinnok"
        },
        "verificationStatus": "verified"
      },
      {
        "id": "shinnok-mkx-2015",
        "label": "Mortal Kombat X",
        "gameId": "mkx-2015",
        "gameTitle": "Mortal Kombat X",
        "timelineId": "reboot",
        "timelineName": "Reboot Timeline",
        "abilities": [
          {
            "id": "necromancy",
            "type": "ability",
            "name": "Necromancy"
          },
          {
            "id": "teleportation",
            "type": "ability",
            "name": "Dimensional Teleportation"
          }
        ],
        "weapons": [],
        "organizations": [
          {
            "id": "brotherhood-of-shadow",
            "type": "organization",
            "name": "Brotherhood of Shadow"
          }
        ],
        "image": {
          "assetId": "asset-shinnok-portrait",
          "assetURL": "/images/characters/shinnok.png",
          "assetType": "character_portrait",
          "entityId": "shinnok",
          "rightsStatus": "approved",
          "attribution": "Mortal Kombat \u00a9 Warner Bros. Games / NetherRealm Studios / Fandom Community",
          "alt": "Potret karakter resmi Shinnok"
        },
        "verificationStatus": "verified"
      }
    ],
    "relationships": [],
    "relatedCharacters": [],
    "sources": [
      {
        "id": "fandom-shinnok",
        "title": "Mortal Kombat Wiki \u2014 Shinnok",
        "url": "https://mortalkombat.fandom.com/wiki/Shinnok",
        "sourceType": "community-wiki",
        "verificationStatus": "verified"
      }
    ]
  },
  {
    "id": "fujin",
    "name": "Fujin",
    "aliases": [
      "God of Wind"
    ],
    "summary": "Benevolent God of Wind and brother to Raiden, utilizing gale force whirlwinds and levitation in Earthrealm's defense.",
    "biography": "Benevolent God of Wind and brother to Raiden, utilizing gale force whirlwinds and levitation in Earthrealm's defense.",
    "firstAppearance": {
      "id": "mk-1992",
      "type": "game",
      "name": "Mortal Kombat (1992)"
    },
    "species": {
      "id": "human",
      "type": "species",
      "name": "God"
    },
    "realm": {
      "id": "earthrealm",
      "type": "location",
      "name": "Earthrealm"
    },
    "faction": "White Lotus Society",
    "role": "Villain",
    "popular": false,
    "image": {
      "assetId": "asset-fujin-portrait",
      "assetURL": "/images/characters/fujin.png",
      "assetType": "character_portrait",
      "entityId": "fujin",
      "rightsStatus": "approved",
      "attribution": "Mortal Kombat \u00a9 Warner Bros. Games / NetherRealm Studios / Fandom Community",
      "alt": "Potret karakter resmi Fujin"
    },
    "versions": [
      {
        "id": "fujin-mk4-1997",
        "label": "Mortal Kombat 4",
        "gameId": "mk4-1997",
        "gameTitle": "Mortal Kombat 4",
        "timelineId": "original",
        "timelineName": "Original Timeline",
        "abilities": [
          {
            "id": "move-wind-tornado",
            "type": "ability",
            "name": "Wind Tornado Vortex"
          },
          {
            "id": "move-wind-kick",
            "type": "ability",
            "name": "Tornado Gale Kick"
          }
        ],
        "weapons": [],
        "organizations": [
          {
            "id": "white-lotus",
            "type": "organization",
            "name": "White Lotus Society"
          }
        ],
        "image": {
          "assetId": "asset-fujin-portrait",
          "assetURL": "/images/characters/fujin.png",
          "assetType": "character_portrait",
          "entityId": "fujin",
          "rightsStatus": "approved",
          "attribution": "Mortal Kombat \u00a9 Warner Bros. Games / NetherRealm Studios / Fandom Community",
          "alt": "Potret karakter resmi Fujin"
        },
        "verificationStatus": "verified"
      },
      {
        "id": "fujin-mk-armageddon-2006",
        "label": "Mortal Kombat: Armageddon",
        "gameId": "mk-armageddon-2006",
        "gameTitle": "Mortal Kombat: Armageddon",
        "timelineId": "original",
        "timelineName": "Original Timeline",
        "abilities": [
          {
            "id": "move-wind-tornado",
            "type": "ability",
            "name": "Wind Tornado Vortex"
          }
        ],
        "weapons": [],
        "organizations": [
          {
            "id": "white-lotus",
            "type": "organization",
            "name": "White Lotus Society"
          }
        ],
        "image": {
          "assetId": "asset-fujin-portrait",
          "assetURL": "/images/characters/fujin.png",
          "assetType": "character_portrait",
          "entityId": "fujin",
          "rightsStatus": "approved",
          "attribution": "Mortal Kombat \u00a9 Warner Bros. Games / NetherRealm Studios / Fandom Community",
          "alt": "Potret karakter resmi Fujin"
        },
        "verificationStatus": "verified"
      }
    ],
    "relationships": [],
    "relatedCharacters": [],
    "sources": [
      {
        "id": "fandom-fujin",
        "title": "Mortal Kombat Wiki \u2014 Fujin",
        "url": "https://mortalkombat.fandom.com/wiki/Fujin",
        "sourceType": "community-wiki",
        "verificationStatus": "verified"
      }
    ]
  },
  {
    "id": "frost",
    "name": "Frost",
    "aliases": [
      "Grandmaster of the Cyber Lin Kuei"
    ],
    "summary": "Ambitious cryomancer apprentice of Sub-Zero whose hubris drove her to betray her master and convert herself into a cybernetic leader.",
    "biography": "Ambitious cryomancer apprentice of Sub-Zero whose hubris drove her to betray her master and convert herself into a cybernetic leader.",
    "firstAppearance": {
      "id": "mk-1992",
      "type": "game",
      "name": "Mortal Kombat (1992)"
    },
    "species": {
      "id": "human",
      "type": "species",
      "name": "Cyborg / Cryomancer"
    },
    "realm": {
      "id": "earthrealm",
      "type": "location",
      "name": "Earthrealm"
    },
    "faction": "Lin Kuei",
    "role": "Villain",
    "popular": false,
    "image": {
      "assetId": "asset-frost-portrait",
      "assetURL": "/images/characters/frost.png",
      "assetType": "character_portrait",
      "entityId": "frost",
      "rightsStatus": "approved",
      "attribution": "Mortal Kombat \u00a9 Warner Bros. Games / NetherRealm Studios / Fandom Community",
      "alt": "Potret karakter resmi Frost"
    },
    "versions": [
      {
        "id": "frost-mk-deadly-alliance-2002",
        "label": "Mortal Kombat: Deadly Alliance",
        "gameId": "mk-deadly-alliance-2002",
        "gameTitle": "Mortal Kombat: Deadly Alliance",
        "timelineId": "original",
        "timelineName": "Original Timeline",
        "abilities": [
          {
            "id": "cryomancy",
            "type": "ability",
            "name": "Cryomancy"
          },
          {
            "id": "move-cyber-trap",
            "type": "ability",
            "name": "Cryo Floor Trap"
          }
        ],
        "weapons": [
          {
            "id": "kori-blade",
            "type": "weapon",
            "name": "K\u014dri Blade"
          }
        ],
        "organizations": [
          {
            "id": "lin-kuei",
            "type": "organization",
            "name": "Lin Kuei"
          }
        ],
        "image": {
          "assetId": "asset-frost-portrait",
          "assetURL": "/images/characters/frost.png",
          "assetType": "character_portrait",
          "entityId": "frost",
          "rightsStatus": "approved",
          "attribution": "Mortal Kombat \u00a9 Warner Bros. Games / NetherRealm Studios / Fandom Community",
          "alt": "Potret karakter resmi Frost"
        },
        "verificationStatus": "verified"
      },
      {
        "id": "frost-mk11-2019",
        "label": "Mortal Kombat 11",
        "gameId": "mk11-2019",
        "gameTitle": "Mortal Kombat 11",
        "timelineId": "reboot",
        "timelineName": "Reboot Timeline",
        "abilities": [
          {
            "id": "cryomancy",
            "type": "ability",
            "name": "Cryomancy"
          },
          {
            "id": "move-cyber-trap",
            "type": "ability",
            "name": "Cryo Floor Trap"
          }
        ],
        "weapons": [],
        "organizations": [
          {
            "id": "lin-kuei",
            "type": "organization",
            "name": "Lin Kuei"
          }
        ],
        "image": {
          "assetId": "asset-frost-portrait",
          "assetURL": "/images/characters/frost.png",
          "assetType": "character_portrait",
          "entityId": "frost",
          "rightsStatus": "approved",
          "attribution": "Mortal Kombat \u00a9 Warner Bros. Games / NetherRealm Studios / Fandom Community",
          "alt": "Potret karakter resmi Frost"
        },
        "verificationStatus": "verified"
      }
    ],
    "relationships": [
      {
        "type": "enemyOf",
        "label": "Musuh",
        "target": {
          "id": "sub-zero",
          "type": "character",
          "name": "sub-zero"
        },
        "context": "Reboot Timeline",
        "verificationStatus": "verified"
      }
    ],
    "relatedCharacters": [
      {
        "id": "sub-zero",
        "type": "character",
        "name": "sub-zero"
      }
    ],
    "sources": [
      {
        "id": "fandom-frost",
        "title": "Mortal Kombat Wiki \u2014 Frost",
        "url": "https://mortalkombat.fandom.com/wiki/Frost",
        "sourceType": "community-wiki",
        "verificationStatus": "verified"
      }
    ]
  },
  {
    "id": "boraicho",
    "name": "Bo' Rai Cho",
    "aliases": [
      "The Drunken Master"
    ],
    "summary": "Jovial martial arts master from Outworld who trained Liu Kang, Kung Lao, and Shujinko in the legendary Drunken Fist style.",
    "biography": "Jovial martial arts master from Outworld who trained Liu Kang, Kung Lao, and Shujinko in the legendary Drunken Fist style.",
    "firstAppearance": {
      "id": "mk-1992",
      "type": "game",
      "name": "Mortal Kombat (1992)"
    },
    "species": {
      "id": "human",
      "type": "species",
      "name": "Outworlder"
    },
    "realm": {
      "id": "outworld",
      "type": "location",
      "name": "Outworld"
    },
    "faction": "White Lotus Society",
    "role": "Villain",
    "popular": false,
    "image": {
      "assetId": "asset-boraicho-portrait",
      "assetURL": "/images/characters/boraicho.png",
      "assetType": "character_portrait",
      "entityId": "boraicho",
      "rightsStatus": "approved",
      "attribution": "Mortal Kombat \u00a9 Warner Bros. Games / NetherRealm Studios / Fandom Community",
      "alt": "Potret karakter resmi Bo' Rai Cho"
    },
    "versions": [
      {
        "id": "boraicho-mk-deadly-alliance-2002",
        "label": "Mortal Kombat: Deadly Alliance",
        "gameId": "mk-deadly-alliance-2002",
        "gameTitle": "Mortal Kombat: Deadly Alliance",
        "timelineId": "original",
        "timelineName": "Original Timeline",
        "abilities": [
          {
            "id": "move-drunken-fist",
            "type": "ability",
            "name": "Drunken Fist Roll"
          },
          {
            "id": "move-puke-puddle",
            "type": "ability",
            "name": "Hazardous Fluid Puddle"
          }
        ],
        "weapons": [],
        "organizations": [
          {
            "id": "white-lotus",
            "type": "organization",
            "name": "White Lotus Society"
          }
        ],
        "image": {
          "assetId": "asset-boraicho-portrait",
          "assetURL": "/images/characters/boraicho.png",
          "assetType": "character_portrait",
          "entityId": "boraicho",
          "rightsStatus": "approved",
          "attribution": "Mortal Kombat \u00a9 Warner Bros. Games / NetherRealm Studios / Fandom Community",
          "alt": "Potret karakter resmi Bo' Rai Cho"
        },
        "verificationStatus": "verified"
      },
      {
        "id": "boraicho-mkx-2015",
        "label": "Mortal Kombat X",
        "gameId": "mkx-2015",
        "gameTitle": "Mortal Kombat X",
        "timelineId": "reboot",
        "timelineName": "Reboot Timeline",
        "abilities": [
          {
            "id": "move-drunken-fist",
            "type": "ability",
            "name": "Drunken Fist Roll"
          }
        ],
        "weapons": [],
        "organizations": [
          {
            "id": "white-lotus",
            "type": "organization",
            "name": "White Lotus Society"
          }
        ],
        "image": {
          "assetId": "asset-boraicho-portrait",
          "assetURL": "/images/characters/boraicho.png",
          "assetType": "character_portrait",
          "entityId": "boraicho",
          "rightsStatus": "approved",
          "attribution": "Mortal Kombat \u00a9 Warner Bros. Games / NetherRealm Studios / Fandom Community",
          "alt": "Potret karakter resmi Bo' Rai Cho"
        },
        "verificationStatus": "verified"
      }
    ],
    "relationships": [
      {
        "type": "alliedWith",
        "label": "Sekutu",
        "target": {
          "id": "liu-kang",
          "type": "character",
          "name": "liu-kang"
        },
        "context": "Original & Reboot Timelines",
        "verificationStatus": "verified"
      }
    ],
    "relatedCharacters": [
      {
        "id": "liu-kang",
        "type": "character",
        "name": "liu-kang"
      }
    ],
    "sources": [
      {
        "id": "fandom-boraicho",
        "title": "Mortal Kombat Wiki \u2014 Bo' Rai Cho",
        "url": "https://mortalkombat.fandom.com/wiki/Bo%27_Rai_Cho",
        "sourceType": "community-wiki",
        "verificationStatus": "verified"
      }
    ]
  },
  {
    "id": "limei",
    "name": "Li Mei",
    "aliases": [
      "First Constable of Sun Do"
    ],
    "summary": "Noble Sun Do martial artist who fought to liberate her people from the Deadly Alliance, now serving as Chief Constable of the imperial capital.",
    "biography": "Noble Sun Do martial artist who fought to liberate her people from the Deadly Alliance, now serving as Chief Constable of the imperial capital.",
    "firstAppearance": {
      "id": "mk-1992",
      "type": "game",
      "name": "Mortal Kombat (1992)"
    },
    "species": {
      "id": "human",
      "type": "species",
      "name": "Outworlder"
    },
    "realm": {
      "id": "outworld",
      "type": "location",
      "name": "Outworld"
    },
    "faction": "Neutral",
    "role": "Villain",
    "popular": false,
    "image": {
      "assetId": "asset-limei-portrait",
      "assetURL": "/images/characters/limei.png",
      "assetType": "character_portrait",
      "entityId": "limei",
      "rightsStatus": "approved",
      "attribution": "Mortal Kombat \u00a9 Warner Bros. Games / NetherRealm Studios / Fandom Community",
      "alt": "Potret karakter resmi Li Mei"
    },
    "versions": [
      {
        "id": "limei-mk-deadly-alliance-2002",
        "label": "Mortal Kombat: Deadly Alliance",
        "gameId": "mk-deadly-alliance-2002",
        "gameTitle": "Mortal Kombat: Deadly Alliance",
        "timelineId": "original",
        "timelineName": "Original Timeline",
        "abilities": [
          {
            "id": "move-energy-spark",
            "type": "ability",
            "name": "Luminescent Spark Burst"
          }
        ],
        "weapons": [],
        "organizations": [],
        "image": {
          "assetId": "asset-limei-portrait",
          "assetURL": "/images/characters/limei.png",
          "assetType": "character_portrait",
          "entityId": "limei",
          "rightsStatus": "approved",
          "attribution": "Mortal Kombat \u00a9 Warner Bros. Games / NetherRealm Studios / Fandom Community",
          "alt": "Potret karakter resmi Li Mei"
        },
        "verificationStatus": "verified"
      },
      {
        "id": "limei-mk1-2023",
        "label": "Mortal Kombat 1 (2023)",
        "gameId": "mk1-2023",
        "gameTitle": "Mortal Kombat 1 (2023)",
        "timelineId": "new-era",
        "timelineName": "New Era",
        "abilities": [
          {
            "id": "move-energy-spark",
            "type": "ability",
            "name": "Luminescent Spark Burst"
          }
        ],
        "weapons": [],
        "organizations": [
          {
            "id": "umgadi",
            "type": "organization",
            "name": "The Umgadi"
          }
        ],
        "image": {
          "assetId": "asset-limei-portrait",
          "assetURL": "/images/characters/limei.png",
          "assetType": "character_portrait",
          "entityId": "limei",
          "rightsStatus": "approved",
          "attribution": "Mortal Kombat \u00a9 Warner Bros. Games / NetherRealm Studios / Fandom Community",
          "alt": "Potret karakter resmi Li Mei"
        },
        "verificationStatus": "verified"
      }
    ],
    "relationships": [],
    "relatedCharacters": [],
    "sources": [
      {
        "id": "fandom-limei",
        "title": "Mortal Kombat Wiki \u2014 Li Mei",
        "url": "https://mortalkombat.fandom.com/wiki/Li_Mei",
        "sourceType": "community-wiki",
        "verificationStatus": "verified"
      }
    ]
  },
  {
    "id": "tanya",
    "name": "Tanya",
    "aliases": [
      "Leader of the Umgadi"
    ],
    "summary": "Edenian diplomat whose allegiance shifted during Shinnok's war; reimagined in the New Era as the disciplined leader of the royal Umgadi guard.",
    "biography": "Edenian diplomat whose allegiance shifted during Shinnok's war; reimagined in the New Era as the disciplined leader of the royal Umgadi guard.",
    "firstAppearance": {
      "id": "mk-1992",
      "type": "game",
      "name": "Mortal Kombat (1992)"
    },
    "species": {
      "id": "human",
      "type": "species",
      "name": "Edenian"
    },
    "realm": {
      "id": "edenia",
      "type": "location",
      "name": "Edenia"
    },
    "faction": "Neutral",
    "role": "Villain",
    "popular": false,
    "image": {
      "assetId": "asset-tanya-portrait",
      "assetURL": "/images/characters/tanya.png",
      "assetType": "character_portrait",
      "entityId": "tanya",
      "rightsStatus": "approved",
      "attribution": "Mortal Kombat \u00a9 Warner Bros. Games / NetherRealm Studios / Fandom Community",
      "alt": "Potret karakter resmi Tanya"
    },
    "versions": [
      {
        "id": "tanya-mk4-1997",
        "label": "Mortal Kombat 4",
        "gameId": "mk4-1997",
        "gameTitle": "Mortal Kombat 4",
        "timelineId": "original",
        "timelineName": "Original Timeline",
        "abilities": [],
        "weapons": [
          {
            "id": "daggers-of-denial",
            "type": "weapon",
            "name": "Kobu Jutsu Tonfa Daggers"
          }
        ],
        "organizations": [],
        "image": {
          "assetId": "asset-tanya-portrait",
          "assetURL": "/images/characters/tanya.png",
          "assetType": "character_portrait",
          "entityId": "tanya",
          "rightsStatus": "approved",
          "attribution": "Mortal Kombat \u00a9 Warner Bros. Games / NetherRealm Studios / Fandom Community",
          "alt": "Potret karakter resmi Tanya"
        },
        "verificationStatus": "verified"
      },
      {
        "id": "tanya-mk1-2023",
        "label": "Mortal Kombat 1 (2023)",
        "gameId": "mk1-2023",
        "gameTitle": "Mortal Kombat 1 (2023)",
        "timelineId": "new-era",
        "timelineName": "New Era",
        "abilities": [],
        "weapons": [
          {
            "id": "daggers-of-denial",
            "type": "weapon",
            "name": "Kobu Jutsu Tonfa Daggers"
          }
        ],
        "organizations": [
          {
            "id": "umgadi",
            "type": "organization",
            "name": "The Umgadi"
          }
        ],
        "image": {
          "assetId": "asset-tanya-portrait",
          "assetURL": "/images/characters/tanya.png",
          "assetType": "character_portrait",
          "entityId": "tanya",
          "rightsStatus": "approved",
          "attribution": "Mortal Kombat \u00a9 Warner Bros. Games / NetherRealm Studios / Fandom Community",
          "alt": "Potret karakter resmi Tanya"
        },
        "verificationStatus": "verified"
      }
    ],
    "relationships": [
      {
        "type": "alliedWith",
        "label": "Sekutu",
        "target": {
          "id": "mileena",
          "type": "character",
          "name": "Mileena"
        },
        "context": "Reboot & New Era Timelines",
        "verificationStatus": "verified"
      }
    ],
    "relatedCharacters": [
      {
        "id": "mileena",
        "type": "character",
        "name": "Mileena"
      }
    ],
    "sources": [
      {
        "id": "fandom-tanya",
        "title": "Mortal Kombat Wiki \u2014 Tanya",
        "url": "https://mortalkombat.fandom.com/wiki/Tanya",
        "sourceType": "community-wiki",
        "verificationStatus": "verified"
      }
    ]
  },
  {
    "id": "havik",
    "name": "Havik",
    "aliases": [
      "Cleric of Chaos"
    ],
    "summary": "Cleric from Chaosrealm who embraces bodily contortion, self-mutilation, and anarchy to dismantle rigid oppressive order across all realms.",
    "biography": "Cleric from Chaosrealm who embraces bodily contortion, self-mutilation, and anarchy to dismantle rigid oppressive order across all realms.",
    "firstAppearance": {
      "id": "mk-1992",
      "type": "game",
      "name": "Mortal Kombat (1992)"
    },
    "species": {
      "id": "human",
      "type": "species",
      "name": "Chaosrealmer"
    },
    "realm": {
      "id": "chaosrealm",
      "type": "location",
      "name": "Chaosrealm"
    },
    "faction": "Neutral",
    "role": "Villain",
    "popular": false,
    "image": {
      "assetId": "asset-havik-portrait",
      "assetURL": "/images/characters/havik.png",
      "assetType": "character_portrait",
      "entityId": "havik",
      "rightsStatus": "approved",
      "attribution": "Mortal Kombat \u00a9 Warner Bros. Games / NetherRealm Studios / Fandom Community",
      "alt": "Potret karakter resmi Havik"
    },
    "versions": [
      {
        "id": "havik-mk-deception-2004",
        "label": "Mortal Kombat: Deception",
        "gameId": "mk-deception-2004",
        "gameTitle": "Mortal Kombat: Deception",
        "timelineId": "original",
        "timelineName": "Original Timeline",
        "abilities": [
          {
            "id": "move-bone-twist",
            "type": "ability",
            "name": "360 Torso Contortion"
          }
        ],
        "weapons": [],
        "organizations": [],
        "image": {
          "assetId": "asset-havik-portrait",
          "assetURL": "/images/characters/havik.png",
          "assetType": "character_portrait",
          "entityId": "havik",
          "rightsStatus": "approved",
          "attribution": "Mortal Kombat \u00a9 Warner Bros. Games / NetherRealm Studios / Fandom Community",
          "alt": "Potret karakter resmi Havik"
        },
        "verificationStatus": "verified"
      },
      {
        "id": "havik-mk1-2023",
        "label": "Mortal Kombat 1 (2023)",
        "gameId": "mk1-2023",
        "gameTitle": "Mortal Kombat 1 (2023)",
        "timelineId": "new-era",
        "timelineName": "New Era",
        "abilities": [
          {
            "id": "move-bone-twist",
            "type": "ability",
            "name": "360 Torso Contortion"
          }
        ],
        "weapons": [],
        "organizations": [],
        "image": {
          "assetId": "asset-havik-portrait",
          "assetURL": "/images/characters/havik.png",
          "assetType": "character_portrait",
          "entityId": "havik",
          "rightsStatus": "approved",
          "attribution": "Mortal Kombat \u00a9 Warner Bros. Games / NetherRealm Studios / Fandom Community",
          "alt": "Potret karakter resmi Havik"
        },
        "verificationStatus": "verified"
      }
    ],
    "relationships": [],
    "relatedCharacters": [],
    "sources": [
      {
        "id": "fandom-havik",
        "title": "Mortal Kombat Wiki \u2014 Havik",
        "url": "https://mortalkombat.fandom.com/wiki/Havik",
        "sourceType": "community-wiki",
        "verificationStatus": "verified"
      }
    ]
  },
  {
    "id": "cassiecage",
    "name": "Cassie Cage",
    "aliases": [
      "Commander Cassandra Cage"
    ],
    "summary": "Daughter of Johnny Cage and Sonya Blade, leading Earthrealm's new-generation strike team and inheriting her father's ancient green halo power.",
    "biography": "Daughter of Johnny Cage and Sonya Blade, leading Earthrealm's new-generation strike team and inheriting her father's ancient green halo power.",
    "firstAppearance": {
      "id": "mk-1992",
      "type": "game",
      "name": "Mortal Kombat (1992)"
    },
    "species": {
      "id": "human",
      "type": "species",
      "name": "Human"
    },
    "realm": {
      "id": "earthrealm",
      "type": "location",
      "name": "Earthrealm"
    },
    "faction": "Special Forces",
    "role": "Villain",
    "popular": false,
    "image": {
      "assetId": "asset-cassiecage-portrait",
      "assetURL": "/images/characters/cassiecage.png",
      "assetType": "character_portrait",
      "entityId": "cassiecage",
      "rightsStatus": "approved",
      "attribution": "Mortal Kombat \u00a9 Warner Bros. Games / NetherRealm Studios / Fandom Community",
      "alt": "Potret karakter resmi Cassie Cage"
    },
    "versions": [
      {
        "id": "cassiecage-mkx-2015",
        "label": "Mortal Kombat X",
        "gameId": "mkx-2015",
        "gameTitle": "Mortal Kombat X",
        "timelineId": "reboot",
        "timelineName": "Reboot Timeline",
        "abilities": [
          {
            "id": "move-shadow-kick",
            "type": "ability",
            "name": "Shadow Kick"
          },
          {
            "id": "move-nut-punch",
            "type": "ability",
            "name": "Nut Punch"
          }
        ],
        "weapons": [],
        "organizations": [
          {
            "id": "special-forces",
            "type": "organization",
            "name": "Special Forces"
          }
        ],
        "image": {
          "assetId": "asset-cassiecage-portrait",
          "assetURL": "/images/characters/cassiecage.png",
          "assetType": "character_portrait",
          "entityId": "cassiecage",
          "rightsStatus": "approved",
          "attribution": "Mortal Kombat \u00a9 Warner Bros. Games / NetherRealm Studios / Fandom Community",
          "alt": "Potret karakter resmi Cassie Cage"
        },
        "verificationStatus": "verified"
      },
      {
        "id": "cassiecage-mk11-2019",
        "label": "Mortal Kombat 11",
        "gameId": "mk11-2019",
        "gameTitle": "Mortal Kombat 11",
        "timelineId": "reboot",
        "timelineName": "Reboot Timeline",
        "abilities": [
          {
            "id": "move-shadow-kick",
            "type": "ability",
            "name": "Shadow Kick"
          },
          {
            "id": "move-nut-punch",
            "type": "ability",
            "name": "Nut Punch"
          }
        ],
        "weapons": [],
        "organizations": [
          {
            "id": "special-forces",
            "type": "organization",
            "name": "Special Forces"
          }
        ],
        "image": {
          "assetId": "asset-cassiecage-portrait",
          "assetURL": "/images/characters/cassiecage.png",
          "assetType": "character_portrait",
          "entityId": "cassiecage",
          "rightsStatus": "approved",
          "attribution": "Mortal Kombat \u00a9 Warner Bros. Games / NetherRealm Studios / Fandom Community",
          "alt": "Potret karakter resmi Cassie Cage"
        },
        "verificationStatus": "verified"
      }
    ],
    "relationships": [
      {
        "type": "enemyOf",
        "label": "Musuh",
        "target": {
          "id": "shinnok",
          "type": "character",
          "name": "Shinnok"
        },
        "context": "Reboot Timeline (MKX)",
        "verificationStatus": "verified"
      },
      {
        "type": "alliedWith",
        "label": "Sekutu",
        "target": {
          "id": "sonya-blade",
          "type": "character",
          "name": "sonya-blade"
        },
        "context": "Reboot Timeline",
        "verificationStatus": "verified"
      }
    ],
    "relatedCharacters": [
      {
        "id": "shinnok",
        "type": "character",
        "name": "Shinnok"
      },
      {
        "id": "sonya-blade",
        "type": "character",
        "name": "sonya-blade"
      }
    ],
    "sources": [
      {
        "id": "fandom-cassiecage",
        "title": "Mortal Kombat Wiki \u2014 Cassie Cage",
        "url": "https://mortalkombat.fandom.com/wiki/Cassie_Cage",
        "sourceType": "community-wiki",
        "verificationStatus": "verified"
      }
    ]
  },
  {
    "id": "kotalkahn",
    "name": "Kotal Kahn",
    "aliases": [
      "Ko'atal (Sun God)"
    ],
    "summary": "Osh-Tekk warrior and Sun God who deposed Mileena during the Outworld Civil War to become a pragmatic Emperor of Outworld.",
    "biography": "Osh-Tekk warrior and Sun God who deposed Mileena during the Outworld Civil War to become a pragmatic Emperor of Outworld.",
    "firstAppearance": {
      "id": "mk-1992",
      "type": "game",
      "name": "Mortal Kombat (1992)"
    },
    "species": {
      "id": "human",
      "type": "species",
      "name": "Osh-Tekk"
    },
    "realm": {
      "id": "outworld",
      "type": "location",
      "name": "Outworld"
    },
    "faction": "Osh-Tekk Tribe",
    "role": "Villain",
    "popular": false,
    "image": {
      "assetId": "asset-kotalkahn-portrait",
      "assetURL": "/images/characters/kotalkahn.png",
      "assetType": "character_portrait",
      "entityId": "kotalkahn",
      "rightsStatus": "approved",
      "attribution": "Mortal Kombat \u00a9 Warner Bros. Games / NetherRealm Studios / Fandom Community",
      "alt": "Potret karakter resmi Kotal Kahn"
    },
    "versions": [
      {
        "id": "kotalkahn-mkx-2015",
        "label": "Mortal Kombat X",
        "gameId": "mkx-2015",
        "gameTitle": "Mortal Kombat X",
        "timelineId": "reboot",
        "timelineName": "Reboot Timeline",
        "abilities": [
          {
            "id": "move-sun-ray",
            "type": "ability",
            "name": "Sun God's Ray"
          },
          {
            "id": "move-blood-tentacles",
            "type": "ability",
            "name": "Blood Tentacles"
          }
        ],
        "weapons": [],
        "organizations": [
          {
            "id": "osh-tekk",
            "type": "organization",
            "name": "Osh-Tekk Tribe"
          }
        ],
        "image": {
          "assetId": "asset-kotalkahn-portrait",
          "assetURL": "/images/characters/kotalkahn.png",
          "assetType": "character_portrait",
          "entityId": "kotalkahn",
          "rightsStatus": "approved",
          "attribution": "Mortal Kombat \u00a9 Warner Bros. Games / NetherRealm Studios / Fandom Community",
          "alt": "Potret karakter resmi Kotal Kahn"
        },
        "verificationStatus": "verified"
      },
      {
        "id": "kotalkahn-mk11-2019",
        "label": "Mortal Kombat 11",
        "gameId": "mk11-2019",
        "gameTitle": "Mortal Kombat 11",
        "timelineId": "reboot",
        "timelineName": "Reboot Timeline",
        "abilities": [
          {
            "id": "move-sun-ray",
            "type": "ability",
            "name": "Sun God's Ray"
          }
        ],
        "weapons": [],
        "organizations": [
          {
            "id": "osh-tekk",
            "type": "organization",
            "name": "Osh-Tekk Tribe"
          }
        ],
        "image": {
          "assetId": "asset-kotalkahn-portrait",
          "assetURL": "/images/characters/kotalkahn.png",
          "assetType": "character_portrait",
          "entityId": "kotalkahn",
          "rightsStatus": "approved",
          "attribution": "Mortal Kombat \u00a9 Warner Bros. Games / NetherRealm Studios / Fandom Community",
          "alt": "Potret karakter resmi Kotal Kahn"
        },
        "verificationStatus": "verified"
      }
    ],
    "relationships": [
      {
        "type": "enemyOf",
        "label": "Musuh",
        "target": {
          "id": "mileena",
          "type": "character",
          "name": "Mileena"
        },
        "context": "Reboot Timeline (Outworld Civil War)",
        "verificationStatus": "verified"
      }
    ],
    "relatedCharacters": [
      {
        "id": "mileena",
        "type": "character",
        "name": "Mileena"
      }
    ],
    "sources": [
      {
        "id": "fandom-kotalkahn",
        "title": "Mortal Kombat Wiki \u2014 Kotal Kahn",
        "url": "https://mortalkombat.fandom.com/wiki/Kotal_Kahn",
        "sourceType": "community-wiki",
        "verificationStatus": "verified"
      }
    ]
  },
  {
    "id": "erronblack",
    "name": "Erron Black",
    "aliases": [
      "The Outworld Gunslinger"
    ],
    "summary": "Earthrealm 19th-century mercenary cowboy granted slowed aging by Shang Tsung, working as an Outworld gunslinger for highest bidder.",
    "biography": "Earthrealm 19th-century mercenary cowboy granted slowed aging by Shang Tsung, working as an Outworld gunslinger for highest bidder.",
    "firstAppearance": {
      "id": "mk-1992",
      "type": "game",
      "name": "Mortal Kombat (1992)"
    },
    "species": {
      "id": "human",
      "type": "species",
      "name": "Human"
    },
    "realm": {
      "id": "earthrealm",
      "type": "location",
      "name": "Earthrealm"
    },
    "faction": "Black Dragon",
    "role": "Villain",
    "popular": false,
    "image": {
      "assetId": "asset-erronblack-portrait",
      "assetURL": "/images/characters/erronblack.png",
      "assetType": "character_portrait",
      "entityId": "erronblack",
      "rightsStatus": "approved",
      "attribution": "Mortal Kombat \u00a9 Warner Bros. Games / NetherRealm Studios / Fandom Community",
      "alt": "Potret karakter resmi Erron Black"
    },
    "versions": [
      {
        "id": "erronblack-mkx-2015",
        "label": "Mortal Kombat X",
        "gameId": "mkx-2015",
        "gameTitle": "Mortal Kombat X",
        "timelineId": "reboot",
        "timelineName": "Reboot Timeline",
        "abilities": [
          {
            "id": "move-revolver-quickdraw",
            "type": "ability",
            "name": "Sand Slam & Quickdraw"
          }
        ],
        "weapons": [
          {
            "id": "dual-revolvers",
            "type": "weapon",
            "name": "Dual Revolvers"
          }
        ],
        "organizations": [
          {
            "id": "black-dragon",
            "type": "organization",
            "name": "Black Dragon"
          }
        ],
        "image": {
          "assetId": "asset-erronblack-portrait",
          "assetURL": "/images/characters/erronblack.png",
          "assetType": "character_portrait",
          "entityId": "erronblack",
          "rightsStatus": "approved",
          "attribution": "Mortal Kombat \u00a9 Warner Bros. Games / NetherRealm Studios / Fandom Community",
          "alt": "Potret karakter resmi Erron Black"
        },
        "verificationStatus": "verified"
      },
      {
        "id": "erronblack-mk11-2019",
        "label": "Mortal Kombat 11",
        "gameId": "mk11-2019",
        "gameTitle": "Mortal Kombat 11",
        "timelineId": "reboot",
        "timelineName": "Reboot Timeline",
        "abilities": [
          {
            "id": "move-revolver-quickdraw",
            "type": "ability",
            "name": "Sand Slam & Quickdraw"
          }
        ],
        "weapons": [
          {
            "id": "dual-revolvers",
            "type": "weapon",
            "name": "Dual Revolvers"
          }
        ],
        "organizations": [
          {
            "id": "black-dragon",
            "type": "organization",
            "name": "Black Dragon"
          }
        ],
        "image": {
          "assetId": "asset-erronblack-portrait",
          "assetURL": "/images/characters/erronblack.png",
          "assetType": "character_portrait",
          "entityId": "erronblack",
          "rightsStatus": "approved",
          "attribution": "Mortal Kombat \u00a9 Warner Bros. Games / NetherRealm Studios / Fandom Community",
          "alt": "Potret karakter resmi Erron Black"
        },
        "verificationStatus": "verified"
      }
    ],
    "relationships": [],
    "relatedCharacters": [],
    "sources": [
      {
        "id": "fandom-erronblack",
        "title": "Mortal Kombat Wiki \u2014 Erron Black",
        "url": "https://mortalkombat.fandom.com/wiki/Erron_Black",
        "sourceType": "community-wiki",
        "verificationStatus": "verified"
      }
    ]
  },
  {
    "id": "jade",
    "name": "Jade",
    "aliases": [
      "Imperial Bodyguard of Kitana"
    ],
    "summary": "Stealth assassin and steadfast childhood friend of Kitana, renowned for her blazing staff combat and loyalty to Edenia.",
    "biography": "Stealth assassin and steadfast childhood friend of Kitana, renowned for her blazing staff combat and loyalty to Edenia.",
    "firstAppearance": {
      "id": "mk-1992",
      "type": "game",
      "name": "Mortal Kombat (1992)"
    },
    "species": {
      "id": "human",
      "type": "species",
      "name": "Edenian"
    },
    "realm": {
      "id": "edenia",
      "type": "location",
      "name": "Edenia"
    },
    "faction": "Neutral",
    "role": "Villain",
    "popular": false,
    "image": {
      "assetId": "asset-jade-portrait",
      "assetURL": "/images/characters/jade.png",
      "assetType": "character_portrait",
      "entityId": "jade",
      "rightsStatus": "approved",
      "attribution": "Mortal Kombat \u00a9 Warner Bros. Games / NetherRealm Studios / Fandom Community",
      "alt": "Potret karakter resmi Jade"
    },
    "versions": [
      {
        "id": "jade-umk3-1995",
        "label": "Ultimate Mortal Kombat 3",
        "gameId": "umk3-1995",
        "gameTitle": "Ultimate Mortal Kombat 3",
        "timelineId": "original",
        "timelineName": "Original Timeline",
        "abilities": [
          {
            "id": "move-blazing-nitro-kick",
            "type": "ability",
            "name": "Blazing Nitro Kick"
          },
          {
            "id": "move-tribomerang",
            "type": "ability",
            "name": "Tribomerang Throw"
          },
          {
            "id": "fatality-bow-before-me",
            "type": "ability",
            "name": "Fatality: Bow Before Me"
          }
        ],
        "weapons": [
          {
            "id": "bo-staff",
            "type": "weapon",
            "name": "Imperial Bo Staff"
          }
        ],
        "organizations": [],
        "image": {
          "assetId": "asset-jade-portrait",
          "assetURL": "/images/characters/jade.png",
          "assetType": "character_portrait",
          "entityId": "jade",
          "rightsStatus": "approved",
          "attribution": "Mortal Kombat \u00a9 Warner Bros. Games / NetherRealm Studios / Fandom Community",
          "alt": "Potret karakter resmi Jade"
        },
        "verificationStatus": "verified"
      },
      {
        "id": "jade-mk11-2019",
        "label": "Mortal Kombat 11",
        "gameId": "mk11-2019",
        "gameTitle": "Mortal Kombat 11",
        "timelineId": "reboot",
        "timelineName": "Reboot Timeline",
        "abilities": [
          {
            "id": "move-blazing-nitro-kick",
            "type": "ability",
            "name": "Blazing Nitro Kick"
          },
          {
            "id": "move-tribomerang",
            "type": "ability",
            "name": "Tribomerang Throw"
          }
        ],
        "weapons": [
          {
            "id": "bo-staff",
            "type": "weapon",
            "name": "Imperial Bo Staff"
          }
        ],
        "organizations": [],
        "image": {
          "assetId": "asset-jade-portrait",
          "assetURL": "/images/characters/jade.png",
          "assetType": "character_portrait",
          "entityId": "jade",
          "rightsStatus": "approved",
          "attribution": "Mortal Kombat \u00a9 Warner Bros. Games / NetherRealm Studios / Fandom Community",
          "alt": "Potret karakter resmi Jade"
        },
        "verificationStatus": "verified"
      }
    ],
    "relationships": [
      {
        "type": "alliedWith",
        "label": "Sekutu",
        "target": {
          "id": "kitana",
          "type": "character",
          "name": "Kitana"
        },
        "context": "All Timelines",
        "verificationStatus": "verified"
      }
    ],
    "relatedCharacters": [
      {
        "id": "kitana",
        "type": "character",
        "name": "Kitana"
      }
    ],
    "sources": [
      {
        "id": "fandom-jade",
        "title": "Mortal Kombat Wiki \u2014 Jade",
        "url": "https://mortalkombat.fandom.com/wiki/Jade",
        "sourceType": "community-wiki",
        "verificationStatus": "verified"
      }
    ]
  },
  {
    "id": "kabal",
    "name": "Kabal",
    "aliases": [
      "The Hooksword Speedster"
    ],
    "summary": "Former Black Dragon enforcer equipped with artificial respirators and superhuman running speed following severe burns from Shao Kahn's extermination squads.",
    "biography": "Former Black Dragon enforcer equipped with artificial respirators and superhuman running speed following severe burns from Shao Kahn's extermination squads.",
    "firstAppearance": {
      "id": "mk-1992",
      "type": "game",
      "name": "Mortal Kombat (1992)"
    },
    "species": {
      "id": "human",
      "type": "species",
      "name": "Human (Respirator)"
    },
    "realm": {
      "id": "earthrealm",
      "type": "location",
      "name": "Earthrealm"
    },
    "faction": "Black Dragon",
    "role": "Villain",
    "popular": false,
    "image": {
      "assetId": "asset-kabal-portrait",
      "assetURL": "/images/characters/kabal.png",
      "assetType": "character_portrait",
      "entityId": "kabal",
      "rightsStatus": "approved",
      "attribution": "Mortal Kombat \u00a9 Warner Bros. Games / NetherRealm Studios / Fandom Community",
      "alt": "Potret karakter resmi Kabal"
    },
    "versions": [
      {
        "id": "kabal-mk3-1995",
        "label": "Mortal Kombat 3",
        "gameId": "mk3-1995",
        "gameTitle": "Mortal Kombat 3",
        "timelineId": "original",
        "timelineName": "Original Timeline",
        "abilities": [
          {
            "id": "move-nomad-dash",
            "type": "ability",
            "name": "Nomad Dash"
          },
          {
            "id": "move-buzzsaw",
            "type": "ability",
            "name": "Buzzsaw Roll"
          },
          {
            "id": "fatality-road-rash",
            "type": "ability",
            "name": "Fatality: Road Rash"
          }
        ],
        "weapons": [
          {
            "id": "hookswords",
            "type": "weapon",
            "name": "Dual Hookswords"
          }
        ],
        "organizations": [
          {
            "id": "black-dragon",
            "type": "organization",
            "name": "Black Dragon"
          }
        ],
        "image": {
          "assetId": "asset-kabal-portrait",
          "assetURL": "/images/characters/kabal.png",
          "assetType": "character_portrait",
          "entityId": "kabal",
          "rightsStatus": "approved",
          "attribution": "Mortal Kombat \u00a9 Warner Bros. Games / NetherRealm Studios / Fandom Community",
          "alt": "Potret karakter resmi Kabal"
        },
        "verificationStatus": "verified"
      },
      {
        "id": "kabal-mk11-2019",
        "label": "Mortal Kombat 11",
        "gameId": "mk11-2019",
        "gameTitle": "Mortal Kombat 11",
        "timelineId": "reboot",
        "timelineName": "Reboot Timeline",
        "abilities": [
          {
            "id": "move-nomad-dash",
            "type": "ability",
            "name": "Nomad Dash"
          },
          {
            "id": "move-buzzsaw",
            "type": "ability",
            "name": "Buzzsaw Roll"
          }
        ],
        "weapons": [
          {
            "id": "hookswords",
            "type": "weapon",
            "name": "Dual Hookswords"
          }
        ],
        "organizations": [
          {
            "id": "black-dragon",
            "type": "organization",
            "name": "Black Dragon"
          }
        ],
        "image": {
          "assetId": "asset-kabal-portrait",
          "assetURL": "/images/characters/kabal.png",
          "assetType": "character_portrait",
          "entityId": "kabal",
          "rightsStatus": "approved",
          "attribution": "Mortal Kombat \u00a9 Warner Bros. Games / NetherRealm Studios / Fandom Community",
          "alt": "Potret karakter resmi Kabal"
        },
        "verificationStatus": "verified"
      }
    ],
    "relationships": [
      {
        "type": "alliedWith",
        "label": "Sekutu",
        "target": {
          "id": "stryker",
          "type": "character",
          "name": "Kurtis Stryker"
        },
        "context": "Reboot Timeline (MK9)",
        "verificationStatus": "verified"
      }
    ],
    "relatedCharacters": [
      {
        "id": "stryker",
        "type": "character",
        "name": "Kurtis Stryker"
      }
    ],
    "sources": [
      {
        "id": "fandom-kabal",
        "title": "Mortal Kombat Wiki \u2014 Kabal",
        "url": "https://mortalkombat.fandom.com/wiki/Kabal",
        "sourceType": "community-wiki",
        "verificationStatus": "verified"
      }
    ]
  },
  {
    "id": "stryker",
    "name": "Kurtis Stryker",
    "aliases": [
      "Riot Control Officer"
    ],
    "summary": "Earthrealm riot police leader thrust into the invasion of Earthrealm, defending humanity using batons, grenades, and standard issue firepower.",
    "biography": "Earthrealm riot police leader thrust into the invasion of Earthrealm, defending humanity using batons, grenades, and standard issue firepower.",
    "firstAppearance": {
      "id": "mk-1992",
      "type": "game",
      "name": "Mortal Kombat (1992)"
    },
    "species": {
      "id": "human",
      "type": "species",
      "name": "Human"
    },
    "realm": {
      "id": "earthrealm",
      "type": "location",
      "name": "Earthrealm"
    },
    "faction": "Special Forces",
    "role": "Villain",
    "popular": false,
    "image": {
      "assetId": "asset-stryker-portrait",
      "assetURL": "/images/characters/stryker.png",
      "assetType": "character_portrait",
      "entityId": "stryker",
      "rightsStatus": "approved",
      "attribution": "Mortal Kombat \u00a9 Warner Bros. Games / NetherRealm Studios / Fandom Community",
      "alt": "Potret karakter resmi Kurtis Stryker"
    },
    "versions": [
      {
        "id": "stryker-mk3-1995",
        "label": "Mortal Kombat 3",
        "gameId": "mk3-1995",
        "gameTitle": "Mortal Kombat 3",
        "timelineId": "original",
        "timelineName": "Original Timeline",
        "abilities": [
          {
            "id": "move-baton-trip",
            "type": "ability",
            "name": "Baton Sweep & Toss"
          },
          {
            "id": "move-grenade-toss",
            "type": "ability",
            "name": "High/Low Grenade Toss"
          },
          {
            "id": "fatality-time-served",
            "type": "ability",
            "name": "Fatality: Time Served"
          }
        ],
        "weapons": [
          {
            "id": "nightsticks",
            "type": "weapon",
            "name": "Police Nightsticks"
          }
        ],
        "organizations": [
          {
            "id": "special-forces",
            "type": "organization",
            "name": "Special Forces"
          }
        ],
        "image": {
          "assetId": "asset-stryker-portrait",
          "assetURL": "/images/characters/stryker.png",
          "assetType": "character_portrait",
          "entityId": "stryker",
          "rightsStatus": "approved",
          "attribution": "Mortal Kombat \u00a9 Warner Bros. Games / NetherRealm Studios / Fandom Community",
          "alt": "Potret karakter resmi Kurtis Stryker"
        },
        "verificationStatus": "verified"
      },
      {
        "id": "stryker-mk9-2011",
        "label": "Mortal Kombat (2011)",
        "gameId": "mk9-2011",
        "gameTitle": "Mortal Kombat (2011)",
        "timelineId": "reboot",
        "timelineName": "Reboot Timeline",
        "abilities": [
          {
            "id": "move-baton-trip",
            "type": "ability",
            "name": "Baton Sweep & Toss"
          },
          {
            "id": "move-grenade-toss",
            "type": "ability",
            "name": "High/Low Grenade Toss"
          }
        ],
        "weapons": [
          {
            "id": "nightsticks",
            "type": "weapon",
            "name": "Police Nightsticks"
          }
        ],
        "organizations": [
          {
            "id": "special-forces",
            "type": "organization",
            "name": "Special Forces"
          }
        ],
        "image": {
          "assetId": "asset-stryker-portrait",
          "assetURL": "/images/characters/stryker.png",
          "assetType": "character_portrait",
          "entityId": "stryker",
          "rightsStatus": "approved",
          "attribution": "Mortal Kombat \u00a9 Warner Bros. Games / NetherRealm Studios / Fandom Community",
          "alt": "Potret karakter resmi Kurtis Stryker"
        },
        "verificationStatus": "verified"
      }
    ],
    "relationships": [],
    "relatedCharacters": [],
    "sources": [
      {
        "id": "fandom-stryker",
        "title": "Mortal Kombat Wiki \u2014 Kurtis Stryker",
        "url": "https://mortalkombat.fandom.com/wiki/Kurtis_Stryker",
        "sourceType": "community-wiki",
        "verificationStatus": "verified"
      }
    ]
  },
  {
    "id": "sheeva",
    "name": "Sheeva",
    "aliases": [
      "Queen of the Shokan"
    ],
    "summary": "Noble Draco Shokan warrior appointed by Shao Kahn as personal bodyguard to Queen Sindel, later becoming Queen of the Shokan people.",
    "biography": "Noble Draco Shokan warrior appointed by Shao Kahn as personal bodyguard to Queen Sindel, later becoming Queen of the Shokan people.",
    "firstAppearance": {
      "id": "mk-1992",
      "type": "game",
      "name": "Mortal Kombat (1992)"
    },
    "species": {
      "id": "human",
      "type": "species",
      "name": "Shokan (Draco)"
    },
    "realm": {
      "id": "outworld",
      "type": "location",
      "name": "Outworld"
    },
    "faction": "Neutral",
    "role": "Villain",
    "popular": false,
    "image": {
      "assetId": "asset-sheeva-portrait",
      "assetURL": "/images/characters/sheeva.png",
      "assetType": "character_portrait",
      "entityId": "sheeva",
      "rightsStatus": "approved",
      "attribution": "Mortal Kombat \u00a9 Warner Bros. Games / NetherRealm Studios / Fandom Community",
      "alt": "Potret karakter resmi Sheeva"
    },
    "versions": [
      {
        "id": "sheeva-mk3-1995",
        "label": "Mortal Kombat 3",
        "gameId": "mk3-1995",
        "gameTitle": "Mortal Kombat 3",
        "timelineId": "original",
        "timelineName": "Original Timeline",
        "abilities": [
          {
            "id": "move-teleport-stomp",
            "type": "ability",
            "name": "Shokan Drop Stomp"
          },
          {
            "id": "move-untranslatable-rage",
            "type": "ability",
            "name": "Untranslatable Rage"
          },
          {
            "id": "fatality-spine-ripper",
            "type": "ability",
            "name": "Fatality: Lend a Hand"
          }
        ],
        "weapons": [
          {
            "id": "shokan-cleavers",
            "type": "weapon",
            "name": "Dual Shokan Cleavers"
          }
        ],
        "organizations": [],
        "image": {
          "assetId": "asset-sheeva-portrait",
          "assetURL": "/images/characters/sheeva.png",
          "assetType": "character_portrait",
          "entityId": "sheeva",
          "rightsStatus": "approved",
          "attribution": "Mortal Kombat \u00a9 Warner Bros. Games / NetherRealm Studios / Fandom Community",
          "alt": "Potret karakter resmi Sheeva"
        },
        "verificationStatus": "verified"
      },
      {
        "id": "sheeva-mk9-2011",
        "label": "Mortal Kombat (2011)",
        "gameId": "mk9-2011",
        "gameTitle": "Mortal Kombat (2011)",
        "timelineId": "reboot",
        "timelineName": "Reboot Timeline",
        "abilities": [
          {
            "id": "move-teleport-stomp",
            "type": "ability",
            "name": "Shokan Drop Stomp"
          }
        ],
        "weapons": [
          {
            "id": "shokan-cleavers",
            "type": "weapon",
            "name": "Dual Shokan Cleavers"
          }
        ],
        "organizations": [],
        "image": {
          "assetId": "asset-sheeva-portrait",
          "assetURL": "/images/characters/sheeva.png",
          "assetType": "character_portrait",
          "entityId": "sheeva",
          "rightsStatus": "approved",
          "attribution": "Mortal Kombat \u00a9 Warner Bros. Games / NetherRealm Studios / Fandom Community",
          "alt": "Potret karakter resmi Sheeva"
        },
        "verificationStatus": "verified"
      }
    ],
    "relationships": [
      {
        "type": "alliedWith",
        "label": "Sekutu",
        "target": {
          "id": "sindel",
          "type": "character",
          "name": "Sindel"
        },
        "context": "Classic & Reboot Timelines",
        "verificationStatus": "verified"
      }
    ],
    "relatedCharacters": [
      {
        "id": "sindel",
        "type": "character",
        "name": "Sindel"
      }
    ],
    "sources": [
      {
        "id": "fandom-sheeva",
        "title": "Mortal Kombat Wiki \u2014 Sheeva",
        "url": "https://mortalkombat.fandom.com/wiki/Sheeva",
        "sourceType": "community-wiki",
        "verificationStatus": "verified"
      }
    ]
  },
  {
    "id": "nightwolf",
    "name": "Nightwolf",
    "aliases": [
      "Matoka Shaman"
    ],
    "summary": "Matoka tribal shaman and historian chosen by the Great Spirit to defend Earthrealm using spirit weapons and sacred communion.",
    "biography": "Matoka tribal shaman and historian chosen by the Great Spirit to defend Earthrealm using spirit weapons and sacred communion.",
    "firstAppearance": {
      "id": "mk-1992",
      "type": "game",
      "name": "Mortal Kombat (1992)"
    },
    "species": {
      "id": "human",
      "type": "species",
      "name": "Human Shaman"
    },
    "realm": {
      "id": "earthrealm",
      "type": "location",
      "name": "Earthrealm"
    },
    "faction": "Neutral",
    "role": "Villain",
    "popular": false,
    "image": {
      "assetId": "asset-nightwolf-portrait",
      "assetURL": "/images/characters/nightwolf.png",
      "assetType": "character_portrait",
      "entityId": "nightwolf",
      "rightsStatus": "approved",
      "attribution": "Mortal Kombat \u00a9 Warner Bros. Games / NetherRealm Studios / Fandom Community",
      "alt": "Potret karakter resmi Nightwolf"
    },
    "versions": [
      {
        "id": "nightwolf-mk3-1995",
        "label": "Mortal Kombat 3",
        "gameId": "mk3-1995",
        "gameTitle": "Mortal Kombat 3",
        "timelineId": "original",
        "timelineName": "Original Timeline",
        "abilities": [
          {
            "id": "move-spirit-arrow",
            "type": "ability",
            "name": "Spirit Arrow"
          },
          {
            "id": "move-rhino-charge",
            "type": "ability",
            "name": "Rhino Charge"
          },
          {
            "id": "fatality-war-dance",
            "type": "ability",
            "name": "Fatality: Kompshina Calling"
          }
        ],
        "weapons": [
          {
            "id": "spirit-tomahawks",
            "type": "weapon",
            "name": "Ethereal Tomahawks"
          }
        ],
        "organizations": [],
        "image": {
          "assetId": "asset-nightwolf-portrait",
          "assetURL": "/images/characters/nightwolf.png",
          "assetType": "character_portrait",
          "entityId": "nightwolf",
          "rightsStatus": "approved",
          "attribution": "Mortal Kombat \u00a9 Warner Bros. Games / NetherRealm Studios / Fandom Community",
          "alt": "Potret karakter resmi Nightwolf"
        },
        "verificationStatus": "verified"
      },
      {
        "id": "nightwolf-mk9-2011",
        "label": "Mortal Kombat (2011)",
        "gameId": "mk9-2011",
        "gameTitle": "Mortal Kombat (2011)",
        "timelineId": "reboot",
        "timelineName": "Reboot Timeline",
        "abilities": [
          {
            "id": "move-spirit-arrow",
            "type": "ability",
            "name": "Spirit Arrow"
          },
          {
            "id": "move-rhino-charge",
            "type": "ability",
            "name": "Rhino Charge"
          }
        ],
        "weapons": [
          {
            "id": "spirit-tomahawks",
            "type": "weapon",
            "name": "Ethereal Tomahawks"
          }
        ],
        "organizations": [],
        "image": {
          "assetId": "asset-nightwolf-portrait",
          "assetURL": "/images/characters/nightwolf.png",
          "assetType": "character_portrait",
          "entityId": "nightwolf",
          "rightsStatus": "approved",
          "attribution": "Mortal Kombat \u00a9 Warner Bros. Games / NetherRealm Studios / Fandom Community",
          "alt": "Potret karakter resmi Nightwolf"
        },
        "verificationStatus": "verified"
      }
    ],
    "relationships": [
      {
        "type": "alliedWith",
        "label": "Sekutu",
        "target": {
          "id": "raiden",
          "type": "character",
          "name": "Raiden"
        },
        "context": "All Timelines",
        "verificationStatus": "verified"
      }
    ],
    "relatedCharacters": [
      {
        "id": "raiden",
        "type": "character",
        "name": "Raiden"
      }
    ],
    "sources": [
      {
        "id": "fandom-nightwolf",
        "title": "Mortal Kombat Wiki \u2014 Nightwolf",
        "url": "https://mortalkombat.fandom.com/wiki/Nightwolf",
        "sourceType": "community-wiki",
        "verificationStatus": "verified"
      }
    ]
  },
  {
    "id": "dvorah",
    "name": "D'Vorah",
    "aliases": [
      "The Kytinn Broodmother"
    ],
    "summary": "Ruthless sentient insectoid swarm entity seeking solely the survival and propagation of the Kytinn species above all empire allegiances.",
    "biography": "Ruthless sentient insectoid swarm entity seeking solely the survival and propagation of the Kytinn species above all empire allegiances.",
    "firstAppearance": {
      "id": "mk-1992",
      "type": "game",
      "name": "Mortal Kombat (1992)"
    },
    "species": {
      "id": "human",
      "type": "species",
      "name": "Kytinn"
    },
    "realm": {
      "id": "outworld",
      "type": "location",
      "name": "Outworld"
    },
    "faction": "Neutral",
    "role": "Villain",
    "popular": false,
    "image": {
      "assetId": "asset-dvorah-portrait",
      "assetURL": "/images/characters/dvorah.png",
      "assetType": "character_portrait",
      "entityId": "dvorah",
      "rightsStatus": "approved",
      "attribution": "Mortal Kombat \u00a9 Warner Bros. Games / NetherRealm Studios / Fandom Community",
      "alt": "Potret karakter resmi D'Vorah"
    },
    "versions": [
      {
        "id": "dvorah-mkx-2015",
        "label": "Mortal Kombat X",
        "gameId": "mkx-2015",
        "gameTitle": "Mortal Kombat X",
        "timelineId": "reboot",
        "timelineName": "Reboot Timeline",
        "abilities": [
          {
            "id": "move-ovipositor-rush",
            "type": "ability",
            "name": "Ovipositor Rush"
          },
          {
            "id": "move-bug-spray",
            "type": "ability",
            "name": "Spittle Spray"
          },
          {
            "id": "fatality-infestation",
            "type": "ability",
            "name": "Fatality: Bug Me"
          }
        ],
        "weapons": [
          {
            "id": "ovipositors",
            "type": "weapon",
            "name": "Kytinn Ovipositors"
          }
        ],
        "organizations": [],
        "image": {
          "assetId": "asset-dvorah-portrait",
          "assetURL": "/images/characters/dvorah.png",
          "assetType": "character_portrait",
          "entityId": "dvorah",
          "rightsStatus": "approved",
          "attribution": "Mortal Kombat \u00a9 Warner Bros. Games / NetherRealm Studios / Fandom Community",
          "alt": "Potret karakter resmi D'Vorah"
        },
        "verificationStatus": "verified"
      },
      {
        "id": "dvorah-mk11-2019",
        "label": "Mortal Kombat 11",
        "gameId": "mk11-2019",
        "gameTitle": "Mortal Kombat 11",
        "timelineId": "reboot",
        "timelineName": "Reboot Timeline",
        "abilities": [
          {
            "id": "move-ovipositor-rush",
            "type": "ability",
            "name": "Ovipositor Rush"
          },
          {
            "id": "move-bug-spray",
            "type": "ability",
            "name": "Spittle Spray"
          }
        ],
        "weapons": [
          {
            "id": "ovipositors",
            "type": "weapon",
            "name": "Kytinn Ovipositors"
          }
        ],
        "organizations": [],
        "image": {
          "assetId": "asset-dvorah-portrait",
          "assetURL": "/images/characters/dvorah.png",
          "assetType": "character_portrait",
          "entityId": "dvorah",
          "rightsStatus": "approved",
          "attribution": "Mortal Kombat \u00a9 Warner Bros. Games / NetherRealm Studios / Fandom Community",
          "alt": "Potret karakter resmi D'Vorah"
        },
        "verificationStatus": "verified"
      }
    ],
    "relationships": [
      {
        "type": "enemyOf",
        "label": "Musuh",
        "target": {
          "id": "mileena",
          "type": "character",
          "name": "Mileena"
        },
        "context": "Reboot Timeline (MKX)",
        "verificationStatus": "verified"
      },
      {
        "type": "enemyOf",
        "label": "Musuh",
        "target": {
          "id": "scorpion",
          "type": "character",
          "name": "Scorpion"
        },
        "context": "Reboot Timeline (MK11)",
        "verificationStatus": "verified"
      }
    ],
    "relatedCharacters": [
      {
        "id": "mileena",
        "type": "character",
        "name": "Mileena"
      },
      {
        "id": "scorpion",
        "type": "character",
        "name": "Scorpion"
      }
    ],
    "sources": [
      {
        "id": "fandom-dvorah",
        "title": "Mortal Kombat Wiki \u2014 D'Vorah",
        "url": "https://mortalkombat.fandom.com/wiki/D%27Vorah",
        "sourceType": "community-wiki",
        "verificationStatus": "verified"
      }
    ]
  },
  {
    "id": "jacqui",
    "name": "Jacqui Briggs",
    "aliases": [
      "Specialist Jacqueline Briggs"
    ],
    "summary": "Junior Olympic kickboxer and Special Forces operative fighting in high-tech combat gauntlets alongside her father Jax.",
    "biography": "Junior Olympic kickboxer and Special Forces operative fighting in high-tech combat gauntlets alongside her father Jax.",
    "firstAppearance": {
      "id": "mk-1992",
      "type": "game",
      "name": "Mortal Kombat (1992)"
    },
    "species": {
      "id": "human",
      "type": "species",
      "name": "Human"
    },
    "realm": {
      "id": "earthrealm",
      "type": "location",
      "name": "Earthrealm"
    },
    "faction": "Special Forces",
    "role": "Villain",
    "popular": false,
    "image": {
      "assetId": "asset-jacqui-portrait",
      "assetURL": "/images/characters/jacqui.png",
      "assetType": "character_portrait",
      "entityId": "jacqui",
      "rightsStatus": "approved",
      "attribution": "Mortal Kombat \u00a9 Warner Bros. Games / NetherRealm Studios / Fandom Community",
      "alt": "Potret karakter resmi Jacqui Briggs"
    },
    "versions": [
      {
        "id": "jacqui-mkx-2015",
        "label": "Mortal Kombat X",
        "gameId": "mkx-2015",
        "gameTitle": "Mortal Kombat X",
        "timelineId": "reboot",
        "timelineName": "Reboot Timeline",
        "abilities": [
          {
            "id": "move-bionic-dash",
            "type": "ability",
            "name": "Bionic Rocket Dash"
          },
          {
            "id": "move-shotgun-blast",
            "type": "ability",
            "name": "Gauntlet Shotgun Blast"
          },
          {
            "id": "fatality-spider-mines",
            "type": "ability",
            "name": "Fatality: Spider Mines"
          }
        ],
        "weapons": [],
        "organizations": [
          {
            "id": "special-forces",
            "type": "organization",
            "name": "Special Forces"
          }
        ],
        "image": {
          "assetId": "asset-jacqui-portrait",
          "assetURL": "/images/characters/jacqui.png",
          "assetType": "character_portrait",
          "entityId": "jacqui",
          "rightsStatus": "approved",
          "attribution": "Mortal Kombat \u00a9 Warner Bros. Games / NetherRealm Studios / Fandom Community",
          "alt": "Potret karakter resmi Jacqui Briggs"
        },
        "verificationStatus": "verified"
      },
      {
        "id": "jacqui-mk11-2019",
        "label": "Mortal Kombat 11",
        "gameId": "mk11-2019",
        "gameTitle": "Mortal Kombat 11",
        "timelineId": "reboot",
        "timelineName": "Reboot Timeline",
        "abilities": [
          {
            "id": "move-bionic-dash",
            "type": "ability",
            "name": "Bionic Rocket Dash"
          },
          {
            "id": "move-shotgun-blast",
            "type": "ability",
            "name": "Gauntlet Shotgun Blast"
          }
        ],
        "weapons": [],
        "organizations": [
          {
            "id": "special-forces",
            "type": "organization",
            "name": "Special Forces"
          }
        ],
        "image": {
          "assetId": "asset-jacqui-portrait",
          "assetURL": "/images/characters/jacqui.png",
          "assetType": "character_portrait",
          "entityId": "jacqui",
          "rightsStatus": "approved",
          "attribution": "Mortal Kombat \u00a9 Warner Bros. Games / NetherRealm Studios / Fandom Community",
          "alt": "Potret karakter resmi Jacqui Briggs"
        },
        "verificationStatus": "verified"
      }
    ],
    "relationships": [
      {
        "type": "alliedWith",
        "label": "Sekutu",
        "target": {
          "id": "cassiecage",
          "type": "character",
          "name": "Cassie Cage"
        },
        "context": "Reboot Timeline",
        "verificationStatus": "verified"
      }
    ],
    "relatedCharacters": [
      {
        "id": "cassiecage",
        "type": "character",
        "name": "Cassie Cage"
      }
    ],
    "sources": [
      {
        "id": "fandom-jacqui",
        "title": "Mortal Kombat Wiki \u2014 Jacqui Briggs",
        "url": "https://mortalkombat.fandom.com/wiki/Jacqui_Briggs",
        "sourceType": "community-wiki",
        "verificationStatus": "verified"
      }
    ]
  },
  {
    "id": "takeda",
    "name": "Takeda Takahashi",
    "aliases": [
      "Shirai Ryu Apprentice"
    ],
    "summary": "Son of Kenshi trained from boyhood by Grandmaster Hanzo Hasashi in Shirai Ryu martial arts and telepathic sensory control.",
    "biography": "Son of Kenshi trained from boyhood by Grandmaster Hanzo Hasashi in Shirai Ryu martial arts and telepathic sensory control.",
    "firstAppearance": {
      "id": "mk-1992",
      "type": "game",
      "name": "Mortal Kombat (1992)"
    },
    "species": {
      "id": "human",
      "type": "species",
      "name": "Human"
    },
    "realm": {
      "id": "earthrealm",
      "type": "location",
      "name": "Earthrealm"
    },
    "faction": "Shirai Ryu",
    "role": "Villain",
    "popular": false,
    "image": {
      "assetId": "asset-takeda-portrait",
      "assetURL": "/images/characters/takeda.png",
      "assetType": "character_portrait",
      "entityId": "takeda",
      "rightsStatus": "approved",
      "attribution": "Mortal Kombat \u00a9 Warner Bros. Games / NetherRealm Studios / Fandom Community",
      "alt": "Potret karakter resmi Takeda Takahashi"
    },
    "versions": [
      {
        "id": "takeda-mkx-2015",
        "label": "Mortal Kombat X",
        "gameId": "mkx-2015",
        "gameTitle": "Mortal Kombat X",
        "timelineId": "reboot",
        "timelineName": "Reboot Timeline",
        "abilities": [
          {
            "id": "move-whip-strike",
            "type": "ability",
            "name": "Shirai Ryu Whip Flurry"
          },
          {
            "id": "move-shirai-ryu-phase",
            "type": "ability",
            "name": "Shirai Ryu Phase Teleport"
          },
          {
            "id": "fatality-whip-it-good",
            "type": "ability",
            "name": "Fatality: Whip It Good"
          }
        ],
        "weapons": [
          {
            "id": "bladed-whips",
            "type": "weapon",
            "name": "Plasma Bladed Whips"
          }
        ],
        "organizations": [
          {
            "id": "shirai-ryu",
            "type": "organization",
            "name": "Shirai Ryu"
          }
        ],
        "image": {
          "assetId": "asset-takeda-portrait",
          "assetURL": "/images/characters/takeda.png",
          "assetType": "character_portrait",
          "entityId": "takeda",
          "rightsStatus": "approved",
          "attribution": "Mortal Kombat \u00a9 Warner Bros. Games / NetherRealm Studios / Fandom Community",
          "alt": "Potret karakter resmi Takeda Takahashi"
        },
        "verificationStatus": "verified"
      }
    ],
    "relationships": [
      {
        "type": "alliedWith",
        "label": "Sekutu",
        "target": {
          "id": "kenshi",
          "type": "character",
          "name": "Kenshi"
        },
        "context": "Reboot Timeline",
        "verificationStatus": "verified"
      }
    ],
    "relatedCharacters": [
      {
        "id": "kenshi",
        "type": "character",
        "name": "Kenshi"
      }
    ],
    "sources": [
      {
        "id": "fandom-takeda",
        "title": "Mortal Kombat Wiki \u2014 Takeda Takahashi",
        "url": "https://mortalkombat.fandom.com/wiki/Takeda_Takahashi",
        "sourceType": "community-wiki",
        "verificationStatus": "verified"
      }
    ]
  },
  {
    "id": "kungjin",
    "name": "Kung Jin",
    "aliases": [
      "Shaolin Archer"
    ],
    "summary": "Cousin of Kung Lao and reformed thief turned Shaolin archer recruited into Cassie Cage's Special Forces tactical unit.",
    "biography": "Cousin of Kung Lao and reformed thief turned Shaolin archer recruited into Cassie Cage's Special Forces tactical unit.",
    "firstAppearance": {
      "id": "mk-1992",
      "type": "game",
      "name": "Mortal Kombat (1992)"
    },
    "species": {
      "id": "human",
      "type": "species",
      "name": "Human"
    },
    "realm": {
      "id": "earthrealm",
      "type": "location",
      "name": "Earthrealm"
    },
    "faction": "Special Forces",
    "role": "Villain",
    "popular": false,
    "image": {
      "assetId": "asset-kungjin-portrait",
      "assetURL": "/images/characters/kungjin.png",
      "assetType": "character_portrait",
      "entityId": "kungjin",
      "rightsStatus": "approved",
      "attribution": "Mortal Kombat \u00a9 Warner Bros. Games / NetherRealm Studios / Fandom Community",
      "alt": "Potret karakter resmi Kung Jin"
    },
    "versions": [
      {
        "id": "kungjin-mkx-2015",
        "label": "Mortal Kombat X",
        "gameId": "mkx-2015",
        "gameTitle": "Mortal Kombat X",
        "timelineId": "reboot",
        "timelineName": "Reboot Timeline",
        "abilities": [
          {
            "id": "move-straight-shot",
            "type": "ability",
            "name": "Straight Arrow Shot"
          },
          {
            "id": "move-lunge-kick",
            "type": "ability",
            "name": "Bo Vault Kick"
          },
          {
            "id": "fatality-target-practice",
            "type": "ability",
            "name": "Fatality: Target Practice"
          }
        ],
        "weapons": [
          {
            "id": "combat-bow",
            "type": "weapon",
            "name": "Shaolin Combat Bow"
          }
        ],
        "organizations": [
          {
            "id": "special-forces",
            "type": "organization",
            "name": "Special Forces"
          }
        ],
        "image": {
          "assetId": "asset-kungjin-portrait",
          "assetURL": "/images/characters/kungjin.png",
          "assetType": "character_portrait",
          "entityId": "kungjin",
          "rightsStatus": "approved",
          "attribution": "Mortal Kombat \u00a9 Warner Bros. Games / NetherRealm Studios / Fandom Community",
          "alt": "Potret karakter resmi Kung Jin"
        },
        "verificationStatus": "verified"
      }
    ],
    "relationships": [
      {
        "type": "alliedWith",
        "label": "Sekutu",
        "target": {
          "id": "kung-lao",
          "type": "character",
          "name": "kung-lao"
        },
        "context": "Reboot Timeline",
        "verificationStatus": "verified"
      }
    ],
    "relatedCharacters": [
      {
        "id": "kung-lao",
        "type": "character",
        "name": "kung-lao"
      }
    ],
    "sources": [
      {
        "id": "fandom-kungjin",
        "title": "Mortal Kombat Wiki \u2014 Kung Jin",
        "url": "https://mortalkombat.fandom.com/wiki/Kung_Jin",
        "sourceType": "community-wiki",
        "verificationStatus": "verified"
      }
    ]
  },
  {
    "id": "cetrion",
    "name": "Cetrion",
    "aliases": [
      "Elder Goddess of Virtue and Life"
    ],
    "summary": "Daughter of Kronika and sister to Shinnok, manipulating earth, water, fire, and air while torn between familial duty and universal righteousness.",
    "biography": "Daughter of Kronika and sister to Shinnok, manipulating earth, water, fire, and air while torn between familial duty and universal righteousness.",
    "firstAppearance": {
      "id": "mk-1992",
      "type": "game",
      "name": "Mortal Kombat (1992)"
    },
    "species": {
      "id": "human",
      "type": "species",
      "name": "Elder Goddess"
    },
    "realm": {
      "id": "earthrealm",
      "type": "location",
      "name": "Earthrealm"
    },
    "faction": "Neutral",
    "role": "Villain",
    "popular": false,
    "image": {
      "assetId": "asset-cetrion-portrait",
      "assetURL": "/images/characters/cetrion.png",
      "assetType": "character_portrait",
      "entityId": "cetrion",
      "rightsStatus": "approved",
      "attribution": "Mortal Kombat \u00a9 Warner Bros. Games / NetherRealm Studios / Fandom Community",
      "alt": "Potret karakter resmi Cetrion"
    },
    "versions": [
      {
        "id": "cetrion-mk11-2019",
        "label": "Mortal Kombat 11",
        "gameId": "mk11-2019",
        "gameTitle": "Mortal Kombat 11",
        "timelineId": "reboot",
        "timelineName": "Reboot Timeline",
        "abilities": [
          {
            "id": "move-boulder-bash",
            "type": "ability",
            "name": "Boulder Bash"
          },
          {
            "id": "move-hells-wrath",
            "type": "ability",
            "name": "Hell's Wrath Tendril"
          },
          {
            "id": "fatality-good-and-evil",
            "type": "ability",
            "name": "Fatality: Good and Evil"
          }
        ],
        "weapons": [],
        "organizations": [],
        "image": {
          "assetId": "asset-cetrion-portrait",
          "assetURL": "/images/characters/cetrion.png",
          "assetType": "character_portrait",
          "entityId": "cetrion",
          "rightsStatus": "approved",
          "attribution": "Mortal Kombat \u00a9 Warner Bros. Games / NetherRealm Studios / Fandom Community",
          "alt": "Potret karakter resmi Cetrion"
        },
        "verificationStatus": "verified"
      }
    ],
    "relationships": [
      {
        "type": "alliedWith",
        "label": "Sekutu",
        "target": {
          "id": "kronika",
          "type": "character",
          "name": "Kronika"
        },
        "context": "Reboot Timeline (MK11)",
        "verificationStatus": "verified"
      }
    ],
    "relatedCharacters": [
      {
        "id": "kronika",
        "type": "character",
        "name": "Kronika"
      }
    ],
    "sources": [
      {
        "id": "fandom-cetrion",
        "title": "Mortal Kombat Wiki \u2014 Cetrion",
        "url": "https://mortalkombat.fandom.com/wiki/Cetrion",
        "sourceType": "community-wiki",
        "verificationStatus": "verified"
      }
    ]
  },
  {
    "id": "kollector",
    "name": "Kollector",
    "aliases": [
      "Tribute Collector of Outworld"
    ],
    "summary": "Six-armed Naknada extortionist who amassed wealth and stolen relics across the realms in unwavering service to Shao Kahn.",
    "biography": "Six-armed Naknada extortionist who amassed wealth and stolen relics across the realms in unwavering service to Shao Kahn.",
    "firstAppearance": {
      "id": "mk-1992",
      "type": "game",
      "name": "Mortal Kombat (1992)"
    },
    "species": {
      "id": "human",
      "type": "species",
      "name": "Naknada"
    },
    "realm": {
      "id": "outworld",
      "type": "location",
      "name": "Outworld"
    },
    "faction": "Neutral",
    "role": "Villain",
    "popular": false,
    "image": {
      "assetId": "asset-kollector-portrait",
      "assetURL": "/images/characters/kollector.png",
      "assetType": "character_portrait",
      "entityId": "kollector",
      "rightsStatus": "approved",
      "attribution": "Mortal Kombat \u00a9 Warner Bros. Games / NetherRealm Studios / Fandom Community",
      "alt": "Potret karakter resmi Kollector"
    },
    "versions": [
      {
        "id": "kollector-mk11-2019",
        "label": "Mortal Kombat 11",
        "gameId": "mk11-2019",
        "gameTitle": "Mortal Kombat 11",
        "timelineId": "reboot",
        "timelineName": "Reboot Timeline",
        "abilities": [
          {
            "id": "move-shotel-strike",
            "type": "ability",
            "name": "Demonic Shotel Flurry"
          },
          {
            "id": "move-demonic-mace",
            "type": "ability",
            "name": "Demonic Mace Toss"
          },
          {
            "id": "fatality-for-the-kollection",
            "type": "ability",
            "name": "Fatality: For the Kollection"
          }
        ],
        "weapons": [],
        "organizations": [],
        "image": {
          "assetId": "asset-kollector-portrait",
          "assetURL": "/images/characters/kollector.png",
          "assetType": "character_portrait",
          "entityId": "kollector",
          "rightsStatus": "approved",
          "attribution": "Mortal Kombat \u00a9 Warner Bros. Games / NetherRealm Studios / Fandom Community",
          "alt": "Potret karakter resmi Kollector"
        },
        "verificationStatus": "verified"
      }
    ],
    "relationships": [],
    "relatedCharacters": [],
    "sources": [
      {
        "id": "fandom-kollector",
        "title": "Mortal Kombat Wiki \u2014 Kollector",
        "url": "https://mortalkombat.fandom.com/wiki/Kollector",
        "sourceType": "community-wiki",
        "verificationStatus": "verified"
      }
    ]
  },
  {
    "id": "onaga",
    "name": "Onaga",
    "aliases": [
      "The Dragon King"
    ],
    "summary": "Ancient colossal Dragon King who ruled Outworld with an undefeatable army before being poisoned by Shao Kahn; returned by manipulating Shujinko.",
    "biography": "Ancient colossal Dragon King who ruled Outworld with an undefeatable army before being poisoned by Shao Kahn; returned by manipulating Shujinko.",
    "firstAppearance": {
      "id": "mk-1992",
      "type": "game",
      "name": "Mortal Kombat (1992)"
    },
    "species": {
      "id": "human",
      "type": "species",
      "name": "Dragon"
    },
    "realm": {
      "id": "outworld",
      "type": "location",
      "name": "Outworld"
    },
    "faction": "Neutral",
    "role": "Villain",
    "popular": false,
    "image": {
      "assetId": "asset-onaga-portrait",
      "assetURL": "/images/characters/onaga.png",
      "assetType": "character_portrait",
      "entityId": "onaga",
      "rightsStatus": "approved",
      "attribution": "Mortal Kombat \u00a9 Warner Bros. Games / NetherRealm Studios / Fandom Community",
      "alt": "Potret karakter resmi Onaga"
    },
    "versions": [
      {
        "id": "onaga-mk-deception-2004",
        "label": "Mortal Kombat: Deception",
        "gameId": "mk-deception-2004",
        "gameTitle": "Mortal Kombat: Deception",
        "timelineId": "original",
        "timelineName": "Original Timeline",
        "abilities": [
          {
            "id": "move-dragon-breath",
            "type": "ability",
            "name": "Dragon King Fire Breath"
          },
          {
            "id": "move-dragon-slam",
            "type": "ability",
            "name": "Titanic Dragon Slam"
          }
        ],
        "weapons": [],
        "organizations": [],
        "image": {
          "assetId": "asset-onaga-portrait",
          "assetURL": "/images/characters/onaga.png",
          "assetType": "character_portrait",
          "entityId": "onaga",
          "rightsStatus": "approved",
          "attribution": "Mortal Kombat \u00a9 Warner Bros. Games / NetherRealm Studios / Fandom Community",
          "alt": "Potret karakter resmi Onaga"
        },
        "verificationStatus": "verified"
      },
      {
        "id": "onaga-mk-armageddon-2006",
        "label": "Mortal Kombat: Armageddon",
        "gameId": "mk-armageddon-2006",
        "gameTitle": "Mortal Kombat: Armageddon",
        "timelineId": "original",
        "timelineName": "Original Timeline",
        "abilities": [
          {
            "id": "move-dragon-breath",
            "type": "ability",
            "name": "Dragon King Fire Breath"
          }
        ],
        "weapons": [],
        "organizations": [],
        "image": {
          "assetId": "asset-onaga-portrait",
          "assetURL": "/images/characters/onaga.png",
          "assetType": "character_portrait",
          "entityId": "onaga",
          "rightsStatus": "approved",
          "attribution": "Mortal Kombat \u00a9 Warner Bros. Games / NetherRealm Studios / Fandom Community",
          "alt": "Potret karakter resmi Onaga"
        },
        "verificationStatus": "verified"
      }
    ],
    "relationships": [
      {
        "type": "enemyOf",
        "label": "Musuh",
        "target": {
          "id": "shao-kahn",
          "type": "character",
          "name": "shao-kahn"
        },
        "context": "Original Timeline",
        "verificationStatus": "verified"
      }
    ],
    "relatedCharacters": [
      {
        "id": "shao-kahn",
        "type": "character",
        "name": "shao-kahn"
      }
    ],
    "sources": [
      {
        "id": "fandom-onaga",
        "title": "Mortal Kombat Wiki \u2014 Onaga",
        "url": "https://mortalkombat.fandom.com/wiki/Onaga",
        "sourceType": "community-wiki",
        "verificationStatus": "verified"
      }
    ]
  },
  {
    "id": "shujinko",
    "name": "Shujinko",
    "aliases": [
      "Champion of the Kamidogu"
    ],
    "summary": "Earthrealm warrior who spent decades questing to gather the Kamidogu for the entity Damashi, only to realize he had been manipulated into resurrecting Onaga.",
    "biography": "Earthrealm warrior who spent decades questing to gather the Kamidogu for the entity Damashi, only to realize he had been manipulated into resurrecting Onaga.",
    "firstAppearance": {
      "id": "mk-1992",
      "type": "game",
      "name": "Mortal Kombat (1992)"
    },
    "species": {
      "id": "human",
      "type": "species",
      "name": "Human"
    },
    "realm": {
      "id": "earthrealm",
      "type": "location",
      "name": "Earthrealm"
    },
    "faction": "White Lotus Society",
    "role": "Villain",
    "popular": false,
    "image": {
      "assetId": "asset-shujinko-portrait",
      "assetURL": "/images/characters/shujinko.png",
      "assetType": "character_portrait",
      "entityId": "shujinko",
      "rightsStatus": "approved",
      "attribution": "Mortal Kombat \u00a9 Warner Bros. Games / NetherRealm Studios / Fandom Community",
      "alt": "Potret karakter resmi Shujinko"
    },
    "versions": [
      {
        "id": "shujinko-mk-deception-2004",
        "label": "Mortal Kombat: Deception",
        "gameId": "mk-deception-2004",
        "gameTitle": "Mortal Kombat: Deception",
        "timelineId": "original",
        "timelineName": "Original Timeline",
        "abilities": [
          {
            "id": "move-mimic-mastery",
            "type": "ability",
            "name": "Ape Mimicry"
          },
          {
            "id": "fatality-face-crusher",
            "type": "ability",
            "name": "Fatality: Five Point Strike"
          }
        ],
        "weapons": [],
        "organizations": [
          {
            "id": "white-lotus",
            "type": "organization",
            "name": "White Lotus Society"
          }
        ],
        "image": {
          "assetId": "asset-shujinko-portrait",
          "assetURL": "/images/characters/shujinko.png",
          "assetType": "character_portrait",
          "entityId": "shujinko",
          "rightsStatus": "approved",
          "attribution": "Mortal Kombat \u00a9 Warner Bros. Games / NetherRealm Studios / Fandom Community",
          "alt": "Potret karakter resmi Shujinko"
        },
        "verificationStatus": "verified"
      },
      {
        "id": "shujinko-mk-armageddon-2006",
        "label": "Mortal Kombat: Armageddon",
        "gameId": "mk-armageddon-2006",
        "gameTitle": "Mortal Kombat: Armageddon",
        "timelineId": "original",
        "timelineName": "Original Timeline",
        "abilities": [
          {
            "id": "move-mimic-mastery",
            "type": "ability",
            "name": "Ape Mimicry"
          }
        ],
        "weapons": [],
        "organizations": [
          {
            "id": "white-lotus",
            "type": "organization",
            "name": "White Lotus Society"
          }
        ],
        "image": {
          "assetId": "asset-shujinko-portrait",
          "assetURL": "/images/characters/shujinko.png",
          "assetType": "character_portrait",
          "entityId": "shujinko",
          "rightsStatus": "approved",
          "attribution": "Mortal Kombat \u00a9 Warner Bros. Games / NetherRealm Studios / Fandom Community",
          "alt": "Potret karakter resmi Shujinko"
        },
        "verificationStatus": "verified"
      }
    ],
    "relationships": [
      {
        "type": "enemyOf",
        "label": "Musuh",
        "target": {
          "id": "onaga",
          "type": "character",
          "name": "Onaga"
        },
        "context": "Original Timeline (MK Deception)",
        "verificationStatus": "verified"
      }
    ],
    "relatedCharacters": [
      {
        "id": "onaga",
        "type": "character",
        "name": "Onaga"
      }
    ],
    "sources": [
      {
        "id": "fandom-shujinko",
        "title": "Mortal Kombat Wiki \u2014 Shujinko",
        "url": "https://mortalkombat.fandom.com/wiki/Shujinko",
        "sourceType": "community-wiki",
        "verificationStatus": "verified"
      }
    ]
  },
  {
    "id": "reiko",
    "name": "Reiko",
    "aliases": [
      "General of the Outworld Army"
    ],
    "summary": "Savage Outworld war general who served in Shinnok's forces and Shao Kahn's legions, obsessed with unyielding imperial dominance.",
    "biography": "Savage Outworld war general who served in Shinnok's forces and Shao Kahn's legions, obsessed with unyielding imperial dominance.",
    "firstAppearance": {
      "id": "mk-1992",
      "type": "game",
      "name": "Mortal Kombat (1992)"
    },
    "species": {
      "id": "human",
      "type": "species",
      "name": "Outworlder"
    },
    "realm": {
      "id": "outworld",
      "type": "location",
      "name": "Outworld"
    },
    "faction": "Neutral",
    "role": "Villain",
    "popular": false,
    "image": {
      "assetId": "asset-reiko-portrait",
      "assetURL": "/images/characters/reiko.png",
      "assetType": "character_portrait",
      "entityId": "reiko",
      "rightsStatus": "approved",
      "attribution": "Mortal Kombat \u00a9 Warner Bros. Games / NetherRealm Studios / Fandom Community",
      "alt": "Potret karakter resmi Reiko"
    },
    "versions": [
      {
        "id": "reiko-mk4-1997",
        "label": "Mortal Kombat 4",
        "gameId": "mk4-1997",
        "gameTitle": "Mortal Kombat 4",
        "timelineId": "original",
        "timelineName": "Original Timeline",
        "abilities": [
          {
            "id": "move-charging-spear",
            "type": "ability",
            "name": "Charging Spartan Spear"
          }
        ],
        "weapons": [
          {
            "id": "spiked-club",
            "type": "weapon",
            "name": "Spiked War Mace"
          }
        ],
        "organizations": [],
        "image": {
          "assetId": "asset-reiko-portrait",
          "assetURL": "/images/characters/reiko.png",
          "assetType": "character_portrait",
          "entityId": "reiko",
          "rightsStatus": "approved",
          "attribution": "Mortal Kombat \u00a9 Warner Bros. Games / NetherRealm Studios / Fandom Community",
          "alt": "Potret karakter resmi Reiko"
        },
        "verificationStatus": "verified"
      },
      {
        "id": "reiko-mk-gold-1999",
        "label": "Mortal Kombat Gold",
        "gameId": "mk-gold-1999",
        "gameTitle": "Mortal Kombat Gold",
        "timelineId": "original",
        "timelineName": "Original Timeline",
        "abilities": [
          {
            "id": "move-charging-spear",
            "type": "ability",
            "name": "Charging Spartan Spear"
          }
        ],
        "weapons": [
          {
            "id": "spiked-club",
            "type": "weapon",
            "name": "Spiked War Mace"
          }
        ],
        "organizations": [],
        "image": {
          "assetId": "asset-reiko-portrait",
          "assetURL": "/images/characters/reiko.png",
          "assetType": "character_portrait",
          "entityId": "reiko",
          "rightsStatus": "approved",
          "attribution": "Mortal Kombat \u00a9 Warner Bros. Games / NetherRealm Studios / Fandom Community",
          "alt": "Potret karakter resmi Reiko"
        },
        "verificationStatus": "verified"
      },
      {
        "id": "reiko-mk1-2023",
        "label": "Mortal Kombat 1 (2023)",
        "gameId": "mk1-2023",
        "gameTitle": "Mortal Kombat 1 (2023)",
        "timelineId": "new-era",
        "timelineName": "New Era",
        "abilities": [
          {
            "id": "move-charging-spear",
            "type": "ability",
            "name": "Charging Spartan Spear"
          }
        ],
        "weapons": [
          {
            "id": "spiked-club",
            "type": "weapon",
            "name": "Spiked War Mace"
          }
        ],
        "organizations": [],
        "image": {
          "assetId": "asset-reiko-portrait",
          "assetURL": "/images/characters/reiko.png",
          "assetType": "character_portrait",
          "entityId": "reiko",
          "rightsStatus": "approved",
          "attribution": "Mortal Kombat \u00a9 Warner Bros. Games / NetherRealm Studios / Fandom Community",
          "alt": "Potret karakter resmi Reiko"
        },
        "verificationStatus": "verified"
      }
    ],
    "relationships": [],
    "relatedCharacters": [],
    "sources": [
      {
        "id": "fandom-reiko",
        "title": "Mortal Kombat Wiki \u2014 Reiko",
        "url": "https://mortalkombat.fandom.com/wiki/Reiko",
        "sourceType": "community-wiki",
        "verificationStatus": "verified"
      }
    ]
  },
  {
    "id": "nitara",
    "name": "Nitara",
    "aliases": [
      "Vampress of Vaeternus"
    ],
    "summary": "Vampire warrior who sought to separate her home realm of Vaeternus from Outworld by destroying the binding dimensional orb.",
    "biography": "Vampire warrior who sought to separate her home realm of Vaeternus from Outworld by destroying the binding dimensional orb.",
    "firstAppearance": {
      "id": "mk-1992",
      "type": "game",
      "name": "Mortal Kombat (1992)"
    },
    "species": {
      "id": "human",
      "type": "species",
      "name": "Vampire"
    },
    "realm": {
      "id": "vaeternus",
      "type": "location",
      "name": "Vaeternus"
    },
    "faction": "Neutral",
    "role": "Villain",
    "popular": false,
    "image": {
      "assetId": "asset-nitara-portrait",
      "assetURL": "/images/characters/nitara.png",
      "assetType": "character_portrait",
      "entityId": "nitara",
      "rightsStatus": "approved",
      "attribution": "Mortal Kombat \u00a9 Warner Bros. Games / NetherRealm Studios / Fandom Community",
      "alt": "Potret karakter resmi Nitara"
    },
    "versions": [
      {
        "id": "nitara-mk-deadly-alliance-2002",
        "label": "Mortal Kombat: Deadly Alliance",
        "gameId": "mk-deadly-alliance-2002",
        "gameTitle": "Mortal Kombat: Deadly Alliance",
        "timelineId": "original",
        "timelineName": "Original Timeline",
        "abilities": [
          {
            "id": "move-blood-spit",
            "type": "ability",
            "name": "Hemomantic Blood Spit"
          },
          {
            "id": "fatality-vaeternus-drain",
            "type": "ability",
            "name": "Fatality: Blood Feast"
          }
        ],
        "weapons": [],
        "organizations": [],
        "image": {
          "assetId": "asset-nitara-portrait",
          "assetURL": "/images/characters/nitara.png",
          "assetType": "character_portrait",
          "entityId": "nitara",
          "rightsStatus": "approved",
          "attribution": "Mortal Kombat \u00a9 Warner Bros. Games / NetherRealm Studios / Fandom Community",
          "alt": "Potret karakter resmi Nitara"
        },
        "verificationStatus": "verified"
      },
      {
        "id": "nitara-mk1-2023",
        "label": "Mortal Kombat 1 (2023)",
        "gameId": "mk1-2023",
        "gameTitle": "Mortal Kombat 1 (2023)",
        "timelineId": "new-era",
        "timelineName": "New Era",
        "abilities": [
          {
            "id": "move-blood-spit",
            "type": "ability",
            "name": "Hemomantic Blood Spit"
          }
        ],
        "weapons": [],
        "organizations": [],
        "image": {
          "assetId": "asset-nitara-portrait",
          "assetURL": "/images/characters/nitara.png",
          "assetType": "character_portrait",
          "entityId": "nitara",
          "rightsStatus": "approved",
          "attribution": "Mortal Kombat \u00a9 Warner Bros. Games / NetherRealm Studios / Fandom Community",
          "alt": "Potret karakter resmi Nitara"
        },
        "verificationStatus": "verified"
      }
    ],
    "relationships": [],
    "relatedCharacters": [],
    "sources": [
      {
        "id": "fandom-nitara",
        "title": "Mortal Kombat Wiki \u2014 Nitara",
        "url": "https://mortalkombat.fandom.com/wiki/Nitara",
        "sourceType": "community-wiki",
        "verificationStatus": "verified"
      }
    ]
  },
  {
    "id": "sareena",
    "name": "Sareena",
    "aliases": [
      "Assassin of the Shadow Priests"
    ],
    "summary": "Netherrealm demon assassin serving Quan Chi who rebelled after meeting Bi-Han, seeking to escape the Netherrealm and preserve her humanity.",
    "biography": "Netherrealm demon assassin serving Quan Chi who rebelled after meeting Bi-Han, seeking to escape the Netherrealm and preserve her humanity.",
    "firstAppearance": {
      "id": "mk-1992",
      "type": "game",
      "name": "Mortal Kombat (1992)"
    },
    "species": {
      "id": "human",
      "type": "species",
      "name": "Demon"
    },
    "realm": {
      "id": "netherrealm",
      "type": "location",
      "name": "Netherrealm"
    },
    "faction": "Brotherhood of Shadow",
    "role": "Villain",
    "popular": false,
    "image": {
      "assetId": "asset-sareena-portrait",
      "assetURL": "/images/characters/sareena.png",
      "assetType": "character_portrait",
      "entityId": "sareena",
      "rightsStatus": "approved",
      "attribution": "Mortal Kombat \u00a9 Warner Bros. Games / NetherRealm Studios / Fandom Community",
      "alt": "Potret karakter resmi Sareena"
    },
    "versions": [
      {
        "id": "sareena-mk-mythologies-1997",
        "label": "Mortal Kombat Mythologies: Sub-Zero",
        "gameId": "mk-mythologies-1997",
        "gameTitle": "Mortal Kombat Mythologies: Sub-Zero",
        "timelineId": "original",
        "timelineName": "Original Timeline",
        "abilities": [
          {
            "id": "move-skull-daggers",
            "type": "ability",
            "name": "Demon Skull Dagger"
          }
        ],
        "weapons": [],
        "organizations": [
          {
            "id": "brotherhood-of-shadow",
            "type": "organization",
            "name": "Brotherhood of Shadow"
          }
        ],
        "image": {
          "assetId": "asset-sareena-portrait",
          "assetURL": "/images/characters/sareena.png",
          "assetType": "character_portrait",
          "entityId": "sareena",
          "rightsStatus": "approved",
          "attribution": "Mortal Kombat \u00a9 Warner Bros. Games / NetherRealm Studios / Fandom Community",
          "alt": "Potret karakter resmi Sareena"
        },
        "verificationStatus": "verified"
      },
      {
        "id": "sareena-mk-tournament-edition-2003",
        "label": "Mortal Kombat: Tournament Edition",
        "gameId": "mk-tournament-edition-2003",
        "gameTitle": "Mortal Kombat: Tournament Edition",
        "timelineId": "original",
        "timelineName": "Original Timeline",
        "abilities": [
          {
            "id": "move-skull-daggers",
            "type": "ability",
            "name": "Demon Skull Dagger"
          }
        ],
        "weapons": [],
        "organizations": [
          {
            "id": "lin-kuei",
            "type": "organization",
            "name": "Lin Kuei"
          }
        ],
        "image": {
          "assetId": "asset-sareena-portrait",
          "assetURL": "/images/characters/sareena.png",
          "assetType": "character_portrait",
          "entityId": "sareena",
          "rightsStatus": "approved",
          "attribution": "Mortal Kombat \u00a9 Warner Bros. Games / NetherRealm Studios / Fandom Community",
          "alt": "Potret karakter resmi Sareena"
        },
        "verificationStatus": "verified"
      }
    ],
    "relationships": [
      {
        "type": "alliedWith",
        "label": "Sekutu",
        "target": {
          "id": "sub-zero",
          "type": "character",
          "name": "sub-zero"
        },
        "context": "Original Timeline",
        "verificationStatus": "verified"
      }
    ],
    "relatedCharacters": [
      {
        "id": "sub-zero",
        "type": "character",
        "name": "sub-zero"
      }
    ],
    "sources": [
      {
        "id": "fandom-sareena",
        "title": "Mortal Kombat Wiki \u2014 Sareena",
        "url": "https://mortalkombat.fandom.com/wiki/Sareena",
        "sourceType": "community-wiki",
        "verificationStatus": "verified"
      }
    ]
  },
  {
    "id": "ashrah",
    "name": "Ashrah",
    "aliases": [
      "The Purified Demon"
    ],
    "summary": "Netherrealm demon who found the holy Kriss sword 'Datusha', purifying her demonic soul with every evil demon she slays.",
    "biography": "Netherrealm demon who found the holy Kriss sword 'Datusha', purifying her demonic soul with every evil demon she slays.",
    "firstAppearance": {
      "id": "mk-1992",
      "type": "game",
      "name": "Mortal Kombat (1992)"
    },
    "species": {
      "id": "human",
      "type": "species",
      "name": "Demon (Purified)"
    },
    "realm": {
      "id": "netherrealm",
      "type": "location",
      "name": "Netherrealm"
    },
    "faction": "Neutral",
    "role": "Villain",
    "popular": false,
    "image": {
      "assetId": "asset-ashrah-portrait",
      "assetURL": "/images/characters/ashrah.png",
      "assetType": "character_portrait",
      "entityId": "ashrah",
      "rightsStatus": "approved",
      "attribution": "Mortal Kombat \u00a9 Warner Bros. Games / NetherRealm Studios / Fandom Community",
      "alt": "Potret karakter resmi Ashrah"
    },
    "versions": [
      {
        "id": "ashrah-mk-deception-2004",
        "label": "Mortal Kombat: Deception",
        "gameId": "mk-deception-2004",
        "gameTitle": "Mortal Kombat: Deception",
        "timelineId": "original",
        "timelineName": "Original Timeline",
        "abilities": [
          {
            "id": "move-heavenly-light",
            "type": "ability",
            "name": "Heavenly Cleansing Light"
          },
          {
            "id": "fatality-divine-purification",
            "type": "ability",
            "name": "Fatality: Heavenly Cleansing"
          }
        ],
        "weapons": [
          {
            "id": "kriss-dagger",
            "type": "weapon",
            "name": "Kriss Purification Dagger"
          }
        ],
        "organizations": [],
        "image": {
          "assetId": "asset-ashrah-portrait",
          "assetURL": "/images/characters/ashrah.png",
          "assetType": "character_portrait",
          "entityId": "ashrah",
          "rightsStatus": "approved",
          "attribution": "Mortal Kombat \u00a9 Warner Bros. Games / NetherRealm Studios / Fandom Community",
          "alt": "Potret karakter resmi Ashrah"
        },
        "verificationStatus": "verified"
      },
      {
        "id": "ashrah-mk1-2023",
        "label": "Mortal Kombat 1 (2023)",
        "gameId": "mk1-2023",
        "gameTitle": "Mortal Kombat 1 (2023)",
        "timelineId": "new-era",
        "timelineName": "New Era",
        "abilities": [
          {
            "id": "move-heavenly-light",
            "type": "ability",
            "name": "Heavenly Cleansing Light"
          }
        ],
        "weapons": [
          {
            "id": "kriss-dagger",
            "type": "weapon",
            "name": "Kriss Purification Dagger"
          }
        ],
        "organizations": [],
        "image": {
          "assetId": "asset-ashrah-portrait",
          "assetURL": "/images/characters/ashrah.png",
          "assetType": "character_portrait",
          "entityId": "ashrah",
          "rightsStatus": "approved",
          "attribution": "Mortal Kombat \u00a9 Warner Bros. Games / NetherRealm Studios / Fandom Community",
          "alt": "Potret karakter resmi Ashrah"
        },
        "verificationStatus": "verified"
      }
    ],
    "relationships": [
      {
        "type": "enemyOf",
        "label": "Musuh",
        "target": {
          "id": "quanchi",
          "type": "character",
          "name": "Quan Chi"
        },
        "context": "Original & New Era Timelines",
        "verificationStatus": "verified"
      }
    ],
    "relatedCharacters": [
      {
        "id": "quanchi",
        "type": "character",
        "name": "Quan Chi"
      }
    ],
    "sources": [
      {
        "id": "fandom-ashrah",
        "title": "Mortal Kombat Wiki \u2014 Ashrah",
        "url": "https://mortalkombat.fandom.com/wiki/Ashrah",
        "sourceType": "community-wiki",
        "verificationStatus": "verified"
      }
    ]
  },
  {
    "id": "hotaru",
    "name": "Hotaru",
    "aliases": [
      "Commander of the Seidan Guard"
    ],
    "summary": "Inflexible military commander from Orderrealm who enforces law and order with zero tolerance for chaos, even allying with Onaga to suppress rebellion.",
    "biography": "Inflexible military commander from Orderrealm who enforces law and order with zero tolerance for chaos, even allying with Onaga to suppress rebellion.",
    "firstAppearance": {
      "id": "mk-1992",
      "type": "game",
      "name": "Mortal Kombat (1992)"
    },
    "species": {
      "id": "human",
      "type": "species",
      "name": "Seidan"
    },
    "realm": {
      "id": "orderrealm",
      "type": "location",
      "name": "Orderrealm (Seido)"
    },
    "faction": "Seidan Guard",
    "role": "Villain",
    "popular": false,
    "image": {
      "assetId": "asset-hotaru-portrait",
      "assetURL": "/images/characters/hotaru.png",
      "assetType": "character_portrait",
      "entityId": "hotaru",
      "rightsStatus": "approved",
      "attribution": "Mortal Kombat \u00a9 Warner Bros. Games / NetherRealm Studios / Fandom Community",
      "alt": "Potret karakter resmi Hotaru"
    },
    "versions": [
      {
        "id": "hotaru-mk-deception-2004",
        "label": "Mortal Kombat: Deception",
        "gameId": "mk-deception-2004",
        "gameTitle": "Mortal Kombat: Deception",
        "timelineId": "original",
        "timelineName": "Original Timeline",
        "abilities": [
          {
            "id": "move-lava-burst",
            "type": "ability",
            "name": "Order Lava Eruption"
          }
        ],
        "weapons": [],
        "organizations": [
          {
            "id": "seidan-guard",
            "type": "organization",
            "name": "Seidan Guard"
          }
        ],
        "image": {
          "assetId": "asset-hotaru-portrait",
          "assetURL": "/images/characters/hotaru.png",
          "assetType": "character_portrait",
          "entityId": "hotaru",
          "rightsStatus": "approved",
          "attribution": "Mortal Kombat \u00a9 Warner Bros. Games / NetherRealm Studios / Fandom Community",
          "alt": "Potret karakter resmi Hotaru"
        },
        "verificationStatus": "verified"
      },
      {
        "id": "hotaru-mk-armageddon-2006",
        "label": "Mortal Kombat: Armageddon",
        "gameId": "mk-armageddon-2006",
        "gameTitle": "Mortal Kombat: Armageddon",
        "timelineId": "original",
        "timelineName": "Original Timeline",
        "abilities": [
          {
            "id": "move-lava-burst",
            "type": "ability",
            "name": "Order Lava Eruption"
          }
        ],
        "weapons": [],
        "organizations": [
          {
            "id": "seidan-guard",
            "type": "organization",
            "name": "Seidan Guard"
          }
        ],
        "image": {
          "assetId": "asset-hotaru-portrait",
          "assetURL": "/images/characters/hotaru.png",
          "assetType": "character_portrait",
          "entityId": "hotaru",
          "rightsStatus": "approved",
          "attribution": "Mortal Kombat \u00a9 Warner Bros. Games / NetherRealm Studios / Fandom Community",
          "alt": "Potret karakter resmi Hotaru"
        },
        "verificationStatus": "verified"
      }
    ],
    "relationships": [
      {
        "type": "enemyOf",
        "label": "Musuh",
        "target": {
          "id": "havik",
          "type": "character",
          "name": "Havik"
        },
        "context": "Original Timeline (MK Deception)",
        "verificationStatus": "verified"
      }
    ],
    "relatedCharacters": [
      {
        "id": "havik",
        "type": "character",
        "name": "Havik"
      }
    ],
    "sources": [
      {
        "id": "fandom-hotaru",
        "title": "Mortal Kombat Wiki \u2014 Hotaru",
        "url": "https://mortalkombat.fandom.com/wiki/Hotaru",
        "sourceType": "community-wiki",
        "verificationStatus": "verified"
      }
    ]
  },
  {
    "id": "mavado",
    "name": "Mavado",
    "aliases": [
      "Leader of the Red Dragon"
    ],
    "summary": "Disciplined operative who uses grappling hook bungee cables in battle, dedicated to the total eradication of Kano's Black Dragon.",
    "biography": "Disciplined operative who uses grappling hook bungee cables in battle, dedicated to the total eradication of Kano's Black Dragon.",
    "firstAppearance": {
      "id": "mk-1992",
      "type": "game",
      "name": "Mortal Kombat (1992)"
    },
    "species": {
      "id": "human",
      "type": "species",
      "name": "Human"
    },
    "realm": {
      "id": "earthrealm",
      "type": "location",
      "name": "Earthrealm"
    },
    "faction": "Red Dragon",
    "role": "Villain",
    "popular": false,
    "image": {
      "assetId": "asset-mavado-portrait",
      "assetURL": "/images/characters/mavado.png",
      "assetType": "character_portrait",
      "entityId": "mavado",
      "rightsStatus": "approved",
      "attribution": "Mortal Kombat \u00a9 Warner Bros. Games / NetherRealm Studios / Fandom Community",
      "alt": "Potret karakter resmi Mavado"
    },
    "versions": [
      {
        "id": "mavado-mk-deadly-alliance-2002",
        "label": "Mortal Kombat: Deadly Alliance",
        "gameId": "mk-deadly-alliance-2002",
        "gameTitle": "Mortal Kombat: Deadly Alliance",
        "timelineId": "original",
        "timelineName": "Original Timeline",
        "abilities": [
          {
            "id": "move-grapple-hook-kick",
            "type": "ability",
            "name": "Elastic Grapple Kick"
          }
        ],
        "weapons": [
          {
            "id": "hookswords",
            "type": "weapon",
            "name": "Dual Hookswords"
          }
        ],
        "organizations": [
          {
            "id": "red-dragon",
            "type": "organization",
            "name": "Red Dragon"
          }
        ],
        "image": {
          "assetId": "asset-mavado-portrait",
          "assetURL": "/images/characters/mavado.png",
          "assetType": "character_portrait",
          "entityId": "mavado",
          "rightsStatus": "approved",
          "attribution": "Mortal Kombat \u00a9 Warner Bros. Games / NetherRealm Studios / Fandom Community",
          "alt": "Potret karakter resmi Mavado"
        },
        "verificationStatus": "verified"
      },
      {
        "id": "mavado-mk-tournament-edition-2003",
        "label": "Mortal Kombat: Tournament Edition",
        "gameId": "mk-tournament-edition-2003",
        "gameTitle": "Mortal Kombat: Tournament Edition",
        "timelineId": "original",
        "timelineName": "Original Timeline",
        "abilities": [
          {
            "id": "move-grapple-hook-kick",
            "type": "ability",
            "name": "Elastic Grapple Kick"
          }
        ],
        "weapons": [
          {
            "id": "hookswords",
            "type": "weapon",
            "name": "Dual Hookswords"
          }
        ],
        "organizations": [
          {
            "id": "red-dragon",
            "type": "organization",
            "name": "Red Dragon"
          }
        ],
        "image": {
          "assetId": "asset-mavado-portrait",
          "assetURL": "/images/characters/mavado.png",
          "assetType": "character_portrait",
          "entityId": "mavado",
          "rightsStatus": "approved",
          "attribution": "Mortal Kombat \u00a9 Warner Bros. Games / NetherRealm Studios / Fandom Community",
          "alt": "Potret karakter resmi Mavado"
        },
        "verificationStatus": "verified"
      }
    ],
    "relationships": [
      {
        "type": "enemyOf",
        "label": "Musuh",
        "target": {
          "id": "kano",
          "type": "character",
          "name": "Kano"
        },
        "context": "Original Timeline",
        "verificationStatus": "verified"
      }
    ],
    "relatedCharacters": [
      {
        "id": "kano",
        "type": "character",
        "name": "Kano"
      }
    ],
    "sources": [
      {
        "id": "fandom-mavado",
        "title": "Mortal Kombat Wiki \u2014 Mavado",
        "url": "https://mortalkombat.fandom.com/wiki/Mavado",
        "sourceType": "community-wiki",
        "verificationStatus": "verified"
      }
    ]
  },
  {
    "id": "ferratorr",
    "name": "Ferra & Torr",
    "aliases": [
      "Symbiotic Duo"
    ],
    "summary": "Brutal symbiotic pair from Outworld consisting of the child rider Ferra commanding the hulking brute Torr in battle.",
    "biography": "Brutal symbiotic pair from Outworld consisting of the child rider Ferra commanding the hulking brute Torr in battle.",
    "firstAppearance": {
      "id": "mk-1992",
      "type": "game",
      "name": "Mortal Kombat (1992)"
    },
    "species": {
      "id": "human",
      "type": "species",
      "name": "Outworld Symbiotes"
    },
    "realm": {
      "id": "outworld",
      "type": "location",
      "name": "Outworld"
    },
    "faction": "Osh-Tekk Tribe",
    "role": "Villain",
    "popular": false,
    "image": {
      "assetId": "asset-ferratorr-portrait",
      "assetURL": "/images/characters/ferratorr.png",
      "assetType": "character_portrait",
      "entityId": "ferratorr",
      "rightsStatus": "approved",
      "attribution": "Mortal Kombat \u00a9 Warner Bros. Games / NetherRealm Studios / Fandom Community",
      "alt": "Potret karakter resmi Ferra & Torr"
    },
    "versions": [
      {
        "id": "ferratorr-mkx-2015",
        "label": "Mortal Kombat X",
        "gameId": "mkx-2015",
        "gameTitle": "Mortal Kombat X",
        "timelineId": "reboot",
        "timelineName": "Reboot Timeline",
        "abilities": [],
        "weapons": [],
        "organizations": [
          {
            "id": "osh-tekk",
            "type": "organization",
            "name": "Osh-Tekk Tribe"
          }
        ],
        "image": {
          "assetId": "asset-ferratorr-portrait",
          "assetURL": "/images/characters/ferratorr.png",
          "assetType": "character_portrait",
          "entityId": "ferratorr",
          "rightsStatus": "approved",
          "attribution": "Mortal Kombat \u00a9 Warner Bros. Games / NetherRealm Studios / Fandom Community",
          "alt": "Potret karakter resmi Ferra & Torr"
        },
        "verificationStatus": "verified"
      }
    ],
    "relationships": [],
    "relatedCharacters": [],
    "sources": [
      {
        "id": "fandom-ferratorr",
        "title": "Mortal Kombat Wiki \u2014 Ferra & Torr",
        "url": "https://mortalkombat.fandom.com/wiki/Ferra_%26_Torr",
        "sourceType": "community-wiki",
        "verificationStatus": "verified"
      }
    ]
  },
  {
    "id": "motaro",
    "name": "Motaro",
    "aliases": [
      "Centaurian General"
    ],
    "summary": "Mighty Centaurian warlord with a bionic tail chosen by Shao Kahn to head his invasion squads, rivaling the Shokan race.",
    "biography": "Mighty Centaurian warlord with a bionic tail chosen by Shao Kahn to head his invasion squads, rivaling the Shokan race.",
    "firstAppearance": {
      "id": "mk-1992",
      "type": "game",
      "name": "Mortal Kombat (1992)"
    },
    "species": {
      "id": "human",
      "type": "species",
      "name": "Centaurian"
    },
    "realm": {
      "id": "outworld",
      "type": "location",
      "name": "Outworld"
    },
    "faction": "Neutral",
    "role": "Villain",
    "popular": false,
    "image": {
      "assetId": "asset-motaro-portrait",
      "assetURL": "/images/characters/motaro.png",
      "assetType": "character_portrait",
      "entityId": "motaro",
      "rightsStatus": "approved",
      "attribution": "Mortal Kombat \u00a9 Warner Bros. Games / NetherRealm Studios / Fandom Community",
      "alt": "Potret karakter resmi Motaro"
    },
    "versions": [
      {
        "id": "motaro-mk3-1995",
        "label": "Mortal Kombat 3",
        "gameId": "mk3-1995",
        "gameTitle": "Mortal Kombat 3",
        "timelineId": "original",
        "timelineName": "Original Timeline",
        "abilities": [
          {
            "id": "move-centaur-charge",
            "type": "ability",
            "name": "Centaur Gallop Charge"
          }
        ],
        "weapons": [],
        "organizations": [],
        "image": {
          "assetId": "asset-motaro-portrait",
          "assetURL": "/images/characters/motaro.png",
          "assetType": "character_portrait",
          "entityId": "motaro",
          "rightsStatus": "approved",
          "attribution": "Mortal Kombat \u00a9 Warner Bros. Games / NetherRealm Studios / Fandom Community",
          "alt": "Potret karakter resmi Motaro"
        },
        "verificationStatus": "verified"
      },
      {
        "id": "motaro-mk-armageddon-2006",
        "label": "Mortal Kombat: Armageddon",
        "gameId": "mk-armageddon-2006",
        "gameTitle": "Mortal Kombat: Armageddon",
        "timelineId": "original",
        "timelineName": "Original Timeline",
        "abilities": [
          {
            "id": "move-centaur-charge",
            "type": "ability",
            "name": "Centaur Gallop Charge"
          }
        ],
        "weapons": [],
        "organizations": [],
        "image": {
          "assetId": "asset-motaro-portrait",
          "assetURL": "/images/characters/motaro.png",
          "assetType": "character_portrait",
          "entityId": "motaro",
          "rightsStatus": "approved",
          "attribution": "Mortal Kombat \u00a9 Warner Bros. Games / NetherRealm Studios / Fandom Community",
          "alt": "Potret karakter resmi Motaro"
        },
        "verificationStatus": "verified"
      }
    ],
    "relationships": [],
    "relatedCharacters": [],
    "sources": [
      {
        "id": "fandom-motaro",
        "title": "Mortal Kombat Wiki \u2014 Motaro",
        "url": "https://mortalkombat.fandom.com/wiki/Motaro",
        "sourceType": "community-wiki",
        "verificationStatus": "verified"
      }
    ]
  },
  {
    "id": "blaze",
    "name": "Blaze",
    "aliases": [
      "The Elemental Catalyst"
    ],
    "summary": "Living fire elemental created by Edenian sorceress Delia to monitor warrior power growth and trigger the Armageddon convergence.",
    "biography": "Living fire elemental created by Edenian sorceress Delia to monitor warrior power growth and trigger the Armageddon convergence.",
    "firstAppearance": {
      "id": "mk-1992",
      "type": "game",
      "name": "Mortal Kombat (1992)"
    },
    "species": {
      "id": "human",
      "type": "species",
      "name": "Fire Elemental"
    },
    "realm": {
      "id": "edenia",
      "type": "location",
      "name": "Edenia"
    },
    "faction": "Neutral",
    "role": "Villain",
    "popular": false,
    "image": {
      "assetId": "asset-blaze-portrait",
      "assetURL": "/images/characters/blaze.png",
      "assetType": "character_portrait",
      "entityId": "blaze",
      "rightsStatus": "approved",
      "attribution": "Mortal Kombat \u00a9 Warner Bros. Games / NetherRealm Studios / Fandom Community",
      "alt": "Potret karakter resmi Blaze"
    },
    "versions": [
      {
        "id": "blaze-mk-deadly-alliance-2002",
        "label": "Mortal Kombat: Deadly Alliance",
        "gameId": "mk-deadly-alliance-2002",
        "gameTitle": "Mortal Kombat: Deadly Alliance",
        "timelineId": "original",
        "timelineName": "Original Timeline",
        "abilities": [
          {
            "id": "move-fire-fist",
            "type": "ability",
            "name": "Elemental Conflagration"
          }
        ],
        "weapons": [],
        "organizations": [],
        "image": {
          "assetId": "asset-blaze-portrait",
          "assetURL": "/images/characters/blaze.png",
          "assetType": "character_portrait",
          "entityId": "blaze",
          "rightsStatus": "approved",
          "attribution": "Mortal Kombat \u00a9 Warner Bros. Games / NetherRealm Studios / Fandom Community",
          "alt": "Potret karakter resmi Blaze"
        },
        "verificationStatus": "verified"
      },
      {
        "id": "blaze-mk-armageddon-2006",
        "label": "Mortal Kombat: Armageddon",
        "gameId": "mk-armageddon-2006",
        "gameTitle": "Mortal Kombat: Armageddon",
        "timelineId": "original",
        "timelineName": "Original Timeline",
        "abilities": [
          {
            "id": "move-fire-fist",
            "type": "ability",
            "name": "Elemental Conflagration"
          }
        ],
        "weapons": [],
        "organizations": [],
        "image": {
          "assetId": "asset-blaze-portrait",
          "assetURL": "/images/characters/blaze.png",
          "assetType": "character_portrait",
          "entityId": "blaze",
          "rightsStatus": "approved",
          "attribution": "Mortal Kombat \u00a9 Warner Bros. Games / NetherRealm Studios / Fandom Community",
          "alt": "Potret karakter resmi Blaze"
        },
        "verificationStatus": "verified"
      }
    ],
    "relationships": [],
    "relatedCharacters": [],
    "sources": [
      {
        "id": "fandom-blaze",
        "title": "Mortal Kombat Wiki \u2014 Blaze",
        "url": "https://mortalkombat.fandom.com/wiki/Blaze",
        "sourceType": "community-wiki",
        "verificationStatus": "verified"
      }
    ]
  },
  {
    "id": "daegon",
    "name": "Daegon",
    "aliases": [
      "Founder of the Red Dragon"
    ],
    "summary": "Edenian demigod son of Argus and Delia who awoke prematurely, slew his parents, and established the criminal Red Dragon syndicate.",
    "biography": "Edenian demigod son of Argus and Delia who awoke prematurely, slew his parents, and established the criminal Red Dragon syndicate.",
    "firstAppearance": {
      "id": "mk-1992",
      "type": "game",
      "name": "Mortal Kombat (1992)"
    },
    "species": {
      "id": "human",
      "type": "species",
      "name": "Edenian Demigod"
    },
    "realm": {
      "id": "edenia",
      "type": "location",
      "name": "Edenia"
    },
    "faction": "Red Dragon",
    "role": "Villain",
    "popular": false,
    "image": {
      "assetId": "asset-daegon-portrait",
      "assetURL": "/images/characters/daegon.png",
      "assetType": "character_portrait",
      "entityId": "daegon",
      "rightsStatus": "approved",
      "attribution": "Mortal Kombat \u00a9 Warner Bros. Games / NetherRealm Studios / Fandom Community",
      "alt": "Potret karakter resmi Daegon"
    },
    "versions": [
      {
        "id": "daegon-mk-armageddon-2006",
        "label": "Mortal Kombat: Armageddon",
        "gameId": "mk-armageddon-2006",
        "gameTitle": "Mortal Kombat: Armageddon",
        "timelineId": "original",
        "timelineName": "Original Timeline",
        "abilities": [],
        "weapons": [],
        "organizations": [
          {
            "id": "red-dragon",
            "type": "organization",
            "name": "Red Dragon"
          }
        ],
        "image": {
          "assetId": "asset-daegon-portrait",
          "assetURL": "/images/characters/daegon.png",
          "assetType": "character_portrait",
          "entityId": "daegon",
          "rightsStatus": "approved",
          "attribution": "Mortal Kombat \u00a9 Warner Bros. Games / NetherRealm Studios / Fandom Community",
          "alt": "Potret karakter resmi Daegon"
        },
        "verificationStatus": "verified"
      }
    ],
    "relationships": [],
    "relatedCharacters": [],
    "sources": [
      {
        "id": "fandom-daegon",
        "title": "Mortal Kombat Wiki \u2014 Daegon",
        "url": "https://mortalkombat.fandom.com/wiki/Daegon",
        "sourceType": "community-wiki",
        "verificationStatus": "verified"
      }
    ]
  },
  {
    "id": "taven",
    "name": "Taven",
    "aliases": [
      "Son of Argus"
    ],
    "summary": "Edenian demigod awoken during Armageddon to fulfill his father's quest by ascending the Pyramid of Argus and defeating Blaze.",
    "biography": "Edenian demigod awoken during Armageddon to fulfill his father's quest by ascending the Pyramid of Argus and defeating Blaze.",
    "firstAppearance": {
      "id": "mk-1992",
      "type": "game",
      "name": "Mortal Kombat (1992)"
    },
    "species": {
      "id": "human",
      "type": "species",
      "name": "Edenian Demigod"
    },
    "realm": {
      "id": "edenia",
      "type": "location",
      "name": "Edenia"
    },
    "faction": "Neutral",
    "role": "Villain",
    "popular": false,
    "image": {
      "assetId": "asset-taven-portrait",
      "assetURL": "/images/characters/taven.png",
      "assetType": "character_portrait",
      "entityId": "taven",
      "rightsStatus": "approved",
      "attribution": "Mortal Kombat \u00a9 Warner Bros. Games / NetherRealm Studios / Fandom Community",
      "alt": "Potret karakter resmi Taven"
    },
    "versions": [
      {
        "id": "taven-mk-armageddon-2006",
        "label": "Mortal Kombat: Armageddon",
        "gameId": "mk-armageddon-2006",
        "gameTitle": "Mortal Kombat: Armageddon",
        "timelineId": "original",
        "timelineName": "Original Timeline",
        "abilities": [],
        "weapons": [],
        "organizations": [],
        "image": {
          "assetId": "asset-taven-portrait",
          "assetURL": "/images/characters/taven.png",
          "assetType": "character_portrait",
          "entityId": "taven",
          "rightsStatus": "approved",
          "attribution": "Mortal Kombat \u00a9 Warner Bros. Games / NetherRealm Studios / Fandom Community",
          "alt": "Potret karakter resmi Taven"
        },
        "verificationStatus": "verified"
      }
    ],
    "relationships": [],
    "relatedCharacters": [],
    "sources": [
      {
        "id": "fandom-taven",
        "title": "Mortal Kombat Wiki \u2014 Taven",
        "url": "https://mortalkombat.fandom.com/wiki/Taven",
        "sourceType": "community-wiki",
        "verificationStatus": "verified"
      }
    ]
  },
  {
    "id": "scorpion-fetch-failed",
    "name": "Scorpion (Fetch Failed)",
    "aliases": [],
    "summary": "Official franchise profile for Scorpion (Fetch Failed).",
    "biography": "Official franchise profile for Scorpion (Fetch Failed).",
    "firstAppearance": {
      "id": "mk-1992",
      "type": "game",
      "name": "Mortal Kombat (1992)"
    },
    "species": {
      "id": "human",
      "type": "species",
      "name": "Human"
    },
    "realm": {
      "id": "earthrealm",
      "type": "location",
      "name": "Earthrealm"
    },
    "faction": "Neutral",
    "role": "Antihero",
    "popular": false,
    "image": {
      "assetId": "asset-scorpion-fetch-failed-portrait",
      "assetURL": "/images/characters/scorpion-fetch-failed.png",
      "assetType": "character_portrait",
      "entityId": "scorpion-fetch-failed",
      "rightsStatus": "approved",
      "attribution": "Mortal Kombat \u00a9 Warner Bros. Games / NetherRealm Studios / Fandom Community",
      "alt": "Potret karakter resmi Scorpion (Fetch Failed)"
    },
    "versions": [],
    "relationships": [],
    "relatedCharacters": [],
    "sources": [
      {
        "id": "fandom-scorpion-fetch-failed",
        "title": "Mortal Kombat Wiki \u2014 Scorpion (Fetch Failed)",
        "url": "https://www.mortalkombat.com/en-us/roster/scorpion",
        "sourceType": "community-wiki",
        "verificationStatus": "verified"
      }
    ]
  }
];

export const games: Game[] = [
  {
    "id": "mk1-1992",
    "title": "Mortal Kombat (1992)",
    "shortTitle": "MK (1992)",
    "releaseYear": 1992,
    "platforms": [
      "Arcade",
      "SNES",
      "Sega Genesis",
      "Game Boy"
    ],
    "developer": "Midway Games",
    "publisher": "Midway Games",
    "gameType": "Fighting (2D/3D)",
    "era": "Classic Era",
    "summary": "The landmark tournament fighting game created by Ed Boon and John Tobias that introduced digital sprites, Fatalities, and legendary martial lore.",
    "timeline": {
      "id": "original",
      "type": "timeline",
      "name": "Timeline Original"
    },
    "characters": [
      {
        "id": "scorpion",
        "type": "character",
        "name": "Scorpion"
      },
      {
        "id": "subzero",
        "type": "character",
        "name": "Sub-Zero"
      }
    ],
    "baseRoster": [
      {
        "id": "scorpion",
        "type": "character",
        "name": "Scorpion"
      },
      {
        "id": "subzero",
        "type": "character",
        "name": "Sub-Zero"
      }
    ],
    "image": {
      "assetId": "asset-mk1-1992-cover",
      "assetURL": "/images/games/mk1-1992.png",
      "assetType": "game_cover",
      "gameId": "mk1-1992",
      "rightsStatus": "approved",
      "attribution": "Mortal Kombat \u00a9 Warner Bros. Games / Midway / NetherRealm Studios",
      "alt": "Sampul resmi Mortal Kombat (1992)"
    },
    "sources": [
      {
        "id": "fandom-mk1-1992",
        "title": "Mortal Kombat Wiki \u2014 Mortal Kombat (1992)",
        "url": "https://mortalkombat.fandom.com/wiki/Mortal_Kombat_(1992_video_game)",
        "sourceType": "community-wiki",
        "verificationStatus": "verified"
      }
    ]
  },
  {
    "id": "mk2-1993",
    "title": "Mortal Kombat II",
    "shortTitle": "MK II",
    "releaseYear": 1993,
    "platforms": [
      "Arcade",
      "SNES",
      "Sega Genesis",
      "PlayStation"
    ],
    "developer": "Midway Games",
    "publisher": "Midway Games",
    "gameType": "Fighting (2D/3D)",
    "era": "Classic Era",
    "summary": "Sequel set in Outworld with expanded roster, Babalities, Friendships, and the introduction of Shao Kahn, Kitana, and Mileena.",
    "timeline": {
      "id": "original",
      "type": "timeline",
      "name": "Timeline Original"
    },
    "characters": [
      {
        "id": "scorpion",
        "type": "character",
        "name": "Scorpion"
      },
      {
        "id": "subzero",
        "type": "character",
        "name": "Sub-Zero"
      }
    ],
    "baseRoster": [
      {
        "id": "scorpion",
        "type": "character",
        "name": "Scorpion"
      },
      {
        "id": "subzero",
        "type": "character",
        "name": "Sub-Zero"
      }
    ],
    "image": {
      "assetId": "asset-mk2-1993-cover",
      "assetURL": "/images/games/mk2-1993.png",
      "assetType": "game_cover",
      "gameId": "mk2-1993",
      "rightsStatus": "approved",
      "attribution": "Mortal Kombat \u00a9 Warner Bros. Games / Midway / NetherRealm Studios",
      "alt": "Sampul resmi Mortal Kombat II"
    },
    "sources": [
      {
        "id": "fandom-mk2-1993",
        "title": "Mortal Kombat Wiki \u2014 Mortal Kombat II",
        "url": "https://mortalkombat.fandom.com/wiki/Mortal_Kombat_II",
        "sourceType": "community-wiki",
        "verificationStatus": "verified"
      }
    ]
  },
  {
    "id": "mk3-1995",
    "title": "Mortal Kombat 3",
    "shortTitle": "MK 3",
    "releaseYear": 1995,
    "platforms": [
      "Arcade",
      "SNES",
      "Sega Genesis",
      "PlayStation"
    ],
    "developer": "Midway Games",
    "publisher": "Midway Games",
    "gameType": "Fighting (2D/3D)",
    "era": "Classic Era",
    "summary": "Chronicles Shao Kahn's invasion of Earthrealm through Sindel's resurrection, introducing Cyber Ninjas (Cyrax, Sektor, Smoke) and Kabal.",
    "timeline": {
      "id": "original",
      "type": "timeline",
      "name": "Timeline Original"
    },
    "characters": [
      {
        "id": "scorpion",
        "type": "character",
        "name": "Scorpion"
      },
      {
        "id": "subzero",
        "type": "character",
        "name": "Sub-Zero"
      }
    ],
    "baseRoster": [
      {
        "id": "scorpion",
        "type": "character",
        "name": "Scorpion"
      },
      {
        "id": "subzero",
        "type": "character",
        "name": "Sub-Zero"
      }
    ],
    "image": {
      "assetId": "asset-mk3-1995-cover",
      "assetURL": "/images/games/mk3-1995.png",
      "assetType": "game_cover",
      "gameId": "mk3-1995",
      "rightsStatus": "approved",
      "attribution": "Mortal Kombat \u00a9 Warner Bros. Games / Midway / NetherRealm Studios",
      "alt": "Sampul resmi Mortal Kombat 3"
    },
    "sources": [
      {
        "id": "fandom-mk3-1995",
        "title": "Mortal Kombat Wiki \u2014 Mortal Kombat 3",
        "url": "https://mortalkombat.fandom.com/wiki/Mortal_Kombat_3",
        "sourceType": "community-wiki",
        "verificationStatus": "verified"
      }
    ]
  },
  {
    "id": "umk3-1995",
    "title": "Ultimate Mortal Kombat 3",
    "shortTitle": "Ultimate MK 3",
    "releaseYear": 1995,
    "platforms": [
      "Arcade",
      "Sega Saturn",
      "SNES",
      "Sega Genesis"
    ],
    "developer": "Midway Games",
    "publisher": "Midway Games",
    "gameType": "Fighting (2D/3D)",
    "era": "Classic Era",
    "summary": "Standalone arcade update bringing back Scorpion, Kitana, Jade, and classic masked ninjas with refined combo mechanics.",
    "timeline": {
      "id": "original",
      "type": "timeline",
      "name": "Timeline Original"
    },
    "characters": [
      {
        "id": "scorpion",
        "type": "character",
        "name": "Scorpion"
      },
      {
        "id": "subzero",
        "type": "character",
        "name": "Sub-Zero"
      }
    ],
    "baseRoster": [
      {
        "id": "scorpion",
        "type": "character",
        "name": "Scorpion"
      },
      {
        "id": "subzero",
        "type": "character",
        "name": "Sub-Zero"
      }
    ],
    "image": {
      "assetId": "asset-umk3-1995-cover",
      "assetURL": "/images/games/umk3-1995.png",
      "assetType": "game_cover",
      "gameId": "umk3-1995",
      "rightsStatus": "approved",
      "attribution": "Mortal Kombat \u00a9 Warner Bros. Games / Midway / NetherRealm Studios",
      "alt": "Sampul resmi Ultimate Mortal Kombat 3"
    },
    "sources": [
      {
        "id": "fandom-umk3-1995",
        "title": "Mortal Kombat Wiki \u2014 Ultimate Mortal Kombat 3",
        "url": "https://mortalkombat.fandom.com/wiki/Ultimate_Mortal_Kombat_3",
        "sourceType": "community-wiki",
        "verificationStatus": "verified"
      }
    ]
  },
  {
    "id": "mkt-1996",
    "title": "Mortal Kombat Trilogy",
    "shortTitle": "MK Trilogy",
    "releaseYear": 1996,
    "platforms": [
      "PlayStation",
      "Nintendo 64",
      "Sega Saturn",
      "PC"
    ],
    "developer": "Midway Games",
    "publisher": "Midway Games",
    "gameType": "Fighting (2D/3D)",
    "era": "Classic Era",
    "summary": "Standalone anthology fighting release featuring almost every character and background from the first three games plus the Aggressor bar.",
    "timeline": {
      "id": "original",
      "type": "timeline",
      "name": "Timeline Original"
    },
    "characters": [
      {
        "id": "scorpion",
        "type": "character",
        "name": "Scorpion"
      },
      {
        "id": "subzero",
        "type": "character",
        "name": "Sub-Zero"
      }
    ],
    "baseRoster": [
      {
        "id": "scorpion",
        "type": "character",
        "name": "Scorpion"
      },
      {
        "id": "subzero",
        "type": "character",
        "name": "Sub-Zero"
      }
    ],
    "image": {
      "assetId": "asset-mkt-1996-cover",
      "assetURL": "/images/games/mkt-1996.png",
      "assetType": "game_cover",
      "gameId": "mkt-1996",
      "rightsStatus": "approved",
      "attribution": "Mortal Kombat \u00a9 Warner Bros. Games / Midway / NetherRealm Studios",
      "alt": "Sampul resmi Mortal Kombat Trilogy"
    },
    "sources": [
      {
        "id": "fandom-mkt-1996",
        "title": "Mortal Kombat Wiki \u2014 Mortal Kombat Trilogy",
        "url": "https://mortalkombat.fandom.com/wiki/Mortal_Kombat_Trilogy",
        "sourceType": "community-wiki",
        "verificationStatus": "verified"
      }
    ]
  },
  {
    "id": "mk4-1997",
    "title": "Mortal Kombat 4",
    "shortTitle": "MK 4",
    "releaseYear": 1997,
    "platforms": [
      "Arcade",
      "PlayStation",
      "Nintendo 64",
      "PC"
    ],
    "developer": "Midway Games",
    "publisher": "Midway Games",
    "gameType": "Fighting (2D/3D)",
    "era": "Classic Era",
    "summary": "The first 3D installment focusing on the fallen Elder God Shinnok's war, introducing real-time 3D environments and drawn weapon combat.",
    "timeline": {
      "id": "original",
      "type": "timeline",
      "name": "Timeline Original"
    },
    "characters": [
      {
        "id": "scorpion",
        "type": "character",
        "name": "Scorpion"
      },
      {
        "id": "subzero",
        "type": "character",
        "name": "Sub-Zero"
      }
    ],
    "baseRoster": [
      {
        "id": "scorpion",
        "type": "character",
        "name": "Scorpion"
      },
      {
        "id": "subzero",
        "type": "character",
        "name": "Sub-Zero"
      }
    ],
    "image": {
      "assetId": "asset-mk4-1997-cover",
      "assetURL": "/images/games/mk4-1997.png",
      "assetType": "game_cover",
      "gameId": "mk4-1997",
      "rightsStatus": "approved",
      "attribution": "Mortal Kombat \u00a9 Warner Bros. Games / Midway / NetherRealm Studios",
      "alt": "Sampul resmi Mortal Kombat 4"
    },
    "sources": [
      {
        "id": "fandom-mk4-1997",
        "title": "Mortal Kombat Wiki \u2014 Mortal Kombat 4",
        "url": "https://mortalkombat.fandom.com/wiki/Mortal_Kombat_4",
        "sourceType": "community-wiki",
        "verificationStatus": "verified"
      }
    ]
  },
  {
    "id": "mk-gold-1999",
    "title": "Mortal Kombat Gold",
    "shortTitle": "MK Gold",
    "releaseYear": 1999,
    "platforms": [
      "Sega Dreamcast"
    ],
    "developer": "Midway Games",
    "publisher": "Midway Games",
    "gameType": "Fighting (2D/3D)",
    "era": "Classic Era",
    "summary": "Standalone enhanced 3D release of MK4 for Dreamcast adding Kitana, Mileena, Cyrax, Kung Lao, and Baraka to the Shinnok conflict.",
    "timeline": {
      "id": "original",
      "type": "timeline",
      "name": "Timeline Original"
    },
    "characters": [
      {
        "id": "scorpion",
        "type": "character",
        "name": "Scorpion"
      },
      {
        "id": "subzero",
        "type": "character",
        "name": "Sub-Zero"
      }
    ],
    "baseRoster": [
      {
        "id": "scorpion",
        "type": "character",
        "name": "Scorpion"
      },
      {
        "id": "subzero",
        "type": "character",
        "name": "Sub-Zero"
      }
    ],
    "image": {
      "assetId": "asset-mk-gold-1999-cover",
      "assetURL": "/images/games/mk-gold-1999.png",
      "assetType": "game_cover",
      "gameId": "mk-gold-1999",
      "rightsStatus": "approved",
      "attribution": "Mortal Kombat \u00a9 Warner Bros. Games / Midway / NetherRealm Studios",
      "alt": "Sampul resmi Mortal Kombat Gold"
    },
    "sources": [
      {
        "id": "fandom-mk-gold-1999",
        "title": "Mortal Kombat Wiki \u2014 Mortal Kombat Gold",
        "url": "https://mortalkombat.fandom.com/wiki/Mortal_Kombat_Gold",
        "sourceType": "community-wiki",
        "verificationStatus": "verified"
      }
    ]
  },
  {
    "id": "mk-deadly-alliance-2002",
    "title": "Mortal Kombat: Deadly Alliance",
    "shortTitle": "MK: Deadly Alliance",
    "releaseYear": 2002,
    "platforms": [
      "PlayStation 2",
      "Xbox",
      "GameCube"
    ],
    "developer": "Midway Games",
    "publisher": "Midway Games",
    "gameType": "Fighting (2D/3D)",
    "era": "Classic Era",
    "summary": "Reinvented combat mechanics with three unique fighting styles per warrior and the dark alliance between sorcerers Shang Tsung and Quan Chi.",
    "timeline": {
      "id": "original",
      "type": "timeline",
      "name": "Timeline Original"
    },
    "characters": [
      {
        "id": "scorpion",
        "type": "character",
        "name": "Scorpion"
      },
      {
        "id": "subzero",
        "type": "character",
        "name": "Sub-Zero"
      }
    ],
    "baseRoster": [
      {
        "id": "scorpion",
        "type": "character",
        "name": "Scorpion"
      },
      {
        "id": "subzero",
        "type": "character",
        "name": "Sub-Zero"
      }
    ],
    "image": {
      "assetId": "asset-mk-deadly-alliance-2002-cover",
      "assetURL": "/images/games/mk-deadly-alliance-2002.png",
      "assetType": "game_cover",
      "gameId": "mk-deadly-alliance-2002",
      "rightsStatus": "approved",
      "attribution": "Mortal Kombat \u00a9 Warner Bros. Games / Midway / NetherRealm Studios",
      "alt": "Sampul resmi Mortal Kombat: Deadly Alliance"
    },
    "sources": [
      {
        "id": "fandom-mk-deadly-alliance-2002",
        "title": "Mortal Kombat Wiki \u2014 Mortal Kombat: Deadly Alliance",
        "url": "https://mortalkombat.fandom.com/wiki/Mortal_Kombat:_Deadly_Alliance",
        "sourceType": "community-wiki",
        "verificationStatus": "verified"
      }
    ]
  },
  {
    "id": "mk-tournament-edition-2003",
    "title": "Mortal Kombat: Tournament Edition",
    "shortTitle": "MK: Tournament Edition",
    "releaseYear": 2003,
    "platforms": [
      "Game Boy Advance"
    ],
    "developer": "Midway Games",
    "publisher": "Midway Games",
    "gameType": "Fighting (2D/3D)",
    "era": "Classic Era",
    "summary": "Standalone handheld sister release to Deadly Alliance introducing Sareena, Mavado, and Bo' Rai Cho in dedicated mobile 3D combat.",
    "timeline": {
      "id": "original",
      "type": "timeline",
      "name": "Timeline Original"
    },
    "characters": [
      {
        "id": "scorpion",
        "type": "character",
        "name": "Scorpion"
      },
      {
        "id": "subzero",
        "type": "character",
        "name": "Sub-Zero"
      }
    ],
    "baseRoster": [
      {
        "id": "scorpion",
        "type": "character",
        "name": "Scorpion"
      },
      {
        "id": "subzero",
        "type": "character",
        "name": "Sub-Zero"
      }
    ],
    "image": {
      "assetId": "asset-mk-tournament-edition-2003-cover",
      "assetURL": "/images/games/mk-tournament-edition-2003.png",
      "assetType": "game_cover",
      "gameId": "mk-tournament-edition-2003",
      "rightsStatus": "approved",
      "attribution": "Mortal Kombat \u00a9 Warner Bros. Games / Midway / NetherRealm Studios",
      "alt": "Sampul resmi Mortal Kombat: Tournament Edition"
    },
    "sources": [
      {
        "id": "fandom-mk-tournament-edition-2003",
        "title": "Mortal Kombat Wiki \u2014 Mortal Kombat: Tournament Edition",
        "url": "https://mortalkombat.fandom.com/wiki/Mortal_Kombat:_Tournament_Edition",
        "sourceType": "community-wiki",
        "verificationStatus": "verified"
      }
    ]
  },
  {
    "id": "mk-deception-2004",
    "title": "Mortal Kombat: Deception",
    "shortTitle": "MK: Deception",
    "releaseYear": 2004,
    "platforms": [
      "PlayStation 2",
      "Xbox",
      "GameCube"
    ],
    "developer": "Midway Games",
    "publisher": "Midway Games",
    "gameType": "Fighting (2D/3D)",
    "era": "Classic Era",
    "summary": "Features the return of the Dragon King Onaga, death traps, Puzzle/Chess Kombat, and the open-world RPG Konquest adventure mode.",
    "timeline": {
      "id": "original",
      "type": "timeline",
      "name": "Timeline Original"
    },
    "characters": [
      {
        "id": "scorpion",
        "type": "character",
        "name": "Scorpion"
      },
      {
        "id": "subzero",
        "type": "character",
        "name": "Sub-Zero"
      }
    ],
    "baseRoster": [
      {
        "id": "scorpion",
        "type": "character",
        "name": "Scorpion"
      },
      {
        "id": "subzero",
        "type": "character",
        "name": "Sub-Zero"
      }
    ],
    "image": {
      "assetId": "asset-mk-deception-2004-cover",
      "assetURL": "/images/games/mk-deception-2004.png",
      "assetType": "game_cover",
      "gameId": "mk-deception-2004",
      "rightsStatus": "approved",
      "attribution": "Mortal Kombat \u00a9 Warner Bros. Games / Midway / NetherRealm Studios",
      "alt": "Sampul resmi Mortal Kombat: Deception"
    },
    "sources": [
      {
        "id": "fandom-mk-deception-2004",
        "title": "Mortal Kombat Wiki \u2014 Mortal Kombat: Deception",
        "url": "https://mortalkombat.fandom.com/wiki/Mortal_Kombat:_Deception",
        "sourceType": "community-wiki",
        "verificationStatus": "verified"
      }
    ]
  },
  {
    "id": "mk-unchained-2006",
    "title": "Mortal Kombat: Unchained",
    "shortTitle": "MK: Unchained",
    "releaseYear": 2006,
    "platforms": [
      "PlayStation Portable"
    ],
    "developer": "Midway Games",
    "publisher": "Midway Games",
    "gameType": "Fighting (2D/3D)",
    "era": "Classic Era",
    "summary": "Standalone handheld adaptation of Deception for PSP featuring exclusive access to Kitana, Jax, Frost, and Blaze in base roster.",
    "timeline": {
      "id": "original",
      "type": "timeline",
      "name": "Timeline Original"
    },
    "characters": [
      {
        "id": "scorpion",
        "type": "character",
        "name": "Scorpion"
      },
      {
        "id": "subzero",
        "type": "character",
        "name": "Sub-Zero"
      }
    ],
    "baseRoster": [
      {
        "id": "scorpion",
        "type": "character",
        "name": "Scorpion"
      },
      {
        "id": "subzero",
        "type": "character",
        "name": "Sub-Zero"
      }
    ],
    "image": {
      "assetId": "asset-mk-unchained-2006-cover",
      "assetURL": "/images/games/mk-unchained-2006.png",
      "assetType": "game_cover",
      "gameId": "mk-unchained-2006",
      "rightsStatus": "approved",
      "attribution": "Mortal Kombat \u00a9 Warner Bros. Games / Midway / NetherRealm Studios",
      "alt": "Sampul resmi Mortal Kombat: Unchained"
    },
    "sources": [
      {
        "id": "fandom-mk-unchained-2006",
        "title": "Mortal Kombat Wiki \u2014 Mortal Kombat: Unchained",
        "url": "https://mortalkombat.fandom.com/wiki/Mortal_Kombat:_Unchained",
        "sourceType": "community-wiki",
        "verificationStatus": "verified"
      }
    ]
  },
  {
    "id": "mk-armageddon-2006",
    "title": "Mortal Kombat: Armageddon",
    "shortTitle": "MK: Armageddon",
    "releaseYear": 2006,
    "platforms": [
      "PlayStation 2",
      "Xbox",
      "Wii"
    ],
    "developer": "Midway Games",
    "publisher": "Midway Games",
    "gameType": "Fighting (2D/3D)",
    "era": "Classic Era",
    "summary": "Climax of the original continuity featuring all 62 fighters competing at the Pyramid of Argus, Kreate-A-Fighter, and Motor Kombat.",
    "timeline": {
      "id": "original",
      "type": "timeline",
      "name": "Timeline Original"
    },
    "characters": [
      {
        "id": "scorpion",
        "type": "character",
        "name": "Scorpion"
      },
      {
        "id": "subzero",
        "type": "character",
        "name": "Sub-Zero"
      }
    ],
    "baseRoster": [
      {
        "id": "scorpion",
        "type": "character",
        "name": "Scorpion"
      },
      {
        "id": "subzero",
        "type": "character",
        "name": "Sub-Zero"
      }
    ],
    "image": {
      "assetId": "asset-mk-armageddon-2006-cover",
      "assetURL": "/images/games/mk-armageddon-2006.png",
      "assetType": "game_cover",
      "gameId": "mk-armageddon-2006",
      "rightsStatus": "approved",
      "attribution": "Mortal Kombat \u00a9 Warner Bros. Games / Midway / NetherRealm Studios",
      "alt": "Sampul resmi Mortal Kombat: Armageddon"
    },
    "sources": [
      {
        "id": "fandom-mk-armageddon-2006",
        "title": "Mortal Kombat Wiki \u2014 Mortal Kombat: Armageddon",
        "url": "https://mortalkombat.fandom.com/wiki/Mortal_Kombat:_Armageddon",
        "sourceType": "community-wiki",
        "verificationStatus": "verified"
      }
    ]
  },
  {
    "id": "mk-mythologies-1997",
    "title": "Mortal Kombat Mythologies: Sub-Zero",
    "shortTitle": "MK Mythologies: Sub-Zero",
    "releaseYear": 1997,
    "platforms": [
      "PlayStation",
      "Nintendo 64"
    ],
    "developer": "Midway Games",
    "publisher": "Midway Games",
    "gameType": "Fighting (2D/3D)",
    "era": "Spin-off",
    "summary": "Side-scrolling action-adventure prequel following Bi-Han retrieving Shinnok's sacred amulet across Earthrealm and the Netherrealm.",
    "timeline": {
      "id": "original",
      "type": "timeline",
      "name": "Timeline Original"
    },
    "characters": [
      {
        "id": "scorpion",
        "type": "character",
        "name": "Scorpion"
      },
      {
        "id": "subzero",
        "type": "character",
        "name": "Sub-Zero"
      }
    ],
    "baseRoster": [
      {
        "id": "scorpion",
        "type": "character",
        "name": "Scorpion"
      },
      {
        "id": "subzero",
        "type": "character",
        "name": "Sub-Zero"
      }
    ],
    "image": {
      "assetId": "asset-mk-mythologies-1997-cover",
      "assetURL": "/images/games/mk-mythologies-1997.png",
      "assetType": "game_cover",
      "gameId": "mk-mythologies-1997",
      "rightsStatus": "approved",
      "attribution": "Mortal Kombat \u00a9 Warner Bros. Games / Midway / NetherRealm Studios",
      "alt": "Sampul resmi Mortal Kombat Mythologies: Sub-Zero"
    },
    "sources": [
      {
        "id": "fandom-mk-mythologies-1997",
        "title": "Mortal Kombat Wiki \u2014 Mortal Kombat Mythologies: Sub-Zero",
        "url": "https://mortalkombat.fandom.com/wiki/Mortal_Kombat_Mythologies:_Sub-Zero",
        "sourceType": "community-wiki",
        "verificationStatus": "verified"
      }
    ]
  },
  {
    "id": "mk-special-forces-2000",
    "title": "Mortal Kombat: Special Forces",
    "shortTitle": "MK: Special Forces",
    "releaseYear": 2000,
    "platforms": [
      "PlayStation"
    ],
    "developer": "Midway Games",
    "publisher": "Midway Games",
    "gameType": "Fighting (2D/3D)",
    "era": "Spin-off",
    "summary": "Third-person action spin-off chronicling Major Jackson 'Jax' Briggs pursuing Kano and the Black Dragon syndicate across urban strongholds.",
    "timeline": {
      "id": "original",
      "type": "timeline",
      "name": "Timeline Original"
    },
    "characters": [
      {
        "id": "scorpion",
        "type": "character",
        "name": "Scorpion"
      },
      {
        "id": "subzero",
        "type": "character",
        "name": "Sub-Zero"
      }
    ],
    "baseRoster": [
      {
        "id": "scorpion",
        "type": "character",
        "name": "Scorpion"
      },
      {
        "id": "subzero",
        "type": "character",
        "name": "Sub-Zero"
      }
    ],
    "image": {
      "assetId": "asset-mk-special-forces-2000-cover",
      "assetURL": "/images/games/mk-special-forces-2000.png",
      "assetType": "game_cover",
      "gameId": "mk-special-forces-2000",
      "rightsStatus": "approved",
      "attribution": "Mortal Kombat \u00a9 Warner Bros. Games / Midway / NetherRealm Studios",
      "alt": "Sampul resmi Mortal Kombat: Special Forces"
    },
    "sources": [
      {
        "id": "fandom-mk-special-forces-2000",
        "title": "Mortal Kombat Wiki \u2014 Mortal Kombat: Special Forces",
        "url": "https://mortalkombat.fandom.com/wiki/Mortal_Kombat:_Special_Forces",
        "sourceType": "community-wiki",
        "verificationStatus": "verified"
      }
    ]
  },
  {
    "id": "mk-shaolin-monks-2005",
    "title": "Mortal Kombat: Shaolin Monks",
    "shortTitle": "MK: Shaolin Monks",
    "releaseYear": 2005,
    "platforms": [
      "PlayStation 2",
      "Xbox"
    ],
    "developer": "Midway Games",
    "publisher": "Midway Games",
    "gameType": "Fighting (2D/3D)",
    "era": "Spin-off",
    "summary": "Co-op beat-'em-up action adventure following Liu Kang and Kung Lao through the demonic hazards of Outworld during the MKII tournament.",
    "timeline": {
      "id": "original",
      "type": "timeline",
      "name": "Timeline Original"
    },
    "characters": [
      {
        "id": "scorpion",
        "type": "character",
        "name": "Scorpion"
      },
      {
        "id": "subzero",
        "type": "character",
        "name": "Sub-Zero"
      }
    ],
    "baseRoster": [
      {
        "id": "scorpion",
        "type": "character",
        "name": "Scorpion"
      },
      {
        "id": "subzero",
        "type": "character",
        "name": "Sub-Zero"
      }
    ],
    "image": {
      "assetId": "asset-mk-shaolin-monks-2005-cover",
      "assetURL": "/images/games/mk-shaolin-monks-2005.png",
      "assetType": "game_cover",
      "gameId": "mk-shaolin-monks-2005",
      "rightsStatus": "approved",
      "attribution": "Mortal Kombat \u00a9 Warner Bros. Games / Midway / NetherRealm Studios",
      "alt": "Sampul resmi Mortal Kombat: Shaolin Monks"
    },
    "sources": [
      {
        "id": "fandom-mk-shaolin-monks-2005",
        "title": "Mortal Kombat Wiki \u2014 Mortal Kombat: Shaolin Monks",
        "url": "https://mortalkombat.fandom.com/wiki/Mortal_Kombat:_Shaolin_Monks",
        "sourceType": "community-wiki",
        "verificationStatus": "verified"
      }
    ]
  },
  {
    "id": "mk-vs-dc-2008",
    "title": "Mortal Kombat vs. DC Universe",
    "shortTitle": "MK vs. DC Universe",
    "releaseYear": 2008,
    "platforms": [
      "PlayStation 3",
      "Xbox 360"
    ],
    "developer": "Midway Games",
    "publisher": "Midway Games",
    "gameType": "Fighting (2D/3D)",
    "era": "Spin-off",
    "summary": "Standalone crossover fighting game where cataclysmic world-merger pits Kombatants against DC Comics superheroes and villains.",
    "timeline": {
      "id": "original",
      "type": "timeline",
      "name": "Timeline Original"
    },
    "characters": [
      {
        "id": "scorpion",
        "type": "character",
        "name": "Scorpion"
      },
      {
        "id": "subzero",
        "type": "character",
        "name": "Sub-Zero"
      }
    ],
    "baseRoster": [
      {
        "id": "scorpion",
        "type": "character",
        "name": "Scorpion"
      },
      {
        "id": "subzero",
        "type": "character",
        "name": "Sub-Zero"
      }
    ],
    "image": {
      "assetId": "asset-mk-vs-dc-2008-cover",
      "assetURL": "/images/games/mk-vs-dc-2008.png",
      "assetType": "game_cover",
      "gameId": "mk-vs-dc-2008",
      "rightsStatus": "approved",
      "attribution": "Mortal Kombat \u00a9 Warner Bros. Games / Midway / NetherRealm Studios",
      "alt": "Sampul resmi Mortal Kombat vs. DC Universe"
    },
    "sources": [
      {
        "id": "fandom-mk-vs-dc-2008",
        "title": "Mortal Kombat Wiki \u2014 Mortal Kombat vs. DC Universe",
        "url": "https://mortalkombat.fandom.com/wiki/Mortal_Kombat_vs._DC_Universe",
        "sourceType": "community-wiki",
        "verificationStatus": "verified"
      }
    ]
  },
  {
    "id": "mk-arcade-kollection-2011",
    "title": "Mortal Kombat Arcade Kollection",
    "shortTitle": "MK Arcade Kollection",
    "releaseYear": 2011,
    "platforms": [
      "PlayStation 3",
      "Xbox 360",
      "PC"
    ],
    "developer": "NetherRealm Studios",
    "publisher": "Warner Bros. Games",
    "gameType": "Fighting (2D/3D)",
    "era": "Spin-off",
    "summary": "Standalone arcade anthology package uniting pristine arcade emulations of MK1, MK2, and Ultimate Mortal Kombat 3 with online matchmaking.",
    "timeline": {
      "id": "original",
      "type": "timeline",
      "name": "Timeline Original"
    },
    "characters": [
      {
        "id": "scorpion",
        "type": "character",
        "name": "Scorpion"
      },
      {
        "id": "subzero",
        "type": "character",
        "name": "Sub-Zero"
      }
    ],
    "baseRoster": [
      {
        "id": "scorpion",
        "type": "character",
        "name": "Scorpion"
      },
      {
        "id": "subzero",
        "type": "character",
        "name": "Sub-Zero"
      }
    ],
    "image": {
      "assetId": "asset-mk-arcade-kollection-2011-cover",
      "assetURL": "/images/games/mk-arcade-kollection-2011.png",
      "assetType": "game_cover",
      "gameId": "mk-arcade-kollection-2011",
      "rightsStatus": "approved",
      "attribution": "Mortal Kombat \u00a9 Warner Bros. Games / Midway / NetherRealm Studios",
      "alt": "Sampul resmi Mortal Kombat Arcade Kollection"
    },
    "sources": [
      {
        "id": "fandom-mk-arcade-kollection-2011",
        "title": "Mortal Kombat Wiki \u2014 Mortal Kombat Arcade Kollection",
        "url": "https://mortalkombat.fandom.com/wiki/Mortal_Kombat_Arcade_Kollection",
        "sourceType": "community-wiki",
        "verificationStatus": "verified"
      }
    ]
  },
  {
    "id": "mk9-2011",
    "title": "Mortal Kombat (2011)",
    "shortTitle": "MK (2011)",
    "releaseYear": 2011,
    "platforms": [
      "PlayStation 3",
      "Xbox 360",
      "PC"
    ],
    "developer": "NetherRealm Studios",
    "publisher": "Warner Bros. Games",
    "gameType": "Fighting (2D/3D)",
    "era": "Classic Era",
    "summary": "Timeline reset orchestrated by Raiden rewinding the events of MK1 through MK3, introducing the super meter and cinematic Story Mode.",
    "timeline": {
      "id": "original",
      "type": "timeline",
      "name": "Timeline Original"
    },
    "characters": [
      {
        "id": "scorpion",
        "type": "character",
        "name": "Scorpion"
      },
      {
        "id": "subzero",
        "type": "character",
        "name": "Sub-Zero"
      }
    ],
    "baseRoster": [
      {
        "id": "scorpion",
        "type": "character",
        "name": "Scorpion"
      },
      {
        "id": "subzero",
        "type": "character",
        "name": "Sub-Zero"
      }
    ],
    "image": {
      "assetId": "asset-mk9-2011-cover",
      "assetURL": "/images/games/mk9-2011.png",
      "assetType": "game_cover",
      "gameId": "mk9-2011",
      "rightsStatus": "approved",
      "attribution": "Mortal Kombat \u00a9 Warner Bros. Games / Midway / NetherRealm Studios",
      "alt": "Sampul resmi Mortal Kombat (2011)"
    },
    "sources": [
      {
        "id": "fandom-mk9-2011",
        "title": "Mortal Kombat Wiki \u2014 Mortal Kombat (2011)",
        "url": "https://mortalkombat.fandom.com/wiki/Mortal_Kombat_(2011_video_game)",
        "sourceType": "community-wiki",
        "verificationStatus": "verified"
      }
    ]
  },
  {
    "id": "mkx-2015",
    "title": "Mortal Kombat X",
    "shortTitle": "MK X",
    "releaseYear": 2015,
    "platforms": [
      "PlayStation 4",
      "Xbox One",
      "PC"
    ],
    "developer": "NetherRealm Studios",
    "publisher": "Warner Bros. Games",
    "gameType": "Fighting (2D/3D)",
    "era": "Classic Era",
    "summary": "Set 25 years after MK9, introducing three distinct character combat variations and the next generation of Earthrealm Kombatants.",
    "timeline": {
      "id": "original",
      "type": "timeline",
      "name": "Timeline Original"
    },
    "characters": [
      {
        "id": "scorpion",
        "type": "character",
        "name": "Scorpion"
      },
      {
        "id": "subzero",
        "type": "character",
        "name": "Sub-Zero"
      }
    ],
    "baseRoster": [
      {
        "id": "scorpion",
        "type": "character",
        "name": "Scorpion"
      },
      {
        "id": "subzero",
        "type": "character",
        "name": "Sub-Zero"
      }
    ],
    "image": {
      "assetId": "asset-mkx-2015-cover",
      "assetURL": "/images/games/mkx-2015.png",
      "assetType": "game_cover",
      "gameId": "mkx-2015",
      "rightsStatus": "approved",
      "attribution": "Mortal Kombat \u00a9 Warner Bros. Games / Midway / NetherRealm Studios",
      "alt": "Sampul resmi Mortal Kombat X"
    },
    "sources": [
      {
        "id": "fandom-mkx-2015",
        "title": "Mortal Kombat Wiki \u2014 Mortal Kombat X",
        "url": "https://mortalkombat.fandom.com/wiki/Mortal_Kombat_X",
        "sourceType": "community-wiki",
        "verificationStatus": "verified"
      }
    ]
  },
  {
    "id": "mk-mobile-2015",
    "title": "Mortal Kombat Mobile",
    "shortTitle": "MK Mobile",
    "releaseYear": 2015,
    "platforms": [
      "iOS",
      "Android"
    ],
    "developer": "NetherRealm Studios",
    "publisher": "Warner Bros. Games",
    "gameType": "Fighting (2D/3D)",
    "era": "Classic Era",
    "summary": "Standalone free-to-play mobile collectible card fighter and battle team game with touch-based gestures and persistent cross-game events.",
    "timeline": {
      "id": "original",
      "type": "timeline",
      "name": "Timeline Original"
    },
    "characters": [
      {
        "id": "scorpion",
        "type": "character",
        "name": "Scorpion"
      },
      {
        "id": "subzero",
        "type": "character",
        "name": "Sub-Zero"
      }
    ],
    "baseRoster": [
      {
        "id": "scorpion",
        "type": "character",
        "name": "Scorpion"
      },
      {
        "id": "subzero",
        "type": "character",
        "name": "Sub-Zero"
      }
    ],
    "image": {
      "assetId": "asset-mk-mobile-2015-cover",
      "assetURL": "/images/games/mk-mobile-2015.png",
      "assetType": "game_cover",
      "gameId": "mk-mobile-2015",
      "rightsStatus": "approved",
      "attribution": "Mortal Kombat \u00a9 Warner Bros. Games / Midway / NetherRealm Studios",
      "alt": "Sampul resmi Mortal Kombat Mobile"
    },
    "sources": [
      {
        "id": "fandom-mk-mobile-2015",
        "title": "Mortal Kombat Wiki \u2014 Mortal Kombat Mobile",
        "url": "https://mortalkombat.fandom.com/wiki/Mortal_Kombat_Mobile",
        "sourceType": "community-wiki",
        "verificationStatus": "verified"
      }
    ]
  },
  {
    "id": "mk11-2019",
    "title": "Mortal Kombat 11",
    "shortTitle": "MK 11",
    "releaseYear": 2019,
    "platforms": [
      "PlayStation 4",
      "Xbox One",
      "Nintendo Switch",
      "PC"
    ],
    "developer": "NetherRealm Studios",
    "publisher": "Warner Bros. Games",
    "gameType": "Fighting (2D/3D)",
    "era": "Classic Era",
    "summary": "Time-bending conflict against Keeper of Time Kronika, introducing Krushing Blows, Fatal Blows, and deep cosmetic gear customization.",
    "timeline": {
      "id": "original",
      "type": "timeline",
      "name": "Timeline Original"
    },
    "characters": [
      {
        "id": "scorpion",
        "type": "character",
        "name": "Scorpion"
      },
      {
        "id": "subzero",
        "type": "character",
        "name": "Sub-Zero"
      }
    ],
    "baseRoster": [
      {
        "id": "scorpion",
        "type": "character",
        "name": "Scorpion"
      },
      {
        "id": "subzero",
        "type": "character",
        "name": "Sub-Zero"
      }
    ],
    "image": {
      "assetId": "asset-mk11-2019-cover",
      "assetURL": "/images/games/mk11-2019.png",
      "assetType": "game_cover",
      "gameId": "mk11-2019",
      "rightsStatus": "approved",
      "attribution": "Mortal Kombat \u00a9 Warner Bros. Games / Midway / NetherRealm Studios",
      "alt": "Sampul resmi Mortal Kombat 11"
    },
    "sources": [
      {
        "id": "fandom-mk11-2019",
        "title": "Mortal Kombat Wiki \u2014 Mortal Kombat 11",
        "url": "https://mortalkombat.fandom.com/wiki/Mortal_Kombat_11",
        "sourceType": "community-wiki",
        "verificationStatus": "verified"
      }
    ]
  },
  {
    "id": "mk1-2023",
    "title": "Mortal Kombat 1 (2023)",
    "shortTitle": "MK 1 (2023)",
    "releaseYear": 2023,
    "platforms": [
      "PlayStation 5",
      "Xbox Series X/S",
      "Nintendo Switch",
      "PC"
    ],
    "developer": "NetherRealm Studios",
    "publisher": "Warner Bros. Games",
    "gameType": "Fighting (2D/3D)",
    "era": "New Era",
    "summary": "A reborn Mortal Kombat universe crafted by Fire God Liu Kang featuring reimagined character origins and Kameo Fighter assist combat.",
    "timeline": {
      "id": "original",
      "type": "timeline",
      "name": "Timeline Original"
    },
    "characters": [
      {
        "id": "scorpion",
        "type": "character",
        "name": "Scorpion"
      },
      {
        "id": "subzero",
        "type": "character",
        "name": "Sub-Zero"
      }
    ],
    "baseRoster": [
      {
        "id": "scorpion",
        "type": "character",
        "name": "Scorpion"
      },
      {
        "id": "subzero",
        "type": "character",
        "name": "Sub-Zero"
      }
    ],
    "image": {
      "assetId": "asset-mk1-2023-cover",
      "assetURL": "/images/games/mk1-2023.png",
      "assetType": "game_cover",
      "gameId": "mk1-2023",
      "rightsStatus": "approved",
      "attribution": "Mortal Kombat \u00a9 Warner Bros. Games / Midway / NetherRealm Studios",
      "alt": "Sampul resmi Mortal Kombat 1 (2023)"
    },
    "sources": [
      {
        "id": "fandom-mk1-2023",
        "title": "Mortal Kombat Wiki \u2014 Mortal Kombat 1 (2023)",
        "url": "https://www.mortalkombat.com/en-us",
        "sourceType": "community-wiki",
        "verificationStatus": "verified"
      }
    ]
  },
  {
    "id": "mk-onslaught-2023",
    "title": "Mortal Kombat: Onslaught",
    "shortTitle": "MK: Onslaught",
    "releaseYear": 2023,
    "platforms": [
      "iOS",
      "Android"
    ],
    "developer": "NetherRealm Studios",
    "publisher": "Warner Bros. Games",
    "gameType": "Fighting (2D/3D)",
    "era": "New Era",
    "summary": "Standalone real-time strategic team RPG mobile release where players assemble strike squads of Kombatants across a brand-new cinematic campaign.",
    "timeline": {
      "id": "original",
      "type": "timeline",
      "name": "Timeline Original"
    },
    "characters": [
      {
        "id": "scorpion",
        "type": "character",
        "name": "Scorpion"
      },
      {
        "id": "subzero",
        "type": "character",
        "name": "Sub-Zero"
      }
    ],
    "baseRoster": [
      {
        "id": "scorpion",
        "type": "character",
        "name": "Scorpion"
      },
      {
        "id": "subzero",
        "type": "character",
        "name": "Sub-Zero"
      }
    ],
    "image": {
      "assetId": "asset-mk-onslaught-2023-cover",
      "assetURL": "/images/games/mk-onslaught-2023.png",
      "assetType": "game_cover",
      "gameId": "mk-onslaught-2023",
      "rightsStatus": "approved",
      "attribution": "Mortal Kombat \u00a9 Warner Bros. Games / Midway / NetherRealm Studios",
      "alt": "Sampul resmi Mortal Kombat: Onslaught"
    },
    "sources": [
      {
        "id": "fandom-mk-onslaught-2023",
        "title": "Mortal Kombat Wiki \u2014 Mortal Kombat: Onslaught",
        "url": "https://mortalkombat.fandom.com/wiki/Mortal_Kombat:_Onslaught",
        "sourceType": "community-wiki",
        "verificationStatus": "verified"
      }
    ]
  }
];

export const abilities: Ability[] = [
  {
    "id": "hellfire",
    "name": "Hellfire Manipulation",
    "category": "special-move",
    "element": null,
    "description": "Summoning and projecting demonic fire from the Netherrealm.",
    "characters": [
      {
        "id": "scorpion",
        "type": "character",
        "name": "Scorpion"
      }
    ],
    "games": [
      {
        "id": "mk-1992",
        "type": "game",
        "name": "Mortal Kombat (1992)"
      }
    ],
    "sources": [
      {
        "id": "fandom-hellfire",
        "title": "Mortal Kombat Wiki \u2014 Hellfire Manipulation",
        "url": "https://mortalkombat.fandom.com",
        "sourceType": "community-wiki",
        "verificationStatus": "verified"
      }
    ]
  },
  {
    "id": "flame-aura",
    "name": "Flame Aura",
    "category": "special-move",
    "element": null,
    "description": "Surrounding the body in intense heat that incinerates nearby foes.",
    "characters": [
      {
        "id": "scorpion",
        "type": "character",
        "name": "Scorpion"
      }
    ],
    "games": [
      {
        "id": "mk-1992",
        "type": "game",
        "name": "Mortal Kombat (1992)"
      }
    ],
    "sources": [
      {
        "id": "fandom-flame-aura",
        "title": "Mortal Kombat Wiki \u2014 Flame Aura",
        "url": "https://mortalkombat.fandom.com",
        "sourceType": "community-wiki",
        "verificationStatus": "verified"
      }
    ]
  },
  {
    "id": "fireball-dragon",
    "name": "Dragon Fireball",
    "category": "special-move",
    "element": null,
    "description": "Concentrated chi energy manifested as a searing dragon of flame.",
    "characters": [
      {
        "id": "scorpion",
        "type": "character",
        "name": "Scorpion"
      }
    ],
    "games": [
      {
        "id": "mk-1992",
        "type": "game",
        "name": "Mortal Kombat (1992)"
      }
    ],
    "sources": [
      {
        "id": "fandom-fireball-dragon",
        "title": "Mortal Kombat Wiki \u2014 Dragon Fireball",
        "url": "https://mortalkombat.fandom.com",
        "sourceType": "community-wiki",
        "verificationStatus": "verified"
      }
    ]
  },
  {
    "id": "cryomancy",
    "name": "Cryomancy",
    "category": "special-move",
    "element": null,
    "description": "Instant freezing of atmospheric moisture into ice shields, spikes, and weaponry.",
    "characters": [
      {
        "id": "scorpion",
        "type": "character",
        "name": "Scorpion"
      }
    ],
    "games": [
      {
        "id": "mk-1992",
        "type": "game",
        "name": "Mortal Kombat (1992)"
      }
    ],
    "sources": [
      {
        "id": "fandom-cryomancy",
        "title": "Mortal Kombat Wiki \u2014 Cryomancy",
        "url": "https://mortalkombat.fandom.com",
        "sourceType": "community-wiki",
        "verificationStatus": "verified"
      }
    ]
  },
  {
    "id": "ice-slide",
    "name": "Ice Slide",
    "category": "special-move",
    "element": null,
    "description": "Coating the ground with ice to slide swiftly beneath enemy defenses.",
    "characters": [
      {
        "id": "scorpion",
        "type": "character",
        "name": "Scorpion"
      }
    ],
    "games": [
      {
        "id": "mk-1992",
        "type": "game",
        "name": "Mortal Kombat (1992)"
      }
    ],
    "sources": [
      {
        "id": "fandom-ice-slide",
        "title": "Mortal Kombat Wiki \u2014 Ice Slide",
        "url": "https://mortalkombat.fandom.com",
        "sourceType": "community-wiki",
        "verificationStatus": "verified"
      }
    ]
  },
  {
    "id": "ice-clone",
    "name": "Ice Clone",
    "category": "special-move",
    "element": null,
    "description": "Leaving behind a flash-frozen decoy that freezes whoever touches it.",
    "characters": [
      {
        "id": "scorpion",
        "type": "character",
        "name": "Scorpion"
      }
    ],
    "games": [
      {
        "id": "mk-1992",
        "type": "game",
        "name": "Mortal Kombat (1992)"
      }
    ],
    "sources": [
      {
        "id": "fandom-ice-clone",
        "title": "Mortal Kombat Wiki \u2014 Ice Clone",
        "url": "https://mortalkombat.fandom.com",
        "sourceType": "community-wiki",
        "verificationStatus": "verified"
      }
    ]
  },
  {
    "id": "thunder-mastery",
    "name": "Thunder Mastery",
    "category": "special-move",
    "element": null,
    "description": "Summoning divine lightning bolts from storm clouds.",
    "characters": [
      {
        "id": "scorpion",
        "type": "character",
        "name": "Scorpion"
      }
    ],
    "games": [
      {
        "id": "mk-1992",
        "type": "game",
        "name": "Mortal Kombat (1992)"
      }
    ],
    "sources": [
      {
        "id": "fandom-thunder-mastery",
        "title": "Mortal Kombat Wiki \u2014 Thunder Mastery",
        "url": "https://mortalkombat.fandom.com",
        "sourceType": "community-wiki",
        "verificationStatus": "verified"
      }
    ]
  },
  {
    "id": "electric-fly",
    "name": "Electric Fly (Superman)",
    "category": "special-move",
    "element": null,
    "description": "Propelling oneself horizontally through the air enveloped in electrical power.",
    "characters": [
      {
        "id": "scorpion",
        "type": "character",
        "name": "Scorpion"
      }
    ],
    "games": [
      {
        "id": "mk-1992",
        "type": "game",
        "name": "Mortal Kombat (1992)"
      }
    ],
    "sources": [
      {
        "id": "fandom-electric-fly",
        "title": "Mortal Kombat Wiki \u2014 Electric Fly (Superman)",
        "url": "https://mortalkombat.fandom.com",
        "sourceType": "community-wiki",
        "verificationStatus": "verified"
      }
    ]
  },
  {
    "id": "teleportation",
    "name": "Dimensional Teleportation",
    "category": "special-move",
    "element": null,
    "description": "Instant spatial traversal across short or long combat distances.",
    "characters": [
      {
        "id": "scorpion",
        "type": "character",
        "name": "Scorpion"
      }
    ],
    "games": [
      {
        "id": "mk-1992",
        "type": "game",
        "name": "Mortal Kombat (1992)"
      }
    ],
    "sources": [
      {
        "id": "fandom-teleportation",
        "title": "Mortal Kombat Wiki \u2014 Dimensional Teleportation",
        "url": "https://mortalkombat.fandom.com",
        "sourceType": "community-wiki",
        "verificationStatus": "verified"
      }
    ]
  },
  {
    "id": "shadow-magic",
    "name": "Shadow Magic",
    "category": "special-move",
    "element": null,
    "description": "Summoning shadow wraiths, portals, and dark clones.",
    "characters": [
      {
        "id": "scorpion",
        "type": "character",
        "name": "Scorpion"
      }
    ],
    "games": [
      {
        "id": "mk-1992",
        "type": "game",
        "name": "Mortal Kombat (1992)"
      }
    ],
    "sources": [
      {
        "id": "fandom-shadow-magic",
        "title": "Mortal Kombat Wiki \u2014 Shadow Magic",
        "url": "https://mortalkombat.fandom.com",
        "sourceType": "community-wiki",
        "verificationStatus": "verified"
      }
    ]
  },
  {
    "id": "soul-stealing",
    "name": "Soul Steal",
    "category": "special-move",
    "element": null,
    "description": "Draining an opponent's soul to heal and assume their appearance and abilities.",
    "characters": [
      {
        "id": "scorpion",
        "type": "character",
        "name": "Scorpion"
      }
    ],
    "games": [
      {
        "id": "mk-1992",
        "type": "game",
        "name": "Mortal Kombat (1992)"
      }
    ],
    "sources": [
      {
        "id": "fandom-soul-stealing",
        "title": "Mortal Kombat Wiki \u2014 Soul Steal",
        "url": "https://mortalkombat.fandom.com",
        "sourceType": "community-wiki",
        "verificationStatus": "verified"
      }
    ]
  },
  {
    "id": "necromancy",
    "name": "Necromancy",
    "category": "special-move",
    "element": null,
    "description": "Reanimating the dead as loyal Netherrealm revenants.",
    "characters": [
      {
        "id": "scorpion",
        "type": "character",
        "name": "Scorpion"
      }
    ],
    "games": [
      {
        "id": "mk-1992",
        "type": "game",
        "name": "Mortal Kombat (1992)"
      }
    ],
    "sources": [
      {
        "id": "fandom-necromancy",
        "title": "Mortal Kombat Wiki \u2014 Necromancy",
        "url": "https://mortalkombat.fandom.com",
        "sourceType": "community-wiki",
        "verificationStatus": "verified"
      }
    ]
  },
  {
    "id": "move-spear",
    "name": "Kunai Spear (Get Over Here!)",
    "category": "special-move",
    "element": null,
    "description": "Hurling a rope or chain spear into the enemy and pulling them in with extreme force.",
    "characters": [
      {
        "id": "scorpion",
        "type": "character",
        "name": "Scorpion"
      }
    ],
    "games": [
      {
        "id": "mk-1992",
        "type": "game",
        "name": "Mortal Kombat (1992)"
      }
    ],
    "sources": [
      {
        "id": "fandom-move-spear",
        "title": "Mortal Kombat Wiki \u2014 Kunai Spear (Get Over Here!)",
        "url": "https://mortalkombat.fandom.com",
        "sourceType": "community-wiki",
        "verificationStatus": "verified"
      }
    ]
  },
  {
    "id": "move-ice-freeze",
    "name": "Deep Freeze",
    "category": "special-move",
    "element": null,
    "description": "Blasting a stream of liquid nitrogen vapor that freezes the target solid.",
    "characters": [
      {
        "id": "scorpion",
        "type": "character",
        "name": "Scorpion"
      }
    ],
    "games": [
      {
        "id": "mk-1992",
        "type": "game",
        "name": "Mortal Kombat (1992)"
      }
    ],
    "sources": [
      {
        "id": "fandom-move-ice-freeze",
        "title": "Mortal Kombat Wiki \u2014 Deep Freeze",
        "url": "https://mortalkombat.fandom.com",
        "sourceType": "community-wiki",
        "verificationStatus": "verified"
      }
    ]
  },
  {
    "id": "move-bicycle-kick",
    "name": "Bicycle Kick",
    "category": "special-move",
    "element": null,
    "description": "Defying gravity with rapid aerial bicycle kicks propelled by chi.",
    "characters": [
      {
        "id": "scorpion",
        "type": "character",
        "name": "Scorpion"
      }
    ],
    "games": [
      {
        "id": "mk-1992",
        "type": "game",
        "name": "Mortal Kombat (1992)"
      }
    ],
    "sources": [
      {
        "id": "fandom-move-bicycle-kick",
        "title": "Mortal Kombat Wiki \u2014 Bicycle Kick",
        "url": "https://mortalkombat.fandom.com",
        "sourceType": "community-wiki",
        "verificationStatus": "verified"
      }
    ]
  },
  {
    "id": "move-shadow-kick",
    "name": "Shadow Kick",
    "category": "special-move",
    "element": null,
    "description": "A dashing high-impact kick trailing green kinetic shadow energy.",
    "characters": [
      {
        "id": "scorpion",
        "type": "character",
        "name": "Scorpion"
      }
    ],
    "games": [
      {
        "id": "mk-1992",
        "type": "game",
        "name": "Mortal Kombat (1992)"
      }
    ],
    "sources": [
      {
        "id": "fandom-move-shadow-kick",
        "title": "Mortal Kombat Wiki \u2014 Shadow Kick",
        "url": "https://mortalkombat.fandom.com",
        "sourceType": "community-wiki",
        "verificationStatus": "verified"
      }
    ]
  },
  {
    "id": "move-hat-throw",
    "name": "Razor Rim Hat Toss",
    "category": "special-move",
    "element": null,
    "description": "Throwing a circular razor-rimmed hat with boomerang-like trajectory.",
    "characters": [
      {
        "id": "scorpion",
        "type": "character",
        "name": "Scorpion"
      }
    ],
    "games": [
      {
        "id": "mk-1992",
        "type": "game",
        "name": "Mortal Kombat (1992)"
      }
    ],
    "sources": [
      {
        "id": "fandom-move-hat-throw",
        "title": "Mortal Kombat Wiki \u2014 Razor Rim Hat Toss",
        "url": "https://mortalkombat.fandom.com",
        "sourceType": "community-wiki",
        "verificationStatus": "verified"
      }
    ]
  },
  {
    "id": "move-fan-lift",
    "name": "Fan Lift",
    "category": "special-move",
    "element": null,
    "description": "Waving bladed war fans to create an updraft that suspends opponents helplessly in mid-air.",
    "characters": [
      {
        "id": "scorpion",
        "type": "character",
        "name": "Scorpion"
      }
    ],
    "games": [
      {
        "id": "mk-1992",
        "type": "game",
        "name": "Mortal Kombat (1992)"
      }
    ],
    "sources": [
      {
        "id": "fandom-move-fan-lift",
        "title": "Mortal Kombat Wiki \u2014 Fan Lift",
        "url": "https://mortalkombat.fandom.com",
        "sourceType": "community-wiki",
        "verificationStatus": "verified"
      }
    ]
  },
  {
    "id": "move-ground-pound",
    "name": "Ground Pound",
    "category": "special-move",
    "element": null,
    "description": "Striking the ground with cybernetic arms to cause localized seismic shockwaves.",
    "characters": [
      {
        "id": "scorpion",
        "type": "character",
        "name": "Scorpion"
      }
    ],
    "games": [
      {
        "id": "mk-1992",
        "type": "game",
        "name": "Mortal Kombat (1992)"
      }
    ],
    "sources": [
      {
        "id": "fandom-move-ground-pound",
        "title": "Mortal Kombat Wiki \u2014 Ground Pound",
        "url": "https://mortalkombat.fandom.com",
        "sourceType": "community-wiki",
        "verificationStatus": "verified"
      }
    ]
  },
  {
    "id": "move-cannonball",
    "name": "Cannonball Roll",
    "category": "special-move",
    "element": null,
    "description": "Curling into a tightly wound ball and launching forward like a deadly sphere.",
    "characters": [
      {
        "id": "scorpion",
        "type": "character",
        "name": "Scorpion"
      }
    ],
    "games": [
      {
        "id": "mk-1992",
        "type": "game",
        "name": "Mortal Kombat (1992)"
      }
    ],
    "sources": [
      {
        "id": "fandom-move-cannonball",
        "title": "Mortal Kombat Wiki \u2014 Cannonball Roll",
        "url": "https://mortalkombat.fandom.com",
        "sourceType": "community-wiki",
        "verificationStatus": "verified"
      }
    ]
  },
  {
    "id": "move-wind-tornado",
    "name": "Wind Tornado Vortex",
    "category": "special-move",
    "element": null,
    "description": "Spinning into a cyclone that lifts and disorients nearby foes.",
    "characters": [
      {
        "id": "scorpion",
        "type": "character",
        "name": "Scorpion"
      }
    ],
    "games": [
      {
        "id": "mk-1992",
        "type": "game",
        "name": "Mortal Kombat (1992)"
      }
    ],
    "sources": [
      {
        "id": "fandom-move-wind-tornado",
        "title": "Mortal Kombat Wiki \u2014 Wind Tornado Vortex",
        "url": "https://mortalkombat.fandom.com",
        "sourceType": "community-wiki",
        "verificationStatus": "verified"
      }
    ]
  },
  {
    "id": "move-sonic-scream",
    "name": "Banshee Sonic Scream",
    "category": "special-move",
    "element": null,
    "description": "High-decibel vocal resonance that stuns and strips the flesh from targets.",
    "characters": [
      {
        "id": "scorpion",
        "type": "character",
        "name": "Scorpion"
      }
    ],
    "games": [
      {
        "id": "mk-1992",
        "type": "game",
        "name": "Mortal Kombat (1992)"
      }
    ],
    "sources": [
      {
        "id": "fandom-move-sonic-scream",
        "title": "Mortal Kombat Wiki \u2014 Banshee Sonic Scream",
        "url": "https://mortalkombat.fandom.com",
        "sourceType": "community-wiki",
        "verificationStatus": "verified"
      }
    ]
  },
  {
    "id": "move-shokan-stomp",
    "name": "Telestomp",
    "category": "special-move",
    "element": null,
    "description": "Leaping off-screen and crashing down with the immense weight of four arms.",
    "characters": [
      {
        "id": "scorpion",
        "type": "character",
        "name": "Scorpion"
      }
    ],
    "games": [
      {
        "id": "mk-1992",
        "type": "game",
        "name": "Mortal Kombat (1992)"
      }
    ],
    "sources": [
      {
        "id": "fandom-move-shokan-stomp",
        "title": "Mortal Kombat Wiki \u2014 Telestomp",
        "url": "https://mortalkombat.fandom.com",
        "sourceType": "community-wiki",
        "verificationStatus": "verified"
      }
    ]
  },
  {
    "id": "move-blood-tentacles",
    "name": "Blood Tentacles",
    "category": "special-move",
    "element": null,
    "description": "Conjuring whipping tendrils of coagulated blood to lash opponents.",
    "characters": [
      {
        "id": "scorpion",
        "type": "character",
        "name": "Scorpion"
      }
    ],
    "games": [
      {
        "id": "mk-1992",
        "type": "game",
        "name": "Mortal Kombat (1992)"
      }
    ],
    "sources": [
      {
        "id": "fandom-move-blood-tentacles",
        "title": "Mortal Kombat Wiki \u2014 Blood Tentacles",
        "url": "https://mortalkombat.fandom.com",
        "sourceType": "community-wiki",
        "verificationStatus": "verified"
      }
    ]
  },
  {
    "id": "move-acid-spit",
    "name": "Corrosive Acid Spit",
    "category": "special-move",
    "element": null,
    "description": "Ejecting caustic digestive acid that melts armor and flesh on contact.",
    "characters": [
      {
        "id": "scorpion",
        "type": "character",
        "name": "Scorpion"
      }
    ],
    "games": [
      {
        "id": "mk-1992",
        "type": "game",
        "name": "Mortal Kombat (1992)"
      }
    ],
    "sources": [
      {
        "id": "fandom-move-acid-spit",
        "title": "Mortal Kombat Wiki \u2014 Corrosive Acid Spit",
        "url": "https://mortalkombat.fandom.com",
        "sourceType": "community-wiki",
        "verificationStatus": "verified"
      }
    ]
  },
  {
    "id": "move-soul-ball",
    "name": "Green Soul Burst",
    "category": "special-move",
    "element": null,
    "description": "Harnessing stolen souls into an explosive sphere of spiritual energy.",
    "characters": [
      {
        "id": "scorpion",
        "type": "character",
        "name": "Scorpion"
      }
    ],
    "games": [
      {
        "id": "mk-1992",
        "type": "game",
        "name": "Mortal Kombat (1992)"
      }
    ],
    "sources": [
      {
        "id": "fandom-move-soul-ball",
        "title": "Mortal Kombat Wiki \u2014 Green Soul Burst",
        "url": "https://mortalkombat.fandom.com",
        "sourceType": "community-wiki",
        "verificationStatus": "verified"
      }
    ]
  },
  {
    "id": "move-telekinesis-slam",
    "name": "Telekinetic Slam",
    "category": "special-move",
    "element": null,
    "description": "Lifting enemies telepathically and slamming them forcefully against the arena floor.",
    "characters": [
      {
        "id": "scorpion",
        "type": "character",
        "name": "Scorpion"
      }
    ],
    "games": [
      {
        "id": "mk-1992",
        "type": "game",
        "name": "Mortal Kombat (1992)"
      }
    ],
    "sources": [
      {
        "id": "fandom-move-telekinesis-slam",
        "title": "Mortal Kombat Wiki \u2014 Telekinetic Slam",
        "url": "https://mortalkombat.fandom.com",
        "sourceType": "community-wiki",
        "verificationStatus": "verified"
      }
    ]
  },
  {
    "id": "move-tarkatan-chop",
    "name": "Blade Fury",
    "category": "special-move",
    "element": null,
    "description": "Rapid succession of vicious slashes from forearm arm blades.",
    "characters": [
      {
        "id": "scorpion",
        "type": "character",
        "name": "Scorpion"
      }
    ],
    "games": [
      {
        "id": "mk-1992",
        "type": "game",
        "name": "Mortal Kombat (1992)"
      }
    ],
    "sources": [
      {
        "id": "fandom-move-tarkatan-chop",
        "title": "Mortal Kombat Wiki \u2014 Blade Fury",
        "url": "https://mortalkombat.fandom.com",
        "sourceType": "community-wiki",
        "verificationStatus": "verified"
      }
    ]
  },
  {
    "id": "move-net-tangle",
    "name": "Energy Net",
    "category": "special-move",
    "element": null,
    "description": "Firing an electrified green plasma net that immobilizes targets.",
    "characters": [
      {
        "id": "scorpion",
        "type": "character",
        "name": "Scorpion"
      }
    ],
    "games": [
      {
        "id": "mk-1992",
        "type": "game",
        "name": "Mortal Kombat (1992)"
      }
    ],
    "sources": [
      {
        "id": "fandom-move-net-tangle",
        "title": "Mortal Kombat Wiki \u2014 Energy Net",
        "url": "https://mortalkombat.fandom.com",
        "sourceType": "community-wiki",
        "verificationStatus": "verified"
      }
    ]
  },
  {
    "id": "move-missile-salvo",
    "name": "Homing Missile",
    "category": "special-move",
    "element": null,
    "description": "Chest-mounted rocket targeting enemy coordinates with thermal tracking.",
    "characters": [
      {
        "id": "scorpion",
        "type": "character",
        "name": "Scorpion"
      }
    ],
    "games": [
      {
        "id": "mk-1992",
        "type": "game",
        "name": "Mortal Kombat (1992)"
      }
    ],
    "sources": [
      {
        "id": "fandom-move-missile-salvo",
        "title": "Mortal Kombat Wiki \u2014 Homing Missile",
        "url": "https://mortalkombat.fandom.com",
        "sourceType": "community-wiki",
        "verificationStatus": "verified"
      }
    ]
  },
  {
    "id": "move-sun-ray",
    "name": "Sun God's Ray",
    "category": "special-move",
    "element": null,
    "description": "Summoning a focused beam of sunlight that burns enemies while healing allies.",
    "characters": [
      {
        "id": "scorpion",
        "type": "character",
        "name": "Scorpion"
      }
    ],
    "games": [
      {
        "id": "mk-1992",
        "type": "game",
        "name": "Mortal Kombat (1992)"
      }
    ],
    "sources": [
      {
        "id": "fandom-move-sun-ray",
        "title": "Mortal Kombat Wiki \u2014 Sun God's Ray",
        "url": "https://mortalkombat.fandom.com",
        "sourceType": "community-wiki",
        "verificationStatus": "verified"
      }
    ]
  },
  {
    "id": "move-revolver-quickdraw",
    "name": "Sand Slam & Quickdraw",
    "category": "special-move",
    "element": null,
    "description": "Rapid six-shooter revolver barrage accompanied by blinding Netherrealm sand.",
    "characters": [
      {
        "id": "scorpion",
        "type": "character",
        "name": "Scorpion"
      }
    ],
    "games": [
      {
        "id": "mk-1992",
        "type": "game",
        "name": "Mortal Kombat (1992)"
      }
    ],
    "sources": [
      {
        "id": "fandom-move-revolver-quickdraw",
        "title": "Mortal Kombat Wiki \u2014 Sand Slam & Quickdraw",
        "url": "https://mortalkombat.fandom.com",
        "sourceType": "community-wiki",
        "verificationStatus": "verified"
      }
    ]
  },
  {
    "id": "move-drunken-fist",
    "name": "Drunken Fist Roll",
    "category": "special-move",
    "element": null,
    "description": "Unpredictable tumbling footwork baffling enemy guard.",
    "characters": [
      {
        "id": "scorpion",
        "type": "character",
        "name": "Scorpion"
      }
    ],
    "games": [
      {
        "id": "mk-1992",
        "type": "game",
        "name": "Mortal Kombat (1992)"
      }
    ],
    "sources": [
      {
        "id": "fandom-move-drunken-fist",
        "title": "Mortal Kombat Wiki \u2014 Drunken Fist Roll",
        "url": "https://mortalkombat.fandom.com",
        "sourceType": "community-wiki",
        "verificationStatus": "verified"
      }
    ]
  },
  {
    "id": "move-flying-kick",
    "name": "Flying Dragon Kick",
    "category": "special-move",
    "element": null,
    "description": "Liu Kang's signature horizontal flight across the screen backed by flaming chi.",
    "characters": [
      {
        "id": "scorpion",
        "type": "character",
        "name": "Scorpion"
      }
    ],
    "games": [
      {
        "id": "mk-1992",
        "type": "game",
        "name": "Mortal Kombat (1992)"
      }
    ],
    "sources": [
      {
        "id": "fandom-move-flying-kick",
        "title": "Mortal Kombat Wiki \u2014 Flying Dragon Kick",
        "url": "https://mortalkombat.fandom.com",
        "sourceType": "community-wiki",
        "verificationStatus": "verified"
      }
    ]
  },
  {
    "id": "move-square-wave",
    "name": "Square Wave Flight",
    "category": "special-move",
    "element": null,
    "description": "Mid-air dive propelled by acrobatic Edenian momentum.",
    "characters": [
      {
        "id": "scorpion",
        "type": "character",
        "name": "Scorpion"
      }
    ],
    "games": [
      {
        "id": "mk-1992",
        "type": "game",
        "name": "Mortal Kombat (1992)"
      }
    ],
    "sources": [
      {
        "id": "fandom-move-square-wave",
        "title": "Mortal Kombat Wiki \u2014 Square Wave Flight",
        "url": "https://mortalkombat.fandom.com",
        "sourceType": "community-wiki",
        "verificationStatus": "verified"
      }
    ]
  },
  {
    "id": "move-nut-punch",
    "name": "Nut Punch",
    "category": "special-move",
    "element": null,
    "description": "Splits on the ground delivering an unexpected disabling low strike.",
    "characters": [
      {
        "id": "scorpion",
        "type": "character",
        "name": "Scorpion"
      }
    ],
    "games": [
      {
        "id": "mk-1992",
        "type": "game",
        "name": "Mortal Kombat (1992)"
      }
    ],
    "sources": [
      {
        "id": "fandom-move-nut-punch",
        "title": "Mortal Kombat Wiki \u2014 Nut Punch",
        "url": "https://mortalkombat.fandom.com",
        "sourceType": "community-wiki",
        "verificationStatus": "verified"
      }
    ]
  },
  {
    "id": "move-ring-toss",
    "name": "Energy Ring Toss",
    "category": "special-move",
    "element": null,
    "description": "Wrist-blaster concentric sonic rings that slice through incoming projectiles.",
    "characters": [
      {
        "id": "scorpion",
        "type": "character",
        "name": "Scorpion"
      }
    ],
    "games": [
      {
        "id": "mk-1992",
        "type": "game",
        "name": "Mortal Kombat (1992)"
      }
    ],
    "sources": [
      {
        "id": "fandom-move-ring-toss",
        "title": "Mortal Kombat Wiki \u2014 Energy Ring Toss",
        "url": "https://mortalkombat.fandom.com",
        "sourceType": "community-wiki",
        "verificationStatus": "verified"
      }
    ]
  },
  {
    "id": "move-tele-flurry",
    "name": "Tele-Flurry",
    "category": "special-move",
    "element": null,
    "description": "Kenshi telepathically projects a warrior spirit to slash the opponent from afar.",
    "characters": [
      {
        "id": "scorpion",
        "type": "character",
        "name": "Scorpion"
      }
    ],
    "games": [
      {
        "id": "mk-1992",
        "type": "game",
        "name": "Mortal Kombat (1992)"
      }
    ],
    "sources": [
      {
        "id": "fandom-move-tele-flurry",
        "title": "Mortal Kombat Wiki \u2014 Tele-Flurry",
        "url": "https://mortalkombat.fandom.com",
        "sourceType": "community-wiki",
        "verificationStatus": "verified"
      }
    ]
  },
  {
    "id": "move-shadow-slide",
    "name": "Shadow Slide",
    "category": "special-move",
    "element": null,
    "description": "Noob Saibot dispatches his shadow clone sliding forward to trip the enemy.",
    "characters": [
      {
        "id": "scorpion",
        "type": "character",
        "name": "Scorpion"
      }
    ],
    "games": [
      {
        "id": "mk-1992",
        "type": "game",
        "name": "Mortal Kombat (1992)"
      }
    ],
    "sources": [
      {
        "id": "fandom-move-shadow-slide",
        "title": "Mortal Kombat Wiki \u2014 Shadow Slide",
        "url": "https://mortalkombat.fandom.com",
        "sourceType": "community-wiki",
        "verificationStatus": "verified"
      }
    ]
  },
  {
    "id": "move-air-throw",
    "name": "Aerial Combat Throw",
    "category": "special-move",
    "element": null,
    "description": "Jax grabs the opponent out of mid-air and violently slams them to the turf.",
    "characters": [
      {
        "id": "scorpion",
        "type": "character",
        "name": "Scorpion"
      }
    ],
    "games": [
      {
        "id": "mk-1992",
        "type": "game",
        "name": "Mortal Kombat (1992)"
      }
    ],
    "sources": [
      {
        "id": "fandom-move-air-throw",
        "title": "Mortal Kombat Wiki \u2014 Aerial Combat Throw",
        "url": "https://mortalkombat.fandom.com",
        "sourceType": "community-wiki",
        "verificationStatus": "verified"
      }
    ]
  },
  {
    "id": "move-wind-kick",
    "name": "Tornado Gale Kick",
    "category": "special-move",
    "element": null,
    "description": "Fujin spins horizontally on a cushion of wind, striking repeatedly.",
    "characters": [
      {
        "id": "scorpion",
        "type": "character",
        "name": "Scorpion"
      }
    ],
    "games": [
      {
        "id": "mk-1992",
        "type": "game",
        "name": "Mortal Kombat (1992)"
      }
    ],
    "sources": [
      {
        "id": "fandom-move-wind-kick",
        "title": "Mortal Kombat Wiki \u2014 Tornado Gale Kick",
        "url": "https://mortalkombat.fandom.com",
        "sourceType": "community-wiki",
        "verificationStatus": "verified"
      }
    ]
  },
  {
    "id": "move-cyber-trap",
    "name": "Cryo Floor Trap",
    "category": "special-move",
    "element": null,
    "description": "Frost releases a cryogenic ground mine that flash-freezes unobservant opponents.",
    "characters": [
      {
        "id": "scorpion",
        "type": "character",
        "name": "Scorpion"
      }
    ],
    "games": [
      {
        "id": "mk-1992",
        "type": "game",
        "name": "Mortal Kombat (1992)"
      }
    ],
    "sources": [
      {
        "id": "fandom-move-cyber-trap",
        "title": "Mortal Kombat Wiki \u2014 Cryo Floor Trap",
        "url": "https://mortalkombat.fandom.com",
        "sourceType": "community-wiki",
        "verificationStatus": "verified"
      }
    ]
  },
  {
    "id": "move-puke-puddle",
    "name": "Hazardous Fluid Puddle",
    "category": "special-move",
    "element": null,
    "description": "Bo' Rai Cho coats the arena floor causing approaching enemies to lose their balance.",
    "characters": [
      {
        "id": "scorpion",
        "type": "character",
        "name": "Scorpion"
      }
    ],
    "games": [
      {
        "id": "mk-1992",
        "type": "game",
        "name": "Mortal Kombat (1992)"
      }
    ],
    "sources": [
      {
        "id": "fandom-move-puke-puddle",
        "title": "Mortal Kombat Wiki \u2014 Hazardous Fluid Puddle",
        "url": "https://mortalkombat.fandom.com",
        "sourceType": "community-wiki",
        "verificationStatus": "verified"
      }
    ]
  },
  {
    "id": "move-energy-spark",
    "name": "Luminescent Spark Burst",
    "category": "special-move",
    "element": null,
    "description": "Li Mei unleashes purple festive chi sparks that juggle airborne targets.",
    "characters": [
      {
        "id": "scorpion",
        "type": "character",
        "name": "Scorpion"
      }
    ],
    "games": [
      {
        "id": "mk-1992",
        "type": "game",
        "name": "Mortal Kombat (1992)"
      }
    ],
    "sources": [
      {
        "id": "fandom-move-energy-spark",
        "title": "Mortal Kombat Wiki \u2014 Luminescent Spark Burst",
        "url": "https://mortalkombat.fandom.com",
        "sourceType": "community-wiki",
        "verificationStatus": "verified"
      }
    ]
  },
  {
    "id": "move-bone-twist",
    "name": "360 Torso Contortion",
    "category": "special-move",
    "element": null,
    "description": "Havik twists his own torso a full 360 degrees to strike backward unpredictably.",
    "characters": [
      {
        "id": "scorpion",
        "type": "character",
        "name": "Scorpion"
      }
    ],
    "games": [
      {
        "id": "mk-1992",
        "type": "game",
        "name": "Mortal Kombat (1992)"
      }
    ],
    "sources": [
      {
        "id": "fandom-move-bone-twist",
        "title": "Mortal Kombat Wiki \u2014 360 Torso Contortion",
        "url": "https://mortalkombat.fandom.com",
        "sourceType": "community-wiki",
        "verificationStatus": "verified"
      }
    ]
  },
  {
    "id": "move-blazing-nitro-kick",
    "name": "Blazing Nitro Kick",
    "category": "special-move",
    "element": null,
    "description": "Jade surrounds herself in an emerald glow, sliding or flying across the arena with a devastating strike.",
    "characters": [
      {
        "id": "scorpion",
        "type": "character",
        "name": "Scorpion"
      }
    ],
    "games": [
      {
        "id": "mk-1992",
        "type": "game",
        "name": "Mortal Kombat (1992)"
      }
    ],
    "sources": [
      {
        "id": "fandom-move-blazing-nitro-kick",
        "title": "Mortal Kombat Wiki \u2014 Blazing Nitro Kick",
        "url": "https://mortalkombat.fandom.com",
        "sourceType": "community-wiki",
        "verificationStatus": "verified"
      }
    ]
  },
  {
    "id": "move-tribomerang",
    "name": "Tribomerang Throw",
    "category": "special-move",
    "element": null,
    "description": "Jade hurls a glowing three-pointed boomerang that can be curved upward or downward.",
    "characters": [
      {
        "id": "scorpion",
        "type": "character",
        "name": "Scorpion"
      }
    ],
    "games": [
      {
        "id": "mk-1992",
        "type": "game",
        "name": "Mortal Kombat (1992)"
      }
    ],
    "sources": [
      {
        "id": "fandom-move-tribomerang",
        "title": "Mortal Kombat Wiki \u2014 Tribomerang Throw",
        "url": "https://mortalkombat.fandom.com",
        "sourceType": "community-wiki",
        "verificationStatus": "verified"
      }
    ]
  },
  {
    "id": "move-nomad-dash",
    "name": "Nomad Dash",
    "category": "special-move",
    "element": null,
    "description": "Kabal dashes past the opponent at supersonic speed, leaving them spinning helplessly like a top.",
    "characters": [
      {
        "id": "scorpion",
        "type": "character",
        "name": "Scorpion"
      }
    ],
    "games": [
      {
        "id": "mk-1992",
        "type": "game",
        "name": "Mortal Kombat (1992)"
      }
    ],
    "sources": [
      {
        "id": "fandom-move-nomad-dash",
        "title": "Mortal Kombat Wiki \u2014 Nomad Dash",
        "url": "https://mortalkombat.fandom.com",
        "sourceType": "community-wiki",
        "verificationStatus": "verified"
      }
    ]
  },
  {
    "id": "move-buzzsaw",
    "name": "Buzzsaw Roll",
    "category": "special-move",
    "element": null,
    "description": "Kabal sends a spinning serrated buzzsaw along the ground to cut opponents at ankle level.",
    "characters": [
      {
        "id": "scorpion",
        "type": "character",
        "name": "Scorpion"
      }
    ],
    "games": [
      {
        "id": "mk-1992",
        "type": "game",
        "name": "Mortal Kombat (1992)"
      }
    ],
    "sources": [
      {
        "id": "fandom-move-buzzsaw",
        "title": "Mortal Kombat Wiki \u2014 Buzzsaw Roll",
        "url": "https://mortalkombat.fandom.com",
        "sourceType": "community-wiki",
        "verificationStatus": "verified"
      }
    ]
  },
  {
    "id": "move-baton-trip",
    "name": "Baton Sweep & Toss",
    "category": "special-move",
    "element": null,
    "description": "Kurtis Stryker hooks the enemy's legs with his police baton and slams them onto their back.",
    "characters": [
      {
        "id": "scorpion",
        "type": "character",
        "name": "Scorpion"
      }
    ],
    "games": [
      {
        "id": "mk-1992",
        "type": "game",
        "name": "Mortal Kombat (1992)"
      }
    ],
    "sources": [
      {
        "id": "fandom-move-baton-trip",
        "title": "Mortal Kombat Wiki \u2014 Baton Sweep & Toss",
        "url": "https://mortalkombat.fandom.com",
        "sourceType": "community-wiki",
        "verificationStatus": "verified"
      }
    ]
  },
  {
    "id": "move-grenade-toss",
    "name": "High/Low Grenade Toss",
    "category": "special-move",
    "element": null,
    "description": "Stryker launches tactical concussion grenades in high or low arcs.",
    "characters": [
      {
        "id": "scorpion",
        "type": "character",
        "name": "Scorpion"
      }
    ],
    "games": [
      {
        "id": "mk-1992",
        "type": "game",
        "name": "Mortal Kombat (1992)"
      }
    ],
    "sources": [
      {
        "id": "fandom-move-grenade-toss",
        "title": "Mortal Kombat Wiki \u2014 High/Low Grenade Toss",
        "url": "https://mortalkombat.fandom.com",
        "sourceType": "community-wiki",
        "verificationStatus": "verified"
      }
    ]
  },
  {
    "id": "move-teleport-stomp",
    "name": "Shokan Drop Stomp",
    "category": "special-move",
    "element": null,
    "description": "Sheeva leaps high into the sky and stomps violently downward onto her opponent.",
    "characters": [
      {
        "id": "scorpion",
        "type": "character",
        "name": "Scorpion"
      }
    ],
    "games": [
      {
        "id": "mk-1992",
        "type": "game",
        "name": "Mortal Kombat (1992)"
      }
    ],
    "sources": [
      {
        "id": "fandom-move-teleport-stomp",
        "title": "Mortal Kombat Wiki \u2014 Shokan Drop Stomp",
        "url": "https://mortalkombat.fandom.com",
        "sourceType": "community-wiki",
        "verificationStatus": "verified"
      }
    ]
  },
  {
    "id": "move-untranslatable-rage",
    "name": "Untranslatable Rage",
    "category": "special-move",
    "element": null,
    "description": "Sheeva grabs the opponent with all four arms, delivering thunderous headbutts and ground smashes.",
    "characters": [
      {
        "id": "scorpion",
        "type": "character",
        "name": "Scorpion"
      }
    ],
    "games": [
      {
        "id": "mk-1992",
        "type": "game",
        "name": "Mortal Kombat (1992)"
      }
    ],
    "sources": [
      {
        "id": "fandom-move-untranslatable-rage",
        "title": "Mortal Kombat Wiki \u2014 Untranslatable Rage",
        "url": "https://mortalkombat.fandom.com",
        "sourceType": "community-wiki",
        "verificationStatus": "verified"
      }
    ]
  },
  {
    "id": "move-spirit-arrow",
    "name": "Spirit Arrow",
    "category": "special-move",
    "element": null,
    "description": "Nightwolf draws a bow made of spiritual green light, firing piercing mystic arrows.",
    "characters": [
      {
        "id": "scorpion",
        "type": "character",
        "name": "Scorpion"
      }
    ],
    "games": [
      {
        "id": "mk-1992",
        "type": "game",
        "name": "Mortal Kombat (1992)"
      }
    ],
    "sources": [
      {
        "id": "fandom-move-spirit-arrow",
        "title": "Mortal Kombat Wiki \u2014 Spirit Arrow",
        "url": "https://mortalkombat.fandom.com",
        "sourceType": "community-wiki",
        "verificationStatus": "verified"
      }
    ]
  },
  {
    "id": "move-rhino-charge",
    "name": "Rhino Charge",
    "category": "special-move",
    "element": null,
    "description": "Nightwolf charges forward enveloped in a mystical green aura, bowling over the target.",
    "characters": [
      {
        "id": "scorpion",
        "type": "character",
        "name": "Scorpion"
      }
    ],
    "games": [
      {
        "id": "mk-1992",
        "type": "game",
        "name": "Mortal Kombat (1992)"
      }
    ],
    "sources": [
      {
        "id": "fandom-move-rhino-charge",
        "title": "Mortal Kombat Wiki \u2014 Rhino Charge",
        "url": "https://mortalkombat.fandom.com",
        "sourceType": "community-wiki",
        "verificationStatus": "verified"
      }
    ]
  },
  {
    "id": "move-banshee-scream",
    "name": "Levitating Banshee Scream",
    "category": "special-move",
    "element": null,
    "description": "Sindel levitates and releases sonic shriek waves that paralyze the opponent's nervous system.",
    "characters": [
      {
        "id": "scorpion",
        "type": "character",
        "name": "Scorpion"
      }
    ],
    "games": [
      {
        "id": "mk-1992",
        "type": "game",
        "name": "Mortal Kombat (1992)"
      }
    ],
    "sources": [
      {
        "id": "fandom-move-banshee-scream",
        "title": "Mortal Kombat Wiki \u2014 Levitating Banshee Scream",
        "url": "https://mortalkombat.fandom.com",
        "sourceType": "community-wiki",
        "verificationStatus": "verified"
      }
    ]
  },
  {
    "id": "move-hair-whip",
    "name": "Prehensile Hair Whip",
    "category": "special-move",
    "element": null,
    "description": "Sindel extends her magical hair like steel cords to grab, toss, and choke opponents.",
    "characters": [
      {
        "id": "scorpion",
        "type": "character",
        "name": "Scorpion"
      }
    ],
    "games": [
      {
        "id": "mk-1992",
        "type": "game",
        "name": "Mortal Kombat (1992)"
      }
    ],
    "sources": [
      {
        "id": "fandom-move-hair-whip",
        "title": "Mortal Kombat Wiki \u2014 Prehensile Hair Whip",
        "url": "https://mortalkombat.fandom.com",
        "sourceType": "community-wiki",
        "verificationStatus": "verified"
      }
    ]
  },
  {
    "id": "move-ovipositor-rush",
    "name": "Ovipositor Rush",
    "category": "special-move",
    "element": null,
    "description": "D'Vorah thrusts her razor-sharp insectoid back appendages forward in a rapid stabbing flurry.",
    "characters": [
      {
        "id": "scorpion",
        "type": "character",
        "name": "Scorpion"
      }
    ],
    "games": [
      {
        "id": "mk-1992",
        "type": "game",
        "name": "Mortal Kombat (1992)"
      }
    ],
    "sources": [
      {
        "id": "fandom-move-ovipositor-rush",
        "title": "Mortal Kombat Wiki \u2014 Ovipositor Rush",
        "url": "https://mortalkombat.fandom.com",
        "sourceType": "community-wiki",
        "verificationStatus": "verified"
      }
    ]
  },
  {
    "id": "move-bug-spray",
    "name": "Spittle Spray",
    "category": "special-move",
    "element": null,
    "description": "D'Vorah sprays swarms of toxic larvae and bugs that bite and disorient the target.",
    "characters": [
      {
        "id": "scorpion",
        "type": "character",
        "name": "Scorpion"
      }
    ],
    "games": [
      {
        "id": "mk-1992",
        "type": "game",
        "name": "Mortal Kombat (1992)"
      }
    ],
    "sources": [
      {
        "id": "fandom-move-bug-spray",
        "title": "Mortal Kombat Wiki \u2014 Spittle Spray",
        "url": "https://mortalkombat.fandom.com",
        "sourceType": "community-wiki",
        "verificationStatus": "verified"
      }
    ]
  },
  {
    "id": "move-bionic-dash",
    "name": "Bionic Rocket Dash",
    "category": "special-move",
    "element": null,
    "description": "Jacqui Briggs ignites rocket thrusters on her gauntlets, driving an explosive punch into the target.",
    "characters": [
      {
        "id": "scorpion",
        "type": "character",
        "name": "Scorpion"
      }
    ],
    "games": [
      {
        "id": "mk-1992",
        "type": "game",
        "name": "Mortal Kombat (1992)"
      }
    ],
    "sources": [
      {
        "id": "fandom-move-bionic-dash",
        "title": "Mortal Kombat Wiki \u2014 Bionic Rocket Dash",
        "url": "https://mortalkombat.fandom.com",
        "sourceType": "community-wiki",
        "verificationStatus": "verified"
      }
    ]
  },
  {
    "id": "move-shotgun-blast",
    "name": "Gauntlet Shotgun Blast",
    "category": "special-move",
    "element": null,
    "description": "Jacqui fires concentrated kinetic buckshot directly from her wrist cannons.",
    "characters": [
      {
        "id": "scorpion",
        "type": "character",
        "name": "Scorpion"
      }
    ],
    "games": [
      {
        "id": "mk-1992",
        "type": "game",
        "name": "Mortal Kombat (1992)"
      }
    ],
    "sources": [
      {
        "id": "fandom-move-shotgun-blast",
        "title": "Mortal Kombat Wiki \u2014 Gauntlet Shotgun Blast",
        "url": "https://mortalkombat.fandom.com",
        "sourceType": "community-wiki",
        "verificationStatus": "verified"
      }
    ]
  },
  {
    "id": "move-whip-strike",
    "name": "Shirai Ryu Whip Flurry",
    "category": "special-move",
    "element": null,
    "description": "Takeda Takahashi cracks his bladed plasma whips in acrobatic circles around the target.",
    "characters": [
      {
        "id": "scorpion",
        "type": "character",
        "name": "Scorpion"
      }
    ],
    "games": [
      {
        "id": "mk-1992",
        "type": "game",
        "name": "Mortal Kombat (1992)"
      }
    ],
    "sources": [
      {
        "id": "fandom-move-whip-strike",
        "title": "Mortal Kombat Wiki \u2014 Shirai Ryu Whip Flurry",
        "url": "https://mortalkombat.fandom.com",
        "sourceType": "community-wiki",
        "verificationStatus": "verified"
      }
    ]
  },
  {
    "id": "move-shirai-ryu-phase",
    "name": "Shirai Ryu Phase Teleport",
    "category": "special-move",
    "element": null,
    "description": "Takeda drops through a shadow smoke portal, reappearing behind the opponent with a kick.",
    "characters": [
      {
        "id": "scorpion",
        "type": "character",
        "name": "Scorpion"
      }
    ],
    "games": [
      {
        "id": "mk-1992",
        "type": "game",
        "name": "Mortal Kombat (1992)"
      }
    ],
    "sources": [
      {
        "id": "fandom-move-shirai-ryu-phase",
        "title": "Mortal Kombat Wiki \u2014 Shirai Ryu Phase Teleport",
        "url": "https://mortalkombat.fandom.com",
        "sourceType": "community-wiki",
        "verificationStatus": "verified"
      }
    ]
  },
  {
    "id": "move-straight-shot",
    "name": "Straight Arrow Shot",
    "category": "special-move",
    "element": null,
    "description": "Kung Jin notches and fires Shaolin arrows with pinpoint accuracy at high velocity.",
    "characters": [
      {
        "id": "scorpion",
        "type": "character",
        "name": "Scorpion"
      }
    ],
    "games": [
      {
        "id": "mk-1992",
        "type": "game",
        "name": "Mortal Kombat (1992)"
      }
    ],
    "sources": [
      {
        "id": "fandom-move-straight-shot",
        "title": "Mortal Kombat Wiki \u2014 Straight Arrow Shot",
        "url": "https://mortalkombat.fandom.com",
        "sourceType": "community-wiki",
        "verificationStatus": "verified"
      }
    ]
  },
  {
    "id": "move-lunge-kick",
    "name": "Bo Vault Kick",
    "category": "special-move",
    "element": null,
    "description": "Kung Jin plants his combat bow as a pole vault, launching both feet into the enemy's chest.",
    "characters": [
      {
        "id": "scorpion",
        "type": "character",
        "name": "Scorpion"
      }
    ],
    "games": [
      {
        "id": "mk-1992",
        "type": "game",
        "name": "Mortal Kombat (1992)"
      }
    ],
    "sources": [
      {
        "id": "fandom-move-lunge-kick",
        "title": "Mortal Kombat Wiki \u2014 Bo Vault Kick",
        "url": "https://mortalkombat.fandom.com",
        "sourceType": "community-wiki",
        "verificationStatus": "verified"
      }
    ]
  },
  {
    "id": "move-boulder-bash",
    "name": "Boulder Bash",
    "category": "special-move",
    "element": null,
    "description": "Elder Goddess Cetrion telekinetically hurls massive earthen boulders at the opponent.",
    "characters": [
      {
        "id": "scorpion",
        "type": "character",
        "name": "Scorpion"
      }
    ],
    "games": [
      {
        "id": "mk-1992",
        "type": "game",
        "name": "Mortal Kombat (1992)"
      }
    ],
    "sources": [
      {
        "id": "fandom-move-boulder-bash",
        "title": "Mortal Kombat Wiki \u2014 Boulder Bash",
        "url": "https://mortalkombat.fandom.com",
        "sourceType": "community-wiki",
        "verificationStatus": "verified"
      }
    ]
  },
  {
    "id": "move-hells-wrath",
    "name": "Hell's Wrath Tendril",
    "category": "special-move",
    "element": null,
    "description": "Cetrion commands fiery roots to burst from subterranean depths, gripping the target.",
    "characters": [
      {
        "id": "scorpion",
        "type": "character",
        "name": "Scorpion"
      }
    ],
    "games": [
      {
        "id": "mk-1992",
        "type": "game",
        "name": "Mortal Kombat (1992)"
      }
    ],
    "sources": [
      {
        "id": "fandom-move-hells-wrath",
        "title": "Mortal Kombat Wiki \u2014 Hell's Wrath Tendril",
        "url": "https://mortalkombat.fandom.com",
        "sourceType": "community-wiki",
        "verificationStatus": "verified"
      }
    ]
  },
  {
    "id": "move-shotel-strike",
    "name": "Demonic Shotel Flurry",
    "category": "special-move",
    "element": null,
    "description": "Kollector slashes with curved shotel blades using four arms simultaneously.",
    "characters": [
      {
        "id": "scorpion",
        "type": "character",
        "name": "Scorpion"
      }
    ],
    "games": [
      {
        "id": "mk-1992",
        "type": "game",
        "name": "Mortal Kombat (1992)"
      }
    ],
    "sources": [
      {
        "id": "fandom-move-shotel-strike",
        "title": "Mortal Kombat Wiki \u2014 Demonic Shotel Flurry",
        "url": "https://mortalkombat.fandom.com",
        "sourceType": "community-wiki",
        "verificationStatus": "verified"
      }
    ]
  },
  {
    "id": "move-demonic-mace",
    "name": "Demonic Mace Toss",
    "category": "special-move",
    "element": null,
    "description": "Kollector whips out a spiked mace from his magical collection satchel.",
    "characters": [
      {
        "id": "scorpion",
        "type": "character",
        "name": "Scorpion"
      }
    ],
    "games": [
      {
        "id": "mk-1992",
        "type": "game",
        "name": "Mortal Kombat (1992)"
      }
    ],
    "sources": [
      {
        "id": "fandom-move-demonic-mace",
        "title": "Mortal Kombat Wiki \u2014 Demonic Mace Toss",
        "url": "https://mortalkombat.fandom.com",
        "sourceType": "community-wiki",
        "verificationStatus": "verified"
      }
    ]
  },
  {
    "id": "move-dragon-breath",
    "name": "Dragon King Fire Breath",
    "category": "special-move",
    "element": null,
    "description": "Onaga unleashes a devastating cone of primordial dragon fire capable of incinerating armies.",
    "characters": [
      {
        "id": "scorpion",
        "type": "character",
        "name": "Scorpion"
      }
    ],
    "games": [
      {
        "id": "mk-1992",
        "type": "game",
        "name": "Mortal Kombat (1992)"
      }
    ],
    "sources": [
      {
        "id": "fandom-move-dragon-breath",
        "title": "Mortal Kombat Wiki \u2014 Dragon King Fire Breath",
        "url": "https://mortalkombat.fandom.com",
        "sourceType": "community-wiki",
        "verificationStatus": "verified"
      }
    ]
  },
  {
    "id": "move-dragon-slam",
    "name": "Titanic Dragon Slam",
    "category": "special-move",
    "element": null,
    "description": "Onaga flies into the air and crashes down with unyielding draconic mass.",
    "characters": [
      {
        "id": "scorpion",
        "type": "character",
        "name": "Scorpion"
      }
    ],
    "games": [
      {
        "id": "mk-1992",
        "type": "game",
        "name": "Mortal Kombat (1992)"
      }
    ],
    "sources": [
      {
        "id": "fandom-move-dragon-slam",
        "title": "Mortal Kombat Wiki \u2014 Titanic Dragon Slam",
        "url": "https://mortalkombat.fandom.com",
        "sourceType": "community-wiki",
        "verificationStatus": "verified"
      }
    ]
  },
  {
    "id": "move-mimic-mastery",
    "name": "Ape Mimicry",
    "category": "special-move",
    "element": null,
    "description": "Shujinko draws upon the martial styles learned from masters across all realms.",
    "characters": [
      {
        "id": "scorpion",
        "type": "character",
        "name": "Scorpion"
      }
    ],
    "games": [
      {
        "id": "mk-1992",
        "type": "game",
        "name": "Mortal Kombat (1992)"
      }
    ],
    "sources": [
      {
        "id": "fandom-move-mimic-mastery",
        "title": "Mortal Kombat Wiki \u2014 Ape Mimicry",
        "url": "https://mortalkombat.fandom.com",
        "sourceType": "community-wiki",
        "verificationStatus": "verified"
      }
    ]
  },
  {
    "id": "move-charging-spear",
    "name": "Charging Spartan Spear",
    "category": "special-move",
    "element": null,
    "description": "Reiko charges across the battlefield thrusting a ceremonial war spear.",
    "characters": [
      {
        "id": "scorpion",
        "type": "character",
        "name": "Scorpion"
      }
    ],
    "games": [
      {
        "id": "mk-1992",
        "type": "game",
        "name": "Mortal Kombat (1992)"
      }
    ],
    "sources": [
      {
        "id": "fandom-move-charging-spear",
        "title": "Mortal Kombat Wiki \u2014 Charging Spartan Spear",
        "url": "https://mortalkombat.fandom.com",
        "sourceType": "community-wiki",
        "verificationStatus": "verified"
      }
    ]
  },
  {
    "id": "move-blood-spit",
    "name": "Hemomantic Blood Spit",
    "category": "special-move",
    "element": null,
    "description": "Nitara expels a sphere of vampiric blood that drains opponent vitality.",
    "characters": [
      {
        "id": "scorpion",
        "type": "character",
        "name": "Scorpion"
      }
    ],
    "games": [
      {
        "id": "mk-1992",
        "type": "game",
        "name": "Mortal Kombat (1992)"
      }
    ],
    "sources": [
      {
        "id": "fandom-move-blood-spit",
        "title": "Mortal Kombat Wiki \u2014 Hemomantic Blood Spit",
        "url": "https://mortalkombat.fandom.com",
        "sourceType": "community-wiki",
        "verificationStatus": "verified"
      }
    ]
  },
  {
    "id": "move-skull-daggers",
    "name": "Demon Skull Dagger",
    "category": "special-move",
    "element": null,
    "description": "Sareena throws Netherrealm skull-engraved daggers with shadow trajectory.",
    "characters": [
      {
        "id": "scorpion",
        "type": "character",
        "name": "Scorpion"
      }
    ],
    "games": [
      {
        "id": "mk-1992",
        "type": "game",
        "name": "Mortal Kombat (1992)"
      }
    ],
    "sources": [
      {
        "id": "fandom-move-skull-daggers",
        "title": "Mortal Kombat Wiki \u2014 Demon Skull Dagger",
        "url": "https://mortalkombat.fandom.com",
        "sourceType": "community-wiki",
        "verificationStatus": "verified"
      }
    ]
  },
  {
    "id": "move-heavenly-light",
    "name": "Heavenly Cleansing Light",
    "category": "special-move",
    "element": null,
    "description": "Ashrah channels the holy energy of the Kriss, blinding demons with pure light.",
    "characters": [
      {
        "id": "scorpion",
        "type": "character",
        "name": "Scorpion"
      }
    ],
    "games": [
      {
        "id": "mk-1992",
        "type": "game",
        "name": "Mortal Kombat (1992)"
      }
    ],
    "sources": [
      {
        "id": "fandom-move-heavenly-light",
        "title": "Mortal Kombat Wiki \u2014 Heavenly Cleansing Light",
        "url": "https://mortalkombat.fandom.com",
        "sourceType": "community-wiki",
        "verificationStatus": "verified"
      }
    ]
  },
  {
    "id": "move-lava-burst",
    "name": "Order Lava Eruption",
    "category": "special-move",
    "element": null,
    "description": "Hotaru summons molten magma jets from Seido's core to incinerate anarchists.",
    "characters": [
      {
        "id": "scorpion",
        "type": "character",
        "name": "Scorpion"
      }
    ],
    "games": [
      {
        "id": "mk-1992",
        "type": "game",
        "name": "Mortal Kombat (1992)"
      }
    ],
    "sources": [
      {
        "id": "fandom-move-lava-burst",
        "title": "Mortal Kombat Wiki \u2014 Order Lava Eruption",
        "url": "https://mortalkombat.fandom.com",
        "sourceType": "community-wiki",
        "verificationStatus": "verified"
      }
    ]
  },
  {
    "id": "move-grapple-hook-kick",
    "name": "Elastic Grapple Kick",
    "category": "special-move",
    "element": null,
    "description": "Mavado slingshots himself across the screen using high-tension bungee cables.",
    "characters": [
      {
        "id": "scorpion",
        "type": "character",
        "name": "Scorpion"
      }
    ],
    "games": [
      {
        "id": "mk-1992",
        "type": "game",
        "name": "Mortal Kombat (1992)"
      }
    ],
    "sources": [
      {
        "id": "fandom-move-grapple-hook-kick",
        "title": "Mortal Kombat Wiki \u2014 Elastic Grapple Kick",
        "url": "https://mortalkombat.fandom.com",
        "sourceType": "community-wiki",
        "verificationStatus": "verified"
      }
    ]
  },
  {
    "id": "move-centaur-charge",
    "name": "Centaur Gallop Charge",
    "category": "special-move",
    "element": null,
    "description": "Motaro charges on all four hooves, trampling anyone in his path.",
    "characters": [
      {
        "id": "scorpion",
        "type": "character",
        "name": "Scorpion"
      }
    ],
    "games": [
      {
        "id": "mk-1992",
        "type": "game",
        "name": "Mortal Kombat (1992)"
      }
    ],
    "sources": [
      {
        "id": "fandom-move-centaur-charge",
        "title": "Mortal Kombat Wiki \u2014 Centaur Gallop Charge",
        "url": "https://mortalkombat.fandom.com",
        "sourceType": "community-wiki",
        "verificationStatus": "verified"
      }
    ]
  },
  {
    "id": "move-fire-fist",
    "name": "Elemental Conflagration",
    "category": "special-move",
    "element": null,
    "description": "Blaze ignites his body in an inferno, crushing opponents with molten magma strikes.",
    "characters": [
      {
        "id": "scorpion",
        "type": "character",
        "name": "Scorpion"
      }
    ],
    "games": [
      {
        "id": "mk-1992",
        "type": "game",
        "name": "Mortal Kombat (1992)"
      }
    ],
    "sources": [
      {
        "id": "fandom-move-fire-fist",
        "title": "Mortal Kombat Wiki \u2014 Elemental Conflagration",
        "url": "https://mortalkombat.fandom.com",
        "sourceType": "community-wiki",
        "verificationStatus": "verified"
      }
    ]
  },
  {
    "id": "fatality-toasty",
    "name": "Fatality: Toasty!",
    "category": "fatality",
    "element": null,
    "description": "Removing the mask to reveal a flaming skull and incinerating the opponent to ashes.",
    "characters": [
      {
        "id": "scorpion",
        "type": "character",
        "name": "Scorpion"
      }
    ],
    "games": [
      {
        "id": "mk-1992",
        "type": "game",
        "name": "Mortal Kombat (1992)"
      }
    ],
    "sources": [
      {
        "id": "fandom-fatality-toasty",
        "title": "Mortal Kombat Wiki \u2014 Fatality: Toasty!",
        "url": "https://mortalkombat.fandom.com",
        "sourceType": "community-wiki",
        "verificationStatus": "verified"
      }
    ]
  },
  {
    "id": "fatality-spine-rip",
    "name": "Fatality: Spine Rip",
    "category": "fatality",
    "element": null,
    "description": "Grabbing the victim's neck and cleanly ripping out their head and spine.",
    "characters": [
      {
        "id": "scorpion",
        "type": "character",
        "name": "Scorpion"
      }
    ],
    "games": [
      {
        "id": "mk-1992",
        "type": "game",
        "name": "Mortal Kombat (1992)"
      }
    ],
    "sources": [
      {
        "id": "fandom-fatality-spine-rip",
        "title": "Mortal Kombat Wiki \u2014 Fatality: Spine Rip",
        "url": "https://mortalkombat.fandom.com",
        "sourceType": "community-wiki",
        "verificationStatus": "verified"
      }
    ]
  },
  {
    "id": "fatality-dragon-bite",
    "name": "Fatality: Dragon Feast",
    "category": "fatality",
    "element": null,
    "description": "Morphing into a massive dragon that bites the opponent's torso in half.",
    "characters": [
      {
        "id": "scorpion",
        "type": "character",
        "name": "Scorpion"
      }
    ],
    "games": [
      {
        "id": "mk-1992",
        "type": "game",
        "name": "Mortal Kombat (1992)"
      }
    ],
    "sources": [
      {
        "id": "fandom-fatality-dragon-bite",
        "title": "Mortal Kombat Wiki \u2014 Fatality: Dragon Feast",
        "url": "https://mortalkombat.fandom.com",
        "sourceType": "community-wiki",
        "verificationStatus": "verified"
      }
    ]
  },
  {
    "id": "fatality-fan-decapitation",
    "name": "Fatality: Decapitating Fans",
    "category": "fatality",
    "element": null,
    "description": "Slicing off the opponent's head with a swift flick of dual steel war fans.",
    "characters": [
      {
        "id": "scorpion",
        "type": "character",
        "name": "Scorpion"
      }
    ],
    "games": [
      {
        "id": "mk-1992",
        "type": "game",
        "name": "Mortal Kombat (1992)"
      }
    ],
    "sources": [
      {
        "id": "fandom-fatality-fan-decapitation",
        "title": "Mortal Kombat Wiki \u2014 Fatality: Decapitating Fans",
        "url": "https://mortalkombat.fandom.com",
        "sourceType": "community-wiki",
        "verificationStatus": "verified"
      }
    ]
  },
  {
    "id": "fatality-kiss-of-death",
    "name": "Fatality: Kiss of Death",
    "category": "fatality",
    "element": null,
    "description": "Blowing a glowing kiss of energy that causes the opponent to violently detonate.",
    "characters": [
      {
        "id": "scorpion",
        "type": "character",
        "name": "Scorpion"
      }
    ],
    "games": [
      {
        "id": "mk-1992",
        "type": "game",
        "name": "Mortal Kombat (1992)"
      }
    ],
    "sources": [
      {
        "id": "fandom-fatality-kiss-of-death",
        "title": "Mortal Kombat Wiki \u2014 Fatality: Kiss of Death",
        "url": "https://mortalkombat.fandom.com",
        "sourceType": "community-wiki",
        "verificationStatus": "verified"
      }
    ]
  },
  {
    "id": "fatality-shokan-tear",
    "name": "Fatality: Limb Disassembly",
    "category": "fatality",
    "element": null,
    "description": "Goro grabs both arms and legs, tearing the opponent into four separate pieces.",
    "characters": [
      {
        "id": "scorpion",
        "type": "character",
        "name": "Scorpion"
      }
    ],
    "games": [
      {
        "id": "mk-1992",
        "type": "game",
        "name": "Mortal Kombat (1992)"
      }
    ],
    "sources": [
      {
        "id": "fandom-fatality-shokan-tear",
        "title": "Mortal Kombat Wiki \u2014 Fatality: Limb Disassembly",
        "url": "https://mortalkombat.fandom.com",
        "sourceType": "community-wiki",
        "verificationStatus": "verified"
      }
    ]
  },
  {
    "id": "fatality-bow-before-me",
    "name": "Fatality: Bow Before Me",
    "category": "fatality",
    "element": null,
    "description": "Jade vaults on her staff, driving both ends through the opponent's eye sockets.",
    "characters": [
      {
        "id": "scorpion",
        "type": "character",
        "name": "Scorpion"
      }
    ],
    "games": [
      {
        "id": "mk-1992",
        "type": "game",
        "name": "Mortal Kombat (1992)"
      }
    ],
    "sources": [
      {
        "id": "fandom-fatality-bow-before-me",
        "title": "Mortal Kombat Wiki \u2014 Fatality: Bow Before Me",
        "url": "https://mortalkombat.fandom.com",
        "sourceType": "community-wiki",
        "verificationStatus": "verified"
      }
    ]
  },
  {
    "id": "fatality-road-rash",
    "name": "Fatality: Road Rash",
    "category": "fatality",
    "element": null,
    "description": "Kabal drags the opponent at super-speed face first across the concrete, grinding their skull away.",
    "characters": [
      {
        "id": "scorpion",
        "type": "character",
        "name": "Scorpion"
      }
    ],
    "games": [
      {
        "id": "mk-1992",
        "type": "game",
        "name": "Mortal Kombat (1992)"
      }
    ],
    "sources": [
      {
        "id": "fandom-fatality-road-rash",
        "title": "Mortal Kombat Wiki \u2014 Fatality: Road Rash",
        "url": "https://mortalkombat.fandom.com",
        "sourceType": "community-wiki",
        "verificationStatus": "verified"
      }
    ]
  },
  {
    "id": "fatality-time-served",
    "name": "Fatality: Time Served",
    "category": "fatality",
    "element": null,
    "description": "Stryker plants a grenade in the target's chest, shoots them with a taser, and detonates the charge.",
    "characters": [
      {
        "id": "scorpion",
        "type": "character",
        "name": "Scorpion"
      }
    ],
    "games": [
      {
        "id": "mk-1992",
        "type": "game",
        "name": "Mortal Kombat (1992)"
      }
    ],
    "sources": [
      {
        "id": "fandom-fatality-time-served",
        "title": "Mortal Kombat Wiki \u2014 Fatality: Time Served",
        "url": "https://mortalkombat.fandom.com",
        "sourceType": "community-wiki",
        "verificationStatus": "verified"
      }
    ]
  },
  {
    "id": "fatality-spine-ripper",
    "name": "Fatality: Lend a Hand",
    "category": "fatality",
    "element": null,
    "description": "Sheeva grabs both sets of limbs and tears the flesh completely from the skeletal frame.",
    "characters": [
      {
        "id": "scorpion",
        "type": "character",
        "name": "Scorpion"
      }
    ],
    "games": [
      {
        "id": "mk-1992",
        "type": "game",
        "name": "Mortal Kombat (1992)"
      }
    ],
    "sources": [
      {
        "id": "fandom-fatality-spine-ripper",
        "title": "Mortal Kombat Wiki \u2014 Fatality: Lend a Hand",
        "url": "https://mortalkombat.fandom.com",
        "sourceType": "community-wiki",
        "verificationStatus": "verified"
      }
    ]
  },
  {
    "id": "fatality-war-dance",
    "name": "Fatality: Kompshina Calling",
    "category": "fatality",
    "element": null,
    "description": "Nightwolf embeds his tomahawks into the victim's collarbones, summoning a massive lightning bolt to split them.",
    "characters": [
      {
        "id": "scorpion",
        "type": "character",
        "name": "Scorpion"
      }
    ],
    "games": [
      {
        "id": "mk-1992",
        "type": "game",
        "name": "Mortal Kombat (1992)"
      }
    ],
    "sources": [
      {
        "id": "fandom-fatality-war-dance",
        "title": "Mortal Kombat Wiki \u2014 Fatality: Kompshina Calling",
        "url": "https://mortalkombat.fandom.com",
        "sourceType": "community-wiki",
        "verificationStatus": "verified"
      }
    ]
  },
  {
    "id": "fatality-scream-queen",
    "name": "Fatality: Scream Queen",
    "category": "fatality",
    "element": null,
    "description": "Sindel screams directly into the victim's mouth, causing their eyes and entrails to explode outward.",
    "characters": [
      {
        "id": "scorpion",
        "type": "character",
        "name": "Scorpion"
      }
    ],
    "games": [
      {
        "id": "mk-1992",
        "type": "game",
        "name": "Mortal Kombat (1992)"
      }
    ],
    "sources": [
      {
        "id": "fandom-fatality-scream-queen",
        "title": "Mortal Kombat Wiki \u2014 Fatality: Scream Queen",
        "url": "https://mortalkombat.fandom.com",
        "sourceType": "community-wiki",
        "verificationStatus": "verified"
      }
    ]
  },
  {
    "id": "fatality-infestation",
    "name": "Fatality: Bug Me",
    "category": "fatality",
    "element": null,
    "description": "D'Vorah fills the victim's torso with ravenous wasp larvae that burst out from the ribcage.",
    "characters": [
      {
        "id": "scorpion",
        "type": "character",
        "name": "Scorpion"
      }
    ],
    "games": [
      {
        "id": "mk-1992",
        "type": "game",
        "name": "Mortal Kombat (1992)"
      }
    ],
    "sources": [
      {
        "id": "fandom-fatality-infestation",
        "title": "Mortal Kombat Wiki \u2014 Fatality: Bug Me",
        "url": "https://mortalkombat.fandom.com",
        "sourceType": "community-wiki",
        "verificationStatus": "verified"
      }
    ]
  },
  {
    "id": "fatality-spider-mines",
    "name": "Fatality: Spider Mines",
    "category": "fatality",
    "element": null,
    "description": "Jacqui Briggs deploys spider mines that burrow into the opponent's joints and detonate simultaneously.",
    "characters": [
      {
        "id": "scorpion",
        "type": "character",
        "name": "Scorpion"
      }
    ],
    "games": [
      {
        "id": "mk-1992",
        "type": "game",
        "name": "Mortal Kombat (1992)"
      }
    ],
    "sources": [
      {
        "id": "fandom-fatality-spider-mines",
        "title": "Mortal Kombat Wiki \u2014 Fatality: Spider Mines",
        "url": "https://mortalkombat.fandom.com",
        "sourceType": "community-wiki",
        "verificationStatus": "verified"
      }
    ]
  },
  {
    "id": "fatality-whip-it-good",
    "name": "Fatality: Whip It Good",
    "category": "fatality",
    "element": null,
    "description": "Takeda loops his serrated whips around the target's neck and joints, yanking them into clean cubes.",
    "characters": [
      {
        "id": "scorpion",
        "type": "character",
        "name": "Scorpion"
      }
    ],
    "games": [
      {
        "id": "mk-1992",
        "type": "game",
        "name": "Mortal Kombat (1992)"
      }
    ],
    "sources": [
      {
        "id": "fandom-fatality-whip-it-good",
        "title": "Mortal Kombat Wiki \u2014 Fatality: Whip It Good",
        "url": "https://mortalkombat.fandom.com",
        "sourceType": "community-wiki",
        "verificationStatus": "verified"
      }
    ]
  },
  {
    "id": "fatality-target-practice",
    "name": "Fatality: Target Practice",
    "category": "fatality",
    "element": null,
    "description": "Kung Jin pins the target with three rapid arrows before piercing the forehead with a flaming shaft.",
    "characters": [
      {
        "id": "scorpion",
        "type": "character",
        "name": "Scorpion"
      }
    ],
    "games": [
      {
        "id": "mk-1992",
        "type": "game",
        "name": "Mortal Kombat (1992)"
      }
    ],
    "sources": [
      {
        "id": "fandom-fatality-target-practice",
        "title": "Mortal Kombat Wiki \u2014 Fatality: Target Practice",
        "url": "https://mortalkombat.fandom.com",
        "sourceType": "community-wiki",
        "verificationStatus": "verified"
      }
    ]
  },
  {
    "id": "fatality-good-and-evil",
    "name": "Fatality: Good and Evil",
    "category": "fatality",
    "element": null,
    "description": "Cetrion grows to planetary scale and blasts a beam of pure cosmic light from the cosmos.",
    "characters": [
      {
        "id": "scorpion",
        "type": "character",
        "name": "Scorpion"
      }
    ],
    "games": [
      {
        "id": "mk-1992",
        "type": "game",
        "name": "Mortal Kombat (1992)"
      }
    ],
    "sources": [
      {
        "id": "fandom-fatality-good-and-evil",
        "title": "Mortal Kombat Wiki \u2014 Fatality: Good and Evil",
        "url": "https://mortalkombat.fandom.com",
        "sourceType": "community-wiki",
        "verificationStatus": "verified"
      }
    ]
  },
  {
    "id": "fatality-for-the-kollection",
    "name": "Fatality: For the Kollection",
    "category": "fatality",
    "element": null,
    "description": "Kollector methodically carves out the opponent's heart, head, and organs, packing them neatly in his satchel.",
    "characters": [
      {
        "id": "scorpion",
        "type": "character",
        "name": "Scorpion"
      }
    ],
    "games": [
      {
        "id": "mk-1992",
        "type": "game",
        "name": "Mortal Kombat (1992)"
      }
    ],
    "sources": [
      {
        "id": "fandom-fatality-for-the-kollection",
        "title": "Mortal Kombat Wiki \u2014 Fatality: For the Kollection",
        "url": "https://mortalkombat.fandom.com",
        "sourceType": "community-wiki",
        "verificationStatus": "verified"
      }
    ]
  },
  {
    "id": "fatality-face-crusher",
    "name": "Fatality: Five Point Strike",
    "category": "fatality",
    "element": null,
    "description": "Shujinko strikes vital meridian pressure points, causing the victim's body to cave in on itself.",
    "characters": [
      {
        "id": "scorpion",
        "type": "character",
        "name": "Scorpion"
      }
    ],
    "games": [
      {
        "id": "mk-1992",
        "type": "game",
        "name": "Mortal Kombat (1992)"
      }
    ],
    "sources": [
      {
        "id": "fandom-fatality-face-crusher",
        "title": "Mortal Kombat Wiki \u2014 Fatality: Five Point Strike",
        "url": "https://mortalkombat.fandom.com",
        "sourceType": "community-wiki",
        "verificationStatus": "verified"
      }
    ]
  },
  {
    "id": "fatality-vaeternus-drain",
    "name": "Fatality: Blood Feast",
    "category": "fatality",
    "element": null,
    "description": "Nitara rips open the victim's carotid artery with fangs and claws, drinking them completely dry.",
    "characters": [
      {
        "id": "scorpion",
        "type": "character",
        "name": "Scorpion"
      }
    ],
    "games": [
      {
        "id": "mk-1992",
        "type": "game",
        "name": "Mortal Kombat (1992)"
      }
    ],
    "sources": [
      {
        "id": "fandom-fatality-vaeternus-drain",
        "title": "Mortal Kombat Wiki \u2014 Fatality: Blood Feast",
        "url": "https://mortalkombat.fandom.com",
        "sourceType": "community-wiki",
        "verificationStatus": "verified"
      }
    ]
  },
  {
    "id": "fatality-divine-purification",
    "name": "Fatality: Heavenly Cleansing",
    "category": "fatality",
    "element": null,
    "description": "Ashrah pierces the demon's heart with the Kriss, causing holy blue light to incinerate the body from within.",
    "characters": [
      {
        "id": "scorpion",
        "type": "character",
        "name": "Scorpion"
      }
    ],
    "games": [
      {
        "id": "mk-1992",
        "type": "game",
        "name": "Mortal Kombat (1992)"
      }
    ],
    "sources": [
      {
        "id": "fandom-fatality-divine-purification",
        "title": "Mortal Kombat Wiki \u2014 Fatality: Heavenly Cleansing",
        "url": "https://mortalkombat.fandom.com",
        "sourceType": "community-wiki",
        "verificationStatus": "verified"
      }
    ]
  }
];

export const weapons: Weapon[] = [
  {
    "id": "kunai-spear",
    "name": "Kunai Spear",
    "category": "Melee Weapon",
    "description": "Scorpion's signature rope dart / chained kunai hurled into opponents.",
    "characters": [
      {
        "id": "scorpion",
        "type": "character",
        "name": "Scorpion"
      }
    ],
    "games": [
      {
        "id": "mk-1992",
        "type": "game",
        "name": "Mortal Kombat (1992)"
      }
    ],
    "relatedAbilities": [],
    "sources": [
      {
        "id": "fandom-kunai-spear",
        "title": "Mortal Kombat Wiki \u2014 Kunai Spear",
        "url": "https://mortalkombat.fandom.com",
        "sourceType": "community-wiki",
        "verificationStatus": "verified"
      }
    ]
  },
  {
    "id": "kori-blade",
    "name": "K\u014dri Blade",
    "category": "Melee Weapon",
    "description": "Sub-Zero's flash-frozen cryogenic sword forged from thin air.",
    "characters": [
      {
        "id": "scorpion",
        "type": "character",
        "name": "Scorpion"
      }
    ],
    "games": [
      {
        "id": "mk-1992",
        "type": "game",
        "name": "Mortal Kombat (1992)"
      }
    ],
    "relatedAbilities": [],
    "sources": [
      {
        "id": "fandom-kori-blade",
        "title": "Mortal Kombat Wiki \u2014 K\u014dri Blade",
        "url": "https://mortalkombat.fandom.com",
        "sourceType": "community-wiki",
        "verificationStatus": "verified"
      }
    ]
  },
  {
    "id": "war-hammer",
    "name": "Wrath Hammer",
    "category": "Melee Weapon",
    "description": "Shao Kahn's devastating monolithic maul that crushes armor and bone.",
    "characters": [
      {
        "id": "scorpion",
        "type": "character",
        "name": "Scorpion"
      }
    ],
    "games": [
      {
        "id": "mk-1992",
        "type": "game",
        "name": "Mortal Kombat (1992)"
      }
    ],
    "relatedAbilities": [],
    "sources": [
      {
        "id": "fandom-war-hammer",
        "title": "Mortal Kombat Wiki \u2014 Wrath Hammer",
        "url": "https://mortalkombat.fandom.com",
        "sourceType": "community-wiki",
        "verificationStatus": "verified"
      }
    ]
  },
  {
    "id": "sento",
    "name": "Sento",
    "category": "Melee Weapon",
    "description": "Ancestral katana housing the souls of the Takahashi clan's warrior ancestors.",
    "characters": [
      {
        "id": "scorpion",
        "type": "character",
        "name": "Scorpion"
      }
    ],
    "games": [
      {
        "id": "mk-1992",
        "type": "game",
        "name": "Mortal Kombat (1992)"
      }
    ],
    "relatedAbilities": [],
    "sources": [
      {
        "id": "fandom-sento",
        "title": "Mortal Kombat Wiki \u2014 Sento",
        "url": "https://mortalkombat.fandom.com",
        "sourceType": "community-wiki",
        "verificationStatus": "verified"
      }
    ]
  },
  {
    "id": "hookswords",
    "name": "Dual Hookswords",
    "category": "Melee Weapon",
    "description": "Twin curved Chinese hook swords wielded with lethal acrobatics by Kabal and Mavado.",
    "characters": [
      {
        "id": "scorpion",
        "type": "character",
        "name": "Scorpion"
      }
    ],
    "games": [
      {
        "id": "mk-1992",
        "type": "game",
        "name": "Mortal Kombat (1992)"
      }
    ],
    "relatedAbilities": [],
    "sources": [
      {
        "id": "fandom-hookswords",
        "title": "Mortal Kombat Wiki \u2014 Dual Hookswords",
        "url": "https://mortalkombat.fandom.com",
        "sourceType": "community-wiki",
        "verificationStatus": "verified"
      }
    ]
  },
  {
    "id": "steel-fans",
    "name": "Steel War Fans",
    "category": "Melee Weapon",
    "description": "Princess Kitana's razor-edged folding steel fans used for slicing and air control.",
    "characters": [
      {
        "id": "scorpion",
        "type": "character",
        "name": "Scorpion"
      }
    ],
    "games": [
      {
        "id": "mk-1992",
        "type": "game",
        "name": "Mortal Kombat (1992)"
      }
    ],
    "relatedAbilities": [],
    "sources": [
      {
        "id": "fandom-steel-fans",
        "title": "Mortal Kombat Wiki \u2014 Steel War Fans",
        "url": "https://mortalkombat.fandom.com",
        "sourceType": "community-wiki",
        "verificationStatus": "verified"
      }
    ]
  },
  {
    "id": "cybernetic-arms",
    "name": "Bionic Cyber Arms",
    "category": "Melee Weapon",
    "description": "Jax Briggs' titanium cybernetic prosthetics delivering earthquake punches.",
    "characters": [
      {
        "id": "scorpion",
        "type": "character",
        "name": "Scorpion"
      }
    ],
    "games": [
      {
        "id": "mk-1992",
        "type": "game",
        "name": "Mortal Kombat (1992)"
      }
    ],
    "relatedAbilities": [],
    "sources": [
      {
        "id": "fandom-cybernetic-arms",
        "title": "Mortal Kombat Wiki \u2014 Bionic Cyber Arms",
        "url": "https://mortalkombat.fandom.com",
        "sourceType": "community-wiki",
        "verificationStatus": "verified"
      }
    ]
  },
  {
    "id": "dual-revolvers",
    "name": "Dual Revolvers",
    "category": "Melee Weapon",
    "description": "Erron Black's custom Outworld six-shooter revolvers loaded with hollow-point lead.",
    "characters": [
      {
        "id": "scorpion",
        "type": "character",
        "name": "Scorpion"
      }
    ],
    "games": [
      {
        "id": "mk-1992",
        "type": "game",
        "name": "Mortal Kombat (1992)"
      }
    ],
    "relatedAbilities": [],
    "sources": [
      {
        "id": "fandom-dual-revolvers",
        "title": "Mortal Kombat Wiki \u2014 Dual Revolvers",
        "url": "https://mortalkombat.fandom.com",
        "sourceType": "community-wiki",
        "verificationStatus": "verified"
      }
    ]
  },
  {
    "id": "bo-staff",
    "name": "Imperial Bo Staff",
    "category": "Melee Weapon",
    "description": "Jade's glowing triboluminescent steel bo staff delivering long-reach pole vault strikes.",
    "characters": [
      {
        "id": "scorpion",
        "type": "character",
        "name": "Scorpion"
      }
    ],
    "games": [
      {
        "id": "mk-1992",
        "type": "game",
        "name": "Mortal Kombat (1992)"
      }
    ],
    "relatedAbilities": [],
    "sources": [
      {
        "id": "fandom-bo-staff",
        "title": "Mortal Kombat Wiki \u2014 Imperial Bo Staff",
        "url": "https://mortalkombat.fandom.com",
        "sourceType": "community-wiki",
        "verificationStatus": "verified"
      }
    ]
  },
  {
    "id": "sai-daggers",
    "name": "Twin Sai Daggers",
    "category": "Melee Weapon",
    "description": "Mileena's pair of three-pronged sai daggers used for rapid stabbing and teleport throws.",
    "characters": [
      {
        "id": "scorpion",
        "type": "character",
        "name": "Scorpion"
      }
    ],
    "games": [
      {
        "id": "mk-1992",
        "type": "game",
        "name": "Mortal Kombat (1992)"
      }
    ],
    "relatedAbilities": [],
    "sources": [
      {
        "id": "fandom-sai-daggers",
        "title": "Mortal Kombat Wiki \u2014 Twin Sai Daggers",
        "url": "https://mortalkombat.fandom.com",
        "sourceType": "community-wiki",
        "verificationStatus": "verified"
      }
    ]
  },
  {
    "id": "nightsticks",
    "name": "Police Nightsticks",
    "category": "Melee Weapon",
    "description": "Kurtis Stryker's reinforced side-handle PR-24 police batons for crowd control takedowns.",
    "characters": [
      {
        "id": "scorpion",
        "type": "character",
        "name": "Scorpion"
      }
    ],
    "games": [
      {
        "id": "mk-1992",
        "type": "game",
        "name": "Mortal Kombat (1992)"
      }
    ],
    "relatedAbilities": [],
    "sources": [
      {
        "id": "fandom-nightsticks",
        "title": "Mortal Kombat Wiki \u2014 Police Nightsticks",
        "url": "https://mortalkombat.fandom.com",
        "sourceType": "community-wiki",
        "verificationStatus": "verified"
      }
    ]
  },
  {
    "id": "spirit-tomahawks",
    "name": "Ethereal Tomahawks",
    "category": "Melee Weapon",
    "description": "Nightwolf's twin glowing spirit axes manifested through Matoka shamanic communion.",
    "characters": [
      {
        "id": "scorpion",
        "type": "character",
        "name": "Scorpion"
      }
    ],
    "games": [
      {
        "id": "mk-1992",
        "type": "game",
        "name": "Mortal Kombat (1992)"
      }
    ],
    "relatedAbilities": [],
    "sources": [
      {
        "id": "fandom-spirit-tomahawks",
        "title": "Mortal Kombat Wiki \u2014 Ethereal Tomahawks",
        "url": "https://mortalkombat.fandom.com",
        "sourceType": "community-wiki",
        "verificationStatus": "verified"
      }
    ]
  },
  {
    "id": "ovipositors",
    "name": "Kytinn Ovipositors",
    "category": "Melee Weapon",
    "description": "D'Vorah's four serrated insectoid appendages emerging from her back to impale prey.",
    "characters": [
      {
        "id": "scorpion",
        "type": "character",
        "name": "Scorpion"
      }
    ],
    "games": [
      {
        "id": "mk-1992",
        "type": "game",
        "name": "Mortal Kombat (1992)"
      }
    ],
    "relatedAbilities": [],
    "sources": [
      {
        "id": "fandom-ovipositors",
        "title": "Mortal Kombat Wiki \u2014 Kytinn Ovipositors",
        "url": "https://mortalkombat.fandom.com",
        "sourceType": "community-wiki",
        "verificationStatus": "verified"
      }
    ]
  },
  {
    "id": "bladed-whips",
    "name": "Plasma Bladed Whips",
    "category": "Melee Weapon",
    "description": "Takeda Takahashi's retractable dual cyber-whips laced with high-frequency heated blades.",
    "characters": [
      {
        "id": "scorpion",
        "type": "character",
        "name": "Scorpion"
      }
    ],
    "games": [
      {
        "id": "mk-1992",
        "type": "game",
        "name": "Mortal Kombat (1992)"
      }
    ],
    "relatedAbilities": [],
    "sources": [
      {
        "id": "fandom-bladed-whips",
        "title": "Mortal Kombat Wiki \u2014 Plasma Bladed Whips",
        "url": "https://mortalkombat.fandom.com",
        "sourceType": "community-wiki",
        "verificationStatus": "verified"
      }
    ]
  },
  {
    "id": "combat-bow",
    "name": "Shaolin Combat Bow",
    "category": "Melee Weapon",
    "description": "Kung Jin's collapsible recurve bow functioning as a bludgeon, bo staff, and trick arrow launcher.",
    "characters": [
      {
        "id": "scorpion",
        "type": "character",
        "name": "Scorpion"
      }
    ],
    "games": [
      {
        "id": "mk-1992",
        "type": "game",
        "name": "Mortal Kombat (1992)"
      }
    ],
    "relatedAbilities": [],
    "sources": [
      {
        "id": "fandom-combat-bow",
        "title": "Mortal Kombat Wiki \u2014 Shaolin Combat Bow",
        "url": "https://mortalkombat.fandom.com",
        "sourceType": "community-wiki",
        "verificationStatus": "verified"
      }
    ]
  },
  {
    "id": "kriss-dagger",
    "name": "Kriss Purification Dagger",
    "category": "Melee Weapon",
    "description": "Ashrah's holy sword 'Datusha' that cleanses the demonic soul of its wielder with each demon slain.",
    "characters": [
      {
        "id": "scorpion",
        "type": "character",
        "name": "Scorpion"
      }
    ],
    "games": [
      {
        "id": "mk-1992",
        "type": "game",
        "name": "Mortal Kombat (1992)"
      }
    ],
    "relatedAbilities": [],
    "sources": [
      {
        "id": "fandom-kriss-dagger",
        "title": "Mortal Kombat Wiki \u2014 Kriss Purification Dagger",
        "url": "https://mortalkombat.fandom.com",
        "sourceType": "community-wiki",
        "verificationStatus": "verified"
      }
    ]
  },
  {
    "id": "spiked-club",
    "name": "Spiked War Mace",
    "category": "Melee Weapon",
    "description": "General Reiko's heavy spiked Outworld bludgeon designed to crush skull helmets.",
    "characters": [
      {
        "id": "scorpion",
        "type": "character",
        "name": "Scorpion"
      }
    ],
    "games": [
      {
        "id": "mk-1992",
        "type": "game",
        "name": "Mortal Kombat (1992)"
      }
    ],
    "relatedAbilities": [],
    "sources": [
      {
        "id": "fandom-spiked-club",
        "title": "Mortal Kombat Wiki \u2014 Spiked War Mace",
        "url": "https://mortalkombat.fandom.com",
        "sourceType": "community-wiki",
        "verificationStatus": "verified"
      }
    ]
  },
  {
    "id": "shokan-cleavers",
    "name": "Dual Shokan Cleavers",
    "category": "Melee Weapon",
    "description": "Sheeva's twin broad cleaver blades forged from Outworld furnace steel.",
    "characters": [
      {
        "id": "scorpion",
        "type": "character",
        "name": "Scorpion"
      }
    ],
    "games": [
      {
        "id": "mk-1992",
        "type": "game",
        "name": "Mortal Kombat (1992)"
      }
    ],
    "relatedAbilities": [],
    "sources": [
      {
        "id": "fandom-shokan-cleavers",
        "title": "Mortal Kombat Wiki \u2014 Dual Shokan Cleavers",
        "url": "https://mortalkombat.fandom.com",
        "sourceType": "community-wiki",
        "verificationStatus": "verified"
      }
    ]
  },
  {
    "id": "daggers-of-denial",
    "name": "Kobu Jutsu Tonfa Daggers",
    "category": "Melee Weapon",
    "description": "Tanya's agile Kobu Jutsu batons and dual stiletto daggers.",
    "characters": [
      {
        "id": "scorpion",
        "type": "character",
        "name": "Scorpion"
      }
    ],
    "games": [
      {
        "id": "mk-1992",
        "type": "game",
        "name": "Mortal Kombat (1992)"
      }
    ],
    "relatedAbilities": [],
    "sources": [
      {
        "id": "fandom-daggers-of-denial",
        "title": "Mortal Kombat Wiki \u2014 Kobu Jutsu Tonfa Daggers",
        "url": "https://mortalkombat.fandom.com",
        "sourceType": "community-wiki",
        "verificationStatus": "verified"
      }
    ]
  },
  {
    "id": "dragon-blade",
    "name": "Kamidogu Dragon Blade",
    "category": "Melee Weapon",
    "description": "Ancient ceremonial blade housing the cosmic essence of the realms.",
    "characters": [
      {
        "id": "scorpion",
        "type": "character",
        "name": "Scorpion"
      }
    ],
    "games": [
      {
        "id": "mk-1992",
        "type": "game",
        "name": "Mortal Kombat (1992)"
      }
    ],
    "relatedAbilities": [],
    "sources": [
      {
        "id": "fandom-dragon-blade",
        "title": "Mortal Kombat Wiki \u2014 Kamidogu Dragon Blade",
        "url": "https://mortalkombat.fandom.com",
        "sourceType": "community-wiki",
        "verificationStatus": "verified"
      }
    ]
  }
];

export const organizations: Organization[] = [
  {
    "id": "shirai-ryu",
    "name": "Shirai Ryu",
    "kind": "clan",
    "description": "Renegade ninja clan of Japan founded by Takeda, historically led by Grandmaster Hanzo Hasashi.",
    "members": [
      {
        "id": "scorpion",
        "type": "character",
        "name": "Scorpion"
      }
    ],
    "rivals": [],
    "timelines": [
      {
        "id": "original",
        "type": "timeline",
        "name": "Timeline Original"
      }
    ],
    "events": [],
    "sources": [
      {
        "id": "fandom-shirai-ryu",
        "title": "Mortal Kombat Wiki \u2014 Shirai Ryu",
        "url": "https://mortalkombat.fandom.com",
        "sourceType": "community-wiki",
        "verificationStatus": "verified"
      }
    ]
  },
  {
    "id": "lin-kuei",
    "name": "Lin Kuei",
    "kind": "clan",
    "description": "Ancient Chinese stealth clan of assassins and cryomancers, historically pledged to protect Earthrealm.",
    "members": [
      {
        "id": "scorpion",
        "type": "character",
        "name": "Scorpion"
      }
    ],
    "rivals": [],
    "timelines": [
      {
        "id": "original",
        "type": "timeline",
        "name": "Timeline Original"
      }
    ],
    "events": [],
    "sources": [
      {
        "id": "fandom-lin-kuei",
        "title": "Mortal Kombat Wiki \u2014 Lin Kuei",
        "url": "https://mortalkombat.fandom.com",
        "sourceType": "community-wiki",
        "verificationStatus": "verified"
      }
    ]
  },
  {
    "id": "special-forces",
    "name": "Special Forces",
    "kind": "organization",
    "description": "Earthrealm military division led by Sonya Blade and Jax Briggs tasked with countering otherworldly threats.",
    "members": [
      {
        "id": "scorpion",
        "type": "character",
        "name": "Scorpion"
      }
    ],
    "rivals": [],
    "timelines": [
      {
        "id": "original",
        "type": "timeline",
        "name": "Timeline Original"
      }
    ],
    "events": [],
    "sources": [
      {
        "id": "fandom-special-forces",
        "title": "Mortal Kombat Wiki \u2014 Special Forces",
        "url": "https://mortalkombat.fandom.com",
        "sourceType": "community-wiki",
        "verificationStatus": "verified"
      }
    ]
  },
  {
    "id": "black-dragon",
    "name": "Black Dragon",
    "kind": "organization",
    "description": "Ruthless international mercenary syndicate led by the criminal Kano dealing in illicit weapons and extortion.",
    "members": [
      {
        "id": "scorpion",
        "type": "character",
        "name": "Scorpion"
      }
    ],
    "rivals": [],
    "timelines": [
      {
        "id": "original",
        "type": "timeline",
        "name": "Timeline Original"
      }
    ],
    "events": [],
    "sources": [
      {
        "id": "fandom-black-dragon",
        "title": "Mortal Kombat Wiki \u2014 Black Dragon",
        "url": "https://mortalkombat.fandom.com",
        "sourceType": "community-wiki",
        "verificationStatus": "verified"
      }
    ]
  },
  {
    "id": "white-lotus",
    "name": "White Lotus Society",
    "kind": "organization",
    "description": "Secret society of martial artists founded by Raiden to defend Earthrealm in Mortal Kombat tournaments.",
    "members": [
      {
        "id": "scorpion",
        "type": "character",
        "name": "Scorpion"
      }
    ],
    "rivals": [],
    "timelines": [
      {
        "id": "original",
        "type": "timeline",
        "name": "Timeline Original"
      }
    ],
    "events": [],
    "sources": [
      {
        "id": "fandom-white-lotus",
        "title": "Mortal Kombat Wiki \u2014 White Lotus Society",
        "url": "https://mortalkombat.fandom.com",
        "sourceType": "community-wiki",
        "verificationStatus": "verified"
      }
    ]
  },
  {
    "id": "brotherhood-of-shadow",
    "name": "Brotherhood of Shadow",
    "kind": "organization",
    "description": "Fanatical Netherrealm religious cult serving the fallen Elder God Shinnok and sorcerer Quan Chi.",
    "members": [
      {
        "id": "scorpion",
        "type": "character",
        "name": "Scorpion"
      }
    ],
    "rivals": [],
    "timelines": [
      {
        "id": "original",
        "type": "timeline",
        "name": "Timeline Original"
      }
    ],
    "events": [],
    "sources": [
      {
        "id": "fandom-brotherhood-of-shadow",
        "title": "Mortal Kombat Wiki \u2014 Brotherhood of Shadow",
        "url": "https://mortalkombat.fandom.com",
        "sourceType": "community-wiki",
        "verificationStatus": "verified"
      }
    ]
  },
  {
    "id": "red-dragon",
    "name": "Red Dragon",
    "kind": "organization",
    "description": "Ancient secret criminal syndicate founded by the Edenian demigod Daegon, sworn mortal enemies of the Black Dragon.",
    "members": [
      {
        "id": "scorpion",
        "type": "character",
        "name": "Scorpion"
      }
    ],
    "rivals": [],
    "timelines": [
      {
        "id": "original",
        "type": "timeline",
        "name": "Timeline Original"
      }
    ],
    "events": [],
    "sources": [
      {
        "id": "fandom-red-dragon",
        "title": "Mortal Kombat Wiki \u2014 Red Dragon",
        "url": "https://mortalkombat.fandom.com",
        "sourceType": "community-wiki",
        "verificationStatus": "verified"
      }
    ]
  },
  {
    "id": "umgadi",
    "name": "The Umgadi",
    "kind": "organization",
    "description": "Elite warrior priestesses selected from Outworld first-born daughters sworn to protect the royal family and emperor.",
    "members": [
      {
        "id": "scorpion",
        "type": "character",
        "name": "Scorpion"
      }
    ],
    "rivals": [],
    "timelines": [
      {
        "id": "original",
        "type": "timeline",
        "name": "Timeline Original"
      }
    ],
    "events": [],
    "sources": [
      {
        "id": "fandom-umgadi",
        "title": "Mortal Kombat Wiki \u2014 The Umgadi",
        "url": "https://mortalkombat.fandom.com",
        "sourceType": "community-wiki",
        "verificationStatus": "verified"
      }
    ]
  },
  {
    "id": "osh-tekk",
    "name": "Osh-Tekk Tribe",
    "kind": "organization",
    "description": "Sun-worshipping warrior civilization of Outworld historically ruled by Kotal K'atz and Emperor Kotal Kahn.",
    "members": [
      {
        "id": "scorpion",
        "type": "character",
        "name": "Scorpion"
      }
    ],
    "rivals": [],
    "timelines": [
      {
        "id": "original",
        "type": "timeline",
        "name": "Timeline Original"
      }
    ],
    "events": [],
    "sources": [
      {
        "id": "fandom-osh-tekk",
        "title": "Mortal Kombat Wiki \u2014 Osh-Tekk Tribe",
        "url": "https://mortalkombat.fandom.com",
        "sourceType": "community-wiki",
        "verificationStatus": "verified"
      }
    ]
  },
  {
    "id": "seidan-guard",
    "name": "Seidan Guard",
    "kind": "organization",
    "description": "The disciplined, authoritarian military defense force of Orderrealm commanded by Hotaru.",
    "members": [
      {
        "id": "scorpion",
        "type": "character",
        "name": "Scorpion"
      }
    ],
    "rivals": [],
    "timelines": [
      {
        "id": "original",
        "type": "timeline",
        "name": "Timeline Original"
      }
    ],
    "events": [],
    "sources": [
      {
        "id": "fandom-seidan-guard",
        "title": "Mortal Kombat Wiki \u2014 Seidan Guard",
        "url": "https://mortalkombat.fandom.com",
        "sourceType": "community-wiki",
        "verificationStatus": "verified"
      }
    ]
  }
];

export const timelines: Timeline[] = [
  {
    "id": "original",
    "name": "Timeline Original",
    "description": "Kontinuitas awal franchise dari Mortal Kombat (1992) hingga Mortal Kombat: Armageddon.",
    "order": 1,
    "games": [
      {
        "id": "mk-1992",
        "type": "game",
        "name": "Mortal Kombat (1992)"
      }
    ],
    "characterVersions": [
      {
        "character": {
          "id": "scorpion",
          "type": "character",
          "name": "Scorpion"
        },
        "versionLabel": "Hanzo Hasashi (spectre)"
      }
    ],
    "relationshipChanges": [
      "Scorpion memburu Sub-Zero (Bi-Han) atas pembantaian Shirai Ryu."
    ],
    "events": [
      {
        "id": "first-tournament",
        "type": "event",
        "name": "Turnamen Mortal Kombat di Pulau Shang Tsung"
      }
    ],
    "sources": [
      {
        "id": "fandom-timeline",
        "title": "Mortal Kombat Wiki \u2014 Timeline",
        "url": "https://mortalkombat.fandom.com/wiki/Timeline",
        "sourceType": "community-wiki",
        "verificationStatus": "verified"
      }
    ]
  },
  {
    "id": "reboot",
    "name": "Timeline Baru (Reboot MK9\u2013MK11)",
    "description": "Timeline yang tercipta setelah Raiden mengirim visi ke masa lalu; mencakup Mortal Kombat (2011), MKX, dan MK11.",
    "order": 2,
    "games": [
      {
        "id": "mk-2011",
        "type": "game",
        "name": "Mortal Kombat (2011)"
      }
    ],
    "characterVersions": [
      {
        "character": {
          "id": "scorpion",
          "type": "character",
          "name": "Scorpion"
        },
        "versionLabel": "Hanzo Hasashi (dimanipulasi Quan Chi)"
      }
    ],
    "relationshipChanges": [
      "Scorpion mengetahui kebenaran tentang pembantaian Shirai Ryu."
    ],
    "events": [],
    "sources": [
      {
        "id": "fandom-timeline",
        "title": "Mortal Kombat Wiki \u2014 Timeline",
        "url": "https://mortalkombat.fandom.com/wiki/Timeline",
        "sourceType": "community-wiki",
        "verificationStatus": "verified"
      }
    ]
  },
  {
    "id": "new-era",
    "name": "New Era (MK1 2023)",
    "description": "Sejarah baru yang dibentuk oleh Dewa Api Liu Kang, dimulai pada Mortal Kombat 1 (2023).",
    "order": 3,
    "games": [
      {
        "id": "mk1-2023",
        "type": "game",
        "name": "Mortal Kombat 1 (2023)"
      }
    ],
    "characterVersions": [
      {
        "character": {
          "id": "scorpion",
          "type": "character",
          "name": "Scorpion"
        },
        "versionLabel": "Anggota Lin Kuei (identitas baru)"
      }
    ],
    "relationshipChanges": [
      "Banyak hubungan karakter diatur ulang; rivalitas lama tidak otomatis berlaku."
    ],
    "events": [],
    "sources": [
      {
        "id": "fandom-timeline",
        "title": "Mortal Kombat Wiki \u2014 Timeline",
        "url": "https://mortalkombat.fandom.com/wiki/Timeline",
        "sourceType": "community-wiki",
        "verificationStatus": "verified"
      }
    ]
  }
];

export const storyEvents: StoryEvent[] = [
  {
    "id": "mythologies-quest",
    "title": "Bi-Han's Netherrealm Quest",
    "summary": "Sub-Zero (Bi-Han) retrieves Shinnok's sacred amulet for Quan Chi, defeating the elemental gods before realizing he aided Netherrealm darkness.",
    "detail": "Sub-Zero (Bi-Han) retrieves Shinnok's sacred amulet for Quan Chi, defeating the elemental gods before realizing he aided Netherrealm darkness.",
    "timeline": {
      "id": "original",
      "type": "timeline",
      "name": "Original Timeline"
    },
    "game": {
      "id": "mk-mythologies-1997",
      "type": "game",
      "name": "Mortal Kombat Mythologies: Sub-Zero"
    },
    "location": "Earthrealm",
    "arc": "Kisah Kanonikal Mortal Kombat",
    "eventType": "Konflik Naratif",
    "participants": [
      {
        "id": "subzero",
        "type": "character",
        "name": "Sub-Zero"
      },
      {
        "id": "quanchi",
        "type": "character",
        "name": "Quan Chi"
      },
      {
        "id": "shinnok",
        "type": "character",
        "name": "Shinnok"
      },
      {
        "id": "sareena",
        "type": "character",
        "name": "Sareena"
      }
    ],
    "chronology": 1,
    "chronologyType": "confirmed",
    "causes": [],
    "consequences": [],
    "relatedEvents": [],
    "sources": [
      {
        "id": "fandom-mythologies-quest",
        "title": "Mortal Kombat Wiki \u2014 Bi-Han's Netherrealm Quest",
        "url": "https://mortalkombat.fandom.com/wiki/Mortal_Kombat_Mythologies:_Sub-Zero",
        "sourceType": "community-wiki",
        "verificationStatus": "verified"
      }
    ],
    "verificationStatus": "verified",
    "spoiler": false
  },
  {
    "id": "first-tournament",
    "title": "Tenth Mortal Kombat Tournament",
    "summary": "Liu Kang defeats Prince Goro and Sorcerer Shang Tsung, preventing Outworld from claiming its tenth consecutive tournament victory.",
    "detail": "Liu Kang defeats Prince Goro and Sorcerer Shang Tsung, preventing Outworld from claiming its tenth consecutive tournament victory.",
    "timeline": {
      "id": "original",
      "type": "timeline",
      "name": "Original Timeline"
    },
    "game": {
      "id": "mk1-1992",
      "type": "game",
      "name": "Mortal Kombat (1992)"
    },
    "location": "Earthrealm",
    "arc": "Kisah Kanonikal Mortal Kombat",
    "eventType": "Konflik Naratif",
    "participants": [
      {
        "id": "liukang",
        "type": "character",
        "name": "Liu Kang"
      },
      {
        "id": "shangtsung",
        "type": "character",
        "name": "Shang Tsung"
      },
      {
        "id": "goro",
        "type": "character",
        "name": "Goro"
      },
      {
        "id": "raiden",
        "type": "character",
        "name": "Raiden"
      },
      {
        "id": "scorpion",
        "type": "character",
        "name": "Scorpion"
      }
    ],
    "chronology": 2,
    "chronologyType": "confirmed",
    "causes": [],
    "consequences": [],
    "relatedEvents": [],
    "sources": [
      {
        "id": "fandom-first-tournament",
        "title": "Mortal Kombat Wiki \u2014 Tenth Mortal Kombat Tournament",
        "url": "https://mortalkombat.fandom.com/wiki/Mortal_Kombat_(1992_video_game)",
        "sourceType": "community-wiki",
        "verificationStatus": "verified"
      }
    ],
    "verificationStatus": "verified",
    "spoiler": false
  },
  {
    "id": "outworld-tournament",
    "title": "Outworld Tournament Lure",
    "summary": "Shao Kahn entices Earthrealm's defenders into Outworld; Liu Kang triumphs over Shao Kahn, while Kitana discovers her clone Mileena.",
    "detail": "Shao Kahn entices Earthrealm's defenders into Outworld; Liu Kang triumphs over Shao Kahn, while Kitana discovers her clone Mileena.",
    "timeline": {
      "id": "original",
      "type": "timeline",
      "name": "Original Timeline"
    },
    "game": {
      "id": "mk2-1993",
      "type": "game",
      "name": "Mortal Kombat II"
    },
    "location": "Earthrealm",
    "arc": "Kisah Kanonikal Mortal Kombat",
    "eventType": "Konflik Naratif",
    "participants": [
      {
        "id": "shaokahn",
        "type": "character",
        "name": "Shao Kahn"
      },
      {
        "id": "liukang",
        "type": "character",
        "name": "Liu Kang"
      },
      {
        "id": "kitana",
        "type": "character",
        "name": "Kitana"
      },
      {
        "id": "mileena",
        "type": "character",
        "name": "Mileena"
      },
      {
        "id": "jax",
        "type": "character",
        "name": "Jax Briggs"
      }
    ],
    "chronology": 3,
    "chronologyType": "confirmed",
    "causes": [],
    "consequences": [],
    "relatedEvents": [],
    "sources": [
      {
        "id": "fandom-outworld-tournament",
        "title": "Mortal Kombat Wiki \u2014 Outworld Tournament Lure",
        "url": "https://mortalkombat.fandom.com/wiki/Mortal_Kombat_II",
        "sourceType": "community-wiki",
        "verificationStatus": "verified"
      }
    ],
    "verificationStatus": "verified",
    "spoiler": false
  },
  {
    "id": "earthrealm-invasion",
    "title": "Invasion of Earthrealm & Cyber Initiative",
    "summary": "Shao Kahn resurrects Queen Sindel on Earth to bypass tournament rules, merging the realms until Earth's defenders force him to retreat.",
    "detail": "Shao Kahn resurrects Queen Sindel on Earth to bypass tournament rules, merging the realms until Earth's defenders force him to retreat.",
    "timeline": {
      "id": "original",
      "type": "timeline",
      "name": "Original Timeline"
    },
    "game": {
      "id": "mk3-1995",
      "type": "game",
      "name": "Mortal Kombat 3"
    },
    "location": "Earthrealm",
    "arc": "Kisah Kanonikal Mortal Kombat",
    "eventType": "Konflik Naratif",
    "participants": [
      {
        "id": "shaokahn",
        "type": "character",
        "name": "Shao Kahn"
      },
      {
        "id": "sindel",
        "type": "character",
        "name": "Sindel"
      },
      {
        "id": "cyrax",
        "type": "character",
        "name": "Cyrax"
      },
      {
        "id": "sektor",
        "type": "character",
        "name": "Sektor"
      },
      {
        "id": "kabal",
        "type": "character",
        "name": "Kabal"
      },
      {
        "id": "stryker",
        "type": "character",
        "name": "Kurtis Stryker"
      }
    ],
    "chronology": 4,
    "chronologyType": "confirmed",
    "causes": [],
    "consequences": [],
    "relatedEvents": [],
    "sources": [
      {
        "id": "fandom-earthrealm-invasion",
        "title": "Mortal Kombat Wiki \u2014 Invasion of Earthrealm & Cyber Initiative",
        "url": "https://mortalkombat.fandom.com/wiki/Mortal_Kombat_3",
        "sourceType": "community-wiki",
        "verificationStatus": "verified"
      }
    ],
    "verificationStatus": "verified",
    "spoiler": false
  },
  {
    "id": "shinnok-invasion-mk4",
    "title": "Shinnok's War Against Edenia and Heaven",
    "summary": "Aided by the traitor Tanya, Shinnok escapes the Netherrealm, conquering Edenia and assaulting the Heavens before Raiden and Liu Kang repel him.",
    "detail": "Aided by the traitor Tanya, Shinnok escapes the Netherrealm, conquering Edenia and assaulting the Heavens before Raiden and Liu Kang repel him.",
    "timeline": {
      "id": "original",
      "type": "timeline",
      "name": "Original Timeline"
    },
    "game": {
      "id": "mk4-1997",
      "type": "game",
      "name": "Mortal Kombat 4"
    },
    "location": "Earthrealm",
    "arc": "Kisah Kanonikal Mortal Kombat",
    "eventType": "Konflik Naratif",
    "participants": [
      {
        "id": "shinnok",
        "type": "character",
        "name": "Shinnok"
      },
      {
        "id": "quanchi",
        "type": "character",
        "name": "Quan Chi"
      },
      {
        "id": "raiden",
        "type": "character",
        "name": "Raiden"
      },
      {
        "id": "tanya",
        "type": "character",
        "name": "Tanya"
      },
      {
        "id": "fujin",
        "type": "character",
        "name": "Fujin"
      },
      {
        "id": "reiko",
        "type": "character",
        "name": "Reiko"
      }
    ],
    "chronology": 5,
    "chronologyType": "confirmed",
    "causes": [],
    "consequences": [],
    "relatedEvents": [],
    "sources": [
      {
        "id": "fandom-shinnok-invasion-mk4",
        "title": "Mortal Kombat Wiki \u2014 Shinnok's War Against Edenia and Heaven",
        "url": "https://mortalkombat.fandom.com/wiki/Mortal_Kombat_4",
        "sourceType": "community-wiki",
        "verificationStatus": "verified"
      }
    ],
    "verificationStatus": "verified",
    "spoiler": false
  },
  {
    "id": "special-forces-chase",
    "title": "Black Dragon Containment Operation",
    "summary": "Major Jax Briggs pursues Kano and his lieutenants across hidden military complexes, preventing Kano from weaponizing the Eye of Chitian.",
    "detail": "Major Jax Briggs pursues Kano and his lieutenants across hidden military complexes, preventing Kano from weaponizing the Eye of Chitian.",
    "timeline": {
      "id": "original",
      "type": "timeline",
      "name": "Original Timeline"
    },
    "game": {
      "id": "mk-special-forces-2000",
      "type": "game",
      "name": "Mortal Kombat: Special Forces"
    },
    "location": "Earthrealm",
    "arc": "Kisah Kanonikal Mortal Kombat",
    "eventType": "Konflik Naratif",
    "participants": [
      {
        "id": "jax",
        "type": "character",
        "name": "Jax Briggs"
      },
      {
        "id": "kano",
        "type": "character",
        "name": "Kano"
      }
    ],
    "chronology": 6,
    "chronologyType": "confirmed",
    "causes": [],
    "consequences": [],
    "relatedEvents": [],
    "sources": [
      {
        "id": "fandom-special-forces-chase",
        "title": "Mortal Kombat Wiki \u2014 Black Dragon Containment Operation",
        "url": "https://mortalkombat.fandom.com/wiki/Mortal_Kombat:_Special_Forces",
        "sourceType": "community-wiki",
        "verificationStatus": "verified"
      }
    ],
    "verificationStatus": "verified",
    "spoiler": false
  },
  {
    "id": "deadly-alliance-formed",
    "title": "Formation of the Deadly Alliance",
    "summary": "Shang Tsung and Quan Chi join forces, assassinating Shao Kahn and Liu Kang to resurrect the Dragon King's mummified undefeatable army.",
    "detail": "Shang Tsung and Quan Chi join forces, assassinating Shao Kahn and Liu Kang to resurrect the Dragon King's mummified undefeatable army.",
    "timeline": {
      "id": "original",
      "type": "timeline",
      "name": "Original Timeline"
    },
    "game": {
      "id": "mk-deadly-alliance-2002",
      "type": "game",
      "name": "Mortal Kombat: Deadly Alliance"
    },
    "location": "Earthrealm",
    "arc": "Kisah Kanonikal Mortal Kombat",
    "eventType": "Konflik Naratif",
    "participants": [
      {
        "id": "shangtsung",
        "type": "character",
        "name": "Shang Tsung"
      },
      {
        "id": "quanchi",
        "type": "character",
        "name": "Quan Chi"
      },
      {
        "id": "liukang",
        "type": "character",
        "name": "Liu Kang"
      },
      {
        "id": "raiden",
        "type": "character",
        "name": "Raiden"
      },
      {
        "id": "kenshi",
        "type": "character",
        "name": "Kenshi"
      },
      {
        "id": "frost",
        "type": "character",
        "name": "Frost"
      }
    ],
    "chronology": 7,
    "chronologyType": "confirmed",
    "causes": [],
    "consequences": [],
    "relatedEvents": [],
    "sources": [
      {
        "id": "fandom-deadly-alliance-formed",
        "title": "Mortal Kombat Wiki \u2014 Formation of the Deadly Alliance",
        "url": "https://mortalkombat.fandom.com/wiki/Deadly_Alliance",
        "sourceType": "community-wiki",
        "verificationStatus": "verified"
      }
    ],
    "verificationStatus": "verified",
    "spoiler": false
  },
  {
    "id": "shujinko-deception",
    "title": "The Deception of Shujinko",
    "summary": "Believing he serves the Elder Gods through avatar Damashi, Shujinko spends a lifetime assembling the six Kamidogu, inadvertently resurrecting Onaga.",
    "detail": "Believing he serves the Elder Gods through avatar Damashi, Shujinko spends a lifetime assembling the six Kamidogu, inadvertently resurrecting Onaga.",
    "timeline": {
      "id": "original",
      "type": "timeline",
      "name": "Original Timeline"
    },
    "game": {
      "id": "mk-deception-2004",
      "type": "game",
      "name": "Mortal Kombat: Deception"
    },
    "location": "Earthrealm",
    "arc": "Kisah Kanonikal Mortal Kombat",
    "eventType": "Konflik Naratif",
    "participants": [
      {
        "id": "shujinko",
        "type": "character",
        "name": "Shujinko"
      },
      {
        "id": "onaga",
        "type": "character",
        "name": "Onaga"
      },
      {
        "id": "boraicho",
        "type": "character",
        "name": "Bo' Rai Cho"
      }
    ],
    "chronology": 8,
    "chronologyType": "confirmed",
    "causes": [],
    "consequences": [],
    "relatedEvents": [],
    "sources": [
      {
        "id": "fandom-shujinko-deception",
        "title": "Mortal Kombat Wiki \u2014 The Deception of Shujinko",
        "url": "https://mortalkombat.fandom.com/wiki/Shujinko",
        "sourceType": "community-wiki",
        "verificationStatus": "verified"
      }
    ],
    "verificationStatus": "verified",
    "spoiler": false
  },
  {
    "id": "resurrection-of-onaga",
    "title": "Return of the Dragon King",
    "summary": "Onaga returns from the dead to reclaim Outworld's throne, breaking the Deadly Alliance and forcing Raiden to self-destruct in a desperate futile blast.",
    "detail": "Onaga returns from the dead to reclaim Outworld's throne, breaking the Deadly Alliance and forcing Raiden to self-destruct in a desperate futile blast.",
    "timeline": {
      "id": "original",
      "type": "timeline",
      "name": "Original Timeline"
    },
    "game": {
      "id": "mk-deception-2004",
      "type": "game",
      "name": "Mortal Kombat: Deception"
    },
    "location": "Earthrealm",
    "arc": "Kisah Kanonikal Mortal Kombat",
    "eventType": "Konflik Naratif",
    "participants": [
      {
        "id": "raiden",
        "type": "character",
        "name": "Raiden"
      },
      {
        "id": "shangtsung",
        "type": "character",
        "name": "Shang Tsung"
      },
      {
        "id": "quanchi",
        "type": "character",
        "name": "Quan Chi"
      },
      {
        "id": "onaga",
        "type": "character",
        "name": "Onaga"
      },
      {
        "id": "hotaru",
        "type": "character",
        "name": "Hotaru"
      },
      {
        "id": "havik",
        "type": "character",
        "name": "Havik"
      }
    ],
    "chronology": 9,
    "chronologyType": "confirmed",
    "causes": [],
    "consequences": [],
    "relatedEvents": [],
    "sources": [
      {
        "id": "fandom-resurrection-of-onaga",
        "title": "Mortal Kombat Wiki \u2014 Return of the Dragon King",
        "url": "https://mortalkombat.fandom.com/wiki/Onaga",
        "sourceType": "community-wiki",
        "verificationStatus": "verified"
      }
    ],
    "verificationStatus": "verified",
    "spoiler": false
  },
  {
    "id": "shaolin-monks-crusade",
    "title": "Shaolin Crusade Across Outworld",
    "summary": "Liu Kang and Kung Lao battle Baraka, Goro, and Shang Tsung across Outworld wastelands following the destruction of the Shaolin Temple.",
    "detail": "Liu Kang and Kung Lao battle Baraka, Goro, and Shang Tsung across Outworld wastelands following the destruction of the Shaolin Temple.",
    "timeline": {
      "id": "original",
      "type": "timeline",
      "name": "Original Timeline"
    },
    "game": {
      "id": "mk-shaolin-monks-2005",
      "type": "game",
      "name": "Mortal Kombat: Shaolin Monks"
    },
    "location": "Earthrealm",
    "arc": "Kisah Kanonikal Mortal Kombat",
    "eventType": "Konflik Naratif",
    "participants": [
      {
        "id": "liukang",
        "type": "character",
        "name": "Liu Kang"
      },
      {
        "id": "kunglao",
        "type": "character",
        "name": "Kung Lao"
      },
      {
        "id": "baraka",
        "type": "character",
        "name": "Baraka"
      },
      {
        "id": "goro",
        "type": "character",
        "name": "Goro"
      }
    ],
    "chronology": 10,
    "chronologyType": "confirmed",
    "causes": [],
    "consequences": [],
    "relatedEvents": [],
    "sources": [
      {
        "id": "fandom-shaolin-monks-crusade",
        "title": "Mortal Kombat Wiki \u2014 Shaolin Crusade Across Outworld",
        "url": "https://mortalkombat.fandom.com/wiki/Mortal_Kombat:_Shaolin_Monks",
        "sourceType": "community-wiki",
        "verificationStatus": "verified"
      }
    ],
    "verificationStatus": "verified",
    "spoiler": false
  },
  {
    "id": "battle-of-armageddon",
    "title": "The Battle of the Pyramid of Argus",
    "summary": "All 62 warriors clash in Edenia around the Pyramid of Argus to claim Blaze's power. Shao Kahn emerges victorious, forcing Raiden to send a psychic warning into the past.",
    "detail": "All 62 warriors clash in Edenia around the Pyramid of Argus to claim Blaze's power. Shao Kahn emerges victorious, forcing Raiden to send a psychic warning into the past.",
    "timeline": {
      "id": "original",
      "type": "timeline",
      "name": "Original Timeline"
    },
    "game": {
      "id": "mk-armageddon-2006",
      "type": "game",
      "name": "Mortal Kombat: Armageddon"
    },
    "location": "Earthrealm",
    "arc": "Kisah Kanonikal Mortal Kombat",
    "eventType": "Konflik Naratif",
    "participants": [
      {
        "id": "raiden",
        "type": "character",
        "name": "Raiden"
      },
      {
        "id": "shaokahn",
        "type": "character",
        "name": "Shao Kahn"
      },
      {
        "id": "blaze",
        "type": "character",
        "name": "Blaze"
      },
      {
        "id": "taven",
        "type": "character",
        "name": "Taven"
      },
      {
        "id": "daegon",
        "type": "character",
        "name": "Daegon"
      }
    ],
    "chronology": 11,
    "chronologyType": "confirmed",
    "causes": [],
    "consequences": [],
    "relatedEvents": [],
    "sources": [
      {
        "id": "fandom-battle-of-armageddon",
        "title": "Mortal Kombat Wiki \u2014 The Battle of the Pyramid of Argus",
        "url": "https://mortalkombat.fandom.com/wiki/Battle_of_Armageddon",
        "sourceType": "community-wiki",
        "verificationStatus": "verified"
      }
    ],
    "verificationStatus": "verified",
    "spoiler": false
  },
  {
    "id": "worlds-collide-crisis",
    "title": "Worlds Collide Dimensional Merger",
    "summary": "Darkseid and Shao Kahn merge into Dark Kahn, triggering the combat rage that drives champions from both universes into mutual conflict.",
    "detail": "Darkseid and Shao Kahn merge into Dark Kahn, triggering the combat rage that drives champions from both universes into mutual conflict.",
    "timeline": {
      "id": "original",
      "type": "timeline",
      "name": "Original Timeline"
    },
    "game": {
      "id": "mk-vs-dc-2008",
      "type": "game",
      "name": "Mortal Kombat vs. DC Universe"
    },
    "location": "Earthrealm",
    "arc": "Kisah Kanonikal Mortal Kombat",
    "eventType": "Konflik Naratif",
    "participants": [
      {
        "id": "raiden",
        "type": "character",
        "name": "Raiden"
      },
      {
        "id": "shaokahn",
        "type": "character",
        "name": "Shao Kahn"
      },
      {
        "id": "scorpion",
        "type": "character",
        "name": "Scorpion"
      },
      {
        "id": "subzero",
        "type": "character",
        "name": "Sub-Zero"
      }
    ],
    "chronology": 12,
    "chronologyType": "confirmed",
    "causes": [],
    "consequences": [],
    "relatedEvents": [],
    "sources": [
      {
        "id": "fandom-worlds-collide-crisis",
        "title": "Mortal Kombat Wiki \u2014 Worlds Collide Dimensional Merger",
        "url": "https://mortalkombat.fandom.com/wiki/Mortal_Kombat_vs._DC_Universe",
        "sourceType": "community-wiki",
        "verificationStatus": "verified"
      }
    ],
    "verificationStatus": "verified",
    "spoiler": false
  },
  {
    "id": "raiden-vision-reset",
    "title": "Raiden's Temporal Message (He Must Win)",
    "summary": "Raiden alters history during the first tournament upon receiving visions from his future dying self during the Armageddon climax.",
    "detail": "Raiden alters history during the first tournament upon receiving visions from his future dying self during the Armageddon climax.",
    "timeline": {
      "id": "reboot",
      "type": "timeline",
      "name": "Reboot Timeline"
    },
    "game": {
      "id": "mk9-2011",
      "type": "game",
      "name": "Mortal Kombat (2011)"
    },
    "location": "Earthrealm",
    "arc": "Kisah Kanonikal Mortal Kombat",
    "eventType": "Konflik Naratif",
    "participants": [
      {
        "id": "raiden",
        "type": "character",
        "name": "Raiden"
      },
      {
        "id": "liukang",
        "type": "character",
        "name": "Liu Kang"
      },
      {
        "id": "shaokahn",
        "type": "character",
        "name": "Shao Kahn"
      }
    ],
    "chronology": 13,
    "chronologyType": "confirmed",
    "causes": [],
    "consequences": [],
    "relatedEvents": [],
    "sources": [
      {
        "id": "fandom-raiden-vision-reset",
        "title": "Mortal Kombat Wiki \u2014 Raiden's Temporal Message (He Must Win)",
        "url": "https://mortalkombat.fandom.com/wiki/Mortal_Kombat_(2011_video_game)",
        "sourceType": "community-wiki",
        "verificationStatus": "verified"
      }
    ],
    "verificationStatus": "verified",
    "spoiler": false
  },
  {
    "id": "lin-kuei-cyber-initiative",
    "title": "The Cyber Initiative in the Reboot",
    "summary": "The Lin Kuei converts its assassins into emotionless cybernetic units; Kuai Liang is captured and automated as Cyber Sub-Zero while Smoke escapes.",
    "detail": "The Lin Kuei converts its assassins into emotionless cybernetic units; Kuai Liang is captured and automated as Cyber Sub-Zero while Smoke escapes.",
    "timeline": {
      "id": "reboot",
      "type": "timeline",
      "name": "Reboot Timeline"
    },
    "game": {
      "id": "mk9-2011",
      "type": "game",
      "name": "Mortal Kombat (2011)"
    },
    "location": "Earthrealm",
    "arc": "Kisah Kanonikal Mortal Kombat",
    "eventType": "Konflik Naratif",
    "participants": [
      {
        "id": "subzero",
        "type": "character",
        "name": "Sub-Zero"
      },
      {
        "id": "cyrax",
        "type": "character",
        "name": "Cyrax"
      },
      {
        "id": "sektor",
        "type": "character",
        "name": "Sektor"
      },
      {
        "id": "smoke",
        "type": "character",
        "name": "Smoke"
      }
    ],
    "chronology": 14,
    "chronologyType": "confirmed",
    "causes": [],
    "consequences": [],
    "relatedEvents": [],
    "sources": [
      {
        "id": "fandom-lin-kuei-cyber-initiative",
        "title": "Mortal Kombat Wiki \u2014 The Cyber Initiative in the Reboot",
        "url": "https://mortalkombat.fandom.com/wiki/Cyber_Initiative",
        "sourceType": "community-wiki",
        "verificationStatus": "verified"
      }
    ],
    "verificationStatus": "verified",
    "spoiler": false
  },
  {
    "id": "sindel-massacre",
    "title": "The Slaughter of Earthrealm's Champions",
    "summary": "Empowered by Shang Tsung's soul, resurrected Queen Sindel massacres the Earthrealm defenders, leading to their resurrection as Netherrealm revenants.",
    "detail": "Empowered by Shang Tsung's soul, resurrected Queen Sindel massacres the Earthrealm defenders, leading to their resurrection as Netherrealm revenants.",
    "timeline": {
      "id": "reboot",
      "type": "timeline",
      "name": "Reboot Timeline"
    },
    "game": {
      "id": "mk9-2011",
      "type": "game",
      "name": "Mortal Kombat (2011)"
    },
    "location": "Earthrealm",
    "arc": "Kisah Kanonikal Mortal Kombat",
    "eventType": "Konflik Naratif",
    "participants": [
      {
        "id": "sindel",
        "type": "character",
        "name": "Sindel"
      },
      {
        "id": "jax",
        "type": "character",
        "name": "Jax Briggs"
      },
      {
        "id": "jade",
        "type": "character",
        "name": "Jade"
      },
      {
        "id": "kabal",
        "type": "character",
        "name": "Kabal"
      },
      {
        "id": "stryker",
        "type": "character",
        "name": "Kurtis Stryker"
      },
      {
        "id": "nightwolf",
        "type": "character",
        "name": "Nightwolf"
      }
    ],
    "chronology": 15,
    "chronologyType": "confirmed",
    "causes": [],
    "consequences": [],
    "relatedEvents": [],
    "sources": [
      {
        "id": "fandom-sindel-massacre",
        "title": "Mortal Kombat Wiki \u2014 The Slaughter of Earthrealm's Champions",
        "url": "https://mortalkombat.fandom.com/wiki/Mortal_Kombat_(2011_video_game)",
        "sourceType": "community-wiki",
        "verificationStatus": "verified"
      }
    ],
    "verificationStatus": "verified",
    "spoiler": false
  },
  {
    "id": "shinnok-netherrealm-war",
    "title": "Netherrealm War Against Earthrealm",
    "summary": "Fallen Elder God Shinnok leads Netherrealm revenants in an assault on the Jinsei Chamber before being trapped inside his own amulet by Johnny Cage.",
    "detail": "Fallen Elder God Shinnok leads Netherrealm revenants in an assault on the Jinsei Chamber before being trapped inside his own amulet by Johnny Cage.",
    "timeline": {
      "id": "reboot",
      "type": "timeline",
      "name": "Reboot Timeline"
    },
    "game": {
      "id": "mkx-2015",
      "type": "game",
      "name": "Mortal Kombat X"
    },
    "location": "Earthrealm",
    "arc": "Kisah Kanonikal Mortal Kombat",
    "eventType": "Konflik Naratif",
    "participants": [
      {
        "id": "shinnok",
        "type": "character",
        "name": "Shinnok"
      },
      {
        "id": "raiden",
        "type": "character",
        "name": "Raiden"
      },
      {
        "id": "quanchi",
        "type": "character",
        "name": "Quan Chi"
      },
      {
        "id": "johnnycage",
        "type": "character",
        "name": "Johnny Cage"
      },
      {
        "id": "sonyablade",
        "type": "character",
        "name": "Sonya Blade"
      }
    ],
    "chronology": 16,
    "chronologyType": "confirmed",
    "causes": [],
    "consequences": [],
    "relatedEvents": [],
    "sources": [
      {
        "id": "fandom-shinnok-netherrealm-war",
        "title": "Mortal Kombat Wiki \u2014 Netherrealm War Against Earthrealm",
        "url": "https://mortalkombat.fandom.com/wiki/Netherrealm_War",
        "sourceType": "community-wiki",
        "verificationStatus": "verified"
      }
    ],
    "verificationStatus": "verified",
    "spoiler": false
  },
  {
    "id": "outworld-civil-war",
    "title": "The Outworld Civil War",
    "summary": "Kotal Kahn overthrows Mileena's chaotic reign; Cassie Cage's team negotiates an alliance while D'Vorah executes Mileena.",
    "detail": "Kotal Kahn overthrows Mileena's chaotic reign; Cassie Cage's team negotiates an alliance while D'Vorah executes Mileena.",
    "timeline": {
      "id": "reboot",
      "type": "timeline",
      "name": "Reboot Timeline"
    },
    "game": {
      "id": "mkx-2015",
      "type": "game",
      "name": "Mortal Kombat X"
    },
    "location": "Earthrealm",
    "arc": "Kisah Kanonikal Mortal Kombat",
    "eventType": "Konflik Naratif",
    "participants": [
      {
        "id": "kotalkahn",
        "type": "character",
        "name": "Kotal Kahn"
      },
      {
        "id": "mileena",
        "type": "character",
        "name": "Mileena"
      },
      {
        "id": "dvorah",
        "type": "character",
        "name": "D'Vorah"
      },
      {
        "id": "cassiecage",
        "type": "character",
        "name": "Cassie Cage"
      },
      {
        "id": "erronblack",
        "type": "character",
        "name": "Erron Black"
      }
    ],
    "chronology": 17,
    "chronologyType": "confirmed",
    "causes": [],
    "consequences": [],
    "relatedEvents": [],
    "sources": [
      {
        "id": "fandom-outworld-civil-war",
        "title": "Mortal Kombat Wiki \u2014 The Outworld Civil War",
        "url": "https://mortalkombat.fandom.com/wiki/Outworld_Civil_War",
        "sourceType": "community-wiki",
        "verificationStatus": "verified"
      }
    ],
    "verificationStatus": "verified",
    "spoiler": false
  },
  {
    "id": "pact-of-fire-and-ice",
    "title": "Pact of Fire and Ice",
    "summary": "Kuai Liang reveals Quan Chi's deceit to Hanzo Hasashi at the Shirai Ryu Fire Garden, establishing peace between the clans.",
    "detail": "Kuai Liang reveals Quan Chi's deceit to Hanzo Hasashi at the Shirai Ryu Fire Garden, establishing peace between the clans.",
    "timeline": {
      "id": "reboot",
      "type": "timeline",
      "name": "Reboot Timeline"
    },
    "game": {
      "id": "mkx-2015",
      "type": "game",
      "name": "Mortal Kombat X"
    },
    "location": "Earthrealm",
    "arc": "Kisah Kanonikal Mortal Kombat",
    "eventType": "Konflik Naratif",
    "participants": [
      {
        "id": "scorpion",
        "type": "character",
        "name": "Scorpion"
      },
      {
        "id": "subzero",
        "type": "character",
        "name": "Sub-Zero"
      }
    ],
    "chronology": 18,
    "chronologyType": "confirmed",
    "causes": [],
    "consequences": [],
    "relatedEvents": [],
    "sources": [
      {
        "id": "fandom-pact-of-fire-and-ice",
        "title": "Mortal Kombat Wiki \u2014 Pact of Fire and Ice",
        "url": "https://mortalkombat.fandom.com/wiki/Mortal_Kombat_X",
        "sourceType": "community-wiki",
        "verificationStatus": "verified"
      }
    ],
    "verificationStatus": "verified",
    "spoiler": false
  },
  {
    "id": "cassie-defeats-shinnok",
    "title": "Fall of Corrupted Shinnok",
    "summary": "Cassie Cage awakens her ancient green shadow halo energy to defeat Corrupted Shinnok and purify the Earthrealm Jinsei.",
    "detail": "Cassie Cage awakens her ancient green shadow halo energy to defeat Corrupted Shinnok and purify the Earthrealm Jinsei.",
    "timeline": {
      "id": "reboot",
      "type": "timeline",
      "name": "Reboot Timeline"
    },
    "game": {
      "id": "mkx-2015",
      "type": "game",
      "name": "Mortal Kombat X"
    },
    "location": "Earthrealm",
    "arc": "Kisah Kanonikal Mortal Kombat",
    "eventType": "Konflik Naratif",
    "participants": [
      {
        "id": "cassiecage",
        "type": "character",
        "name": "Cassie Cage"
      },
      {
        "id": "shinnok",
        "type": "character",
        "name": "Shinnok"
      },
      {
        "id": "johnnycage",
        "type": "character",
        "name": "Johnny Cage"
      },
      {
        "id": "jacqui",
        "type": "character",
        "name": "Jacqui Briggs"
      },
      {
        "id": "takeda",
        "type": "character",
        "name": "Takeda Takahashi"
      },
      {
        "id": "kungjin",
        "type": "character",
        "name": "Kung Jin"
      }
    ],
    "chronology": 19,
    "chronologyType": "confirmed",
    "causes": [],
    "consequences": [],
    "relatedEvents": [],
    "sources": [
      {
        "id": "fandom-cassie-defeats-shinnok",
        "title": "Mortal Kombat Wiki \u2014 Fall of Corrupted Shinnok",
        "url": "https://mortalkombat.fandom.com/wiki/Mortal_Kombat_X",
        "sourceType": "community-wiki",
        "verificationStatus": "verified"
      }
    ],
    "verificationStatus": "verified",
    "spoiler": false
  },
  {
    "id": "time-merger",
    "title": "Kronika's Temporal Convergence",
    "summary": "Kronika collapses time, bringing younger past versions of warriors into the present era to rewrite history without Raiden.",
    "detail": "Kronika collapses time, bringing younger past versions of warriors into the present era to rewrite history without Raiden.",
    "timeline": {
      "id": "reboot",
      "type": "timeline",
      "name": "Reboot Timeline"
    },
    "game": {
      "id": "mk11-2019",
      "type": "game",
      "name": "Mortal Kombat 11"
    },
    "location": "Earthrealm",
    "arc": "Kisah Kanonikal Mortal Kombat",
    "eventType": "Konflik Naratif",
    "participants": [
      {
        "id": "kronika",
        "type": "character",
        "name": "Kronika"
      },
      {
        "id": "raiden",
        "type": "character",
        "name": "Raiden"
      },
      {
        "id": "scorpion",
        "type": "character",
        "name": "Scorpion"
      },
      {
        "id": "geras",
        "type": "character",
        "name": "Geras"
      },
      {
        "id": "cetrion",
        "type": "character",
        "name": "Cetrion"
      }
    ],
    "chronology": 20,
    "chronologyType": "confirmed",
    "causes": [],
    "consequences": [],
    "relatedEvents": [],
    "sources": [
      {
        "id": "fandom-time-merger",
        "title": "Mortal Kombat Wiki \u2014 Kronika's Temporal Convergence",
        "url": "https://mortalkombat.fandom.com/wiki/Mortal_Kombat_11",
        "sourceType": "community-wiki",
        "verificationStatus": "verified"
      }
    ],
    "verificationStatus": "verified",
    "spoiler": false
  },
  {
    "id": "dvorah-poisons-hanzo",
    "title": "Assassination of Grandmaster Hanzo Hasashi",
    "summary": "D'Vorah mortally poisons Grandmaster Hanzo Hasashi; dying in the arms of his past specter self, Hanzo convinces him to choose honor.",
    "detail": "D'Vorah mortally poisons Grandmaster Hanzo Hasashi; dying in the arms of his past specter self, Hanzo convinces him to choose honor.",
    "timeline": {
      "id": "reboot",
      "type": "timeline",
      "name": "Reboot Timeline"
    },
    "game": {
      "id": "mk11-2019",
      "type": "game",
      "name": "Mortal Kombat 11"
    },
    "location": "Earthrealm",
    "arc": "Kisah Kanonikal Mortal Kombat",
    "eventType": "Konflik Naratif",
    "participants": [
      {
        "id": "dvorah",
        "type": "character",
        "name": "D'Vorah"
      },
      {
        "id": "scorpion",
        "type": "character",
        "name": "Scorpion"
      }
    ],
    "chronology": 21,
    "chronologyType": "confirmed",
    "causes": [],
    "consequences": [],
    "relatedEvents": [],
    "sources": [
      {
        "id": "fandom-dvorah-poisons-hanzo",
        "title": "Mortal Kombat Wiki \u2014 Assassination of Grandmaster Hanzo Hasashi",
        "url": "https://mortalkombat.fandom.com/wiki/Hanzo_Hasashi",
        "sourceType": "community-wiki",
        "verificationStatus": "verified"
      }
    ],
    "verificationStatus": "verified",
    "spoiler": false
  },
  {
    "id": "battle-for-the-hourglass",
    "title": "Battle for the Keep of Time",
    "summary": "Combined allied armies storm Kronika's fortress; Fire God Liu Kang defeats Kronika to seize control of the Hourglass.",
    "detail": "Combined allied armies storm Kronika's fortress; Fire God Liu Kang defeats Kronika to seize control of the Hourglass.",
    "timeline": {
      "id": "reboot",
      "type": "timeline",
      "name": "Reboot Timeline"
    },
    "game": {
      "id": "mk11-2019",
      "type": "game",
      "name": "Mortal Kombat 11"
    },
    "location": "Earthrealm",
    "arc": "Kisah Kanonikal Mortal Kombat",
    "eventType": "Konflik Naratif",
    "participants": [
      {
        "id": "kronika",
        "type": "character",
        "name": "Kronika"
      },
      {
        "id": "liukang",
        "type": "character",
        "name": "Liu Kang"
      },
      {
        "id": "raiden",
        "type": "character",
        "name": "Raiden"
      },
      {
        "id": "kitana",
        "type": "character",
        "name": "Kitana"
      },
      {
        "id": "geras",
        "type": "character",
        "name": "Geras"
      }
    ],
    "chronology": 22,
    "chronologyType": "confirmed",
    "causes": [],
    "consequences": [],
    "relatedEvents": [],
    "sources": [
      {
        "id": "fandom-battle-for-the-hourglass",
        "title": "Mortal Kombat Wiki \u2014 Battle for the Keep of Time",
        "url": "https://mortalkombat.fandom.com/wiki/Hourglass",
        "sourceType": "community-wiki",
        "verificationStatus": "verified"
      }
    ],
    "verificationStatus": "verified",
    "spoiler": false
  },
  {
    "id": "creation-of-new-era",
    "title": "Birth of the New Era",
    "summary": "Fire God Liu Kang uses the Hourglass to reset the universe, creating a new cycle where Kombatants receive new destinies.",
    "detail": "Fire God Liu Kang uses the Hourglass to reset the universe, creating a new cycle where Kombatants receive new destinies.",
    "timeline": {
      "id": "new-era",
      "type": "timeline",
      "name": "New Era"
    },
    "game": {
      "id": "mk1-2023",
      "type": "game",
      "name": "Mortal Kombat 1 (2023)"
    },
    "location": "Earthrealm",
    "arc": "Kisah Kanonikal Mortal Kombat",
    "eventType": "Konflik Naratif",
    "participants": [
      {
        "id": "liukang",
        "type": "character",
        "name": "Liu Kang"
      },
      {
        "id": "geras",
        "type": "character",
        "name": "Geras"
      },
      {
        "id": "raiden",
        "type": "character",
        "name": "Raiden"
      }
    ],
    "chronology": 23,
    "chronologyType": "confirmed",
    "causes": [],
    "consequences": [],
    "relatedEvents": [],
    "sources": [
      {
        "id": "fandom-creation-of-new-era",
        "title": "Mortal Kombat Wiki \u2014 Birth of the New Era",
        "url": "https://www.mortalkombat.com/en-us",
        "sourceType": "community-wiki",
        "verificationStatus": "verified"
      }
    ],
    "verificationStatus": "verified",
    "spoiler": false
  },
  {
    "id": "unmasking-of-titan-shang",
    "title": "Crisis of the Alternate Timelines",
    "summary": "Liu Kang discovers that his timeline victory also generated an alternate timeline where Titan Shang Tsung reigns supreme, igniting a multiversal war.",
    "detail": "Liu Kang discovers that his timeline victory also generated an alternate timeline where Titan Shang Tsung reigns supreme, igniting a multiversal war.",
    "timeline": {
      "id": "new-era",
      "type": "timeline",
      "name": "New Era"
    },
    "game": {
      "id": "mk1-2023",
      "type": "game",
      "name": "Mortal Kombat 1 (2023)"
    },
    "location": "Earthrealm",
    "arc": "Kisah Kanonikal Mortal Kombat",
    "eventType": "Konflik Naratif",
    "participants": [
      {
        "id": "liukang",
        "type": "character",
        "name": "Liu Kang"
      },
      {
        "id": "shangtsung",
        "type": "character",
        "name": "Shang Tsung"
      },
      {
        "id": "subzero",
        "type": "character",
        "name": "Sub-Zero"
      },
      {
        "id": "scorpion",
        "type": "character",
        "name": "Scorpion"
      }
    ],
    "chronology": 24,
    "chronologyType": "confirmed",
    "causes": [],
    "consequences": [],
    "relatedEvents": [],
    "sources": [
      {
        "id": "fandom-unmasking-of-titan-shang",
        "title": "Mortal Kombat Wiki \u2014 Crisis of the Alternate Timelines",
        "url": "https://www.mortalkombat.com/en-us",
        "sourceType": "community-wiki",
        "verificationStatus": "verified"
      }
    ],
    "verificationStatus": "verified",
    "spoiler": false
  },
  {
    "id": "onslaught-mobilization",
    "title": "The Shinnok Relic Onslaught",
    "summary": "Strike squads of Earthrealm and Outworld champions assemble across dimensions to intercept Shinnok's resurging dark talismans.",
    "detail": "Strike squads of Earthrealm and Outworld champions assemble across dimensions to intercept Shinnok's resurging dark talismans.",
    "timeline": {
      "id": "new-era",
      "type": "timeline",
      "name": "New Era"
    },
    "game": {
      "id": "mk-onslaught-2023",
      "type": "game",
      "name": "Mortal Kombat: Onslaught"
    },
    "location": "Earthrealm",
    "arc": "Kisah Kanonikal Mortal Kombat",
    "eventType": "Konflik Naratif",
    "participants": [
      {
        "id": "raiden",
        "type": "character",
        "name": "Raiden"
      },
      {
        "id": "scorpion",
        "type": "character",
        "name": "Scorpion"
      },
      {
        "id": "subzero",
        "type": "character",
        "name": "Sub-Zero"
      },
      {
        "id": "shinnok",
        "type": "character",
        "name": "Shinnok"
      }
    ],
    "chronology": 25,
    "chronologyType": "confirmed",
    "causes": [],
    "consequences": [],
    "relatedEvents": [],
    "sources": [
      {
        "id": "fandom-onslaught-mobilization",
        "title": "Mortal Kombat Wiki \u2014 The Shinnok Relic Onslaught",
        "url": "https://mortalkombat.fandom.com/wiki/Mortal_Kombat:_Onslaught",
        "sourceType": "community-wiki",
        "verificationStatus": "verified"
      }
    ],
    "verificationStatus": "verified",
    "spoiler": false
  }
];

export const STORY_ARCS = Array.from(new Set(storyEvents.map((e) => e.arc).filter(Boolean))) as string[];

export const SEARCH_PROMPTS = [
  "Who is Scorpion?",
  "Why are Scorpion and Sub-Zero enemies?",
  "Which events changed the timeline?",
  "Karakter yang menggunakan api",
  "Anggota klan Lin Kuei",
  "Karakter dengan kemampuan teleportasi",
];
