import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WordleComponent } from './wordle.component';
import { NavbarComponent } from '../../../components/navbar/navbar.component';
import { RouterTestingModule } from '@angular/router/testing';
import { CommonModule } from '@angular/common';

describe('WordleComponent', () => {
  let component: WordleComponent;
  let fixture: ComponentFixture<WordleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WordleComponent, NavbarComponent],
      imports: [RouterTestingModule, CommonModule],
    }).compileComponents();

    fixture = TestBed.createComponent(WordleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize a 7x6 grid', () => {
    expect(component.rows.length).toBe(7);
    component.rows.forEach(row => expect(row.tiles.length).toBe(6));
  });

  it('should add a letter to the current guess', () => {
    component.addLetter('A');
    expect(component.rows[0].tiles[0].letter).toBe('A');
    expect(component.currentCol).toBe(1);
  });

  it('should remove the last letter', () => {
    component.addLetter('A');
    component.addLetter('B');
    component.removeLetter();
    expect(component.currentCol).toBe(1);
    expect(component.rows[0].tiles[1].letter).toBe('');
  });

  it('should not add more than 6 letters', () => {
    'ABCDEF'.split('').forEach(l => component.addLetter(l));
    component.addLetter('G');
    expect(component.currentCol).toBe(6);
  });

  it('should reject incomplete guesses', () => {
    component.addLetter('A');
    component.submitGuess();
    expect(component.currentRow).toBe(0);
  });

  it('should detect a win when the correct word is guessed', () => {
    const target = component.targetWord;
    target.split('').forEach(l => component.addLetter(l));
    component.submitGuess();
    setTimeout(() => {
      expect(component.won).toBeTrue();
      expect(component.gameOver).toBeTrue();
    }, 2500);
  });

  it('should reset state on new game', () => {
    component.addLetter('A');
    component.startNewGame();
    expect(component.currentRow).toBe(0);
    expect(component.currentCol).toBe(0);
    expect(component.gameOver).toBeFalse();
    expect(component.rows[0].tiles[0].letter).toBe('');
  });
});
