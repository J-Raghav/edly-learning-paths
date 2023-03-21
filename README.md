It is static web app and uses [Microsoft Learn APIs](https://learn.microsoft.com/en-us/training/browse/) for showing learning path and modules data.

Used this 3 APIs for getting data

- Search API `https://learn.microsoft.com/api/contentbrowser/search?environment=prod&locale=en-us`
- Learning Path By ID - `https://learn.microsoft.com/api/hierarchy/paths/{uid}?locale=en-us`
- Module By ID - `https://learn.microsoft.com/api/hierarchy/modules/${uid}?locale=en-us`

Used [CORS proxy](https://api.allorigins.win/get) for bypassing browser restrictons set by Microsoft. (only for demo purpose)

Data structure:-
LearningPaths -< Modules -< Units

Running Instructions:-

- Dev Build: `npm start`
- Prod Build: `npm run build`

Deployed Version URL: [[Open](https://edwisely-learning-paths.web.app)] `https://edwisely-learning-paths.web.app`

Completed Items:-

- Added Learning paths and modules with intuitive navigation.
- `Home Page` have ability to filter learning paths based on domain which is directly linked with `Search API`
- `Module Page` displays both units under it and related learning paths.
- `Learning Page` displays modules and units under them.
- Added `Recents page` feature for showing recently accessed modules/learning paths.
- Structured components for avoiding repeated code.
- Responsive UI supports 2 versions for mobile and desktop.
