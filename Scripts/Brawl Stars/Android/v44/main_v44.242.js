// Exports
const base = Module.getBaseAddress('libg.so');
const access = new NativeFunction(Module.getExportByName('libc.so', 'access'), 'int', ['pointer', 'int']);
const malloc = new NativeFunction(Module.getExportByName('libc.so', 'malloc'), 'pointer', ['uint']);
const free = new NativeFunction(Module.getExportByName('libc.so', 'free'), 'void', ['pointer']);
const libc_mkdir = new NativeFunction(Module.getExportByName('libc.so', 'mkdir'), 'int', ['pointer', 'uint']);
const fread = new NativeFunction(Module.getExportByName('libc.so', 'fread'), 'int', ['pointer', 'int', 'int', 'pointer']);
const fopen = new NativeFunction(Module.getExportByName('libc.so', 'fopen'), 'pointer', ['pointer', 'pointer']);
const fclose = new NativeFunction(Module.getExportByName('libc.so', 'fclose'), 'int', ['pointer']);
const ftell = new NativeFunction(Module.getExportByName('libc.so', 'ftell'), 'int', ['pointer']);
const fseek = new NativeFunction(Module.getExportByName('libc.so', 'fseek'), 'int', ['pointer', 'int', 'int']);
const rewind = new NativeFunction(Module.getExportByName('libc.so', 'rewind'), 'void', ['pointer']);
const chmod = new NativeFunction(Module.getExportByName('libc.so', 'chmod'), 'int', ['pointer', 'int']);

// Addresses
const DebuggerFnc = {error: 0x56E138, warning: 0x2FB534}; // v44.242 | Strings: "[ERROR]", "[warning]"
const HomeScreen_Update_isProd1 = 0x392218; // v44.242
const HomeScreen_Update_isProd2 = 0x3922DC; // v44.242
const InviteFeatureAddr1 = 0xCA39E0; // v44.242 | CMP #1 | String: "TID_TEAM_NO_MEMBER_INFO"
const ListPopupItemVtableAdr_shared = 0x10D2FAC; // v44.242 | In CountryItem ("country_item") | *a1 = ListPopupItemVtableAdr_shared
const LogicVersion_isProdAddr = 0x802DF8; // v44.242 | String: "game.brawlstarsgame.com", function if check, return 1
const PopupVtableAdr_shared = 0x10B9114; // v44.242 | In PlayerCountryPopup ("country_popup") | *a1 = PopupVtableAdr_shared
const RootPathAddr = 0x15DCCB0; // v44.242 | Strings: "save", "update", "cache" | First global variable
const SelectSoloModesInTeam = 0x0; // v44.242
const SettingsScreen_isDeveloperBuildAddr = 0xC0FE5C; // v44.242 | String: "LATENCY TESTS" | If function check
const SettingsScreen_isChinaAddr = 0xC0FDF8; // v44.242 | String: "LATENCY TESTS"
const ShouldShowAPITokenButtonAddr = 0xC0F858; // v44.242 | String: "TID_API_TOKEN_SHOW" | Default = 0
const SlowModeAdr = 0x15EB690; // v44.242 | In GameMain::update(), speed * 0.25 dependency, byte
const StatusID_LDR = 0x9B6AB4; // v44.242 | Message ID: 14361 | Off: (a1 + 88) in encode
const TeamMemberItem_isOwnSide = 0xC080C0; // v44.242 | String: "hidden_hero", v = a7 == 0 check

const GameMain_instanceAddr = 0x15E9944; // v44.242 | 1st arg of GameMain::showNativeDialog()
const GUI_instanceAddr = 0x15D9CCC; // v44.242 | 1st arg of GUI::showPopup()
const MessageManager_instanceAddr = 0x15D7FC8; // v44.242 | 1st arg of Messaging::send()
const SoundManager_instanceAddr = 0x15E9768; // v44.242 | 1st arg of any PlaySound function | String: "Buy_gems"
const Stage_instanceAddr = 0x15EAE48; // v44.242 | In popups

const AntiCheat_guardCallback = 0x7FAF88; // v44.242 | in PiranhaMessage::encode()
const MessageManager_adjustSendPackageFnc = 0x3D35A0; // v44.242 | Message ID: 17338
const MessageManager_sendLoginAttributionAnalyticsEventFnc = 0x58FA58; // v44.242 | Message ID: 30000
const MessageManager_unbotifySendReportsFnc = 0x4D5034; // v44.242 | Message ID: 17337

const CreateGameInstance_Protection = {start: 0x88E230, end: 0x892070}; // v44.242 | From AndroidMain::onCreate()
const GameMain_Protection = {start: 0x4635AC, end: 0x4644E8}; // v44.242 | By GameMain::init() parent function by table
const InputSystem_update_Protection = {start: 0x7DCB40, end: 0x7DDDE0}; // v44.242 | In GameMain::update()
const LoginMessage_encode_Protection = {start: 0x54A9F0, end: 0x54BA08}; // v44.242 | Message ID: 10101; Encode
const ResourceManager_init_Protection = {start: 0x730DA4, end: 0x731CE8}; // v44.242 | In GameMain::init()
const FontManager_constructInstance_Protection = {start: 0x811D0C, end: 0x812960}; // v44.242 | In GameMain::update() | Function with 2 arguments after many checks, first arg is dword
const SoundManager_update_Protection = {start: 0x1E4678, end: 0x1E5B0C}; // v44.242 | In GameMain::update() | Function with 2 arguments after many checks, first arg is dword

const GameArxanProtectionsArray = [CreateGameInstance_Protection, FontManager_constructInstance_Protection, GameMain_Protection, InputSystem_update_Protection, LoginMessage_encode_Protection, ResourceManager_init_Protection, SoundManager_update_Protection];
const TamperPreventionEvents = [AntiCheat_guardCallback, MessageManager_adjustSendPackageFnc, MessageManager_sendLoginAttributionAnalyticsEventFnc, MessageManager_unbotifySendReportsFnc];

// Strings
const CreditsProdHostStr = 0x15A37F9; // v44.242 | String: "game.brawlstarsgame.com:9339"
const LaserScreenMaskStr = 0x158E4EB; // v44.242 | String: "laser_screen_mask"
const LatencyTestsStr = {off: 0xC102DC, dcd: 0xC0FE80}; // v44.242 | String: "LATENCY TESTS"
const LobbyInfoWithoutPlayersOnlineStr = {off: 0x392968, dcd: 0x39284C}; // v44.242 | String: "%d-%d%s%s\n%s\n%s"
const LobbyInfoWithPlayersOnlineStr = {off: 0x39296C, dcd: 0x3927B0}; // v44.242 | String: "%s\nPlayers online: %i\n%d-%d%s%s\n%s\n%s"
const ShellyMcColtStr = {off: 0xBCC320, dcd: 0xBCC2DC}; // v44.242 | String: "\n\nShelly McColt"
const StageHostStr = 0x157A2E7; // v44.242 | String: "ec2-54-147-16-212.compute-1.amazonaws.com"
const IntegrationHostStr = 0x149CCC7; // v44.242 | String: "99.80.67.85"
const TidApiTokenShowStr = {off: 0xC10274, dcd: 0xC0FABC}; // v44.242 | String: "TID_API_TOKEN_SHOW"
const TidChinaPrivacySettingsButtonStr = {off: 0xC102CC, dcd: 0xC0FE24}; // v44.242 | String: "TID_CHINA_PRIVACY_SETTINGS_BUTTON"
const TidConnectingToServerStr = {off: 0x595144, dcd: 0x595094}; // v44.242 | String: "TID_CONNECTING_TO_SERVER"
const csv_ = [
    "csv_client/animations.csv",
    "csv_client/billing_packages.csv",
    "csv_client/bp_purchase_popup.csv",
    "csv_client/client_globals.csv",
    "csv_client/color_gradients.csv",
    "csv_client/credits.csv",
    "csv_client/effects.csv",
    "csv_client/faces.csv",
    "csv_client/health_bars.csv",
    "csv_client/hints.csv",
    "csv_client/local_notifications.csv",
    "csv_client/location_features.csv",
    "csv_client/login_calendar_items.csv",
    "csv_client/music.csv",
    "csv_client/particle_emitters.csv",
    "csv_client/shop_items.csv",
    "csv_client/sounds.csv",
    "csv_client/tutorial.csv",
    "csv_logic/accessories.csv",
    "csv_logic/alliance_badges.csv",
    "csv_logic/alliance_league_modes.csv",
    "csv_logic/alliance_league_ranks.csv",
    "csv_logic/alliance_roles.csv",
    "csv_logic/area_effects.csv",
    "csv_logic/cards.csv",
    "csv_logic/carryables.csv",
    "csv_logic/challenges.csv",
    "csv_logic/characters.csv",
    "csv_logic/emotes.csv",
    "csv_logic/emote_bundles.csv",
    "csv_logic/game_mode_variations.csv",
    "csv_logic/gear_boosts.csv",
    "csv_logic/gear_levels.csv",
    "csv_logic/globals.csv",
    "csv_logic/items.csv",
    "csv_logic/locales.csv",
    "csv_logic/locations.csv",
    "csv_logic/location_themes.csv",
    "csv_logic/maps.csv",
    "csv_logic/map_templates.csv",
    "csv_logic/messages.csv",
    "csv_logic/milestones.csv",
    "csv_logic/name_colors.csv",
    "csv_logic/player_map_environments.csv",
    "csv_logic/player_thumbnails.csv",
    "csv_logic/projectiles.csv",
    "csv_logic/ranked_locations.csv",
    "csv_logic/ranked_ranks.csv",
    "csv_logic/regions.csv",
    "csv_logic/resources.csv",
    "csv_logic/seasonal_skin_sections.csv",
    "csv_logic/shop_panel_layouts.csv",
    "csv_logic/shop_style_sets.csv",
    "csv_logic/skills.csv",
    "csv_logic/skins.csv",
    "csv_logic/skin_campaigns.csv",
    "csv_logic/skin_confs.csv",
    "csv_logic/sprays.csv",
    "csv_logic/themes.csv",
    "csv_logic/tiles.csv"
];

// Functions, Consts, Variables
var ModSaveFilePath, ThemeID;
var LanguageIndexSet = false;
var IsPlayerInGameroom = false;
var isSkinShopSectionDisabled, isStarShopSectionDisabled = false;
const static_theme_restricted_popup_names = ['Brawlbox_info_popup', 'seasonend_popup', 'create_name_popup', 'age_gate_dialog', 'age_gate_number_pad_dialog'];

var SaveObject = {
    ConfigVersion: 6,
    ThemeID: null,
    ThemeMusicID: null,
    UseDebugLogging: false,
    LobbyInfoTextType: 0,
    CustomMods: [],
    UseThemeAllScreens: false,
    DisplayAllLocations: false,
    VisualChromaticName: false,
    DisablePinAnimation: false,
    ShowOpponentsInFriendlyRoom: false,
    HideLaserScreenMask: false,
    DisableOutline: false,
    AntiChatBWCensor: false,
    SlowMode: false,
    MovementBasedAutoshootForMortis: false,
    BlockAttackAutoshoot: false,
    BlockSuperAutoshoot: false,
    RandomThemesParental: [false, false, false],
    ReplacedSkins: [],
    ReplacedLocationThemes: [],
    ReplacedProjectiles: [],
    Server: "prod"    
};

const ModInfo = {
    Platform: "android",
    ModVersion: "beta",
    ScriptPatchVersionName: "9.0"
};

const LocalizationStatic = {
    TextServerConnectionCredit: "Brawl Stars Datamines|BSD",
    TextLobbyInfoCredit: "Telegram: @bsdatamines",
    TextModContributors:
`╔═══════════════════════════════════╗
BSD Brawl v${ModInfo.ScriptPatchVersionName} by Brawl Stars Datamines | BSD
<c3390ec>Telegram: t.me/bsdatamines</c>
<c5865f2>Discord: discord.gg/TzCYyJ7FbK</c>

BSD Team:
<cfde423>H<cfdd509>e<cfdbf01>d<cfea603>g<cfe9304>e</c> - <c0077ff>VK: heedge</c> | <c3390ec>TG: @heedge</c> | <c5865f2>DS: Hedge#7181</c>
Selce - <c3390ec>TG: @selces</c> | <c5865f2>DS: Selce#2424</c>
Daniil SV - <c0077ff>VK: daniilsvv</c>
Deffy - <c0077ff>VK: b_kitov</c>

Our sponsors:
Alexander Sysoev
Yaroslav Biryukov
Vladislav Koronov
Kostya Botyanov
Matvey Andreev

Platform: ${ModInfo.Platform}
Product version: ${ModInfo.ModVersion}
╚════════════════════════════════════╝`
};

const Localization = {
    EN: {
        TextSwitchTheme: "Switch Theme",
        TextPlayerTagCopied: "Player tag copied to clipboard",
        TextStatusesPopupTitle: "STATUS",
        TextStatusesPopupButton: "Team Status",
        TextStatusesPopupErrorNotInTeam: "Sorry, but you need to be in a team to change the status",
        TextModConfigurationPopup: "Mod Configuration",
        TextModMenuPopup: "Mod Menu",
        TextModConfigurationPopupTitle: "BSD BRAWL CONFIGURATION", 
        TextModMenuPopupTitle: "MOD MENU",
        TextChinaPrivacyPopup: "Privacy Settings",
        TextSkinMenuPopup: "Skin Menu",
        TextSkinMenuPopupTitle: "SKINS",
        TextBrawlerMenuPopup: "Brawler Menu",
        TextBrawlerMenuPopupTitle: "BRAWLERS",
        TextReconnectTo: "Go to ",
        TextOpenBrawlStats: "Open «Brawl Stats»",
        TextReloadingRequired: "Game restart required",
        TextPlayersOnline: "Players online",
        TextAccountCreationDate: "Account creation date",
        TextEmotesMod: {
            name: "Pin mod",
            desc_disabled: "When disabled, pins from skin bundles will become unavailable again.",
            desc_enabled: "When enabled, pins from skin bundles will become available to send in chat."
        },
        TextUseThemeAllScreens: {
            name: "Static background",
            desc_disabled: "When disabled, game screen backgrounds will become what they should be.",
            desc_enabled: "When enabled, every game screen background will be replaced with menu background."
        },
        TextDisplayAllLocations: {
            name: "Display all locations",
            desc_disabled: "When disabled, only available gamemodes and maps will be displayed in friendly room map screen.",
            desc_enabled: "When enabled, every possible gamemode and map will be displayed in friendly room map screen."    
        },
        TextVisualChromaticName: {
            name: "Chromatic name (visual-only)",
            desc_disabled: "When disabled, your name color will become default, depending on purchased Brawl Pass.",
            desc_enabled: "When enabled, your name color will become chromatic as with purchased Brawl Pass."
        },
        TextDisableOutlineDisplaying: {
            name: "Disable 3D model outline",
            desc_disabled: "When disabled, 3D models will be encircled with outlines.",
            desc_enabled: "When enabled, outlines won't encircle 3D models."
        },
        TextDisablePinAnimation: {
            name: "Disable pin animation",
            desc_disabled: "When disabled, pins will become animated.",
            desc_enabled: "When enabled, every pin will be not animated."
        },
        TextHideLaserScreenMask: {
            name: "Hide black borders in battle",
            desc_disabled: "When disabled, black borders in battle will be displayed.",
            desc_enabled: "When enabled, black borders in battle won't be displayed."
        },
        TextChatAntiCensor: {
            name: "Anticensor in chat",
            desc_disabled: "When disabled, bad words that you send in chat will be replaced by asterisks.",
            desc_enabled: "When enabled, bad words that you send in chat won't be replaced by asterisks."
        },
        TextSlowMode: {
            name: "Slow mode",
            desc_disabled: "When disabled, default game speed will be back.",
            desc_enabled: "When enabled, game will slow down (slow-mo effect)."
        },
        TextNaniUltiMod: {
            name: "Nani walk while using super",
            desc_disabled: "When disabled, Nani won't be able to walk while using super.",
            desc_enabled: "When enabled, Nani will be able to walk while using super. <cffff00>Peep itself will become uncontrollable.</c>"
        },
        TextRandomThemes: {
            name: "Random theme",
            desc_disabled: "When disabled, menu theme won't be changing to random every rejoin.",
            desc_enabled: "When enabled, menu theme will be different every game rejoin."
        },
        TextRandomThemesAfterBattle: {
            name: "Random theme after each battle",
            desc_disabled: "When disabled, theme won't be changed when you exit battles.",
            desc_enabled: "When enabled, theme will be changed to random every time you enter and exit battle."
        },
        TextRandomThemesMusicIndependency: {
            name: "Music independent on the background for random theme",
            desc_disabled: "When disabled, music will match its associated background.",
            desc_enabled: "When enabled, music will be different from its associated background."
        },
        TextShowOpponentsInFriendlyRoom: {
            name: "Show opponents in friendly room",
            desc_disabled: "When disabled, you won't be able to see which brawlers opponents have selected.",
            desc_enabled: "When enabled, you will be able to see all brawlers your opponents select in friendly room."
        },
        TextMovementBasedAutoshoot: {
            name: "Автоатака по направлению движения (на Мортисе)",
            desc_disabled: "При отключении, Мортис будет автоатаковать в сторону ближайшего врага.",
            desc_enabled: "При включении, Мортис будет автоатаковать по направлению движения."
        },
        TextBlockAttackAutoshoot: {
            name: "Отключить автоатаку",
            desc_disabled: "При отключении, вы снова сможете использовать автоатаку.",
            desc_enabled: "При включении, вы не сможете использовать автоатаку."
        },
        TextBlockSuperAutoshoot: {
            name: "Отключить автоатаку для супера",
            desc_disabled: "При отключении, вы снова сможете использовать автоатаку ультой.",
            desc_enabled: "При включении, вы не сможете использовать автоатаку ультой."
        },
        TextLobbyCreditsMode_0: "Authors and FPS",
        TextLobbyCreditsMode_1: "Authors only",
        TextLobbyCreditsMode_2: "FPS only",
        TextLobbyCreditsMode_3: "Nothing",
        TextLobbyCreditsMode: "Lobby text:\n",
        TextSkinChangerChooseBrawlerPart1: "Choose brawler, whose skin you want to change",
        TextSkinChangerChooseBrawlerPart2: "\n\n\n\n\n\nTo apply all skin changes, go back to menu and press the «Reload Game» button",
        TextSkinChangerChooseBrawler: "Choose brawler, whose skin you want to change",
        TextSkinChangerChooseSkin: "Choose skin",
        TextSkinChanger: "Skin-changer",
        TextMonthsShort: "mo.",
        TextDaysShort: "d.",
        TextHoursShort: "h.",
        TextMinsShort: "m.",
        TextSecsShort: "s.",
        TextSpentTimeOnline: "Time spent in the game",
        TextSessionCount: "Sessions in total",
        TextSkinsOfSelectedCharacterPopupTitle: "SKINS OF ",
        TextThemesPopupSelectBackgroundTitle: "SELECT BACKGROUND",
        TextThemesPopupSelectMusicTitle: "SELECT MUSIC",
        TextLocationThemesPopupTitle: "MAP ENVIRONMENTS",
        TextModLoaderPopup: "Mod Loader",
        TextReloadGame: "Reload Game",
        TextBrawlStatsWebViewPopup: "Brawl Stats",
        TextPlayerSearchPopup: "Search player by tag",
        TextProjectLaser: "8-BIT Minigame",
        TextResetConfig: "Reset Mod Config",
        TextResetConfigPromptTitle: "Reset mod configuration?",
        TextResetConfigPromptDesc: "If something went wrong with the mod, you can always reset its configuration",
        TextResetConfigPromptButtonReset: "Reset",
        TextResetConfigPromptButtonCancel: "Cancel",
        TextLocationThemeNames: {
            Retropolis: "Retropolis",
            OldTown: "Old Town",
            OldTownLNY: "Old Town (LNY)",
            OldTownTutorial: "Old Town (Tutorial)",
            Mine: "Mine",
            MineTrainTracks: "Mine with rails",
            Warehouse: "Warehouse",
            Oasis: "Oasis",
            OasisBeach: "Oasis Beach",
            Mortuary: "Mortis' Mortuary",
            MortuaryHW: "Mortis' Mortuary (HW)",
            MortuaryShowdown: "Graveyard",
            MortuaryShowdownHW: "Graveyard (HW)",
            Grassfield: "Grass Field",
            GrassfieldBeachBall: "Beach Ball",
            Default: "Desert",
            DefaultShowdown: "Desert Showdown",
            IslandShowdown: "Island Showdown",
            DarrylsShip: "Darryl's Ship",
            DarrylsXmas: "Darryl's Ship (Xmas)",
            Arcade: "Arcade",
            BBArena: "Brawl Ball Arena",
            BBArenaPSG: "PSG Arena",
            Bazaar: "Tara's Bazaar",
            Minicity: "Mini City",
            GiftShop: "Gift Shop",
            BandStand: "Band Stand",
            BandStandHW: "Band Stand (HW)",
            SnowtelXmas: "Snowtel (Xmas)",
            Snowtel: "Snowtel",
            Scrapyard: "Scrapyard",
            StarrForce: "Starr Force",
            ActionShow: "Action Show",
            WaterPark: "Water Park",
            ArcadeBasket: "Arcade (Basketbrawl)",
            BBArenaVolley: "Volleybrawl Arena",
            CastleCourtyard: "Castle Courtyard",
            Brawlywood: "Brawlywood",
            FightingGame: "Tiger Pit",
            Biodome: "Biodome",
            StuntShow: "Stunt Show",
            StuntShowBB: "Stunt Show (BB)",
            DeepSea: "Deep Sea",
            Snowy: "Snowy"
        }
    },
    RU: {
        TextSwitchTheme: "Смена темы",
        TextPlayerTagCopied: "Тег игрока скопирован в буфер обмена",
        TextStatusesPopupTitle: "СТАТУС",
        TextStatusesPopupButton: "Выбор статуса",
        TextStatusesPopupErrorNotInTeam: "Для смены статуса нужно быть в команде",
        TextModConfigurationPopup: "Настройки мода",
        TextModMenuPopup: "Меню мода",
        TextModConfigurationPopupTitle: "НАСТРОЙКИ BSD BRAWL",
        TextModMenuPopupTitle: "МЕНЮ МОДА",
        TextChinaPrivacyPopup: "Приватность",
        TextSkinMenuPopup: "Меню скинов",
        TextSkinMenuPopupTitle: "СКИНЫ",
        TextBrawlerMenuPopup: "Меню бойцов",
        TextBrawlerMenuPopupTitle: "БОЙЦЫ",
        TextReconnectTo: "Перейти на ",
        TextOpenBrawlStats: "Открыть «Brawl Stats»",
        TextReloadingRequired: "Требуется перезапуск игры",
        TextPlayersOnline: "Игроков в сети",
        TextAccountCreationDate: "Дата создания аккаунта",
        TextEmotesMod: {
            name: "Мод на значки",
            desc_disabled: "При отключении, значки из наборов скинов, которых у вас нет, вновь станут недоступны.",
            desc_enabled: "При включении, значки из наборов скинов, которых у вас нет, станут доступны для отправки в чате."
        },
        TextUseThemeAllScreens: {
            name: "Статичный фон",
            desc_disabled: "При отключении, все фоны станут такими, какими и должны быть (фон из меню будет только в меню).",
            desc_enabled: "При включении, все фоны в игре будут заменены на фон из меню."
        },
        TextDisplayAllLocations: {
            name: "Отображать все карты",
            desc_disabled: "При отключении, в списке событий в дружеской игре будут отображаться только доступные режимы и карты.",
            desc_enabled: "При включении, в списке событий в дружеской игре будут отображаться все возможные режимы и карты."    
        },
        TextVisualChromaticName: {
            name: "Хроматический ник",
            desc_disabled: "При отключении, цвет вашего ника вновь станет стандартным, в зависимости от того, куплен ли бравл пасс.",
            desc_enabled: "При включении, цвет вашего ника станет хроматическим, как при купленном бравл пассе (визуально)."
        },
        TextDisableOutlineDisplaying: {
            name: "Отключить обводку 3D-моделей",
            desc_disabled: "При отключении, 3D-модели будет окружать чёрная обводка.",
            desc_enabled: "При включении, чёрная обводка не будет окружать 3D-модели."
        },
        TextDisablePinAnimation: {
            name: "Отключить анимацию значков",
            desc_disabled: "При отключении, значки станут анимированными.",
            desc_enabled: "При включении, пропадут все анимации значков."
        },
        TextHideLaserScreenMask: {
            name: "Скрывать рамки в бою",
            desc_disabled: "При отключении, чёрные рамки в бою вновь будут отображаться.",
            desc_enabled: "При включении, пропадут чёрные рамки в бою."
        },
        TextChatAntiCensor: { 
            name: "Антицензура в чате",
            desc_disabled: "При отключении, плохие слова, которые вы будете отправлять в чат, будут вуалироваться звёздочками.",
            desc_enabled: "При включении, плохие слова, которые вы будете отправлять в чат, не будут вуалироваться звёздочками."
        },
        TextSlowMode: {
            name: "Медленный режим",
            desc_disabled: "При отключении, возвращается прежняя скорость анимаций.",
            desc_enabled: "При включении, замедляются все анимации в игре (эффект слоу-мо)."
        },
        TextNaniUltiMod: {
            name: "Ходьба Нани под ультой",
            desc_disabled: "При отключении, Нани вновь не сможет ходить под ультой.",
            desc_enabled: "При включении, у Нани появляется возможность ходить во время использование ульты. <cffff00>Управление Пипом станет неконтроллируемым.</c>"
        },
        TextRandomThemes: {
            name: "Случайная тема",
            desc_disabled: "При отключении, тема в меню будет неизменной при каждом перезаходе в игру.",
            desc_enabled: "При включении, тема в меню будет случайно избираться при каждом перезаходе в игру."
        },
        TextRandomThemesAfterBattle: {
            name: "Случайная тема после каждого боя",
            desc_disabled: "При отключении, тема в меню не будет изменяться после каждого боя.",
            desc_enabled: "При включении, после каждого боя в меню будет устанавливаться случайная тема."
        },
        TextRandomThemesMusicIndependency: {
            name: "Независимость музыки от фона при случайном выборе темы",
            desc_disabled: "При отключении, музыка будет соответствовать соответствующему ей фону.",
            desc_enabled: "При включении, музыка будет отличаться от соответствующего ей фона."
        },
        TextShowOpponentsInFriendlyRoom: {
            name: "Показывать вражеских бойцов в дружеской игре",
            desc_disabled: "При отключении, вы не сможете видеть бойцов, которых взяла противоположная команда.",
            desc_enabled: "При включении, вы сможете видеть бойцов, которых взяла противоположная команда."
        },
        TextMovementBasedAutoshoot: {
            name: "Автоатака по направлению движения (на Мортисе)",
            desc_disabled: "При отключении, Мортис будет автоатаковать в сторону ближайшего врага.",
            desc_enabled: "При включении, Мортис будет автоатаковать по направлению движения."
        },
        TextBlockAttackAutoshoot: {
            name: "Отключить автоатаку",
            desc_disabled: "При отключении, вы снова сможете использовать автоатаку.",
            desc_enabled: "При включении, вы не сможете использовать автоатаку."
        },
        TextBlockSuperAutoshoot: {
            name: "Отключить автоатаку для супера",
            desc_disabled: "При отключении, вы снова сможете использовать автоатаку ультой.",
            desc_enabled: "При включении, вы не сможете использовать автоатаку ультой."
        },
        TextLobbyCreditsMode_0: "Авторы и FPS",
        TextLobbyCreditsMode_1: "Только авторы",
        TextLobbyCreditsMode_2: "Только FPS",
        TextLobbyCreditsMode_3: "Ничего",
        TextLobbyCreditsMode: "Текст в лобби:\n",
        TextSkinChangerChooseBrawlerPart1: "Выберите бравлера, скин которого хотите заменить",
        TextSkinChangerChooseBrawlerPart2: "\n\n\n\n\n\nЧтобы завершить смену скинов, вернитесь в меню и нажмите на кнопку «Перезагрузить игру»",
        TextSkinChangerChooseBrawler: "Выберите бравлера, скин которого хотите заменить",
        TextSkinChangerChooseSkin: "Выберите скин",
        TextSkinChanger: "Скин-ченджер",
        TextMonthsShort: "мес.",
        TextDaysShort: "д.",
        TextHoursShort: "ч.",
        TextMinsShort: "м.",
        TextSecsShort: "с.",
        TextSpentTimeOnline: "Проведено в игре",
        TextSessionCount: "Всего входов в игру",
        TextSkinsOfSelectedCharacterPopupTitle: "СКИНЫ БОЙЦА ",
        TextThemesPopupSelectBackgroundTitle: "ВЫБЕРИ ЗАДНИЙ ФОН",
        TextThemesPopupSelectMusicTitle: "ВЫБЕРИ МУЗЫКУ",
        TextLocationThemesPopupTitle: "ОКРУЖЕНИЯ КАРТ",
        TextModLoaderPopup: "Загрузчик модов",
        TextReloadGameUsingReloadButton: "Нажмите на кнопку «Перезагрузить игру» для применения изменений",
        TextReloadGame: "Перезагрузить игру",
        TextBrawlStatsWebViewPopup: "Brawl Stats",
        TextPlayerSearchPopup: "Найти игрока по тегу",
        TextProjectLaser: "Мини-игра с 8-БИТом",
        TextResetConfig: "Сбросить настройки мода",
        TextResetConfigPromptTitle: "Сбросить настройки мода?",
        TextResetConfigPromptDesc: "Если в процессе использования мода что-то пошло не так, вы всегда можете сбросить его настройки",
        TextResetConfigPromptButtonReset: "Сброс",
        TextResetConfigPromptButtonCancel: "Отмена",
        TextLocationThemeNames: {
            Retropolis: "Ретрополис",
            OldTown: "Старый город",
            OldTownLNY: "Старый город (ЛНГ)",
            OldTownTutorial: "Старый город (обучение)",
            Mine: "Шахта",
            MineTrainTracks: "Шахта с рельсами",
            Warehouse: "Склад",
            Oasis: "Оазис",
            OasisBeach: "Пляжный оазис",
            Mortuary: "Морг Мортиса",
            MortuaryHW: "Морг Мортиса (Хел.)",
            MortuaryShowdown: "Кладбище",
            MortuaryShowdownHW: "Кладбище (Хел.)",
            Grassfield: "Травяное поле",
            GrassfieldBeachBall: "Пляжный мяч",
            Default: "Пустыня",
            DefaultShowdown: "Пустыня",
            IslandShowdown: "Остров",
            DarrylsShip: "Корабль Дэррила",
            DarrylsXmas: "Корабль Дэррила (Рожд.)",
            Arcade: "Аркада",
            BBArena: "Арена для броулбола",
            BBArenaPSG: "PSG Арена",
            Bazaar: "Базар Тары",
            Minicity: "Минигород",
            GiftShop: "Магазин сувениров",
            BandStand: "Сцена Поко",
            BandStandHW: "Сцена Поко (Хел.)",
            SnowtelXmas: "Сноутель (Рожд.)",
            Snowtel: "Сноутель",
            Scrapyard: "Барахолка",
            StarrForce: "Звездолёт Старр",
            ActionShow: "Дикий запад",
            WaterPark: "Велоцираптопляж",
            ArcadeBasket: "Аркада (баскетбой)",
            BBArenaVolley: "Арена для волейбоя",
            CastleCourtyard: "Замок",
            Brawlywood: "Бравливуд",
            FightingGame: "Тигриная яма",
            Biodome: "Биокупол",
            StuntShow: "Экстрим-шоу",
            StuntShowBB: "Экстрим-шоу (ББ)",
            DeepSea: "Морские глубины",
            Snowy: "Снежное окружение"
        }
    }
};
const LocalesArray = [Localization.EN, Localization.RU];
var LocalizationObject = {};

const BrawlPassPopup_buttonClicked = new NativeFunction(base.add(0x2B6DEC), 'void', ['pointer', 'pointer']); // v44.242 | String: "TID_BRAWL_PASS_CANNOT_PURCHASE_BRAWL_PASS_FOR_PAST_SEASON"
const BrawlPassSeasonData_hasUnclaimedRewards = base.add(0xAE7EDC); // v44.242 | BrawlPassPopup::buttonClicked() --> PreviousSeasonButtonPressed --> if current season == actual season check --> 2nd function --> if hasUnclaimedRewards then return
const ChatToAllianceMessage_encode = new NativeFunction(base.add(0x9BC8D0), 'void', ['pointer']); // v44.242 | Message type: 14315, 0x37EB
const CopyString = new NativeFunction(base.add(0xCB8E48), 'void', ['pointer']); // v44.242 | String: "copyString"
const CustomButton_setButtonListener = new NativeFunction(base.add(0x75C940), 'void', ['pointer', 'pointer']); // v44.242 | country popup
const DisplayObject_setY = new NativeFunction(base.add(0x4EAD24), 'void', ['pointer', 'float']); // v44.242 | country popup
const DropGUIContainer_addGameButton = new NativeFunction(base.add(0x85FAA0), 'pointer', ['pointer', 'pointer', 'int']); // v44.242 | In "popup_craft_gear" or String: "Unable to create GameButton ".. | Only 1 xref (mention) of string
const EmoteIcon_playAnim = new NativeFunction(base.add(0x7A731C), 'void', ['pointer', 'int', 'int', 'float']); // v44.242 | String: "emote_empty_ph", bottom function
const GameButton = new NativeFunction(base.add(0x8EA604), 'void', ['pointer']); // v44.242 | country popup
const GameMain_reloadGame = new NativeFunction(base.add(0x837F74), 'void', ['pointer']); // v44.242 | Under GameMain::init()
const GameMain_update = new NativeFunction(base.add(0x3B3CD4), 'void', ['pointer', 'float', 'float']); // v44.242 | Parental function of ServerConnection::update
const GenericPopup = new NativeFunction(base.add(0x330840), 'void', ['pointer', 'pointer', 'int', 'int', 'pointer', 'pointer', 'pointer']); // v44.242 | From CountryPopup
const GenericPopup_buttonClicked = new NativeFunction(base.add(0x6B17C8), 'void', ['pointer', 'pointer']); // v44.242 | coutnry popup button clicked
const GenericPopup_setTitleTid = new NativeFunction(base.add(0x3E387C), 'void', ['pointer', 'pointer']); // v44.242 | country popup
const GenericPopup_setUpScreenHeader = new NativeFunction(base.add(0x2E9BEC), 'void', ['pointer']); // v44.242 | country popup
const GoalList_displayTrackInfo = new NativeFunction(base.add(0x396FB8), 'void', ['int', 'int', 'pointer', 'pointer', 'int', 'int', 'int']); // v44.242 | String: "TID_XP_INFO_ME", the function below
const GUI_closePopup = new NativeFunction(base.add(0x608314), 'void', ['pointer', 'int']); // v44.242 | String: "TID_NOT_ENOUGH_GEMS_INFO" --> function above 2 buttonClicked alc
const GUI_closeAllPopups = new NativeFunction(base.add(0x78C5D4), 'void', ['pointer']); // v44.242 | Strings: "Select_brawler", "TID_HERO_DISABLED_CURRENTLY_PRINT"; Bottom function
const GUI_showFloaterTextAtDefaultPos = new NativeFunction(base.add(0x398A8C), 'void', ['pointer', 'pointer', 'float', 'int']); // v44.242 | String: "TID_MAP_EDITOR_SAVE_ERROR"
const GUI_showPopup = new NativeFunction(base.add(0x72F45C), 'void', ['pointer', 'pointer', 'int', 'int', 'int']); // v44.242
const GUIContainer_getMovieClip = new NativeFunction(base.add(0x83E148), 'pointer', ['pointer']); // v44.242
const HashCodeGenerator_toCode = new NativeFunction(base.add(0xB77FAC), 'pointer', ['pointer', 'pointer']); // v44.242 | String: "tag_txt"
const HomeScreen_doOfflineGatcha = new NativeFunction(base.add(0x77417C), 'void', ['int', 'pointer', 'pointer']); // v44.242 | String: "emoji_sprout_gg"
const ListContainer = new NativeFunction(base.add(0x29159C), 'void', ['pointer', 'pointer', 'int', 'int', 'int', 'pointer', 'pointer', 'pointer']); // v44.242
const ListContainer_addEntry = new NativeFunction(base.add(0x1BBF54), 'void', ['pointer', 'pointer']); // v44.242 | country popup refresh
const ListContainer_clearEntries = new NativeFunction(base.add(0xB7C3E4), 'void', ['pointer']); // v44.242 | country popup refresh
const ListContainer_refreshBounds = new NativeFunction(base.add(0x5BDEA4), 'void', ['pointer', 'float']); // v44.242 | country popup refresh
const ListContainer_refreshEntryPositions = new NativeFunction(base.add(0x66EFAC), 'void', ['pointer', 'int', 'float', 'float', 'float', 'int', 'int']); // v44.242 | country popup refresh
const LogicConfData_getIntValue = new NativeFunction(base.add(0x7E3B7C), 'int', ['pointer', 'int', 'int']); // v44.242
const LogicCharacterData_getDefaultSkin = new NativeFunction(base.add(0x69B774), 'pointer', ['pointer']); // v44.242 | String: "Skin '%s' is a default skin of character '%s', but does not have name ending 'Default'"
const LogicCharacterData_isDisabled = new NativeFunction(base.add(0x3819AC), 'int', ['pointer']); // v44.242 | String: "Skipping issue of %s missing (in %s), since the referred target character '%s' is disabled"
const LogicDailyData_isBrawlPassPremiumUnlocked = new NativeFunction(base.add(0x5C3D3C), 'int', ['pointer']); // v44.242 | String: "TID_HERO_INFO_LOCKED_BP_TIER_OWNED_INFO_SHORT"
const LogicData_getName = new NativeFunction(base.add(0x771304), 'pointer', ['pointer']); // v44.242 | country item
const LogicData_getValueAt = new NativeFunction(base.add(0x3FC0C8), 'pointer', ['pointer', 'int']); // v44.242 | In LogicCharacterData::createReferences
const LogicDataTables_getCharacterByName = new NativeFunction(base.add(0xC80F00), 'pointer', ['pointer', 'pointer']); // v44.242 | String: "ShotgunGirl"
const LogicDataTables_getSkinByName = new NativeFunction(base.add(0xBA38B4), 'pointer', ['pointer', 'pointer']); // v44.242 | LogicSkinData::createReferences, 3 matches, a2 = a1 of parent
const LogicDataTables_getSkinConfByName = new NativeFunction(base.add(0xAF6D44), 'pointer', ['pointer', 'pointer']); // v44.242 | String: "OutlineShader" | a2 is a1 of parent function (CreateReferences)
const LogicDataTables_getSoundByName = new NativeFunction(base.add(0xBB7340), 'pointer', ['pointer', 'int']); // v44.242 | String: "Buy_gems"
const LogicDataTables_getTable = new NativeFunction(base.add(0xCA6280), 'pointer', ['int']); // v44.242 | country popup
const LogicSkinData_createReferences = new NativeFunction(base.add(0xCF7CB4), 'void', ['pointer']); // v44.242 | String: "OutlineShader"
const LogicThemeData_isDisabled = new NativeFunction(base.add(0x8E9BC8), 'int', ['pointer']); // v44.242 | String: "Active theme is marked disabled! theme: "
const LogicThemeData_getExportName = new NativeFunction(base.add(0x8E3BC0), 'pointer', ['pointer']); // v44.242
const LogicThemeData_getFileName = new NativeFunction(base.add(0x847878), 'pointer', ['pointer']); // v44.242
const LoginOkMessage_decode = new NativeFunction(base.add(0x72A8B4), 'void', ['pointer']); // v44.242 | Message type: 20104
const MapEditorModifierPopup_addModifierItem = new NativeFunction(base.add(0x80B250), 'void', ['pointer', 'int']); // v44.242 | String: "popup_editor_modifier"
const MessageManager_sendMessage = new NativeFunction(base.add(0x871EEC), 'void', ['pointer', 'pointer']); // v44.242
const MovieClip_getTextFieldByName = new NativeFunction(base.add(0xB18164), 'pointer', ['pointer', 'pointer']); // v44.242
const MovieClip_gotoAndStopFrameIndex = new NativeFunction(base.add(0xB74900), 'void', ['pointer', 'int']); // v44.242 | country item
const MovieClipHelper_setTextAndScaleIfNecessary = new NativeFunction(base.add(0x1AB028), 'void', ['pointer', 'pointer', 'int', 'int']); // v44.242 | country item
const Path_setRootPath = new NativeFunction(base.add(0x2FAA28), 'void', ['pointer']); // v44.242 | Strings: "save", "update", "cache"
const PlayerInfo_refreshPlayerHeader = new NativeFunction(base.add(0x507898), 'void', ['pointer']); // v44.242 | String: "tag_txt"
const SoundManager_playSound = new NativeFunction(base.add(0x4FCCD8), 'void', ['pointer', 'pointer', 'float', 'float', 'int', 'float', 'int']); // v44.242 | String: "Buy_gems"
const PopupBase = new NativeFunction(base.add(0xB1B29C), 'void', ['pointer', 'pointer', 'pointer', 'int', 'int', 'pointer', 'pointer', 'pointer']); // v44.242
const PopupBase_getNaviHeight = new NativeFunction(base.add(0xB98980), 'float', ['pointer']); // v44.242 | country popup refresh
const SettingsScreen_buttonClicked = new NativeFunction(base.add(0x8F89A0), 'void', ['pointer', 'pointer']); // v44.242 | String: "TID_SETTINGS_WECHAT_NOT_INSTALLED"
const StringTable_getCurrentLanguageCode = new NativeFunction(base.add(0x73D464), 'pointer', []); // v44.242 | String: "TID_ADDITIONAL_GEM_TOOLTIP_FOR_JAPAN"
const StringTable_getMovieClip = new NativeFunction(base.add(0xA3AB28), 'pointer', ['pointer', 'pointer']); // v44.242 | country popup
const StringTable_getString = new NativeFunction(base.add(0x7C7388), 'pointer', ['pointer']); // v44.242 | any TID_ parse
const StringTable_setLanguageIndex = new NativeFunction(base.add(0x949078), 'void', ['int', 'int']); // v44.242
const TeamChatMessage_encode = new NativeFunction(base.add(0xB95C88), 'void', ['pointer']); // v44.242 | Message type: 14359, 0x3817
const TeamJoinRequestPopup = new NativeFunction(base.add(0xA9EB18), 'void', ['pointer', 'pointer', 'pointer']); // v44.242 | String: "popup_gameroom_invite"
const TeamInvitationPopup = new NativeFunction(base.add(0xB5060C), 'void', ['pointer', 'pointer', 'int']); // v44.242 | Strings: "popup_gameroom_invite_teams", "popup_gameroom_invite_with_mode"
const TeamMemberStatusMessage = new NativeFunction(base.add(0x873844), 'void', ['pointer', 'int']); // v44.242 | Message ID: 14361 | Parent should have string: "Changed status: "..
const TeamManager_onTeamMessage = new NativeFunction(base.add(0x2E0DAC), 'void', ['pointer', 'pointer']); // v44.242 | String: "Got team: "..
const TeamManager_onTeamLeftMessage = new NativeFunction(base.add(0x5C30C4), 'void', ['pointer', 'pointer']); // v44.242 | String: "TID_TEAM_MEMBER_LEFT_"..

// Logic
function WriteToMemory(address, valueType, value) {
    switch (valueType.toLowerCase()) {
        case "u8":
            Memory.protect(address, 1, "rwx");
            Memory.writeU8(address, value);
            break;
        case "byte":
            Memory.protect(address, 1, "rwx");
            Memory.writeS8(address, value);
            break;
        case "ushort":
            Memory.protect(address, 2, "rwx");
            Memory.writeU16(address, value);
            break;
        case "short":
            Memory.protect(address, 2, "rwx");
            Memory.writeS16(address, value);
            break;
        case "uint":
            Memory.protect(address, 4, "rwx");
            Memory.writeU32(address, value);
            break;
        case "int":
            Memory.protect(address, 4, "rwx");
            Memory.writeS32(address, value);
            break;
        case "float":
            Memory.protect(address, 4, "rwx");
            Memory.writeFloat(address, value);
            break;
        case "pointer":
            Memory.protect(address, 4, "rwx");
            Memory.writePointer(address, value);
            break;
        case "ulong":
            Memory.protect(address, 8, "rwx");
            Memory.writeU64(address, value);
            break;
        case "long":
            Memory.protect(address, 8, "rwx");
            Memory.writeS64(address, value);
            break;
        case "double":
            Memory.protect(address, 8, "rwx");
            Memory.writeDouble(address, value);
            break;
        case "bytearray":
            Memory.protect(address, value.length, "rwx");
            Memory.writeByteArray(address, value);
            break;
        case "string":
            Memory.protect(address, value.length, "rwx");
            Memory.writeUtf8String(address, value);
            break;
    }
}

function GetRandomInRangeExcept(min, max, exceptionArray=[]) {
    var result = Math.floor(Math.random() * (max - min)) + min;
    if (exceptionArray.includes(result)) {
        return GetRandomInRangeExcept(min, max, exceptionArray);
    }
    else {
        return result;
    }
}

function FormatJSONString(obj, tablen=ModInfo.ModVersion == 'dev' ? 4 : 0) {
    return JSON.stringify(obj, null, tablen);
}

function FormatLog(level, message) {
    let formattedLogStr = "";
    const date = new Date();
    formattedLogStr+=date.toLocaleString();
    switch(level) {
        case 0:
            formattedLogStr+=" [ERROR]";
            break;
        case 1:
            formattedLogStr+=" [WARNING]";
            break;
        case 2:
            formattedLogStr+=" [VERBOSE]";
            break;
    }
    formattedLogStr+=` ${message}\n`;
    return formattedLogStr;
}

function WriteToFile(filepath, mode, content) {
    let FileToWrite = new File(filepath, mode);
    FileToWrite.write(content);
    FileToWrite.close();
}

function CreateNewStringObject(Str, at=0) {
    const CharLen = Str.length;
    const ByteLen = Buffer.byteLength(Str, "utf-8");
    const StringObjectPtr = at ? at : malloc(16);
    StringObjectPtr.writeU32(CharLen);
    StringObjectPtr.add(4).writeU32(ByteLen);
    if (ByteLen > 7) {
        const LongStringAllocPtr = malloc(ByteLen+1);
        LongStringAllocPtr.writeUtf8String(Str);
        StringObjectPtr.add(8).writePointer(LongStringAllocPtr);
    }
    else {
        StringObjectPtr.add(8).writeUtf8String(Str);
    }
    return StringObjectPtr;
}

function ReadStringFromStringObject(StrObjectPtr) {
    const StringByteLength = StrObjectPtr.add(4).readInt();
    if (StringByteLength > 7) {
        return StrObjectPtr.add(8).readPointer().readUtf8String(StringByteLength);
    }
    return StrObjectPtr.add(8).readUtf8String(StringByteLength);
}

function ClearStringObjects(StrObjectPtrArray) {
    for (let ptr of StrObjectPtrArray) {
        WriteToMemory(ptr, "Int", 0);
        WriteToMemory(ptr.add(4), "Int", 0);
        WriteToMemory(ptr.add(8), "Int", 0);
        free(ptr);
    }
}

function ReadFile(filepath, mode) {
    var file = fopen(Memory.allocUtf8String(filepath), Memory.allocUtf8String(mode));
    fseek(file, 0, 2);
    var Fsize = ftell(file);
    rewind(file);
    var buffer = malloc(Fsize);
    fread(buffer, 1, Fsize, file);
    var data = new Uint8Array(buffer.readByteArray(Fsize));
    fclose(file);
    free(buffer);
    return Buffer.from(data);
};

var ModMenuPopup_onClick_replaced, EventDetailsPopup_onClick2_replaced = false;

const cm = new CModule(`
void ThemesPopup_buttonClicked() {}
void StatusesPopup_buttonClicked() {}
void ModMenuPopup_buttonClicked() {}
void ModConfigurationPopup_buttonClicked() {}
void ModConfigurationItem_buttonClicked() {}
void SkinMenuPopup_buttonClicked() {}
void BrawlerMenuPopup_buttonClicked() {}
void LocationThemesPopup_buttonClicked() {}
void EventDetailsPopup_buttonClicked2() {}
`);

function ReloadGame() {
    GameMain_reloadGame(base.add(GameMain_instanceAddr).readPointer());
}

function ShowFloaterTextAtDefaultPosition(FloaterText='', stop=0.0, RGBAcolor=0xFFFFFFFF) {
    FloaterText = CreateNewStringObject(FloaterText);
    GUI_showFloaterTextAtDefaultPos(base.add(GUI_instanceAddr).readPointer(), FloaterText, stop, RGBAcolor);
    ClearStringObjects([FloaterText]);
}

for (let protection of GameArxanProtectionsArray) {
    Memory.patchCode(base.add(protection.start), 4, code => {
        const ArmOpcodeWriter = new ArmWriter(code);
        ArmOpcodeWriter.putBImm(base.add(protection.end));
        ArmOpcodeWriter.flush();
    });
}

for (let event of TamperPreventionEvents) {
    Interceptor.replace(base.add(event), new NativeCallback(function() {}, 'void', []));
}

Interceptor.replace(Module.findExportByName('libc.so', 'openat'), new NativeCallback(function() {
    return -1; // frida protection bypass
}, 'int', []));

Interceptor.replace(base.add(0xB70110), new NativeCallback(function() {}, 'void', [])); // protection
Interceptor.replace(base.add(0x1BB7CC), new NativeCallback(function() {}, 'void', [])); // protection

function RelocateCString(OldStringObj, NewStringLength) {
    var NewStringPtr = malloc(NewStringLength);
    WriteToMemory(base.add(OldStringObj.off), "Pointer", ptr(NewStringPtr-base.add(OldStringObj.dcd)));
    return NewStringPtr;
}

var NewLatencyTestsStrPtr = RelocateCString(LatencyTestsStr, 30);
var NewTidConnectingToServerStrPtr = RelocateCString(TidConnectingToServerStr, 40);
var NewShellyMcColtStrPtr = RelocateCString(ShellyMcColtStr, 1000);
var NewLobbyInfoWithPlayersOnlineStrPtr = RelocateCString(LobbyInfoWithPlayersOnlineStr, 200);
var NewLobbyInfoWithoutPlayersOnlineStrPtr = RelocateCString(LobbyInfoWithoutPlayersOnlineStr, 200);
var NewTidApiTokenShowStrPtr = RelocateCString(TidApiTokenShowStr, 40);
var NewTidChinaPrivacySettingsButtonStrPtr = RelocateCString(TidChinaPrivacySettingsButtonStr, 30);

WriteToMemory(NewTidConnectingToServerStrPtr, "String", LocalizationStatic.TextServerConnectionCredit);
WriteToMemory(NewShellyMcColtStrPtr, "String", LocalizationStatic.TextModContributors);

function PlaySoundIngame(soundname) {
    let SoundManager_instancePtr = base.add(SoundManager_instanceAddr).readPointer();
    let s1 = CreateNewStringObject(soundname);
    SoundManager_playSound(SoundManager_instancePtr, LogicDataTables_getSoundByName(s1, 0), 1.0, 0.0, -1, 1.0, -1);
    ClearStringObjects([s1]);
}

function GetIngameFPS(toFixed) {
    let CalculatedFPS = 0;
    let GameMain_instancePtr = base.add(GameMain_instanceAddr).readPointer();
    let v1 = GameMain_instancePtr.add(472).readInt();
    if (v1 > 0) {
        let v2 = GameMain_instancePtr.add(468).readFloat();
        CalculatedFPS = v2/v1;
    }
    return CalculatedFPS.toFixed(toFixed);
}

Interceptor.replace(GameMain_update, new NativeCallback(function(self, time1, time2) {
    if (NewTidConnectingToServerStrPtr.readUtf8String() == LocalizationStatic.TextServerConnectionCredit) {
        GameMain_update(self, time1, time2);
    }
    if (LanguageIndexSet) {
        if (base.add(LogicVersion_isProdAddr).readU8() == 0) {
            switch (SaveObject.LobbyInfoTextType) {
                case 0:
                default:
                    if (ModInfo.ModVersion == "beta") {
                        WriteToMemory(NewLobbyInfoWithPlayersOnlineStrPtr, "String", `BSD Brawl Beta\nFPS: ${GetIngameFPS(1)}%.0s\n${LocalizationObject.TextPlayersOnline}: %i`);
                    }
                    else if (ModInfo.ModVersion == "dev") {
                        WriteToMemory(NewLobbyInfoWithPlayersOnlineStrPtr, "String", `BSD Brawl Dev\nFPS: ${GetIngameFPS(1)}%.0s\n${LocalizationObject.TextPlayersOnline}: %i`);
                    }
                    else {
                        WriteToMemory(NewLobbyInfoWithPlayersOnlineStrPtr, "String", `BSD Brawl\n${LocalizationStatic.TextLobbyInfoCredit}\nFPS: ${GetIngameFPS(1)}%.0s\n${LocalizationObject.TextPlayersOnline}: %i`);
                    }
                    break;
                case 1:
                    if (ModInfo.ModVersion == "beta") {
                        WriteToMemory(NewLobbyInfoWithPlayersOnlineStrPtr, "String", "BSD Brawl Beta");
                    }
                    else if (ModInfo.ModVersion == "dev") {
                        WriteToMemory(NewLobbyInfoWithPlayersOnlineStrPtr, "String", "BSD Brawl Dev");
                    }
                    else {
                        WriteToMemory(NewLobbyInfoWithPlayersOnlineStrPtr, "String", `BSD Brawl\n${LocalizationStatic.TextLobbyInfoCredit}`);
                    }
                    break;
                case 2:
                    WriteToMemory(NewLobbyInfoWithPlayersOnlineStrPtr, "String", `FPS: ${GetIngameFPS(1)}%.0s\n${LocalizationObject.TextPlayersOnline}: %i`);
                    break;
                case 3:
                    WriteToMemory(NewLobbyInfoWithPlayersOnlineStrPtr, "String", ``);
                    break;
            }
        }
        else {
            switch (SaveObject.LobbyInfoTextType) {
                case 0:
                default:
                    if (ModInfo.ModVersion == "beta") {
                        WriteToMemory(NewLobbyInfoWithoutPlayersOnlineStrPtr, "String", `BSD Brawl Beta\nFPS: ${GetIngameFPS(1)}`);
                    }
                    else if (ModInfo.ModVersion == "dev") {
                        WriteToMemory(NewLobbyInfoWithoutPlayersOnlineStrPtr, "String", `BSD Brawl Dev\nFPS: ${GetIngameFPS(1)}`);
                    }
                    else {
                        WriteToMemory(NewLobbyInfoWithoutPlayersOnlineStrPtr, "String", `BSD Brawl\n${LocalizationStatic.TextLobbyInfoCredit}\nFPS: ${GetIngameFPS(1)}`);
                    }
                    break;
                case 1:
                    if (ModInfo.ModVersion == "beta") {
                        WriteToMemory(NewLobbyInfoWithoutPlayersOnlineStrPtr, "String", `BSD Brawl Beta`);
                    }
                    else if (ModInfo.ModVersion == "dev") {
                        WriteToMemory(NewLobbyInfoWithoutPlayersOnlineStrPtr, "String", `BSD Brawl Dev`);
                    }
                    else {
                        WriteToMemory(NewLobbyInfoWithoutPlayersOnlineStrPtr, "String", `BSD Brawl\n${LocalizationStatic.TextLobbyInfoCredit}`);
                    }
                    break;
                case 2:
                    WriteToMemory(NewLobbyInfoWithoutPlayersOnlineStrPtr, "String", `FPS: ${GetIngameFPS(1)}`);
                    break;
                case 3:
                    WriteToMemory(NewLobbyInfoWithoutPlayersOnlineStrPtr, "String", ``);
                    break;
            }
        }
    }
    if (SaveObject.SlowMode) {
        if (!base.add(SlowModeAdr).readU8()) {
            WriteToMemory(base.add(SlowModeAdr), "Byte", 1);
        }
    }
}, 'void', ['pointer', 'float', 'float']));

Interceptor.replace(PlayerInfo_refreshPlayerHeader, new NativeCallback(function(self) {
    var PlayerTag = "0";
    var HashCodeGenerator_toCodeIA = Interceptor.attach(HashCodeGenerator_toCode, {
        onLeave: function(retval) {
            PlayerTag = ReadStringFromStringObject(retval).substring(1);
            HashCodeGenerator_toCodeIA.detach();
        }
    });
    PlayerInfo_refreshPlayerHeader(self);
    var CopyPlayerTagButton = DropGUIContainer_addGameButton(self.add(132).readPointer(), Memory.allocUtf8String("tag_txt"), 1);
    CustomButton_setButtonListener(CopyPlayerTagButton, self.add(72));
    Interceptor.attach(self.add(72).readPointer().add(4).readPointer(), {
        onEnter: function(args) {
            if (CopyPlayerTagButton.equals(args[1])) {
                var PlayerTag_SO = CreateNewStringObject(PlayerTag);
                CopyString(PlayerTag_SO);
                ClearStringObjects([PlayerTag_SO]);
                ShowFloaterTextAtDefaultPosition(`${LocalizationObject.TextPlayerTagCopied}\n(${PlayerTag})`);
            }
        }
    });
}, 'void', ['pointer']));

Interceptor.replace(StringTable_setLanguageIndex, new NativeCallback(function(a1, a2) {
    StringTable_setLanguageIndex(a1, a2);
    const languageCode = ReadStringFromStringObject(StringTable_getCurrentLanguageCode());
    var BSDLocalePath = `BSD/localization/${languageCode}.json`;
    //if (AAssetExists(BSDLocalePath)) LocalizationObject = JSON.parse(AAssetReader(BSDLocalePath));
    //else LocalizationObject = JSON.parse(AAssetReader('BSD/localization/EN.json'));
    languageCode == "RU" ? LocalizationObject = LocalesArray[1] : LocalizationObject = LocalesArray[0];
    WriteToMemory(NewLatencyTestsStrPtr, "String", LocalizationObject.TextModLoaderPopup);
    WriteToMemory(NewTidApiTokenShowStrPtr, "String", LocalizationObject.TextModConfigurationPopup);
    WriteToMemory(NewTidChinaPrivacySettingsButtonStrPtr, "String", LocalizationObject.TextModMenuPopup);
    LanguageIndexSet = true;

    if (SaveObject.RandomThemesParental[0]) {
        if (!SaveObject.RandomThemesParental[1]) {
            const ThemesTable = LogicDataTables_getTable(41);
            const ThemeItemCount = new NativeFunction(ThemesTable.readPointer().add(16).readPointer(), 'int', ['pointer'])(ThemesTable);
            const VC_LogicDataTable_getItemAt = new NativeFunction(ThemesTable.readPointer().add(20).readPointer(), 'pointer', ['pointer', 'int']);
            var ThemeExceptionArray = [];

            for (let i = 0; i < ThemeItemCount; i++) {
                if (LogicThemeData_isDisabled(VC_LogicDataTable_getItemAt(ThemesTable, i))) {
                    ThemeExceptionArray.push(i);
                }
            }

            let SharedRandomThemeResult = GetRandomInRangeExcept(0, ThemeItemCount, ThemeExceptionArray);
            SaveObject.ThemeID = SharedRandomThemeResult;
            SaveObject.ThemeMusicID = SharedRandomThemeResult;
            WriteToFile(ModSaveFilePath, "w", FormatJSONString(SaveObject));
        }

        else {
            const ThemesTable = LogicDataTables_getTable(41);
            const ThemeItemCount = new NativeFunction(ThemesTable.readPointer().add(16).readPointer(), 'int', ['pointer'])(ThemesTable);
            const VC_LogicDataTable_getItemAt = new NativeFunction(ThemesTable.readPointer().add(20).readPointer(), 'pointer', ['pointer', 'int']);
            var ThemeExceptionArray = [];

            for (let i = 0; i < ThemeItemCount; i++) {
                if (LogicThemeData_isDisabled(VC_LogicDataTable_getItemAt(ThemesTable, i))) {
                    ThemeExceptionArray.push(i);
                }
            }
    
            SaveObject.ThemeID = GetRandomInRangeExcept(0, ThemeItemCount, ThemeExceptionArray);
            SaveObject.ThemeMusicID = GetRandomInRangeExcept(0, ThemeItemCount, ThemeExceptionArray);
            WriteToFile(ModSaveFilePath, "w", FormatJSONString(SaveObject));
        }
    }
}, 'void', ['int', 'int']));

WriteToMemory(base.add(InviteFeatureAddr1), "Byte", 0);
WriteToMemory(base.add(ShouldShowAPITokenButtonAddr), "Byte", 1);
WriteToMemory(base.add(SettingsScreen_isDeveloperBuildAddr), "ByteArray", [0x01, 0x00, 0xA0, 0xE3]);
WriteToMemory(base.add(SettingsScreen_isChinaAddr), "ByteArray", [0x01, 0x00, 0xA0, 0xE3]);
WriteToMemory(base.add(HomeScreen_Update_isProd1), "ByteArray", [0x00, 0x00, 0xA0, 0xE3]); // MOV R0, #0
WriteToMemory(base.add(HomeScreen_Update_isProd2), "ByteArray", [0x00, 0x00, 0xA0, 0xE3]); // MOV R0, #0
WriteToMemory(base.add(StageHostStr), "String", "stage.brawlstarsgame.com");
WriteToMemory(base.add(CreditsProdHostStr), "String", "");
//WriteToMemory(base.add(SelectSoloModesInTeam), "Byte", 0);
//WriteToMemory(base.add(), "Byte", 1, true); // Team

const EventDetailsPopup_init = new NativeFunction(base.add(0x3AE7B0), 'void', ['pointer', 'pointer']); // v44.242 | String: "quest_button"
const LocationInfo_getLocationThemeData = new NativeFunction(base.add(0xA17E40), 'pointer', ['pointer']); // v44.242 | String: ""

var SharedEventDetailtPopupSelfPtr;
Interceptor.replace(EventDetailsPopup_init, new NativeCallback(function(self, LocationInfo) {
    EventDetailsPopup_init(self, LocationInfo);
    if (LocationInfo.readPointer().toInt32()) {
        let LocationThemesButton = DropGUIContainer_addGameButton(self, Memory.allocUtf8String('tab_modifiers'), 1);
        let LocationThemesButton_MC = LocationThemesButton.add(72).readPointer();
        LocationThemesButton_MC.add(4).writeU8(1);
        MovieClip_gotoAndStopFrameIndex(LocationThemesButton_MC, 0);
        let CB_mallocation = malloc(4);
        CB_mallocation.writePointer(cm.EventDetailsPopup_buttonClicked2);
        CustomButton_setButtonListener(LocationThemesButton, CB_mallocation);
        SharedEventDetailtPopupSelfPtr = LocationInfo;
    }
}, 'void', ['pointer', 'pointer']));

Interceptor.replace(cm.EventDetailsPopup_buttonClicked2, new NativeCallback(function(self, CustomButton) {
    let ptr1 = malloc(300);
    LocationThemesPopup(ptr1, SharedEventDetailtPopupSelfPtr);
    GUI_showPopup(base.add(GUI_instanceAddr).readPointer(), ptr1, 1, 1, 0);
}, 'void', ['pointer', 'pointer']));

Interceptor.replace(MapEditorModifierPopup_addModifierItem, new NativeCallback(function(self, ModifierID) {
    MapEditorModifierPopup_addModifierItem(self, ModifierID);
    if (ModifierID == 4) {
        MapEditorModifierPopup_addModifierItem(self, 5);
        MapEditorModifierPopup_addModifierItem(self, 8);
        MapEditorModifierPopup_addModifierItem(self, 9);
        MapEditorModifierPopup_addModifierItem(self, 10);
        MapEditorModifierPopup_addModifierItem(self, 11);
    }
    if (ModifierID == 14) {
        MapEditorModifierPopup_addModifierItem(self, 15);
        MapEditorModifierPopup_addModifierItem(self, 16);
        MapEditorModifierPopup_addModifierItem(self, 17);
    }
}, 'void', ['pointer', 'int']));

var SessionCount, PlayTimeInSeconds, AccountCreatedDate = -1;
Interceptor.replace(LoginOkMessage_decode, new NativeCallback(function(self) {
    LoginOkMessage_decode(self);
    SessionCount = self.add(132).readInt();
    PlayTimeInSeconds = self.add(136).readInt();
    AccountCreatedDate = ReadStringFromStringObject(self.add(148).readPointer());
}, 'void', ['pointer']));

Interceptor.replace(GoalList_displayTrackInfo, new NativeCallback(function(a1, a2, a3, a4, a5, a6, a7) {
    function TimestampToDate(timestamp) {
        const pad = (n,s=2) => (`${new Array(s).fill(0)}${n}`).slice(-s);
        const d = new Date(timestamp);
        return `${pad(d.getDate())}.${pad(d.getMonth()+1)}.${pad(d.getFullYear(),4)}|${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
    }

    function TimeCalculator(seconds) {
        let h = Math.floor(seconds / 3600);
        let m = Math.floor((seconds % 3600) / 60);
        let s = Math.floor(seconds % 60);
        let hDisplay = h > 0 ? h + (` ${LocalizationObject.TextHoursShort} `) : "";
        let mDisplay = m > 0 ? m + (` ${LocalizationObject.TextMinsShort} `) : "";
        let sDisplay = s > 0 ? s + (` ${LocalizationObject.TextSecsShort}`) : "";
        return hDisplay + mDisplay + sDisplay;
    }

    if (a1 == 5) {
        let preform_arg3 = ReadStringFromStringObject(StringTable_getString(Memory.allocUtf8String(ReadStringFromStringObject(a3))));
        a3 = CreateNewStringObject(`${preform_arg3}\n\n${LocalizationObject.TextAccountCreationDate}:\n${TimestampToDate(parseInt(AccountCreatedDate))}\n\n${LocalizationObject.TextSpentTimeOnline}:\n${TimeCalculator(PlayTimeInSeconds)}\n\n${LocalizationObject.TextSessionCount}: ${SessionCount}`);
    }
    GoalList_displayTrackInfo(a1, a2, a3, a4, a5, a6, a7);
}, 'void', ['int', 'int', 'pointer', 'pointer', 'int', 'int', 'int']));

Interceptor.replace(Path_setRootPath, new NativeCallback(function(src) {
    Path_setRootPath(src);
    let RootDirPath = `${ReadStringFromStringObject(base.add(RootPathAddr))}`;
    let SaveDirPath = `${RootDirPath}/save`;
    let LogFilePath = `${SaveDirPath}/debugger_log.txt`;
    ModSaveFilePath = `${SaveDirPath}/bsd_save.json`;

    if (access(Memory.allocUtf8String(ModSaveFilePath), 0) != 0) {
        WriteToFile(ModSaveFilePath, "w", FormatJSONString(SaveObject));
    }

    let TempSaveObject = JSON.parse(ReadFile(ModSaveFilePath, "r"));
    if (!TempSaveObject.hasOwnProperty('ConfigVersion') || TempSaveObject.ConfigVersion < SaveObject.ConfigVersion) {
        WriteToFile(ModSaveFilePath, "w", FormatJSONString(SaveObject));
    }
    else {
        WriteToFile(ModSaveFilePath, "w", FormatJSONString(Object.assign(SaveObject, TempSaveObject)));
        SaveObject = TempSaveObject;
    }
    TempSaveObject = undefined;

    if (SaveObject.ThemeID != null) {
        ThemeID = SaveObject.ThemeID;
    }   

    const LogicThemeData_getThemeMusic = new NativeFunction(base.add(0xD07ED0), 'pointer', ['pointer']); // v44.242 | String: "Theme '%s' is missing music"
    Interceptor.replace(LogicThemeData_getThemeMusic, new NativeCallback(function(theme) {
        if (SaveObject.ThemeMusicID != null) {
            let ThemesTable = LogicDataTables_getTable(41);
            let VC_LogicDataTable_getItemAt = new NativeFunction(ThemesTable.readPointer().add(20).readPointer(), 'pointer', ['pointer', 'int']);
            return LogicThemeData_getThemeMusic(VC_LogicDataTable_getItemAt(ThemesTable, SaveObject.ThemeMusicID));
        }
        return LogicThemeData_getThemeMusic(theme);
    }, 'pointer', ['pointer']));

    if (SaveObject.UseDebugLogging) {
        Interceptor.replace(base.add(DebuggerFnc.error), new NativeCallback(function(ErrorStr) {
            WriteToFile(LogFilePath, "a", FormatLog(0, ErrorStr.readUtf8String()));
        }, 'void', ['pointer']));

        Interceptor.replace(base.add(DebuggerFnc.warning), new NativeCallback(function(WarningStr) {
            if (WarningStr.readUtf8String() != 'Unsupported pixel format 263 passed to GLImage::determineFormat.') {
                WriteToFile(LogFilePath, "a", FormatLog(1, WarningStr.readUtf8String()));
            }
        }, 'void', ['pointer']));
    }

    if (SaveObject.VisualChromaticName) {
        Interceptor.replace(LogicDailyData_isBrawlPassPremiumUnlocked, new NativeCallback(function() {
            return 1;
        }, 'int', []));
    }

    if (SaveObject.DisablePinAnimation) {
        Interceptor.replace(EmoteIcon_playAnim, new NativeCallback(function(a1, a2, a3, a4) {
            EmoteIcon_playAnim(a1, 0, 0, 0.0);
        }, 'void', ['pointer', 'int', 'int', 'float']));
    }

    for (let mod of SaveObject.CustomMods) {
        switch(mod) {
            case "NaniUltiMod":
                //RelocateCString();
                break;
            case "EmotesMod":
                //RelocateCString();
                break;
        }
    }

    if (SaveObject.AntiChatBWCensor) {
        function BadWordFilterBypass(self, OutcomingMessagePtr) {
            const OutcomingMessageStr = ReadStringFromStringObject(self.add(OutcomingMessagePtr).readPointer());
            WriteToMemory(self.add(OutcomingMessagePtr), "Pointer", CreateNewStringObject(`${OutcomingMessageStr}ᅠᅠᅠᅠᅠᅠ`));
        }

        Interceptor.replace(ChatToAllianceMessage_encode, new NativeCallback(function(self) {
            BadWordFilterBypass(self, 88);
            ChatToAllianceMessage_encode(self);
        }, 'void', ['pointer']));

        Interceptor.replace(TeamChatMessage_encode, new NativeCallback(function(self) {
            BadWordFilterBypass(self, 88);
            TeamChatMessage_encode(self);
        }, 'void', ['pointer']));
    }

    if (SaveObject.HideLaserScreenMask) {
        WriteToMemory(base.add(LaserScreenMaskStr), "String", "empty");
    }

    if (SaveObject.ShowOpponentsInFriendlyRoom) {
        WriteToMemory(base.add(TeamMemberItem_isOwnSide), "Byte", 255);
    }
}, 'void', ['pointer']));

Interceptor.replace(PopupBase, new NativeCallback(function(self, PopupFileName, PopupExportName, a4, a5, PopupBackgroundFileName, PopupBackgroundExportName, PopupHeaderExportName) {
    if (SaveObject.UseThemeAllScreens) {
        let ThemesTable = LogicDataTables_getTable(41);
        const VC_LogicDataTable_getItemAt = new NativeFunction(ThemesTable.readPointer().add(20).readPointer(), 'pointer', ['pointer', 'int']);
        let CurrentThemeItem = VC_LogicDataTable_getItemAt(ThemesTable, ThemeID);
        if (!static_theme_restricted_popup_names.includes(ReadStringFromStringObject(PopupExportName))) {
            PopupBackgroundFileName = LogicThemeData_getFileName(CurrentThemeItem);
            PopupBackgroundExportName = LogicThemeData_getExportName(CurrentThemeItem);
        }
    }
    if (ReadStringFromStringObject(PopupExportName) == 'about_screen') {
        PopupBackgroundFileName = CreateNewStringObject('sc/ui.sc');
        PopupBackgroundExportName = CreateNewStringObject('bg_shape_01_atlasgenerator_texture_luminance_alpha');
    }
    PopupBase(self, PopupFileName, PopupExportName, a4, a5, PopupBackgroundFileName, PopupBackgroundExportName, PopupHeaderExportName);
}, 'void', ['pointer', 'pointer', 'pointer', 'int', 'int', 'pointer', 'pointer', 'pointer']));

var SkinsInQueue = [];
Interceptor.replace(LogicSkinData_createReferences, new NativeCallback(function(self) {
    LogicSkinData_createReferences(self);
    if (SaveObject.DisableOutline) {
        CreateNewStringObject("shader/impostor", self.add(128));
    }

    if (ReadStringFromStringObject(LogicData_getName(self)) == 'BanditGirlDefault') {
        SkinsInQueue = [];
    }

    for (let ReplacedSkin of SaveObject.ReplacedSkins) {
        if (ReplacedSkin[0] == ReadStringFromStringObject(LogicData_getName(self))) {
            SkinsInQueue.push({name: ReplacedSkin[1], ptr: self});
        }
    }
    
    for (let MatchSkinIndex = 0; MatchSkinIndex < SkinsInQueue.length; MatchSkinIndex++) {
        if (SkinsInQueue[MatchSkinIndex].name == ReadStringFromStringObject(LogicData_getName(self))) {
            CreateNewStringObject(ReadStringFromStringObject(self.add(64)), SkinsInQueue[MatchSkinIndex].ptr.add(64));
            CreateNewStringObject(ReadStringFromStringObject(self.add(80)), SkinsInQueue[MatchSkinIndex].ptr.add(80));
            CreateNewStringObject(ReadStringFromStringObject(self.add(96)), SkinsInQueue[MatchSkinIndex].ptr.add(96));
            CreateNewStringObject(ReadStringFromStringObject(self.add(112)), SkinsInQueue[MatchSkinIndex].ptr.add(112));
            SkinsInQueue[MatchSkinIndex].ptr.add(144).writePointer(LogicDataTables_getSkinConfByName(LogicData_getName(self.add(144).readPointer()), ptr(0)));
            let n1 = self.add(148).readPointer();
            let n2 = self.add(152).readPointer();
            let n3 = self.add(156).readPointer();
            if (n1.toInt32()) SkinsInQueue[MatchSkinIndex].ptr.add(148).writePointer(LogicDataTables_getSkinByName(LogicData_getName(n1), ptr(0)));
            if (n2.toInt32()) SkinsInQueue[MatchSkinIndex].ptr.add(152).writePointer(LogicDataTables_getSkinByName(LogicData_getName(n2), ptr(0)));
            if (n3.toInt32()) SkinsInQueue[MatchSkinIndex].ptr.add(156).writePointer(LogicDataTables_getSkinByName(LogicData_getName(n3), ptr(0)));
        }
    }
}, 'void', ['pointer']));

const LogicLocationData_createReferences = new NativeFunction(base.add(0xA9F0C0), 'void', ['pointer']); // v44.242 | String: "SupportingCampaignGround", parental function
const LogicDataTables_getLocationThemeByName = new NativeFunction(base.add(0x76700C), 'pointer', ['pointer', 'pointer']); // v44.242 | First ptr of LogicLocationData::createReferences
Interceptor.replace(LogicLocationData_createReferences, new NativeCallback(function(self) {
    LogicLocationData_createReferences(self);
    for (let ReplacedLocationTheme of SaveObject.ReplacedLocationThemes) {
        if (ReplacedLocationTheme[0] == ReadStringFromStringObject(LogicData_getName(self))) {
            self.add(64).writePointer(LogicDataTables_getLocationThemeByName(CreateNewStringObject(ReplacedLocationTheme[1]), ptr(0)));
        }
    }
}, 'void', ['pointer']));

const LogicSkillData_hasMovementBasedAutoshoot = new NativeFunction(base.add(0xB5CE48), 'int', ['pointer']); // v44.242
const LogicSkillData_canAutoShoot = new NativeFunction(base.add(0x6683F0), 'int', ['pointer']); // v44.242

Interceptor.replace(LogicSkillData_hasMovementBasedAutoshoot, new NativeCallback(function(self) {
    if (SaveObject.MovementBasedAutoshootForMortis) {
        if (ReadStringFromStringObject(LogicData_getName(self)) == "UndertakerWeapon") {
            return 1;
        }
    }
    return LogicSkillData_hasMovementBasedAutoshoot(self);
}, 'int', ['pointer']));

Interceptor.replace(LogicSkillData_canAutoShoot, new NativeCallback(function(self) {
    if (SaveObject.BlockAttackAutoshoot && ReadStringFromStringObject(LogicData_getName(self)).endsWith("Weapon")) {
        return false;
    }
    else if (SaveObject.BlockSuperAutoshoot && ReadStringFromStringObject(LogicData_getName(self)).endsWith("Ulti")) {
        return false;
    }
    return LogicSkillData_canAutoShoot(self);
}, 'int', ['pointer']));


/*
const LogicProjectileData_createReferences = new NativeFunction(base.add(0xB1F72C), 'void', ['pointer']); // v44.242 | String: "IsBeam", parental function

var ProjectilePtrQueue = {};

Interceptor.replace(LogicProjectileData_createReferences, new NativeCallback(function(self) {
    
    var ProjectileName = ReadStringFromStringObject(LogicData_getName(self));
    for (let ReplacedProjectile of SaveObject.ReplacedProjectiles) {
        if (ProjectileName == ReplacedProjectile[0]) {
            ProjectilePtrQueue[ReplacedProjectile[0]] = ptr(self);
            self.add(4).readPointer().add(4).writeInt(1);
            //return;
        }
        else if (ProjectileName == ReplacedProjectile[1]) {
            //ProjectileName[ReplacedProjectile[0]].add(88).writeByteArray(self.add(88).readByteArray(392-88));
            self.add(4).readPointer().add(4).writeInt(1);
            //return;
        }
    }
    LogicProjectileData_createReferences(self);
}, 'void', ['pointer']));*/
    
Interceptor.replace(TeamInvitationPopup, new NativeCallback(function(self, a2, a3) {
    TeamInvitationPopup(self, a2, a3);
    PlaySoundIngame("Leave_game_room");
}, 'void', ['pointer', 'pointer', 'int']));

Interceptor.replace(TeamJoinRequestPopup, new NativeCallback(function(self, a2, a3) {
    TeamJoinRequestPopup(self, a2, a3);
    PlaySoundIngame("Join_game_room");
}, 'void', ['pointer', 'pointer', 'pointer']));

Interceptor.replace(LogicConfData_getIntValue, new NativeCallback(function(self, valueID, defaultValue) {
    if (valueID == 1) {
        if (access(Memory.allocUtf8String(ModSaveFilePath), 0) != 0) {
            WriteToFile(ModSaveFilePath, "w", FormatJSONString(SaveObject));
        }
        SaveObject = JSON.parse(ReadFile(ModSaveFilePath, "r"));
        if (SaveObject.ThemeID != null) {
            ThemeID = SaveObject.ThemeID;
            return 41000000 + ThemeID;
        }
        else {
            ThemeID = LogicConfData_getIntValue(self, 1, 41000000) - 41000000;
            return ThemeID + 41000000;
        }
    }

    if (valueID == 12) {
        return +isSkinShopSectionDisabled; // Is skin shop section disabled
    }

    if (valueID == 13) {
        return +isStarShopSectionDisabled; // Is star shop section disabled
    }

    if (valueID == 21) {
        return 1; // Guaranteed Draws
    }
    return LogicConfData_getIntValue(self, valueID, defaultValue);
}, 'int', ['pointer', 'int', 'int']));

Interceptor.replace(TeamManager_onTeamMessage, new NativeCallback(function(self, a2) {
    TeamManager_onTeamMessage(self, a2);
    IsPlayerInGameroom = true;
}, 'void', ['pointer', 'pointer']));

Interceptor.replace(TeamManager_onTeamLeftMessage, new NativeCallback(function(self, a2) {
    TeamManager_onTeamLeftMessage(self, a2);
    WriteToMemory(base.add(StatusID_LDR), "ByteArray", [0x58, 0x10, 0x94, 0xE5]);
    IsPlayerInGameroom = false;
}, 'void', ['pointer', 'pointer']));

Interceptor.replace(SettingsScreen_buttonClicked, new NativeCallback(function(self, CustomButton) {
    if (self.add(212).readPointer().equals(CustomButton)) {
        let ptr1 = malloc(300);
        CustomCsvModLoaderPopup(ptr1);
        GUI_showPopup(base.add(GUI_instanceAddr).readPointer(), ptr1, 1, 0, 1);
    }
    else if (self.add(216).readPointer().equals(CustomButton)) {
        let ptr1 = malloc(300);
        ModMenuPopup(ptr1);
        GUI_showPopup(base.add(GUI_instanceAddr).readPointer(), ptr1, 1, 0, 0);
    }
    else if (self.add(256).readPointer().equals(CustomButton)) {
        let ptr1 = malloc(300);
        ModConfigurationPopup(ptr1);
        GUI_showPopup(base.add(GUI_instanceAddr).readPointer(), ptr1, 1, 0, 1);
    }
    else {
        SettingsScreen_buttonClicked(self, CustomButton);
    }
}, 'void', ['pointer', 'pointer']));

Interceptor.replace(BrawlPassSeasonData_hasUnclaimedRewards, new NativeCallback(function() {
    return 1;
}, 'int', []));

WriteToMemory(base.add(0x7F2564), "ByteArray", [0x07, 0x00, 0x57, 0xE1]); // CMP R7, R7 (R7, R6 by default)
WriteToMemory(base.add(0x159D3E4), "String", "TID_BRAWL_PASS_PREVIOUS_SEASON"); // String: "TID_BRAWL_PASS_BACK_TO_CURRENT_SEASON"
Interceptor.replace(BrawlPassPopup_buttonClicked, new NativeCallback(function(self, CustomButton) {
    if (self.add(340).readPointer().equals(CustomButton)) {
        let starting_point = self.add(300).readInt();
        WriteToMemory(base.add(0x7F2578), "ByteArray", [starting_point-1, 0x00, 0xA0, 0xE3]); // MOV R0, #? (2nd function)
    }
    BrawlPassPopup_buttonClicked(self, CustomButton);
}, 'void', ['pointer', 'pointer']));

var updated_config_items_array = [];
Interceptor.replace(cm.ModConfigurationPopup_buttonClicked, new NativeCallback(function(self, CustomButton) {
    self = self.sub(72);
    if (self.add(236).readPointer().equals(CustomButton)) {
        new NativeFunction(self.readPointer().add(204).readPointer(), 'void', ['pointer'])(self);

        function SwitchOutline() {
            SaveObject.DisableOutline = !SaveObject.DisableOutline;
            WriteToFile(ModSaveFilePath, "w", FormatJSONString(SaveObject));
        }
        
        function ToggleChatAntiCensor() {
            SaveObject.AntiChatBWCensor = !SaveObject.AntiChatBWCensor;
            WriteToFile(ModSaveFilePath, "w", FormatJSONString(SaveObject));
            if (SaveObject.AntiChatBWCensor) {        
                function BadWordFilterBypass(self, OutcomingMessagePtr) {
                    const OutcomingMessageStr = ReadStringFromStringObject(self.add(OutcomingMessagePtr).readPointer());
                    WriteToMemory(self.add(OutcomingMessagePtr), "Pointer", CreateNewStringObject(`${OutcomingMessageStr}ᅠᅠᅠᅠᅠᅠ`));
                }
        
                Interceptor.replace(ChatToAllianceMessage_encode, new NativeCallback(function(self) {
                    BadWordFilterBypass(self, 88);
                    ChatToAllianceMessage_encode(self);
                }, 'void', ['pointer']));
        
                Interceptor.replace(TeamChatMessage_encode, new NativeCallback(function(self) {
                    BadWordFilterBypass(self, 88);
                    TeamChatMessage_encode(self);
                }, 'void', ['pointer']));
            }
            else {
                Interceptor.revert(TeamChatMessage_encode);
                Interceptor.revert(ChatToAllianceMessage_encode);
            }
        }
        
        function TogglePinAnimation() {
            SaveObject.DisablePinAnimation = !SaveObject.DisablePinAnimation;
            WriteToFile(ModSaveFilePath, "w", FormatJSONString(SaveObject));
            if (SaveObject.DisablePinAnimation) {
                Interceptor.replace(EmoteIcon_playAnim, new NativeCallback(function(self, a2, a3, a4) {
                    EmoteIcon_playAnim(self, 0, 0, 0.0);
                }, 'void', ['pointer', 'int', 'int', 'float']));
            }
            else {
                Interceptor.revert(EmoteIcon_playAnim);
            }
        }
        
        function SwitchVisualChromaticName() {
            SaveObject.VisualChromaticName = !SaveObject.VisualChromaticName;
            WriteToFile(ModSaveFilePath, "w", FormatJSONString(SaveObject));
            if (SaveObject.VisualChromaticName) {
                Interceptor.replace(LogicDailyData_isBrawlPassPremiumUnlocked, new NativeCallback(function() {
                    return 1;
                }, 'int', []));
            }
            else {
                Interceptor.revert(LogicDailyData_isBrawlPassPremiumUnlocked);
            }
        }
 
        function SwitchUseThemeAllScreens() {
            SaveObject.UseThemeAllScreens = !SaveObject.UseThemeAllScreens;
            WriteToFile(ModSaveFilePath, "w", FormatJSONString(SaveObject));
        }

        function ToggleLaserScreenMask() {
            SaveObject.HideLaserScreenMask = !SaveObject.HideLaserScreenMask;
            WriteToFile(ModSaveFilePath, "w", FormatJSONString(SaveObject));
            if (SaveObject.HideLaserScreenMask) {
                WriteToMemory(base.add(LaserScreenMaskStr), "String", "empty");
            }
            else {
                WriteToMemory(base.add(LaserScreenMaskStr), "String", "laser_screen_mask");
            }
        }

        function ToggleSlowMode() {
            SaveObject.SlowMode = !SaveObject.SlowMode;
            WriteToFile(ModSaveFilePath, "w", FormatJSONString(SaveObject));
            if (SaveObject.SlowMode) {
                WriteToMemory(base.add(SlowModeAdr), "Byte", 1);
            }
            else {
                WriteToMemory(base.add(SlowModeAdr), "Byte", 0);
            }
        }

        function ToggleCustomModToLoad(name) {
            var index = SaveObject.CustomMods.indexOf(name);
            if (index != -1) {
                SaveObject.CustomMods.splice(index, 1);
            }
            else {
                SaveObject.CustomMods.push(name);
            }
            WriteToFile(ModSaveFilePath, "w", FormatJSONString(SaveObject));
        }

        function PatchRandomThemes(BitOffset) {
            SaveObject.RandomThemesParental[BitOffset] = !SaveObject.RandomThemesParental[BitOffset];
            WriteToFile(ModSaveFilePath, "w", FormatJSONString(SaveObject));
        }

        function ToggleFriendlyOpponentXRay() {
            SaveObject.ShowOpponentsInFriendlyRoom = !SaveObject.ShowOpponentsInFriendlyRoom;
            if (SaveObject.ShowOpponentsInFriendlyRoom) {
                WriteToMemory(base.add(TeamMemberItem_isOwnSide), "Byte", 255);
            }
            else if (base.add(TeamMemberItem_isOwnSide).readU8() == 255) {
                WriteToMemory(base.add(TeamMemberItem_isOwnSide), "Byte", 0);
            }
            WriteToFile(ModSaveFilePath, "w", FormatJSONString(SaveObject));
        }

        function ToggleMovementBasedAutoshootForMortis() {
            SaveObject.MovementBasedAutoshootForMortis = !SaveObject.MovementBasedAutoshootForMortis;
            WriteToFile(ModSaveFilePath, "w", FormatJSONString(SaveObject));
        }

        function ToggleAutoshootForAttackBlock() {
            SaveObject.BlockAttackAutoshoot = !SaveObject.BlockAttackAutoshoot;
            WriteToFile(ModSaveFilePath, "w", FormatJSONString(SaveObject));
        }

        function ToggleAutoshootForSuperBlock() {
            SaveObject.BlockSuperAutoshoot = !SaveObject.BlockSuperAutoshoot;
            WriteToFile(ModSaveFilePath, "w", FormatJSONString(SaveObject));
        }

        let shouldReloadGame = false;
        let shouldShowGameReloadingRequiredWarning = false;
        for (let updated of updated_config_items_array) {
            switch (updated) {
                case 1:
                    SwitchOutline();
                    shouldReloadGame = true;
                    break;
                case 2:
                    ToggleChatAntiCensor();
                    break;
                case 3:
                    ToggleFriendlyOpponentXRay();
                    shouldReloadGame = IsPlayerInGameroom;
                    break;
                case 4:
                    ToggleCustomModToLoad("EnabledLocationsMod");
                    shouldShowGameReloadingRequiredWarning = true;
                    break;
                case 5:
                    TogglePinAnimation();
                    break;
                case 6:
                    ToggleMovementBasedAutoshootForMortis();
                    break;
                case 7:
                    SwitchVisualChromaticName();
                    shouldReloadGame = true;
                    break;
                case 8:
                    SwitchUseThemeAllScreens();
                    break;
                case 9:
                    ToggleAutoshootForAttackBlock();
                    break;
                case 10:
                    ToggleLaserScreenMask();
                    break;
                case 11:
                    ToggleSlowMode();
                    break;
                case 12:
                    ToggleCustomModToLoad("NaniUltiMod");
                    shouldShowGameReloadingRequiredWarning = true;
                    break;
                case 13:
                    ToggleAutoshootForSuperBlock();
                    break;
                case 14:
                    ToggleCustomModToLoad("EmotesMod");
                    shouldShowGameReloadingRequiredWarning = true;
                    break;
                case 15:
                    PatchRandomThemes(0);
                    break;
                case 16:
                    PatchRandomThemes(1);
                    break;
                case 17:
                    PatchRandomThemes(2);
                    break;
            }
        }

        if (shouldReloadGame) {
            ReloadGame();
        }

        if (shouldShowGameReloadingRequiredWarning) {
            ShowFloaterTextAtDefaultPosition(LocalizationObject.TextReloadingRequired);
        }

        updated_config_items_array = [];
    }
}, 'void', ['pointer', 'pointer']));

Interceptor.replace(cm.ModConfigurationItem_buttonClicked, new NativeCallback(function(self, CustomButton) {
    self = self.sub(72);
    var ItemID = self.add(136).readU8();
    var IndexOfItem = updated_config_items_array.indexOf(ItemID);
    self.add(140).writeU8(+!self.add(140).readU8());
    MovieClip_gotoAndStopFrameIndex(self.add(128).readPointer().add(72).readPointer(), self.add(140).readU8());
    IndexOfItem != -1 ? updated_config_items_array.splice(IndexOfItem, 1) : updated_config_items_array.push(ItemID);
}, 'void', ['pointer', 'pointer']));

function ModConfigurationPopup(self) {
    const ScrollArea = new NativeFunction(base.add(0x74D4A4), 'void', ['pointer', 'pointer', 'int']); // v44.242
    const ScrollArea_enablePinching = new NativeFunction(base.add(0x579DD4), 'void', ['pointer', 'int']); // v44.242
    const ScrollArea_enableHorizontalDrag = new NativeFunction(base.add(0x5F0CF8), 'void', ['pointer', 'int']); // v44.242
    const ScrollArea_enableVerticalDrag = new NativeFunction(base.add(0xA965D0), 'void', ['pointer', 'int']); // v44.242
    const ScrollArea_setAlignment = new NativeFunction(base.add(0x1521C8), 'void', ['pointer', 'int']); // v44.242
    const Sprite_addChild = new NativeFunction(base.add(0x95DD88), 'void', ['pointer', 'pointer']); // v44.242

    function ModConfigurationPopup_addItem(self, conf={id: 0, info_object: {}, key: SaveObject.key, icon: "sc/ui.sc:"}) {
        function ModConfigurationItem(self, conf) {
            self.add(136).writeU8(conf.id);
            self.add(140).writeU8(+!conf.key);
            var title = CreateNewStringObject(conf.info_object.name);
            var description = conf.key ? CreateNewStringObject(conf.info_object.desc_disabled) : CreateNewStringObject(conf.info_object.desc_enabled);
            self.add(72).writePointer(cm.ModConfigurationItem_buttonClicked);
            let s1 = CreateNewStringObject("sc/ui.sc");
            let s2 = CreateNewStringObject("modifier_item");
            let mc1 = StringTable_getMovieClip(s1, s2);
            new NativeFunction(self.readPointer().add(152).readPointer(), 'void', ['pointer', 'pointer'])(self, mc1);
            new NativeFunction(base.add(0x4F4DB8), 'void', ['pointer', 'int'])(mc1, 1);
            let btn1 = DropGUIContainer_addGameButton(self, Memory.allocUtf8String("mod_toggle"), 1);
            self.add(128).writePointer(btn1);
            new NativeFunction(base.add(0xADF438), 'void', ['pointer', 'pointer', 'pointer'])(btn1.add(72).readPointer(), Memory.allocUtf8String("text_on"), StringTable_getString(Memory.allocUtf8String("TID_SETTINGS_ON")));
            new NativeFunction(base.add(0xADF438), 'void', ['pointer', 'pointer', 'pointer'])(btn1.add(72).readPointer(), Memory.allocUtf8String("text_off"), StringTable_getString(Memory.allocUtf8String("TID_SETTINGS_OFF")));
            MovieClip_gotoAndStopFrameIndex(btn1.add(72).readPointer(), +!conf.key);
            let tf1 = MovieClip_getTextFieldByName(mc1, Memory.allocUtf8String("mod_title"));
            let tf2 = MovieClip_getTextFieldByName(mc1, Memory.allocUtf8String("mod_desc"));
            MovieClipHelper_setTextAndScaleIfNecessary(tf1, title, 0, 0);
            MovieClipHelper_setTextAndScaleIfNecessary(tf2, description, 0, 0);
            let mc2 = new NativeFunction(base.add(0xB29B98), 'pointer', ['pointer', 'pointer'])(mc1, Memory.allocUtf8String("icon_ph"));
            mc2.add(4).writeU8(0);
            let s3 = CreateNewStringObject("sc/ui.sc");
            let s4 = CreateNewStringObject("questionmark_overlay");
            let mc3 = StringTable_getMovieClip(s3, s4);
            let mc2_height = new NativeFunction(base.add(0xAF9B38), 'float', ['pointer'])(mc2); // v44.242
            let mc3_height = new NativeFunction(base.add(0xAF9B38), 'float', ['pointer'])(mc3); // v44.242
            new NativeFunction(base.add(0x2886D4), 'void', ['pointer', 'float'])(mc3, mc2_height / mc3_height); // v44.242
            let mc2_x = new NativeFunction(base.add(0x8E5EAC), 'float', ['pointer'])(mc2); // v44.242
            let mc2_y = new NativeFunction(base.add(0xAFAAB4), 'float', ['pointer'])(mc2); // v44.242
            new NativeFunction(base.add(0x5396B0), 'void', ['pointer', 'float', 'float'])(mc3, mc2_x, mc2_y); // v44.242
            Sprite_addChild(mc1, mc3);
            ClearStringObjects([title, description, s1, s2, s3, s4]);
        }
        const DropGUIContainer = new NativeFunction(base.add(0xA0E2F8), 'void', ['pointer']); // v44.242
        let alc1 = malloc(144);
        DropGUIContainer(alc1);
        ModConfigurationItem(alc1, conf);
        new NativeFunction(alc1.readPointer().add(20).readPointer(), 'void', ['pointer', 'float', 'float'])(alc1,
            (self.add(252).readPointer().add(72).readFloat() - new NativeFunction(alc1.readPointer().add(48).readPointer(), 'float', ['pointer'])(alc1))*0.5,
            self.add(268).readFloat());
        self.add(268).writeFloat(new NativeFunction(alc1.readPointer().add(52).readPointer(), 'float', ['pointer'])(alc1)+10.0+self.add(268).readFloat());
        new NativeFunction(base.add(0xC29094), 'void', ['pointer', 'pointer'])(self.add(252).readPointer(), alc1);
    }

    let s1 = CreateNewStringObject("popup_editor_modifier");
    let s2 = CreateNewStringObject("");
    GenericPopup(self, s1, 0, 0, s2, s2, s2);
    WriteToMemory(self.add(284), "Byte", 0);
    WriteToMemory(self.add(236), "Long", 0);
    WriteToMemory(self.add(244), "Long", 0);
    WriteToMemory(self.add(252), "Long", 0);
    WriteToMemory(self.add(260), "Long", 0);
    WriteToMemory(self.add(268), "Long", 0);
    WriteToMemory(self.add(276), "Long", 0);
    WriteToMemory(self, "Pointer", base.add(0x10C8E10)); // v44.242
    WriteToMemory(self.add(288), "Int", 30);
    WriteToMemory(self.add(72), "Pointer", cm.ModConfigurationPopup_buttonClicked);
    let s3 = CreateNewStringObject(LocalizationObject.TextModConfigurationPopupTitle);
    GenericPopup_setTitleTid(self, s3);
    self.add(236).writePointer(DropGUIContainer_addGameButton(self, Memory.allocUtf8String("button_close"), 1));
    let tf2 = MovieClip_getTextFieldByName(GUIContainer_getMovieClip(self), Memory.allocUtf8String("txt"));
    let alc1 = malloc(536);
    ScrollArea(alc1, tf2, 1);
    self.add(252).writePointer(alc1);
    alc1.add(528).writeU8(1);
    ScrollArea_enablePinching(alc1, 0);
    ScrollArea_enableHorizontalDrag(alc1, 0);
    ScrollArea_enableVerticalDrag(alc1, 1);
    ScrollArea_setAlignment(alc1, 4);
    ModConfigurationPopup_addItem(self, {id: 1, info_object: LocalizationObject.TextDisableOutlineDisplaying, key: SaveObject.DisableOutline});
    ModConfigurationPopup_addItem(self, {id: 2, info_object: LocalizationObject.TextChatAntiCensor, key: SaveObject.AntiChatBWCensor});
    ModConfigurationPopup_addItem(self, {id: 5, info_object: LocalizationObject.TextDisablePinAnimation, key: SaveObject.DisablePinAnimation});
    ModConfigurationPopup_addItem(self, {id: 7, info_object: LocalizationObject.TextVisualChromaticName, key: SaveObject.VisualChromaticName});
    ModConfigurationPopup_addItem(self, {id: 8, info_object: LocalizationObject.TextUseThemeAllScreens, key: SaveObject.UseThemeAllScreens});
    ModConfigurationPopup_addItem(self, {id: 10, info_object: LocalizationObject.TextHideLaserScreenMask, key: SaveObject.HideLaserScreenMask});
    ModConfigurationPopup_addItem(self, {id: 11, info_object: LocalizationObject.TextSlowMode, key: SaveObject.SlowMode});
    ModConfigurationPopup_addItem(self, {id: 4, info_object: LocalizationObject.TextDisplayAllLocations, key: SaveObject.DisplayAllLocations});
    ModConfigurationPopup_addItem(self, {id: 12, info_object: LocalizationObject.TextNaniUltiMod, key: SaveObject.CustomMods.includes('NaniUltiMod')});
    ModConfigurationPopup_addItem(self, {id: 14, info_object: LocalizationObject.TextEmotesMod, key: SaveObject.CustomMods.includes('EmotesMod')});
    ModConfigurationPopup_addItem(self, {id: 15, info_object: LocalizationObject.TextRandomThemes, key: SaveObject.RandomThemesParental[0]});
    ModConfigurationPopup_addItem(self, {id: 17, info_object: LocalizationObject.TextRandomThemesAfterBattle, key: SaveObject.RandomThemesParental[2]});
    ModConfigurationPopup_addItem(self, {id: 16, info_object: LocalizationObject.TextRandomThemesMusicIndependency, key: SaveObject.RandomThemesParental[1]});
    ModConfigurationPopup_addItem(self, {id: 3, info_object: LocalizationObject.TextShowOpponentsInFriendlyRoom, key: SaveObject.ShowOpponentsInFriendlyRoom});
    ModConfigurationPopup_addItem(self, {id: 6, info_object: LocalizationObject.TextMovementBasedAutoshoot, key: SaveObject.MovementBasedAutoshootForMortis});
    ModConfigurationPopup_addItem(self, {id: 9, info_object: LocalizationObject.TextBlockAttackAutoshoot, key: SaveObject.BlockAttackAutoshoot});
    ModConfigurationPopup_addItem(self, {id: 13, info_object: LocalizationObject.TextBlockSuperAutoshoot, key: SaveObject.BlockSuperAutoshoot});
    Sprite_addChild(self, alc1);
    ClearStringObjects([s1, s2, s3]);
}

function ListPopupBase(a1, RefreshItemsCallback, PopupConfig={PopupExportName: "country_popup", ClickListenerPtr: cm.Popup_buttonClicked, PopupTitleString: "POPUP NAME"}) { // experimental
    const Stage_instancePtr = base.add(Stage_instanceAddr).readPointer();
    let s1 = CreateNewStringObject(PopupConfig.PopupExportName);
    let s2 = CreateNewStringObject("");
    GenericPopup(a1, s1, 1, 0, s2, s2, s2);
    WriteToMemory(a1.add(256), "Long", 0);
    WriteToMemory(a1.add(264), "Long", 0);
    WriteToMemory(a1, "Pointer", base.add(PopupVtableAdr_shared));
    WriteToMemory(a1.add(72), "Pointer", PopupConfig.ClickListenerPtr);
    GenericPopup_setUpScreenHeader(a1);
    let fln1 = 0.1;
    if (Stage_instancePtr.add(3728).readFloat() != 0.0) {
        fln1 = Stage_instancePtr.add(3728).readFloat();
    }
    DisplayObject_setY(GUIContainer_getMovieClip(a1), (Stage_instancePtr.add(3840).readInt() - ((Stage_instancePtr.add(68).readFloat() + Stage_instancePtr.add(64).readFloat()) / fln1)) * -0.5);
    let ListContainerPtr = malloc(56);
    ListContainer(ListContainerPtr, GUIContainer_getMovieClip(a1), 1, 3, 2, s2, s2, s2);
    a1.add(256).writePointer(ListContainerPtr);
    let s3 = CreateNewStringObject(PopupConfig.PopupTitleString);
    GenericPopup_setTitleTid(a1, s3);
    RefreshItemsCallback(a1);
    ClearStringObjects([s1, s2, s3]);
}

function ThemesPopup(a1, IsBackgroundSelected=false, BackgroundID=0) {
    function ThemesPopup_refreshItems(a1) {
        function ThemeItem(a1, CurrentThemeItem, Item) {
            GameButton(a1);
            WriteToMemory(a1, "Pointer", base.add(ListPopupItemVtableAdr_shared));
            const VC_CustomButton_setMovieClip = new NativeFunction(a1.readPointer().add(156).readPointer(), 'void', ['pointer', 'pointer', 'int']);
            let s1 = CreateNewStringObject("sc/ui.sc");
            let s2 = CreateNewStringObject("country_item");
            let ThemeItemMC = StringTable_getMovieClip(s1, s2);
            ClearStringObjects([s1, s2]);
            VC_CustomButton_setMovieClip(a1, ThemeItemMC, 1);
            let tf1 = MovieClip_getTextFieldByName(ThemeItemMC, Memory.allocUtf8String("Text"));
            WriteToMemory(tf1.add(85), "Byte", 1); // ColorTag
            MovieClipHelper_setTextAndScaleIfNecessary(tf1, LogicData_getName(Item), 0, 0);
            MovieClip_gotoAndStopFrameIndex(ThemeItemMC, +!CurrentThemeItem.equals(Item));
        }
        ListContainer_clearEntries(a1.add(256).readPointer());
        const ThemesTable = LogicDataTables_getTable(41);
        const VC_LogicDataTable_getItemCount = new NativeFunction(ThemesTable.readPointer().add(16).readPointer(), 'int', ['pointer']);
        const VC_LogicDataTable_getItemAt = new NativeFunction(ThemesTable.readPointer().add(20).readPointer(), 'pointer', ['pointer', 'int']);
        let ThemesItemCount = VC_LogicDataTable_getItemCount(ThemesTable);
        WriteToMemory(a1.add(279), "Short", ThemesItemCount);
        a1.add(272).writePointer(malloc(4*ThemesItemCount));
        for (let ThemeItemJ = 0; ThemeItemJ < ThemesItemCount; ThemeItemJ++) {
            if (!LogicThemeData_isDisabled(VC_LogicDataTable_getItemAt(ThemesTable, ThemeItemJ))) {
                let ThemeItemPtr = malloc(296);
                ThemeItem(ThemeItemPtr, VC_LogicDataTable_getItemAt(ThemesTable, IsBackgroundSelected ? SaveObject.ThemeMusicID ?? ThemeID : ThemeID), VC_LogicDataTable_getItemAt(ThemesTable, ThemeItemJ));
                a1.add(272).readPointer().add(4*ThemeItemJ).writePointer(ThemeItemPtr);
                CustomButton_setButtonListener(ThemeItemPtr, a1.add(72));
                ListContainer_addEntry(a1.add(256).readPointer(), ThemeItemPtr);
            }
        }
        ListContainer_refreshEntryPositions(a1.add(256).readPointer(), 4, PopupBase_getNaviHeight(a1), 8.0, 0.0, 0, 0);
        ListContainer_refreshBounds(a1.add(256).readPointer(), PopupBase_getNaviHeight(a1));
    }
    ListPopupBase(a1, ThemesPopup_refreshItems, {
        PopupExportName: "country_popup",
        PopupTitleString: IsBackgroundSelected ? LocalizationObject.TextThemesPopupSelectMusicTitle : LocalizationObject.TextThemesPopupSelectBackgroundTitle,
        ClickListenerPtr: cm.ThemesPopup_buttonClicked
    });
    WriteToMemory(a1.add(276), "Byte", +IsBackgroundSelected);
    if (IsBackgroundSelected) {
        WriteToMemory(a1.add(277), "Short", BackgroundID);
    }
}
Interceptor.replace(cm.ThemesPopup_buttonClicked, new NativeCallback(function(self, CustomButton) {
    self = self.sub(72);
    if (self.add(128).readPointer().equals(CustomButton) || self.add(132).readPointer().equals(CustomButton)) {
        GenericPopup_buttonClicked(self, CustomButton);
    }
    else {
        for (let i = 0; i < self.add(279).readShort(); i++) {
            if (self.add(272).readPointer().add(4*i).readPointer().equals(CustomButton)) {
                if (self.add(276).readU8()) {
                    SaveObject.ThemeID = self.add(277).readU16();
                    SaveObject.ThemeMusicID = i;
                    WriteToFile(ModSaveFilePath, "w", FormatJSONString(SaveObject));
                    ReloadGame();
                }
                else {
                    let ptr1 = malloc(300);
                    ThemesPopup(ptr1, true, i);
                    GUI_showPopup(base.add(GUI_instanceAddr).readPointer(), ptr1, 1, 1, 0);
                }
            }
        }
    }
}, 'void', ['pointer', 'pointer']));

var StatusesArray = [-1, 1, 2, 3, 4, 5, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];
function StatusesPopup(a1) {
    function StatusesPopup_refreshItems(a1) {
        function StatusItem(a1, StatusItemID) {
            GameButton(a1);
            WriteToMemory(a1, "Pointer", base.add(ListPopupItemVtableAdr_shared));
            const VC_CustomButton_setMovieClip = new NativeFunction(a1.readPointer().add(156).readPointer(), 'void', ['pointer', 'pointer', 'int']);
            let s1 = CreateNewStringObject("sc/ui.sc");
            let s2 = CreateNewStringObject("country_item");
            let StatusItemMC = StringTable_getMovieClip(s1, s2);
            ClearStringObjects([s1, s2]);
            VC_CustomButton_setMovieClip(a1, StatusItemMC, 1);
            let tf1 = MovieClip_getTextFieldByName(StatusItemMC, Memory.allocUtf8String("Text"));
            WriteToMemory(tf1.add(85), "Byte", 1); // ColorTag
            let StatusItemName; StatusItemID == -1 ? StatusItemName = "TID_EDIT_REVERT" : StatusItemID == 12 ? StatusItemName = `TID_TEAM_MEMBER_STATUS_NEW_${StatusItemID}` : StatusItemName = `TID_TEAM_MEMBER_STATUS_${StatusItemID}`;
            MovieClipHelper_setTextAndScaleIfNecessary(tf1, StringTable_getString(Memory.allocUtf8String(StatusItemName)), 0, 0);
            MovieClip_gotoAndStopFrameIndex(StatusItemMC, 1);
        }
        ListContainer_clearEntries(a1.add(256).readPointer());

        WriteToMemory(a1.add(276), "Short", StatusesArray.length);
        a1.add(272).writePointer(malloc(4*StatusesArray.length));
        for (let StatusItemIndex = 0; StatusItemIndex < StatusesArray.length; StatusItemIndex++) {
            let StatusItemPtr = malloc(296);
            StatusItem(StatusItemPtr, StatusesArray[StatusItemIndex]);
            a1.add(272).readPointer().add(4*StatusItemIndex).writePointer(StatusItemPtr);
            CustomButton_setButtonListener(StatusItemPtr, a1.add(72));
            ListContainer_addEntry(a1.add(256).readPointer(), StatusItemPtr);
        }        
        ListContainer_refreshEntryPositions(a1.add(256).readPointer(), 4, PopupBase_getNaviHeight(a1), 8.0, 0.0, 0, 0);
        ListContainer_refreshBounds(a1.add(256).readPointer(), PopupBase_getNaviHeight(a1));
    }
    ListPopupBase(a1, StatusesPopup_refreshItems, {
        PopupExportName: "country_popup",
        PopupTitleString: LocalizationObject.TextStatusesPopupTitle,
        ClickListenerPtr: cm.StatusesPopup_buttonClicked
    });
}
Interceptor.replace(cm.StatusesPopup_buttonClicked, new NativeCallback(function(self, CustomButton) {
    self = self.sub(72);
    if (self.add(128).readPointer().equals(CustomButton) || self.add(132).readPointer().equals(CustomButton)) {
        GenericPopup_buttonClicked(self, CustomButton);
    }
    else {
        for (let i = 0; i < self.add(276).readPointer(); i++) {
            if (self.add(272).readPointer().add(4*i).readPointer().equals(CustomButton)) {
                let TeamMemberStatusMessagePtr = malloc(92);
                if (StatusesArray[i] == -1) {
                    WriteToMemory(base.add(StatusID_LDR), "ByteArray", [0x58, 0x10, 0x94, 0xE5]);
                    TeamMemberStatusMessage(TeamMemberStatusMessagePtr, 3);
                }
                else {
                    WriteToMemory(base.add(StatusID_LDR), "ByteArray", [StatusesArray[i], 0x10, 0xA0, 0xE3]);
                    TeamMemberStatusMessage(TeamMemberStatusMessagePtr, StatusesArray[i]);
                }
                MessageManager_sendMessage(base.add(MessageManager_instanceAddr).readPointer(), TeamMemberStatusMessagePtr);
                GUI_closeAllPopups(base.add(GUI_instanceAddr).readPointer());
            }
        }
    }
}, 'void', ['pointer', 'pointer']));

function ModMenuPopup(a1) {
    function ModMenuPopup_refreshItems(a1) {
        function ModMenuItem(a1, ModMenuItem) {
            GameButton(a1);
            WriteToMemory(a1, "Pointer", base.add(ListPopupItemVtableAdr_shared));
            const VC_CustomButton_setMovieClip = new NativeFunction(a1.readPointer().add(156).readPointer(), 'void', ['pointer', 'pointer', 'int']);
            let s1 = CreateNewStringObject("sc/ui.sc");
            let s2 = CreateNewStringObject("country_item");
            let ModMenuItemMC = StringTable_getMovieClip(s1, s2);
            ClearStringObjects([s1, s2]);
            VC_CustomButton_setMovieClip(a1, ModMenuItemMC, 1);
            let tf1 = MovieClip_getTextFieldByName(ModMenuItemMC, Memory.allocUtf8String("Text"));
            WriteToMemory(tf1.add(85), "Byte", 1); // ColorTag
            MovieClipHelper_setTextAndScaleIfNecessary(tf1, CreateNewStringObject(ModMenuItem.name), 0, 0);
            MovieClip_gotoAndStopFrameIndex(ModMenuItemMC, 1);
        }
        ListContainer_clearEntries(a1.add(256).readPointer());
        
        function OpenSwitchThemePopup() {
            let ptr1 = malloc(300);
            ThemesPopup(ptr1);
            GUI_showPopup(base.add(GUI_instanceAddr).readPointer(), ptr1, 1, 1, 0);
        }

        function OpenStatusesPopup() {
            if (IsPlayerInGameroom) {
                let ptr1 = malloc(300);
                StatusesPopup(ptr1);
                GUI_showPopup(base.add(GUI_instanceAddr).readPointer(), ptr1, 1, 1, 0);
            }
            else {
                ShowFloaterTextAtDefaultPosition(LocalizationObject.TextStatusesPopupErrorNotInTeam);
            }
        }

        function OpenBrawlerMenuPopup() {
            let ptr1 = malloc(300);
            BrawlerMenuPopup(ptr1);
            GUI_showPopup(base.add(GUI_instanceAddr).readPointer(), ptr1, 1, 1, 0);
        }

        function ReloadGameButton(){
            ReloadGame();
        }

        function OpenSkinMenuPopup() {
            let ptr1 = malloc(300);
            BrawlerMenuPopup(ptr1, true);
            GUI_showPopup(base.add(GUI_instanceAddr).readPointer(), ptr1, 1, 1, 0);
        }

        function SwitchServer() {
            ReloadGame();
            base.add(LogicVersion_isProdAddr).readU8() == 1 ? WriteToMemory(base.add(LogicVersion_isProdAddr), "Byte", 0) : WriteToMemory(base.add(LogicVersion_isProdAddr), "Byte", 1);
        }

        function RefreshModMenuPopup() {
            GUI_closePopup(base.add(GUI_instanceAddr).readPointer(), 43);
            let ptr1 = malloc(300);
            ModMenuPopup(ptr1);
            GUI_showPopup(base.add(GUI_instanceAddr).readPointer(), ptr1, 1, 1, 0);
        }

        function ToggleLobbyInfoTextType() {
            // 0 - All, 1 - Authors, 2 - FPS, 3 - Nothing
            SaveObject.LobbyInfoTextType = (SaveObject.LobbyInfoTextType+1)%4;
            WriteToFile(ModSaveFilePath, "w", FormatJSONString(SaveObject));
            RefreshModMenuPopup();
        }

        function SkinChangerLogic() {
            let ptr1 = malloc(300);
            BrawlerMenuPopup(ptr1, true, true);
            GUI_showPopup(base.add(GUI_instanceAddr).readPointer(), ptr1, 1, 1, 0);
            ShowFloaterTextAtDefaultPosition(LocalizationObject.TextSkinChangerChooseBrawlerPart1);
            ShowFloaterTextAtDefaultPosition(LocalizationObject.TextSkinChangerChooseBrawlerPart2, 0.0, 0xFFF5ECA9);
        }

        function OpenPlayerSearchPopup() {
            let ptr1 = malloc(300);
            PlayerSearchPopup(ptr1);
            GUI_showPopup(base.add(GUI_instanceAddr).readPointer(), ptr1, 1, 1, 0);
        }

        function OpenBrawlStats() {
            var PlayerTagLogicLong = new NativeFunction(base.add(0x788184), 'pointer', ['pointer'])(base.add(GameMain_instanceAddr).readPointer()); // v44.242 | String: ""
            var HashTagCodeGenerator_malloc = malloc(4);
            new NativeFunction(base.add(0x42CDAC), 'void', ['pointer'])(HashTagCodeGenerator_malloc);
            var PlayerTagString = ReadStringFromStringObject(HashCodeGenerator_toCode(HashTagCodeGenerator_malloc, PlayerTagLogicLong)).substring(1);
            free(HashTagCodeGenerator_malloc);
            var LinkSO = CreateNewStringObject(`https://brawlstats.com/profile/${PlayerTagString}`);
            const TitleSO = CreateNewStringObject("Brawl Stats");
            const SimpleWebView = new NativeFunction(base.add(0xADA5B4), 'void', ['pointer']); // v44.242
            const SimpleWebView_loadURL = new NativeFunction(base.add(0x59A7CC), 'void', ['pointer', 'pointer']); // v44.242

            let ptr1 = malloc(284);
            SimpleWebView(ptr1);
            GenericPopup_setTitleTid(ptr1, TitleSO);
            SimpleWebView_loadURL(ptr1, LinkSO);
            GUI_showPopup(base.add(GUI_instanceAddr).readPointer(), ptr1, 0, 1, 1);
            ClearStringObjects([TitleSO, LinkSO]);
        }

        function ProjectLaser() {
            const LinkSO = CreateNewStringObject(`https://bsd.maya.se/project-laser/`);
            const TitleSO = CreateNewStringObject("Project Laser");
            const SimpleWebView = new NativeFunction(base.add(0xADA5B4), 'void', ['pointer']); // v44.242
            const SimpleWebView_loadURL = new NativeFunction(base.add(0x59A7CC), 'void', ['pointer', 'pointer']); // v44.242
            let ptr1 = malloc(284);
            SimpleWebView(ptr1);
            GenericPopup_setTitleTid(ptr1, TitleSO);
            SimpleWebView_loadURL(ptr1, LinkSO);
            GUI_showPopup(base.add(GUI_instanceAddr).readPointer(), ptr1, 0, 1, 1);
            ClearStringObjects([LinkSO, TitleSO]);
        }

        function AskForConfigReset() {

        }
        
        var ModMenuItemsArray = [
            {name: LocalizationObject.TextReloadGame, cb: ReloadGameButton, isBlack: true},
            {name: LocalizationObject.TextSwitchTheme, cb: OpenSwitchThemePopup},
            {name: LocalizationObject.TextStatusesPopupButton, cb: OpenStatusesPopup},
            {name: LocalizationObject.TextSkinChanger, cb: SkinChangerLogic},
            {name: LocalizationObject.TextBrawlerMenuPopup, cb: OpenBrawlerMenuPopup},
            {name: LocalizationObject.TextSkinMenuPopup, cb: OpenSkinMenuPopup},
            {name: base.add(LogicVersion_isProdAddr).readU8() == 1 ? LocalizationObject.TextReconnectTo+"Stage" : LocalizationObject.TextReconnectTo+"Prod", cb: SwitchServer},
            {name: LocalizationObject.TextPlayerSearchPopup, cb: OpenPlayerSearchPopup, disabled: true},
            {name: LocalizationObject.TextBrawlStatsWebViewPopup, cb: OpenBrawlStats, disabled: !base.add(LogicVersion_isProdAddr).readU8()},
            {name: LocalizationObject.TextProjectLaser, cb: ProjectLaser},
            {name: LocalizationObject.TextLobbyCreditsMode+LocalizationObject[`TextLobbyCreditsMode_${SaveObject.LobbyInfoTextType}`], cb: ToggleLobbyInfoTextType},
            {name: LocalizationObject.TextResetConfig, cb: AskForConfigReset}
        ];

        a1.add(272).writePointer(malloc(4*ModMenuItemsArray.length));
        for (let ModMenuItemIndex = 0; ModMenuItemIndex < ModMenuItemsArray.length; ModMenuItemIndex++) {
            if (!ModMenuItemsArray[ModMenuItemIndex].disabled) {
                let ModMenuItemPtr = malloc(328);
                ModMenuItem(ModMenuItemPtr, ModMenuItemsArray[ModMenuItemIndex]);
                a1.add(272).readPointer().add(4*ModMenuItemIndex).writePointer(ModMenuItemPtr);
                CustomButton_setButtonListener(ModMenuItemPtr, a1.add(72));
                ListContainer_addEntry(a1.add(256).readPointer(), ModMenuItemPtr);
            }
        }
        
        if (!ModMenuPopup_onClick_replaced) {
            Interceptor.replace(cm.ModMenuPopup_buttonClicked, new NativeCallback(function(self, CustomButton) {
                self = self.sub(72);
                if (self.add(128).readPointer().equals(CustomButton) || self.add(132).readPointer().equals(CustomButton)) {
                    GenericPopup_buttonClicked(self, CustomButton);
                }
                else {
                    for (let i = 0; i < ModMenuItemsArray.length; i++) {
                        if (self.add(272).readPointer().add(4*i).readPointer().equals(CustomButton)) {
                            ModMenuItemsArray[i].cb();
                        }
                    }
                }
            }, 'void', ['pointer', 'pointer']));
            ModMenuPopup_onClick_replaced = true;
        }
        ListContainer_refreshEntryPositions(a1.add(256).readPointer(), 3, PopupBase_getNaviHeight(a1), 32.0, 0.0, 0, 0);
        ListContainer_refreshBounds(a1.add(256).readPointer(), PopupBase_getNaviHeight(a1));
    }
    ListPopupBase(a1, ModMenuPopup_refreshItems, {
        PopupExportName: "country_popup",
        PopupTitleString: LocalizationObject.TextModMenuPopupTitle,
        ClickListenerPtr: cm.ModMenuPopup_buttonClicked
    });
}

let TextSkinChangerChooseBrawlerShowCounter = 0;
function SkinMenuPopup(a1, brawler, isForSkinChanger=false) {
    function SkinMenuPopup_refreshItems(a1) {
        function SkinMenuItem(a1, name, isSelected=false) {
            GameButton(a1);
            WriteToMemory(a1, "Pointer", base.add(ListPopupItemVtableAdr_shared));
            const VC_CustomButton_setMovieClip = new NativeFunction(a1.readPointer().add(156).readPointer(), 'void', ['pointer', 'pointer', 'int']);
            let s1 = CreateNewStringObject("sc/ui.sc");
            let s2 = CreateNewStringObject("country_item");
            let SkinMenuItemMC = StringTable_getMovieClip(s1, s2);
            ClearStringObjects([s1, s2]);
            VC_CustomButton_setMovieClip(a1, SkinMenuItemMC, 1);
            let tf1 = MovieClip_getTextFieldByName(SkinMenuItemMC, Memory.allocUtf8String("Text"));
            WriteToMemory(tf1.add(85), "Byte", 1); // ColorTag
            MovieClipHelper_setTextAndScaleIfNecessary(tf1, StringTable_getString(Memory.allocUtf8String(name)), 1, 1);
            MovieClip_gotoAndStopFrameIndex(SkinMenuItemMC, +!isSelected);
        }
        ListContainer_clearEntries(a1.add(256).readPointer());
        const SkinsTable = LogicDataTables_getTable(29);
        const VC_LogicDataTable_getItemCount = new NativeFunction(SkinsTable.readPointer().add(16).readPointer(), 'int', ['pointer']);
        const VC_LogicDataTable_getItemAt = new NativeFunction(SkinsTable.readPointer().add(20).readPointer(), 'pointer', ['pointer', 'int']);
        const SkinsItemCount = VC_LogicDataTable_getItemCount(SkinsTable);
        WriteToMemory(a1.add(281), "Short", SkinsItemCount);
        a1.add(272).writePointer(malloc(4*SkinsItemCount));
        for (let SkinMenuItemJ = 0; SkinMenuItemJ < SkinsItemCount; SkinMenuItemJ++) {
            let skinTID = ReadStringFromStringObject(LogicData_getValueAt(VC_LogicDataTable_getItemAt(SkinsTable, SkinMenuItemJ), VC_LogicDataTable_getItemAt(SkinsTable, SkinMenuItemJ).add(20).readInt()));
            if (skinTID != '') {
                let SkinMenuItemPtr = malloc(296);
                let CurrentSkinItem = VC_LogicDataTable_getItemAt(SkinsTable, SkinMenuItemJ);
                let SkinConf = LogicDataTables_getSkinConfByName(LogicData_getValueAt(CurrentSkinItem, 1), ptr(0));
                let Brawler = LogicDataTables_getCharacterByName(LogicData_getValueAt(SkinConf, 1), ptr(0));
                if(ReadStringFromStringObject(LogicData_getName(Brawler)) == ReadStringFromStringObject(LogicData_getName(brawler))) {
                    let isSelected = false;
                    if (isForSkinChanger) {
                        for (let Skin of SaveObject.ReplacedSkins) {
                            if (Skin[1] == ReadStringFromStringObject(LogicData_getName(CurrentSkinItem))) {
                                isSelected = true;
                            }
                        }
                    }
                    SkinMenuItem(SkinMenuItemPtr, skinTID, isSelected);
                    a1.add(272).readPointer().add(4*SkinMenuItemJ).writePointer(SkinMenuItemPtr);
                    CustomButton_setButtonListener(SkinMenuItemPtr, a1.add(72));
                    ListContainer_addEntry(a1.add(256).readPointer(), SkinMenuItemPtr);
                }
            }
        }
        ListContainer_refreshEntryPositions(a1.add(256).readPointer(), 4, PopupBase_getNaviHeight(a1), 8.0, 0.0, 0, 0);
        ListContainer_refreshBounds(a1.add(256).readPointer(), PopupBase_getNaviHeight(a1));
    }
    ListPopupBase(a1, SkinMenuPopup_refreshItems, {
        PopupExportName: "country_popup",
        PopupTitleString: LocalizationObject.TextSkinsOfSelectedCharacterPopupTitle+ReadStringFromStringObject(StringTable_getString(Memory.allocUtf8String(ReadStringFromStringObject(LogicData_getValueAt(brawler, brawler.add(20).readInt()))))),
        ClickListenerPtr: cm.SkinMenuPopup_buttonClicked
    });
    a1.add(276).writeU8(0);
    a1.add(277).writePointer(brawler);
    if (isForSkinChanger) {
        ShowFloaterTextAtDefaultPosition(LocalizationObject.TextSkinChangerChooseSkin);
        a1.add(276).writeU8(1);
    }
}
Interceptor.replace(cm.SkinMenuPopup_buttonClicked, new NativeCallback(function(self, CustomButton) {
    self = self.sub(72);
    if (self.add(128).readPointer().equals(CustomButton) || self.add(132).readPointer().equals(CustomButton)) {
        GenericPopup_buttonClicked(self, CustomButton);
    }
    else {
        for (let i = 0; i < self.add(281).readShort(); i++) {
            if (self.add(272).readPointer().add(4*i).readPointer().equals(CustomButton)) {
                let SkinsTable = LogicDataTables_getTable(29);
                const VC_LogicDataTable_getItemAt = new NativeFunction(SkinsTable.readPointer().add(20).readPointer(), 'pointer', ['pointer', 'int']);
                let CurrentSkinItem = VC_LogicDataTable_getItemAt(SkinsTable, i);
                if (self.add(276).readU8()) { //isForskinc
                    let SelectedCharacter = self.add(277).readPointer();
                    let SelectedBrawlerDefaultSkinName = ReadStringFromStringObject(LogicData_getName(LogicCharacterData_getDefaultSkin(SelectedCharacter)));
                    let SkinConf = LogicDataTables_getSkinConfByName(LogicData_getValueAt(CurrentSkinItem, 1), ptr(0));

                    var isSkinMatchAlreadyExists = false;
                    for (let SkinInd = 0; SkinInd < SaveObject.ReplacedSkins.length; SkinInd++) {
                        if (SaveObject.ReplacedSkins[SkinInd][1] == ReadStringFromStringObject(LogicData_getName(CurrentSkinItem))) {
                            isSkinMatchAlreadyExists = true;
                            SaveObject.ReplacedSkins.splice(SkinInd, 1);
                            break;
                        }
                        if (SaveObject.ReplacedSkins[SkinInd][0] == SelectedBrawlerDefaultSkinName) {
                            SaveObject.ReplacedSkins.splice(SkinInd, 1);
                        }
                    }

                    if (!isSkinMatchAlreadyExists) {
                        SaveObject.ReplacedSkins.push([SelectedBrawlerDefaultSkinName, ReadStringFromStringObject(LogicData_getName(CurrentSkinItem)), i]);
                        let MainAttackProjectile = SkinConf.add(68).readPointer();
                        let SecondaryProjectile = SkinConf.add(72).readPointer();
                        let ThirdProjectile = SkinConf.add(76).readPointer();
                        let UltiProjectile = SkinConf.add(80).readPointer();

                        let SkillProjectile = 0;
                        let SkillSecondaryProjectile = 0;
                        let SkillThirdProjectile = 0;
                        let SkillUltiProjectile = 0;

                        if (SelectedCharacter.add(280).readPointer().toInt32()) {
                            if (SelectedCharacter.add(280).readPointer().add(64).readPointer().toInt32()) {
                                SkillProjectile = SelectedCharacter.add(280).readPointer().add(64).readPointer();
                            }
                            if (SelectedCharacter.add(280).readPointer().add(112).readPointer().toInt32()) {
                                SkillSecondaryProjectile = SelectedCharacter.add(280).readPointer().add(112).readPointer();
                            }
                            if (SelectedCharacter.add(280).readPointer().add(116).readPointer().toInt32()) {
                                SkillThirdProjectile = SelectedCharacter.add(280).readPointer().add(116).readPointer();
                            }
                        }
                        if (SelectedCharacter.add(284).readPointer().toInt32()) {
                            if (SelectedCharacter.add(284).readPointer().add(64).readPointer().toInt32()) {
                                SkillUltiProjectile = SelectedCharacter.add(284).readPointer().add(64).readPointer();
                            }
                            if (SelectedCharacter.add(284).readPointer().add(112).readPointer().toInt32()) {
                                SkillUltiSecondaryProjectile = SelectedCharacter.add(284).readPointer().add(112).readPointer();
                            }
                            if (SelectedCharacter.add(284).readPointer().add(116).readPointer().toInt32()) {
                                SkillUltiThirdProjectile = SelectedCharacter.add(284).readPointer().add(116).readPointer();
                            }
                        }

                        if (!MainAttackProjectile.equals(0)) {
                            SaveObject.ReplacedProjectiles.push([ReadStringFromStringObject(LogicData_getName(SkillProjectile)), ReadStringFromStringObject(LogicData_getName(MainAttackProjectile)), i]);
                        }
                        if (!SecondaryProjectile.equals(0)) {
                            SaveObject.ReplacedProjectiles.push([ReadStringFromStringObject(LogicData_getName(SkillSecondaryProjectile)), ReadStringFromStringObject(LogicData_getName(SecondaryProjectile)), i]);
                        }
                        if (!ThirdProjectile.equals(0)) {
                            SaveObject.ReplacedProjectiles.push([ReadStringFromStringObject(LogicData_getName(SkillThirdProjectile)), ReadStringFromStringObject(LogicData_getName(ThirdProjectile)), i]);
                        }
                        if (!UltiProjectile.equals(0)) {
                            SaveObject.ReplacedProjectiles.push([ReadStringFromStringObject(LogicData_getName(SkillUltiProjectile)), ReadStringFromStringObject(LogicData_getName(UltiProjectile)), i]);
                        }

                    }
                    WriteToFile(ModSaveFilePath, "w", FormatJSONString(SaveObject));

                    let ptr1 = malloc(300);
                    BrawlerMenuPopup(ptr1, true, true);
                    let ptr2 = malloc(300);
                    ModMenuPopup(ptr2);

                    GUI_closeAllPopups(base.add(GUI_instanceAddr).readPointer());

                    GUI_showPopup(base.add(GUI_instanceAddr).readPointer(), ptr2, 1, 0, 0);
                    GUI_showPopup(base.add(GUI_instanceAddr).readPointer(), ptr1, 1, 1, 0);

                    TextSkinChangerChooseBrawlerShowCounter = TextSkinChangerChooseBrawlerShowCounter + 1;

                    if (TextSkinChangerChooseBrawlerShowCounter % 4 == 0 && TextSkinChangerChooseBrawlerShowCounter <= 16) {
                        ShowFloaterTextAtDefaultPosition(LocalizationObject.TextSkinChangerChooseBrawlerPart1);
                        ShowFloaterTextAtDefaultPosition(LocalizationObject.TextSkinChangerChooseBrawlerPart2, 0.0, 0xFFF5ECA9);
                    }
                    else {
                        ShowFloaterTextAtDefaultPosition(LocalizationObject.TextSkinChangerChooseBrawler);
                    }
                }
                else {
                    let CurrentSkinConf = LogicDataTables_getSkinConfByName(LogicData_getValueAt(CurrentSkinItem, 1), ptr(0));
                    let CurrentBrawler = LogicDataTables_getCharacterByName(LogicData_getValueAt(CurrentSkinConf, 1), ptr(0));
                    HomeScreen_doOfflineGatcha(0, CurrentBrawler, CurrentSkinItem);
                }
            }
        }
    }
}, 'void', ['pointer', 'pointer']));

function BrawlerMenuPopup(a1, isForSkins=false, isForSkinChanger=false) {
    function BrawlerMenuPopup_refreshItems(a1) {
        function BrawlerMenuItem(a1, Item) {
            GameButton(a1);
            WriteToMemory(a1, "Pointer", base.add(ListPopupItemVtableAdr_shared));
            const VC_CustomButton_setMovieClip = new NativeFunction(a1.readPointer().add(156).readPointer(), 'void', ['pointer', 'pointer', 'int']);
            let s1 = CreateNewStringObject("sc/ui.sc");
            let s2 = CreateNewStringObject("country_item");
            let BrawlerMenuItemMC = StringTable_getMovieClip(s1, s2);
            ClearStringObjects([s1, s2]);
            VC_CustomButton_setMovieClip(a1, BrawlerMenuItemMC, 1);
            let tf1 = MovieClip_getTextFieldByName(BrawlerMenuItemMC, Memory.allocUtf8String("Text"));
            WriteToMemory(tf1.add(85), "Byte", 1); // ColorTag
            MovieClipHelper_setTextAndScaleIfNecessary(tf1, StringTable_getString(Memory.allocUtf8String(ReadStringFromStringObject(LogicData_getValueAt(Item, Item.add(20).readInt())))), 1, 1);
            MovieClip_gotoAndStopFrameIndex(BrawlerMenuItemMC, 1);
        }
        ListContainer_clearEntries(a1.add(256).readPointer());

        const BrawlersTable = LogicDataTables_getTable(16);
        const VC_LogicDataTable_getItemCount = new NativeFunction(BrawlersTable.readPointer().add(16).readPointer(), 'int', ['pointer']);
        const VC_LogicDataTable_getItemAt = new NativeFunction(BrawlersTable.readPointer().add(20).readPointer(), 'pointer', ['pointer', 'int']);
        const BrawlersItemCount = VC_LogicDataTable_getItemCount(BrawlersTable);
        WriteToMemory(a1.add(281), "Short", BrawlersItemCount);
        a1.add(272).writePointer(malloc(4*BrawlersItemCount));
        for (let BrawlerMenuItemJ = 0; BrawlerMenuItemJ < BrawlersItemCount; BrawlerMenuItemJ++) {
            let item_loc1 = VC_LogicDataTable_getItemAt(BrawlersTable, BrawlerMenuItemJ);
            if (ReadStringFromStringObject(LogicData_getValueAt(item_loc1, 24)) == 'Hero' && !LogicCharacterData_isDisabled(item_loc1) &&  !["MechaDudeBig", "CannonGirlSmall"].includes(ReadStringFromStringObject(LogicData_getName(item_loc1)))) {
                let BrawlerMenuItemPtr = malloc(296);
                BrawlerMenuItem(BrawlerMenuItemPtr, item_loc1);
                a1.add(272).readPointer().add(4*BrawlerMenuItemJ).writePointer(BrawlerMenuItemPtr);
                CustomButton_setButtonListener(BrawlerMenuItemPtr, a1.add(72));
                ListContainer_addEntry(a1.add(256).readPointer(), BrawlerMenuItemPtr);
            }
        }
        ListContainer_refreshEntryPositions(a1.add(256).readPointer(), 4, PopupBase_getNaviHeight(a1), 8.0, 0.0, 0, 0);
        ListContainer_refreshBounds(a1.add(256).readPointer(), PopupBase_getNaviHeight(a1));
    }
    ListPopupBase(a1, BrawlerMenuPopup_refreshItems, {
        PopupExportName: "country_popup",
        PopupTitleString: LocalizationObject.TextBrawlerMenuPopupTitle,
        ClickListenerPtr: cm.BrawlerMenuPopup_buttonClicked
    });
    a1.add(276).writeU8(+isForSkins);
    a1.add(277).writeU8(+isForSkinChanger);
}
Interceptor.replace(cm.BrawlerMenuPopup_buttonClicked, new NativeCallback(function(self, CustomButton) {
    self = self.sub(72);
    if (self.add(128).readPointer().equals(CustomButton) || self.add(132).readPointer().equals(CustomButton)) {
        GenericPopup_buttonClicked(self, CustomButton);
    }
    else {
        for (let i = 0; i < self.add(281).readShort(); i++) {
            if (self.add(272).readPointer().add(4*i).readPointer().equals(CustomButton)) {
                let BrawlersTable = LogicDataTables_getTable(16);
                const VC_LogicDataTable_getItemAt = new NativeFunction(BrawlersTable.readPointer().add(20).readPointer(), 'pointer', ['pointer', 'int']);
                if (self.add(276).readU8()) {
                    let ptr1 = malloc(300);
                    SkinMenuPopup(ptr1, VC_LogicDataTable_getItemAt(BrawlersTable, i), self.add(277).readU8() ? true : false);
                    GUI_showPopup(base.add(GUI_instanceAddr).readPointer(), ptr1, 1, 1, 0);
                }
                else {
                    HomeScreen_doOfflineGatcha(0, VC_LogicDataTable_getItemAt(BrawlersTable, i), ptr(0));
                }
            }
        }
    }
}, 'void', ['pointer', 'pointer']));

function PlayerSearchPopup(self) {
    let PopupExportName = CreateNewStringObject("gameroom_joincode_popup");
    let EmptyString = CreateNewStringObject("");
    GenericPopup(self, PopupExportName, 0, 0, EmptyString, EmptyString, EmptyString);
    ClearStringObjects([PopupExportName, EmptyString]);
    WriteToMemory(self.add(264), "Byte", 1);
    WriteToMemory(self.add(256), "Int", 0);
    WriteToMemory(self.add(260), "Int", 0);
    WriteToMemory(self.add(), );
    WriteToMemory();
}

function LocationThemesPopup(self, LocationInfo) {
    var LocationThemeData = LocationInfo_getLocationThemeData(LocationInfo);
    const LogicLocationThemeData_isEnabled = new NativeFunction(base.add(0xC2E47C), 'int', ['pointer']); // v44.242 | String: "Player Map Environment '%s' is enabled, but its location theme data %s at index %d is disabled!"
    const LogicLocationThemeData_getMapWidth = new NativeFunction(base.add(0x1A78D8), 'int', ['pointer']); // v44.242 | String: "Player Map Environment '%s' location theme data at index %d has width %d, required to be %d for game mode variation %d"
    const LogicLocationThemeData_getMapHeight = new NativeFunction(base.add(0x59E2E4), 'int', ['pointer']); // v44.242 | String: "Player Map Environment '%s' location theme data at index %d has height %d, required to be %d for game mode variation %d"
    function LocationThemesPopup_refreshItems(self) {
        function LocationThemeItem(self, Item, CurrentLocationThemeItem) {
            GameButton(self);
            WriteToMemory(self, "Pointer", base.add(ListPopupItemVtableAdr_shared));
            const VC_CustomButton_setMovieClip = new NativeFunction(self.readPointer().add(156).readPointer(), 'void', ['pointer', 'pointer', 'int']);
            let s1 = CreateNewStringObject("sc/ui.sc");
            let s2 = CreateNewStringObject("country_item");
            let LocationThemeItemMC = StringTable_getMovieClip(s1, s2);
            ClearStringObjects([s1, s2]);
            VC_CustomButton_setMovieClip(self, LocationThemeItemMC, 1);
            let tf1 = MovieClip_getTextFieldByName(LocationThemeItemMC, Memory.allocUtf8String("Text"));
            WriteToMemory(tf1.add(85), "Byte", 1); // ColorTag
            MovieClipHelper_setTextAndScaleIfNecessary(tf1, CreateNewStringObject(LocalizationObject.TextLocationThemeNames[(ReadStringFromStringObject(LogicData_getName(Item)))] ?? ReadStringFromStringObject(LogicData_getName(Item))), 0, 0);
            MovieClip_gotoAndStopFrameIndex(LocationThemeItemMC, +!CurrentLocationThemeItem.equals(Item));
        }
        ListContainer_clearEntries(self.add(256).readPointer());
        const LocationThemesTable = LogicDataTables_getTable(47);
        const VC_LogicDataTable_getItemCount = new NativeFunction(LocationThemesTable.readPointer().add(16).readPointer(), 'int', ['pointer']);
        const VC_LogicDataTable_getItemAt = new NativeFunction(LocationThemesTable.readPointer().add(20).readPointer(), 'pointer', ['pointer', 'int']);
        let LocationThemesItemCount = VC_LogicDataTable_getItemCount(LocationThemesTable);
        WriteToMemory(self.add(280), 'Short', LocationThemesItemCount);
        self.add(272).writePointer(malloc(4*LocationThemesItemCount));
        for (let LocationThemeItemJ = 0; LocationThemeItemJ < LocationThemesItemCount; LocationThemeItemJ++) {
            let ProcessedLocationThemeItem = VC_LogicDataTable_getItemAt(LocationThemesTable, LocationThemeItemJ);
            if (LogicLocationThemeData_isEnabled(ProcessedLocationThemeItem)) {
                if (LogicLocationThemeData_getMapWidth(ProcessedLocationThemeItem) == LogicLocationThemeData_getMapWidth(LocationThemeData) && LogicLocationThemeData_getMapHeight(ProcessedLocationThemeItem) == LogicLocationThemeData_getMapHeight(LocationThemeData)) {
                    let LocationThemeItemPtr = malloc(296);
                    LocationThemeItem(LocationThemeItemPtr, ProcessedLocationThemeItem, LocationThemeData);
                    self.add(272).readPointer().add(4*LocationThemeItemJ).writePointer(LocationThemeItemPtr);
                    CustomButton_setButtonListener(LocationThemeItemPtr, self.add(72));
                    ListContainer_addEntry(self.add(256).readPointer(), LocationThemeItemPtr);
                }
            }
        }
        ListContainer_refreshEntryPositions(self.add(256).readPointer(), 4, PopupBase_getNaviHeight(self), 8.0, 0.0, 0, 0);
        ListContainer_refreshBounds(self.add(256).readPointer(), PopupBase_getNaviHeight(self));
    }
    ListPopupBase(self, LocationThemesPopup_refreshItems, {
        PopupExportName: "country_popup",
        PopupTitleString: LocalizationObject.TextLocationThemesPopupTitle,
        ClickListenerPtr: cm.LocationThemesPopup_buttonClicked
    });
    self.add(276).writePointer(LocationInfo.readPointer());
}
Interceptor.replace(cm.LocationThemesPopup_buttonClicked, new NativeCallback(function(self, CustomButton) {
    function ReplaceLocationTheme(LocationName, LocationThemeName) {
        var IsLocationThemeMatchAlreadyExists = false;
        for (let LocationIndex = 0; LocationIndex < SaveObject.ReplacedLocationThemes.length; LocationIndex++) {
            if (SaveObject.ReplacedLocationThemes[LocationIndex][0] == LocationName) {
                SaveObject.ReplacedLocationThemes[LocationIndex][1] = LocationThemeName;
                IsLocationThemeMatchAlreadyExists = true;
            }
        }
        if (!IsLocationThemeMatchAlreadyExists) {
            SaveObject.ReplacedLocationThemes.push([LocationName, LocationThemeName]);
        }
        WriteToFile(ModSaveFilePath, "w", FormatJSONString(SaveObject));
        ReloadGame();
    }

    self = self.sub(72);
    if (self.add(128).readPointer().equals(CustomButton) || self.add(132).readPointer().equals(CustomButton)) {
        GenericPopup_buttonClicked(self, CustomButton);
    }
    else {
        const LocationThemesTable = LogicDataTables_getTable(47);
        const VC_LogicDataTable_getItemAt = new NativeFunction(LocationThemesTable.readPointer().add(20).readPointer(), 'pointer', ['pointer', 'int']);
        for (let i = 0; i < self.add(280).readShort(); i++) {
            if (self.add(272).readPointer().add(4*i).readPointer().equals(CustomButton)) {
                ReplaceLocationTheme(ReadStringFromStringObject(LogicData_getName(self.add(276).readPointer())), ReadStringFromStringObject(LogicData_getName(VC_LogicDataTable_getItemAt(LocationThemesTable, i))));
            }
        }
    }
}, 'void', ['pointer', 'pointer']));

function ServerMenuPopup(self) {
    function LocationThemesPopup_refreshItems(self) {
        function LocationThemeItem(self) {
            GameButton(self);
            WriteToMemory(self, "Pointer", base.add(ListPopupItemVtableAdr_shared));
            const VC_CustomButton_setMovieClip = new NativeFunction(self.readPointer().add(156).readPointer(), 'void', ['pointer', 'pointer', 'int']);
            let s1 = CreateNewStringObject("sc/ui.sc");
            let s2 = CreateNewStringObject("country_item");
            let LocationThemeItemMC = StringTable_getMovieClip(s1, s2);
            ClearStringObjects([s1, s2]);
            VC_CustomButton_setMovieClip(self, LocationThemeItemMC, 1);
            let tf1 = MovieClip_getTextFieldByName(LocationThemeItemMC, Memory.allocUtf8String("Text"));
            WriteToMemory(tf1.add(85), "Byte", 1); // ColorTag
            MovieClipHelper_setTextAndScaleIfNecessary(tf1, CreateNewStringObject(LocalizationObject.TextLocationThemeNames[(ReadStringFromStringObject(LogicData_getName(Item)))] ?? ReadStringFromStringObject(LogicData_getName(Item))), 0, 0);
            MovieClip_gotoAndStopFrameIndex(LocationThemeItemMC, 1);
        }
        ListContainer_clearEntries(self.add(256).readPointer());
        
        let ServerArray = ['Main (Prod)', 'Stage', 'Null’s'];

        let LocationThemesItemCount = ServerArray.length;
        WriteToMemory(self.add(280), 'Short', LocationThemesItemCount);
        self.add(272).writePointer(malloc(4*LocationThemesItemCount));
        for (let LocationThemeItemJ = 0; LocationThemeItemJ < LocationThemesItemCount; LocationThemeItemJ++) {
            let LocationThemeItemPtr = malloc(296);
            LocationThemeItem(LocationThemeItemPtr, ProcessedLocationThemeItem, LocationThemeData);
            self.add(272).readPointer().add(4*LocationThemeItemJ).writePointer(LocationThemeItemPtr);
            CustomButton_setButtonListener(LocationThemeItemPtr, self.add(72));
            ListContainer_addEntry(self.add(256).readPointer(), LocationThemeItemPtr);
        }
        ListContainer_refreshEntryPositions(self.add(256).readPointer(), 1, PopupBase_getNaviHeight(self), 8.0, 0.0, 0, 0);
        ListContainer_refreshBounds(self.add(256).readPointer(), PopupBase_getNaviHeight(self));
    }
    ListPopupBase(self, LocationThemesPopup_refreshItems, {
        PopupExportName: "country_popup",
        PopupTitleString: LocalizationObject.TextLocationThemesPopupTitle,
        ClickListenerPtr: cm.LocationThemesPopup_buttonClicked
    });
}

const BattleScreen_enter = new NativeFunction(base.add(0x889BBC), 'void', ['pointer']); // v44.242 | String: "land_zone"
Interceptor.replace(BattleScreen_enter, new NativeCallback(function(self) {
    BattleScreen_enter(self);
    if (SaveObject.RandomThemesParental[2]) {
        if (!SaveObject.RandomThemesParental[1]) {
            const ThemesTable = LogicDataTables_getTable(41);
            const ThemeItemCount = new NativeFunction(ThemesTable.readPointer().add(16).readPointer(), 'int', ['pointer'])(ThemesTable);
            const VC_LogicDataTable_getItemAt = new NativeFunction(ThemesTable.readPointer().add(20).readPointer(), 'pointer', ['pointer', 'int']);
            var ThemeExceptionArray = [];

            for (let i = 0; i < ThemeItemCount; i++) {
                if (LogicThemeData_isDisabled(VC_LogicDataTable_getItemAt(ThemesTable, i))) {
                    ThemeExceptionArray.push(i);
                }
            }

            let SharedRandomThemeResult = GetRandomInRangeExcept(0, ThemeItemCount, ThemeExceptionArray);
            SaveObject.ThemeID = SharedRandomThemeResult;
            SaveObject.ThemeMusicID = SharedRandomThemeResult;
            WriteToFile(ModSaveFilePath, "w", FormatJSONString(SaveObject));
        }

        else {
            const ThemesTable = LogicDataTables_getTable(41);
            const ThemeItemCount = new NativeFunction(ThemesTable.readPointer().add(16).readPointer(), 'int', ['pointer'])(ThemesTable);
            const VC_LogicDataTable_getItemAt = new NativeFunction(ThemesTable.readPointer().add(20).readPointer(), 'pointer', ['pointer', 'int']);
            var ThemeExceptionArray = [];

            for (let i = 0; i < ThemeItemCount; i++) {
                if (LogicThemeData_isDisabled(VC_LogicDataTable_getItemAt(ThemesTable, i))) {
                    ThemeExceptionArray.push(i);
                }
            }
    
            SaveObject.ThemeID = GetRandomInRangeExcept(0, ThemeItemCount, ThemeExceptionArray);
            SaveObject.ThemeMusicID = GetRandomInRangeExcept(0, ThemeItemCount, ThemeExceptionArray);
            WriteToFile(ModSaveFilePath, "w", FormatJSONString(SaveObject));
        }
    }
}, 'void', ['pointer']));

var BattleCameraMode = 0;
var WasBattleCameraModeChanged = false;
/*
Interceptor.replace(base.add(0x889BBC), new NativeCallback(function(self) {
    try {
    var ScreenWidth = parseFloat(new NativeFunction(base.add(0xCE1FAC), 'uint', [])());
    WriteToMemory(self.add(528), "Float", ScreenWidth);
    var ScreenHeight = parseFloat(new NativeFunction(base.add(0x9BB5FC), 'uint', [])());
    WriteToMemory(self.add(532), "Float", ScreenHeight);
    var HeightDBWidth = ScreenHeight / ScreenWidth;
    if (HeightDBWidth * 1.7778 <= 1.0) {
        var fv1 = ScreenHeight * 0.0017361;
        var fv2 = 15.0;
    }
    else {
        var fv1 = ScreenWidth * 0.00097656;
        var fv2 = new NativeFunction(Module.getExportByName('libm.so', 'atanf'), 'float', ['float'])(HeightDBWidth);
    }
    WriteToMemory(self.add(532), "Float", fv1);
    var ptr1 = self.add(588).readPointer();
    var fv3 = ptr1.add(32).readFloat() * 8.3333;
    var fv4 = ptr1.add(28).readFloat() * 6.25;
    if (false) {} // mirror impl
    else {
        var fv5 = -fv4;
        var fv6 = fv3 - 280.0;
    }
    switch (BattleCameraMode) {
        case 0:
        default:
            var RenderShakeX = new NativeFunction(base.add(0xB7BF44), 'int', ['pointer'])(ptr1) * 1.0;
            var fv7 = fv6 + new NativeFunction(base.add(0x7EE4E0), 'int', ['pointer'])(ptr1) * 6.25;
            var fv8 = 0.587785;
            var fv9 = self.add(552).readFloat() * -13125.0 + 28050.0;
            var fv10 = fv5 + RenderShakeX * 6.25;
            WriteToMemory(self.add(520), "Int", 0);
            WriteToMemory(self.add(516), "Float", fv7);
            WriteToMemory(self.add(500), "Float", fv10);
            WriteToMemory(self.add(512), "Float", fv10);
            WriteToMemory(self.add(508), "Float", fv9 * 0.80902);
            WriteToMemory(self.add(504), "Float", fv7 + fv9 * fv8);
            break;
        case 1:
            break;
        case 2:
            break;
    }
    var alc1 = malloc(64);
    new NativeFunction(base.add(0x9C590C), 'void', ['pointer', 'float', 'float', 'float', 'float'])(alc1, fv2, 1.0 / HeightDBWidth, 1000.0, 30000.0);
    WriteToMemory(self.add(276), "Long", alc1.add(4*8).readLong());
    WriteToMemory(self.add(284), "Long", alc1.add(5*8).readLong());
    WriteToMemory(self.add(260), "Long", alc1.add(2*8).readLong());
    WriteToMemory(self.add(268), "Long", alc1.add(3*8).readLong());
    WriteToMemory(self.add(244), "Long", alc1.add(0*8).readLong());
    WriteToMemory(self.add(252), "Long", alc1.add(1*8).readLong());
    WriteToMemory(self.add(292), "Long", alc1.add(6*8).readLong());
    WriteToMemory(self.add(300), "Long", alc1.add(7*8).readLong());
    var alc2 = malloc(64);
    var flt_struct1 = malloc(12);
    WriteToMemory(flt_struct1, "Float", 0.0);
    WriteToMemory(flt_struct1.add(4), "Float", 0.0);
    WriteToMemory(flt_struct1.add(8), "Float", 1.0);
    new NativeFunction(base.add(0x28C570), 'void', ['pointer', 'pointer', 'pointer', 'pointer'])(alc2, self.add(500), self.add(512), flt_struct1);
    WriteToMemory(self.add(340), "Long", alc2.add(4*8).readLong());
    WriteToMemory(self.add(348), "Long", alc2.add(5*8).readLong());
    WriteToMemory(self.add(324), "Long", alc2.add(2*8).readLong());
    WriteToMemory(self.add(332), "Long", alc2.add(3*8).readLong());
    WriteToMemory(self.add(308), "Long", alc2.add(0*8).readLong());
    WriteToMemory(self.add(316), "Long", alc2.add(1*8).readLong());
    WriteToMemory(self.add(356), "Long", alc2.add(6*8).readLong());
    WriteToMemory(self.add(364), "Long", alc2.add(7*8).readLong());
    if (BattleCameraMode == 0) {

    }
    new NativeFunction(base.add(0x20F000), 'void', ['pointer', 'pointer', 'pointer'])(self.add(244), self.add(308), self.add(372));
    WriteToMemory(self.add(484), "Long", self.add(420).readLong());
    WriteToMemory(self.add(492), "Long", self.add(428).readLong());
    WriteToMemory(self.add(468), "Long", self.add(404).readLong());
    WriteToMemory(self.add(476), "Long", self.add(412).readLong());
    WriteToMemory(self.add(452), "Long", self.add(388).readLong());
    WriteToMemory(self.add(460), "Long", self.add(396).readLong());
    WriteToMemory(self.add(436), "Long", self.add(372).readLong());
    WriteToMemory(self.add(444), "Long", self.add(380).readLong());
    new NativeFunction(base.add(0x32F56C), 'void', ['pointer'])(self.add(436));
    WasBattleCameraModeChanged = false;
}
catch (e) {
    WriteToFile("/data/data/bsd.suitcase.release/save/lloogg.txt", "a", JSON.stringify(e)+'\n');
}
}, 'void', ['pointer']));*/

/*
v2 = sub_CE1FAC();
*(float *)(a1 + 528) = (float)v2;
v3 = sub_9BB5FC(v2);
v4 = *(float *)(a1 + 528);
v5 = (float)v3 / v4;
*(float *)(a1 + 532) = (float)v3;
if ( (float)(v5 * 1.7778) <= 1.0 )
{
  v7 = 15.0;
  v6 = (float)v3 * 0.0017361;
}
else
{
  v6 = v4 * 0.00097656;
  v7 = atanf(v5 * 0.23405) * 114.59;
}
v8 = *(_DWORD *)(a1 + 588);
*(float *)(a1 + 524) = v6;
v9 = *(float *)(v8 + 32) * 8.3333;
v10 = *(float *)(v8 + 28) * 6.25;
if ( byte_15D4FB4 )
{
  v11 = sub_1D5078(a1);
  v12 = *(_DWORD *)(sub_ADAA84(v11) + 128);
  v13 = sub_1D5078(a1);
  v14 = v10 + (float)v12;
  v15 = (float)-*(_DWORD *)(sub_ADAA84(v13) + 132);
  v8 = *(_DWORD *)(a1 + 588);
  v16 = (float)(280.0 - v9) + v15;
}
else
{
  v14 = -v10;
  v16 = v9 + -280.0;
}
v17 = COERCE_FLOAT(sub_B7BF44(v8));
v18 = v16 + (float)(sub_7EE4E0(*(_DWORD *)(a1 + 588)) * 6.25);
v19 = &dword_889FB0;
v20 = (float)(*(float *)(a1 + 552) * -13125.0) + 28050.0;
if ( !byte_15D4FB4 )
  v19 = &dword_889FB4;
v21 = v14 + (float)(v17 * 6.25);
v22 = *(float *)v19;
*(_DWORD *)(a1 + 520) = 0;
*(float *)(a1 + 516) = v18;
*(float *)(a1 + 500) = v21;
*(float *)(a1 + 512) = v21;
*(float *)(a1 + 508) = v20 * 0.80902;
*(float *)(a1 + 504) = v18 + (float)(v20 * v22);
sub_9C590C(v58, LODWORD(v7), 1.0 / v5, 0x447A0000, 0x46EA6000);
v23 = v58[0];
v24 = v58[1];
v25 = v58[5];
v26 = v58[6];
v27 = v58[7];
v28 = v58[2];
v29 = v58[3];
*(_QWORD *)(a1 + 0x114) = v58[4];
*(_QWORD *)(a1 + 0x11C) = v25;
*(_QWORD *)(a1 + 0x104) = v28;
*(_QWORD *)(a1 + 0x10C) = v29;
*(_QWORD *)(a1 + 0xF4) = v23;
*(_QWORD *)(a1 + 0xFC) = v24;
*(_QWORD *)(a1 + 0x124) = v26;
*(_QWORD *)(a1 + 0x12C) = v27;
v56[2] = 0x3F800000;
v56[1] = 0;
v56[0] = 0;
sub_28C570(v57, a1 + 0x1F4, a1 + 0x200, v56);
v30 = v57[0];
v31 = v57[1];
v32 = v57[5];
v33 = v57[6];
v34 = v57[7];
*(_QWORD *)(a1 + 0x154) = v57[4];
*(_QWORD *)(a1 + 0x15C) = v32;
v35 = v57[3];
*(_QWORD *)(a1 + 0x144) = v57[2];
*(_QWORD *)(a1 + 0x14C) = v35;
*(_QWORD *)(a1 + 0x134) = v30;
*(_QWORD *)(a1 + 0x13C) = v31;
*(_QWORD *)(a1 + 0x164) = v33;
*(_QWORD *)(a1 + 0x16C) = v34;
v36 = *(_DWORD *)(sub_A2A824(a1 + 0x164) + 0x14);
v37 = *(_DWORD *)(v36 + 0x84);
v38 = sub_A2A824(v36);
v39 = *(_DWORD *)(a1 + 0x6F0);
v40 = *(_DWORD *)(*(_DWORD *)(*(_DWORD *)(v38 + 0x14) + 0x1C) + 0x94);
if ( v40 == v39 )
{
  v41 = *(_DWORD *)(a1 + 0x6F8);
  if ( v41 < 1 )
    goto LABEL_19;
}
else
{
  *(_DWORD *)(a1 + 0x6F0) = v40;
  *(_DWORD *)(a1 + 0x6F4) = v39;
  *(_DWORD *)(a1 + 0x6F8) = v37;
  v41 = v37;
  if ( v37 < 1 )
    goto LABEL_19;
}
v42 = (float)v41;
v43 = (float)v37;
v44 = (float)*(int *)(a1 + 0x6F4);
if ( (float)v37 > (float)v41 )
{
  if ( (float)(v42 + 50.0) <= v43 )
    v44 = (float)v40;
  else
    v44 = v44 + (float)((float)((float)(v43 - v42) * 0.02) * (float)((float)v40 - v44));
}
if ( fabsf(v44) > 0.1 )
{
  v55[1] = 0x3F800000;
  v55[2] = 0;
  v55[0] = 0;
  sub_2C3008(v54, v55, LODWORD(v44));
  v45 = nullsub_6(v54);
  sub_26F884(a1 + 0x134, v45);
}
LABEL_19:
sub_20F000(a1 + 0xF4, a1 + 0x134, a1 + 0x174);
v46 = *(_QWORD *)(a1 + 0x174);
v47 = *(_QWORD *)(a1 + 0x17C);
v48 = *(_QWORD *)(a1 + 0x194);
v49 = *(_QWORD *)(a1 + 0x19C);
v50 = *(_QWORD *)(a1 + 0x184);
v51 = *(_QWORD *)(a1 + 0x18C);
v52 = *(_QWORD *)(a1 + 0x1AC);
*(_QWORD *)(a1 + 0x1E4) = *(_QWORD *)(a1 + 0x1A4);
*(_QWORD *)(a1 + 0x1EC) = v52;
*(_QWORD *)(a1 + 0x1D4) = v48;
*(_QWORD *)(a1 + 0x1DC) = v49;
*(_QWORD *)(a1 + 0x1C4) = v50;
*(_QWORD *)(a1 + 0x1CC) = v51;
*(_QWORD *)(a1 + 0x1B4) = v46;
*(_QWORD *)(a1 + 0x1BC) = v47;
return sub_32F56C();
}
*/

/*
TODO:
- Location environment switcher (done)
- Background and music separately select in theme switcher (done)
- Better FPS and ping counter (wip)
- Skin popup skin sort by brawler (done)
- Potato mode (graphics optimization) (later)
- Camera modes return (wip)
- Bot names switch e.g. Bot 1 --> SHELLY (not necessary)
- Map cloning (later)
- Autoattack/autosuper attack switch (done)
- MovementBasedAutoshoot for Mortis attack (done)
- Skin changer reload prompt (done)
- Null's brawl connecting (next update)
- Battle text chat (hmm)
- Shop section switcher (most likely never)
- Mod loader (button, splitted from mod config) (next update)
- Brawl Stats/Brawlify Integration (done)
- Latency button or best ping displaying (wip)
- View player profile by tag (not necessary)
*/