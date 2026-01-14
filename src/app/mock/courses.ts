import { nanoid } from 'nanoid';
import { Courses } from '../domain/courses.interface';

const getAnyDate = (num: number): Date => {
  const today = new Date();
  const anyDate = new Date(today);
  anyDate.setDate(today.getDate() - num);

  return anyDate;
};

export const courses: Courses[] = [
  {
    id: '1',
    title: 'Reprehenderit est veniam elit',
    creationDate: getAnyDate(8),
    duration: 123,
    description:
      'Consectetur veniam non nulla in laboris minim ipsum. Dolor aliqua irure sint do irure magna tempor culpa quis. Deserunt amet occaecat velit sit.',
    topRated: true,
    authors: {
      id: nanoid(),
      firstName: '',
      lastName: '',
    },
  },
  {
    id: '2',
    title: 'Magna Excepteur aute Deserunt',
    creationDate: getAnyDate(2),
    duration: 200,
    description:
      'Sunt culpa officia minim commodo eiusmod irure sunt nostrud. Mollit aliquip id occaecat officia proident anim dolor officia qui voluptate consectetur laborum. Duis incididunt culpa aliqua mollit do fugiat ea dolor mollit irure Lorem tempor.',
    topRated: false,
    authors: {
      id: nanoid(),
      firstName: '',
      lastName: '',
    },
  },
  {
    id: '3',
    title: 'Reprehenderit eiusmod nostrud amet',
    creationDate: getAnyDate(12),
    duration: 78,
    description:
      'Est consequat deserunt officia fugiat culpa in aliquip consectetur. Est nostrud occaecat cillum elit officia officia ea magna et minim officia commodo sunt. Deserunt duis minim magna nostrud enim enim commodo sit elit nostrud cillum aliquip est qui.',
    topRated: false,
    authors: {
      id: nanoid(),
      firstName: '',
      lastName: '',
    },
  },
  {
    id: '4',
    title: 'Sit voluptate eiusmod ea',
    creationDate: getAnyDate(4),
    duration: 136,
    description:
      'Commodo id sunt sunt adipisicing et aliquip voluptate laborum consectetur. Occaecat nisi sint exercitation ullamco adipisicing irure est in consectetur aute voluptate. Ea pariatur dolor anim ea reprehenderit ut non occaecat magna adipisicing exercitation nisi consequat.',
    topRated: true,
    authors: {
      id: nanoid(),
      firstName: '',
      lastName: '',
    },
  },
  {
    id: '5',
    title: 'Duis mollit reprehenderit ad',
    creationDate: getAnyDate(25),
    duration: 94,
    description:
      'Est minim ea aute sunt laborum minim eu excepteur. Culpa sint exercitation mollit enim ad culpa aliquip laborum cillum. Dolor officia culpa labore ex eiusmod ut est ea voluptate ea nostrud.',
    topRated: false,
    authors: {
      id: nanoid(),
      firstName: '',
      lastName: '',
    },
  },
];
