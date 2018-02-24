import { NavigationScreenProps } from 'react-navigation';

export interface NavigationProps {
    navigation: any;
}

export class UserData {
    exerciseLevel: number;
    todayStep: number;

    constructor() {
        this.exerciseLevel = undefined;
        this.todayStep = 0;
    }
}

export enum ExerciseLevel {
    Beginning,
    Intermediate,
    Advanced,
}

export enum ExerciseMode {
    MODE_EXERCISE,
    MODE_REST,
}