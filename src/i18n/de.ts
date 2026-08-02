import type { Translations } from './index.ts';

const de: Partial<Translations> = {
  operationsPrompt: 'Welche Aktion möchtest du ausführen?',
  quit: 'Programm beenden',
  pause: 'Mausbewegung pausieren',
  pauseDisabled: 'nicht möglich, da sie nicht läuft.',
  restart: 'Mausbewegung neu starten',
  restartDisabled: 'nicht möglich, da sie bereits läuft.',
  edit: 'Einstellungen bearbeiten',
  delayPrompt: 'Intervall zwischen Eingaben (ms), wenn keine Aktivität erkannt wird.',
  moveMousePrompt: 'Soll die Mausbewegung aktiviert werden?',
  movePixelsPrompt: 'Bewegung in Pixeln',
  keyboardInputPrompt: 'Soll Tastatureingabe aktiviert werden?',
  keyboardKeyPrompt: 'Taste für Tastatureingabe',
  invalidValue: 'Ungültiger Wert',
  configMissing: 'Konfiguration sollte bereits erstellt worden sein, war es aber nicht',
  workerFailed: 'Mausbewegungs-Worker fehlgeschlagen:',
};

export default de;
