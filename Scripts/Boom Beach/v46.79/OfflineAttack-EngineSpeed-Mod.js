const Mod = {
        init() {
            console.log("\nStarting Mod...");
            Mod.offlineAttack();
        },
        offlineAttack(){
            var context = Java.use('android.app.ActivityThread').currentApplication().getApplicationContext();
            var toast = Java.use("android.widget.Toast");
            var mToast = toast.makeText(context,Java.use("java.lang.String").$new(""),0);
            var isModActive = false
            var countModState = 0
            var modSwitch = 0
            var originalBytes = Libg.offset(0x663A40).readByteArray(4)
            var replacedDialog = false
            var countMessageSend = 0
            var replacedTime = false
            var multipleClick = 0
            var tempenergy = 0
            var fakePacketAllow = false
            var pthread = 0
            var messageId = 0
            var fakePacket = 0;

            var messagingSendPtr = Libg.offset(0x2B2964)
            var fmessagingSend = new NativeFunction(messagingSendPtr, "int", ["pointer", "pointer"]);

            // Disable home data caching
            Armceptor.jumpout(Libg.offset(0x9D92F4),Libg.offset(0x9D9304))
            Armceptor.nop(Libg.offset(0x9D9300))
            Armceptor.jumpout(Libg.offset(0x9D9314),Libg.offset(0x9D9358))
            Armceptor.nop(Libg.offset(0x9D9360))
            Armceptor.nop(Libg.offset(0x9D9370))
            Armceptor.nop(Libg.offset(0x9D937C))

            // Mod activation via SFX button
            Interceptor.attach(Libg.offset(0x256FA0), {
                onEnter(args){
                },
                onLeave(retval){
                    if (retval == 0 && modSwitch == 0){
                        modSwitch = 1
                        countModState++
                        if (!isModActive && countModState == 1){
                            isModActive = true
                            Armceptor.jumpout(Libg.offset(0x663A40), Libg.offset(0x663AF0));
                            Java.scheduleOnMainThread(function() {
                                mToast.setText(Java.use("java.lang.String").$new("Mod enabled (players)"))
                                mToast.show()
                            });
                        } else if (isModActive && countModState == 2) {
                            Armceptor.jumpout(Libg.offset(0x663A40), Libg.offset(0x6633B0));
                            Java.scheduleOnMainThread(function() {
                                mToast.setText(Java.use("java.lang.String").$new("Mod enabled (npcs)"))
                                mToast.show()
                            });
                        } else {
                            isModActive = false
                            countModState = 0
                            Armceptor.replace(Libg.offset(0x663A40), originalBytes);
                            Interceptor.revert(Libg.offset(0x9d92d8))
                            replacedEndBattle = false
                            replacedTime = false
                            Java.scheduleOnMainThread(function() {
                                mToast.setText(Java.use("java.lang.String").$new("Mod disabled"))
                                mToast.show()
                            });
                        }
                    } else if (retval == 1) {
                        modSwitch = 0
                    }
                }
            })

            // Disable Desync Native Diolog
            Interceptor.attach(Libg.offset(0x1e2dcc), {
                onEnter(args){
                    console.log("code: "+args[1])
                    if (args[1] == 0x7){
                        console.log("\n** Client is desynced **\n") 
                    } 
                    if ((args[1] == 0x7 || args[1] == 0x2) && !replacedDialog && isModActive){
                        Interceptor.replace(Libg.offset(0x1e2dcc), new NativeCallback(function() {
                            return 1;
                        }, 'int', []));
                        replacedDialog = true
                    }
                    else if ((args[1] != 0x7 && args[1] != 0x2) && replacedDialog && isModActive){
                        Interceptor.revert(Libg.offset(0x1e2dcc))
                        replacedDialog = false
                    }
                }
            })

            // Controls which and when packets are sent to the server
            Interceptor.attach(Libg.offset(0x2B2964), {
                onEnter(args){
                    let code = String(args[1].readPointer()).slice(7)
                    if (pthread == 0 && code == "2e4"){
                        pthread++
                    }
                    if (pthread == 1 && code == "2e4"){
                        pthread = Memory.dup(args[0], 4096)
                        messageId = Memory.dup(args[1], 4096)
                    }
                    
                    if (code == "2e4" && fakePacketAllow){
                        fakePacketAllow = false
                        Interceptor.revert(Libg.offset(0x2B2964))
                    } 
                    if(countMessageSend == 1){
                        Interceptor.replace(Libg.offset(0x2B2964), new NativeCallback(function(){
                            console.log("replaced")
                            return 1
                        }, 'int', []))
                        countMessageSend = 2
                        console.log("test1")  
                    }
                    if (isModActive && (code == "6e4" || code == "a64" || code == "480")){
                        countMessageSend = 1
                        fakePacketLoop(0)
                        console.log("test2")    
                    }
                    console.log(String(args[1].readPointer()))
                },
                onLeave(retval){
                    
                }
            })

            // It sends fake KeepAlive packets in loop
            function fakePacketLoop(command){
                if (command == 0){
                    fakePacket = setInterval(function(){
                        fakePacketAllow = true
                        fmessagingSend(pthread, messageId)
                        Interceptor.replace(Libg.offset(0x2B2964), new NativeCallback(function(){
                            console.log("replaced")
                            return 1
                        }, 'int', []))
                    }, 5000)
                }else{
                    clearInterval(fakePacket);
                }
                
            }
            
            // Constorls when to stop the KeepAlive loop
            Interceptor.attach(Libg.offset(0x9d92d8), {
                onEnter(args){
                    tempenergy = 0
                    console.log(countMessageSend)
                    if (countMessageSend == 2 && isModActive){
                        replacedTime = false
                        countMessageSend = 0
                        multipleClick == 0
                        fakePacketLoop(1)
                        Interceptor.revert(Libg.offset(0x2B2964))
                        Interceptor.revert(Libg.offset(0x18e060))       
                    }
                },
                onLeave(retval){
                }
            })

            // Stops game engine when clicking the retreat button, for default behaviour click 4 times fast.
            Interceptor.attach(Libg.offset(0x18e060), {
                onEnter(args){
                    if (timeCount == 777){
                        timeCount = 0
                    }
                    else if (timeCount == 0 && isModActive){
                        timeCount++
                        changeSpeed(1)
                        if ((new Date().getTime() - timeClick) <= 350){
                            timeClick = new Date().getTime()
                            multipleClick++
                            if (multipleClick == 3){
                                Interceptor.revert(Libg.offset(0x18e060))
                                replacedTime = false
                                changeSpeed(0);
                                timeCount = 777
                                multipleClick = 0
                            }
                        }
                        timeClick = new Date().getTime()
                        if (!replacedTime){
                            replacedTime = true
                            Interceptor.replace(Libg.offset(0x18e060), new NativeCallback(function() {
                                return 1;
                            }, 'int', []));
                        }     
                        
                    }else{
                        timeCount = 0
                        if ((new Date().getTime() - timeClick) <= 350){
                            timeClick = new Date().getTime()
                            multipleClick++
                            if (multipleClick == 3){
                                Interceptor.revert(Libg.offset(0x18e060))
                                replacedTime = false
                                timeCount = 777
                                multipleClick = 0
                            }
                        }
                        timeClick = new Date().getTime()
                        changeSpeed(0)       
                    }
                    
                },
                onLeave(retval){
                }
            })

            // Used by the code above, changes values to modify the engine speed.
            function changeSpeed(option){
                if (option == 0){
                    Memory.protect(Libg.offset(0x7198E4), 32, "rwx");
                    Memory.writeByteArray(Libg.offset(0x7198E4), [0xFE, 0x05, 0xA0, 0xE3, 0x28, 0x01, 0x8A, 0xE5, 0x4A, 0x0A, 0x9A, 0xED]);
                    Memory.protect(Libg.offset(0x7198E4), 32, "rx");
                }else if(option == 1){
                    Memory.protect(Libg.offset(0x7198E4), 32, "rwx");
                    Memory.writeByteArray(Libg.offset(0x7198E4), [0xF7, 0x05, 0xA0, 0xE3, 0x28, 0x01, 0x8A, 0xE5, 0x4A, 0x0A, 0x9A, 0xED]);
                    Memory.protect(Libg.offset(0x7198E4), 32, "rx");
                }else if(option == 2){
                    Memory.protect(Libg.offset(0x7198E4), 32, "rwx");
                    Memory.writeByteArray(Libg.offset(0x7198E4), [0x00, 0x00, 0xA0, 0xE3, 0x28, 0x01, 0x8A, 0xE5, 0x4A, 0x0A, 0x9A, 0xED]);
                    Memory.protect(Libg.offset(0x7198E4), 32, "rx");
                }else if(option == 3){
                    Memory.protect(Libg.offset(0x7198E4), 32, "rwx");
                    Memory.writeByteArray(Libg.offset(0x7198E4), [0x41, 0x04, 0xA0, 0xE3, 0x28, 0x01, 0x8A, 0xE5, 0x4A, 0x0A, 0x9A, 0xED]);
                    Memory.protect(Libg.offset(0x7198E4), 32, "rx");
                }
            }
        }   
    }
