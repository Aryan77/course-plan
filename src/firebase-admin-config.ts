import * as fs from 'fs';
import * as path from 'path';
import * as admin from 'firebase-admin';
import { getTypedFirestoreDataConverter } from './firebase-config-common';

const serviceAccount = JSON.parse(
  fs.readFileSync(path.join(__dirname, '..', 'serviceAccount.json')).toString()
);
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://cornelldti-courseplan-dev.firebaseio.com',
});

const db = admin.firestore();

export const usernameCollection = db
  .collection('user-name')
  .withConverter(getTypedFirestoreDataConverter<FirestoreUserName>());

export type SemesterDocumentData = { readonly semesters: readonly FirestoreSemester[] };
export const semestersCollection = db
  .collection('user-semesters')
  .withConverter(getTypedFirestoreDataConverter<SemesterDocumentData>());

export const toggleableRequirementChoicesCollection = db
  .collection('user-toggleable-requirement-choices')
  .withConverter(getTypedFirestoreDataConverter<AppToggleableRequirementChoices>());

export const selectableRequirementChoicesCollection = db
  .collection('user-selectable-requirement-choices')
  .withConverter(getTypedFirestoreDataConverter<AppSelectableRequirementChoices>());

export const subjectColorsCollection = db
  .collection('user-subject-colors')
  .withConverter(getTypedFirestoreDataConverter<Readonly<Record<string, string>>>());

export type UniqueIncrementerDocumentData = { readonly uniqueIncrementer: number };
export const uniqueIncrementerCollection = db
  .collection('user-unique-incrementer')
  .withConverter(getTypedFirestoreDataConverter<UniqueIncrementerDocumentData>());

export const onboardingDataCollection = db
  .collection('user-onboarding-data')
  .withConverter(getTypedFirestoreDataConverter<FirestoreOnboardingUserData>());