# React Native Demo App(s)

A demo project with End-to-End tests with SelenideJs + WebdriverIO based Appium implementation for Windows and MacOS.

## Installation

### Pre-requisites (MacOS)

To run E2E-tests:

```bash
npm install -g appium@next \
&& appium driver install mac2 \
&& appium driver doctor mac2
```

### Pre-requisites (Windows)

To run E2E-tests:

```bash
npm install -g appium@next \
&& appium driver install --source=npm appium-windows-driver
```

### Install project dependencies

```bash
yarn install --frozen-lockfile
```

## Build & Run in local simulator

### Android

TBD

### IOS

TBD

#### Usefull commands

TBD

## Run Tests

In parallel terminal:

```bash
appium
```

Then:

### Run tests on Windows

```bash
yarn test:e2e:metro:windows
```

### Run tests on MacOS

```bash
yarn test:e2e:metro:macos
```

### Run tests on android/ios

TBD

### To inspect elements

Given, Appium Inspector installed from [official releases](https://github.com/appium/appium-inspector/releases),
And opened,
Then ensure Remote Path setting is `/` (not `/wd/hub`!),
And connect to already opened android simulator by starting session with the following capabilities:

#### Windows caps

```bash
    'appium:platformName': 'Windows',
    'appium:automationName': 'Windows',
    'appium:app': 'C:/Program Files/Microsoft Office/root/Office16/outlook.exe',
    'ms:waitForAppLaunch': '2',
```

#### MacOS caps

```bash
    platformName: 'mac',
    'appium:automationName': 'mac2',
    'appium:bundleId': 'com.microsoft.Outlook',
```

#### Android caps

```json
{
  "appium:automationName": "UiAutomator2",
  "appium:platformName": "Android",
  "appium:settings[disableIdLocatorAutocompletion]": true
}
```

#### iOS caps

```json
{
  "appium:automationName": "XCUITest",
  "appium:platformName": "iOS",
  "appium:deviceName": "iPhone 14 Pro",
  "appium:platformVersion": "16.4"
}
```

## E2E Tests TODOs

- separate e2e tsconfig from main tsconfig, and exclude e2e folder from main tsconfig
- make `$$` command support «per platform locators» same as the `$` command
