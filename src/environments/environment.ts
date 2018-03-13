// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: "AIzaSyAbf5excG04jejY5U81ehHsq6nIDY8Qs24",
    authDomain: "ngnews-f5b75.firebaseapp.com",
    databaseURL: "https://ngnews-f5b75.firebaseio.com",
    projectId: "ngnews-f5b75",
    storageBucket: "ngnews-f5b75.appspot.com",
    messagingSenderId: "196056787741"
  }
};
