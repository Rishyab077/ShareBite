// ✅ Import Expo helper to register the root component
import { registerRootComponent } from 'expo';

// ✅ Import the main App component
import App from './App';

// ✅ Register the App component as the root of the project
// This ensures that Expo knows which component to load first when the app starts
registerRootComponent(App);
