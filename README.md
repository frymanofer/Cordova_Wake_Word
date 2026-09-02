# Cordova Wake Word Example

A minimal Android and iOS example for [`cordova-wake-word`](https://www.npmjs.com/package/cordova-wake-word), an on-device wake word, hotword, and keyword detection plugin for Cordova and Capacitor.

The example loads `hey_lookdeep.dm`, creates a native detector with a `0.99` threshold and buffer count of `2`, and then destroys it. The same `.dm` model is used on Android and iOS.

## Requirements

- Node.js and npm
- Android Studio and an Android SDK for Android builds
- macOS, Xcode, and CocoaPods for iOS builds

## Run the example

Install the dependencies from npm:

```bash
npm install
```

Prepare and run Android:

```bash
npx cordova platform add android
npx cordova run android
```

Prepare and run iOS:

```bash
npx cordova platform add ios
npx cordova run ios
```

The app must run on a supported device or simulator with microphone permission available. The plugin adds the native microphone declarations and the iOS usage description configured in `package.json`.

## Package installation

This repository consumes the published npm package:

```json
"cordova-wake-word": "^0.1.2"
```

It does not use a local dependency or contain a copy of the native libraries or model files.

## Custom wake words

Contact [DaVoice.io](https://davoice.io/) at `info@davoice.io` for custom wake word models and licensing.
