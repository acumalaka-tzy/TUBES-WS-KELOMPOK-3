"""
Mortal Kombat Canonical Dataset Store
Covers all standalone games, base-roster characters, abilities, weapons,
clans, realms, story events, and relationships adhering to PRD v1.5.
Excludes ALL DLC, expansion packs, Kombat Packs, and guest additions.
"""

# ----------------------------------------------------
# 1. STANDALONE GAMES (23 Base Releases per PRD Section 6.1)
# ----------------------------------------------------
GAMES = [
    # Classic Era
    {
        "id": "game-mk1-1992",
        "name": "Mortal Kombat (1992)",
        "releaseDate": "1992-10-08",
        "era": "Classic Era",
        "platforms": ["Arcade", "SNES", "Sega Genesis", "Game Boy"],
        "description": "The landmark tournament fighting game created by Ed Boon and John Tobias that introduced digital sprites, Fatalities, and legendary martial lore.",
        "isStandalone": True,
        "isDLC": False,
        "sourceURL": "https://mortalkombat.fandom.com/wiki/Mortal_Kombat_(1992_video_game)"
    },
    {
        "id": "game-mk2-1993",
        "name": "Mortal Kombat II",
        "releaseDate": "1993-04-01",
        "era": "Classic Era",
        "platforms": ["Arcade", "SNES", "Sega Genesis", "PlayStation"],
        "description": "Sequel set in Outworld with expanded roster, Babalities, Friendships, and the introduction of Shao Kahn, Kitana, and Mileena.",
        "isStandalone": True,
        "isDLC": False,
        "sourceURL": "https://mortalkombat.fandom.com/wiki/Mortal_Kombat_II"
    },
    {
        "id": "game-mk3-1995",
        "name": "Mortal Kombat 3",
        "releaseDate": "1995-04-15",
        "era": "Classic Era",
        "platforms": ["Arcade", "SNES", "Sega Genesis", "PlayStation"],
        "description": "Chronicles Shao Kahn's invasion of Earthrealm through Sindel's resurrection, introducing Cyber Ninjas (Cyrax, Sektor, Smoke) and Kabal.",
        "isStandalone": True,
        "isDLC": False,
        "sourceURL": "https://mortalkombat.fandom.com/wiki/Mortal_Kombat_3"
    },
    {
        "id": "game-umk3-1995",
        "name": "Ultimate Mortal Kombat 3",
        "releaseDate": "1995-10-06",
        "era": "Classic Era",
        "platforms": ["Arcade", "Sega Saturn", "SNES", "Sega Genesis"],
        "description": "Standalone arcade update bringing back Scorpion, Kitana, Jade, and classic masked ninjas with refined combo mechanics.",
        "isStandalone": True,
        "isDLC": False,
        "sourceURL": "https://mortalkombat.fandom.com/wiki/Ultimate_Mortal_Kombat_3"
    },
    {
        "id": "game-mkt-1996",
        "name": "Mortal Kombat Trilogy",
        "releaseDate": "1996-10-10",
        "era": "Classic Era",
        "platforms": ["PlayStation", "Nintendo 64", "Sega Saturn", "PC"],
        "description": "Standalone anthology fighting release featuring almost every character and background from the first three games plus the Aggressor bar.",
        "isStandalone": True,
        "isDLC": False,
        "sourceURL": "https://mortalkombat.fandom.com/wiki/Mortal_Kombat_Trilogy"
    },
    # 3D Era
    {
        "id": "game-mk4-1997",
        "name": "Mortal Kombat 4",
        "releaseDate": "1997-10-15",
        "era": "3D Era",
        "platforms": ["Arcade", "PlayStation", "Nintendo 64", "PC"],
        "description": "The first 3D installment focusing on the fallen Elder God Shinnok's war, introducing real-time 3D environments and drawn weapon combat.",
        "isStandalone": True,
        "isDLC": False,
        "sourceURL": "https://mortalkombat.fandom.com/wiki/Mortal_Kombat_4"
    },
    {
        "id": "game-mk-gold-1999",
        "name": "Mortal Kombat Gold",
        "releaseDate": "1999-09-09",
        "era": "3D Era",
        "platforms": ["Sega Dreamcast"],
        "description": "Standalone enhanced 3D release of MK4 for Dreamcast adding Kitana, Mileena, Cyrax, Kung Lao, and Baraka to the Shinnok conflict.",
        "isStandalone": True,
        "isDLC": False,
        "sourceURL": "https://mortalkombat.fandom.com/wiki/Mortal_Kombat_Gold"
    },
    {
        "id": "game-mk-deadly-alliance-2002",
        "name": "Mortal Kombat: Deadly Alliance",
        "releaseDate": "2002-11-16",
        "era": "3D Era",
        "platforms": ["PlayStation 2", "Xbox", "GameCube"],
        "description": "Reinvented combat mechanics with three unique fighting styles per warrior and the dark alliance between sorcerers Shang Tsung and Quan Chi.",
        "isStandalone": True,
        "isDLC": False,
        "sourceURL": "https://mortalkombat.fandom.com/wiki/Mortal_Kombat:_Deadly_Alliance"
    },
    {
        "id": "game-mk-tournament-edition-2003",
        "name": "Mortal Kombat: Tournament Edition",
        "releaseDate": "2003-08-25",
        "era": "3D Era",
        "platforms": ["Game Boy Advance"],
        "description": "Standalone handheld sister release to Deadly Alliance introducing Sareena, Mavado, and Bo' Rai Cho in dedicated mobile 3D combat.",
        "isStandalone": True,
        "isDLC": False,
        "sourceURL": "https://mortalkombat.fandom.com/wiki/Mortal_Kombat:_Tournament_Edition"
    },
    {
        "id": "game-mk-deception-2004",
        "name": "Mortal Kombat: Deception",
        "releaseDate": "2004-10-04",
        "era": "3D Era",
        "platforms": ["PlayStation 2", "Xbox", "GameCube"],
        "description": "Features the return of the Dragon King Onaga, death traps, Puzzle/Chess Kombat, and the open-world RPG Konquest adventure mode.",
        "isStandalone": True,
        "isDLC": False,
        "sourceURL": "https://mortalkombat.fandom.com/wiki/Mortal_Kombat:_Deception"
    },
    {
        "id": "game-mk-unchained-2006",
        "name": "Mortal Kombat: Unchained",
        "releaseDate": "2006-11-13",
        "era": "3D Era",
        "platforms": ["PlayStation Portable"],
        "description": "Standalone handheld adaptation of Deception for PSP featuring exclusive access to Kitana, Jax, Frost, and Blaze in base roster.",
        "isStandalone": True,
        "isDLC": False,
        "sourceURL": "https://mortalkombat.fandom.com/wiki/Mortal_Kombat:_Unchained"
    },
    {
        "id": "game-mk-armageddon-2006",
        "name": "Mortal Kombat: Armageddon",
        "releaseDate": "2006-10-11",
        "era": "3D Era",
        "platforms": ["PlayStation 2", "Xbox", "Wii"],
        "description": "Climax of the original continuity featuring all 62 fighters competing at the Pyramid of Argus, Kreate-A-Fighter, and Motor Kombat.",
        "isStandalone": True,
        "isDLC": False,
        "sourceURL": "https://mortalkombat.fandom.com/wiki/Mortal_Kombat:_Armageddon"
    },
    # Spin-Offs & Action Releases
    {
        "id": "game-mk-mythologies-1997",
        "name": "Mortal Kombat Mythologies: Sub-Zero",
        "releaseDate": "1997-10-01",
        "era": "Spin-off",
        "platforms": ["PlayStation", "Nintendo 64"],
        "description": "Side-scrolling action-adventure prequel following Bi-Han retrieving Shinnok's sacred amulet across Earthrealm and the Netherrealm.",
        "isStandalone": True,
        "isDLC": False,
        "sourceURL": "https://mortalkombat.fandom.com/wiki/Mortal_Kombat_Mythologies:_Sub-Zero"
    },
    {
        "id": "game-mk-special-forces-2000",
        "name": "Mortal Kombat: Special Forces",
        "releaseDate": "2000-06-29",
        "era": "Spin-off",
        "platforms": ["PlayStation"],
        "description": "Third-person action spin-off chronicling Major Jackson 'Jax' Briggs pursuing Kano and the Black Dragon syndicate across urban strongholds.",
        "isStandalone": True,
        "isDLC": False,
        "sourceURL": "https://mortalkombat.fandom.com/wiki/Mortal_Kombat:_Special_Forces"
    },
    {
        "id": "game-mk-shaolin-monks-2005",
        "name": "Mortal Kombat: Shaolin Monks",
        "releaseDate": "2005-09-16",
        "era": "Spin-off",
        "platforms": ["PlayStation 2", "Xbox"],
        "description": "Co-op beat-'em-up action adventure following Liu Kang and Kung Lao through the demonic hazards of Outworld during the MKII tournament.",
        "isStandalone": True,
        "isDLC": False,
        "sourceURL": "https://mortalkombat.fandom.com/wiki/Mortal_Kombat:_Shaolin_Monks"
    },
    {
        "id": "game-mk-vs-dc-2008",
        "name": "Mortal Kombat vs. DC Universe",
        "releaseDate": "2008-11-16",
        "era": "Spin-off",
        "platforms": ["PlayStation 3", "Xbox 360"],
        "description": "Standalone crossover fighting game where cataclysmic world-merger pits Kombatants against DC Comics superheroes and villains.",
        "isStandalone": True,
        "isDLC": False,
        "sourceURL": "https://mortalkombat.fandom.com/wiki/Mortal_Kombat_vs._DC_Universe"
    },
    {
        "id": "game-mk-arcade-kollection-2011",
        "name": "Mortal Kombat Arcade Kollection",
        "releaseDate": "2011-08-31",
        "era": "Spin-off",
        "platforms": ["PlayStation 3", "Xbox 360", "PC"],
        "description": "Standalone arcade anthology package uniting pristine arcade emulations of MK1, MK2, and Ultimate Mortal Kombat 3 with online matchmaking.",
        "isStandalone": True,
        "isDLC": False,
        "sourceURL": "https://mortalkombat.fandom.com/wiki/Mortal_Kombat_Arcade_Kollection"
    },
    # Reboot Era
    {
        "id": "game-mk9-2011",
        "name": "Mortal Kombat (2011)",
        "releaseDate": "2011-04-19",
        "era": "Reboot Era",
        "platforms": ["PlayStation 3", "Xbox 360", "PC"],
        "description": "Timeline reset orchestrated by Raiden rewinding the events of MK1 through MK3, introducing the super meter and cinematic Story Mode.",
        "isStandalone": True,
        "isDLC": False,
        "sourceURL": "https://mortalkombat.fandom.com/wiki/Mortal_Kombat_(2011_video_game)"
    },
    {
        "id": "game-mkx-2015",
        "name": "Mortal Kombat X",
        "releaseDate": "2015-04-14",
        "era": "Reboot Era",
        "platforms": ["PlayStation 4", "Xbox One", "PC"],
        "description": "Set 25 years after MK9, introducing three distinct character combat variations and the next generation of Earthrealm Kombatants.",
        "isStandalone": True,
        "isDLC": False,
        "sourceURL": "https://mortalkombat.fandom.com/wiki/Mortal_Kombat_X"
    },
    {
        "id": "game-mk-mobile-2015",
        "name": "Mortal Kombat Mobile",
        "releaseDate": "2015-04-08",
        "era": "Reboot Era",
        "platforms": ["iOS", "Android"],
        "description": "Standalone free-to-play mobile collectible card fighter and battle team game with touch-based gestures and persistent cross-game events.",
        "isStandalone": True,
        "isDLC": False,
        "sourceURL": "https://mortalkombat.fandom.com/wiki/Mortal_Kombat_Mobile"
    },
    {
        "id": "game-mk11-2019",
        "name": "Mortal Kombat 11",
        "releaseDate": "2019-04-23",
        "era": "Reboot Era",
        "platforms": ["PlayStation 4", "Xbox One", "Nintendo Switch", "PC"],
        "description": "Time-bending conflict against Keeper of Time Kronika, introducing Krushing Blows, Fatal Blows, and deep cosmetic gear customization.",
        "isStandalone": True,
        "isDLC": False,
        "sourceURL": "https://mortalkombat.fandom.com/wiki/Mortal_Kombat_11"
    },
    # New Era
    {
        "id": "game-mk1-2023",
        "name": "Mortal Kombat 1 (2023)",
        "releaseDate": "2023-09-19",
        "era": "New Era",
        "platforms": ["PlayStation 5", "Xbox Series X/S", "Nintendo Switch", "PC"],
        "description": "A reborn Mortal Kombat universe crafted by Fire God Liu Kang featuring reimagined character origins and Kameo Fighter assist combat.",
        "isStandalone": True,
        "isDLC": False,
        "sourceURL": "https://www.mortalkombat.com/en-us"
    },
    {
        "id": "game-mk-onslaught-2023",
        "name": "Mortal Kombat: Onslaught",
        "releaseDate": "2023-10-17",
        "era": "New Era",
        "platforms": ["iOS", "Android"],
        "description": "Standalone real-time strategic team RPG mobile release where players assemble strike squads of Kombatants across a brand-new cinematic campaign.",
        "isStandalone": True,
        "isDLC": False,
        "sourceURL": "https://mortalkombat.fandom.com/wiki/Mortal_Kombat:_Onslaught"
    }
]

# ----------------------------------------------------
# 2. TIMELINES (3 Continuities)
# ----------------------------------------------------
TIMELINES = [
    {
        "id": "timeline-original",
        "name": "Original Timeline",
        "order": 1,
        "period": "1992–2006",
        "description": "The initial continuity spanning Mortal Kombat 1 through Mortal Kombat: Armageddon, culminating in the battle at the Pyramid of Argus.",
        "sourceURL": "https://mortalkombat.fandom.com/wiki/Original_Timeline"
    },
    {
        "id": "timeline-reboot",
        "name": "Reboot Timeline",
        "order": 2,
        "period": "2011–2019",
        "description": "Created when Raiden sent a psychic message to his past self during Armageddon ('He must win'), altering events from MK9 through MK11.",
        "sourceURL": "https://mortalkombat.fandom.com/wiki/Current_Timeline"
    },
    {
        "id": "timeline-new-era",
        "name": "New Era",
        "order": 3,
        "period": "2023–present",
        "description": "The peace-focused universe engineered by Fire God Liu Kang using the Hourglass, where origins and rivalries were fundamentally rewritten.",
        "sourceURL": "https://www.mortalkombat.com/en-us"
    }
]

# ----------------------------------------------------
# 3. REALMS (7 Canonical Planes)
# ----------------------------------------------------
REALMS = [
    {"id": "realm-earthrealm", "name": "Earthrealm", "description": "Home realm of mortal humanity, protected historically by the Thunder God Raiden and now Fire God Liu Kang."},
    {"id": "realm-outworld", "name": "Outworld", "description": "A harsh, majestic imperial realm forged by conquering and merging neighboring worlds, formerly ruled by Shao Kahn and now Empress Sindel."},
    {"id": "realm-netherrealm", "name": "Netherrealm", "description": "The fiery subterranean plane of eternal torment, demons, revenants, and dark necromancy, ruled by Shinnok and Quan Chi."},
    {"id": "realm-edenia", "name": "Edenia", "description": "A lush paradise realm of beauty, peace, and longevity, merged with Outworld for millennia before its restoration."},
    {"id": "realm-orderrealm", "name": "Orderrealm (Seido)", "description": "A rigid geometric realm governed strictly by law, hierarchy, and absolute order, policed by Hotaru and the Seidan Guard."},
    {"id": "realm-chaosrealm", "name": "Chaosrealm", "description": "An anarchic realm of shifting structures and freedom where chaos is worshiped as supreme truth, home to Cleric Havik."},
    {"id": "realm-vaeternus", "name": "Vaeternus", "description": "The shadowy realm of vampires, severed from Outworld through the efforts of the vampire warrior Nitara."}
]

# ----------------------------------------------------
# 4. CLANS & ORGANIZATIONS (10 Factions)
# ----------------------------------------------------
CLANS = [
    {"id": "org-shirai-ryu", "name": "Shirai Ryu", "type": "clan", "description": "Renegade ninja clan of Japan founded by Takeda, historically led by Grandmaster Hanzo Hasashi."},
    {"id": "org-lin-kuei", "name": "Lin Kuei", "type": "clan", "description": "Ancient Chinese stealth clan of assassins and cryomancers, historically pledged to protect Earthrealm."},
    {"id": "org-special-forces", "name": "Special Forces", "type": "military", "description": "Earthrealm military division led by Sonya Blade and Jax Briggs tasked with countering otherworldly threats."},
    {"id": "org-black-dragon", "name": "Black Dragon", "type": "syndicate", "description": "Ruthless international mercenary syndicate led by the criminal Kano dealing in illicit weapons and extortion."},
    {"id": "org-white-lotus", "name": "White Lotus Society", "type": "order", "description": "Secret society of martial artists founded by Raiden to defend Earthrealm in Mortal Kombat tournaments."},
    {"id": "org-brotherhood-of-shadow", "name": "Brotherhood of Shadow", "type": "cult", "description": "Fanatical Netherrealm religious cult serving the fallen Elder God Shinnok and sorcerer Quan Chi."},
    {"id": "org-red-dragon", "name": "Red Dragon", "type": "syndicate", "description": "Ancient secret criminal syndicate founded by the Edenian demigod Daegon, sworn mortal enemies of the Black Dragon."},
    {"id": "org-umgadi", "name": "The Umgadi", "type": "order", "description": "Elite warrior priestesses selected from Outworld first-born daughters sworn to protect the royal family and emperor."},
    {"id": "org-osh-tekk", "name": "Osh-Tekk Tribe", "type": "order", "description": "Sun-worshipping warrior civilization of Outworld historically ruled by Kotal K'atz and Emperor Kotal Kahn."},
    {"id": "org-seidan-guard", "name": "Seidan Guard", "type": "military", "description": "The disciplined, authoritarian military defense force of Orderrealm commanded by Hotaru."}
]

# ----------------------------------------------------
# 5. ELEMENTS (8 Supernatural Forces)
# ----------------------------------------------------
ELEMENTS = [
    {"id": "element-fire", "name": "Fire", "description": "Netherrealm hellfire, spiritual chi flame, and supernatural combustion."},
    {"id": "element-ice", "name": "Ice", "description": "Sub-zero freezing, moisture condensation, and cryogenic weapon forging."},
    {"id": "element-lightning", "name": "Lightning", "description": "Divine thunder, plasma arcs, and atmospheric electrical manipulation."},
    {"id": "element-shadow", "name": "Shadow", "description": "Dark dimensional shadows, portals, and shadowy clone constructs."},
    {"id": "element-blood", "name": "Blood", "description": "Hekatean blood magic, hemomantic spikes, and lifeforce draining."},
    {"id": "element-wind", "name": "Wind", "description": "Tornadoes, gale force blasts, atmospheric pressure, and levitation."},
    {"id": "element-soul", "name": "Soul / Spirit", "description": "Necromancy, soul absorption, and ancestral spiritual manifestation."},
    {"id": "element-energy", "name": "Kinetic Energy", "description": "Ancient Mediterranean green glow energy, bionics, and sheer physical power."}
]

# ----------------------------------------------------
# 6. WEAPONS (20 Iconic Armaments)
# ----------------------------------------------------
WEAPONS = [
    {"id": "weapon-kunai-spear", "name": "Kunai Spear", "description": "Scorpion's signature rope dart / chained kunai hurled into opponents."},
    {"id": "weapon-kori-blade", "name": "Kōri Blade", "description": "Sub-Zero's flash-frozen cryogenic sword forged from thin air."},
    {"id": "weapon-war-hammer", "name": "Wrath Hammer", "description": "Shao Kahn's devastating monolithic maul that crushes armor and bone."},
    {"id": "weapon-sento", "name": "Sento", "description": "Ancestral katana housing the souls of the Takahashi clan's warrior ancestors."},
    {"id": "weapon-hookswords", "name": "Dual Hookswords", "description": "Twin curved Chinese hook swords wielded with lethal acrobatics by Kabal and Mavado."},
    {"id": "weapon-steel-fans", "name": "Steel War Fans", "description": "Princess Kitana's razor-edged folding steel fans used for slicing and air control."},
    {"id": "weapon-cybernetic-arms", "name": "Bionic Cyber Arms", "description": "Jax Briggs' titanium cybernetic prosthetics delivering earthquake punches."},
    {"id": "weapon-dual-revolvers", "name": "Dual Revolvers", "description": "Erron Black's custom Outworld six-shooter revolvers loaded with hollow-point lead."},
    {"id": "weapon-bo-staff", "name": "Imperial Bo Staff", "description": "Jade's glowing triboluminescent steel bo staff delivering long-reach pole vault strikes."},
    {"id": "weapon-sai-daggers", "name": "Twin Sai Daggers", "description": "Mileena's pair of three-pronged sai daggers used for rapid stabbing and teleport throws."},
    {"id": "weapon-nightsticks", "name": "Police Nightsticks", "description": "Kurtis Stryker's reinforced side-handle PR-24 police batons for crowd control takedowns."},
    {"id": "weapon-spirit-tomahawks", "name": "Ethereal Tomahawks", "description": "Nightwolf's twin glowing spirit axes manifested through Matoka shamanic communion."},
    {"id": "weapon-ovipositors", "name": "Kytinn Ovipositors", "description": "D'Vorah's four serrated insectoid appendages emerging from her back to impale prey."},
    {"id": "weapon-bladed-whips", "name": "Plasma Bladed Whips", "description": "Takeda Takahashi's retractable dual cyber-whips laced with high-frequency heated blades."},
    {"id": "weapon-combat-bow", "name": "Shaolin Combat Bow", "description": "Kung Jin's collapsible recurve bow functioning as a bludgeon, bo staff, and trick arrow launcher."},
    {"id": "weapon-kriss-dagger", "name": "Kriss Purification Dagger", "description": "Ashrah's holy sword 'Datusha' that cleanses the demonic soul of its wielder with each demon slain."},
    {"id": "weapon-spiked-club", "name": "Spiked War Mace", "description": "General Reiko's heavy spiked Outworld bludgeon designed to crush skull helmets."},
    {"id": "weapon-shokan-cleavers", "name": "Dual Shokan Cleavers", "description": "Sheeva's twin broad cleaver blades forged from Outworld furnace steel."},
    {"id": "weapon-daggers-of-denial", "name": "Kobu Jutsu Tonfa Daggers", "description": "Tanya's agile Kobu Jutsu batons and dual stiletto daggers."},
    {"id": "weapon-dragon-blade", "name": "Kamidogu Dragon Blade", "description": "Ancient ceremonial blade housing the cosmic essence of the realms."}
]

# ----------------------------------------------------
# 7. ABILITIES & MOVES (100+ Moves, Fatalities & Powers)
# ----------------------------------------------------
ABILITIES = [
    # Universal / Elemental Powers
    {"id": "ability-hellfire", "name": "Hellfire Manipulation", "elementId": "element-fire", "category": "Magic", "description": "Summoning and projecting demonic fire from the Netherrealm."},
    {"id": "ability-flame-aura", "name": "Flame Aura", "elementId": "element-fire", "category": "Magic", "description": "Surrounding the body in intense heat that incinerates nearby foes."},
    {"id": "ability-fireball-dragon", "name": "Dragon Fireball", "elementId": "element-fire", "category": "Martial", "description": "Concentrated chi energy manifested as a searing dragon of flame."},
    {"id": "ability-cryomancy", "name": "Cryomancy", "elementId": "element-ice", "category": "Elemental", "description": "Instant freezing of atmospheric moisture into ice shields, spikes, and weaponry."},
    {"id": "ability-ice-slide", "name": "Ice Slide", "elementId": "element-ice", "category": "Mobility", "description": "Coating the ground with ice to slide swiftly beneath enemy defenses."},
    {"id": "ability-ice-clone", "name": "Ice Clone", "elementId": "element-ice", "category": "Defense", "description": "Leaving behind a flash-frozen decoy that freezes whoever touches it."},
    {"id": "ability-thunder-mastery", "name": "Thunder Mastery", "elementId": "element-lightning", "category": "Divine", "description": "Summoning divine lightning bolts from storm clouds."},
    {"id": "ability-electric-fly", "name": "Electric Fly (Superman)", "elementId": "element-lightning", "category": "Mobility", "description": "Propelling oneself horizontally through the air enveloped in electrical power."},
    {"id": "ability-teleportation", "name": "Dimensional Teleportation", "elementId": "element-energy", "category": "Spatial", "description": "Instant spatial traversal across short or long combat distances."},
    {"id": "ability-shadow-magic", "name": "Shadow Magic", "elementId": "element-shadow", "category": "Dark Magic", "description": "Summoning shadow wraiths, portals, and dark clones."},
    {"id": "ability-soul-stealing", "name": "Soul Steal", "elementId": "element-soul", "category": "Sorcery", "description": "Draining an opponent's soul to heal and assume their appearance and abilities."},
    {"id": "ability-necromancy", "name": "Necromancy", "elementId": "element-soul", "category": "Sorcery", "description": "Reanimating the dead as loyal Netherrealm revenants."},

    # Iconic Special Moves
    {"id": "move-spear", "name": "Kunai Spear (Get Over Here!)", "elementId": "element-fire", "category": "Special Move", "description": "Hurling a rope or chain spear into the enemy and pulling them in with extreme force."},
    {"id": "move-ice-freeze", "name": "Deep Freeze", "elementId": "element-ice", "category": "Special Move", "description": "Blasting a stream of liquid nitrogen vapor that freezes the target solid."},
    {"id": "move-bicycle-kick", "name": "Bicycle Kick", "elementId": "element-energy", "category": "Special Move", "description": "Defying gravity with rapid aerial bicycle kicks propelled by chi."},
    {"id": "move-shadow-kick", "name": "Shadow Kick", "elementId": "element-energy", "category": "Special Move", "description": "A dashing high-impact kick trailing green kinetic shadow energy."},
    {"id": "move-hat-throw", "name": "Razor Rim Hat Toss", "elementId": "element-energy", "category": "Special Move", "description": "Throwing a circular razor-rimmed hat with boomerang-like trajectory."},
    {"id": "move-fan-lift", "name": "Fan Lift", "elementId": "element-wind", "category": "Special Move", "description": "Waving bladed war fans to create an updraft that suspends opponents helplessly in mid-air."},
    {"id": "move-ground-pound", "name": "Ground Pound", "elementId": "element-energy", "category": "Special Move", "description": "Striking the ground with cybernetic arms to cause localized seismic shockwaves."},
    {"id": "move-cannonball", "name": "Cannonball Roll", "elementId": "element-energy", "category": "Special Move", "description": "Curling into a tightly wound ball and launching forward like a deadly sphere."},
    {"id": "move-wind-tornado", "name": "Wind Tornado Vortex", "elementId": "element-wind", "category": "Special Move", "description": "Spinning into a cyclone that lifts and disorients nearby foes."},
    {"id": "move-sonic-scream", "name": "Banshee Sonic Scream", "elementId": "element-energy", "category": "Special Move", "description": "High-decibel vocal resonance that stuns and strips the flesh from targets."},
    {"id": "move-shokan-stomp", "name": "Telestomp", "elementId": "element-energy", "category": "Special Move", "description": "Leaping off-screen and crashing down with the immense weight of four arms."},
    {"id": "move-blood-tentacles", "name": "Blood Tentacles", "elementId": "element-blood", "category": "Special Move", "description": "Conjuring whipping tendrils of coagulated blood to lash opponents."},
    {"id": "move-acid-spit", "name": "Corrosive Acid Spit", "elementId": "element-energy", "category": "Special Move", "description": "Ejecting caustic digestive acid that melts armor and flesh on contact."},
    {"id": "move-soul-ball", "name": "Green Soul Burst", "elementId": "element-soul", "category": "Special Move", "description": "Harnessing stolen souls into an explosive sphere of spiritual energy."},
    {"id": "move-telekinesis-slam", "name": "Telekinetic Slam", "elementId": "element-energy", "category": "Special Move", "description": "Lifting enemies telepathically and slamming them forcefully against the arena floor."},
    {"id": "move-tarkatan-chop", "name": "Blade Fury", "elementId": "element-energy", "category": "Special Move", "description": "Rapid succession of vicious slashes from forearm arm blades."},
    {"id": "move-net-tangle", "name": "Energy Net", "elementId": "element-energy", "category": "Special Move", "description": "Firing an electrified green plasma net that immobilizes targets."},
    {"id": "move-missile-salvo", "name": "Homing Missile", "elementId": "element-fire", "category": "Special Move", "description": "Chest-mounted rocket targeting enemy coordinates with thermal tracking."},
    {"id": "move-sun-ray", "name": "Sun God's Ray", "elementId": "element-fire", "category": "Special Move", "description": "Summoning a focused beam of sunlight that burns enemies while healing allies."},
    {"id": "move-revolver-quickdraw", "name": "Sand Slam & Quickdraw", "elementId": "element-energy", "category": "Special Move", "description": "Rapid six-shooter revolver barrage accompanied by blinding Netherrealm sand."},
    {"id": "move-drunken-fist", "name": "Drunken Fist Roll", "elementId": "element-energy", "category": "Special Move", "description": "Unpredictable tumbling footwork baffling enemy guard."},
    {"id": "move-flying-kick", "name": "Flying Dragon Kick", "elementId": "element-fire", "category": "Special Move", "description": "Liu Kang's signature horizontal flight across the screen backed by flaming chi."},
    {"id": "move-square-wave", "name": "Square Wave Flight", "elementId": "element-energy", "category": "Special Move", "description": "Mid-air dive propelled by acrobatic Edenian momentum."},
    {"id": "move-nut-punch", "name": "Nut Punch", "elementId": "element-energy", "category": "Special Move", "description": "Splits on the ground delivering an unexpected disabling low strike."},
    {"id": "move-ring-toss", "name": "Energy Ring Toss", "elementId": "element-energy", "category": "Special Move", "description": "Wrist-blaster concentric sonic rings that slice through incoming projectiles."},
    {"id": "move-tele-flurry", "name": "Tele-Flurry", "elementId": "element-energy", "category": "Special Move", "description": "Kenshi telepathically projects a warrior spirit to slash the opponent from afar."},
    {"id": "move-shadow-slide", "name": "Shadow Slide", "elementId": "element-shadow", "category": "Special Move", "description": "Noob Saibot dispatches his shadow clone sliding forward to trip the enemy."},
    {"id": "move-air-throw", "name": "Aerial Combat Throw", "elementId": "element-energy", "category": "Special Move", "description": "Jax grabs the opponent out of mid-air and violently slams them to the turf."},
    {"id": "move-wind-kick", "name": "Tornado Gale Kick", "elementId": "element-wind", "category": "Special Move", "description": "Fujin spins horizontally on a cushion of wind, striking repeatedly."},
    {"id": "move-cyber-trap", "name": "Cryo Floor Trap", "elementId": "element-ice", "category": "Special Move", "description": "Frost releases a cryogenic ground mine that flash-freezes unobservant opponents."},
    {"id": "move-puke-puddle", "name": "Hazardous Fluid Puddle", "elementId": "element-energy", "category": "Special Move", "description": "Bo' Rai Cho coats the arena floor causing approaching enemies to lose their balance."},
    {"id": "move-energy-spark", "name": "Luminescent Spark Burst", "elementId": "element-energy", "category": "Special Move", "description": "Li Mei unleashes purple festive chi sparks that juggle airborne targets."},
    {"id": "move-bone-twist", "name": "360 Torso Contortion", "elementId": "element-energy", "category": "Special Move", "description": "Havik twists his own torso a full 360 degrees to strike backward unpredictably."},

    # Expanded Moves for Base Roster Fighters
    {"id": "move-blazing-nitro-kick", "name": "Blazing Nitro Kick", "elementId": "element-energy", "category": "Special Move", "description": "Jade surrounds herself in an emerald glow, sliding or flying across the arena with a devastating strike."},
    {"id": "move-tribomerang", "name": "Tribomerang Throw", "elementId": "element-energy", "category": "Special Move", "description": "Jade hurls a glowing three-pointed boomerang that can be curved upward or downward."},
    {"id": "move-nomad-dash", "name": "Nomad Dash", "elementId": "element-wind", "category": "Special Move", "description": "Kabal dashes past the opponent at supersonic speed, leaving them spinning helplessly like a top."},
    {"id": "move-buzzsaw", "name": "Buzzsaw Roll", "elementId": "element-energy", "category": "Special Move", "description": "Kabal sends a spinning serrated buzzsaw along the ground to cut opponents at ankle level."},
    {"id": "move-baton-trip", "name": "Baton Sweep & Toss", "elementId": "element-energy", "category": "Special Move", "description": "Kurtis Stryker hooks the enemy's legs with his police baton and slams them onto their back."},
    {"id": "move-grenade-toss", "name": "High/Low Grenade Toss", "elementId": "element-fire", "category": "Special Move", "description": "Stryker launches tactical concussion grenades in high or low arcs."},
    {"id": "move-teleport-stomp", "name": "Shokan Drop Stomp", "elementId": "element-energy", "category": "Special Move", "description": "Sheeva leaps high into the sky and stomps violently downward onto her opponent."},
    {"id": "move-untranslatable-rage", "name": "Untranslatable Rage", "elementId": "element-energy", "category": "Special Move", "description": "Sheeva grabs the opponent with all four arms, delivering thunderous headbutts and ground smashes."},
    {"id": "move-spirit-arrow", "name": "Spirit Arrow", "elementId": "element-energy", "category": "Special Move", "description": "Nightwolf draws a bow made of spiritual green light, firing piercing mystic arrows."},
    {"id": "move-rhino-charge", "name": "Rhino Charge", "elementId": "element-energy", "category": "Special Move", "description": "Nightwolf charges forward enveloped in a mystical green aura, bowling over the target."},
    {"id": "move-banshee-scream", "name": "Levitating Banshee Scream", "elementId": "element-energy", "category": "Special Move", "description": "Sindel levitates and releases sonic shriek waves that paralyze the opponent's nervous system."},
    {"id": "move-hair-whip", "name": "Prehensile Hair Whip", "elementId": "element-energy", "category": "Special Move", "description": "Sindel extends her magical hair like steel cords to grab, toss, and choke opponents."},
    {"id": "move-ovipositor-rush", "name": "Ovipositor Rush", "elementId": "element-energy", "category": "Special Move", "description": "D'Vorah thrusts her razor-sharp insectoid back appendages forward in a rapid stabbing flurry."},
    {"id": "move-bug-spray", "name": "Spittle Spray", "elementId": "element-energy", "category": "Special Move", "description": "D'Vorah sprays swarms of toxic larvae and bugs that bite and disorient the target."},
    {"id": "move-bionic-dash", "name": "Bionic Rocket Dash", "elementId": "element-energy", "category": "Special Move", "description": "Jacqui Briggs ignites rocket thrusters on her gauntlets, driving an explosive punch into the target."},
    {"id": "move-shotgun-blast", "name": "Gauntlet Shotgun Blast", "elementId": "element-energy", "category": "Special Move", "description": "Jacqui fires concentrated kinetic buckshot directly from her wrist cannons."},
    {"id": "move-whip-strike", "name": "Shirai Ryu Whip Flurry", "elementId": "element-energy", "category": "Special Move", "description": "Takeda Takahashi cracks his bladed plasma whips in acrobatic circles around the target."},
    {"id": "move-shirai-ryu-phase", "name": "Shirai Ryu Phase Teleport", "elementId": "element-shadow", "category": "Special Move", "description": "Takeda drops through a shadow smoke portal, reappearing behind the opponent with a kick."},
    {"id": "move-straight-shot", "name": "Straight Arrow Shot", "elementId": "element-energy", "category": "Special Move", "description": "Kung Jin notches and fires Shaolin arrows with pinpoint accuracy at high velocity."},
    {"id": "move-lunge-kick", "name": "Bo Vault Kick", "elementId": "element-energy", "category": "Special Move", "description": "Kung Jin plants his combat bow as a pole vault, launching both feet into the enemy's chest."},
    {"id": "move-boulder-bash", "name": "Boulder Bash", "elementId": "element-energy", "category": "Special Move", "description": "Elder Goddess Cetrion telekinetically hurls massive earthen boulders at the opponent."},
    {"id": "move-hells-wrath", "name": "Hell's Wrath Tendril", "elementId": "element-fire", "category": "Special Move", "description": "Cetrion commands fiery roots to burst from subterranean depths, gripping the target."},
    {"id": "move-shotel-strike", "name": "Demonic Shotel Flurry", "elementId": "element-energy", "category": "Special Move", "description": "Kollector slashes with curved shotel blades using four arms simultaneously."},
    {"id": "move-demonic-mace", "name": "Demonic Mace Toss", "elementId": "element-energy", "category": "Special Move", "description": "Kollector whips out a spiked mace from his magical collection satchel."},
    {"id": "move-dragon-breath", "name": "Dragon King Fire Breath", "elementId": "element-fire", "category": "Special Move", "description": "Onaga unleashes a devastating cone of primordial dragon fire capable of incinerating armies."},
    {"id": "move-dragon-slam", "name": "Titanic Dragon Slam", "elementId": "element-energy", "category": "Special Move", "description": "Onaga flies into the air and crashes down with unyielding draconic mass."},
    {"id": "move-mimic-mastery", "name": "Ape Mimicry", "elementId": "element-energy", "category": "Special Move", "description": "Shujinko draws upon the martial styles learned from masters across all realms."},
    {"id": "move-charging-spear", "name": "Charging Spartan Spear", "elementId": "element-energy", "category": "Special Move", "description": "Reiko charges across the battlefield thrusting a ceremonial war spear."},
    {"id": "move-blood-spit", "name": "Hemomantic Blood Spit", "elementId": "element-blood", "category": "Special Move", "description": "Nitara expels a sphere of vampiric blood that drains opponent vitality."},
    {"id": "move-skull-daggers", "name": "Demon Skull Dagger", "elementId": "element-shadow", "category": "Special Move", "description": "Sareena throws Netherrealm skull-engraved daggers with shadow trajectory."},
    {"id": "move-heavenly-light", "name": "Heavenly Cleansing Light", "elementId": "element-energy", "category": "Special Move", "description": "Ashrah channels the holy energy of the Kriss, blinding demons with pure light."},
    {"id": "move-lava-burst", "name": "Order Lava Eruption", "elementId": "element-fire", "category": "Special Move", "description": "Hotaru summons molten magma jets from Seido's core to incinerate anarchists."},
    {"id": "move-grapple-hook-kick", "name": "Elastic Grapple Kick", "elementId": "element-energy", "category": "Special Move", "description": "Mavado slingshots himself across the screen using high-tension bungee cables."},
    {"id": "move-centaur-charge", "name": "Centaur Gallop Charge", "elementId": "element-energy", "category": "Special Move", "description": "Motaro charges on all four hooves, trampling anyone in his path."},
    {"id": "move-fire-fist", "name": "Elemental Conflagration", "elementId": "element-fire", "category": "Special Move", "description": "Blaze ignites his body in an inferno, crushing opponents with molten magma strikes."},

    # Fatalities
    {"id": "fatality-toasty", "name": "Fatality: Toasty!", "elementId": "element-fire", "category": "Fatality", "description": "Removing the mask to reveal a flaming skull and incinerating the opponent to ashes."},
    {"id": "fatality-spine-rip", "name": "Fatality: Spine Rip", "elementId": "element-ice", "category": "Fatality", "description": "Grabbing the victim's neck and cleanly ripping out their head and spine."},
    {"id": "fatality-dragon-bite", "name": "Fatality: Dragon Feast", "elementId": "element-fire", "category": "Fatality", "description": "Morphing into a massive dragon that bites the opponent's torso in half."},
    {"id": "fatality-fan-decapitation", "name": "Fatality: Decapitating Fans", "elementId": "element-wind", "category": "Fatality", "description": "Slicing off the opponent's head with a swift flick of dual steel war fans."},
    {"id": "fatality-kiss-of-death", "name": "Fatality: Kiss of Death", "elementId": "element-energy", "category": "Fatality", "description": "Blowing a glowing kiss of energy that causes the opponent to violently detonate."},
    {"id": "fatality-shokan-tear", "name": "Fatality: Limb Disassembly", "elementId": "element-energy", "category": "Fatality", "description": "Goro grabs both arms and legs, tearing the opponent into four separate pieces."},
    {"id": "fatality-bow-before-me", "name": "Fatality: Bow Before Me", "elementId": "element-energy", "category": "Fatality", "description": "Jade vaults on her staff, driving both ends through the opponent's eye sockets."},
    {"id": "fatality-road-rash", "name": "Fatality: Road Rash", "elementId": "element-energy", "category": "Fatality", "description": "Kabal drags the opponent at super-speed face first across the concrete, grinding their skull away."},
    {"id": "fatality-time-served", "name": "Fatality: Time Served", "elementId": "element-energy", "category": "Fatality", "description": "Stryker plants a grenade in the target's chest, shoots them with a taser, and detonates the charge."},
    {"id": "fatality-spine-ripper", "name": "Fatality: Lend a Hand", "elementId": "element-energy", "category": "Fatality", "description": "Sheeva grabs both sets of limbs and tears the flesh completely from the skeletal frame."},
    {"id": "fatality-war-dance", "name": "Fatality: Kompshina Calling", "elementId": "element-energy", "category": "Fatality", "description": "Nightwolf embeds his tomahawks into the victim's collarbones, summoning a massive lightning bolt to split them."},
    {"id": "fatality-scream-queen", "name": "Fatality: Scream Queen", "elementId": "element-energy", "category": "Fatality", "description": "Sindel screams directly into the victim's mouth, causing their eyes and entrails to explode outward."},
    {"id": "fatality-infestation", "name": "Fatality: Bug Me", "elementId": "element-energy", "category": "Fatality", "description": "D'Vorah fills the victim's torso with ravenous wasp larvae that burst out from the ribcage."},
    {"id": "fatality-spider-mines", "name": "Fatality: Spider Mines", "elementId": "element-energy", "category": "Fatality", "description": "Jacqui Briggs deploys spider mines that burrow into the opponent's joints and detonate simultaneously."},
    {"id": "fatality-whip-it-good", "name": "Fatality: Whip It Good", "elementId": "element-energy", "category": "Fatality", "description": "Takeda loops his serrated whips around the target's neck and joints, yanking them into clean cubes."},
    {"id": "fatality-target-practice", "name": "Fatality: Target Practice", "elementId": "element-energy", "category": "Fatality", "description": "Kung Jin pins the target with three rapid arrows before piercing the forehead with a flaming shaft."},
    {"id": "fatality-good-and-evil", "name": "Fatality: Good and Evil", "elementId": "element-energy", "category": "Fatality", "description": "Cetrion grows to planetary scale and blasts a beam of pure cosmic light from the cosmos."},
    {"id": "fatality-for-the-kollection", "name": "Fatality: For the Kollection", "elementId": "element-energy", "category": "Fatality", "description": "Kollector methodically carves out the opponent's heart, head, and organs, packing them neatly in his satchel."},
    {"id": "fatality-face-crusher", "name": "Fatality: Five Point Strike", "elementId": "element-energy", "category": "Fatality", "description": "Shujinko strikes vital meridian pressure points, causing the victim's body to cave in on itself."},
    {"id": "fatality-vaeternus-drain", "name": "Fatality: Blood Feast", "elementId": "element-blood", "category": "Fatality", "description": "Nitara rips open the victim's carotid artery with fangs and claws, drinking them completely dry."},
    {"id": "fatality-divine-purification", "name": "Fatality: Heavenly Cleansing", "elementId": "element-energy", "category": "Fatality", "description": "Ashrah pierces the demon's heart with the Kriss, causing holy blue light to incinerate the body from within."}
]

# ----------------------------------------------------
# 8. CANONICAL CHARACTERS (60 Base Roster Fighters)
# ----------------------------------------------------
CHARACTERS = [
    # 1. Scorpion
    {
        "id": "character-scorpion",
        "name": "Scorpion",
        "alternateName": "Hanzo Hasashi",
        "firstAppearanceYear": "1992",
        "description": "Resurrected Shirai Ryu ninja specter fueled by vengeance against those who exterminated his clan and family.",
        "species": "Specter / Human",
        "originRealm": "realm-earthrealm",
        "sourceURL": "https://mortalkombat.fandom.com/wiki/Scorpion",
        "versions": [
            {
                "versionId": "version-scorpion-mk1",
                "gameId": "game-mk1-1992",
                "timelineId": "timeline-original",
                "abilities": ["ability-hellfire", "move-spear", "fatality-toasty"],
                "weapons": ["weapon-kunai-spear"],
                "clan": "org-shirai-ryu"
            },
            {
                "versionId": "version-scorpion-mk11",
                "gameId": "game-mk11-2019",
                "timelineId": "timeline-reboot",
                "abilities": ["ability-hellfire", "move-spear", "fatality-toasty"],
                "weapons": ["weapon-kunai-spear"],
                "clan": "org-shirai-ryu"
            },
            {
                "versionId": "version-scorpion-mk1-2023",
                "gameId": "game-mk1-2023",
                "timelineId": "timeline-new-era",
                "abilities": ["ability-hellfire", "move-spear"],
                "weapons": ["weapon-kunai-spear"],
                "clan": "org-lin-kuei"
            }
        ]
    },
    # 2. Sub-Zero
    {
        "id": "character-subzero",
        "name": "Sub-Zero",
        "alternateName": "Kuai Liang / Bi-Han",
        "firstAppearanceYear": "1992",
        "description": "Grandmaster of the Lin Kuei possessing lethal cryomantic powers to flash-freeze moisture into weapons and barriers.",
        "species": "Cryomancer",
        "originRealm": "realm-earthrealm",
        "sourceURL": "https://mortalkombat.fandom.com/wiki/Sub-Zero",
        "versions": [
            {
                "versionId": "version-subzero-mk1",
                "gameId": "game-mk1-1992",
                "timelineId": "timeline-original",
                "abilities": ["ability-cryomancy", "move-ice-freeze", "fatality-spine-rip"],
                "weapons": ["weapon-kori-blade"],
                "clan": "org-lin-kuei"
            },
            {
                "versionId": "version-subzero-mk11",
                "gameId": "game-mk11-2019",
                "timelineId": "timeline-reboot",
                "abilities": ["ability-cryomancy", "move-ice-freeze", "ability-ice-slide"],
                "weapons": ["weapon-kori-blade"],
                "clan": "org-lin-kuei"
            },
            {
                "versionId": "version-subzero-mk1-2023",
                "gameId": "game-mk1-2023",
                "timelineId": "timeline-new-era",
                "abilities": ["ability-cryomancy", "move-ice-freeze"],
                "weapons": ["weapon-kori-blade"],
                "clan": "org-lin-kuei"
            }
        ]
    },
    # 3. Raiden
    {
        "id": "character-raiden",
        "name": "Raiden",
        "alternateName": "God of Thunder",
        "firstAppearanceYear": "1992",
        "description": "Immortal God of Thunder and ancient Protector of Earthrealm, wielding crackling lightning and temporal visions.",
        "species": "God",
        "originRealm": "realm-earthrealm",
        "sourceURL": "https://mortalkombat.fandom.com/wiki/Raiden",
        "versions": [
            {
                "versionId": "version-raiden-mk1",
                "gameId": "game-mk1-1992",
                "timelineId": "timeline-original",
                "abilities": ["ability-thunder-mastery", "ability-electric-fly", "ability-teleportation"],
                "weapons": [],
                "clan": "org-white-lotus"
            },
            {
                "versionId": "version-raiden-mk11",
                "gameId": "game-mk11-2019",
                "timelineId": "timeline-reboot",
                "abilities": ["ability-thunder-mastery", "ability-electric-fly"],
                "weapons": [],
                "clan": "org-white-lotus"
            },
            {
                "versionId": "version-raiden-mk1-2023",
                "gameId": "game-mk1-2023",
                "timelineId": "timeline-new-era",
                "abilities": ["ability-thunder-mastery"],
                "weapons": [],
                "clan": "org-white-lotus"
            }
        ]
    },
    # 4. Liu Kang
    {
        "id": "character-liukang",
        "name": "Liu Kang",
        "alternateName": "Fire God Liu Kang",
        "firstAppearanceYear": "1992",
        "description": "Shaolin monk who won four consecutive Mortal Kombat tournaments, later ascending to become the Fire God and Architect of the New Era.",
        "species": "God / Human",
        "originRealm": "realm-earthrealm",
        "sourceURL": "https://mortalkombat.fandom.com/wiki/Liu_Kang",
        "versions": [
            {
                "versionId": "version-liukang-mk1",
                "gameId": "game-mk1-1992",
                "timelineId": "timeline-original",
                "abilities": ["ability-fireball-dragon", "move-bicycle-kick", "fatality-dragon-bite"],
                "weapons": [],
                "clan": "org-white-lotus"
            },
            {
                "versionId": "version-liukang-mk11",
                "gameId": "game-mk11-2019",
                "timelineId": "timeline-reboot",
                "abilities": ["ability-fireball-dragon", "move-bicycle-kick", "ability-thunder-mastery"],
                "weapons": [],
                "clan": "org-white-lotus"
            },
            {
                "versionId": "version-liukang-mk1-2023",
                "gameId": "game-mk1-2023",
                "timelineId": "timeline-new-era",
                "abilities": ["ability-fireball-dragon", "ability-thunder-mastery"],
                "weapons": [],
                "clan": "org-white-lotus"
            }
        ]
    },
    # 5. Kitana
    {
        "id": "character-kitana",
        "name": "Kitana",
        "alternateName": "Kitana Kahn",
        "firstAppearanceYear": "1993",
        "description": "10,000-year-old royal princess of Edenia who broke free from Shao Kahn's control to lead Outworld as Kitana Kahn.",
        "species": "Edenian",
        "originRealm": "realm-edenia",
        "sourceURL": "https://mortalkombat.fandom.com/wiki/Kitana",
        "versions": [
            {
                "versionId": "version-kitana-mk2",
                "gameId": "game-mk2-1993",
                "timelineId": "timeline-original",
                "abilities": ["move-fan-lift", "fatality-fan-decapitation", "move-square-wave"],
                "weapons": ["weapon-steel-fans"],
                "clan": None
            },
            {
                "versionId": "version-kitana-mk11",
                "gameId": "game-mk11-2019",
                "timelineId": "timeline-reboot",
                "abilities": ["move-fan-lift", "fatality-fan-decapitation"],
                "weapons": ["weapon-steel-fans"],
                "clan": None
            }
        ]
    },
    # 6. Mileena
    {
        "id": "character-mileena",
        "name": "Mileena",
        "alternateName": "Empress Mileena",
        "firstAppearanceYear": "1993",
        "description": "A savage genetic clone created in Shang Tsung's Flesh Pits combining Edenian royal DNA with ferocious Tarkatan physiology.",
        "species": "Edenian / Tarkatan Hybrid",
        "originRealm": "realm-outworld",
        "sourceURL": "https://mortalkombat.fandom.com/wiki/Mileena",
        "versions": [
            {
                "versionId": "version-mileena-mk2",
                "gameId": "game-mk2-1993",
                "timelineId": "timeline-original",
                "abilities": ["ability-teleportation"],
                "weapons": ["weapon-sai-daggers"],
                "clan": None
            },
            {
                "versionId": "version-mileena-mkx",
                "gameId": "game-mkx-2015",
                "timelineId": "timeline-reboot",
                "abilities": ["ability-teleportation"],
                "weapons": ["weapon-sai-daggers"],
                "clan": None
            },
            {
                "versionId": "version-mileena-mk1-2023",
                "gameId": "game-mk1-2023",
                "timelineId": "timeline-new-era",
                "abilities": ["ability-teleportation"],
                "weapons": ["weapon-sai-daggers"],
                "clan": None
            }
        ]
    },
    # 7. Johnny Cage
    {
        "id": "character-johnnycage",
        "name": "Johnny Cage",
        "alternateName": "John Carlton",
        "firstAppearanceYear": "1992",
        "description": "Hollywood martial arts superstar possessing hereditary Mediterranean warrior heritage granting mystical green kinetic shields.",
        "species": "Human",
        "originRealm": "realm-earthrealm",
        "sourceURL": "https://mortalkombat.fandom.com/wiki/Johnny_Cage",
        "versions": [
            {
                "versionId": "version-johnnycage-mk1",
                "gameId": "game-mk1-1992",
                "timelineId": "timeline-original",
                "abilities": ["move-shadow-kick", "move-nut-punch"],
                "weapons": [],
                "clan": "org-special-forces"
            },
            {
                "versionId": "version-johnnycage-mk11",
                "gameId": "game-mk11-2019",
                "timelineId": "timeline-reboot",
                "abilities": ["move-shadow-kick", "move-nut-punch"],
                "weapons": [],
                "clan": "org-special-forces"
            }
        ]
    },
    # 8. Sonya Blade
    {
        "id": "character-sonyablade",
        "name": "Sonya Blade",
        "alternateName": "General Blade",
        "firstAppearanceYear": "1992",
        "description": "Commanding General of Earthrealm Special Forces, relentlessly hunting Kano and the Black Dragon with high-tech military ordinance.",
        "species": "Human",
        "originRealm": "realm-earthrealm",
        "sourceURL": "https://mortalkombat.fandom.com/wiki/Sonya_Blade",
        "versions": [
            {
                "versionId": "version-sonyablade-mk1",
                "gameId": "game-mk1-1992",
                "timelineId": "timeline-original",
                "abilities": ["move-ring-toss", "fatality-kiss-of-death"],
                "weapons": [],
                "clan": "org-special-forces"
            },
            {
                "versionId": "version-sonyablade-mk11",
                "gameId": "game-mk11-2019",
                "timelineId": "timeline-reboot",
                "abilities": ["move-ring-toss", "fatality-kiss-of-death"],
                "weapons": [],
                "clan": "org-special-forces"
            }
        ]
    },
    # 9. Jax Briggs
    {
        "id": "character-jax",
        "name": "Jax Briggs",
        "alternateName": "Major Jackson Briggs",
        "firstAppearanceYear": "1993",
        "description": "Decorated Special Forces commander outfitted with titanium bionic cyber arms capable of generating devastating seismic shockwaves.",
        "species": "Human Cyborg",
        "originRealm": "realm-earthrealm",
        "sourceURL": "https://mortalkombat.fandom.com/wiki/Jax_Briggs",
        "versions": [
            {
                "versionId": "version-jax-mk2",
                "gameId": "game-mk2-1993",
                "timelineId": "timeline-original",
                "abilities": ["move-ground-pound", "move-air-throw"],
                "weapons": ["weapon-cybernetic-arms"],
                "clan": "org-special-forces"
            },
            {
                "versionId": "version-jax-mk11",
                "gameId": "game-mk11-2019",
                "timelineId": "timeline-reboot",
                "abilities": ["move-ground-pound", "move-air-throw"],
                "weapons": ["weapon-cybernetic-arms"],
                "clan": "org-special-forces"
            }
        ]
    },
    # 10. Kung Lao
    {
        "id": "character-kunglao",
        "name": "Kung Lao",
        "alternateName": "The Razor-Hat Monk",
        "firstAppearanceYear": "1993",
        "description": "Shaolin pacifist warrior descendant of the Great Kung Lao, master of whirlwind kicks and a razor-brimmed throwing hat.",
        "species": "Human",
        "originRealm": "realm-earthrealm",
        "sourceURL": "https://mortalkombat.fandom.com/wiki/Kung_Lao",
        "versions": [
            {
                "versionId": "version-kunglao-mk2",
                "gameId": "game-mk2-1993",
                "timelineId": "timeline-original",
                "abilities": ["move-hat-throw", "move-wind-tornado", "ability-teleportation"],
                "weapons": [],
                "clan": "org-white-lotus"
            },
            {
                "versionId": "version-kunglao-mk11",
                "gameId": "game-mk11-2019",
                "timelineId": "timeline-reboot",
                "abilities": ["move-hat-throw", "move-wind-tornado"],
                "weapons": [],
                "clan": "org-white-lotus"
            }
        ]
    },
    # 11. Shang Tsung
    {
        "id": "character-shangtsung",
        "name": "Shang Tsung",
        "alternateName": "The Soul Stealer",
        "firstAppearanceYear": "1992",
        "description": "Treacherous shapeshifting sorcerer who consumes mortal souls to sustain his youth and mimic enemy abilities.",
        "species": "Human Sorcerer",
        "originRealm": "realm-earthrealm",
        "sourceURL": "https://mortalkombat.fandom.com/wiki/Shang_Tsung",
        "versions": [
            {
                "versionId": "version-shangtsung-mk1",
                "gameId": "game-mk1-1992",
                "timelineId": "timeline-original",
                "abilities": ["ability-soul-stealing", "move-soul-ball"],
                "weapons": [],
                "clan": None
            },
            {
                "versionId": "version-shangtsung-mk-deadly-alliance-2002",
                "gameId": "game-mk-deadly-alliance-2002",
                "timelineId": "timeline-original",
                "abilities": ["ability-soul-stealing"],
                "weapons": [],
                "clan": None
            },
            {
                "versionId": "version-shangtsung-mk1-2023",
                "gameId": "game-mk1-2023",
                "timelineId": "timeline-new-era",
                "abilities": ["ability-soul-stealing"],
                "weapons": [],
                "clan": None
            }
        ]
    },
    # 12. Quan Chi
    {
        "id": "character-quanchi",
        "name": "Quan Chi",
        "alternateName": "Arch-Sorcerer of the Netherrealm",
        "firstAppearanceYear": "1997",
        "description": "Scheming demonic necromancer from the Netherrealm who orchestrates proxy wars, resurrects revenants, and formed the Deadly Alliance.",
        "species": "Demon Sorcerer",
        "originRealm": "realm-netherrealm",
        "sourceURL": "https://mortalkombat.fandom.com/wiki/Quan_Chi",
        "versions": [
            {
                "versionId": "version-quanchi-mk4",
                "gameId": "game-mk4-1997",
                "timelineId": "timeline-original",
                "abilities": ["ability-necromancy", "ability-teleportation"],
                "weapons": [],
                "clan": "org-brotherhood-of-shadow"
            },
            {
                "versionId": "version-quanchi-mkx",
                "gameId": "game-mkx-2015",
                "timelineId": "timeline-reboot",
                "abilities": ["ability-necromancy", "ability-teleportation"],
                "weapons": [],
                "clan": "org-brotherhood-of-shadow"
            }
        ]
    },
    # 13. Shao Kahn
    {
        "id": "character-shaokahn",
        "name": "Shao Kahn",
        "alternateName": "Emperor of Outworld / General Shao",
        "firstAppearanceYear": "1993",
        "description": "Colossal tyrannical warlord who ruled Outworld for ten millennia, conquering realms by force and wielding the mighty Wrath Hammer.",
        "species": "Outworlder / God",
        "originRealm": "realm-outworld",
        "sourceURL": "https://mortalkombat.fandom.com/wiki/Shao_Kahn",
        "versions": [
            {
                "versionId": "version-shaokahn-mk2",
                "gameId": "game-mk2-1993",
                "timelineId": "timeline-original",
                "abilities": [],
                "weapons": ["weapon-war-hammer"],
                "clan": None
            },
            {
                "versionId": "version-shaokahn-mk11",
                "gameId": "game-mk11-2019",
                "timelineId": "timeline-reboot",
                "abilities": [],
                "weapons": ["weapon-war-hammer"],
                "clan": None
            }
        ]
    },
    # 14. Kano
    {
        "id": "character-kano",
        "name": "Kano",
        "alternateName": "Black Dragon Leader",
        "firstAppearanceYear": "1992",
        "description": "Cybernetically modified Australian mercenary and ruthless boss of the Black Dragon, possessing an infrared laser cyber-eye.",
        "species": "Human Cyborg",
        "originRealm": "realm-earthrealm",
        "sourceURL": "https://mortalkombat.fandom.com/wiki/Kano",
        "versions": [
            {
                "versionId": "version-kano-mk1",
                "gameId": "game-mk1-1992",
                "timelineId": "timeline-original",
                "abilities": ["move-cannonball"],
                "weapons": [],
                "clan": "org-black-dragon"
            },
            {
                "versionId": "version-kano-mk11",
                "gameId": "game-mk11-2019",
                "timelineId": "timeline-reboot",
                "abilities": ["move-cannonball"],
                "weapons": [],
                "clan": "org-black-dragon"
            }
        ]
    },
    # 15. Baraka
    {
        "id": "character-baraka",
        "name": "Baraka",
        "alternateName": "Tarkatan War Chief",
        "firstAppearanceYear": "1993",
        "description": "Ferocious warlord of the nomadic Tarkatan tribe with razor-sharp teeth and long, retractable bone blades extending from his forearms.",
        "species": "Tarkatan",
        "originRealm": "realm-outworld",
        "sourceURL": "https://mortalkombat.fandom.com/wiki/Baraka",
        "versions": [
            {
                "versionId": "version-baraka-mk2",
                "gameId": "game-mk2-1993",
                "timelineId": "timeline-original",
                "abilities": ["move-tarkatan-chop"],
                "weapons": [],
                "clan": None
            },
            {
                "versionId": "version-baraka-mk11",
                "gameId": "game-mk11-2019",
                "timelineId": "timeline-reboot",
                "abilities": ["move-tarkatan-chop"],
                "weapons": [],
                "clan": None
            }
        ]
    },
    # 16. Kenshi Takahashi
    {
        "id": "character-kenshi",
        "name": "Kenshi",
        "alternateName": "Kenshi Takahashi",
        "firstAppearanceYear": "2002",
        "description": "Blind telekinetic master swordsman guided by the spirits of his samurai ancestors housed within the ancestral blade Sento.",
        "species": "Human",
        "originRealm": "realm-earthrealm",
        "sourceURL": "https://mortalkombat.fandom.com/wiki/Kenshi",
        "versions": [
            {
                "versionId": "version-kenshi-mk-deadly-alliance-2002",
                "gameId": "game-mk-deadly-alliance-2002",
                "timelineId": "timeline-original",
                "abilities": ["move-tele-flurry", "move-telekinesis-slam"],
                "weapons": ["weapon-sento"],
                "clan": "org-special-forces"
            },
            {
                "versionId": "version-kenshi-mkx",
                "gameId": "game-mkx-2015",
                "timelineId": "timeline-reboot",
                "abilities": ["move-tele-flurry", "move-telekinesis-slam"],
                "weapons": ["weapon-sento"],
                "clan": "org-special-forces"
            },
            {
                "versionId": "version-kenshi-mk1-2023",
                "gameId": "game-mk1-2023",
                "timelineId": "timeline-new-era",
                "abilities": ["move-tele-flurry"],
                "weapons": ["weapon-sento"],
                "clan": "org-shirai-ryu"
            }
        ]
    },
    # 17. Noob Saibot
    {
        "id": "character-noobsaibot",
        "name": "Noob Saibot",
        "alternateName": "Bi-Han (Shadow Wraith)",
        "firstAppearanceYear": "1993",
        "description": "The resurrected wraith of the original Sub-Zero Bi-Han, corrupted by the dark necromancy of Quan Chi into living shadow.",
        "species": "Wraith",
        "originRealm": "realm-netherrealm",
        "sourceURL": "https://mortalkombat.fandom.com/wiki/Noob_Saibot",
        "versions": [
            {
                "versionId": "version-noobsaibot-mk2",
                "gameId": "game-mk2-1993",
                "timelineId": "timeline-original",
                "abilities": ["ability-shadow-magic", "move-shadow-slide"],
                "weapons": [],
                "clan": "org-brotherhood-of-shadow"
            },
            {
                "versionId": "version-noobsaibot-mk11",
                "gameId": "game-mk11-2019",
                "timelineId": "timeline-reboot",
                "abilities": ["ability-shadow-magic", "move-shadow-slide"],
                "weapons": [],
                "clan": "org-brotherhood-of-shadow"
            }
        ]
    },
    # 18. Smoke
    {
        "id": "character-smoke",
        "name": "Smoke",
        "alternateName": "Tomas Vrbada",
        "firstAppearanceYear": "1993",
        "description": "Lin Kuei warrior capable of dissolving his physical form into clouds of choking, defensive vapor.",
        "species": "Enenra / Human",
        "originRealm": "realm-earthrealm",
        "sourceURL": "https://mortalkombat.fandom.com/wiki/Smoke",
        "versions": [
            {
                "versionId": "version-smoke-mk3",
                "gameId": "game-mk3-1995",
                "timelineId": "timeline-original",
                "abilities": ["ability-teleportation"],
                "weapons": [],
                "clan": "org-lin-kuei"
            },
            {
                "versionId": "version-smoke-mk9",
                "gameId": "game-mk9-2011",
                "timelineId": "timeline-reboot",
                "abilities": ["ability-teleportation"],
                "weapons": [],
                "clan": "org-lin-kuei"
            },
            {
                "versionId": "version-smoke-mk1-2023",
                "gameId": "game-mk1-2023",
                "timelineId": "timeline-new-era",
                "abilities": ["ability-teleportation"],
                "weapons": [],
                "clan": "org-lin-kuei"
            }
        ]
    },
    # 19. Cyrax
    {
        "id": "character-cyrax",
        "name": "Cyrax",
        "alternateName": "Unit LK-4D4",
        "firstAppearanceYear": "1995",
        "description": "Botswanan assassin mechanised into a lethal yellow cyborg unit equipped with an energy net and chest saw.",
        "species": "Cyborg / Human",
        "originRealm": "realm-earthrealm",
        "sourceURL": "https://mortalkombat.fandom.com/wiki/Cyrax",
        "versions": [
            {
                "versionId": "version-cyrax-mk3",
                "gameId": "game-mk3-1995",
                "timelineId": "timeline-original",
                "abilities": ["move-net-tangle", "ability-teleportation"],
                "weapons": [],
                "clan": "org-lin-kuei"
            },
            {
                "versionId": "version-cyrax-mk9",
                "gameId": "game-mk9-2011",
                "timelineId": "timeline-reboot",
                "abilities": ["move-net-tangle", "ability-teleportation"],
                "weapons": [],
                "clan": "org-lin-kuei"
            }
        ]
    },
    # 20. Sektor
    {
        "id": "character-sektor",
        "name": "Sektor",
        "alternateName": "Unit LK-9T9",
        "firstAppearanceYear": "1995",
        "description": "Ruthless grandmaster's son who willingly embraced cybernetization, armed with thermal rockets and dual flamethrowers.",
        "species": "Cyborg / Human",
        "originRealm": "realm-earthrealm",
        "sourceURL": "https://mortalkombat.fandom.com/wiki/Sektor",
        "versions": [
            {
                "versionId": "version-sektor-mk3",
                "gameId": "game-mk3-1995",
                "timelineId": "timeline-original",
                "abilities": ["move-missile-salvo", "ability-teleportation"],
                "weapons": [],
                "clan": "org-lin-kuei"
            },
            {
                "versionId": "version-sektor-mk9",
                "gameId": "game-mk9-2011",
                "timelineId": "timeline-reboot",
                "abilities": ["move-missile-salvo", "ability-teleportation"],
                "weapons": [],
                "clan": "org-lin-kuei"
            }
        ]
    },
    # 21. Reptile
    {
        "id": "character-reptile",
        "name": "Reptile",
        "alternateName": "Syzoth",
        "firstAppearanceYear": "1992",
        "description": "Last known Saurian humanoid, possessing camouflage invisibility and corrosive acid saliva, fighting desperately to revive his home realm.",
        "species": "Saurian (Zaterran)",
        "originRealm": "realm-outworld",
        "sourceURL": "https://mortalkombat.fandom.com/wiki/Reptile",
        "versions": [
            {
                "versionId": "version-reptile-mk1",
                "gameId": "game-mk1-1992",
                "timelineId": "timeline-original",
                "abilities": ["move-acid-spit"],
                "weapons": [],
                "clan": None
            },
            {
                "versionId": "version-reptile-mkx",
                "gameId": "game-mkx-2015",
                "timelineId": "timeline-reboot",
                "abilities": ["move-acid-spit"],
                "weapons": [],
                "clan": None
            },
            {
                "versionId": "version-reptile-mk1-2023",
                "gameId": "game-mk1-2023",
                "timelineId": "timeline-new-era",
                "abilities": ["move-acid-spit"],
                "weapons": [],
                "clan": None
            }
        ]
    },
    # 22. Geras
    {
        "id": "character-geras",
        "name": "Geras",
        "alternateName": "Guardian of the Hourglass",
        "firstAppearanceYear": "2019",
        "description": "Immortal artificial construct created to manage temporal sand, resurrecting stronger and wiser after every death.",
        "species": "Temporal Golem",
        "originRealm": "realm-earthrealm",
        "sourceURL": "https://mortalkombat.fandom.com/wiki/Geras",
        "versions": [
            {
                "versionId": "version-geras-mk11",
                "gameId": "game-mk11-2019",
                "timelineId": "timeline-reboot",
                "abilities": ["ability-teleportation"],
                "weapons": [],
                "clan": None
            },
            {
                "versionId": "version-geras-mk1-2023",
                "gameId": "game-mk1-2023",
                "timelineId": "timeline-new-era",
                "abilities": ["ability-teleportation"],
                "weapons": [],
                "clan": None
            }
        ]
    },
    # 23. Kronika
    {
        "id": "character-kronika",
        "name": "Kronika",
        "alternateName": "Keeper of Time",
        "firstAppearanceYear": "2019",
        "description": "Titan of Time and architect of universe cycles who sought to restart history when Raiden disrupted the balance between Good and Evil.",
        "species": "Titan",
        "originRealm": "realm-earthrealm",
        "sourceURL": "https://mortalkombat.fandom.com/wiki/Kronika",
        "versions": [
            {
                "versionId": "version-kronika-mk11",
                "gameId": "game-mk11-2019",
                "timelineId": "timeline-reboot",
                "abilities": ["ability-teleportation"],
                "weapons": [],
                "clan": None
            }
        ]
    },
    # 24. Sindel
    {
        "id": "character-sindel",
        "name": "Sindel",
        "alternateName": "Empress Sindel",
        "firstAppearanceYear": "1995",
        "description": "Queen of Edenia and Empress of Outworld, commanding a devastating sonic banshee shriek and lethal prehensile hair.",
        "species": "Edenian",
        "originRealm": "realm-edenia",
        "sourceURL": "https://mortalkombat.fandom.com/wiki/Sindel",
        "versions": [
            {
                "versionId": "version-sindel-mk3",
                "gameId": "game-mk3-1995",
                "timelineId": "timeline-original",
                "abilities": ["move-banshee-scream", "move-hair-whip", "fatality-scream-queen"],
                "weapons": [],
                "clan": None
            },
            {
                "versionId": "version-sindel-mk1-2023",
                "gameId": "game-mk1-2023",
                "timelineId": "timeline-new-era",
                "abilities": ["move-banshee-scream", "move-hair-whip"],
                "weapons": [],
                "clan": None
            }
        ]
    },
    # 25. Goro
    {
        "id": "character-goro",
        "name": "Goro",
        "alternateName": "Prince of the Shokan",
        "firstAppearanceYear": "1992",
        "description": "Four-armed Shokan prince who held the title of Mortal Kombat Grand Champion for 500 years before being defeated by Liu Kang.",
        "species": "Shokan",
        "originRealm": "realm-outworld",
        "sourceURL": "https://mortalkombat.fandom.com/wiki/Goro",
        "versions": [
            {
                "versionId": "version-goro-mk1",
                "gameId": "game-mk1-1992",
                "timelineId": "timeline-original",
                "abilities": ["move-shokan-stomp", "fatality-shokan-tear"],
                "weapons": [],
                "clan": None
            },
            {
                "versionId": "version-goro-mkx",
                "gameId": "game-mkx-2015",
                "timelineId": "timeline-reboot",
                "abilities": ["move-shokan-stomp"],
                "weapons": [],
                "clan": None
            }
        ]
    },
    # 26. Kintaro
    {
        "id": "character-kintaro",
        "name": "Kintaro",
        "alternateName": "Tigrar Shokan Champion",
        "firstAppearanceYear": "1993",
        "description": "Fierce feline-striped Tigrar Shokan general serving as Shao Kahn's vanguard during the Outworld tournament.",
        "species": "Shokan (Tigrar)",
        "originRealm": "realm-outworld",
        "sourceURL": "https://mortalkombat.fandom.com/wiki/Kintaro",
        "versions": [
            {
                "versionId": "version-kintaro-mk2",
                "gameId": "game-mk2-1993",
                "timelineId": "timeline-original",
                "abilities": ["move-shokan-stomp"],
                "weapons": [],
                "clan": None
            }
        ]
    },
    # 27. Shinnok
    {
        "id": "character-shinnok",
        "name": "Shinnok",
        "alternateName": "The Fallen Elder God",
        "firstAppearanceYear": "1997",
        "description": "Banished Elder God of Death and Darkness who plotted to conquer the realms using his powerful sacred amulet.",
        "species": "Elder God (Fallen)",
        "originRealm": "realm-netherrealm",
        "sourceURL": "https://mortalkombat.fandom.com/wiki/Shinnok",
        "versions": [
            {
                "versionId": "version-shinnok-mk4",
                "gameId": "game-mk4-1997",
                "timelineId": "timeline-original",
                "abilities": ["ability-necromancy", "ability-teleportation"],
                "weapons": [],
                "clan": "org-brotherhood-of-shadow"
            },
            {
                "versionId": "version-shinnok-mkx",
                "gameId": "game-mkx-2015",
                "timelineId": "timeline-reboot",
                "abilities": ["ability-necromancy", "ability-teleportation"],
                "weapons": [],
                "clan": "org-brotherhood-of-shadow"
            }
        ]
    },
    # 28. Fujin
    {
        "id": "character-fujin",
        "name": "Fujin",
        "alternateName": "God of Wind",
        "firstAppearanceYear": "1997",
        "description": "Benevolent God of Wind and brother to Raiden, utilizing gale force whirlwinds and levitation in Earthrealm's defense.",
        "species": "God",
        "originRealm": "realm-earthrealm",
        "sourceURL": "https://mortalkombat.fandom.com/wiki/Fujin",
        "versions": [
            {
                "versionId": "version-fujin-mk4",
                "gameId": "game-mk4-1997",
                "timelineId": "timeline-original",
                "abilities": ["move-wind-tornado", "move-wind-kick"],
                "weapons": [],
                "clan": "org-white-lotus"
            },
            {
                "versionId": "version-fujin-mk-armageddon-2006",
                "gameId": "game-mk-armageddon-2006",
                "timelineId": "timeline-original",
                "abilities": ["move-wind-tornado"],
                "weapons": [],
                "clan": "org-white-lotus"
            }
        ]
    },
    # 29. Frost
    {
        "id": "character-frost",
        "name": "Frost",
        "alternateName": "Grandmaster of the Cyber Lin Kuei",
        "firstAppearanceYear": "2002",
        "description": "Ambitious cryomancer apprentice of Sub-Zero whose hubris drove her to betray her master and convert herself into a cybernetic leader.",
        "species": "Cyborg / Cryomancer",
        "originRealm": "realm-earthrealm",
        "sourceURL": "https://mortalkombat.fandom.com/wiki/Frost",
        "versions": [
            {
                "versionId": "version-frost-mk-deadly-alliance-2002",
                "gameId": "game-mk-deadly-alliance-2002",
                "timelineId": "timeline-original",
                "abilities": ["ability-cryomancy", "move-cyber-trap"],
                "weapons": ["weapon-kori-blade"],
                "clan": "org-lin-kuei"
            },
            {
                "versionId": "version-frost-mk11",
                "gameId": "game-mk11-2019",
                "timelineId": "timeline-reboot",
                "abilities": ["ability-cryomancy", "move-cyber-trap"],
                "weapons": [],
                "clan": "org-lin-kuei"
            }
        ]
    },
    # 30. Bo' Rai Cho
    {
        "id": "character-boraicho",
        "name": "Bo' Rai Cho",
        "alternateName": "The Drunken Master",
        "firstAppearanceYear": "2002",
        "description": "Jovial martial arts master from Outworld who trained Liu Kang, Kung Lao, and Shujinko in the legendary Drunken Fist style.",
        "species": "Outworlder",
        "originRealm": "realm-outworld",
        "sourceURL": "https://mortalkombat.fandom.com/wiki/Bo%27_Rai_Cho",
        "versions": [
            {
                "versionId": "version-boraicho-mk-deadly-alliance-2002",
                "gameId": "game-mk-deadly-alliance-2002",
                "timelineId": "timeline-original",
                "abilities": ["move-drunken-fist", "move-puke-puddle"],
                "weapons": [],
                "clan": "org-white-lotus"
            },
            {
                "versionId": "version-boraicho-mkx",
                "gameId": "game-mkx-2015",
                "timelineId": "timeline-reboot",
                "abilities": ["move-drunken-fist"],
                "weapons": [],
                "clan": "org-white-lotus"
            }
        ]
    },
    # 31. Li Mei
    {
        "id": "character-limei",
        "name": "Li Mei",
        "alternateName": "First Constable of Sun Do",
        "firstAppearanceYear": "2002",
        "description": "Noble Sun Do martial artist who fought to liberate her people from the Deadly Alliance, now serving as Chief Constable of the imperial capital.",
        "species": "Outworlder",
        "originRealm": "realm-outworld",
        "sourceURL": "https://mortalkombat.fandom.com/wiki/Li_Mei",
        "versions": [
            {
                "versionId": "version-limei-mk-deadly-alliance-2002",
                "gameId": "game-mk-deadly-alliance-2002",
                "timelineId": "timeline-original",
                "abilities": ["move-energy-spark"],
                "weapons": [],
                "clan": None
            },
            {
                "versionId": "version-limei-mk1-2023",
                "gameId": "game-mk1-2023",
                "timelineId": "timeline-new-era",
                "abilities": ["move-energy-spark"],
                "weapons": [],
                "clan": "org-umgadi"
            }
        ]
    },
    # 32. Tanya
    {
        "id": "character-tanya",
        "name": "Tanya",
        "alternateName": "Leader of the Umgadi",
        "firstAppearanceYear": "1997",
        "description": "Edenian diplomat whose allegiance shifted during Shinnok's war; reimagined in the New Era as the disciplined leader of the royal Umgadi guard.",
        "species": "Edenian",
        "originRealm": "realm-edenia",
        "sourceURL": "https://mortalkombat.fandom.com/wiki/Tanya",
        "versions": [
            {
                "versionId": "version-tanya-mk4",
                "gameId": "game-mk4-1997",
                "timelineId": "timeline-original",
                "abilities": [],
                "weapons": ["weapon-daggers-of-denial"],
                "clan": None
            },
            {
                "versionId": "version-tanya-mk1-2023",
                "gameId": "game-mk1-2023",
                "timelineId": "timeline-new-era",
                "abilities": [],
                "weapons": ["weapon-daggers-of-denial"],
                "clan": "org-umgadi"
            }
        ]
    },
    # 33. Havik
    {
        "id": "character-havik",
        "name": "Havik",
        "alternateName": "Cleric of Chaos",
        "firstAppearanceYear": "2004",
        "description": "Cleric from Chaosrealm who embraces bodily contortion, self-mutilation, and anarchy to dismantle rigid oppressive order across all realms.",
        "species": "Chaosrealmer",
        "originRealm": "realm-chaosrealm",
        "sourceURL": "https://mortalkombat.fandom.com/wiki/Havik",
        "versions": [
            {
                "versionId": "version-havik-mk-deception-2004",
                "gameId": "game-mk-deception-2004",
                "timelineId": "timeline-original",
                "abilities": ["move-bone-twist"],
                "weapons": [],
                "clan": None
            },
            {
                "versionId": "version-havik-mk1-2023",
                "gameId": "game-mk1-2023",
                "timelineId": "timeline-new-era",
                "abilities": ["move-bone-twist"],
                "weapons": [],
                "clan": None
            }
        ]
    },
    # 34. Cassie Cage
    {
        "id": "character-cassiecage",
        "name": "Cassie Cage",
        "alternateName": "Commander Cassandra Cage",
        "firstAppearanceYear": "2015",
        "description": "Daughter of Johnny Cage and Sonya Blade, leading Earthrealm's new-generation strike team and inheriting her father's ancient green halo power.",
        "species": "Human",
        "originRealm": "realm-earthrealm",
        "sourceURL": "https://mortalkombat.fandom.com/wiki/Cassie_Cage",
        "versions": [
            {
                "versionId": "version-cassiecage-mkx",
                "gameId": "game-mkx-2015",
                "timelineId": "timeline-reboot",
                "abilities": ["move-shadow-kick", "move-nut-punch"],
                "weapons": [],
                "clan": "org-special-forces"
            },
            {
                "versionId": "version-cassiecage-mk11",
                "gameId": "game-mk11-2019",
                "timelineId": "timeline-reboot",
                "abilities": ["move-shadow-kick", "move-nut-punch"],
                "weapons": [],
                "clan": "org-special-forces"
            }
        ]
    },
    # 35. Kotal Kahn
    {
        "id": "character-kotalkahn",
        "name": "Kotal Kahn",
        "alternateName": "Ko'atal (Sun God)",
        "firstAppearanceYear": "2015",
        "description": "Osh-Tekk warrior and Sun God who deposed Mileena during the Outworld Civil War to become a pragmatic Emperor of Outworld.",
        "species": "Osh-Tekk",
        "originRealm": "realm-outworld",
        "sourceURL": "https://mortalkombat.fandom.com/wiki/Kotal_Kahn",
        "versions": [
            {
                "versionId": "version-kotalkahn-mkx",
                "gameId": "game-mkx-2015",
                "timelineId": "timeline-reboot",
                "abilities": ["move-sun-ray", "move-blood-tentacles"],
                "weapons": [],
                "clan": "org-osh-tekk"
            },
            {
                "versionId": "version-kotalkahn-mk11",
                "gameId": "game-mk11-2019",
                "timelineId": "timeline-reboot",
                "abilities": ["move-sun-ray"],
                "weapons": [],
                "clan": "org-osh-tekk"
            }
        ]
    },
    # 36. Erron Black
    {
        "id": "character-erronblack",
        "name": "Erron Black",
        "alternateName": "The Outworld Gunslinger",
        "firstAppearanceYear": "2015",
        "description": "Earthrealm 19th-century mercenary cowboy granted slowed aging by Shang Tsung, working as an Outworld gunslinger for highest bidder.",
        "species": "Human",
        "originRealm": "realm-earthrealm",
        "sourceURL": "https://mortalkombat.fandom.com/wiki/Erron_Black",
        "versions": [
            {
                "versionId": "version-erronblack-mkx",
                "gameId": "game-mkx-2015",
                "timelineId": "timeline-reboot",
                "abilities": ["move-revolver-quickdraw"],
                "weapons": ["weapon-dual-revolvers"],
                "clan": "org-black-dragon"
            },
            {
                "versionId": "version-erronblack-mk11",
                "gameId": "game-mk11-2019",
                "timelineId": "timeline-reboot",
                "abilities": ["move-revolver-quickdraw"],
                "weapons": ["weapon-dual-revolvers"],
                "clan": "org-black-dragon"
            }
        ]
    },
    # 37. Jade
    {
        "id": "character-jade",
        "name": "Jade",
        "alternateName": "Imperial Bodyguard of Kitana",
        "firstAppearanceYear": "1993",
        "description": "Stealth assassin and steadfast childhood friend of Kitana, renowned for her blazing staff combat and loyalty to Edenia.",
        "species": "Edenian",
        "originRealm": "realm-edenia",
        "sourceURL": "https://mortalkombat.fandom.com/wiki/Jade",
        "versions": [
            {
                "versionId": "version-jade-umk3",
                "gameId": "game-umk3-1995",
                "timelineId": "timeline-original",
                "abilities": ["move-blazing-nitro-kick", "move-tribomerang", "fatality-bow-before-me"],
                "weapons": ["weapon-bo-staff"],
                "clan": None
            },
            {
                "versionId": "version-jade-mk11",
                "gameId": "game-mk11-2019",
                "timelineId": "timeline-reboot",
                "abilities": ["move-blazing-nitro-kick", "move-tribomerang"],
                "weapons": ["weapon-bo-staff"],
                "clan": None
            }
        ]
    },
    # 38. Kabal
    {
        "id": "character-kabal",
        "name": "Kabal",
        "alternateName": "The Hooksword Speedster",
        "firstAppearanceYear": "1995",
        "description": "Former Black Dragon enforcer equipped with artificial respirators and superhuman running speed following severe burns from Shao Kahn's extermination squads.",
        "species": "Human (Respirator)",
        "originRealm": "realm-earthrealm",
        "sourceURL": "https://mortalkombat.fandom.com/wiki/Kabal",
        "versions": [
            {
                "versionId": "version-kabal-mk3",
                "gameId": "game-mk3-1995",
                "timelineId": "timeline-original",
                "abilities": ["move-nomad-dash", "move-buzzsaw", "fatality-road-rash"],
                "weapons": ["weapon-hookswords"],
                "clan": "org-black-dragon"
            },
            {
                "versionId": "version-kabal-mk11",
                "gameId": "game-mk11-2019",
                "timelineId": "timeline-reboot",
                "abilities": ["move-nomad-dash", "move-buzzsaw"],
                "weapons": ["weapon-hookswords"],
                "clan": "org-black-dragon"
            }
        ]
    },
    # 39. Kurtis Stryker
    {
        "id": "character-stryker",
        "name": "Kurtis Stryker",
        "alternateName": "Riot Control Officer",
        "firstAppearanceYear": "1995",
        "description": "Earthrealm riot police leader thrust into the invasion of Earthrealm, defending humanity using batons, grenades, and standard issue firepower.",
        "species": "Human",
        "originRealm": "realm-earthrealm",
        "sourceURL": "https://mortalkombat.fandom.com/wiki/Kurtis_Stryker",
        "versions": [
            {
                "versionId": "version-stryker-mk3",
                "gameId": "game-mk3-1995",
                "timelineId": "timeline-original",
                "abilities": ["move-baton-trip", "move-grenade-toss", "fatality-time-served"],
                "weapons": ["weapon-nightsticks"],
                "clan": "org-special-forces"
            },
            {
                "versionId": "version-stryker-mk9",
                "gameId": "game-mk9-2011",
                "timelineId": "timeline-reboot",
                "abilities": ["move-baton-trip", "move-grenade-toss"],
                "weapons": ["weapon-nightsticks"],
                "clan": "org-special-forces"
            }
        ]
    },
    # 40. Sheeva
    {
        "id": "character-sheeva",
        "name": "Sheeva",
        "alternateName": "Queen of the Shokan",
        "firstAppearanceYear": "1995",
        "description": "Noble Draco Shokan warrior appointed by Shao Kahn as personal bodyguard to Queen Sindel, later becoming Queen of the Shokan people.",
        "species": "Shokan (Draco)",
        "originRealm": "realm-outworld",
        "sourceURL": "https://mortalkombat.fandom.com/wiki/Sheeva",
        "versions": [
            {
                "versionId": "version-sheeva-mk3",
                "gameId": "game-mk3-1995",
                "timelineId": "timeline-original",
                "abilities": ["move-teleport-stomp", "move-untranslatable-rage", "fatality-spine-ripper"],
                "weapons": ["weapon-shokan-cleavers"],
                "clan": None
            },
            {
                "versionId": "version-sheeva-mk9",
                "gameId": "game-mk9-2011",
                "timelineId": "timeline-reboot",
                "abilities": ["move-teleport-stomp"],
                "weapons": ["weapon-shokan-cleavers"],
                "clan": None
            }
        ]
    },
    # 41. Nightwolf
    {
        "id": "character-nightwolf",
        "name": "Nightwolf",
        "alternateName": "Matoka Shaman",
        "firstAppearanceYear": "1995",
        "description": "Matoka tribal shaman and historian chosen by the Great Spirit to defend Earthrealm using spirit weapons and sacred communion.",
        "species": "Human Shaman",
        "originRealm": "realm-earthrealm",
        "sourceURL": "https://mortalkombat.fandom.com/wiki/Nightwolf",
        "versions": [
            {
                "versionId": "version-nightwolf-mk3",
                "gameId": "game-mk3-1995",
                "timelineId": "timeline-original",
                "abilities": ["move-spirit-arrow", "move-rhino-charge", "fatality-war-dance"],
                "weapons": ["weapon-spirit-tomahawks"],
                "clan": None
            },
            {
                "versionId": "version-nightwolf-mk9",
                "gameId": "game-mk9-2011",
                "timelineId": "timeline-reboot",
                "abilities": ["move-spirit-arrow", "move-rhino-charge"],
                "weapons": ["weapon-spirit-tomahawks"],
                "clan": None
            }
        ]
    },
    # 42. D'Vorah
    {
        "id": "character-dvorah",
        "name": "D'Vorah",
        "alternateName": "The Kytinn Broodmother",
        "firstAppearanceYear": "2015",
        "description": "Ruthless sentient insectoid swarm entity seeking solely the survival and propagation of the Kytinn species above all empire allegiances.",
        "species": "Kytinn",
        "originRealm": "realm-outworld",
        "sourceURL": "https://mortalkombat.fandom.com/wiki/D%27Vorah",
        "versions": [
            {
                "versionId": "version-dvorah-mkx",
                "gameId": "game-mkx-2015",
                "timelineId": "timeline-reboot",
                "abilities": ["move-ovipositor-rush", "move-bug-spray", "fatality-infestation"],
                "weapons": ["weapon-ovipositors"],
                "clan": None
            },
            {
                "versionId": "version-dvorah-mk11",
                "gameId": "game-mk11-2019",
                "timelineId": "timeline-reboot",
                "abilities": ["move-ovipositor-rush", "move-bug-spray"],
                "weapons": ["weapon-ovipositors"],
                "clan": None
            }
        ]
    },
    # 43. Jacqui Briggs
    {
        "id": "character-jacqui",
        "name": "Jacqui Briggs",
        "alternateName": "Specialist Jacqueline Briggs",
        "firstAppearanceYear": "2015",
        "description": "Junior Olympic kickboxer and Special Forces operative fighting in high-tech combat gauntlets alongside her father Jax.",
        "species": "Human",
        "originRealm": "realm-earthrealm",
        "sourceURL": "https://mortalkombat.fandom.com/wiki/Jacqui_Briggs",
        "versions": [
            {
                "versionId": "version-jacqui-mkx",
                "gameId": "game-mkx-2015",
                "timelineId": "timeline-reboot",
                "abilities": ["move-bionic-dash", "move-shotgun-blast", "fatality-spider-mines"],
                "weapons": [],
                "clan": "org-special-forces"
            },
            {
                "versionId": "version-jacqui-mk11",
                "gameId": "game-mk11-2019",
                "timelineId": "timeline-reboot",
                "abilities": ["move-bionic-dash", "move-shotgun-blast"],
                "weapons": [],
                "clan": "org-special-forces"
            }
        ]
    },
    # 44. Takeda Takahashi
    {
        "id": "character-takeda",
        "name": "Takeda Takahashi",
        "alternateName": "Shirai Ryu Apprentice",
        "firstAppearanceYear": "2015",
        "description": "Son of Kenshi trained from boyhood by Grandmaster Hanzo Hasashi in Shirai Ryu martial arts and telepathic sensory control.",
        "species": "Human",
        "originRealm": "realm-earthrealm",
        "sourceURL": "https://mortalkombat.fandom.com/wiki/Takeda_Takahashi",
        "versions": [
            {
                "versionId": "version-takeda-mkx",
                "gameId": "game-mkx-2015",
                "timelineId": "timeline-reboot",
                "abilities": ["move-whip-strike", "move-shirai-ryu-phase", "fatality-whip-it-good"],
                "weapons": ["weapon-bladed-whips"],
                "clan": "org-shirai-ryu"
            }
        ]
    },
    # 45. Kung Jin
    {
        "id": "character-kungjin",
        "name": "Kung Jin",
        "alternateName": "Shaolin Archer",
        "firstAppearanceYear": "2015",
        "description": "Cousin of Kung Lao and reformed thief turned Shaolin archer recruited into Cassie Cage's Special Forces tactical unit.",
        "species": "Human",
        "originRealm": "realm-earthrealm",
        "sourceURL": "https://mortalkombat.fandom.com/wiki/Kung_Jin",
        "versions": [
            {
                "versionId": "version-kungjin-mkx",
                "gameId": "game-mkx-2015",
                "timelineId": "timeline-reboot",
                "abilities": ["move-straight-shot", "move-lunge-kick", "fatality-target-practice"],
                "weapons": ["weapon-combat-bow"],
                "clan": "org-special-forces"
            }
        ]
    },
    # 46. Cetrion
    {
        "id": "character-cetrion",
        "name": "Cetrion",
        "alternateName": "Elder Goddess of Virtue and Life",
        "firstAppearanceYear": "2019",
        "description": "Daughter of Kronika and sister to Shinnok, manipulating earth, water, fire, and air while torn between familial duty and universal righteousness.",
        "species": "Elder Goddess",
        "originRealm": "realm-earthrealm",
        "sourceURL": "https://mortalkombat.fandom.com/wiki/Cetrion",
        "versions": [
            {
                "versionId": "version-cetrion-mk11",
                "gameId": "game-mk11-2019",
                "timelineId": "timeline-reboot",
                "abilities": ["move-boulder-bash", "move-hells-wrath", "fatality-good-and-evil"],
                "weapons": [],
                "clan": None
            }
        ]
    },
    # 47. Kollector
    {
        "id": "character-kollector",
        "name": "Kollector",
        "alternateName": "Tribute Collector of Outworld",
        "firstAppearanceYear": "2019",
        "description": "Six-armed Naknada extortionist who amassed wealth and stolen relics across the realms in unwavering service to Shao Kahn.",
        "species": "Naknada",
        "originRealm": "realm-outworld",
        "sourceURL": "https://mortalkombat.fandom.com/wiki/Kollector",
        "versions": [
            {
                "versionId": "version-kollector-mk11",
                "gameId": "game-mk11-2019",
                "timelineId": "timeline-reboot",
                "abilities": ["move-shotel-strike", "move-demonic-mace", "fatality-for-the-kollection"],
                "weapons": [],
                "clan": None
            }
        ]
    },
    # 48. Onaga
    {
        "id": "character-onaga",
        "name": "Onaga",
        "alternateName": "The Dragon King",
        "firstAppearanceYear": "2004",
        "description": "Ancient colossal Dragon King who ruled Outworld with an undefeatable army before being poisoned by Shao Kahn; returned by manipulating Shujinko.",
        "species": "Dragon",
        "originRealm": "realm-outworld",
        "sourceURL": "https://mortalkombat.fandom.com/wiki/Onaga",
        "versions": [
            {
                "versionId": "version-onaga-mk-deception-2004",
                "gameId": "game-mk-deception-2004",
                "timelineId": "timeline-original",
                "abilities": ["move-dragon-breath", "move-dragon-slam"],
                "weapons": [],
                "clan": None
            },
            {
                "versionId": "version-onaga-mk-armageddon-2006",
                "gameId": "game-mk-armageddon-2006",
                "timelineId": "timeline-original",
                "abilities": ["move-dragon-breath"],
                "weapons": [],
                "clan": None
            }
        ]
    },
    # 49. Shujinko
    {
        "id": "character-shujinko",
        "name": "Shujinko",
        "alternateName": "Champion of the Kamidogu",
        "firstAppearanceYear": "2004",
        "description": "Earthrealm warrior who spent decades questing to gather the Kamidogu for the entity Damashi, only to realize he had been manipulated into resurrecting Onaga.",
        "species": "Human",
        "originRealm": "realm-earthrealm",
        "sourceURL": "https://mortalkombat.fandom.com/wiki/Shujinko",
        "versions": [
            {
                "versionId": "version-shujinko-mk-deception-2004",
                "gameId": "game-mk-deception-2004",
                "timelineId": "timeline-original",
                "abilities": ["move-mimic-mastery", "fatality-face-crusher"],
                "weapons": [],
                "clan": "org-white-lotus"
            },
            {
                "versionId": "version-shujinko-mk-armageddon-2006",
                "gameId": "game-mk-armageddon-2006",
                "timelineId": "timeline-original",
                "abilities": ["move-mimic-mastery"],
                "weapons": [],
                "clan": "org-white-lotus"
            }
        ]
    },
    # 50. Reiko
    {
        "id": "character-reiko",
        "name": "Reiko",
        "alternateName": "General of the Outworld Army",
        "firstAppearanceYear": "1997",
        "description": "Savage Outworld war general who served in Shinnok's forces and Shao Kahn's legions, obsessed with unyielding imperial dominance.",
        "species": "Outworlder",
        "originRealm": "realm-outworld",
        "sourceURL": "https://mortalkombat.fandom.com/wiki/Reiko",
        "versions": [
            {
                "versionId": "version-reiko-mk4",
                "gameId": "game-mk4-1997",
                "timelineId": "timeline-original",
                "abilities": ["move-charging-spear"],
                "weapons": ["weapon-spiked-club"],
                "clan": None
            },
            {
                "versionId": "version-reiko-mk-gold-1999",
                "gameId": "game-mk-gold-1999",
                "timelineId": "timeline-original",
                "abilities": ["move-charging-spear"],
                "weapons": ["weapon-spiked-club"],
                "clan": None
            },
            {
                "versionId": "version-reiko-mk1-2023",
                "gameId": "game-mk1-2023",
                "timelineId": "timeline-new-era",
                "abilities": ["move-charging-spear"],
                "weapons": ["weapon-spiked-club"],
                "clan": None
            }
        ]
    },
    # 51. Nitara
    {
        "id": "character-nitara",
        "name": "Nitara",
        "alternateName": "Vampress of Vaeternus",
        "firstAppearanceYear": "2002",
        "description": "Vampire warrior who sought to separate her home realm of Vaeternus from Outworld by destroying the binding dimensional orb.",
        "species": "Vampire",
        "originRealm": "realm-vaeternus",
        "sourceURL": "https://mortalkombat.fandom.com/wiki/Nitara",
        "versions": [
            {
                "versionId": "version-nitara-mk-deadly-alliance-2002",
                "gameId": "game-mk-deadly-alliance-2002",
                "timelineId": "timeline-original",
                "abilities": ["move-blood-spit", "fatality-vaeternus-drain"],
                "weapons": [],
                "clan": None
            },
            {
                "versionId": "version-nitara-mk1-2023",
                "gameId": "game-mk1-2023",
                "timelineId": "timeline-new-era",
                "abilities": ["move-blood-spit"],
                "weapons": [],
                "clan": None
            }
        ]
    },
    # 52. Sareena
    {
        "id": "character-sareena",
        "name": "Sareena",
        "alternateName": "Assassin of the Shadow Priests",
        "firstAppearanceYear": "1997",
        "description": "Netherrealm demon assassin serving Quan Chi who rebelled after meeting Bi-Han, seeking to escape the Netherrealm and preserve her humanity.",
        "species": "Demon",
        "originRealm": "realm-netherrealm",
        "sourceURL": "https://mortalkombat.fandom.com/wiki/Sareena",
        "versions": [
            {
                "versionId": "version-sareena-mk-mythologies-1997",
                "gameId": "game-mk-mythologies-1997",
                "timelineId": "timeline-original",
                "abilities": ["move-skull-daggers"],
                "weapons": [],
                "clan": "org-brotherhood-of-shadow"
            },
            {
                "versionId": "version-sareena-mk-tournament-edition-2003",
                "gameId": "game-mk-tournament-edition-2003",
                "timelineId": "timeline-original",
                "abilities": ["move-skull-daggers"],
                "weapons": [],
                "clan": "org-lin-kuei"
            }
        ]
    },
    # 53. Ashrah
    {
        "id": "character-ashrah",
        "name": "Ashrah",
        "alternateName": "The Purified Demon",
        "firstAppearanceYear": "2004",
        "description": "Netherrealm demon who found the holy Kriss sword 'Datusha', purifying her demonic soul with every evil demon she slays.",
        "species": "Demon (Purified)",
        "originRealm": "realm-netherrealm",
        "sourceURL": "https://mortalkombat.fandom.com/wiki/Ashrah",
        "versions": [
            {
                "versionId": "version-ashrah-mk-deception-2004",
                "gameId": "game-mk-deception-2004",
                "timelineId": "timeline-original",
                "abilities": ["move-heavenly-light", "fatality-divine-purification"],
                "weapons": ["weapon-kriss-dagger"],
                "clan": None
            },
            {
                "versionId": "version-ashrah-mk1-2023",
                "gameId": "game-mk1-2023",
                "timelineId": "timeline-new-era",
                "abilities": ["move-heavenly-light"],
                "weapons": ["weapon-kriss-dagger"],
                "clan": None
            }
        ]
    },
    # 54. Hotaru
    {
        "id": "character-hotaru",
        "name": "Hotaru",
        "alternateName": "Commander of the Seidan Guard",
        "firstAppearanceYear": "2004",
        "description": "Inflexible military commander from Orderrealm who enforces law and order with zero tolerance for chaos, even allying with Onaga to suppress rebellion.",
        "species": "Seidan",
        "originRealm": "realm-orderrealm",
        "sourceURL": "https://mortalkombat.fandom.com/wiki/Hotaru",
        "versions": [
            {
                "versionId": "version-hotaru-mk-deception-2004",
                "gameId": "game-mk-deception-2004",
                "timelineId": "timeline-original",
                "abilities": ["move-lava-burst"],
                "weapons": [],
                "clan": "org-seidan-guard"
            },
            {
                "versionId": "version-hotaru-mk-armageddon-2006",
                "gameId": "game-mk-armageddon-2006",
                "timelineId": "timeline-original",
                "abilities": ["move-lava-burst"],
                "weapons": [],
                "clan": "org-seidan-guard"
            }
        ]
    },
    # 55. Mavado
    {
        "id": "character-mavado",
        "name": "Mavado",
        "alternateName": "Leader of the Red Dragon",
        "firstAppearanceYear": "2002",
        "description": "Disciplined operative who uses grappling hook bungee cables in battle, dedicated to the total eradication of Kano's Black Dragon.",
        "species": "Human",
        "originRealm": "realm-earthrealm",
        "sourceURL": "https://mortalkombat.fandom.com/wiki/Mavado",
        "versions": [
            {
                "versionId": "version-mavado-mk-deadly-alliance-2002",
                "gameId": "game-mk-deadly-alliance-2002",
                "timelineId": "timeline-original",
                "abilities": ["move-grapple-hook-kick"],
                "weapons": ["weapon-hookswords"],
                "clan": "org-red-dragon"
            },
            {
                "versionId": "version-mavado-mk-tournament-edition-2003",
                "gameId": "game-mk-tournament-edition-2003",
                "timelineId": "timeline-original",
                "abilities": ["move-grapple-hook-kick"],
                "weapons": ["weapon-hookswords"],
                "clan": "org-red-dragon"
            }
        ]
    },
    # 56. Ferra & Torr
    {
        "id": "character-ferratorr",
        "name": "Ferra & Torr",
        "alternateName": "Symbiotic Duo",
        "firstAppearanceYear": "2015",
        "description": "Brutal symbiotic pair from Outworld consisting of the child rider Ferra commanding the hulking brute Torr in battle.",
        "species": "Outworld Symbiotes",
        "originRealm": "realm-outworld",
        "sourceURL": "https://mortalkombat.fandom.com/wiki/Ferra_%26_Torr",
        "versions": [
            {
                "versionId": "version-ferratorr-mkx",
                "gameId": "game-mkx-2015",
                "timelineId": "timeline-reboot",
                "abilities": [],
                "weapons": [],
                "clan": "org-osh-tekk"
            }
        ]
    },
    # 57. Motaro
    {
        "id": "character-motaro",
        "name": "Motaro",
        "alternateName": "Centaurian General",
        "firstAppearanceYear": "1995",
        "description": "Mighty Centaurian warlord with a bionic tail chosen by Shao Kahn to head his invasion squads, rivaling the Shokan race.",
        "species": "Centaurian",
        "originRealm": "realm-outworld",
        "sourceURL": "https://mortalkombat.fandom.com/wiki/Motaro",
        "versions": [
            {
                "versionId": "version-motaro-mk3",
                "gameId": "game-mk3-1995",
                "timelineId": "timeline-original",
                "abilities": ["move-centaur-charge"],
                "weapons": [],
                "clan": None
            },
            {
                "versionId": "version-motaro-mk-armageddon-2006",
                "gameId": "game-mk-armageddon-2006",
                "timelineId": "timeline-original",
                "abilities": ["move-centaur-charge"],
                "weapons": [],
                "clan": None
            }
        ]
    },
    # 58. Blaze
    {
        "id": "character-blaze",
        "name": "Blaze",
        "alternateName": "The Elemental Catalyst",
        "firstAppearanceYear": "2002",
        "description": "Living fire elemental created by Edenian sorceress Delia to monitor warrior power growth and trigger the Armageddon convergence.",
        "species": "Fire Elemental",
        "originRealm": "realm-edenia",
        "sourceURL": "https://mortalkombat.fandom.com/wiki/Blaze",
        "versions": [
            {
                "versionId": "version-blaze-mk-deadly-alliance-2002",
                "gameId": "game-mk-deadly-alliance-2002",
                "timelineId": "timeline-original",
                "abilities": ["move-fire-fist"],
                "weapons": [],
                "clan": None
            },
            {
                "versionId": "version-blaze-mk-armageddon-2006",
                "gameId": "game-mk-armageddon-2006",
                "timelineId": "timeline-original",
                "abilities": ["move-fire-fist"],
                "weapons": [],
                "clan": None
            }
        ]
    },
    # 59. Daegon
    {
        "id": "character-daegon",
        "name": "Daegon",
        "alternateName": "Founder of the Red Dragon",
        "firstAppearanceYear": "2006",
        "description": "Edenian demigod son of Argus and Delia who awoke prematurely, slew his parents, and established the criminal Red Dragon syndicate.",
        "species": "Edenian Demigod",
        "originRealm": "realm-edenia",
        "sourceURL": "https://mortalkombat.fandom.com/wiki/Daegon",
        "versions": [
            {
                "versionId": "version-daegon-mk-armageddon-2006",
                "gameId": "game-mk-armageddon-2006",
                "timelineId": "timeline-original",
                "abilities": [],
                "weapons": [],
                "clan": "org-red-dragon"
            }
        ]
    },
    # 60. Taven
    {
        "id": "character-taven",
        "name": "Taven",
        "alternateName": "Son of Argus",
        "firstAppearanceYear": "2006",
        "description": "Edenian demigod awoken during Armageddon to fulfill his father's quest by ascending the Pyramid of Argus and defeating Blaze.",
        "species": "Edenian Demigod",
        "originRealm": "realm-edenia",
        "sourceURL": "https://mortalkombat.fandom.com/wiki/Taven",
        "versions": [
            {
                "versionId": "version-taven-mk-armageddon-2006",
                "gameId": "game-mk-armageddon-2006",
                "timelineId": "timeline-original",
                "abilities": [],
                "weapons": [],
                "clan": None
            }
        ]
    }
]

# ----------------------------------------------------
# 9. STORY EVENTS (25 Lore Milestones across Timelines)
# ----------------------------------------------------
STORY_EVENTS = [
    {
        "id": "event-mythologies-quest",
        "eventTitle": "Bi-Han's Netherrealm Quest",
        "eventSummary": "Sub-Zero (Bi-Han) retrieves Shinnok's sacred amulet for Quan Chi, defeating the elemental gods before realizing he aided Netherrealm darkness.",
        "timelineId": "timeline-original",
        "gameId": "game-mk-mythologies-1997",
        "chronology": 1,
        "participants": ["character-subzero", "character-quanchi", "character-shinnok", "character-sareena"],
        "sourceURL": "https://mortalkombat.fandom.com/wiki/Mortal_Kombat_Mythologies:_Sub-Zero"
    },
    {
        "id": "event-first-tournament",
        "eventTitle": "Tenth Mortal Kombat Tournament",
        "eventSummary": "Liu Kang defeats Prince Goro and Sorcerer Shang Tsung, preventing Outworld from claiming its tenth consecutive tournament victory.",
        "timelineId": "timeline-original",
        "gameId": "game-mk1-1992",
        "chronology": 2,
        "participants": ["character-liukang", "character-shangtsung", "character-goro", "character-raiden", "character-scorpion"],
        "sourceURL": "https://mortalkombat.fandom.com/wiki/Mortal_Kombat_(1992_video_game)"
    },
    {
        "id": "event-outworld-tournament",
        "eventTitle": "Outworld Tournament Lure",
        "eventSummary": "Shao Kahn entices Earthrealm's defenders into Outworld; Liu Kang triumphs over Shao Kahn, while Kitana discovers her clone Mileena.",
        "timelineId": "timeline-original",
        "gameId": "game-mk2-1993",
        "chronology": 3,
        "participants": ["character-shaokahn", "character-liukang", "character-kitana", "character-mileena", "character-jax"],
        "sourceURL": "https://mortalkombat.fandom.com/wiki/Mortal_Kombat_II"
    },
    {
        "id": "event-earthrealm-invasion",
        "eventTitle": "Invasion of Earthrealm & Cyber Initiative",
        "eventSummary": "Shao Kahn resurrects Queen Sindel on Earth to bypass tournament rules, merging the realms until Earth's defenders force him to retreat.",
        "timelineId": "timeline-original",
        "gameId": "game-mk3-1995",
        "chronology": 4,
        "participants": ["character-shaokahn", "character-sindel", "character-cyrax", "character-sektor", "character-kabal", "character-stryker"],
        "sourceURL": "https://mortalkombat.fandom.com/wiki/Mortal_Kombat_3"
    },
    {
        "id": "event-shinnok-invasion-mk4",
        "eventTitle": "Shinnok's War Against Edenia and Heaven",
        "eventSummary": "Aided by the traitor Tanya, Shinnok escapes the Netherrealm, conquering Edenia and assaulting the Heavens before Raiden and Liu Kang repel him.",
        "timelineId": "timeline-original",
        "gameId": "game-mk4-1997",
        "chronology": 5,
        "participants": ["character-shinnok", "character-quanchi", "character-raiden", "character-tanya", "character-fujin", "character-reiko"],
        "sourceURL": "https://mortalkombat.fandom.com/wiki/Mortal_Kombat_4"
    },
    {
        "id": "event-special-forces-chase",
        "eventTitle": "Black Dragon Containment Operation",
        "eventSummary": "Major Jax Briggs pursues Kano and his lieutenants across hidden military complexes, preventing Kano from weaponizing the Eye of Chitian.",
        "timelineId": "timeline-original",
        "gameId": "game-mk-special-forces-2000",
        "chronology": 6,
        "participants": ["character-jax", "character-kano"],
        "sourceURL": "https://mortalkombat.fandom.com/wiki/Mortal_Kombat:_Special_Forces"
    },
    {
        "id": "event-deadly-alliance-formed",
        "eventTitle": "Formation of the Deadly Alliance",
        "eventSummary": "Shang Tsung and Quan Chi join forces, assassinating Shao Kahn and Liu Kang to resurrect the Dragon King's mummified undefeatable army.",
        "timelineId": "timeline-original",
        "gameId": "game-mk-deadly-alliance-2002",
        "chronology": 7,
        "participants": ["character-shangtsung", "character-quanchi", "character-liukang", "character-raiden", "character-kenshi", "character-frost"],
        "sourceURL": "https://mortalkombat.fandom.com/wiki/Deadly_Alliance"
    },
    {
        "id": "event-shujinko-deception",
        "eventTitle": "The Deception of Shujinko",
        "eventSummary": "Believing he serves the Elder Gods through avatar Damashi, Shujinko spends a lifetime assembling the six Kamidogu, inadvertently resurrecting Onaga.",
        "timelineId": "timeline-original",
        "gameId": "game-mk-deception-2004",
        "chronology": 8,
        "participants": ["character-shujinko", "character-onaga", "character-boraicho"],
        "sourceURL": "https://mortalkombat.fandom.com/wiki/Shujinko"
    },
    {
        "id": "event-resurrection-of-onaga",
        "eventTitle": "Return of the Dragon King",
        "eventSummary": "Onaga returns from the dead to reclaim Outworld's throne, breaking the Deadly Alliance and forcing Raiden to self-destruct in a desperate futile blast.",
        "timelineId": "timeline-original",
        "gameId": "game-mk-deception-2004",
        "chronology": 9,
        "participants": ["character-raiden", "character-shangtsung", "character-quanchi", "character-onaga", "character-hotaru", "character-havik"],
        "sourceURL": "https://mortalkombat.fandom.com/wiki/Onaga"
    },
    {
        "id": "event-shaolin-monks-crusade",
        "eventTitle": "Shaolin Crusade Across Outworld",
        "eventSummary": "Liu Kang and Kung Lao battle Baraka, Goro, and Shang Tsung across Outworld wastelands following the destruction of the Shaolin Temple.",
        "timelineId": "timeline-original",
        "gameId": "game-mk-shaolin-monks-2005",
        "chronology": 10,
        "participants": ["character-liukang", "character-kunglao", "character-baraka", "character-goro"],
        "sourceURL": "https://mortalkombat.fandom.com/wiki/Mortal_Kombat:_Shaolin_Monks"
    },
    {
        "id": "event-battle-of-armageddon",
        "eventTitle": "The Battle of the Pyramid of Argus",
        "eventSummary": "All 62 warriors clash in Edenia around the Pyramid of Argus to claim Blaze's power. Shao Kahn emerges victorious, forcing Raiden to send a psychic warning into the past.",
        "timelineId": "timeline-original",
        "gameId": "game-mk-armageddon-2006",
        "chronology": 11,
        "participants": ["character-raiden", "character-shaokahn", "character-blaze", "character-taven", "character-daegon"],
        "sourceURL": "https://mortalkombat.fandom.com/wiki/Battle_of_Armageddon"
    },
    {
        "id": "event-worlds-collide-crisis",
        "eventTitle": "Worlds Collide Dimensional Merger",
        "eventSummary": "Darkseid and Shao Kahn merge into Dark Kahn, triggering the combat rage that drives champions from both universes into mutual conflict.",
        "timelineId": "timeline-original",
        "gameId": "game-mk-vs-dc-2008",
        "chronology": 12,
        "participants": ["character-raiden", "character-shaokahn", "character-scorpion", "character-subzero"],
        "sourceURL": "https://mortalkombat.fandom.com/wiki/Mortal_Kombat_vs._DC_Universe"
    },
    {
        "id": "event-raiden-vision-reset",
        "eventTitle": "Raiden's Temporal Message (He Must Win)",
        "eventSummary": "Raiden alters history during the first tournament upon receiving visions from his future dying self during the Armageddon climax.",
        "timelineId": "timeline-reboot",
        "gameId": "game-mk9-2011",
        "chronology": 13,
        "participants": ["character-raiden", "character-liukang", "character-shaokahn"],
        "sourceURL": "https://mortalkombat.fandom.com/wiki/Mortal_Kombat_(2011_video_game)"
    },
    {
        "id": "event-lin-kuei-cyber-initiative",
        "eventTitle": "The Cyber Initiative in the Reboot",
        "eventSummary": "The Lin Kuei converts its assassins into emotionless cybernetic units; Kuai Liang is captured and automated as Cyber Sub-Zero while Smoke escapes.",
        "timelineId": "timeline-reboot",
        "gameId": "game-mk9-2011",
        "chronology": 14,
        "participants": ["character-subzero", "character-cyrax", "character-sektor", "character-smoke"],
        "sourceURL": "https://mortalkombat.fandom.com/wiki/Cyber_Initiative"
    },
    {
        "id": "event-sindel-massacre",
        "eventTitle": "The Slaughter of Earthrealm's Champions",
        "eventSummary": "Empowered by Shang Tsung's soul, resurrected Queen Sindel massacres the Earthrealm defenders, leading to their resurrection as Netherrealm revenants.",
        "timelineId": "timeline-reboot",
        "gameId": "game-mk9-2011",
        "chronology": 15,
        "participants": ["character-sindel", "character-jax", "character-jade", "character-kabal", "character-stryker", "character-nightwolf"],
        "sourceURL": "https://mortalkombat.fandom.com/wiki/Mortal_Kombat_(2011_video_game)"
    },
    {
        "id": "event-shinnok-netherrealm-war",
        "eventTitle": "Netherrealm War Against Earthrealm",
        "eventSummary": "Fallen Elder God Shinnok leads Netherrealm revenants in an assault on the Jinsei Chamber before being trapped inside his own amulet by Johnny Cage.",
        "timelineId": "timeline-reboot",
        "gameId": "game-mkx-2015",
        "chronology": 16,
        "participants": ["character-shinnok", "character-raiden", "character-quanchi", "character-johnnycage", "character-sonyablade"],
        "sourceURL": "https://mortalkombat.fandom.com/wiki/Netherrealm_War"
    },
    {
        "id": "event-outworld-civil-war",
        "eventTitle": "The Outworld Civil War",
        "eventSummary": "Kotal Kahn overthrows Mileena's chaotic reign; Cassie Cage's team negotiates an alliance while D'Vorah executes Mileena.",
        "timelineId": "timeline-reboot",
        "gameId": "game-mkx-2015",
        "chronology": 17,
        "participants": ["character-kotalkahn", "character-mileena", "character-dvorah", "character-cassiecage", "character-erronblack"],
        "sourceURL": "https://mortalkombat.fandom.com/wiki/Outworld_Civil_War"
    },
    {
        "id": "event-pact-of-fire-and-ice",
        "eventTitle": "Pact of Fire and Ice",
        "eventSummary": "Kuai Liang reveals Quan Chi's deceit to Hanzo Hasashi at the Shirai Ryu Fire Garden, establishing peace between the clans.",
        "timelineId": "timeline-reboot",
        "gameId": "game-mkx-2015",
        "chronology": 18,
        "participants": ["character-scorpion", "character-subzero"],
        "sourceURL": "https://mortalkombat.fandom.com/wiki/Mortal_Kombat_X"
    },
    {
        "id": "event-cassie-defeats-shinnok",
        "eventTitle": "Fall of Corrupted Shinnok",
        "eventSummary": "Cassie Cage awakens her ancient green shadow halo energy to defeat Corrupted Shinnok and purify the Earthrealm Jinsei.",
        "timelineId": "timeline-reboot",
        "gameId": "game-mkx-2015",
        "chronology": 19,
        "participants": ["character-cassiecage", "character-shinnok", "character-johnnycage", "character-jacqui", "character-takeda", "character-kungjin"],
        "sourceURL": "https://mortalkombat.fandom.com/wiki/Mortal_Kombat_X"
    },
    {
        "id": "event-time-merger",
        "eventTitle": "Kronika's Temporal Convergence",
        "eventSummary": "Kronika collapses time, bringing younger past versions of warriors into the present era to rewrite history without Raiden.",
        "timelineId": "timeline-reboot",
        "gameId": "game-mk11-2019",
        "chronology": 20,
        "participants": ["character-kronika", "character-raiden", "character-scorpion", "character-geras", "character-cetrion"],
        "sourceURL": "https://mortalkombat.fandom.com/wiki/Mortal_Kombat_11"
    },
    {
        "id": "event-dvorah-poisons-hanzo",
        "eventTitle": "Assassination of Grandmaster Hanzo Hasashi",
        "eventSummary": "D'Vorah mortally poisons Grandmaster Hanzo Hasashi; dying in the arms of his past specter self, Hanzo convinces him to choose honor.",
        "timelineId": "timeline-reboot",
        "gameId": "game-mk11-2019",
        "chronology": 21,
        "participants": ["character-dvorah", "character-scorpion"],
        "sourceURL": "https://mortalkombat.fandom.com/wiki/Hanzo_Hasashi"
    },
    {
        "id": "event-battle-for-the-hourglass",
        "eventTitle": "Battle for the Keep of Time",
        "eventSummary": "Combined allied armies storm Kronika's fortress; Fire God Liu Kang defeats Kronika to seize control of the Hourglass.",
        "timelineId": "timeline-reboot",
        "gameId": "game-mk11-2019",
        "chronology": 22,
        "participants": ["character-kronika", "character-liukang", "character-raiden", "character-kitana", "character-geras"],
        "sourceURL": "https://mortalkombat.fandom.com/wiki/Hourglass"
    },
    {
        "id": "event-creation-of-new-era",
        "eventTitle": "Birth of the New Era",
        "eventSummary": "Fire God Liu Kang uses the Hourglass to reset the universe, creating a new cycle where Kombatants receive new destinies.",
        "timelineId": "timeline-new-era",
        "gameId": "game-mk1-2023",
        "chronology": 23,
        "participants": ["character-liukang", "character-geras", "character-raiden"],
        "sourceURL": "https://www.mortalkombat.com/en-us"
    },
    {
        "id": "event-unmasking-of-titan-shang",
        "eventTitle": "Crisis of the Alternate Timelines",
        "eventSummary": "Liu Kang discovers that his timeline victory also generated an alternate timeline where Titan Shang Tsung reigns supreme, igniting a multiversal war.",
        "timelineId": "timeline-new-era",
        "gameId": "game-mk1-2023",
        "chronology": 24,
        "participants": ["character-liukang", "character-shangtsung", "character-subzero", "character-scorpion"],
        "sourceURL": "https://www.mortalkombat.com/en-us"
    },
    {
        "id": "event-onslaught-mobilization",
        "eventTitle": "The Shinnok Relic Onslaught",
        "eventSummary": "Strike squads of Earthrealm and Outworld champions assemble across dimensions to intercept Shinnok's resurging dark talismans.",
        "timelineId": "timeline-new-era",
        "gameId": "game-mk-onslaught-2023",
        "chronology": 25,
        "participants": ["character-raiden", "character-scorpion", "character-subzero", "character-shinnok"],
        "sourceURL": "https://mortalkombat.fandom.com/wiki/Mortal_Kombat:_Onslaught"
    }
]

# ----------------------------------------------------
# 10. RELATIONSHIPS (35+ Predicate Claims with Evidence)
# ----------------------------------------------------
RELATIONSHIPS = [
    # Rivalries & Enmities
    {"subjectId": "character-scorpion", "predicate": "enemyOf", "objectId": "character-subzero", "context": "Original Timeline & Early Reboot", "evidence": "Scorpion blamed Sub-Zero for the demise of Shirai Ryu until truth was revealed."},
    {"subjectId": "character-scorpion", "predicate": "enemyOf", "objectId": "character-quanchi", "context": "All Timelines", "evidence": "Quan Chi was unmasked as the true architect of the Shirai Ryu massacre."},
    {"subjectId": "character-kitana", "predicate": "enemyOf", "objectId": "character-shaokahn", "context": "Reboot Timeline", "evidence": "Kitana led the Outworld rebellion and defeated Shao Kahn to become Kitana Kahn."},
    {"subjectId": "character-sonyablade", "predicate": "enemyOf", "objectId": "character-kano", "context": "All Timelines", "evidence": "Sonya relentlessly pursued Kano for the murder of her Special Forces partner."},
    {"subjectId": "character-cassiecage", "predicate": "enemyOf", "objectId": "character-shinnok", "context": "Reboot Timeline (MKX)", "evidence": "Cassie defeated Corrupted Shinnok to save her father Johnny Cage."},
    {"subjectId": "character-frost", "predicate": "enemyOf", "objectId": "character-subzero", "context": "Reboot Timeline", "evidence": "Frost rebelled against Sub-Zero's leadership and allied with Kronika."},
    {"subjectId": "character-kotalkahn", "predicate": "enemyOf", "objectId": "character-mileena", "context": "Reboot Timeline (Outworld Civil War)", "evidence": "Kotal Kahn led the coup d'état overthrowing Mileena from the Outworld throne."},
    {"subjectId": "character-dvorah", "predicate": "enemyOf", "objectId": "character-mileena", "context": "Reboot Timeline (MKX)", "evidence": "D'Vorah executed Mileena via toxic flesh-eating parasite kiss on Kotal Kahn's order."},
    {"subjectId": "character-dvorah", "predicate": "enemyOf", "objectId": "character-scorpion", "context": "Reboot Timeline (MK11)", "evidence": "D'Vorah fatally stung Grandmaster Hanzo Hasashi at the Sea of Blood."},
    {"subjectId": "character-hotaru", "predicate": "enemyOf", "objectId": "character-havik", "context": "Original Timeline (MK Deception)", "evidence": "Commander Hotaru upholds strict Seidan order while Cleric Havik sows perpetual chaos."},
    {"subjectId": "character-ashrah", "predicate": "enemyOf", "objectId": "character-quanchi", "context": "Original & New Era Timelines", "evidence": "Ashrah renounced Netherrealm evil and hunts Quan Chi's demons to cleanse her spirit."},
    {"subjectId": "character-mavado", "predicate": "enemyOf", "objectId": "character-kano", "context": "Original Timeline", "evidence": "Mavado's Red Dragon sought the systematic extermination of Kano's Black Dragon."},
    {"subjectId": "character-onaga", "predicate": "enemyOf", "objectId": "character-shaokahn", "context": "Original Timeline", "evidence": "Shao Kahn was Onaga's trusted advisor who poisoned him to steal the throne of Outworld."},
    {"subjectId": "character-shujinko", "predicate": "enemyOf", "objectId": "character-onaga", "context": "Original Timeline (MK Deception)", "evidence": "Shujinko shattered the Kamidogu to avenge being deceived by Onaga's avatar Damashi."},
    {"subjectId": "character-raiden", "predicate": "enemyOf", "objectId": "character-shinnok", "context": "All Timelines", "evidence": "Raiden stripped Shinnok of Elder God status and defended Earthrealm from his invasions."},

    # Alliances & Kinships
    {"subjectId": "character-scorpion", "predicate": "alliedWith", "objectId": "character-subzero", "context": "Reboot Timeline (MKX & MK11)", "evidence": "Sub-Zero and Scorpion reconciled at the Shirai Ryu Fire Garden over tea."},
    {"subjectId": "character-raiden", "predicate": "alliedWith", "objectId": "character-liukang", "context": "Original & Reboot Timelines", "evidence": "Raiden mentored Liu Kang as Earthrealm's supreme champion in the tournaments."},
    {"subjectId": "character-shangtsung", "predicate": "alliedWith", "objectId": "character-quanchi", "context": "Original Timeline (Deadly Alliance)", "evidence": "United sorcerers formed the Deadly Alliance to overpower the Thunder God."},
    {"subjectId": "character-cassiecage", "predicate": "alliedWith", "objectId": "character-sonyablade", "context": "Reboot Timeline", "evidence": "Mother and daughter serving together in Earthrealm's Special Forces command."},
    {"subjectId": "character-jade", "predicate": "alliedWith", "objectId": "character-kitana", "context": "All Timelines", "evidence": "Jade served as Kitana's most loyal bodyguard and trusted confidante."},
    {"subjectId": "character-sheeva", "predicate": "alliedWith", "objectId": "character-sindel", "context": "Classic & Reboot Timelines", "evidence": "Sheeva was chosen by Shao Kahn to serve as Queen Sindel's personal protector."},
    {"subjectId": "character-nightwolf", "predicate": "alliedWith", "objectId": "character-raiden", "context": "All Timelines", "evidence": "Nightwolf joined Raiden's circle of chosen Earthrealm champions to ward off Outworld."},
    {"subjectId": "character-kabal", "predicate": "alliedWith", "objectId": "character-stryker", "context": "Reboot Timeline (MK9)", "evidence": "Stryker and Kabal were NYPD partners defending New York City against Outworld forces."},
    {"subjectId": "character-jacqui", "predicate": "alliedWith", "objectId": "character-cassiecage", "context": "Reboot Timeline", "evidence": "Jacqui Briggs serves as Cassie Cage's second-in-command and closest friend."},
    {"subjectId": "character-takeda", "predicate": "alliedWith", "objectId": "character-kenshi", "context": "Reboot Timeline", "evidence": "Takeda reconciles with his father Kenshi after training under Scorpion."},
    {"subjectId": "character-kungjin", "predicate": "alliedWith", "objectId": "character-kunglao", "context": "Reboot Timeline", "evidence": "Kung Jin honors his cousin Kung Lao's legacy as a proud Shaolin warrior."},
    {"subjectId": "character-geras", "predicate": "alliedWith", "objectId": "character-liukang", "context": "New Era Timeline", "evidence": "Geras serves Fire God Liu Kang as the eternal steward of the Hourglass."},
    {"subjectId": "character-cetrion", "predicate": "alliedWith", "objectId": "character-kronika", "context": "Reboot Timeline (MK11)", "evidence": "Cetrion sacrificed her Elder God essence to empower her mother Kronika's Hourglass."},
    {"subjectId": "character-tanya", "predicate": "alliedWith", "objectId": "character-mileena", "context": "Reboot & New Era Timelines", "evidence": "Tanya protected Mileena as lover and royal guard against Outworld conspirators."},
    {"subjectId": "character-sareena", "predicate": "alliedWith", "objectId": "character-subzero", "context": "Original Timeline", "evidence": "Sareena turned against Quan Chi to help Sub-Zero escape the Netherrealm."},
    {"subjectId": "character-boraicho", "predicate": "alliedWith", "objectId": "character-liukang", "context": "Original & Reboot Timelines", "evidence": "Master Bo' Rai Cho instructed Liu Kang in the Flying Kick and Shaolin chi focus."}
]

# ----------------------------------------------------
# 11. LOCATIONS (14 Iconic Arenas & Sanctuaries)
# ----------------------------------------------------
LOCATIONS = [
    {"id": "location-shang-tsung-island", "name": "Shang Tsung's Island", "realmId": "realm-earthrealm", "description": "Mystical uncharted island in the Lost Sea between Earthrealm and Outworld, hosting the 10th tournament.", "sourceURL": "https://mortalkombat.fandom.com/wiki/Shang_Tsung%27s_Island"},
    {"id": "location-the-pit", "name": "The Pit", "realmId": "realm-earthrealm", "description": "Narrow stone bridge suspended over razor-sharp steel spikes, birthplace of the environmental Stage Fatality.", "sourceURL": "https://mortalkombat.fandom.com/wiki/The_Pit"},
    {"id": "location-shaolin-temple", "name": "Wu Shi Academy & Shaolin Temple", "realmId": "realm-earthrealm", "description": "Sacred training sanctuary of the White Lotus Society where Liu Kang and Kung Lao mastered martial arts.", "sourceURL": "https://mortalkombat.fandom.com/wiki/Wu_Shi_Academy"},
    {"id": "location-jinsei-chamber", "name": "Jinsei Chamber", "realmId": "realm-earthrealm", "description": "The subterranean heart of Earthrealm containing the luminous life force protected by Raiden.", "sourceURL": "https://mortalkombat.fandom.com/wiki/Jinsei_Chamber"},
    {"id": "location-pyramid-of-argus", "name": "Pyramid of Argus", "realmId": "realm-edenia", "description": "Colossal monolith in Edenia created by Lord Argus where all warriors converged during Armageddon.", "sourceURL": "https://mortalkombat.fandom.com/wiki/Pyramid_of_Argus"},
    {"id": "location-the-hourglass", "name": "The Keep of Time / The Hourglass", "realmId": "realm-earthrealm", "description": "Cosmic nexus beyond realms where Titan Kronika and later Fire God Liu Kang steer time streams.", "sourceURL": "https://mortalkombat.fandom.com/wiki/Hourglass"},
    {"id": "location-shao-kahn-throne", "name": "Shao Kahn's Throne Room", "realmId": "realm-outworld", "description": "Imperial palace in Outworld where Emperor Shao Kahn observes gladiatorial combat and issues imperial decrees.", "sourceURL": "https://mortalkombat.fandom.com/wiki/Kahn%27s_Arena"},
    {"id": "location-dead-pool", "name": "The Dead Pool", "realmId": "realm-outworld", "description": "Outworld execution chamber filled with bubbling green acid suspended above iron grates.", "sourceURL": "https://mortalkombat.fandom.com/wiki/Dead_Pool"},
    {"id": "location-lin-kuei-temple", "name": "Lin Kuei Temple (Arctika)", "realmId": "realm-earthrealm", "description": "Fortress tucked within the frozen snow peaks of Arctika, ancestral home of the Lin Kuei cryomancers.", "sourceURL": "https://mortalkombat.fandom.com/wiki/Arctika"},
    {"id": "location-fire-gardens", "name": "Shirai Ryu Fire Gardens", "realmId": "realm-earthrealm", "description": "Peaceful Japanese estate established by Grandmaster Hanzo Hasashi where Shirai Ryu and Lin Kuei made peace.", "sourceURL": "https://mortalkombat.fandom.com/wiki/Fire_Gardens"},
    {"id": "location-sea-of-blood", "name": "Sea of Blood", "realmId": "realm-netherrealm", "description": "Bottomless ocean of crimson ichor in the Netherrealm steered by ferryman Kharon.", "sourceURL": "https://mortalkombat.fandom.com/wiki/Sea_of_Blood"},
    {"id": "location-netherrealm-spire", "name": "Shinnok's Spire", "realmId": "realm-netherrealm", "description": "Tower of bone and black iron where fallen Elder God Shinnok and Quan Chi rule the demonic hordes.", "sourceURL": "https://mortalkombat.fandom.com/wiki/Netherrealm"},
    {"id": "location-seido-capital", "name": "Capital of Seido", "realmId": "realm-orderrealm", "description": "Geometric crystal citadel of Orderrealm governed under the rigid martial law of the Seidan Guard.", "sourceURL": "https://mortalkombat.fandom.com/wiki/Orderrealm"},
    {"id": "location-chaos-palace", "name": "Palace of Chaos", "realmId": "realm-chaosrealm", "description": "Shifting architectural labyrinth in Chaosrealm with molten rivers where Cleric Havik holds court.", "sourceURL": "https://mortalkombat.fandom.com/wiki/Chaosrealm"}
]
