import React, { useEffect, useState } from "react";
import { useFonts } from "expo-font";
import { Provider } from "react-redux";
import { ActivityIndicator, View, LogBox } from "react-native";
import store from "./state-management/store";
import { AppNavigator } from "./routes/AppNavigator";
import firebase from "firebase/compat/app";
import {
  getFirestore,
  connectFirestoreEmulator,
  Firestore,
} from "firebase/firestore";
import { doc, getDoc } from "firebase/firestore";

import { getStorage } from "firebase/storage";
import { firebaseConfig } from "./firebaseConfig";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { UnAuthNavigator } from "./routes/UnAuthNavigator";

export default function App() {
  const [status, setStatus] = useState(false);
  const [loading, setLoading] = useState(false);

  let [fontsLoaded] = useFonts({
    IB: require("./assets/fonts/Inter-Bold.ttf"),
    IM: require("./assets/fonts/Inter-Medium.ttf"),
    IR: require("./assets/fonts/Inter-Regular.ttf"),
    IS: require("./assets/fonts/Inter-SemiBold.ttf"),
  });

  useEffect(() => {
    if (!firebase.apps.length) {
      const app = firebase.initializeApp(firebaseConfig);
      const db = getFirestore(app);
      const storage = getStorage(app);
      const auth = getAuth(app);

      onAuthStateChanged(auth, async (user) => {
        if (user) {
          const docRef = doc(db, "users", user?.uid);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            if (docSnap?.data()?.role == "admin") {
              setStatus("admin");
              setLoading(false);
            } else if (
              docSnap?.data()?.role == "worker" &&
              docSnap?.data()?.accountStatus == "enabled"
            ) {
              setStatus("worker");
              setLoading(false);
            } else if (docSnap?.data()?.accountStatus == "disabled") {
              signOut(auth)
                .then(() => {
                  setStatus(false);
                  setLoading(false);
                  alert("Your account is disabled!");
                })
                .catch((error) => {
                  // An error happened.
                });
            } else {
            }
          }
        } else {
          setLoading(false);
          setStatus(false);
        }
      });
    }
  }, []);

  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <ActivityIndicator size="large" color="black" />
      </View>
    );
  }

  if (loading) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <ActivityIndicator size="large" color="black" />
      </View>
    );
  }
  return (
    <Provider store={store}>
      {status ? <AppNavigator /> : <UnAuthNavigator />}
    </Provider>
  );
}
