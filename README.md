# Package Tracker

A simple tool to keep track of multiple packages from various carriers all in one place and saved to Firestore.

Currently supports the following carriers:

```
USPS
UPS
Fedex
Amazon (only supports Order-ID values)
DHL
```

## WIP

This is a WIP project; in its current state, it's perfectly usable for personal, everyday package tracking!

## How to get started

This requires you to use Firestore to store your package details.

Make sure you have a firebase/firestore [set up in GCP](https://firebase.google.com/docs/firestore/quickstart#create).

Add a `firebaseCreds.js` to the `src/firebase` directory with your respective credentials.

```js
export const creds = {
  apiKey: '',
  authDomain: '',
  databaseURL: '',
  projectId: '',
  storageBucket: '',
  messagingSenderId: '',
  appId: '',
};
```

The frontend is password protected. To make use of this locally, add a `password.js` file in `/src/`.

```js
export const authPassword = {
  password: 'yourPassword',
};
```

and then

```bash
yarn install
yarn start
```

## To-do

- [ ] UI
  - [x] Add package section
  - [x] Package list/history
  - [x] Flesh out UI/CSS better
  - [x] Figure out how to make responsive on mobile
  - [ ] Display error/retry button if fail to fetch data
  - [ ] Automagically detect carrier
  - [ ] Automagically detect delivered status, requires deeper connection to carrier
- [x] Attach firestore
- [x] Configure firestore
- [x] Push data to firestore
- [x] Pull data from firestore
- [ ] More polish
- [ ] Typescript because i was naive and started with JS
- [ ] More carrier support

## Preview

![alt text](./src/assets/preview.gif)
