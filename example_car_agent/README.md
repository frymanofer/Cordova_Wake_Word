# DaVoice: AI Car Voice Agent (Cordova)

An on-device voice assistant for a car, built with Cordova. The whole voice pipeline runs on the phone:

- wake word detection ("Hey DaVoice"): [`cordova-wake-word`](https://www.npmjs.com/package/cordova-wake-word)
- speaker verification (optional voice signature): `cordova-wake-word`
- real-time speech to text and on-device text to speech: `cordova-speech`
- the DaVoice Automotive Agent, a small on-device language model that turns what was said into car actions: `cordova-voice2voice`

The car is **simulated** (the card on the screen). This example does not control a real vehicle.

It is the Cordova twin of the React Native car agent (`ReactNative_DaVoice/example_car_agent`): the car tools, the agent
setup, the follow-up questions, the spoken confirmations and the language packs are the same TypeScript modules
(`src/rn`), and only the screens are new (plain HTML and TypeScript, no framework).

## Flow

1. **Language**: pick the language for speech recognition, the voices and the replies. Each language is downloaded on
   first use (about 170 MB).
2. **Voice**: pick the voice that speaks the replies. Tap a voice to hear it.
3. **Voice signature** (optional): say five sentences. With a signature, the wake word and the agent respond only to
   you, and only you can unlock or open the doors. The signature is saved on the phone (`sv_enrollment.json` in the
   app's documents folder).
4. **Wake word**: say "Hey DaVoice", or tap **Open the car without the wake word**.
5. **Car**: speak a command: "open the windows", "set the temperature to 21", "turn on the seat heating", "I'm cold".
   The first start downloads the agent model (382 MB) and a pre-warmed state for your language (about 430 MB) in
   the background, so the first reply is fast.

**Back** returns to the wake word screen.

**Settings** (the gear, on every screen): how you and the agent take turns, the same choices as the React Native car
agent. Nothing changes until **Save**, and the choice is kept (`conversation_settings.json`).

- **Take turns** (default): listening pauses while the agent answers. **Interrupt**: talk over the agent to stop it
  (echo cancellation; experimental on Android).
- **Just talk** (default): after the first wake word, every request is heard without it. **Wake word**: say
  "Hey DaVoice" before each request; when the agent asks a question, answer without it.
- Each mode's timeouts: the silence that ends a request, how long to listen after the wake word, the follow-up
  window after a question, pre-fetch (keeps "Hey DaVoice, open the window" said in one breath), and the wake word as a
  stop word while the agent talks (off by default).
- **About → Privacy policy** opens https://davoice.io/privacy/car-agent.

The line under the chat shows what the agent does now ("Say “Hey DaVoice” before each request", "Listening… just
talk", "Answering… tap to stop"). Tap it to wake the conversation or to stop the agent.

## Requirements

- Node.js 20.17 or newer
- Android: Android Studio with the Android SDK, JDK 17, and Gradle on your `PATH` (Cordova Android uses it to create
  the Gradle wrapper). The app needs Android 8.0 (API 26) or newer.
- iOS: macOS with Xcode 16 or newer and CocoaPods. The app needs iOS 15.1 or newer.
- A real phone is best: the demo listens through the microphone the whole time. Without one, see
  [Testing without a microphone](#testing-without-a-microphone).
- About 1 GB of free space on the phone for one language pack, the agent model and its state.

## Run it

```bash
npm install
npm run build                      # bundles src/ into www/
npx cordova platform add android   # installs the three plugins listed in package.json
npx cordova run android
```

iOS:

```bash
npx cordova platform add ios
npx cordova run ios --device       # or open platforms/ios/App.xcworkspace in Xcode
```

After you change anything in `src/`, run `npm run build` again before `cordova run`.

`config.xml` sets the minimums the plugins need: `android-minSdkVersion` 26 and `deployment-target` 15.1. The speech
plugin also turns on `android:largeHeap` for the app, because the speech models are large.

Speech recognition's word lists (car words and "Hey DaVoice", for better recognition of the commands) are in
`src/stt_bias_conf` (synced from the React Native car agent). iOS reads them from the app bundle: `config.xml` adds them as iOS resource files. Android does not use them.

## Where to look

| What | Where | Plugin API |
| --- | --- | --- |
| App flow and screens | [src/app/app.ts](src/app/app.ts) | |
| License key, wake word model, thresholds | [src/app/config.ts](src/app/config.ts) | |
| Language pack download | `chooseLanguage()` and [src/rn/tts/languagePacks.ts](src/rn/tts/languagePacks.ts) | `DaVoiceSpeech.files.downloadFile` |
| Voices | `initVoices()`, `showVoiceScreen()` | `DaVoiceSpeech.initTTS`, `getAllVoices`, `changeVoice`, `speak` |
| Voice signature | `createSignature()` | `DaVoiceWakeWord.createSpeakerVerificationMicController` |
| Wake word | `ensureWakeWord()`, `showWakeWordScreen()` | `DaVoiceWakeWord.create`, `start`, `startWithSpeakers`, `keywordDetected` |
| Speech to text with speaker verification | `showCarScreen()`, `onHeard()` | `DaVoiceSpeech.initAll({ speakers })`, `onSpeechPartialResults`, `onSpeechResults` |
| Conversation modes (take turns / interrupt, wake word / just talk) | `conversation` in app.ts, [src/rn/conversation](src/rn/conversation) | `pauseSpeechRecognition`, `unPauseSpeechRecognition(-1, preFetchMs)`, `DaVoiceWakeWord.pause` / `resume` |
| Settings sheet | `openSettings()` | |
| The agent and the car tools | `warmUpModel()`, `runTurn()`, [src/rn/aichat/provider.ts](src/rn/aichat/provider.ts), [src/rn/car](src/rn/car) | `DaVoiceLLM` |
| The simulated car | [src/app/car.ts](src/app/car.ts), [src/rn/car/CarState.ts](src/rn/car/CarState.ts) | |

Pauses are gentle: speech recognition and the wake word pause and unpause (`pauseSpeechRecognition` /
`unPauseSpeechRecognition`, `DaVoiceWakeWord.pause({ stopMicrophone: false })` / `resume`) and the microphone keeps
running. While the agent speaks, recognition is paused so it does not hear itself (in the interrupt mode it stays on,
with echo cancellation, and only words the agent isn't saying stop it).

## Project layout

- `src/app/`: this app: screens, styles, `index.html` and the bundled models (`static/models`).
- `src/rn/`: the React Native car agent's logic, copied by `npm run sync:rn`. Do not edit these files here; change
  them in the React Native example and sync again.
- `src/shims/`: small adapters that give the shared modules the React Native APIs they import (`react-native`,
  `react-native-fs`, the DaVoice React Native packages) on top of the Cordova plugins.
- `src/local.config.ts`: your own settings, such as `GEMINI_API_KEY` for the `'gemini'` mode in
  `src/general_questions.config.ts`. `npm run build` creates it from `src/local.config.example.ts`, and git ignores it.
- `scripts/build.mjs`: bundles everything into `www/js/app.js` with esbuild.
- `scripts/sync_from_rn.mjs`: copies the React Native modules into `src/rn`. Usage:
  `npm run sync:rn -- path/to/ReactNative_DaVoice/example_car_agent`.

## Testing without a microphone

- **Self test**: set `window.DV_SELFTEST = true` before `js/app.js` loads (for example in `www/index.html` after a
  build). The app then downloads English, loads the voices and the agent, runs three commands and logs `CARTEST`
  lines to the console.
- **From a debugger**: with the app on the car screen, open `chrome://inspect` (Android) or Safari's Develop menu
  (iOS) and run `await __carAgent.runTurn('open the windows')`.

## License

The example's source code is MIT-licensed ([LICENSE](../LICENSE)). The wake word model, the speaker verification
model, the language packs, the voices and the agent model are covered by the
[Model and Voice Asset Notice](../MODEL_NOTICES.md). The demo license key in `src/app/config.ts` is for evaluation;
contact [DaVoice.io](https://davoice.io/) at `info@davoice.io` for a production key and custom wake words.
