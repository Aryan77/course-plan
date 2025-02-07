import { CollegeOrMajorRequirement, Course } from '../../types';
import { includesWithSubRequirements } from '../checkers-common';

const infoENMinorRequirements: readonly CollegeOrMajorRequirement[] = [
  {
    name: 'Concentration',
    description:
      'One Core course based on your concentration and three courses in the concentration. ',
    source: 'https://infosci.cornell.edu/node/801',
    fulfilledBy: 'toggleable',
    fulfillmentOptions: {
      'Behavioral Science': {
        description: 'Core - INFO 2450: Communication and Technology. ',
        counting: 'courses',
        checker: includesWithSubRequirements(
          ['INFO 2450'],
          [
            'INFO 3400',
            'INFO 3460',
            'INFO 4430',
            'INFO 4450',
            'INFO 4500',
            'INFO 4800',
            'INFO 4940',
            'COMM 4380',
            'PSYCH 3800',
            'INFO 3300',
            'INFO 4100',
            'INFO 4300',
            'COMM 4242',
            'CS 4740',
            'CS 4780',
            'INFO 3200',
            'INFO 3561',
            'INFO 4650',
            'COMM 4410',
            'STS 3440',
            'INFO 4360',
            'SOC 3350',
            'INFO 3450',
            'INFO 4240',
            'INFO 4400',
          ]
        ),
        perSlotMinCount: [1, 3],
        slotNames: ['INFO 2450', 'Elective'],
      },
      'Data Science': {
        description: 'Core - INFO 2950: Introduction to Data Science. ',
        counting: 'courses',
        checker: includesWithSubRequirements(
          ['INFO 2950'],
          [
            'INFO 3300',
            'INFO 3950',
            'CS 4780',
            'CS 4786',
            'ORIE 3120',
            'ORIE 4740',
            'STSCI 4740',
            'INFO 2770',
            'INFO 3350',
            'INFO 4100',
            'INFO 4120',
            'INFO 4130',
            'INFO 4300',
            'CS 4740',
            'INFO 3200',
            'INFO 3561',
            'INFO 4200',
            'INFO 4240',
            'INFO 4250',
            'INFO 4270',
            'INFO 4561',
            'INFO 4940',
            'COMM 4242',
            'ENGL 3778',
            'STS 3440',
            'INFO 4310',
            'COMM 3150',
            'COMM 3189',
            'COMM 4200',
            'COMM 4860',
            'GOVT 2169',
            'SOC 3580',
          ]
        ),
        perSlotMinCount: [1, 3],
        slotNames: ['INFO 2950', 'Elective'],
      },
      'Digital Culture and Production': {
        description: 'Core - INFO 3561: Computing Cultures. ',
        counting: 'courses',
        checker: includesWithSubRequirements(
          ['INFO 3561'],
          [
            'INFO 2300',
            'INFO 3152',
            'INFO 3300',
            'INFO 4320',
            'CS 3758',
            'CS 4620',
            'INFO 2921',
            'INFO 3200',
            'STS 3440',
            'STS 4040',

            'INFO 2750',
            'INFO 3450',
            'INFO 3660',
            'INFO 4152',
            'INFO 4240',
            'INFO 4400',
            'INFO 4420',
            'INFO 4940',
            'ART 3705',
            'ARTH 4151',
            'ARTH 4154',
            'COML 3115',
            'ENGL 3741',
            'HIST 2293',
          ]
        ),
        perSlotMinCount: [1, 3],
        slotNames: ['INFO 3561', 'Elective'],
      },
      'Information Ethics, Law, and Policy': {
        description:
          'Core - INFO 1200: Information Ethics, Law, and Policy or INFO 1260: Choices and Consequences in Computing',
        counting: 'courses',
        checker: includesWithSubRequirements(
          ['INFO 1200', 'INFO 1260'],
          [
            'INFO 4113',
            'INFO 4200',
            'INFO 4250',
            'INFO 4301',
            'HADM 4890',
            'STS 2761',
            'INFO 4240',
            'INFO 4800',
            'INFO 4940',
            'COMM 4242',
            'CRP 3210',
            'PAM 2300',
            'INFO 3200',
            'INFO 3460',
            'INFO 3561',
            'INFO 4270',
            'INFO 4561',
            'INFO 4940',
            'STS 3440',
            'STS 4040',
            'INFO 3300',
            'INFO 3350',
            'INFO 4120',
            'INFO 4130',
            'INFO 4300',
          ]
        ),
        perSlotMinCount: [1, 3],
        slotNames: ['INFO 1200/1260', 'Elective'],
      },
      'Interactive Technologies': {
        description: 'Core - INFO 4120 or INFO 4320',
        counting: 'courses',
        checker: includesWithSubRequirements(
          ['INFO 4120', 'INFO 4320'],
          [
            'CS 3758',

            'INFO 3300',
            'INFO 4340',
            'INFO 4555',
            'CS 4780',
            'CS 4786',
            'CS 5150',
            'ORIE 3120',
            'ORIE 4740',
            'STSCI 4740',

            'INFO 4130',
            'INFO 4152',
            'INFO 4154',
            'INFO 4275',
            'INFO 4310',
            'INFO 4410',
            'INFO 4430',
            'INFO 4940',
            'CS 4752',
          ]
        ),
        perSlotMinCount: [1, 3],
        slotNames: ['INFO 4120/4320', 'Elective'],
      },
      'Networks, Crowds, and Markets': {
        description: 'Core - INFO 2040: Networks',
        counting: 'courses',
        checker: includesWithSubRequirements(
          ['INFO 2040'],
          [
            'INFO 4220',
            'INFO 4360',
            'COMM 3150',
            'ECON 3810',
            'ECON 4020',
            'ECON 4022',
            'ECON 4610',
            'ECON 4660',
            'ORIE 4350',
            'SOC 3080',

            'INFO 3300',
            'INFO 4300',
            'CS 4740',
            'CS 4780',
            'CS 4786',
            'ECON 3120',
            'ECON 3140',
            'INFO 3561',
            'INFO 4200',
            'INFO 4240',
            'INFO 4250',
            'INFO 4940',
            'STS 3440',
          ]
        ),
        perSlotMinCount: [1, 3],
        slotNames: ['INFO 2040', 'Elective'],
      },
      'UX (User Experience)': {
        description: 'Core - INFO 2450: Communication and Technology',
        counting: 'courses',
        checker: includesWithSubRequirements(
          ['INFO 2450'],
          [
            'INFO 3450',
            'INFO 4400',
            'INFO 4410',
            'INFO 2921',
            'INFO 4240',
            'INFO 4420',
            'INFO 4940',
            'ENGL 3741',
            'INFO 3400',
            'INFO 3460',
            'INFO 4430',
            'INFO 4450',
            'COMM 4380',
            'PSYCH 3420',
            'INFO 3152',
            'INFO 4130',
            'INFO 4152',
            'INFO 4154',
            'INFO 4275',
            'INFO 4310',
            'INFO 4320',
            'INFO 4340',
            'CS 5150',
          ]
        ),
        perSlotMinCount: [1, 3],
        slotNames: ['INFO 2450', 'Elective'],
      },
    },
  },
  {
    // TODO: warning because double-counted with previous minor req
    name: 'Elective',
    description: 'Choose one course from any concentration',
    source: 'http://infosci.cornell.edu/node/801',
    checker: [(course: Course): boolean => course.subject === 'INFO'],
    checkerWarning: 'We do not check that the course is from a concentration.',
    fulfilledBy: 'courses',
    perSlotMinCount: [1],
    slotNames: ['Course'],
  },
];

export default infoENMinorRequirements;
