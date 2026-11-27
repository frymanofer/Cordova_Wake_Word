// Everything you may want to change in the car agent demo.

/** Temporary DaVoice demo license (all DaVoice libraries). Get a production key from info@davoice.io. */
export const DAVOICE_LICENSE_KEY = 'DV2.eyJ2IjoyLCJraWQiOiJrMSIsImlkIjoiZjM3ZWFmZjZjNWNkIiwiY3VzdCI6IkRhVm9pY2UgZGVtbyBhcHAgQ29yZG92YV9XYWtlX1dvcmQvZXhhbXBsZV9jYXJfYWdlbnQgKGV4YWN0IGFwcCBpZHMgb25seSkiLCJpYXQiOjE3OTU3MTEwNzYzMDIsImV4cCI6MTgzMDI5NzYwMDAwMCwicHJvZCI6WyIqIl0sInBsYXQiOlsiYW5kcm9pZCIsImlvcyJdLCJhcHBzIjp7ImFuZHJvaWQiOlsiaW8uZGF2b2ljZS5jYXJhZ2VudC5jb3Jkb3ZhIl0sImlvcyI6WyJpby5kYXZvaWNlLmNhcmFnZW50LmNvcmRvdmEiXX0sIm1vZGVscyI6WyJ0dHMvKiIsInd3LyoiXX0.RZ1kB5KqAX1nlhXgTzGxgoSDLh9CWfmxnt0CYZ_D4ei_p-BA1bUDbYfJ7DhZXQx0HsFBKyc3KDLY-8Lxq7Yi-A';

/** Wake word: a .dm model in www/models (bundled with this app). */
export const WAKE_WORD_MODEL = 'models/hey_davoice_model_28_06042026.dm';
export const WAKE_WORD_LABEL = 'Hey DaVoice';
export const WAKE_WORD_THRESHOLD = 0.999;
export const WAKE_WORD_BUFFER_COUNT = 3;

/** Speaker verification model (www/models) and its match threshold. */
export const SV_MODEL = 'models/sv.dm';
export const SV_SAMPLE_COUNT = 5;

/** Languages offered first (the rest of the language packs are listed below them). */
export const FEATURED_LANGUAGES = ['en', 'pt-BR'];
