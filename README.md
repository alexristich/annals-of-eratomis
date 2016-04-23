# Annals of Eratomis

The goal of this project was to build a game available on multiple platforms (web, iOS and Android) using Meteor+React to develop a better understanding of the ins and outs of web and mobile applications.

Annals of Eratomis is a simple game, originally intended to be a battle-arena style game. It parses level data from a JSON file and presents these levels to the player. Completing a level requires a user to move their hero into the spaces of all the villains on the screen. I've since placed it on hold while pursuing other projects.


A few quick notes:

The game is build using Meteor, so you must have Meteor installed to run it. In addition to the default packages, the game depends these packages:
```
aldeed:collection2
react
http
```

Game can be run in the browser with
```
meteor
```
and will be served up via localhost:8000.

To run the app in a simulator, first install the required SDKs:
```
meteor install-sdk ios
meteor install-sdk android
```
then add the platforms:
```
meteor add-platform ios
meteor add-platform android
```

Once this is complete, you can run the app using the following:
```
meteor run ios // for iOS simulator; will open iOS Simulator as installed through Xcode
meteor run android // requires a simulator, such as Genymotion or as installed through Android Studio
```

Both run commands for mobile will also serve up a web-accessible version through localhost:8000.

*NOTE: As of iOS 9.3, the current http package doesn't seem to be permitting the `HTTP.get()` call to correctly parse level data from the JSON file. It should continue to work with iOS 9.2.
