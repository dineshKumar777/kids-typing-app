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
      'fff jjj fff jjj',
      'fj fj fj fj fj',
      'ff jj ff jj ff jj',
      'fjf jfj fjf jfj',
      'ffff jjjj ffff jjjj',
      'ffjj jjff ffjj jjff',
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
      'f f f j j j',
      'ff ff jj jj',
      'f j f j f j',
      'fj fj fj fj',
      'ff jj ff jj',
      'f f j j f f j j',
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
      'fff jjj fff jjj',
      'fj fj fj fj fj fj',
      'f j f j f j f j',
      'ff jj ff jj ff jj',
      'jf jf jf fj fj fj',
      'fjfj jfjf fjfj jfjf',
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
      'ddd kkk ddd kkk',
      'dk dk dk dk dk',
      'dd kk dd kk dd kk',
      'dkd kdk dkd kdk',
      'fd jk fd jk fd jk',
      'df kj df kj df kj',
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
      'fd fd jk jk fd jk',
      'df df kj kj df kj',
      'fdk jkf dkf kjd',
      'fjdk dkfj fjdk dkfj',
      'dd ff kk jj dd ff',
      'dkfj fjdk dkfj fjdk',
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
      'ffjj ddkk ffjj ddkk',
      'fjdk fjdk fjdk fjdk',
      'dkfj dkfj dkfj dkfj',
      'fd jk df kj fd jk df kj',
      'fdk fdk jkd jkd fdk jkd',
      'dfjk dfjk kjfd kjfd',
    ],
    targetWPM: 15,
    minAccuracy: 85,
    unlockRequirement: 6,
    section: 'homeRow',
  },
  
  // Lesson 8: Play fjkd
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
      'sss lll sss lll',
      'sl sl sl sl sl',
      'ss ll ss ll ss ll',
      'sls lsl sls lsl',
      'sd lk sd lk sd lk',
      'ds kl ds kl ds kl',
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
      'sd sd lk lk sd lk',
      'sdf lkj sdf lkj',
      'fds jkl fds jkl',
      'sdfjkl sdfjkl sdfjkl',
      'lkjfds lkjfds lkjfds',
      'sdfj lkjf sdfl kjsd',
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
      'sdf sdf jkl jkl',
      'fds fds lkj lkj',
      'sdfjkl lkjfds sdfjkl',
      'sf sf jl jl df dk',
      'sdfj sdfj lkjf lkjf',
      'fsjd fsjd kldf kldf',
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
      'aaa ;;; aaa ;;;',
      'a; a; a; a; a;',
      'aa ;; aa ;; aa ;;',
      'a;a ;a; a;a ;a;',
      'as ;l as ;l as ;l',
      'sa l; sa l; sa l;',
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
      'asdf jkl; asdf jkl;',
      'fdsa ;lkj fdsa ;lkj',
      'a;sldkfj a;sldkfj',
      'asdf asdf jkl; jkl;',
      'asd asd jkl jkl',
      'fads fads lk;j lk;j',
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
    type: 'learn',
    keys: ['a', 's', 'd', 'f', 'j', 'k', 'l', ';', ' '],
    texts: [
      'asdf jkl; asdf jkl;',
      'fdsa ;lkj fdsa ;lkj',
      'ask ask lad lad',
      'sad sad fall fall',
      'lass lass dad dad',
      'add add flask flask',
    ],
    targetWPM: 12,
    minAccuracy: 85,
    unlockRequirement: 13,
    section: 'homeRow',
  },
  
  // Lesson 15: Play First 8 Keys
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
    title: 'Home Row: L. Hand',
    subtitle: 'Left hand focus',
    type: 'focus',
    keys: ['a', 's', 'd', 'f', ' '],
    texts: [
      'asdf asdf asdf asdf',
      'fdsa fdsa fdsa fdsa',
      'sad sad dad dad',
      'fad fad add add',
      'as as ad ad sf sf',
      'asd asd fda fda',
    ],
    targetWPM: 15,
    minAccuracy: 85,
    unlockRequirement: 16,
    section: 'homeRow',
  },
  
  // Lesson 18: Home Row Right Hand
  {
    id: 18,
    title: 'Home Row: R. Hand',
    subtitle: 'Right hand focus',
    type: 'focus',
    keys: ['j', 'k', 'l', ';', ' '],
    texts: [
      'jkl; jkl; jkl; jkl;',
      ';lkj ;lkj ;lkj ;lkj',
      'jk jk kl kl l; l;',
      'jkl jkl ;lk ;lk',
      'j; j; kl kl jl jl',
      'jkl; ;lkj jkl; ;lkj',
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
      'ggg hhh ggg hhh',
      'gh gh gh gh gh',
      'gg hh gg hh gg hh',
      'fg fh jg jh fg jh',
      'gf hf gj hj gf hj',
      'fghj fghj fghj fghj',
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
      'asdfg hjkl; asdfg hjkl;',
      'gf gf hj hj gh gh',
      'had had gal gal',
      'hag hag lag lag',
      'ash ash gash gash',
      'hall hall glad glad',
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
      'glad glad flash flash',
      'shag shag gall gall',
      'half half lash lash',
      'flag flag hash hash',
      'shall shall dash dash',
      'gash gash hall hall',
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
      'a sad lad; a glad gal;',
      'dad has a flask;',
      'all shall fall;',
      'a flash; a dash;',
      'half a glass; half a salad;',
      'ash falls; hall shags;',
    ],
    targetWPM: 15,
    minAccuracy: 90,
    unlockRequirement: 21,
    section: 'homeRow',
  },
  
  // Lesson 23: Play Home Row
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
