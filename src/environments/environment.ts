// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: "AIzaSyBgt22IgTpllPhgFzmWueT1hN6u1ESkDnc",
    authDomain: "todo-dev-a3a22.firebaseapp.com",
    databaseURL: "https://todo-dev-a3a22.firebaseio.com",
    projectId: "todo-dev-a3a22",
    storageBucket: "todo-dev-a3a22.appspot.com",
    messagingSenderId: "380339783564"
  }
};