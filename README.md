# Package Tracker
A simple tool to keep track of multiple packages from various carriers all in one place and saved to GCP. All it takes is a firebase account with a simple firebase setup. It's fast and it reacts immediately!

Currently supports the following carriers:
```
USPS
UPS
Fedex
Amazon (only supports Order-ID values)
DHL
```

**WIP**

## How to get started
Make sure you have a firebase/firestore [set up in GCP](https://firebase.google.com/docs/firestore/quickstart#create).

Add a `firebase-creds.js` to the `src/firebase` directory with your respective credentials.

```js
export const creds = {
  "apiKey": "",
  "authDomain": "",
  "databaseURL": "",
  "projectId": "",
  "storageBucket": "",
  "messagingSenderId": "",
  "appId": ""
}
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
- [ ] Everything else/polish