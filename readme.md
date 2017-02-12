# Bodymovin's JSON tester
---

This is a custom made (for personal use, mainly) tool to test the JSON files that [Bodymovin](https://github.com/bodymovin/bodymovin) generates. If you're looking to see it in action go to [https://nicolasjengler.github.io/bodymovins-json-tester/dist/](https://nicolasjengler.github.io/bodymovins-json-tester/dist/).


#### Information & instructions for the setup
---

##### Please do the following and keep everything below in mind when using these files, or "setup" if it can be called that way.

This setup uses `Gulp` for task management, with the aid of `PostCSS` + `Sass` for CSS-related tasks.

The Gulpfile has 9 tasks available:
* `webserver`: starts a local webserver to serve the files
* `css`: uses `PostCSS` + `cssnext` for prefixing and future CSS, and `Sass` as an aid. It also concatenates all CSS files, and minifies the result
* `vendor-css`: this task is meant to grab all files inside the array of the task's `src` and concatenates them into `vendor.css` and minifies it
* `js`: grabs all the files inside the `scripts` folder, concatenates them into `all.js`, and minifies it
* `vendor-js`: works exactly like the `vendor-css` task but for vendor javascript
* `clean`: this task deletes everything inside the `dist` filder
* `copy-images` and `copy`: these tasks copy all images and HTML/PHP files into the `dist` folder
* `watch`: this task watches for changes in the files in the `src` folder and updates them if necessary
* `build`: runs all of the tasks once, except for `watch` and `webserver`

Please, keep in mind that this setup may not work for you, and it may as well be flawed. I currently use it for small, personal projects and will try to improve its performance and logic ASAP.
