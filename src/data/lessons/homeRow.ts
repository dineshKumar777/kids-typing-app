import { Lesson } from '../../types';

export const homeRowLessons: Lesson[] = [
  // Lesson 1: Introduction
  {
    id: 1,
    title: 'Introduction to Typing',
    subtitle: 'Learn the basics',
    type: 'info',
    keys: [],
    texts: [
      'Welcome to typing! Keep your back straight and your feet flat on the floor.',
      'Place your fingers on the home row keys: A S D F and J K L ;',
      'The F and J keys have small bumps to help you find them without looking.',
    ],
    section: 'homeRow',
  },
  
  // Lesson 2: Keys f & j
  {
    id: 2,
    title: 'Keys f & j',
    subtitle: 'Index fingers',
    type: 'learn',
    keys: ['f', 'j'],
    newKeys: ['f', 'j'],
    texts: [
      'ffffjjjjffffjjjjffjjffjjfjfjjfjf',
    ],
    targetWPM: 10,
    minAccuracy: 80,
    section: 'homeRow',
  },
  
  // Lesson 3: Space Bar
  {
    id: 3,
    title: 'Space Bar',
    subtitle: 'Using your thumbs',
    type: 'learn',
    keys: ['f', 'j', ' '],
    newKeys: [' '],
    texts: [
      'f f j j ff ff jj jj fj jf ff jj',
    ],
    targetWPM: 10,
    minAccuracy: 80,
    unlockRequirement: 2,
    section: 'homeRow',
  },
  
  // Lesson 4: Review f & j
  {
    id: 4,
    title: 'Review: f & j',
    subtitle: 'Practice makes perfect',
    type: 'review',
    keys: ['f', 'j', ' '],
    texts: [
      'ffff jjjj ff jj fff jjj fj fj jjf ffj fff jjj ffj jjf fjfj fffj jjjf ffjj ff jj ffff',
    ],
    targetWPM: 12,
    minAccuracy: 85,
    unlockRequirement: 3,
    section: 'homeRow',
  },
  
  // Lesson 5: Keys d & k
  {
    id: 5,
    title: 'Keys d & k',
    subtitle: 'Middle fingers',
    type: 'learn',
    keys: ['f', 'j', 'd', 'k', ' '],
    newKeys: ['d', 'k'],
    texts: [
      'ddddkkkkddddkkdkdkdkkdkd',
    ],
    targetWPM: 10,
    minAccuracy: 80,
    unlockRequirement: 4,
    section: 'homeRow',
  },
  
  // Lesson 6: Review d & k
  {
    id: 6,
    title: 'Review: d & k',
    subtitle: 'Four keys now!',
    type: 'review',
    keys: ['f', 'j', 'd', 'k', ' '],
    texts: [
      'dd kk dk dk kd kd ddd kkd ddk dkk kkdd ddkk dddd kkkk ddkk kkdd kdd kddd dk kk',
    ],
    targetWPM: 12,
    minAccuracy: 85,
    unlockRequirement: 5,
    section: 'homeRow',
  },
  
  // Lesson 7: Practice d & k
  {
    id: 7,
    title: 'Practice: d & k',
    subtitle: 'Timed practice',
    type: 'practice',
    keys: ['f', 'j', 'd', 'k', ' '],
    texts: [
      'ffff ddd jjjj kkkk df df jk jk jjj fff ddff jjkk kkdd fdfd jkjk dfjk dfjk kkdd jkjk dfdf dfjj jjfd kkjj dfjk ddkd kkdk',
    ],
    targetWPM: 15,
    minAccuracy: 85,
    unlockRequirement: 6,
    section: 'homeRow',
  },
  
  // Lesson 8: Play fjkd
  // NOTE: This is a canvas-based game in TypingClub (Phaser/Pixi.js)
  // TODO: Implement custom game mode for keys f, j, d, k
  {
    id: 8,
    title: 'Play: fjkd',
    subtitle: 'Fun time!',
    type: 'game',
    keys: ['f', 'j', 'd', 'k', ' '],
    texts: [
      'f j d k f j d k',
      'ff jj dd kk',
      'fjdk kjdf fjdk kjdf',
      'dkfj fjdk dkfj fjdk',
      'fkdj jdfk fkdj jdfk',
      'dfjk dfjk kjfd kjfd',
    ],
    targetWPM: 15,
    minAccuracy: 80,
    unlockRequirement: 7,
    section: 'homeRow',
  },
  
  // Lesson 9: Keys s & l
  {
    id: 9,
    title: 'Keys s & l',
    subtitle: 'Ring fingers',
    type: 'learn',
    keys: ['f', 'j', 'd', 'k', 's', 'l', ' '],
    newKeys: ['s', 'l'],
    texts: [
      'sssslllllsssslllllssllssllslslllsls',
    ],
    targetWPM: 10,
    minAccuracy: 80,
    unlockRequirement: 8,
    section: 'homeRow',
  },
  
  // Lesson 10: Review s & l
  {
    id: 10,
    title: 'Review: s & l',
    subtitle: 'Six keys strong!',
    type: 'review',
    keys: ['f', 'j', 'd', 'k', 's', 'l', ' '],
    texts: [
      'll ss ssll slsl lsssl slls lsll ssl llss ssll slsl llsslsll ssl ssll slsl lsll ll',
    ],
    targetWPM: 12,
    minAccuracy: 85,
    unlockRequirement: 9,
    section: 'homeRow',
  },
  
  // Lesson 11: Practice s & l
  {
    id: 11,
    title: 'Practice: s & l',
    subtitle: 'Build muscle memory',
    type: 'practice',
    keys: ['f', 'j', 'd', 'k', 's', 'l', ' '],
    texts: [
      'jj ff kk dd ll ssssd df fj jk kl sdfsk dl ks jf kd lslfl kl js kd jf sdfllk kkj jjf',
    ],
    targetWPM: 15,
    minAccuracy: 85,
    unlockRequirement: 10,
    section: 'homeRow',
  },
  
  // Lesson 12: Keys a & ;
  {
    id: 12,
    title: 'Keys a & ;',
    subtitle: 'Pinky fingers',
    type: 'learn',
    keys: ['f', 'j', 'd', 'k', 's', 'l', 'a', ';', ' '],
    newKeys: ['a', ';'],
    texts: [
      'aaaa;;;;;aaaa;;;;;aa;;aa;;a;a;;;a;a',
    ],
    targetWPM: 10,
    minAccuracy: 80,
    unlockRequirement: 11,
    section: 'homeRow',
  },
  
  // Lesson 13: Review a & ;
  {
    id: 13,
    title: 'Review: a & ;',
    subtitle: 'Almost there!',
    type: 'review',
    keys: ['f', 'j', 'd', 'k', 's', 'l', 'a', ';', ' '],
    texts: [
      'aa ;; ;;aa ;a;a a;;;a ;aa; a;aa ;;aaa;; ;;aa ;a;a aa;;a;aa ;;a ;;aa ;a;a',
    ],
    targetWPM: 12,
    minAccuracy: 85,
    unlockRequirement: 12,
    section: 'homeRow',
  },
  
  // Lesson 14: First 8 Keys
  {
    id: 14,
    title: 'First 8 Keys',
    subtitle: 'Home position mastery',
    type: 'practice',
    keys: ['a', 's', 'd', 'f', 'j', 'k', 'l', ';', ' '],
    texts: [
      'ask dad all salads fall; lass as all ads add salsa jaff kad; flask lass sad fall alfa jak kaj dad ask',
    ],
    targetWPM: 12,
    minAccuracy: 85,
    unlockRequirement: 13,
    section: 'homeRow',
  },
  
  // Lesson 15: Play First 8 Keys
  // NOTE: This is a canvas-based game in TypingClub (Phaser/Pixi.js)
  // TODO: Implement custom game mode for first 8 home row keys
  {
    id: 15,
    title: 'Play: First 8 Keys',
    subtitle: 'Game time!',
    type: 'game',
    keys: ['a', 's', 'd', 'f', 'j', 'k', 'l', ';', ' '],
    texts: [
      'dad dad sad sad',
      'ask a lad; ask a lad;',
      'a lass; a lass;',
      'fall fall all all',
      'add a salad; add a salad;',
      'dad asks; dad asks;',
    ],
    targetWPM: 15,
    minAccuracy: 80,
    unlockRequirement: 14,
    section: 'homeRow',
  },
  
  // Lesson 16: Home Sweet Home
  {
    id: 16,
    title: 'Home, Sweet Home!',
    subtitle: 'Return to home',
    type: 'info',
    keys: ['a', 's', 'd', 'f', 'j', 'k', 'l', ';', ' '],
    texts: [
      'Always return your fingers to the home row after each keystroke.',
      'Feel the bumps on F and J to find your position without looking.',
      'Practice returning to home position after every word.',
    ],
    unlockRequirement: 15,
    section: 'homeRow',
  },
  
  // Lesson 17: Home Row Left Hand
  {
    id: 17,
    title: 'Home Row: L Hand',
    subtitle: 'Left hand focus',
    type: 'focus',
    keys: ['a', 's', 'd', 'f', ' '],
    texts: [
      'dad dada ad ada adad sad sada dasad fas fasd dada affa fada fasa saf fdds asdf',
    ],
    targetWPM: 15,
    minAccuracy: 85,
    unlockRequirement: 16,
    section: 'homeRow',
  },
  
  // Lesson 18: Home Row Right Hand
  {
    id: 18,
    title: 'Home Row: R Hand',
    subtitle: 'Right hand focus',
    type: 'focus',
    keys: ['j', 'k', 'l', ';', ' '],
    texts: [
      'jk jk jjkk jlkj ;;;; lkjj jj;; lkjj lkjj lk;; jkl; jjkk lkj jjkk lkjj ;;;; llll kkkk jjjj jl jk kj klj lkj kljj kljj',
    ],
    targetWPM: 15,
    minAccuracy: 85,
    unlockRequirement: 17,
    section: 'homeRow',
  },
  
  // Lesson 19: Keys g & h
  {
    id: 19,
    title: 'Keys g & h',
    subtitle: 'Index finger stretch',
    type: 'learn',
    keys: ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', ' '],
    newKeys: ['g', 'h'],
    texts: [
      'gggghhhhgggghhhhgghhgghhghghghghg',
    ],
    targetWPM: 10,
    minAccuracy: 80,
    unlockRequirement: 18,
    section: 'homeRow',
  },
  
  // Lesson 20: Review g & h
  {
    id: 20,
    title: 'Review: g & h',
    subtitle: 'Full home row!',
    type: 'review',
    keys: ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', ' '],
    texts: [
      'gf ggf gf ggf hj hhj hj hhj gfgf hjhj gggf hhhj fghj fgf jhj fgfgf jhjhj ggf hhj gghh ghgh ghfj ggf hhj',
    ],
    targetWPM: 12,
    minAccuracy: 85,
    unlockRequirement: 19,
    section: 'homeRow',
  },
  
  // Lesson 21: Practice g & h
  {
    id: 21,
    title: 'Practice: g & h',
    subtitle: 'Complete home row',
    type: 'practice',
    keys: ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', ' '],
    texts: [
      'glad glass gag had haha gal hal gaf hah haha gaga glad hala hal hasha shash gl',
    ],
    targetWPM: 15,
    minAccuracy: 85,
    unlockRequirement: 20,
    section: 'homeRow',
  },
  
  // Lesson 22: Home Row Review
  {
    id: 22,
    title: 'Home Row Review',
    subtitle: 'Master review',
    type: 'review',
    keys: ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', ' '],
    texts: [
      'glad dad had half a glass as salad; dad shall ask glass flags had glass ask shall flask had slash jaff',
    ],
    targetWPM: 15,
    minAccuracy: 90,
    unlockRequirement: 21,
    section: 'homeRow',
  },
  
  // Lesson 23: Play Home Row
  // NOTE: This is a canvas-based game in TypingClub (Phaser/Pixi.js)
  // TODO: Implement custom game mode for complete home row including g & h
  {
    id: 23,
    title: 'Play: Home Row',
    subtitle: 'Final challenge!',
    type: 'game',
    keys: ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', ' '],
    texts: [
      'a lad had a salad;',
      'dad shall add a flag;',
      'a glad gal has a glass;',
      'ash flash dash gash;',
      'all lads shall fall;',
      'half a hall; half a flask;',
    ],
    targetWPM: 18,
    minAccuracy: 85,
    unlockRequirement: 22,
    section: 'homeRow',
  },
];

export const allLessons = [...homeRowLessons];

export function getLessonById(id: number): Lesson | undefined {
  return allLessons.find(lesson => lesson.id === id);
}

export function getLessonsBySection(section: Lesson['section']): Lesson[] {
  return allLessons.filter(lesson => lesson.section === section);
}
