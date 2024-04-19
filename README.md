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

### Create certificate for development server

In parallel terminal:

```bash
npm install office-addin-dev-certs
```

### Start server for custom add-in

```bash
npm run start:desktop:outlook
```

It may require signing in your Microsoft Account, but it's not necessary for running tests.

You can skip this part if you're using stable add-in which has external address (for example, on GitHub Pages). In that case, use manifest.xml instead of manifest-localhost.xml in the next step.

### Add custom add-in to application

Follow the [instruction](https://learn.microsoft.com/en-us/office/dev/add-ins/outlook/sideload-outlook-add-ins-for-testing?tabs=windows-web)

After sideloading your add-in, check in new message form. Window may appear with suggestion to use VS Code extension, you can click "Cancel", so this window does not appear again, but usually it doesn't interfere with running tests.

## Run Tests

In parallel terminal:

```bash
appium
```

Then:

### Run tests on Windows

```bash
yarn test:e2e:windows
```

### Run tests on MacOS

```bash
yarn test:e2e:macos
```

### To inspect elements

Given, Appium Inspector installed from [official releases](https://github.com/appium/appium-inspector/releases),
And opened,
Then ensure Remote Path setting is `/` (not `/wd/hub`!),
And connect to application by starting session with the following capabilities:

#### Windows caps

```bash
    'appium:platformName': 'Windows',
    'appium:automationName': 'Windows',
    'appium:app': 'C:/Program Files/Microsoft Office/root/Office16/outlook.exe',
    'ms:waitForAppLaunch': '5',
    'ms:experimental-webdriver': true,
```

**ms:waitForAppLaunch** - if you don't include this, there is a possibility of appium not picking up the application window and throwing an error "no such window:Currently selected window has been closed".

**ms:experimental-webdriver** - required for inspecting add-ins. Add-in creates a webview, which isn't accessible by default.
**Important**
Using this capability at the moment makes impossible searching by relative xpath ('//Button' instead of '/Window/Pane/ToolBar/Pane/Pane/Pane/Pane/Pane/Group/Group/Button') or by text. It may be fixed later, so make sure to check [docs](https://github.com/appium/appium-windows-driver?tab=readme-ov-file#readme) regularly

#### MacOS caps

```bash
    platformName: 'mac',
    'appium:automationName': 'mac2',
    'appium:bundleId': 'com.microsoft.Outlook',
```

### Managing windows in tests

Opening new letter form creates a separate window. You can access it by using commands such as driver.getWindowHandles() and driver.switchToWindow().

Be aware, that driver.getWindowHandles() returns an array of open application window handles, where the focused one is usually found by index [0], so make sure to use driver.getWindowHandle() first, where there is still only one main application window and save it's value, so the handles won't be mixed up later.

Even if there is only one window left, with the others closed, still make sure to focus on this window by using driver.switchToWindow(), otherwise it can be unaccessible.
