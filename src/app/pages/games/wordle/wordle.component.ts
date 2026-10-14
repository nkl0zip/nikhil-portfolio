import {
  Component,
  OnInit,
  OnDestroy,
  HostListener,
} from '@angular/core';
import { getRandomTarget, isValidGuess } from './wordle-words';

export type TileState = 'correct' | 'present' | 'absent' | 'empty' | 'active';
export type KeyState = 'correct' | 'present' | 'absent' | 'unused';

export interface Tile {
  letter: string;
  state: TileState;
  revealed: boolean;
}

export interface Row {
  tiles: Tile[];
  submitted: boolean;
  animating: boolean;
}

@Component({
  selector: 'app-wordle',
  templateUrl: './wordle.component.html',
  styleUrls: ['./wordle.component.scss'],
})
export class WordleComponent implements OnInit, OnDestroy {
  readonly WORD_LENGTH = 6;
  readonly MAX_ATTEMPTS = 7;

  rows: Row[] = [];
  currentRow = 0;
  currentCol = 0;
  targetWord = '';
  lastTarget = '';

  gameOver = false;
  won = false;
  message = '';
  messageType: 'error' | 'success' | 'info' | '' = '';

  keyboardRows: string[][] = [
    ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
    ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
    ['ENTER', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', '⌫'],
  ];

  keyStates: Map<string, KeyState> = new Map();

  private messageTimer: any = null;

  ngOnInit(): void {
    this.startNewGame();
  }

  ngOnDestroy(): void {
    if (this.messageTimer) clearTimeout(this.messageTimer);
  }

  startNewGame(): void {
    this.targetWord = getRandomTarget(this.lastTarget);
    this.lastTarget = this.targetWord;
    this.rows = Array.from({ length: this.MAX_ATTEMPTS }, () => ({
      tiles: Array.from({ length: this.WORD_LENGTH }, () => ({
        letter: '',
        state: 'empty' as TileState,
        revealed: false,
      })),
      submitted: false,
      animating: false,
    }));
    this.currentRow = 0;
    this.currentCol = 0;
    this.gameOver = false;
    this.won = false;
    this.message = '';
    this.messageType = '';
    this.keyStates = new Map();
    if (this.messageTimer) {
      clearTimeout(this.messageTimer);
      this.messageTimer = null;
    }
  }

  @HostListener('window:keydown', ['$event'])
  onKeyDown(event: KeyboardEvent): void {
    if (this.gameOver) return;

    const key = event.key;
    if (key === 'Enter') {
      this.submitGuess();
    } else if (key === 'Backspace') {
      this.removeLetter();
    } else if (/^[a-zA-Z]$/.test(key)) {
      this.addLetter(key.toUpperCase());
    }
  }

  onVirtualKey(key: string): void {
    if (this.gameOver) return;
    if (key === 'ENTER') {
      this.submitGuess();
    } else if (key === '⌫') {
      this.removeLetter();
    } else {
      this.addLetter(key);
    }
  }

  addLetter(letter: string): void {
    if (this.currentCol >= this.WORD_LENGTH) return;
    this.rows[this.currentRow].tiles[this.currentCol].letter = letter;
    this.rows[this.currentRow].tiles[this.currentCol].state = 'active';
    this.currentCol++;
  }

  removeLetter(): void {
    if (this.currentCol <= 0) return;
    this.currentCol--;
    this.rows[this.currentRow].tiles[this.currentCol].letter = '';
    this.rows[this.currentRow].tiles[this.currentCol].state = 'empty';
  }

  submitGuess(): void {
    if (this.currentCol < this.WORD_LENGTH) {
      this.showMessage('Not enough letters', 'error');
      this.shakeRow(this.currentRow);
      return;
    }

    const guess = this.rows[this.currentRow].tiles
      .map(t => t.letter)
      .join('')
      .toUpperCase();

    if (!isValidGuess(guess)) {
      this.showMessage('Not in word list', 'error');
      this.shakeRow(this.currentRow);
      return;
    }

    const feedback = this.evaluateGuess(guess);
    this.revealRow(this.currentRow, feedback, () => {
      this.updateKeyStates(guess, feedback);
      this.rows[this.currentRow].submitted = true;

      if (guess === this.targetWord) {
        this.gameOver = true;
        this.won = true;
        this.showMessage(this.getWinMessage(), 'success', 0);
        return;
      }

      this.currentRow++;
      this.currentCol = 0;

      if (this.currentRow >= this.MAX_ATTEMPTS) {
        this.gameOver = true;
        this.showMessage(`The word was ${this.targetWord}`, 'info', 0);
      }
    });
  }

  private evaluateGuess(guess: string): TileState[] {
    const result: TileState[] = new Array(this.WORD_LENGTH).fill('absent');
    const targetChars = this.targetWord.split('');
    const guessChars = guess.split('');

    // First pass: mark correct positions
    for (let i = 0; i < this.WORD_LENGTH; i++) {
      if (guessChars[i] === targetChars[i]) {
        result[i] = 'correct';
        targetChars[i] = '';
        guessChars[i] = '';
      }
    }

    // Second pass: mark present (wrong position)
    for (let i = 0; i < this.WORD_LENGTH; i++) {
      if (guessChars[i] === '') continue;
      const idx = targetChars.indexOf(guessChars[i]);
      if (idx !== -1) {
        result[i] = 'present';
        targetChars[idx] = '';
      }
    }

    return result;
  }

  private revealRow(
    rowIdx: number,
    feedback: TileState[],
    onComplete: () => void
  ): void {
    const row = this.rows[rowIdx];
    const delay = 300;

    feedback.forEach((state, i) => {
      setTimeout(() => {
        row.tiles[i].state = state;
        row.tiles[i].revealed = true;
        if (i === this.WORD_LENGTH - 1) {
          setTimeout(onComplete, delay);
        }
      }, i * delay);
    });
  }

  private shakeRow(rowIdx: number): void {
    const row = this.rows[rowIdx];
    row.animating = true;
    setTimeout(() => (row.animating = false), 600);
  }

  private updateKeyStates(guess: string, feedback: TileState[]): void {
    const statePriority: Record<TileState, number> = {
      correct: 3,
      present: 2,
      absent: 1,
      empty: 0,
      active: 0,
    };

    for (let i = 0; i < this.WORD_LENGTH; i++) {
      const letter = guess[i];
      const newState = feedback[i];
      const currentState = this.keyStates.get(letter);
      const currentPriority = currentState
        ? statePriority[currentState as TileState]
        : 0;
      const newPriority = statePriority[newState];
      if (newPriority > currentPriority) {
        this.keyStates.set(letter, newState as KeyState);
      }
    }
  }

  getKeyState(key: string): KeyState {
    return this.keyStates.get(key) ?? 'unused';
  }

  private showMessage(
    text: string,
    type: 'error' | 'success' | 'info',
    autoDismissMs = 2500
  ): void {
    if (this.messageTimer) {
      clearTimeout(this.messageTimer);
      this.messageTimer = null;
    }
    this.message = text;
    this.messageType = type;
    if (autoDismissMs > 0) {
      this.messageTimer = setTimeout(() => {
        this.message = '';
        this.messageType = '';
      }, autoDismissMs);
    }
  }

  private getWinMessage(): string {
    const attempt = this.currentRow + 1;
    if (attempt === 1) return 'Genius!';
    if (attempt === 2) return 'Magnificent!';
    if (attempt === 3) return 'Impressive!';
    if (attempt === 4) return 'Splendid!';
    if (attempt === 5) return 'Great!';
    if (attempt === 6) return 'Phew!';
    return 'Lucky!';
  }

  get currentGuess(): string {
    if (this.currentRow >= this.MAX_ATTEMPTS) return '';
    return this.rows[this.currentRow].tiles
      .map(t => t.letter)
      .join('');
  }

  get remainingAttempts(): number {
    return this.MAX_ATTEMPTS - this.currentRow;
  }

  trackByIndex(index: number): number {
    return index;
  }
}
