## Intro

This application demonstrates a memory leak seen while trying to integrate the [Brightcove Android SDK](https://docs.brightcove.com/en/player/mobile-sdks/brightcove-player-sdk-for-android/index.html) with a Nativescript Angular application. The memory leak occurs when navigting to an angular component with the brightcove video embedded. Navigating away from the component never frees the used memory.

## Dependencies

* Nativescript 2.5.2
* Angular 4.0.0
* Typescript 2.1.6

## Setup

1. `git clone https://github.com/BrightcoveOS/android-player-samples.git`
2. `tns platform add android`
3. Run the app:
   * Normal: `tns run android`
   * Debug: `tns debug android --debug-brk`
   * Android studio: open `platforms/android` directory in Android Student and run the app

## Triggering the memory leak

1. Load the app
2. Click on an item in the list
3. Let the video load - notice memory increase
4. Click the back button to go back to the list - notice memory is never reclaimed
5. Click another video in the list
6. Repeat

*List* | *Detail*
--- | ---
<img alt="Video List" src="https://raw.githubusercontent.com/jhuckabee/nativescript-bcov-profiler/master/screenshots/1-video-list.png" width="150" /> | <img alt="Video Detail" src="https://raw.githubusercontent.com/jhuckabee/nativescript-bcov-profiler/master/screenshots/2-video-detail.png" width="150" />

<img alt="Memory Profile" src="https://raw.githubusercontent.com/jhuckabee/nativescript-bcov-profiler/master/screenshots/3-memory-profile.png" />

## Notes

* According to the [VideoDisplayComponent](https://brightcovelearning.github.io/Brightcove-API-References/android-sdk/javadoc/com/brightcove/player/display/VideoDisplayComponent.html) emitting the `EventType.STOP` event stops the video and destroys the player.
* The retained memory is actually observed in the [exoplayer MP4Extractor](http://google.github.io/ExoPlayer/doc/reference-v1/com/google/android/exoplayer/extractor/mp4/Mp4Extractor.html). I don't see any specific references on how or needing to manually clean this up.

# References

* [Brightcove Android SDK Overview](https://docs.brightcove.com/en/player/mobile-sdks/brightcove-player-sdk-for-android/index.html)
* [Brightcove Android SDK Class Reference](https://brightcovelearning.github.io/Brightcove-API-References/android-sdk/javadoc/index.html)
* [Brightcove Android SDK Sample Apps on Github](https://github.com/BrightcoveOS/android-player-samples)