
console.log = () => {}

try{

    function exit() {
        Java.scheduleOnMainThread(() => {
            Java.use("java.lang.System").exit(0);
        });
    };
    const malloc1 = new NativeFunction(Module.getExportByName('libc.so', 'malloc'), 'pointer', ['uint']); 
    const access = new NativeFunction(Module.getExportByName('libc.so', 'access'), 'int', ['pointer', 'int']);
    const free = new NativeFunction(Module.getExportByName('libc.so', 'free'), 'void', ['pointer']);
    const libc_mkdir = new NativeFunction(Module.getExportByName('libc.so', 'mkdir'), 'int', ['pointer', 'uint']);
    const fread = new NativeFunction(Module.getExportByName('libc.so', 'fread'), 'int', ['pointer', 'int', 'int', 'pointer']);
    const fopen = new NativeFunction(Module.getExportByName('libc.so', 'fopen'), 'pointer', ['pointer', 'pointer']);
    const fclose = new NativeFunction(Module.getExportByName('libc.so', 'fclose'), 'int', ['pointer']);
    const ftell = new NativeFunction(Module.getExportByName('libc.so', 'ftell'), 'int', ['pointer']);
    const fseek = new NativeFunction(Module.getExportByName('libc.so', 'fseek'), 'int', ['pointer', 'int', 'int']);
    const rewind = new NativeFunction(Module.getExportByName('libc.so', 'rewind'), 'void', ['pointer']);
    const chmod = new NativeFunction(Module.getExportByName('libc.so', 'chmod'), 'int', ['pointer', 'int']);

    var ModConfig = {
        OutlineMod: false,
        SkinChanger: false,
        RangeMod: false,
        ShowBrawlers: false,
        AntiOutOfSync: false,
        UnlimitedSpectator: false,
        BrawlTVSpectate: false,
        ChromaticName: false,
        FpsIndicator: false,
        SideMask: false
    }

    var dataDirectory = null;
    Java.perform(function () {
        var activityManager = Java.use('android.app.ActivityManager');
        var context = Java.use('android.app.ActivityThread').currentApplication().getApplicationContext();
        var fileDir = context.getFilesDir().getAbsolutePath();

        console.log('Data Directory: ' + fileDir);
        dataDirectory = fileDir;
    });

    function ReadFile(filepath, mode) {
        var file = fopen(Memory.allocUtf8String(filepath), Memory.allocUtf8String(mode));
        fseek(file, 0, 2);
        var Fsize = ftell(file);
        rewind(file);
        var buffer = malloc1(Fsize);
        fread(buffer, 1, Fsize, file);
        var byteArray = Memory.readByteArray(buffer, Fsize);
        var uint8Array = new Uint8Array(byteArray);
        fclose(file);
        free(buffer);
        var resultString = '';
        for (var i = 0; i < uint8Array.length; i++) {
            resultString += String.fromCharCode(uint8Array[i]);
        }
        return resultString;
    }

    function FormatJSONString(obj) {
        return JSON.stringify(obj, null, 4);
    }

    function WriteToFile(filepath, mode, content) {
        let FileToWrite = new File(filepath, mode);
        FileToWrite.write(content);
        FileToWrite.close();
    }


    var savefile = dataDirectory + "/ModConfig.json";
    if (access(Memory.allocUtf8String(savefile), 0) != 0) {
        WriteToFile(savefile, "w", FormatJSONString(ModConfig));
    }

    ModConfig = JSON.parse(ReadFile(savefile, "r"));

    function assetsChanger(filename, originalfilename)
        {
            Java.perform(function() {
                var context = Java.use("android.app.ActivityThread").currentApplication().getApplicationContext();
                var assetManager = context.getAssets();
                var ByteArrayOutputStream = Java.use('java.io.ByteArrayOutputStream');
                var File = Java.use('java.io.File');
                var FileOutputStream = Java.use('java.io.FileOutputStream');
        
                var inputStream = null;
                var outputStream = null;
                var byteArrayOutputStream = null;
        
                try {
                    inputStream = assetManager.open(filename);
                    byteArrayOutputStream = ByteArrayOutputStream.$new();
        
                    var buffer = Java.array('byte', [0]);
                    var bytesRead;
                    while ((bytesRead = inputStream.read(buffer)) !== -1) {
                        byteArrayOutputStream.write(buffer, 0, bytesRead);
                    }
        
                    var content = byteArrayOutputStream.toByteArray();
        
                    var appDataDir = context.getFilesDir().getAbsolutePath();
                    var updateDir = File.$new(appDataDir.slice(0, -("files/".length)) + "/update");
                    if (!updateDir.exists()) {
                        updateDir.mkdirs();
                    }
        
                    var outputFile = File.$new(updateDir.getAbsolutePath() + "/" + originalfilename);
                    outputStream = FileOutputStream.$new(outputFile);
                    outputStream.write(content);
        
                    console.log(filename + " content has been written to: " + outputFile.getAbsolutePath());
                } catch (e) {
                    console.error("Error reading asset: " + e.stack);
                } finally {
                    try {
                        if (inputStream !== null) inputStream.close();
                        if (outputStream !== null) outputStream.close();
                        if (byteArrayOutputStream !== null) byteArrayOutputStream.close();
                    } catch (e) {
                        console.error("Error closing streams: " + e.stack);
                    }
                }
            });
        }
    assetsChanger(ModConfig.SkinChanger ? "TSMods/skins.csv" : "csv_logic/skins.csv", "csv_logic/skins.csv")
    assetsChanger(ModConfig.RangeMod ? "TSMods/effects.csv" : "csv_logic/effects.csv", "csv_logic/effects.csv")
    //assetsChanger("değişecek dosya", "orjinal dosya")


    var HomeScreen_enter = 0x478DAC;
    var LoadingScreen_enter = 0x5787FC;
    var String_Ctor = 0x72D3EC; 
    var GUI_showFloaterTextAtDefaultPos = 0x294690;
    var GUI_sm_pInstance = 0xCC5200;
    var StartSpectateMessage = 0x6BF194;
    var MessageManager_sendMessage = 0x42A254;
    var MessageManager_sm_pInstance = 0xCC55A8;
    var LogicVersion_isProd = 0x598F8C; 
    var LogicVersion_isDeveloper = 0x598FBC;
    var HomePageIsProd1 = 0x547344;
    var HomePageIsProd2 = 0x547408;
    var SettingsSceenIsDeveloper = 0x567824;
    var lobbyInfoProd = 0x547938;   
    var StringTable_getString = 0x585988;
    var PopupBase_popupBase = 0x3A2340; 
    var MessageManager_receiveMessage = 0x42A410; 
    var TeamChat = 0x68F5E8; 
    var TeamMemberItem_isOwnSide = 0x3FEB20; // "hidden_hero" (v16 = a7 == 0) a7
    var SettingsScreen_settingsScreen = 0x5665C8; 
    var SettingsScreen_buttonClicked = 0x5685C8; 
    var PrivacySettingsPopup_buttonClicked = 0x566234; 
    var PlayerInfo_refreshPlayerHeaderCtor = 0x2CFF3C; 
    var HashCodeGenerator_toCodeCtor = 0x70A094; 
    var DropGUIContainer_addGameButtonCtor = 0x29A048; 
    var CustomButton_setButtonListenerCtor =  0x7A3B98; 
    var NativeFont_formatString = 0x73E070  
    var Application_openURL = 0x9D1898;
    
    var library = Process.findModuleByName("libg.so");
    var base = library.base;
    var size = library.size;
    Memory.protect(base,size,"rwx")
    const Libg = {
        offset(addr) {
            return base.add(addr)
        }
    }

    var LogicSkinData_createReferences = new NativeFunction(base.add(0x6279D8), 'void', ['pointer']);
    Interceptor.replace(LogicSkinData_createReferences, new NativeCallback(function (a1) {

        LogicSkinData_createReferences(a1);
        ModConfig.OutlineMod && a1.add(96).writeByteArray('shader/impostor'.scptr().readByteArray(16));

    }, 'void', ['pointer']));

    var SpectateOnClickCheck = false
    const globalbuttons = {}
    const caches = {}
    const StringTable_getCurrentLanguageCode = new NativeFunction(base.add(0x585CE0), 'pointer', []);
    const String_equals = new NativeFunction(base.add(0x72DCAC), 'pointer', ['pointer','pointer']);
    var Language = null;
    var tr = {
        AboutText: `
        ╔═══════════════════════════════════╗
    ▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂
            <cff001b>T<cff0036>ü<cff0052>r<cff006d>k<cff0089> <cff00a4>S<cff00c0>t<cff00db>a<cff00f7>r<cfc1bde>s<cfa37c5> <cf853ac>v<cf66f93>5<cf48b7b>6<cf2a762>.<cf0c349>2<ceedf30>7<cecfb17>4</c>
            
            <cff1f1f>d<cff3f3f>i<cff5f5f>s<cff7f7f>c<cff9f9f>o<cffbfbf>r<cffdfdf>d<cffffff>.<cffdfdf>g<cffbfbf>g<cff9f9f>/<cff7f7f>t<cff5f5f>s<cff3f3f>m<cff1f1f>o<cff0000>d</c>
            <cff3231>t<cff6563>.<cff9895>m<cffcbc7>e<cfffffa>/<cffccc8>b<cff9996>s<cff6664>m<cff3332>t<cff0101>r</c>
            ▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂

            <cf0fc00>M<cf2fa00>O<cf5f700>D<cf7f500> <cfaf200>S<cfcf000>A<cffee00>H<cffee00>İ<cfeee00>P<cfdef00>L<cfcef00>E<cfcf000>R<cfbf000>İ</c>

            <cff0023>D<cff002e>E<cff0039>B<cff0044>U<cff004f>G<cff005a> <cff0065>M<cff0070>E<cff007b>N<cff0086>U<cff0091>:<cff009c> <cff00a7>D<cff00b2>E<cff00bd>M<cff00c8>İ<cff00d3>R<cff00de>C<cff00e9>N<cff00ea>Q<cff0cdd> <cff19d1>A<cff26c5>N<cff33b8>D<cff40ac> <cff4da0>M<cff5a93>Y<cff6787>S<cff747b>T<cff816e>I<cff8e62>N<cff9b56>D<cffa849>E<cffb53d>V<cffc231>F<cffcf24>O<cffdc18>X</c>
            <cf54f54>Y<cfa9fa8>U<cffeffc>S<cfda0a8>U<cfb5054>F<cfa0202>F</c>
    
            <cf0fc00>G<cf2fa00>E<cf5f700>L<cf7f500>İ<cfaf200>Ş<cfcf000>T<cffee00>İ<cfeee00>R<cfdef00>İ<cfcef00>C<cfcf000>İ<cfbf000>L<cfaf100>E<cfaf200>R</c>

            <cff0b39>E<cff1773>x<cff22ad>s<cff2ee7>a<cea26ed>x<cd51ef3>s<cc016f9>h<cab0fff>i</c>
            <cff1773>G<cff2ee7>u<cff2ee7>d</c>
            <cff1773>E<cff2ee7>f<cd51ef3>e<cab0fff>e</c>
            <cff0f4c>H<cff1e99>a<cff2de6>z<ce323ef>a<cc719f7>r<cab0fff>d</c>
            <cff0f4c>S<cff1e99>q<cff2de6>u<ce323ef>e<cc719f7>a<cab0fff>k</c>
            <cff0b39>M<cff1773>r<cff22ad>S<cff2ee7>h<cea26ed>a<cd51ef3>d<cc016f9>o<cab0fff>w</c>
            <cff092e>Y<cff125c>o<cff1b8a>k<cff24b8>E<cff2ee7>d<cee27eb>i<cdd21f0>c<ccc1bf5>i<cbb15fa>0<cab0fff>1</c>
            <cff1773>T<cff2ee7>r<cff2ee7>k</c>
    ▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂
    ╚════════════════════════════════════╝
    `,
    ActivateSpectate: "Sınırsız izleyici aktif edildi",
    DeactivateSpectate: "Sınırsız izletici deaktif edildi",
    WelcomeText: "Türk Starsa hoş geldiniz",
    //DiscordButton: "Buton Aktif Edildi",
    //DiscordButton2: "Buton Kapatıldı",
    SetAge: "Yaş Yükseltildi!",
    GameUpdate: "Oyunun yeni sürümü çıktı aşağıdan indir",
    UnlimitedSpectateButton: "Sınırsız İzleyici (Görünüm)",
    SetAgeButton: "Yaş Yükseltme",
    FPSindicator: "FPS Göster/Gizle",
    FPS_ON: "FPS Göstergesi Aktif",
    FPS_OFF: "FPS Göstergesi Kapandı",
    SpectateButton: "ID ile İzle",
    EnterTag: "ID GİRİN...",
    SpectateMenu: "İZLEME MENÜSÜ",
    DusmanGormeON: "Seçilen Karakterler Gösteriliyor..\nOyun Yeniden Başlatılıyor..",
    DusmanGormeOFF: "Seçilen Karakterleri Görme Kapatılıyor..\nOyun Yeniden Başlatılıyor..",
    DusmanGorme: "Dostlukda Seçilen Karakteri Görme",
    ReloadGame: "Oyunu Yeniden Başlat",
    RemoveOutline: "Outline(Dış Çizgi) kaldır",
    OutlineFloater: "Outline Kaldırılıyor..\nOyun Yeniden başlatılıyor..",
    OutlineFloater2: "Outline Geri Ekleniyor..\nOyun Yeniden başlatılıyor..",
    PlayerTagCopied: "Oyuncu Tagı Kopyalandı\n",
    SideMaskActive: "Yanlar Dolduruldu!\nBu butona maça girmeden önce bas!",
    SideMaskDeactive: "Dolgu Kaldırıldı!\nBu butona maça girmeden önce bas!",
    SideMask: "Maç içi yandaki siyahlıkları kaldır",
    BrawlTVButton: "BrawlTV olarak izleme (ID ile izleme için)",
    BrawlTVActive: "BrawlTV Olarak İzleme Aktif\nBu butona izlemeden önce bas!",
    BrawlTVDeactive: "BrawlTV Olarak İzleme Kapandı\nBu butona izlemeden önce bas!",
    ChromaticName: "Renkli isimler (Görünüm)",
    RenkliİsimAktif: "Renkli isimler açıldı\nOyun yeniden başlatılıyor..",
    RenkliİsimDeaktif: "Renkli isimler kapatıldı\nOyun yeniden başlatılıyor..",
    DONATEME: "BAĞIŞ YAP",
    SyncON: "AntiOutOfSync Açıldı!",
    SyncOFF: "AntiOutOfSync Kapatıldı!",
    AntiOutOfSync: "Bağlantı kesildi kaldırma",
    MenuSkinChanger: "Menü Kostüm Değiştirici ON/OFF",
    RangeMod: "Menzil Modu ON/OFF",
    VIP: "VIP Özellikleri Yakında!"
    }
    var en = {
        AboutText: `
        ╔═══════════════════════════════════╗
    ▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂
            <cff001b>T<cff0036>ü<cff0052>r<cff006d>k<cff0089> <cff00a4>S<cff00c0>t<cff00db>a<cff00f7>r<cfc1bde>s<cfa37c5> <cf853ac>v<cf66f93>5<cf48b7b>6<cf2a762>.<cf0c349>2<ceedf30>7<cecfb17>4</c>
            
            <cff1f1f>d<cff3f3f>i<cff5f5f>s<cff7f7f>c<cff9f9f>o<cffbfbf>r<cffdfdf>d<cffffff>.<cffdfdf>g<cffbfbf>g<cff9f9f>/<cff7f7f>t<cff5f5f>s<cff3f3f>m<cff1f1f>o<cff0000>d</c>
            <cff3231>t<cff6563>.<cff9895>m<cffcbc7>e<cfffffa>/<cffccc8>b<cff9996>s<cff6664>m<cff3332>t<cff0101>r</c>
            ▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂

            <cf1fb00>M<cf4f800>O<cf8f400>D<cfbf100> <cffee00>O<cfeee00>W<cfdef00>N<cfcf000>E<cfbf100>R<cfaf200>S</c>

            <cfe030a>D<cfd0715>E<cfc0b20>B<cfc0f2b>U<cfb1336>G<cfa1741> <cf91a4c>M<cf91e57>E<cf82262>N<cf7266c>U<cf72a77>:<cf62e82> <cf5318d>d<cf43598>e<cf439a3>m<cf33dae>i<cf241b9>r<cf145c4>c<ce949c5>n<ce04dc7>q<cd852c8> <ccf56ca>v<cc75acb>e<cbe5fcd> <cb663ce>m<cad67d0>y<ca46cd1>s<c9c70d3>t<c9374d4>i<c8b79d6>n<c827dd7>d<c7a81d9>e<c7186da>v<c698adc>f<c608edd>o<c5793df>x</c>
            <cf95400>Y<cf3a900>u<ceefe00>s<cbcdb4a>u<c8ab794>f<c5893de>f</c>
    
            <cf1fb00>D<cf4f800>E<cf8f400>V<cfbf100>E<cffee00>L<cfeee00>O<cfdef00>P<cfcf000>E<cfbf100>R<cfaf200>S</c>

            <cff0b39>E<cff1773>x<cff22ad>s<cff2ee7>a<cea26ed>x<cd51ef3>s<cc016f9>h<cab0fff>i</c>
            <cff1773>G<cff2ee7>u<cff2ee7>d</c>
            <cff1773>E<cff2ee7>f<cd51ef3>e<cab0fff>e</c>
            <cff0f4c>H<cff1e99>a<cff2de6>z<ce323ef>a<cc719f7>r<cab0fff>d</c>
            <cff0f4c>S<cff1e99>q<cff2de6>u<ce323ef>e<cc719f7>a<cab0fff>k</c>
            <cff0b39>M<cff1773>r<cff22ad>S<cff2ee7>h<cea26ed>a<cd51ef3>d<cc016f9>o<cab0fff>w</c>
            <cff092e>Y<cff125c>o<cff1b8a>k<cff24b8>E<cff2ee7>d<cee27eb>i<cdd21f0>c<ccc1bf5>i<cbb15fa>0<cab0fff>1</c>
            <cff1773>T<cff2ee7>r<cff2ee7>k</c>
    ▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂
    ╚════════════════════════════════════╝   
    `,
    ActivateSpectate: "Unlimited Spectator On",
    DeactivateSpectate: "Unlimited Spectator Off",
    WelcomeText: "Welcome to Türk Stars",
    // DiscordButton: "Discord Button Activated", 
    // DiscordButton2: "Discord Button Deactivated", 
    SetAge: "Age upgraded!",
    GameUpdate: "Game updated!",
    UnlimitedSpectateButton: "Unlimited Spectate (Visual)",
    SetAgeButton: "Set High Age",
    FPSindicator: "Show FPS",
    FPS_ON: "FPS Indicator On",
    FPS_OFF: "FPS Indicator Off",
    SpectateButton: "Watch with ID",
    EnterTag: "ENTER ID...",
    SpectateMenu: "SPECTATE MENU",
    DusmanGormeON: "Show selected brawlers on..\nGame Restarting..",
    DusmanGormeOFF: "Show selected brawlers off..\nGame Restarting..",
    DusmanGorme: "Show selected brawler in friendly room",
    ReloadGame: "Reload Game",
    RemoveOutline: "Remove outline",
    OutlineFloater: "Removing Outline..\nGame Restarting..",
    OutlineFloater2: "Adding Outline..\nGame Restarting..",
    PlayerTagCopied: "Player Tag Copied:\n",
    SideMaskActive: "Remove Borders On!\nClick this button before the match!",
    SideMaskDeactive: "Remove Borders Off!\nClick this button before the match!",
    SideMask: "Remove Black Borders (in match)",
    BrawlTVButton: "Spectate as BrawlTV (for watch with ID)",
    BrawlTVActive: "Spectating as BrawlTV is active\nClick this button before watch!",
    BrawlTVDeactive: "Spectating as BrawlTV is deactive\nClick this button before watch!",
    ChromaticName: "Chromatik Name (visual)",
    RenkliİsimAktif: "Chromatic Name on\nGame restarting..",
    RenkliİsimDeaktif: "Chromatic Name off\nGame restarting..",
    DONATEME: "DONATE",
    SyncON: "AntiOutOfSync Activated!",
    SyncOFF: "AntiOutOfSync Deactivated!",
    AntiOutOfSync: "Anti-OutOfSync",
    MenuSkinChanger: "Menu Skin Changer ON/OFF",
    RangeMod: "Range Mod ON/OFF",
    VIP: "VIP Features Soon!"
    }
    function getString(text) {
        if (Language == "tr-TR") {
            return tr[text]
        }
        else if (Language == "en-EN") {
            return en[text]
        }
        else {
            return en[text]
        }
        
    }

    function initLanguage() {
        console.log("InitLang")
        const lang = StringTable_getCurrentLanguageCode()
        console.log(lang)
        if ((String_equals(lang, "TR".ptr()) & 1) != 0) {
            Language = "tr-TR"
        }
        else if ((String_equals(lang, "EN".ptr())  & 1) != 0 ) {
            Language = "en-EN"
        }
        console.log(ReadStringFromStringObject(lang))
    }

    var addfile = base.add(0x7DA934)
    var ResourceListener_addFile = new NativeFunction(addfile, 'void', [
        'pointer',
        'pointer'
    ])
    var GameButton_GameButton = new NativeFunction(base.add(0x2990E8), 'void', ['pointer']);
    var Sprite_Sprite = new NativeFunction(base.add(0x77E02C), 'void', ['pointer', 'int']);
            var ResourceManager_getMovieClip = new NativeFunction(base.add(0x7429D0), 'pointer', [
                'pointer',
                'pointer'
            ])
    var Stage_addChild = new NativeFunction(base.add(0x787388), 'pointer', ['pointer','pointer']);
    var Stage_removeChild = new NativeFunction(base.add(0x787394), 'pointer', ['pointer','pointer']);
    var TextField_setText = new NativeFunction(base.add(0x29955C), 'pointer', [ 'pointer','pointer','bool']);
    var movieClipsettext = new NativeFunction(base.add(0x7A4708), 'void', [
        'pointer',
        'pointer',
        'pointer'
    ])


    const CustomButton_setButtonListener = new NativeFunction(base.add(CustomButton_setButtonListenerCtor), 'void', ['pointer', 'pointer']);
    const PlayerInfo_refreshPlayerHeader = new NativeFunction(base.add(PlayerInfo_refreshPlayerHeaderCtor), 'void', ['pointer']);
    const DropGUIContainer_addGameButton = new NativeFunction(base.add(DropGUIContainer_addGameButtonCtor), 'pointer', ['pointer', 'pointer', 'int']);
    const CopyString = new NativeFunction(base.add(0x9D387C), 'void', ['pointer']) //copy code '%s' to clipboard //güncellendi
    const open = new NativeFunction(base.add(Application_openURL), "void", ["pointer"])
    const malloc = new NativeFunction(Module.getExportByName('libc.so', 'malloc'), 'pointer', ['uint']);
    var showPopup = new NativeFunction(base.add(0x2951D8), "void", ["pointer","pointer","int","int","int"]) // güncellendi
    var TestPopup = new NativeFunction(base.add(0x5657CC), "pointer", ["pointer"])    //güncellendi    
    
    var newConnectingToServerText = `<cff1f1f>d<cff3f3f>i<cff5f5f>s<cff7f7f>c<cff9f9f>o<cffbfbf>r<cffdfdf>d<cffffff>.<cffdfdf>g<cffbfbf>g<cff9f9f>/<cff7f7f>t<cff5f5f>s<cff3f3f>m<cff1f1f>o<cff0000>d</c>`;
    
    String.prototype.ptr = function () {
        return Memory.allocUtf8String(this);
    };
    
    String.prototype.scptr = function () {
        let StringCtor = new NativeFunction(Libg.offset(String_Ctor), 'pointer', ['pointer', 'pointer']);
        let pointer = malloc(20);
        StringCtor(pointer, this.ptr());
        return pointer;
    };
    
    
    function ReadStringFromStringObject(StrObjectPtr) {
        const StringByteLength = StrObjectPtr.add(4).readInt();
        if (StringByteLength > 7) {
            return StrObjectPtr.add(8).readPointer().readUtf8String(StringByteLength);
        }
        return StrObjectPtr.add(8).readUtf8String(StringByteLength);
    }
    
    function showFloaterText(text) {
        var instance = Libg.offset(GUI_sm_pInstance).readPointer();
        new NativeFunction(Libg.offset(GUI_showFloaterTextAtDefaultPos), "void", ["pointer", "pointer", "int", "int"])(instance, text.scptr(),0,-1);
    }
    
    var MessageManager__getLatencyReport = new NativeFunction(Libg.offset(0x429EA8), 'void', ['pointer','pointer']);
    Interceptor.replace(MessageManager__getLatencyReport, new NativeCallback(function(a1,a2) {
        a2.add(73*4).writeInt(0)
        MessageManager__getLatencyReport(a1,a2)
    }, 'void', ['pointer','pointer']));
    
    Interceptor.attach(base.add(NativeFont_formatString),{
        onEnter(args) {
            args[7] = ptr(1)
        }
    })

    base.add(HomePageIsProd1).writeByteArray([0x00, 0x00, 0xA0, 0xE3]);
    base.add(HomePageIsProd2).writeByteArray([0x00, 0x00, 0xA0, 0xE3]);
    base.add(SettingsSceenIsDeveloper).writeByteArray([0x01, 0x00, 0xA0, 0xE3]);
    
    var strtablegetstr = new NativeFunction(Libg.offset(StringTable_getString), 'pointer', ['pointer'])
    Interceptor.replace(strtablegetstr, new NativeCallback(function(a1) { //string table
            var str = Memory.readUtf8String(a1);
            if (str === "TID_ABOUT") {
                return strtablegetstr(getString("AboutText").ptr());
            }
            if (str === "TID_CONNECTING_TO_SERVER") {
                return strtablegetstr(newConnectingToServerText.ptr());
            }
            return strtablegetstr(a1);
    }, 'pointer', ["pointer"]));
      
    let text = "<cff1717>T<cff2e2e>ü<cff4545>r<cff5c5c>k<cff7373> <cff8b8b>S<cffa2a2>t<cffb9b9>a<cffd0d0>r<cffe7e7>s<cffffff> <cffe7e7>(<cffd0d0>t<cffb9b9>s<cffa2a2>m<cff8b8b>o<cff7373>d<cff5c5c>.<cff4545>x<cff2e2e>y<cff1717>z<cff0000>)</c>\n<cff1919>v<cff3232>5<cff4c4c>6<cff6565>.<cff7f7f>2<cff9898>7<cffb2b2>4<cfecbcb> <cffe5e5>(<cfffefe>s<cffe5e5>c<cffcccc>r<cffb2b2>i<cff9999>p<cff7f7f>t<cff6666>:<cff4c4c> <cfe3333>7<cff1919>2<cff0303>)</c>\n<cff1f1f>d<cff3f3f>i<cff5f5f>s<cff7f7f>c<cff9f9f>o<cffbfbf>r<cffdfdf>d<cffffff>.<cffdfdf>g<cffbfbf>g<cff9f9f>/<cff7f7f>t<cff5f5f>s<cff3f3f>m<cff1f1f>o<cff0000>d</c>\n<cff3232>t<cff6565>.<cff9898>m<cffcbcb>e<cffffff>/<cffcccc>b<cff9999>s<cff6666>m<cff3333>t<cff0101>r</c>";
    let textptr = text.ptr();
    Interceptor.attach(Libg.offset(lobbyInfoProd), function () { 
        this.context.r1 = textptr;

        //fpsyi sürekli güncellemek için
        var instance = base.add(0xCC3AE4).readPointer()
        var fps = 0;
        var v1 = instance.add(476).readInt();
        if (v1 >= 1) {
            var v2 = instance.add(472).readFloat();
            fps = v2/v1;
        }
        movieClipsettext(globalbuttons.fpstext, "Text".ptr(), `\n\nFPS: ${fps.toFixed(0)}`.scptr())

    });

    var testtest = new NativeFunction(Libg.offset(String_Ctor), 'pointer', ['pointer','pointer'])
    Interceptor.replace(testtest, new NativeCallback(function(a1,a2) {
            var str = Memory.readUtf8String(a2);
            if (str === "LATENCY TESTS") {
                return testtest(a1,getString("DONATEME").ptr());
            }
            return testtest(a1, a2);
    }, 'pointer', ["pointer","pointer"]));

    const cm = new CModule(`
    void onClick(a1,a2) {}
    void ModMenu_onClick(a1,a2) {}
    void ModList_onClick(a1,a2) {}
    `);
    var PlayerTag = "0";
    
    Interceptor.replace(PlayerInfo_refreshPlayerHeader, new NativeCallback(function(self) {
        var HashCodeGenerator_toCodeIA = Interceptor.attach(new NativeFunction(base.add(HashCodeGenerator_toCodeCtor), 'pointer', ['pointer', 'pointer']), {
            onLeave: function(retval) {
                PlayerTag = ReadStringFromStringObject(retval)
                console.log(PlayerTag)
                HashCodeGenerator_toCodeIA.detach();
            }
        });
        PlayerInfo_refreshPlayerHeader(self);
        var CopyPlayerTagButton = DropGUIContainer_addGameButton(self.add(136).readPointer(), Memory.allocUtf8String("tag_txt"),1);

        
        CustomButton_setButtonListener(CopyPlayerTagButton,self.add(76))
        Interceptor.attach(self.add(76).readPointer().add(4).readPointer(), {
            onEnter: function(args) {
                if (CopyPlayerTagButton.equals(args[1])) {
                    var PlayerTag_SO = PlayerTag.scptr();
                    CopyString(PlayerTag_SO);
                    showFloaterText(getString("PlayerTagCopied")+PlayerTag);
                }
            }
        });
    }, 'void', ['pointer']));
    
    var popup = new NativeFunction(Libg.offset(PopupBase_popupBase), 'int', ['pointer', 'pointer', 'pointer', 'int', 'int', 'pointer', 'pointer', 'pointer'])
    Interceptor.replace(popup, new NativeCallback(async function(self, PopupFileName, PopupExportName, a4, a5, PopupBackgroundFileName, PopupBackgroundExportName, PopupHeaderExportName) {
        
        //todo: buradaki bgyi kullanıcının seçmesini sağlayabilirsin
        /*PopupBackgroundFileName = 'sc/background_hackers.sc'.scptr();
        PopupBackgroundExportName = 'bgr_hackers'.scptr();*/
    
        if (PopupExportName == "about_screen") {
            PopupBackgroundFileName = 'sc/ui.sc'.scptr();
            PopupBackgroundExportName = 'bg_shape_01_atlasgenerator_texture_luminance_alpha'.scptr();
        }
    
        return popup(self, PopupFileName, PopupExportName, a4, a5, PopupBackgroundFileName, PopupBackgroundExportName, PopupHeaderExportName);
    }, 'void', ['pointer', 'pointer', 'pointer', 'int', 'int', 'pointer', 'pointer', 'pointer']));
    
    const recvmessage = new NativeFunction(Libg.offset(MessageManager_receiveMessage), "pointer", ["pointer", 'pointer', "bool"]);
    
    Interceptor.replace(recvmessage, new NativeCallback(function(a1, a2, a3) {
        var messageType = new NativeFunction(Memory.readPointer(Memory.readPointer(a2).add(20)), "int", ["pointer"])(a2);
        if (messageType === 20104) {
            initLanguage()
            caches.debugmenubutton = createDebugButton()
            /*globalbuttons.fpstext = fpstext()
            movieClipsettext(globalbuttons.fpstext, "Text".ptr(), "\n\nFPS: ---".scptr())*/
            setTimeout(()=>{
                showFloaterText(getString("WelcomeText"))
                ShowNativeDialog("Türk Stars v56.274","Debug Menu: demircnq and mystindevfox\ndiscord.gg/tsmod & t.me/bsmtr & tsmod.xyz","","Close", "");
                
            },2000)
        }
        if (messageType === 20103) {
            var errcode = a2.add(92).readInt();
            switch(errcode) {
                case 8:
                    a2.add(120).writePointer(getString('GameUpdate').scptr());
                    a2.add(120).writePointer('https://discord.gg/tsmod'.scptr());
                    break;
            }
        }
        if (messageType == 24109) {
            var message = a2;
            if (ModConfig.UnlimitedSpectator) {
                message.add(108).writeInt(message.add(96).readInt()); 
                message.add(112).writeInt(1);  // brawl tv
            }
            
        }
        var testo = recvmessage(a1, a2, a3);
        return testo;
    }, "pointer", ["pointer", "pointer","bool"]));
    

    /*Interceptor.attach(base.add(0x1C9320), { //GameMain::sendFPSAnalytics found with "laser_fps"
        onEnter(args) {
            console.log("test")
            
        }
    })*/

    const settingOnClicked = new NativeFunction(Libg.offset(SettingsScreen_buttonClicked), "pointer", ["pointer", 'pointer']);
    
    Interceptor.replace(settingOnClicked, new NativeCallback(function(a1, a2) {
        if (a1.add(216).readPointer().equals(a2)) {
            open("https://buymeacoffee.com/demir5016".scptr())
        }
        else {
            var testo = settingOnClicked(a1, a2);
            return testo;
        }
    }, "pointer", ["pointer", "pointer"]));
    
    const pop = new NativeFunction(Libg.offset(0x5657CC), "pointer", ["pointer"]);
    Interceptor.replace(pop, new NativeCallback(function(a1) {
    
        new NativeFunction(Libg.offset(0x37C05C), "pointer", ["pointer"])(a1);
        a1.add(76).writePointer(cm.ModList_onClick)
        return a1;
    }, "pointer", ["pointer"]));

    //debug menu

    var addfileattach = Interceptor.attach(addfile, {
            onEnter(args) {
                addfileattach.detach();
                ResourceListener_addFile(args[0], 'sc/debug.sc'.scptr());
                console.log("debug.sc loaded")
                
            }
    });

    Interceptor.attach(base.add(0x39C9F4), { //TID_ERROR_SPECTATE_NOT_POSSIBLE
        onEnter(args) {
            if (SpectateOnClickCheck == true) {
                SpectateOnClickCheck = false
            }
            
        }
    });
    var onclick = new NativeFunction(base.add(0x4029FC), "pointer", ["pointer","pointer","int"]);
    Interceptor.replace(base.add(0x4029FC), new NativeCallback(function (a1, a2,a3) {
        console.log("test");
        console.log(a3)
        if (a3 == 1 && SpectateOnClickCheck == true) {
            //ID alma ve izlemeyi kodla
            var tag = new NativeFunction(base.add(0x7A4D60), 'pointer', [
                'pointer',
            ])(a1.add(280).readPointer())
            tag = ReadStringFromStringObject(tag);
            if (tag.startsWith("X")) {
                SpectateOnClickCheck = false
                onclick(a1,a2,a3);
            } else {
                console.log(tag)
                var id = malloc(4)
                var testo = new NativeFunction(Libg.offset(0x70A020), 'pointer', ['pointer'])(id); // güncellendi
                id = new NativeFunction(Libg.offset(0x70A09C), 'pointer', ['pointer','pointer'])(testo, tag.scptr()); // güncellendi
                var StartSpectateMessageFunc = new NativeFunction(Libg.offset(StartSpectateMessage), 'pointer', ['pointer','pointer', 'bool']);
                var paket = malloc(150)
                StartSpectateMessageFunc(paket, id, ModConfig.BrawlTVSpectate ? 1:0)
                var send = Libg.offset(MessageManager_sendMessage)
                const sendmessage = new NativeFunction(send, "pointer", ["pointer", 'pointer']);
                sendmessage(Libg.offset(MessageManager_sm_pInstance).readPointer(), paket)
                
                setTimeout(function() {
                    SpectateOnClickCheck = false
                }, 10000)
            }

        }else {
            onclick(a1, a2, a3);
        }

    }, 'pointer', ['pointer', 'pointer',"int"]));
    function createDebugButton() {
        try {
            
            var instance = malloc(400)
            GameButton_GameButton(instance)
            var movieClip = ResourceManager_getMovieClip("sc/debug.sc".ptr(), "debug_button".ptr());
            new NativeFunction(instance.readPointer().add(172).readPointer(), 'void', [
                'pointer',
                'pointer',
                'bool'
            ])(instance, movieClip, 1)

            instance.add(28).writeFloat(10); //x
            instance.add(32).writeFloat(555); //y
            
            Stage_addChild(base.add(0xCC9BB4).readPointer(), instance)
            
            TextField_setText(instance, "D".scptr(),1)

            caches.debugmenu = createDebugMenu();

            caches.category1 = createDebugMenuCategory("Account", (base.add(0xCD0B48).readInt()/2400) * 1100, 100)
            //caches.category2 = createDebugMenuCategory("Preview", (base.add(0xCD0B48).readInt()/2400) * 1100, 155)
            caches.category3 = createDebugMenuCategory("Battle", (base.add(0xCD0B48).readInt()/2400) * 1100, 155)
            caches.category4 = createDebugMenuCategory("Brawl Pass", (base.add(0xCD0B48).readInt()/2400) * 1100, 210)
            caches.category5 = createDebugMenuCategory("GFX", (base.add(0xCD0B48).readInt()/2400) * 1100, 265)
            //caches.category2pre = createDebugMenuCategory("Preview", (base.add(0xCD0B48).readInt()/2400) * 1100, 100)
            caches.button9 = createDebugMenuButton("VIP", (base.add(0xCD0B48).readInt()/2400) * 1100, 320)
            caches.button10 = createDebugMenuButton("Game Restart", (base.add(0xCD0B48).readInt()/2400) * 1100, 375)
            caches.button3 = createDebugMenuButton(getString("FPSindicator"), (base.add(0xCD0B48).readInt()/2400) * 1100, 155)
            caches.button7 = createDebugMenuButton(getString("RemoveOutline"), (base.add(0xCD0B48).readInt()/2400) * 1100, 210)
            caches.button8 = createDebugMenuButton(getString("SideMask"), (base.add(0xCD0B48).readInt()/2400) * 1100, 265)
            caches.button5 = createDebugMenuButton(getString("DusmanGorme"), (base.add(0xCD0B48).readInt()/2400) * 1100, 210)
            caches.button2 = createDebugMenuButton(getString("SetAgeButton"), (base.add(0xCD0B48).readInt()/2400) * 1100, 155)
            caches.button11 = createDebugMenuButton(getString("ChromaticName"), (base.add(0xCD0B48).readInt()/2400) * 1100, 155)
            caches.button12 = createDebugMenuButton(getString("MenuSkinChanger"), (base.add(0xCD0B48).readInt()/2400) * 1100, 265)
            caches.button13 = createDebugMenuButton(getString("RangeMod"), (base.add(0xCD0B48).readInt()/2400) * 1100, 320)
            caches.button14 = createDebugMenuButton(getString("AntiOutOfSync"), (base.add(0xCD0B48).readInt()/2400) * 1100, 375)
            caches.category1ac = createDebugMenuCategory("Account", (base.add(0xCD0B48).readInt()/2400) * 1100, 100)
            caches.button1 = createDebugMenuButton(getString("UnlimitedSpectateButton"), (base.add(0xCD0B48).readInt()/2400) * 1100, 155)
            caches.button4 = createDebugMenuButton(getString("SpectateButton"), (base.add(0xCD0B48).readInt()/2400) * 1100, 210)        
            caches.button6 = createDebugMenuButton(getString("BrawlTVButton"), (base.add(0xCD0B48).readInt()/2400) * 1100, 265)
            caches.category3ba = createDebugMenuCategory("Battle", (base.add(0xCD0B48).readInt()/2400) * 1100, 100)
            caches.category4bra = createDebugMenuCategory("Brawl Pass", (base.add(0xCD0B48).readInt()/2400) * 1100, 100)
            caches.category5gfx = createDebugMenuCategory("GFX", (base.add(0xCD0B48).readInt()/2400) * 1100, 100)

            //var category = createDebugMenuCategory("Account +", (base.add(0xCD0B48).readInt()/2400) * 1100, 265)
            //var categorymini = createDebugMenuCategoryMini("Account", (base.add(0xCD0B48).readInt()/2400) * 970, 320)
            
           // globalbuttons.Test = createGameButton("Discord", 80, 130, "sc/ui.sc", "popover_button_green");
           globalbuttons.fpstext = fpstext()

            caches.isdebugmenuopened = false
            caches.buttononclick = Interceptor.attach(base.add(0x2993A0), {
                onEnter(args) {
                    var a1 = args[0]
                    try {
                        if (a1.toInt32() == instance.toInt32()) {
                            if (caches.isdebugmenuopened) {
                                closeDebugMenu()
                            } else {
                                caches.isdebugmenuopened = true
                                Stage_addChild(base.add(0xCC9BB4).readPointer(), caches.debugmenu)
                                Stage_addChild(base.add(0xCC9BB4).readPointer(), caches.category1)
                                //Stage_addChild(base.add(0xCC9BB4).readPointer(), caches.category2)
                                Stage_addChild(base.add(0xCC9BB4).readPointer(), caches.category3)
                                Stage_addChild(base.add(0xCC9BB4).readPointer(), caches.category4)
                                Stage_addChild(base.add(0xCC9BB4).readPointer(), caches.category5)
                                Stage_addChild(base.add(0xCC9BB4).readPointer(), caches.button9)
                                Stage_addChild(base.add(0xCC9BB4).readPointer(), caches.button10)
                            }
                            return;
                        }     
                        //account başlangıç
                        else if (a1.toInt32() == caches.category1.toInt32()) {
                                Stage_removeChild(base.add(0xCC9BB4).readPointer(), caches.category1)
                                //Stage_removeChild(base.add(0xCC9BB4).readPointer(), caches.category2)
                                Stage_removeChild(base.add(0xCC9BB4).readPointer(), caches.category3)
                                Stage_removeChild(base.add(0xCC9BB4).readPointer(), caches.category4)
                                Stage_removeChild(base.add(0xCC9BB4).readPointer(), caches.category5)
                                Stage_removeChild(base.add(0xCC9BB4).readPointer(), caches.button9)
                                Stage_removeChild(base.add(0xCC9BB4).readPointer(), caches.button10)
                                Stage_addChild(base.add(0xCC9BB4).readPointer(), caches.category1ac)
                                Stage_addChild(base.add(0xCC9BB4).readPointer(), caches.button2)
                                Stage_addChild(base.add(0xCC9BB4).readPointer(), caches.button5)
                                Stage_addChild(base.add(0xCC9BB4).readPointer(), caches.button12)
                                Stage_addChild(base.add(0xCC9BB4).readPointer(), caches.button13)
                                Stage_addChild(base.add(0xCC9BB4).readPointer(), caches.button14)


                        }
                        else if (a1.toInt32() == caches.category1ac.toInt32()) {
                            Stage_removeChild(base.add(0xCC9BB4).readPointer(), caches.category1ac)
                            Stage_removeChild(base.add(0xCC9BB4).readPointer(), caches.button2)
                            Stage_removeChild(base.add(0xCC9BB4).readPointer(), caches.button5)
                            Stage_addChild(base.add(0xCC9BB4).readPointer(), caches.debugmenu)
                            Stage_addChild(base.add(0xCC9BB4).readPointer(), caches.category1)
                            //Stage_addChild(base.add(0xCC9BB4).readPointer(), caches.category2)
                            Stage_addChild(base.add(0xCC9BB4).readPointer(), caches.category3)
                            Stage_addChild(base.add(0xCC9BB4).readPointer(), caches.category4)
                            Stage_addChild(base.add(0xCC9BB4).readPointer(), caches.category5)
                            Stage_addChild(base.add(0xCC9BB4).readPointer(), caches.button9)
                            Stage_addChild(base.add(0xCC9BB4).readPointer(), caches.button10)
                            Stage_removeChild(base.add(0xCC9BB4).readPointer(), caches.button12)
                            Stage_removeChild(base.add(0xCC9BB4).readPointer(), caches.button13)
                            Stage_removeChild(base.add(0xCC9BB4).readPointer(), caches.button14)


                            }
                            //account bitiş

                            //preview başlangıç
                           /* else if (a1.toInt32() == caches.category2.toInt32()) {
                                Stage_removeChild(base.add(0xCC9BB4).readPointer(), caches.category1)
                                Stage_removeChild(base.add(0xCC9BB4).readPointer(), caches.category2)
                                Stage_removeChild(base.add(0xCC9BB4).readPointer(), caches.category3)
                                Stage_removeChild(base.add(0xCC9BB4).readPointer(), caches.category4)
                                Stage_removeChild(base.add(0xCC9BB4).readPointer(), caches.category5)
                                Stage_removeChild(base.add(0xCC9BB4).readPointer(), caches.button9)
                                Stage_removeChild(base.add(0xCC9BB4).readPointer(), caches.button10)
                                Stage_addChild(base.add(0xCC9BB4).readPointer(), caches.category2pre)
                                //stageaddchil buttons
                        }
                        else if (a1.toInt32() == caches.category2pre.toInt32()) {
                            Stage_removeChild(base.add(0xCC9BB4).readPointer(), caches.category2pre)
                            Stage_addChild(base.add(0xCC9BB4).readPointer(), caches.debugmenu)
                            Stage_addChild(base.add(0xCC9BB4).readPointer(), caches.category1)
                            Stage_addChild(base.add(0xCC9BB4).readPointer(), caches.category2)
                            Stage_addChild(base.add(0xCC9BB4).readPointer(), caches.category3)
                            Stage_addChild(base.add(0xCC9BB4).readPointer(), caches.category4)
                            Stage_addChild(base.add(0xCC9BB4).readPointer(), caches.category5)
                            Stage_addChild(base.add(0xCC9BB4).readPointer(), caches.button9)
                            Stage_addChild(base.add(0xCC9BB4).readPointer(), caches.button10)
                            }*/
                            //preview bitiş

                            //battle başlangıç
                            else if (a1.toInt32() == caches.category3.toInt32()) {
                                Stage_removeChild(base.add(0xCC9BB4).readPointer(), caches.category1)
                                //Stage_removeChild(base.add(0xCC9BB4).readPointer(), caches.category2)
                                Stage_removeChild(base.add(0xCC9BB4).readPointer(), caches.category3)
                                Stage_removeChild(base.add(0xCC9BB4).readPointer(), caches.category4)
                                Stage_removeChild(base.add(0xCC9BB4).readPointer(), caches.category5)
                                Stage_removeChild(base.add(0xCC9BB4).readPointer(), caches.button9)
                                Stage_removeChild(base.add(0xCC9BB4).readPointer(), caches.button10)
                                Stage_addChild(base.add(0xCC9BB4).readPointer(), caches.category3ba)
                                Stage_addChild(base.add(0xCC9BB4).readPointer(), caches.button1)
                                Stage_addChild(base.add(0xCC9BB4).readPointer(), caches.button4)
                                Stage_addChild(base.add(0xCC9BB4).readPointer(), caches.button6)
                                //stageaddchil buttons
                        }
                        else if (a1.toInt32() == caches.category3ba.toInt32()) {
                            Stage_removeChild(base.add(0xCC9BB4).readPointer(), caches.category3ba)
                            Stage_removeChild(base.add(0xCC9BB4).readPointer(), caches.button1)
                            Stage_removeChild(base.add(0xCC9BB4).readPointer(), caches.button4)
                            Stage_removeChild(base.add(0xCC9BB4).readPointer(), caches.button6)
                            Stage_addChild(base.add(0xCC9BB4).readPointer(), caches.debugmenu)
                            Stage_addChild(base.add(0xCC9BB4).readPointer(), caches.category1)
                            //Stage_addChild(base.add(0xCC9BB4).readPointer(), caches.category2)
                            Stage_addChild(base.add(0xCC9BB4).readPointer(), caches.category3)
                            Stage_addChild(base.add(0xCC9BB4).readPointer(), caches.category4)
                            Stage_addChild(base.add(0xCC9BB4).readPointer(), caches.category5)
                            Stage_addChild(base.add(0xCC9BB4).readPointer(), caches.button9)
                            Stage_addChild(base.add(0xCC9BB4).readPointer(), caches.button10)
                            }
                            //battle bitiş

                            //brawlpass başlangıç
                            else if (a1.toInt32() == caches.category4.toInt32()) {
                                Stage_removeChild(base.add(0xCC9BB4).readPointer(), caches.category1)
                                //Stage_removeChild(base.add(0xCC9BB4).readPointer(), caches.category2)
                                Stage_removeChild(base.add(0xCC9BB4).readPointer(), caches.category3)
                                Stage_removeChild(base.add(0xCC9BB4).readPointer(), caches.category4)
                                Stage_removeChild(base.add(0xCC9BB4).readPointer(), caches.category5)
                                Stage_removeChild(base.add(0xCC9BB4).readPointer(), caches.button9)
                                Stage_removeChild(base.add(0xCC9BB4).readPointer(), caches.button10)
                                Stage_addChild(base.add(0xCC9BB4).readPointer(), caches.category4bra)
                                Stage_addChild(base.add(0xCC9BB4).readPointer(), caches.button11)
                                //stageaddchil buttons
                        }
                        else if (a1.toInt32() == caches.category4bra.toInt32()) {
                            Stage_removeChild(base.add(0xCC9BB4).readPointer(), caches.button11)
                            Stage_removeChild(base.add(0xCC9BB4).readPointer(), caches.category4bra)
                            Stage_addChild(base.add(0xCC9BB4).readPointer(), caches.debugmenu)
                            Stage_addChild(base.add(0xCC9BB4).readPointer(), caches.category1)
                            //Stage_addChild(base.add(0xCC9BB4).readPointer(), caches.category2)
                            Stage_addChild(base.add(0xCC9BB4).readPointer(), caches.category3)
                            Stage_addChild(base.add(0xCC9BB4).readPointer(), caches.category4)
                            Stage_addChild(base.add(0xCC9BB4).readPointer(), caches.category5)
                            Stage_addChild(base.add(0xCC9BB4).readPointer(), caches.button9)
                            Stage_addChild(base.add(0xCC9BB4).readPointer(), caches.button10)
                            }
                            //brawlpass bitiş

                            //gfx başlangıç
                            else if (a1.toInt32() == caches.category5.toInt32()) {
                                Stage_removeChild(base.add(0xCC9BB4).readPointer(), caches.category1)
                               // Stage_removeChild(base.add(0xCC9BB4).readPointer(), caches.category2)
                                Stage_removeChild(base.add(0xCC9BB4).readPointer(), caches.category3)
                                Stage_removeChild(base.add(0xCC9BB4).readPointer(), caches.category4)
                                Stage_removeChild(base.add(0xCC9BB4).readPointer(), caches.category5)
                                Stage_removeChild(base.add(0xCC9BB4).readPointer(), caches.button9)
                                Stage_removeChild(base.add(0xCC9BB4).readPointer(), caches.button10)
                                Stage_addChild(base.add(0xCC9BB4).readPointer(), caches.button3)
                                Stage_addChild(base.add(0xCC9BB4).readPointer(), caches.button7)
                                Stage_addChild(base.add(0xCC9BB4).readPointer(), caches.button8)
                                Stage_addChild(base.add(0xCC9BB4).readPointer(), caches.category5gfx)
                                //stageaddchil buttons
                        }
                        else if (a1.toInt32() == caches.category5gfx.toInt32()) {
                            Stage_removeChild(base.add(0xCC9BB4).readPointer(), caches.category5gfx)
                            Stage_removeChild(base.add(0xCC9BB4).readPointer(), caches.button3)
                            Stage_removeChild(base.add(0xCC9BB4).readPointer(), caches.button7)
                            Stage_removeChild(base.add(0xCC9BB4).readPointer(), caches.button8)
                            Stage_addChild(base.add(0xCC9BB4).readPointer(), caches.debugmenu)
                            Stage_addChild(base.add(0xCC9BB4).readPointer(), caches.category1)
                            //Stage_addChild(base.add(0xCC9BB4).readPointer(), caches.category2)
                            Stage_addChild(base.add(0xCC9BB4).readPointer(), caches.category3)
                            Stage_addChild(base.add(0xCC9BB4).readPointer(), caches.category4)
                            Stage_addChild(base.add(0xCC9BB4).readPointer(), caches.category5)
                            Stage_addChild(base.add(0xCC9BB4).readPointer(), caches.button9)
                            Stage_addChild(base.add(0xCC9BB4).readPointer(), caches.button10)
                            }
                            //gfx bitiş
                        
                        else if (a1.toInt32() == caches.button1.toInt32()) {
                            ModConfig.UnlimitedSpectator = !ModConfig.UnlimitedSpectator;
                            WriteToFile(savefile, "w", FormatJSONString(ModConfig));
                            showFloaterText(ModConfig.UnlimitedSpectator ? getString("ActivateSpectate") : getString("DeactivateSpectate"))
                            return;
                        }
                        else if (a1.toInt32() == caches.button2.toInt32()) {
                            var age = malloc(30)
                            new NativeFunction(base.add(0x5C457C), 'void', ['pointer','int'])(age, 23)
                            new NativeFunction(base.add(0x574490), 'void', ['pointer','pointer'])
                            (new NativeFunction(base.add(0x573988), 'pointer', [])(),age)
                            showFloaterText(getString("SetAge"))
                        }
                        else if (a1.toInt32() == caches.button3.toInt32()) {
                            ModConfig.FpsIndicator = !ModConfig.FpsIndicator;
                            WriteToFile(savefile, "w", FormatJSONString(ModConfig));
                            if (globalbuttons.fpstext.active) {                           
                                Stage_removeChild(base.add(0xCC9BB4).readPointer(), globalbuttons.fpstext)
                                globalbuttons.fpstext.active = false;
                                showFloaterText(getString("FPS_OFF"));
                            } else {
                                Stage_addChild(base.add(0xCC9BB4).readPointer(), globalbuttons.fpstext)
                                globalbuttons.fpstext.active = true;
                                showFloaterText(getString("FPS_ON"));
                            }
                        }    
                        else if (a1.toInt32() == caches.button9.toInt32()) {
                            showFloaterText(getString("VIP"))
                        }
                        else if (a1.toInt32() == caches.button10.toInt32()) {
                            reloadGame()
                        }
                        else if (a1.toInt32() == caches.button11.toInt32()) {
                            ModConfig.ChromaticName = !ModConfig.ChromaticName
                            WriteToFile(savefile, "w", FormatJSONString(ModConfig));
                            const LogicDailyData_isBrawlPassPremiumUnlocked = new NativeFunction(Libg.offset(0x6B4268), 'int', ['pointer']);
                            if ( ModConfig.ChromaticName ) {
                                Interceptor.replace(LogicDailyData_isBrawlPassPremiumUnlocked, new NativeCallback(function() {
                                    return 1;
                                }, 'int', []));
                                showFloaterText(getString("RenkliİsimAktif"))
                                setTimeout(()=>{
                                    reloadGame()
                                },2000)
                            } else {
                                Interceptor.revert(LogicDailyData_isBrawlPassPremiumUnlocked)
                                showFloaterText(getString("RenkliİsimDeaktif"))
                                setTimeout(()=>{
                                    reloadGame()
                                },2000)
                            }
                        }    
                        else if (a1.toInt32() == caches.button12.toInt32()) {
                            ModConfig.SkinChanger = !ModConfig.SkinChanger
                            ModConfig.AntiOutOfSync = !ModConfig.AntiOutOfSync
                            WriteToFile(savefile, "w", FormatJSONString(ModConfig));
                            ShowNativeDialog("Mod activated", "game is closing at 5 sec\nPlease reopen game","","","")
                            setTimeout(()=> {
                                exit()
                            },5000)
                        }      
                        else if (a1.toInt32() == caches.button4.toInt32()) {
                            base.add(0x10ECE3).writeUtf8String(getString("SpectateMenu"))
                            base.add(0x1245A2).writeUtf8String(getString("EnterTag"))
                            
                            var testt = malloc(1000);
                            testt = new NativeFunction(base.add(0x402544), "pointer", ["pointer"])(testt);
                            
                            //testt.add(76).writePointer() //onClick
                            var inst = base.add(0xCC5200).readPointer()
                            new NativeFunction(base.add(0x2951D8), "void", ["pointer","pointer","int","int","int"])(inst, testt, 1,0,1)
                            SpectateOnClickCheck = true
                            base.add(0x10ECE3).writeUtf8String("TID_TEAM_SEARCH_POPUP_TITLE")
                            base.add(0x1245A2).writeUtf8String("TID_TEAM_JOIN_ROOM_CODE")
                        }         
                        else if (a1.toInt32() == caches.button5.toInt32()) {
                            ModConfig.ShowBrawlers = !ModConfig.ShowBrawlers;
                            WriteToFile(savefile, "w", FormatJSONString(ModConfig));
                            if (ModConfig.ShowBrawlers) {
                                Memory.protect(base.add(TeamMemberItem_isOwnSide), 1, 'rwx');
                                base.add(TeamMemberItem_isOwnSide).writeU8(0);
                                showFloaterText(getString("DusmanGormeOFF"))
                                setTimeout(()=>{
                                    reloadGame();
                                },2000)
                            } else {
                                Memory.protect(base.add(TeamMemberItem_isOwnSide), 1, 'rwx');
                                base.add(TeamMemberItem_isOwnSide).writeU8(255);
                                showFloaterText(getString("DusmanGormeON"))
                                setTimeout(()=>{
                                    reloadGame();
                                },2000)
                            }
                        }
                        else if (a1.toInt32() == caches.button6.toInt32()) {
                            ModConfig.BrawlTVSpectate = !ModConfig.BrawlTVSpectate;
                            WriteToFile(savefile, "w", FormatJSONString(ModConfig));
                            showFloaterText(ModConfig.BrawlTVSpectate ? getString("BrawlTVActive") : getString("BrawlTVDeactive"))
                    }
                    else if (a1.toInt32() == caches.button14.toInt32()) {
                        ModConfig.AntiOutOfSync = !ModConfig.AntiOutOfSync;
                        WriteToFile(savefile, "w", FormatJSONString(ModConfig));
                        showFloaterText(ModConfig.AntiOutOfSync ? getString("SyncON") : getString("SyncOFF"))
                }
                        else if (a1.toInt32() == caches.button7.toInt32()) {
                            ModConfig.OutlineMod = !ModConfig.OutlineMod;
                            WriteToFile(savefile, "w", FormatJSONString(ModConfig));
                            showFloaterText(ModConfig.OutlineMod ? getString("OutlineFloater") : getString("OutlineFloater2"))
                            setTimeout(()=>{
                                reloadGame();                               
                            },2000)
                        }       
                        else if (a1.toInt32() == caches.button8.toInt32()) {
                            ModConfig.SideMask = !ModConfig.SideMask;
                            WriteToFile(savefile, "w", FormatJSONString(ModConfig));
                            if (ModConfig.SideMask) {
                                base.add(0x11326C).writeUtf8String("laser_screen_mask");
                                showFloaterText(getString("SideMaskDeactive"))
                            } else {
                                base.add(0x11326C).writeUtf8String("empty");
                                showFloaterText(getString("SideMaskActive"))
                            }
                        }       
                    } catch (e) {
                        console.log(JSON.stringify(e));
                        console.log(e.stack)
                    }
                }
                
            });
            return instance;
        } catch(e) {
            console.log(e.stack)
        }
    }


    function createDebugMenu() {
            var active = false
            var instance = malloc(400)
            Sprite_Sprite(instance, 1)
            var movieClip = ResourceManager_getMovieClip("sc/debug.sc".ptr(), "debug_menu".ptr());
            new NativeFunction(base.add(0x299DB4), 'void', [
                'pointer',
                'pointer'
            ])(instance, movieClip)

            instance.add(28).writeFloat((base.add(0xCD0B48).readInt()/2400) * 1250); //x
            instance.add(32).writeFloat(0); //y

            console.log(base.add(0xCD0B48).readInt())

            movieClipsettext(instance, "title".ptr(), "DEBUG MENU\ndiscord.gg/tsmod".scptr())

            return instance
    }

    function createDebugMenuButton(name,x,y) {
        var active = false
        var instance = malloc(400)
        GameButton_GameButton(instance)
        var movieClip = ResourceManager_getMovieClip("sc/debug.sc".ptr(), "debug_menu_item".ptr());
        new NativeFunction(instance.readPointer().add(172).readPointer(), 'void', [
            'pointer',
            'pointer',
            'bool'
        ])(instance, movieClip, 1)

        instance.add(28).writeFloat(x); //x
        instance.add(32).writeFloat(y); //y
        
        TextField_setText(instance, name.scptr(),1)
        return instance
    }

    function createDebugMenuCategoryMini(name,x,y) {
        var instance = malloc(400)
        GameButton_GameButton(instance)
        var movieClip = ResourceManager_getMovieClip("sc/debug.sc".ptr(), "debug_menu_category_mini".ptr());
        new NativeFunction(instance.readPointer().add(172).readPointer(), 'void', [
            'pointer',
            'pointer',
            'bool'
        ])(instance, movieClip, 1)

        instance.add(28).writeFloat(x); //x
        instance.add(32).writeFloat(y); //y
        
        TextField_setText(instance, name.scptr(),1)
        return instance
    }

    function createDebugMenuCategory(name,x,y) {
        var instance = malloc(400)
        GameButton_GameButton(instance)
        var movieClip = ResourceManager_getMovieClip("sc/debug.sc".ptr(), "debug_menu_category".ptr());
        new NativeFunction(instance.readPointer().add(172).readPointer(), 'void', [
            'pointer',
            'pointer',
            'bool'
        ])(instance, movieClip, 1)

        instance.add(28).writeFloat(x); //x
        instance.add(32).writeFloat(y); //y
        
        TextField_setText(instance, name.scptr(),1)
        return instance
    }
    //debug menu


    function createGameButton(text, x,y,sc,movieClipclip) {
        var instance = malloc(400)
            GameButton_GameButton(instance)
            var movieClip = ResourceManager_getMovieClip(sc.ptr(), movieClipclip.ptr());
            new NativeFunction(instance.readPointer().add(172).readPointer(), 'void', [
                'pointer',
                'pointer',
                'bool'
            ])(instance, movieClip, 1)

            instance.add(28).writeFloat(x); //x
            instance.add(32).writeFloat(y); //y
            
            TextField_setText(instance, text.scptr(),1)

            return instance
    }
    
    function fpstext() {
        
        var testtext = malloc(400)
        Sprite_Sprite(testtext, 1)
        var movieClip = ResourceManager_getMovieClip("sc/debug.sc".ptr(), "debug_menu_text".ptr());
        new NativeFunction(base.add(0x299DB4), 'void', [
            'pointer',
            'pointer'
        ])(testtext, movieClip)

        testtext.add(28).writeFloat(50); //x
        testtext.add(32).writeFloat(50); //y

        /*Stage_addChild(base.add(0xCC9BB4).readPointer(), testtext)*/
        return testtext;
    }



    function ShowNativeDialog(title, message, button1text, button2text, button3text) {
        Java.perform(function() {
            console.log("Frida script started");
        
            var NativeDialogManager = Java.use('com.supercell.titan.NativeDialogManager');
            if (NativeDialogManager) {
                console.log("NativeDialogManager classı var");
                if (NativeDialogManager.ShowDialog) {
                    console.log("ShowDialog var");
                    NativeDialogManager.ShowDialog(title, message, button1text, button2text, button3text);
                } else {
                    console.log("ShowDialog yok");
                }
            } else {
                console.log("NativeDialogManager classı yok");
            }
        });
    }


    function reloadGame() {
        closeDebugMenu()
        Stage_removeChild(base.add(0xCC9BB4).readPointer(), caches.debugmenubutton)
        caches.buttononclick.detach()
        new NativeFunction(base.add(0x1C76C0), 'void', ['pointer'])(base.add(0xCC3AE4).readPointer())

    }

    function closeDebugMenu() {
        Stage_removeChild(base.add(0xCC9BB4).readPointer(), caches.debugmenu)
        Stage_removeChild(base.add(0xCC9BB4).readPointer(), caches.category1)
        //Stage_removeChild(base.add(0xCC9BB4).readPointer(), caches.category2)
        Stage_removeChild(base.add(0xCC9BB4).readPointer(), caches.category3)
        Stage_removeChild(base.add(0xCC9BB4).readPointer(), caches.category4)
        Stage_removeChild(base.add(0xCC9BB4).readPointer(), caches.category5)
        Stage_removeChild(base.add(0xCC9BB4).readPointer(), caches.category1ac)
        //Stage_removeChild(base.add(0xCC9BB4).readPointer(), caches.category2pre)
        Stage_removeChild(base.add(0xCC9BB4).readPointer(), caches.category3ba)
        Stage_removeChild(base.add(0xCC9BB4).readPointer(), caches.category4bra)
        Stage_removeChild(base.add(0xCC9BB4).readPointer(), caches.category5gfx)
        Stage_removeChild(base.add(0xCC9BB4).readPointer(), caches.button9)
        Stage_removeChild(base.add(0xCC9BB4).readPointer(), caches.button10)
        Stage_removeChild(base.add(0xCC9BB4).readPointer(), caches.button1)
        Stage_removeChild(base.add(0xCC9BB4).readPointer(), caches.button2)
        Stage_removeChild(base.add(0xCC9BB4).readPointer(), caches.button3)
        Stage_removeChild(base.add(0xCC9BB4).readPointer(), caches.button4)
        Stage_removeChild(base.add(0xCC9BB4).readPointer(), caches.button5)
        Stage_removeChild(base.add(0xCC9BB4).readPointer(), caches.button6)
        Stage_removeChild(base.add(0xCC9BB4).readPointer(), caches.button7)
        Stage_removeChild(base.add(0xCC9BB4).readPointer(), caches.button8)
        Stage_removeChild(base.add(0xCC9BB4).readPointer(), caches.button11)
        Stage_removeChild(base.add(0xCC9BB4).readPointer(), caches.button13)
        Stage_removeChild(base.add(0xCC9BB4).readPointer(), caches.button12)
        Stage_removeChild(base.add(0xCC9BB4).readPointer(), caches.button14)
        caches.isdebugmenuopened = false;
    }
    
} catch(e) {
    console.log(JSON.stringify(JSON.parse(JSON.stringify(e)), null, 2));
}