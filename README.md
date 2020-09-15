# Package Tracker
Keep track of multiple packages from various carriers all in one place

**WIP**

## How to get started
Make sure you have a firebase/firestore set up in GCP.

Add a `firebase-creds.js` to the `/firebase` directory with your respective credentials.

```js
export default creds = {
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
  - [ ] Add package section
  - [ ] Package list/history
- [ ] Attach firestore
- [ ] Configure firestore
- [ ] Push/pull data from firestore
- [ ] Everything lol