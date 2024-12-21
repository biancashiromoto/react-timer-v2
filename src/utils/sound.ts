import sound from '../chill-guy.mp3';

export class TimerSound {
  private audio: HTMLAudioElement;
  private _volume: number = 50;
  private _isMuted: boolean = false;

  constructor() {
    this.audio = new Audio(sound);
    this.audio.loop = true;
    this.updateVolume();
  }

  start() {
    this.audio.currentTime = 0;
    this.audio.play();
  }

  stop() {
    this.audio.pause();
  }

  set volume(value: number) {
    this._volume = value;
    this.updateVolume();
  }

  get volume(): number {
    return this._volume;
  }

  set isMuted(value: boolean) {
    this._isMuted = value;
    this.updateVolume();
  }

  get isMuted(): boolean {
    return this._isMuted;
  }

  private updateVolume() {
    this.audio.volume = this._isMuted ? 0 : this._volume / 100;
  }
}
