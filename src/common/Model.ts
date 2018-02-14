import { NavigationScreenProps } from 'react-navigation';

export interface NavigationProps {
    navigation: any;
}

export class UserData {
    exerciseLevel: number;
    step: number;

    constructor() {
        this.exerciseLevel = undefined;
        this.step = 0;
    }
}

export enum ExerciseLevel {
    Beginning,
    Intermediate,
    Advanced,
}