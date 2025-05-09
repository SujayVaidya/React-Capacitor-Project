# Card Swiper

A mobile-first, Tinder-style card swiping prototype built with React, TypeScript, Tailwind CSS, and Capacitor for Android.

## 🔍 Demo

Live Demo: https://cart-swiper.netlify.app/


Loom : http://loom.com/share/9a083b191f4c4a6d9bc64c656e480f7cgi

Android App : https://drive.google.com/file/d/1LB5wmG_NLaIBUp_HDMBlXHpRf7UeJl7-/view?usp=sharing

## 🚀 Features

* **Tinder-like swiping**: Swipe cards left (pass), right (like), or up (add to cart).
* **3-card stack**: Always shows the next two cards underneath as outlines.
* **Visual feedback**: Fading icons (❤, ✖, 🛒) indicate the current action axis.
* **Action tracking**: Maintains lists of liked, disliked, and cart items.
* **Modals**: View liked/disliked and cart items in pop-up modals.
* **Completion overlay**: When all products are reviewed, shows a completion message and a refresh button.
* **Android build**: Wrapped with Capacitor.js, ready to generate an APK.

## 📂 Project Structure

```
├── android/                # Capacitor-generated Android project
├── dist/                   # Production build output (Vite)
├── src/
│   ├── components/
│   │   ├── CardStack.tsx   # Swipe logic & 3-card stack
│   │   ├── ProductCard.tsx # Product card UI
│   │   └── Modal.tsx       # Reusable modal component
│   ├── data/
│   │   └── products.ts     # Mock product data array
│   ├── App.tsx             # Layout, state management & modals
│   ├── main.tsx            # React entry point
│   └── index.css           # Tailwind CSS imports
├── capacitor.config.ts     # Capacitor configuration
├── tailwind.config.cjs     # Tailwind setup
├── vite.config.ts          # Vite configuration
├── package.json            # Scripts & dependencies
└── README.md               # << You are here >>
```

## 💻 Tech Stack

* **Framework**: React 18 + TypeScript 5
* **Bundler**: Vite 4
* **Styling**: Tailwind CSS 3
* **Mobile Wrapper**: Capacitor.js (Android)
* **Icons**: lucide-react

## 🚀 Getting Started

1. **Clone the repo**

   ```bash
   git clone https://github.com/yourusername/card-swiper.git
   cd card-swiper
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start dev server**

   ```bash
   npm run dev
   ```

4. **Open in browser**
   Navigate to `http://localhost:5173` (auto-opens). Toggle mobile view to test swiping.

## 📱 Android Build

1. **Build web assets**

   ```bash
   npm run build
   ```

2. **Sync with Capacitor**

   ```bash
   npx cap add android    # if not already added once
   npx cap sync android
   ```

3. **Open Android Studio**

   ```bash
   npx cap open android
   ```

4. **Run on Emulator or Device**

   * In Android Studio, select your AVD or physical device.
   * **Build** → **Build APK(s)** → **Build APK(s)**.
   * Locate `android/app/build/outputs/apk/debug/app-debug.apk` and install.

## 📜 Usage

* **Swipe Right**: Like (adds to Liked list).
* **Swipe Left**: Pass (adds to Disliked list).
* **Swipe Up**: Add to Cart.
* **Cart** button: View all added-to-cart items.
* **Details** button: View liked vs. disliked items.
* **Refresh**: Reload page to restart when you’ve reviewed all products.
---

*Happy swiping!*
