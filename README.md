# dtep-ui

1. Download and install nodejs version 6.12.3 or any semantically higher version. Check for the version using command "node -v" in command prompt.

2. Update npm to 5.6.0 or any semantically higher version - by using command "npm install -g npm#@^5". Check for the version using command "npm -v" in command prompt.

3. Exact versions of nodejs and npm is not neccessary. However, you need to use the semantically higher versions. Please refer https://docs.npmjs.com/misc/semver to understand concepts and notations of semantic versioning. (Refer package.json file for nodejs and npm versions in engines field to know the semantic version of ndeojs and npm in this project).

4. After npm is updated you need to install bower and gulp if these are not installed already. These are just node modules so just run "npm install -g bower@^1.8.2 gulp-cli@^1.4.0" to install bower and gulp. Check for the version using commands "bower -v" and "gulp -v"one by one in command prompt.

5. To run the app in dev mode use command "gulp serve" from project root folder. A .tmp folder will be generate with files created for dev build process. It will open up a new tab of chrome browser with the landing page of the applicationon port 3000. This will also sync any live changes made to the source an the view shown in the brower. There is no need of manual reloading of ui after nay change in source is made. This uses browser-sync to achieve this. Refer package.json file to check the broswer-sync version being used in the project. Refer browser-sync docs (https://browsersync.io/docs) to know more on it.

6. To build the project use "gulp build" from project root folder. A fully packaged output folder named dtep-ui will be created inside dist folder.

7. To run the fully packaged final build go inside .\dist\dtep-ui relative to this project root folder. You need to have node http-server installed globally. It is just a node moudle so running the command "npm install -g http-server" ill install it, if you have do not have it installled already. With http-erver installed gloabbly you will have a http-server command available to execute from any folder loation in your system. Goto .\dist\dtep-ui and run the command "http-server -p [PORT_NUMBER_TO_BE_USED]" e.g. "http-server -p 7070". You need to open the exposed url in your browser manually for this.
