# Package Tracker
Keep track of multiple packages from various carriers all in one place

**WIP**

## How to get started
Make sure you have a firebase/firestore set up in GCP.

Add a `firebase-creds.js` to the `/firebase` directory with your respective credentials.

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
  - [ ] Package list/history
  - [ ] Flesh out UI/CSS better
- [x] Attach firestore
- [x] Configure firestore
- [x] Push data to firestore
- [ ] Pull data from firestore
- [ ] Everything lol