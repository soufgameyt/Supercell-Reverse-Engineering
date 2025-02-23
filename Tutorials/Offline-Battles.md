# Offline Battles Guide

If you can't make online battles, there's a second solution:

**Offline Battles!**

### How do we enable it?
It's easy! Just patch the fourth argument and change it to `3`.

You can use this code to enable it:

```javascript
Interceptor.attach(base.add(HomePage::startGame), {
    onEnter: function(args) {
        args[3] = ptr(3);
    }
});
```

And there you have it!

---

### How do we find the `HomePage::startGame` function in IDA Pro?

It's very easy again! Just search for the string: `"TID_MATCHMAKE_FAILED_15"`.

If you don't know how to find a string, it's simple:

1. Go to `View > Open subviews > Strings`.
2. Here’s an example image:
   ![String Search](https://github.com/soufgameyt/Supercell-Reverse-Engineering/blob/53b65e124ba3aebe037c426e22b8c24455bc329a/Images/Capture%20d%E2%80%99e%CC%81cran%202025-02-23%20a%CC%80%2023.08.33.png?raw=true)

3. Once you find the string, click on the yellow text. For example, in the image, it's `.str.85_c5d0ab59_de2c_446f_a430_563f8653b1ef_8559`.
4. Press **X** on it to open xrefs.

Here’s an example image:
![Xrefs](https://github.com/soufgameyt/Supercell-Reverse-Engineering/blob/main/Images/Capture%20d%E2%80%99e%CC%81cran%202025-02-23%20a%CC%80%2023.13.49.png?raw=true)

5. Click on the first function and press **F5** to decompile it.
6. Scroll to the top of the decompiled code and copy the `sub_xxxxxx` function name.

Example image:
![Sub Function](https://github.com/soufgameyt/Supercell-Reverse-Engineering/blob/main/Images/Capture%20d%E2%80%99e%CC%81cran%202025-02-23%20a%CC%80%2023.16.21.png?raw=true)

> **Note:** If the image doesn’t show a `sub_xxxxxx` function, it's because the screenshot was taken on v36 debug symbols, where function names are available. However, in your library, function names won’t be present, so it will be a `sub_xxxxxx` reference.

7. Once you have the `sub_xxxxxx`, replace `HomePage::startGame` in the original code with the `sub_xxxxxx` you found.

```javascript
Interceptor.attach(base.add(0x58ABA8), { // Convert to 0x0. For example, if the sub is `sub_58ABA8`, convert it to `0x58ABA8`
    onEnter: function(args) {
        args[3] = ptr(3);
    }
});
```

And that's it! You now have offline battles for your private server.

> **Reminder:** After version 29, many Brawlers are broken.
