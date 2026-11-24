# Cordova Wake Word Example

[License](LICENSE) · [Model and Voice Asset Notice](MODEL_NOTICES.md)

A minimal Android and iOS example for [`cordova-wake-word`](https://www.npmjs.com/package/cordova-wake-word), an on-device wake word, hotword, and keyword detection plugin for Cordova and Capacitor.

The example loads `hey_lookdeep.dm`, creates a native detector with a `0.99` threshold and buffer count of `2`, and then destroys it. The same `.dm` model is used on Android and iOS.

## More examples

- [example_car_agent](example_car_agent): an on-device voice assistant for a simulated car. It combines the wake word, speaker verification, speech to text, text to speech (`cordova-speech`) and an on-device agent (`cordova-voice2voice`).

## Requirements

- Node.js and npm
- Android Studio and an Android SDK for Android builds
- macOS, Xcode, and CocoaPods for iOS builds. The app targets iOS 15.1 or newer (`deployment-target` in `config.xml`), which the plugin's ONNX Runtime pod (`DaVoiceOnnxRuntime` 1.31.0) requires. If `pod install` can't find that pod, run `pod repo update` once.

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
"cordova-wake-word": "^0.2.0"
```

It does not use a local dependency or contain a copy of the native libraries or model files. ([example_car_agent](example_car_agent) bundles its own wake word and speaker verification models in `src/app/static/models`.)

## Custom wake words

Contact [DaVoice.io](https://davoice.io/) at `info@davoice.io` for custom wake word models and licensing.

## Learn more on davoice.io

- [What is a wake word? DaVoice on-device wake word detection](https://davoice.io/wake-word)
- [Wake word benchmark](https://davoice.io/wake-word-benchmark): two independent customer studies, DaVoice vs. commercial engines and openWakeWord
- [Complete guide to on-device wake word detection](https://davoice.io/wake-word-guide)
- [Wake word integration guides for every platform](https://davoice.io/integration-guides-wake-word)
- [On-device voice-to-voice AI agent SDK](https://davoice.io/voice-agent-sdk): wake word, speech to text, a local LLM with tool calling and text to speech, with no per-token API fees
- [On-device speech to text SDK](https://davoice.io/speech-to-text): real-time and offline, no per-minute fees
- [On-device text to speech SDK and TTS API](https://davoice.io/text-to-speech): natural voices and voice cloning, no per-character fees
- [Free online text to speech](https://davoice.io/free-text-to-speech): free and unlimited, with no sign-up, no login and no subscription. Natural AI voices in 11 languages, voice cloning, MP3 and WAV download, generated in your browser
- [Pricing](https://davoice.io/pricing): free license for proof-of-concept, academic and non-commercial projects
