// Represents a single number in the test with its result
export type KraepelinProblem = {
  value: number;
  userAnswer: number | null;
  isCorrect: boolean | null;
};

// Represents a column of 60 numbers (authentic Kraepelin format)
export type KraepelinColumn = {
  numbers: KraepelinProblem[];
  completed: boolean;
  answers: number;
  correct: number;
  timeSpent: number;
};

export type KraepelinResults = {
  totalAnswers: number;
  correctAnswers: number;
  accuracy: number;
  speed: number;
  consistency: number;
  endurance: number;
  columns: {
    answers: number;
    correct: number;
    accuracy: number;
  }[];
};

export type TestState = {
  currentColumnIndex: number;
  currentPosition: number;
  columns: KraepelinColumn[];
  totalAnswers: number;
  correctAnswers: number;
  lastInput: string | null;
  lastCorrect: boolean | null;
};

export type TimerState = {
  timeLeft: number;
  progress: number;
}; 