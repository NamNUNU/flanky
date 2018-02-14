import { NavigationScreenProps } from 'react-navigation';

export interface NavigationProps {
    navigation: any;
}

export class UserData {
    exerciseLevel: string;
    step: number;

    constructor(){
        this.exerciseLevel = undefined;
        this.step= 0;
    }
}