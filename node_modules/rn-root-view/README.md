# rn-root-view

## Getting started

`$ npm install rn-root-view --save`

### Mostly automatic installation

`$ react-native link rn-root-view`

### Manual installation


#### iOS

1. In XCode, in the project navigator, right click `Libraries` ➜ `Add Files to [your project's name]`
2. Go to `node_modules` ➜ `rn-root-view` and add `RootView.xcodeproj`
3. In XCode, in the project navigator, select your project. Add `libRootView.a` to your project's `Build Phases` ➜ `Link Binary With Libraries`
4. Run your project (`Cmd+R`)<

#### Android

1. Open up `android/app/src/main/java/[...]/MainApplication.java`
  - Add `import chat.rocket.RootViewPackage;` to the imports at the top of the file
  - Add `new RootViewPackage()` to the list returned by the `getPackages()` method
2. Append the following lines to `android/settings.gradle`:
  	```
  	include ':rn-root-view'
  	project(':rn-root-view').projectDir = new File(rootProject.projectDir, 	'../node_modules/rn-root-view/android')
  	```
3. Insert the following lines inside the dependencies block in `android/app/build.gradle`:
  	```
      compile project(':rn-root-view')
  	```


## Usage
```javascript
import setRootViewColor from 'rn-root-view';

componentDidMount() {
	setRootViewColor('#fff');
}
```
