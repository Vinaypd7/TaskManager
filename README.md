# TaskManager

TaskManager is a small React Native (Expo) TypeScript project that demonstrates task management screens, components, and unit tests.

## 🌐 Live Demo

**Web Version:** [https://task-manager-eight-inky-33.vercel.app/](https://task-manager-eight-inky-33.vercel.app/)

**Android Build:** [Download APK](https://expo.dev/accounts/vpd7/projects/TaskManager/builds/0af8fe85-e187-425b-a1a0-e590c20dd2a3)

The web app is live and publicly accessible. You can view it in your browser without any login required! The Android APK is available for download from the Expo build page.

**Prerequisites:**
- Node.js (recommended LTS)
- npm or yarn
- Expo CLI (optional, for running on devices/simulators)

**Install**

```powershell
npm i -f
```

**Available scripts**

- `start`: Run the app with Expo (`expo start`).
- `android`: Start Expo and open Android (`expo start --android`).
- `ios`: Start Expo and open iOS (`expo start --ios`).
- `web`: Start Expo for web (`expo start --web`).
- `storybook:web`: Run Storybook web dev server on port 6006.
- `test`: Run Jest tests.
- `test:watch`: Run Jest in watch mode.
- `test:coverage`: Run Jest with coverage.
- `test:snapshot`: Run only snapshot tests.
- `test:snapshot:update`: Update snapshot tests.
- `test:update-snapshots`: Update all snapshots.
- `test:ci`: CI-friendly Jest run with coverage and limited workers.
- `lint`: Run ESLint for `src/**/*.ts` and `src/**/*.tsx`.
- `build`: Build web version (default, same as `build:web`).
- `build:android`: Build Android APK using EAS Build (cloud).
- `build:android:apk`: Build Android APK with preview profile.
- `build:android:local`: Build Android APK locally using EAS Build.
- `prebuild:android`: Generate native Android project files.
- `build:web`: Build web version for deployment.
- `preview:web`: Preview the built web version locally.

Run an arbitrary script with `npm run <script>`.

**Project structure (partial)**

- `App.tsx` — app entry
- `src/screens` — screen components and tests
- `src/components` — shared components and snapshots
- `src/services` — network / data services
- `src/hooks` — custom hooks
- `__tests__` — unit tests and factories

**Testing**

```powershell
npm test
# update snapshots
npm run test:update-snapshots
```

**Code style & pre-commit**
- ESLint and Prettier are configured. `lint-staged` runs on staged files.
- Husky hooks are available if configured locally.

## Building Android APK

### Option 1: Using EAS Build (Recommended - Cloud-based)

EAS Build is Expo's cloud-based build service. It's the easiest way to build Android APKs.

#### Prerequisites:
1. Install EAS CLI:
   ```bash
   npm install -g eas-cli
   ```

2. Login to your Expo account:
   ```bash
   eas login
   ```

3. Configure your project (if not already done):
   ```bash
   eas build:configure
   ```

#### Build Commands:

**Build APK for testing (Preview profile):**
```bash
npm run build:android:apk
# or
eas build -p android --profile preview
```

**Build APK for production:**
```bash
npm run build:android
# or
eas build -p android --profile production
```

**Build APK locally (requires Docker):**
```bash
npm run build:android:local
# or
eas build -p android --local
```

#### Download the APK:

After the build completes, EAS will provide a download link. You can also:
- Check build status: `eas build:list`
- Download from Expo dashboard: https://expo.dev/accounts/[your-account]/projects/TaskManager/builds

### Option 2: Local Build (Advanced)

For local builds, you need to generate native Android project files first.

#### Prerequisites:
- Android Studio installed
- Android SDK configured
- Java Development Kit (JDK) installed

#### Steps:

1. **Generate native Android project:**
   ```bash
   npm run prebuild:android
   ```

2. **Navigate to Android directory:**
   ```bash
   cd android
   ```

3. **Build the APK:**
   ```bash
   ./gradlew assembleRelease
   ```

   Or use the npm script:
   ```bash
   npm run build:android:local-apk
   ```

4. **Find the APK:**
   The APK will be located at:
   ```
   android/app/build/outputs/apk/release/app-release.apk
   ```

#### Sign the APK (for production):

1. Generate a keystore:
   ```bash
   keytool -genkeypair -v -storetype PKCS12 -keystore my-upload-key.keystore -alias my-key-alias -keyalg RSA -keysize 2048 -validity 10000
   ```

2. Configure signing in `android/app/build.gradle`:
   ```gradle
   android {
       ...
       signingConfigs {
           release {
               storeFile file('my-upload-key.keystore')
               storePassword 'your-store-password'
               keyAlias 'my-key-alias'
               keyPassword 'your-key-password'
           }
       }
       buildTypes {
           release {
               signingConfig signingConfigs.release
           }
       }
   }
   ```

### Build Configuration

The project includes an `eas.json` file with build profiles:
- **preview**: Builds APK for internal testing
- **production**: Builds APK for production release

You can customize build settings in `eas.json` or `app.json`.

### Notes:

- **Package Name**: The Android package name is set to `com.taskmanager.app` in `app.json`
- **Version**: Update the version in `app.json` before building a new release
- **Build Time**: EAS cloud builds typically take 10-20 minutes
- **Local Builds**: Require Docker for EAS local builds, or full Android development environment for Gradle builds
- **Download APK**: [Android Build Link](https://expo.dev/accounts/vpd7/projects/TaskManager/builds/0af8fe85-e187-425b-a1a0-e590c20dd2a3)

## Deploying Web Version (Free Hosting)

**✅ This app is already deployed!** View it at: [https://task-manager-eight-inky-33.vercel.app/](https://task-manager-eight-inky-33.vercel.app/)

You can host the web version of your app for free using several hosting services. Here are the best free options:

### Option 1: Vercel (Recommended - Easiest)

Vercel offers free hosting with automatic deployments from GitHub.

#### Steps:

1. **Build the web version:**
   ```bash
   npm run build:web
   ```

2. **Install Vercel CLI:**
   ```bash
   npm install -g vercel
   ```

3. **Deploy:**
   ```bash
   cd dist
   vercel
   ```
   
   Or deploy directly from the project root:
   ```bash
   vercel --prod
   ```

4. **Configure for Expo (create `vercel.json` in project root):**
   ```json
   {
     "buildCommand": "npm run build:web",
     "outputDirectory": "dist",
     "rewrites": [
       { "source": "/(.*)", "destination": "/index.html" }
     ]
   }
   ```

**Benefits:**
- ✅ Free forever (with limits)
- ✅ Automatic HTTPS
- ✅ Custom domain support
- ✅ Automatic deployments from GitHub
- ✅ Fast CDN

**Website**: https://vercel.com

---

### Option 2: Netlify

Netlify is another excellent free hosting option with great developer experience.

#### Steps:

1. **Build the web version:**
   ```bash
   npm run build:web
   ```

2. **Install Netlify CLI:**
   ```bash
   npm install -g netlify-cli
   ```

3. **Deploy:**
   ```bash
   netlify deploy --prod --dir=dist
   ```

4. **Or create `netlify.toml` in project root:**
   ```toml
   [build]
     command = "npm run build:web"
     publish = "dist"
   
   [[redirects]]
     from = "/*"
     to = "/index.html"
     status = 200
   ```

**Benefits:**
- ✅ Free tier (100GB bandwidth/month)
- ✅ Automatic HTTPS
- ✅ Custom domain support
- ✅ Continuous deployment from GitHub
- ✅ Form handling

**Website**: https://netlify.com

---

### Option 3: GitHub Pages

Host directly from your GitHub repository for free.

#### Steps:

1. **Build the web version:**
   ```bash
   npm run build:web
   ```

2. **Install gh-pages:**
   ```bash
   npm install --save-dev gh-pages
   ```

3. **Add to `package.json` scripts:**
   ```json
   "deploy:gh-pages": "gh-pages -d dist"
   ```

4. **Deploy:**
   ```bash
   npm run build:web
   npm run deploy:gh-pages
   ```

5. **Enable GitHub Pages:**
   - Go to your repository Settings → Pages
   - Select source: `gh-pages` branch
   - Your site will be at: `https://[username].github.io/[repo-name]`

**Benefits:**
- ✅ Completely free
- ✅ Integrated with GitHub
- ✅ Custom domain support
- ⚠️ Note: Takes a few minutes to update after deployment

---

### Option 4: Surge.sh (Simplest)

Surge is the simplest way to deploy static sites.

#### Steps:

1. **Build the web version:**
   ```bash
   npm run build:web
   ```

2. **Install Surge:**
   ```bash
   npm install -g surge
   ```

3. **Deploy:**
   ```bash
   cd dist
   surge
   ```
   
   Follow the prompts to create an account and choose a domain.

**Benefits:**
- ✅ Free tier
- ✅ Very simple (one command)
- ✅ Custom domain support
- ✅ Fast deployment

**Website**: https://surge.sh

---

### Option 5: Firebase Hosting

Google's Firebase offers free hosting with good performance.

#### Steps:

1. **Install Firebase CLI:**
   ```bash
   npm install -g firebase-tools
   ```

2. **Login:**
   ```bash
   firebase login
   ```

3. **Initialize Firebase:**
   ```bash
   firebase init hosting
   ```
   
   Select:
   - Public directory: `dist`
   - Single-page app: `Yes`
   - Don't overwrite index.html: `No`

4. **Build and deploy:**
   ```bash
   npm run build:web
   firebase deploy
   ```

**Benefits:**
- ✅ Free tier (10GB storage, 360MB/day transfer)
- ✅ Fast CDN
- ✅ Custom domain support
- ✅ Integrated with Firebase services

**Website**: https://firebase.google.com

---

### Quick Comparison

| Service | Free Tier | Ease of Use | Custom Domain | Best For |
|---------|-----------|-------------|----------------|----------|
| **Vercel** | ✅ Generous | ⭐⭐⭐⭐⭐ | ✅ Yes | Production apps |
| **Netlify** | ✅ Good | ⭐⭐⭐⭐⭐ | ✅ Yes | Production apps |
| **GitHub Pages** | ✅ Unlimited | ⭐⭐⭐ | ✅ Yes | Open source projects |
| **Surge** | ✅ Good | ⭐⭐⭐⭐⭐ | ✅ Yes | Quick demos |
| **Firebase** | ✅ Good | ⭐⭐⭐⭐ | ✅ Yes | Firebase users |

### Recommended Setup for Quick Demo

For a quick free deployment, use **Vercel** or **Netlify**:

```bash
# 1. Build
npm run build:web

# 2. Deploy with Vercel (easiest)
npx vercel --prod

# OR deploy with Netlify
npx netlify deploy --prod --dir=dist
```

Your app will be live in minutes! 🚀

### Notes:

- **Build Output**: The web build is created in the `dist` directory
- **SPA Routing**: All hosting services need to be configured for single-page app routing (redirect all routes to `index.html`)
- **Environment Variables**: If your app uses environment variables, configure them in your hosting platform's dashboard
- **Free Tier Limits**: Most free tiers are sufficient for demos and small projects

## ♿ Accessibility

TaskManager is built with accessibility as a core principle. All components are tested with screen readers and follow WCAG 2.1 Level AA guidelines.

### Key Features
- ✅ Full VoiceOver (iOS) support
- ✅ Full TalkBack (Android) support  
- ✅ Keyboard navigation support
- ✅ High contrast color schemes
- ✅ Descriptive accessibility labels and hints
- ✅ Screen reader announcements for status changes
- ✅ Accessible form validation
- ✅ Proper heading hierarchy
- ✅ Minimum 44x44px touch targets

### Testing Accessibility

The app includes comprehensive accessibility testing utilities and documentation:

**Testing with Screen Readers:**
- iOS: Use **VoiceOver** (Settings → Accessibility → VoiceOver)
- Android: Use **TalkBack** (Settings → Accessibility → TalkBack)
- Web: Use **NVDA** (Windows) or **JAWS** (commercial)

**Test Scenarios Included:**
- Task list navigation
- Form submission and validation
- Error message announcements
- Pagination controls
- Settings and preferences

**For Detailed Testing Guide:**
See [ACCESSIBILITY.md](./ACCESSIBILITY.md) for comprehensive testing instructions and best practices.

### Accessibility Implementation Files

- `src/utils/accessibilityHelpers.ts` - Utility functions for accessibility
- `src/utils/accessibilityTesting.ts` - Testing guide and checklist
- `src/utils/__tests__/accessibilityHelpers.test.ts` - Accessibility tests
- `ACCESSIBILITY.md` - Full accessibility documentation

### Resources
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [React Native Accessibility](https://reactnative.dev/docs/accessibility)
- [Apple VoiceOver](https://www.apple.com/accessibility/voiceover/)
- [Google TalkBack](https://support.google.com/accessibility/android/answer/6283677)

---

**Contributing**
- Open an issue or PR. Keep changes focused and add tests for new behaviors.

**License**
This repository does not include a license file. Add one if you plan to publish or share.
