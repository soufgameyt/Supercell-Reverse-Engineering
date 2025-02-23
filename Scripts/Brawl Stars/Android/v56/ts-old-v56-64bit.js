
console.log = () => {}
try{

    console.log("Script started");

    const malloc = new NativeFunction(Module.getExportByName('libc.so', 'malloc'), 'pointer', ['uint']); 
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

    var SpectateOnClickCheck = false;

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
        var buffer = malloc(Fsize);
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


    function exit() {
        Java.scheduleOnMainThread(() => {
            Java.use("java.lang.System").exit(0);
        });
    };

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
    assetsChanger(ModConfig.SkinChanger ? "TSMods/skins.csv" : "csv_logic/skins.csv","csv_logic/skins.csv")
    assetsChanger(ModConfig.RangeMod ? "TSMods/effects.csv" : "csv_logic/effects.csv", "csv_logic/effects.csv")


    var String_Ctor = 0x8AC140; // güncellendi
    var GUI_showFloaterTextAtDefaultPos = 0x453210; // güncellendi
    var GUI_sm_pInstance = 0xE4D5F8; // güncellendi
    var StartSpectateMessage = 0x842C18; // güncellendi
    var MessageManager_sendMessage = 0x5CE0A8; // güncellendi
    var MessageManager_sm_pInstance = 0xE4DA58; // güncellendi

    var LogicVersion_isProd = 0x724B98; // güncellendi
    var LogicVersion_isChina = 0x724BC0; // güncellendi
    var LogicVersion_isDeveloper = 0x724BC8; // güncellendi

    var HomePageIsProd1 = 0x6D7B7C; //güncellendi
    var HomePageIsProd2 = 0x6D7BB0; // güncellendi
    var SettingsSceenIsDeveloper = 0x6F5FD0; // güncellendi

    var lobbyInfoProd = 0x5328AC; //pointer for lobby Info it isnt variable 
    var lobbyInfoStage = 0x5327CC; //pointer for lobby Info it isnt variable (its for stage it has Player Online: )


    var StringTable_getString = 0x712A18; // güncellendi
    var PopupBase_popupBase = 0x54ED8C; // güncellendi
    var MessageManager_receiveMessage = 0x5CE27C; // güncellendi

    var SettingsScreen_buttonClicked = 0x6F6B7C; // güncellendi
    //var PrivacySettingsPopup_buttonClicked = 0x54FB14; //32bit offset

    var PlayerInfo_refreshPlayerHeaderCtor = 0x48B4BC; // güncellendi
    var HashCodeGenerator_toCodeCtor = 0x88D098; // güncellendi
    var DropGUIContainer_addGameButtonCtor = 0x459258; //Unable to create GameButton '%s'
    var CustomButton_setButtonListenerCtor = 0x916E08; // güncellendi

    var NativeFont_formatString = 0x8BAC38  // güncellendi

    var Application_openURL = 0xB0F91C; // güncellendi

    const Libg = {
        init() {            
            var library = Process.findModuleByName("libg.so");
            this.base = library.base;
            this.size = library.size;
            Memory.protect(this.base,this.size,"rwx")
            this.open = new NativeFunction(Libg.offset(Application_openURL), "void", ["pointer"])
            this.GameButton_GameButton = new NativeFunction(Libg.offset(0x458310), 'void', ['pointer']);
            this.Sprite_Sprite = new NativeFunction(Libg.offset(0x8F33E8), 'void', ['pointer', 'int']);
            this.ResourceManager_getMovieClip = new NativeFunction(Libg.offset(0x8BECA0), 'pointer', [
                'pointer',
                'pointer'
            ])
            this.Stage_addChild = new NativeFunction(Libg.offset(0x8FD01C), 'pointer', ['pointer','pointer']);
            this.Stage_removeChild = new NativeFunction(Libg.offset(0x8FD024), 'pointer', ['pointer','pointer']);
            this.TextField_setText = new NativeFunction(Libg.offset(0x458764), 'pointer', [ 'pointer','pointer','bool']);
            this.movieClipsettext = new NativeFunction(Libg.offset(0x9179C8), 'void', [
                'pointer',
                'pointer',
                'pointer'
            ])
            Protection.bypass()
        },
        offset(addr) {
            return this.base.add(addr)
        }
    }

    String.prototype.ptr = function () {
        return Memory.allocUtf8String(this);
    };

    String.prototype.scptr = function () {
        let StringCtor = new NativeFunction(Libg.offset(String_Ctor), 'pointer', ['pointer', 'pointer']);
        let pointer = malloc(30);
        StringCtor(pointer, this.ptr());
        return pointer;
    };
    var cache = {
    }
    var DebugConfig = {
        isDebugOpened: false
    }
    
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
        UpdateMessage: "Oyunun yeni sürümü çıktı",
        DONATEME: "BAĞIŞ YAP",
        PlayerTagCopied: "Oyuncu Tagı Kopyalandı\n",
        Welcome: "Türk Stars'a Hoş geldin",
        DonateTitle: "Bağış sayfasına yönlendiriliyor",
        DonateMessage: "Yapacağınız bağışlar bize bu yolda olan\nemeğimize birer destektir!",
        SetAge: "Yaş yükseltme",
        SetAgeSuccess: "Yaş yükseltildi",
        ShowBrawlerON: "Seçilen Karakterler Gösteriliyor..\nOyun Yeniden Başlatılıyor..",
        ShowBrawlerOFF: "Seçilen Karakterleri Görme Kapatılıyor..\nOyun Yeniden Başlatılıyor..",
        AntiOutOfSyncON: "Anti out of sync aktif edildi!",
        AntiOutOfSyncOFF: "Anti out of sync kapatıldı!",
        UmlimitedSpectatorON: "Sınırsız izleyici aktif edildi!",
        UmlimitedSpectatorOFF: "Sınırsız izleyici kapatıldı!",
        SpectateMenu: "İzleme Menüsü",
        EnterTag: "ID Girin..",
        BrawlTVSpectateON: "BrawlTV Olarak İzleme Aktif\nBu butona izlemeden önce bas!",
        BrawlTVSpectateOFF: "BrawlTV Olarak İzleme Kapandı\nBu butona izlemeden önce bas!",
        ShowBrawlers: "Dostluk maçında savaşçıları görme",
        AntiOutOfSync: "Bağlantı Kesildi Hatasını Kaldır",
        SkinChanger: "Lobi Kostüm Değiştirici",
        UnlimitedSpectate: "Sınırsız İzleyici",
        WatchID: "ID ile İzleme",
        BrawlTVWatch: "BrawlTV olarak izleme (ID ile izleme için)",
        Renkliİsim: "Renkli İsim (Görünüm)",
        Reload: "Oyunu Yeniden Başlat",
        RenkliİsimAktif: "Renkli İsim Açıldı..\nOyun yeniden başlatılıyor..",
        RenkliİsimDeaktif: "Renkli İsim Kapatıldı..\nOyun yeniden başlatılıyor..",
        GFX: "GFX",
        Battle: "Maç",
        Account: "Hesap",
        FPSindicator: "FPS göster/gizle",
        RemoveOutline: "Outline (dış çizgi) kaldır",
        SideMask: "Maç içi yandaki siyahlıkları kaldır",
        RangeMod: "Menzil Modunu Aç/Kapat",
        SideMaskON: "Yanlar Dolduruldu!\nBu butona maça girmeden önce bas!",
        SideMaskOFF: "Dolgu Kaldırıldı!\nBu butona maça girmeden önce bas!",
        FPS_ON: "FPS Göstergesi Aktif",
        FPS_OFF: "FPS Göstergesi Kapandı",
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
        UpdateMessage: "New version of the game is available, download it",
        DONATEME: "DONATE",
        PlayerTagCopied: "Player Tag Copied\n",
        Welcome: "Welcome to Turk Stars",
        DonateTitle: "Redirecting to donation page",
        DonateMessage: "Your donations are a support to our efforts on this path!",
        SetAge: "Set High Age",
        SetAgeSuccess: "Age upgraded",
        ShowBrawlerON: "Selected brawlers are being shown..\nGame is restarting..",
        ShowBrawlerOFF: "Hiding selected brawlers..\nGame is restarting..",
        AntiOutOfSyncON: "Anti out of sync activated!",
        AntiOutOfSyncOFF: "Anti out of sync deactivated!",
        UmlimitedSpectatorON: "Unlimited spectator on!",
        UmlimitedSpectatorOFF: "Unlimited spectator off!",
        SpectateMenu: "Spectate Menu",
        EnterTag: "Enter Tag..",
        BrawlTVSpectateON: "Spectating as BrawlTV On\nClick this button before watching!",
        BrawlTVSpectateOFF: "Spectating as BrawlTV Off\nClick this button before watching!",
        ShowBrawlers: "Show brawlers in friendly match",
        AntiOutOfSync: "Remove Disconnection",
        SkinChanger: "Menu Skin Changer",
        UnlimitedSpectate: "Unlimited Spectator",
        WatchID: "Spectate with ID",
        BrawlTVWatch: "Spectate as BrawlTV (for watching by ID)",
        Renkliİsim: "Chromatic Name (Visual)",
        Reload: "Reload Game",
        RenkliİsimAktif: "Chromatic Name On..\nThe game is restarting..",
        RenkliİsimDeaktif: "Chromatic Name Off..\nThe game is restarting..",
        GFX: "GFX",
        Battle: "Battle",
        Account: "Account",
        FPSindicator: "Show/Hide FPS",
        RemoveOutline: "Remove Outline",
        SideMask: "Remove black borders",
        RangeMod: "Range mod on/off" ,
        SideMaskON: "The sides are filled!\nPress this button before the match!",
        SideMaskOFF: "The filler has been removed!\nPress this button before the match!",
        FPS_ON: "FPS Indicator Activated",
        FPS_OFF: "FPS Indicator Deactivated",
        VIP: "VIP Features Soon!"
    }
    const LanguageLogic = {
        init() {
            const StringTable_getCurrentLanguageCode = new NativeFunction(Libg.offset(0x712D10), 'pointer', []);
            const String_equals = new NativeFunction(Libg.offset(0x8ACA04), 'pointer', ['pointer','pointer']);
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
        },
        getString(text) {
            console.log(tr[text])
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
    }

    function ReadStringFromStringObject(StrObjectPtr) {
        const StringByteLength = StrObjectPtr.add(4).readInt();
        if (StringByteLength > 7) {
            return StrObjectPtr.add(8).readPointer().readUtf8String(StringByteLength);
        }
        return StrObjectPtr.add(8).readUtf8String(StringByteLength);
    }

    const FloaterText = {
        getInstane() {
            return Libg.offset(GUI_sm_pInstance).readPointer();
        },
        show(text, color) {
            new NativeFunction(Libg.offset(GUI_showFloaterTextAtDefaultPos), "void", ["pointer", "pointer", "int", "int"])(this.getInstane(), text.scptr(),color, 0);
        }
    }
    //FloaterText.show("test",0xFFFFFFFF);


    const NativeDialogManager = {
        ShowDialog(title,message,button1text,button2text,button3text) {
            Java.perform(function() {
                var NativeDialogManager = Java.use('com.supercell.titan.NativeDialogManager');
                NativeDialogManager.ShowDialog(title, message, button1text, button2text, button3text);
            });

        }
    }
    const cm = new CModule(`
        void onClick(a1,a2) {}
    `);
    
    var PlayerTag = "0";

    var newConnectingToServerText = `<cff1f1f>d<cff3f3f>i<cff5f5f>s<cff7f7f>c<cff9f9f>o<cffbfbf>r<cffdfdf>d<cffffff>.<cffdfdf>g<cffbfbf>g<cff9f9f>/<cff7f7f>t<cff5f5f>s<cff3f3f>m<cff1f1f>o<cff0000>d</c>`;
    


    const DebugMenuBase = {
        init(instance, sc,exportname) {
            
            Libg.Sprite_Sprite(instance,1)
            var movieClip = Libg.ResourceManager_getMovieClip(sc.ptr(), exportname.ptr());
            new NativeFunction(Libg.offset(0x458FB8), 'void', [
                'pointer',
                'pointer'
            ])(instance, movieClip)

            console.log(Libg.offset(0xE604D8).readInt())
            instance.add(32).writeFloat((Libg.offset(0xE604D8).readInt()/2400) * 1255); //x
            instance.add(36).writeFloat(0); //y
            
        },
        SetTitle(instance, title) {
            Libg.movieClipsettext(instance, "title".ptr(), title.scptr())
        },
        createCategory(name) {
            var instance = malloc(400)
            Libg.GameButton_GameButton(instance)
            var movieClip = Libg.ResourceManager_getMovieClip("sc/debug.sc".ptr(), "debug_menu_category".ptr());
            new NativeFunction(instance.readPointer().add(344).readPointer(), 'void', [
                'pointer',
                'pointer',
                'bool'
            ])(instance, movieClip, 1)

            Libg.TextField_setText(instance, name.scptr(),1)
            return instance
        },
        addDebugMenuButton(name, category) {
            var instance = malloc(400)
            Libg.GameButton_GameButton(instance)
            var movieClip = Libg.ResourceManager_getMovieClip("sc/debug.sc".ptr(), "debug_menu_item".ptr());
            new NativeFunction(instance.readPointer().add(344).readPointer(), 'void', [
                'pointer',
                'pointer',
                'bool'
            ])(instance, movieClip, 1)

            Libg.TextField_setText(instance, name.scptr(),1)
            return {
                ins: instance,
                cat: category
            }
        }
    }


    const Debug = {
        init() {
            this.onClickListener()
        },
        createDubugButton() {
            cache.FpsIndicator = this.Fps()

            console.log("debug button")
            cache.debugButton = malloc(400)
            Libg.GameButton_GameButton(cache.debugButton)
            var movieClip = Libg.ResourceManager_getMovieClip("sc/debug.sc".ptr(), "debug_button".ptr());
            new NativeFunction(cache.debugButton.readPointer().add(344).readPointer(), 'void', [
                'pointer',
                'pointer',
                'bool'
            ])(cache.debugButton, movieClip, 1)

            cache.debugButton.add(32).writeFloat(10); //x
            cache.debugButton.add(36).writeFloat(555); //y
            
            Libg.Stage_addChild(Libg.offset(0xE54538).readPointer(), cache.debugButton)
            
            Libg.TextField_setText(cache.debugButton, "D".scptr(),1)

            cache.debugMenu = malloc(1000)
            DebugMenuBase.init(cache.debugMenu, "sc/debug.sc", "debug_menu")
            DebugMenuBase.SetTitle(cache.debugMenu, "DEBUG MENU\ndiscord.gg/tsmod")
            
            cache.DebugCategory = [] 
            cache.DebugCategory.push(DebugMenuBase.createCategory(LanguageLogic.getString("Account")))
            //cache.DebugCategory.push(DebugMenuBase.createCategory("Preview"))
            cache.DebugCategory.push(DebugMenuBase.createCategory(LanguageLogic.getString("Battle")))
            cache.DebugCategory.push(DebugMenuBase.createCategory("Brawl Pass"))
            cache.DebugCategory.push(DebugMenuBase.createCategory(LanguageLogic.getString("GFX")))

            cache.DebugButtons = []
            cache.DebugButtons.push(DebugMenuBase.addDebugMenuButton("VIP",null))
            cache.DebugButtons.push(DebugMenuBase.addDebugMenuButton(LanguageLogic.getString("Reload"),null))
            cache.DebugButtons.push(DebugMenuBase.addDebugMenuButton(LanguageLogic.getString("SetAge"),"Account"))
            cache.DebugButtons.push(DebugMenuBase.addDebugMenuButton(LanguageLogic.getString("ShowBrawlers"),"Account"))
            //cache.DebugButtons.push(DebugMenuBase.addDebugMenuButton("Add resources","Account"))
            cache.DebugButtons.push(DebugMenuBase.addDebugMenuButton(LanguageLogic.getString("AntiOutOfSync"),"Account"))
            cache.DebugButtons.push(DebugMenuBase.addDebugMenuButton(LanguageLogic.getString("SkinChanger"),"Account"))
            

            cache.DebugButtons.push(DebugMenuBase.addDebugMenuButton(LanguageLogic.getString("UnlimitedSpectate"),"Battle"))
            cache.DebugButtons.push(DebugMenuBase.addDebugMenuButton(LanguageLogic.getString("WatchID"),"Battle"))
            cache.DebugButtons.push(DebugMenuBase.addDebugMenuButton(LanguageLogic.getString("BrawlTVWatch"),"Battle"))

            cache.DebugButtons.push(DebugMenuBase.addDebugMenuButton(LanguageLogic.getString("Renkliİsim"),"Brawl Pass"))

            cache.DebugButtons.push(DebugMenuBase.addDebugMenuButton(LanguageLogic.getString("FPSindicator"),"GFX"))
            cache.DebugButtons.push(DebugMenuBase.addDebugMenuButton(LanguageLogic.getString("RemoveOutline"),"GFX"))
            cache.DebugButtons.push(DebugMenuBase.addDebugMenuButton(LanguageLogic.getString("SideMask"),"GFX"))

            cache.DebugButtons.push(DebugMenuBase.addDebugMenuButton(LanguageLogic.getString("RangeMod"),"Account"))


        },
        debugButtonPressed() {
            if (DebugConfig.isDebugOpened) {
                DebugConfig.isDebugOpened = !DebugConfig.isDebugOpened
                Libg.Stage_removeChild(Libg.offset(0xE54538).readPointer(), cache.debugMenu)
                if (cache.incataloginstance) Libg.Stage_removeChild(Libg.offset(0xE54538).readPointer(), cache.incataloginstance);
                cache.incataloginstance = null
                for (var x of cache.DebugCategory) {
                    Libg.Stage_removeChild(Libg.offset(0xE54538).readPointer(), x);
                }
                for (var x in cache.DebugButtons) {
                    Libg.Stage_removeChild(Libg.offset(0xE54538).readPointer(), cache.DebugButtons[x].ins);
                }
            } else {
                DebugConfig.isDebugOpened = !DebugConfig.isDebugOpened
                Libg.Stage_addChild(Libg.offset(0xE54538).readPointer(), cache.debugMenu)
                var y = 0;
                for (var x of cache.DebugCategory) {
                    x.add(32).writeFloat((Libg.offset(0xE604D8).readInt() / 2400) * 1100); // x
                    x.add(36).writeFloat((y * 55) + 100); // y
                    Libg.Stage_addChild(Libg.offset(0xE54538).readPointer(), x);
                    y++;
                }
                for (var x in cache.DebugButtons) {
                    if (cache.DebugButtons[x].cat == null) {
                        cache.DebugButtons[x].ins.add(32).writeFloat((Libg.offset(0xE604D8).readInt() / 2400) * 1100); // x
                        cache.DebugButtons[x].ins.add(36).writeFloat((y * 55) + 100); // y
                        Libg.Stage_addChild(Libg.offset(0xE54538).readPointer(), cache.DebugButtons[x].ins);
                        y++;
                    }
                    
                }
            }
            
        },
        closeCategoryAndButtons() {
            for (var x of cache.DebugCategory) {
                Libg.Stage_removeChild(Libg.offset(0xE54538).readPointer(), x);
            }
            for (var x in cache.DebugButtons) {
                Libg.Stage_removeChild(Libg.offset(0xE54538).readPointer(), cache.DebugButtons[x].ins);
            }
            //Libg.Stage_removeChild(Libg.offset(0xE54538).readPointer(), cache.incataloginstance);
        },
        closeInCategory() {
            Debug.closeCategoryAndButtons()
            if (cache.incataloginstance) Libg.Stage_removeChild(Libg.offset(0xE54538).readPointer(), cache.incataloginstance);
            cache.incataloginstance = null
        },
        openCategory(category, name) {
            cache.incataloginstance = DebugMenuBase.createCategory(name)
            var y = 0;
            cache.incataloginstance.add(32).writeFloat((Libg.offset(0xE604D8).readInt() / 2400) * 1100); // x
            cache.incataloginstance.add(36).writeFloat((y * 55) + 100); // y
            Libg.Stage_addChild(Libg.offset(0xE54538).readPointer(), cache.incataloginstance);
            y++;
            for (var x in cache.DebugButtons) {
                if (cache.DebugButtons[x].cat == category) {
                    cache.DebugButtons[x].ins.add(32).writeFloat((Libg.offset(0xE604D8).readInt() / 2400) * 1100); // x
                    cache.DebugButtons[x].ins.add(36).writeFloat((y * 55) + 100); // y
                    Libg.Stage_addChild(Libg.offset(0xE54538).readPointer(), cache.DebugButtons[x].ins);
                    y++;
                }
                
            }
        },
        onClickListener() {
            //4585C8
            cache.onClickListener = Interceptor.attach(Libg.offset(0x4585C8), {
                onEnter(args) {
                    var a1 = args[0]
                    try {
                        if (a1.toInt32() == cache.DebugCategory[0].toInt32()) {
                                Debug.closeCategoryAndButtons()
                                Debug.openCategory("Account", LanguageLogic.getString("Account"))
                                return;
                        }
                        /*if (a1.toInt32() == cache.DebugCategory[1].toInt32()) {
                            Debug.closeCategoryAndButtons()
                            Debug.openCategory("Preview", "Preview")
                            return;
                        }*/
                        if (a1.toInt32() == cache.DebugCategory[1].toInt32()) {
                            Debug.closeCategoryAndButtons()
                            Debug.openCategory("Battle", LanguageLogic.getString("Battle"))
                            return;
                        }
                        if (a1.toInt32() == cache.DebugCategory[2].toInt32()) {
                            Debug.closeCategoryAndButtons()
                            Debug.openCategory("Brawl Pass", "Brawl Pass")
                            return;
                        }
                        if (a1.toInt32() == cache.DebugCategory[3].toInt32()) {
                            Debug.closeCategoryAndButtons()
                            Debug.openCategory("GFX", LanguageLogic.getString("GFX"))
                            return;
                        }
                        if (cache.incataloginstance) {
                            if (a1.toInt32() == cache.incataloginstance.toInt32()) {
                                Debug.closeInCategory()
                                var y = 0;
                                for (var x of cache.DebugCategory) {
                                    x.add(32).writeFloat((Libg.offset(0xE604D8).readInt() / 2400) * 1100); // x
                                    x.add(36).writeFloat((y * 55) + 100); // y
                                    Libg.Stage_addChild(Libg.offset(0xE54538).readPointer(), x);
                                    y++;
                                }
                                for (var x in cache.DebugButtons) {
                                    if (cache.DebugButtons[x].cat == null) {
                                        cache.DebugButtons[x].ins.add(32).writeFloat((Libg.offset(0xE604D8).readInt() / 2400) * 1100); // x
                                        cache.DebugButtons[x].ins.add(36).writeFloat((y * 55) + 100); // y
                                        Libg.Stage_addChild(Libg.offset(0xE54538).readPointer(), cache.DebugButtons[x].ins);
                                        y++;
                                    }
                                    
                                }
                                return;
                            }
                        }
                        /*for (var button in cache.DebugButtons) {
                            if (a1.toInt32() == cache.DebugButtons[button].ins.toInt32()) {
                                //button.onPressed()
                                return;
                            }
                        }*/

                        if (a1.toInt32() == cache.DebugButtons[0].ins.toInt32()) {
                            FloaterText.show(LanguageLogic.getString("VIP"),-1)
                            return;
                        }
                        if (a1.toInt32() == cache.DebugButtons[1].ins.toInt32()) {
                            reloadGame()
                            return;
                        }
                        if (a1.toInt32() == cache.DebugButtons[2].ins.toInt32()) {
                            var age = malloc(30)
                            new NativeFunction(Libg.offset(0x74FBC4), 'void', ['pointer','int'])(age, 23)
                            new NativeFunction(Libg.offset(0x702708), 'void', ['pointer','pointer'])(new NativeFunction(Libg.offset(0x701CC8), 'pointer', [])(),age)
                            FloaterText.show(LanguageLogic.getString("SetAgeSuccess"), 0xFFFFFFFF)
                            return;
                        }
                        if (a1.toInt32() == cache.DebugButtons[3].ins.toInt32()) {
                            ModConfig.ShowBrawlers = !ModConfig.ShowBrawlers
                            FloaterText.show(LanguageLogic.getString(ModConfig.ShowBrawlers ? "ShowBrawlerON" : "ShowBrawlerOFF"), 0xFFFFFFFF)
                            Libg.offset(0x5A53A8).writeU8(232)
                            WriteToFile(savefile, "w", FormatJSONString(ModConfig));
                            reloadGame()
                            //Libg.offset(0x5A53B4).writeByteArray([0x21,0x1A,0x00,0x54])
                            return;
                        }
                        if (a1.toInt32() == cache.DebugButtons[4].ins.toInt32()) {
                            ModConfig.AntiOutOfSync = !ModConfig.AntiOutOfSync
                            FloaterText.show(LanguageLogic.getString(ModConfig.AntiOutOfSync ? "AntiOutOfSyncON" : "AntiOutOfSyncOFF"), 0xFFFFFFFF)
                            WriteToFile(savefile, "w", FormatJSONString(ModConfig));
                            return;
                        }
                        if (a1.toInt32() == cache.DebugButtons[5].ins.toInt32()) {
                            ModConfig.SkinChanger = !ModConfig.SkinChanger
                            ModConfig.AntiOutOfSync = !ModConfig.AntiOutOfSync
                            WriteToFile(savefile, "w", FormatJSONString(ModConfig));
                            //reloadGame()
                            NativeDialogManager.ShowDialog("Mod activated", "game is closing at 5 sec\nPlease reopen game","","","")
                            setTimeout(()=> {
                                exit()
                            },5000)
                            return;
                        }
                        if (a1.toInt32() == cache.DebugButtons[6].ins.toInt32()) {
                            ModConfig.UnlimitedSpectator = !ModConfig.UnlimitedSpectator
                            WriteToFile(savefile, "w", FormatJSONString(ModConfig));
                            FloaterText.show(LanguageLogic.getString(ModConfig.UnlimitedSpectator ? "UmlimitedSpectatorON" : "UmlimitedSpectatorOFF"), 0xFFFFFFFF)
                        }
                        if (a1.toInt32() == cache.DebugButtons[7].ins.toInt32()) {
                            Libg.offset(0x182982).writeUtf8String(LanguageLogic.getString("SpectateMenu"))
                            Libg.offset(0x1983C6).writeUtf8String(LanguageLogic.getString("EnterTag"))
                            
                            var testt = malloc(408);
                            console.log("1");
                            new NativeFunction(Libg.offset(0x5A8A78), "pointer", ["pointer"])(testt);
                            console.log("2");
                            var inst = Libg.offset(0xE4D5F8).readPointer()
                            console.log("3");
                            new NativeFunction(Libg.offset(0x453D3C), "pointer", ["pointer","pointer","int","int","int"])(inst, testt, 1,0,1)
                            console.log("4");
                            SpectateOnClickCheck = true
                            Libg.offset(0x182982).writeUtf8String("TID_TEAM_SEARCH_POPUP_TITLE")
                            Libg.offset(0x1983C6).writeUtf8String("TID_TEAM_JOIN_ROOM_CODE")
                        }
                        if (a1.toInt32() == cache.DebugButtons[8].ins.toInt32()) {
                            ModConfig.BrawlTVSpectate = !ModConfig.BrawlTVSpectate
                            WriteToFile(savefile, "w", FormatJSONString(ModConfig));
                            FloaterText.show(LanguageLogic.getString(ModConfig.BrawlTVSpectate ? "BrawlTVSpectateON" : "BrawlTVSpectateOFF"), 0xFFFFFFFF)
                        
                        }
                        if (a1.toInt32() == cache.DebugButtons[9].ins.toInt32()) {
                            ModConfig.ChromaticName = !ModConfig.ChromaticName
                            WriteToFile(savefile, "w", FormatJSONString(ModConfig));
                            const LogicDailyData_isBrawlPassPremiumUnlocked = new NativeFunction(Libg.offset(0x8379E8), 'int', ['pointer']);
                            if ( ModConfig.ChromaticName ) {
                                //8379E8
                                Interceptor.replace(LogicDailyData_isBrawlPassPremiumUnlocked, new NativeCallback(function() {
                                    return 1;
                                }, 'int', []));
                                FloaterText.show(LanguageLogic.getString("RenkliİsimAktif"), 0xFFFFFFFF)
                                setTimeout(()=>{
                                    reloadGame()
                                },1000)
                            } else {
                                Interceptor.revert(LogicDailyData_isBrawlPassPremiumUnlocked)
                                FloaterText.show(LanguageLogic.getString("RenkliİsimDeaktif"), 0xFFFFFFFF)
                                setTimeout(()=>{
                                    reloadGame()
                                },2000)
                            }
                        }
                        if (a1.toInt32() == cache.DebugButtons[10].ins.toInt32()) {
                            console.log("abc")
                            ModConfig.FpsIndicator = !ModConfig.FpsIndicator
                            WriteToFile(savefile, "w", FormatJSONString(ModConfig));
                            if (ModConfig.FpsIndicator == true) {
                                Libg.Stage_addChild(Libg.offset(0xE54538).readPointer(), cache.FpsIndicator);
                                FloaterText.show(LanguageLogic.getString("FPS_ON"), 0xFFFFFFFF)
                            } else {
                                Libg.Stage_removeChild(Libg.offset(0xE54538).readPointer(), cache.FpsIndicator);
                                FloaterText.show(LanguageLogic.getString("FPS_OFF"), 0xFFFFFFFF)
                            }
                        }
                        if (a1.toInt32() == cache.DebugButtons[11].ins.toInt32()) {
                            ModConfig.OutlineMod = !ModConfig.OutlineMod
                            WriteToFile(savefile, "w", FormatJSONString(ModConfig));
                            reloadGame()
                            
                        }
                        if (a1.toInt32() == cache.DebugButtons[12].ins.toInt32()) {
                            ModConfig.SideMask = !ModConfig.SideMask
                            WriteToFile(savefile, "w", FormatJSONString(ModConfig));
                            
                            if (ModConfig.SideMask == true) {
                                Libg.offset(0x186F22).writeUtf8String("laser_screen_mask");
                                FloaterText.show(LanguageLogic.getString("SideMaskOFF"), 0xFFFFFFFF)
                            } else {
                                Libg.offset(0x186F22).writeUtf8String("empty");
                                FloaterText.show(LanguageLogic.getString("SideMaskON"), 0xFFFFFFFF)
                            }
                        }
                        if (a1.toInt32() == cache.DebugButtons[13].ins.toInt32()) {
                            ModConfig.RangeMod = !ModConfig.RangeMod
                            //ModConfig.AntiOutOfSync = !ModConfig.AntiOutOfSync
                            WriteToFile(savefile, "w", FormatJSONString(ModConfig));
                            //reloadGame()
                            NativeDialogManager.ShowDialog("Mod activated", "game is closing at 5 sec\nPlease reopen game","","","")
                            setTimeout(()=> {
                                exit()
                            },5000)
                            return;
                        }
                        if (a1.toInt32() == cache.debugButton.toInt32()) {
                            Debug.debugButtonPressed()
                            return;
                        }
                              
                    } catch (e) {
                        console.log(JSON.stringify(e));
                        console.log(e.stack)
                    }
                }
                
            });
        },
        Fps() {
            var testtext = malloc(400)
                Libg.Sprite_Sprite(testtext, 1)
                var movieClip = Libg.ResourceManager_getMovieClip("sc/debug.sc".ptr(), "debug_menu_text".ptr());
                new NativeFunction(Libg.offset(0x458FB8), 'void', [
                    'pointer',
                    'pointer'
                ])(testtext, movieClip)
        
                testtext.add(32).writeFloat(50); //x
                testtext.add(36).writeFloat(50); //y
        
                return testtext;
        }
    }
    function reloadGame() {
        if (DebugConfig.isDebugOpened) {
            DebugConfig.isDebugOpened = !DebugConfig.isDebugOpened
            Libg.Stage_removeChild(Libg.offset(0xE54538).readPointer(), cache.debugMenu)

            for (var x of cache.DebugCategory) {
                Libg.Stage_removeChild(Libg.offset(0xE54538).readPointer(), x);
            }
            for (var x in cache.DebugButtons) {
                Libg.Stage_removeChild(Libg.offset(0xE54538).readPointer(), cache.DebugButtons[x].ins);
            }
            Debug.closeCategoryAndButtons()
            Debug.closeInCategory()
            Libg.Stage_removeChild(Libg.offset(0xE54538).readPointer(), cache.FpsIndicator);
            
        }
        Libg.Stage_removeChild(Libg.offset(0xE54538).readPointer(), cache.debugButton);
        
        new NativeFunction(Libg.offset(0x3A4D8C), 'void', ['pointer'])(Libg.offset(0xE4AAB0).readPointer())

    }
    const GamePatch = {
        init() {
            Libg.offset(HomePageIsProd1).writeByteArray([0x00,0x00,0x80,0x52]);
            Libg.offset(HomePageIsProd2).writeByteArray([0x00,0x00,0x80,0x52]);
            Libg.offset(SettingsSceenIsDeveloper).writeByteArray([0x20,0x00,0x80,0x52]);

            var addfile = Libg.offset(0x94AEC8)
            var ResourceListener_addFile = new NativeFunction(addfile, 'void', [
                'pointer',
                'pointer'
            ])
            var addfileattach = Interceptor.attach(addfile, {
                onEnter(args) {
                    addfileattach.detach();
                    ResourceListener_addFile(args[0], 'sc/debug.sc'.scptr());
                    console.log("debug.sc loaded")
                    
                }
            });

            Interceptor.attach(Libg.offset(0x74E938),{
                onEnter(a) {
                    if (ModConfig.AntiOutOfSync) {
                        return 0
                    }
                    return 506
                }
            })
            //working
            Interceptor.attach(Libg.offset(0x912F84),{
                onEnter(args) {
                    //console.log(args[0])
                    if (cache.FpsIndicator) {
                        //fpsyi sürekli güncellemek için
                        var instance = Libg.offset(0xE4AAB0).readPointer()
                        var fps = 0;
                        var v1 = instance.add(608).readInt();
                        if (v1 >= 1) {
                            var v2 = instance.add(604).readFloat();
                            fps = v2/v1;
                        }
                        Libg.movieClipsettext(cache.FpsIndicator, "Text".ptr(), `\n\nFPS: ${fps.toFixed(0)}`.scptr())
                    }
                    if (ReadStringFromStringObject(args[1]).includes("Server:")) {
                        args[1] = "<cff1717>T<cff2e2e>ü<cff4545>r<cff5c5c>k<cff7373> <cff8b8b>S<cffa2a2>t<cffb9b9>a<cffd0d0>r<cffe7e7>s<cffffff> <cffe7e7>(<cffd0d0>t<cffb9b9>s<cffa2a2>m<cff8b8b>o<cff7373>d<cff5c5c>.<cff4545>x<cff2e2e>y<cff1717>z<cff0000>)</c>\n<cff1919>v<cff3232>5<cff4c4c>6<cff6565>.<cff7f7f>2<cff9898>7<cffb2b2>4<cfecbcb> <cffe5e5>(<cfffefe>s<cffe5e5>c<cffcccc>r<cffb2b2>i<cff9999>p<cff7f7f>t<cff6666>:<cff4c4c> <cfe3333>7<cff1919>2<cff0303>)</c>\n<cff1f1f>d<cff3f3f>i<cff5f5f>s<cff7f7f>c<cff9f9f>o<cffbfbf>r<cffdfdf>d<cffffff>.<cffdfdf>g<cffbfbf>g<cff9f9f>/<cff7f7f>t<cff5f5f>s<cff3f3f>m<cff1f1f>o<cff0000>d</c>\n<cff3232>t<cff6565>.<cff9898>m<cffcbcb>e<cffffff>/<cffcccc>b<cff9999>s<cff6666>m<cff3333>t<cff0101>r</c>".scptr()
                    }
                }
            })
            Interceptor.attach(Libg.offset(NativeFont_formatString),{
                onEnter(args) {
                    args[4] = ptr(1)
                }
            })

            var StringTablegetString = new NativeFunction(Libg.offset(StringTable_getString), 'pointer', ['pointer'])
            Interceptor.replace(StringTablegetString, new NativeCallback(function(a1) { //string table
                    var str = Memory.readUtf8String(a1);
                    if (str === "TID_ABOUT") {
                        return StringTablegetString(LanguageLogic.getString("AboutText").ptr());
                    }
                    if (str === "TID_CONNECTING_TO_SERVER") {
                        return StringTablegetString(newConnectingToServerText.ptr());
                    }
                    
                    return StringTablegetString(a1);
            }, 'pointer', ["pointer"]));


            //const RecvMessage = new NativeFunction(Libg.offset(MessageManager_receiveMessage), "pointer", ["pointer", 'pointer']);
            Interceptor.attach(Libg.offset(MessageManager_receiveMessage), {
                onEnter(args) {
                    var a1 = args[0]
                    var a2 = args[1]
                    var messageType = new NativeFunction(Memory.readPointer(Memory.readPointer(a2).add(40)), "int", ["pointer"])(a2);
                    if (messageType === 20104) {
                        LanguageLogic.init()
                        Debug.createDubugButton()
                        setTimeout(()=>{
                            FloaterText.show(LanguageLogic.getString("Welcome"),0xFFFFFFFF)
                            NativeDialogManager.ShowDialog("Türk Stars v56.274","Debug Menu: demircnq and mystindevfox\ndiscord.gg/tsmod & t.me/bsmtr & tsmod.xyz","","Close", "");
                        },1000)
                        
                        
                    }
                    if (messageType === 20103) {
                        var errcode = a2.add(144).readInt();
                        switch(errcode) {
                            case 8:
                                a2.add(192).writePointer(LanguageLogic.getString("UpdateMessage").scptr());
                                a2.add(184).writePointer('https://discord.gg/tsmod'.scptr());
                                break;
                        }
                    }
                    if (messageType == 24109) {
                        var message = a2;
                        if (ModConfig.UnlimitedSpectator) {
                            message.add(164).writeInt(message.add(152).readInt()); 
                            message.add(168).writeInt(1);  // brawl tv
                        }
                        
                    }
                }
            });

            const settingOnClicked = new NativeFunction(Libg.offset(SettingsScreen_buttonClicked), "pointer", ["pointer", 'pointer']);

            Interceptor.replace(settingOnClicked, new NativeCallback(function(a1, a2) {
                if (a1.add(344).readPointer().equals(a2)) {
                    console.log("OpenUrl")
                    NativeDialogManager.ShowDialog(LanguageLogic.getString("DonateTitle"), LanguageLogic.getString("DonateMessage"), "<3","","")
                    //Thread.sleep(2)
                    setTimeout(()=> {
                        Libg.open("https://buymeacoffee.com/demir5016".scptr())
                    }, 1000)
                } else return settingOnClicked(a1,a2)
            }, "pointer", ["pointer", "pointer"]))

            var String = new NativeFunction(Libg.offset(String_Ctor), 'pointer', ['pointer','pointer'])
            Interceptor.replace(String, new NativeCallback(function(a1,a2) {
                    var str = Memory.readUtf8String(a2);
                    if (str === "LATENCY TESTS") {
                        return String(a1,LanguageLogic.getString("DONATEME").ptr());
                    }
                    return String(a1, a2);
            }, 'pointer', ["pointer","pointer"]));

            const CustomButton_setButtonListener = new NativeFunction(Libg.offset(CustomButton_setButtonListenerCtor), 'void', ['pointer', 'pointer']);
            const PlayerInfo_refreshPlayerHeader = new NativeFunction(Libg.offset(PlayerInfo_refreshPlayerHeaderCtor), 'void', ['pointer']);
            const DropGUIContainer_addGameButton = new NativeFunction(Libg.offset(DropGUIContainer_addGameButtonCtor), 'pointer', ['pointer', 'pointer', 'int']);
            const CopyString = new NativeFunction(Libg.offset(0x9E1B0C), 'void', ['pointer']) //copy code '%s' to clipboard
            



            Interceptor.attach(Libg.offset(0x549964), { //TID_ERROR_SPECTATE_NOT_POSSIBLE
                onEnter(args) {
                    if (SpectateOnClickCheck == true) {
                        SpectateOnClickCheck = false
                    }
                    
                }
            });
            var onclick = new NativeFunction(Libg.offset(0x5A8EC8), "pointer", ["pointer","pointer","int"]);
            Interceptor.replace(Libg.offset(0x5A8EC8), new NativeCallback(function (a1, a2,a3) {
                console.log("test");
                console.log(a3)
                if (a3 == 1 && SpectateOnClickCheck == true) {
                    //ID alma ve izlemeyi kodla
                    var tag = new NativeFunction(Libg.offset(0x918030), 'pointer', [
                        'pointer',
                    ])(a1.add(392).readPointer())
                    tag = ReadStringFromStringObject(tag);
                    if (tag.startsWith("X")) {
                        SpectateOnClickCheck = false
                        onclick(a1,a2,a3);
                    } else {
                        console.log(tag)
                        var id = malloc(8)
                        new NativeFunction(Libg.offset(0x88D014), 'pointer', ['pointer'])(id); // güncellendi
                        var newid = new NativeFunction(Libg.offset(0x88D0A0), 'pointer', ['pointer','pointer'])(id, tag.scptr()); // güncellendi
                        var StartSpectateMessageFunc = new NativeFunction(Libg.offset(StartSpectateMessage), 'pointer', ['pointer','pointer', 'bool']);
                        var paket = malloc(150)
                        StartSpectateMessageFunc(paket, newid, ModConfig.BrawlTVSpectate ? 1:0)
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

            var LogicSkinData_createReferences = new NativeFunction(Libg.offset(0x7AE7E0), 'void', ['pointer']);
            Interceptor.replace(LogicSkinData_createReferences, new NativeCallback(function (a1) {
        
                LogicSkinData_createReferences(a1);
                ModConfig.OutlineMod && a1.add(120).writeByteArray('shader/impostor'.scptr().readByteArray(16));
        
            }, 'void', ['pointer']));

            
        }
    }
    const Protection = {
        init() {
            //todo: add custom protection in there
        },
        bypass() {
            //bypass for supercells protection
            Interceptor.replace(Libg.offset(0x8B1E64), new NativeCallback(function() { //AntiCheat::getAntihackFlags
                return 0;
            }, 'int', []));

            const libName = "libironsource-ads.so";

            Interceptor.replace(Module.findExportByName(libName, "_ZN10ironsource11setMetadataEPKcS1_"), new NativeCallback(function() {}, "void", []));
            Interceptor.replace(Module.findExportByName(libName, "_ZN10ironsource5startEPKcbbS1_"), new NativeCallback(function() {}, "void", []));
            Interceptor.replace(Module.findExportByName(libName, "_ZN10ironsource13isAdAvailableEv"), new NativeCallback(function() {
                return 0;
            }, "bool", []));
        }
    }
    const InitScript = {
        init() {
            Interceptor.detachAll()
            Process.setExceptionHandler(function (err) {
                //console.log('APP CRASH!')
                //if (err.address.includes("libg")) {
                    //console.log(err.address.sub(Libg.base))
                    //console.log('ADDR: ' + DebugSymbol.fromAddress(err.address))
                    //console.log('LR: ' + DebugSymbol.fromAddress(err.context.lr))
                //}
                return 0;
            });
            Libg.init()
            GamePatch.init()
            Debug.init()
            //NativeDialogManager.ShowDialog("", "", "","","")
                    
        }
    }
    rpc.exports.init = InitScript.init()
    console.log("Script ended");
} catch (e) {
    console.log(e.stack)
}