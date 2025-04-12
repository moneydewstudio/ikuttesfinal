import { useState, useCallback, useRef, useEffect } from 'react';
import { TestState, TimerState, KraepelinResults } from '@/types/kraepelin';

// Helper to generate a random number between min and max (inclusive)
const getRandomNumber = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

// Generate a column of random single-digit numbers
const generateColumn = (length: number = 60) => {
  return Array.from({ length }, () => ({
    value: getRandomNumber(1, 9),
    userAnswer: null,
    isCorrect: null
  }));
};

export function useKraepelinTest(durationInMinutes: number, onComplete: (results: KraepelinResults) => void) {
  const [isStarted, setIsStarted] = useState(false);
  const [isInstructionsOpen, setIsInstructionsOpen] = useState(true);
  const [isConfirmExitOpen, setIsConfirmExitOpen] = useState(false);
  
  // For column timing (15 seconds per column)
  const secondsPerColumn = 15;
  const [columnTimeLeft, setColumnTimeLeft] = useState(secondsPerColumn);
  
  // For tracking statistics
  const [totalAnswers, setTotalAnswers] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  
  // Test columns (50 columns total in authentic test)
  const [columns, setColumns] = useState<TestState['columns']>([]);
  const [currentColumnIndex, setCurrentColumnIndex] = useState(0);
  const [currentPosition, setCurrentPosition] = useState(0);
  const [lastInput, setLastInput] = useState<string | null>(null);
  const [lastCorrect, setLastCorrect] = useState<boolean | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  
  // Initialize columns
  const initializeTest = useCallback(() => {
    // Create 50 columns with 60 numbers each (authentic format)
    const initialColumns = Array.from({ length: 50 }, () => ({
      numbers: generateColumn(60),
      completed: false,
      answers: 0,
      correct: 0,
      timeSpent: 0
    }));
    
    setColumns(initialColumns);
    setCurrentColumnIndex(0);
    setCurrentPosition(0);
    setTotalAnswers(0);
    setCorrectAnswers(0);
    setColumnTimeLeft(secondsPerColumn);
  }, [secondsPerColumn]);
  
  // Start the test
  const startTest = () => {
    setIsStarted(true);
    setIsInstructionsOpen(false);
    initializeTest();
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };
  
  // Handle column timer logic
  useEffect(() => {
    if (!isStarted) return;
    
    const timer = setInterval(() => {
      setColumnTimeLeft((prev) => {
        if (prev <= 1) {
          moveToNextColumn();
          return secondsPerColumn;
        }
        return prev - 1;
      });
    }, 1000);
    
    return () => clearInterval(timer);
  }, [isStarted, secondsPerColumn]);
  
  // Move to the next column
  const moveToNextColumn = useCallback(() => {
    setColumns(prevColumns => {
      const updatedColumns = [...prevColumns];
      if (currentColumnIndex < updatedColumns.length) {
        updatedColumns[currentColumnIndex] = {
          ...updatedColumns[currentColumnIndex],
          completed: true,
          timeSpent: secondsPerColumn - columnTimeLeft
        };
      }
      return updatedColumns;
    });
    
    if (currentColumnIndex < columns.length - 1) {
      setCurrentColumnIndex(prev => prev + 1);
      setCurrentPosition(0);
      setColumnTimeLeft(secondsPerColumn);
    } else {
      finishTest();
    }
    
    if (inputRef.current) {
      inputRef.current.value = '';
      inputRef.current.focus();
    }
    setLastInput(null);
    setLastCorrect(null);
  }, [columns.length, currentColumnIndex, columnTimeLeft, secondsPerColumn]);
  
  // Calculate progress percentage
  const columnProgressPercentage = ((secondsPerColumn - columnTimeLeft) / secondsPerColumn) * 100;
  
  // Handle user input
  const handleInput = useCallback((value: string) => {
    if (!/^[0-9]$/.test(value)) return;
    
    const userAnswer = parseInt(value, 10);
    
    if (!columns[currentColumnIndex]) return;
    
    const currentNumber = columns[currentColumnIndex].numbers[currentPosition];
    const nextNumber = currentPosition < 59 
      ? columns[currentColumnIndex].numbers[currentPosition + 1]
      : null;
    
    const correctAnswer = nextNumber 
      ? (currentNumber.value + nextNumber.value) % 10
      : currentNumber.value;
    
    const isCorrect = userAnswer === correctAnswer;
    
    setLastInput(value);
    setLastCorrect(isCorrect);
    
    setColumns(prevColumns => {
      const updatedColumns = [...prevColumns];
      const currentColumn = updatedColumns[currentColumnIndex];
      
      currentColumn.numbers[currentPosition] = {
        ...currentColumn.numbers[currentPosition],
        userAnswer,
        isCorrect
      };
      
      currentColumn.answers++;
      if (isCorrect) currentColumn.correct++;
      
      return updatedColumns;
    });
    
    setTotalAnswers(prev => prev + 1);
    if (isCorrect) setCorrectAnswers(prev => prev + 1);
    
    if (currentPosition < 59) {
      setCurrentPosition(prev => prev + 1);
    } else {
      moveToNextColumn();
    }
    
    if (inputRef.current) {
      inputRef.current.value = '';
      inputRef.current.focus();
    }
  }, [columns, currentColumnIndex, currentPosition, moveToNextColumn]);
  
  // Calculate results and finish the test
  const finishTest = useCallback(() => {
    const completedColumns = columns.filter(col => col.completed || col.answers > 0);
    const accuracy = totalAnswers > 0 ? (correctAnswers / totalAnswers) * 100 : 0;
    
    const answersPerMinute = totalAnswers / (durationInMinutes || 1);
    const speed = Math.min(answersPerMinute / 20, 5);
    
    let consistency = 5;
    if (completedColumns.length > 1) {
      const accuracies = completedColumns.map(c => c.answers > 0 ? c.correct / c.answers : 0);
      const avgAccuracy = accuracies.reduce((sum, acc) => sum + acc, 0) / accuracies.length;
      const variance = accuracies.reduce((sum, acc) => sum + Math.pow(acc - avgAccuracy, 2), 0) / accuracies.length;
      const stdDev = Math.sqrt(variance);
      consistency = Math.max(5 - (stdDev * 10), 1);
    }
    
    let endurance = 3;
    if (completedColumns.length > 1) {
      const midpoint = Math.floor(completedColumns.length / 2);
      const firstHalf = completedColumns.slice(0, midpoint);
      const secondHalf = completedColumns.slice(midpoint);
      
      const firstHalfAccuracy = firstHalf.reduce((sum, c) => sum + (c.answers > 0 ? c.correct / c.answers : 0), 0) / firstHalf.length;
      const secondHalfAccuracy = secondHalf.reduce((sum, c) => sum + (c.answers > 0 ? c.correct / c.answers : 0), 0) / secondHalf.length;
      
      const enduranceRatio = secondHalfAccuracy / (firstHalfAccuracy || 0.01);
      endurance = Math.min(Math.max(enduranceRatio * 3, 1), 5);
    }
    
    const columnResults = completedColumns.map(column => ({
      answers: column.answers,
      correct: column.correct,
      accuracy: column.answers > 0 ? column.correct / column.answers : 0
    }));
    
    onComplete({
      totalAnswers,
      correctAnswers,
      accuracy,
      speed,
      consistency,
      endurance,
      columns: columnResults
    });
  }, [columns, totalAnswers, correctAnswers, durationInMinutes, onComplete]);
  
  // Handle exit confirmation
  const handleExitRequest = () => {
    setIsConfirmExitOpen(true);
  };
  
  const confirmExit = () => {
    finishTest();
    setIsConfirmExitOpen(false);
  };
  
  return {
    isStarted,
    isInstructionsOpen,
    isConfirmExitOpen,
    columnTimeLeft,
    columnProgressPercentage,
    currentColumnIndex,
    currentPosition,
    columns,
    totalAnswers,
    correctAnswers,
    lastInput,
    lastCorrect,
    inputRef,
    startTest,
    handleInput,
    handleExitRequest,
    confirmExit,
    setIsInstructionsOpen,
    setIsConfirmExitOpen
  };
} 