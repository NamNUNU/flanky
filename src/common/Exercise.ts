
import { ExerciseLevel } from './Model';

class Exercise {
  Beginning: number[];
  Intermediate: number[];
  Advanced: number[];

  constructor() {
    this.Beginning = [
      20,
      20,
      30,
      30,
      40,
      -1,
      45,
      45,
      60,
      60,
      60,
      90,
      -1,
      90,
      90,
      120,
      120,
      150,
      -1,
      150,
      180,
      180,
      ,
      210,
      210,
      -1,
      240,
      240,
      270,
      300
    ];
    this.Intermediate = [
      50,
      55,
      60,
      -1,
      70,
      75,
      80,
      -1,
      100,
      105,
      110,
      -1,
      130,
      135,
      140,
      -1,
      150,
      155,
      160,
      -1,
      180,
      185,
      190,
      -1,
      220,
      225,
      230,
      -1,
      240,
      250
    ];
    this.Advanced = [
      60,
      90,
      90,
      105,
      120,
      135,
      150,
      150,
      120,
      150,
      165,
      165,
      180,
      150,
      180,
      195,
      210,
      225,
      210,
      225,
      240,
      180,
      210,
      225,
      240,
      255,
      210,
      240,
      180,
      120
    ];
  }

  getExercisePlan(level: number) {
    if (level === ExerciseLevel.Beginning) return this.Beginning;
    else if (level === ExerciseLevel.Intermediate) return this.Intermediate;
    else if (level === ExerciseLevel.Advanced) return this.Advanced;
  }
}

export default new Exercise();
