import {
  DO_LOGIN,
  GET_ERRORS,
  DO_LOGOUT,
  GET_USER_DATA,
  DO_SIGNUP,
  GET_USER_DETAILS,
} from "../../types/types";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import {
  doc,
  setDoc,
  getDoc,
  updateDoc,
  addDoc,
  collection,
  query,
  where,
  getDocs,
  deleteDoc,
} from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

export const joinWorkerAccount = (data, setLoading) => async (dispatch) => {
  const auth = getAuth();
  try {
    const db = getFirestore();
    const q = query(
      collection(db, "users"),
      where("email", "==", data?.email),
      where("joiningId", "==", data?.id)
    );
    const querySnapshot = await getDocs(q);
    let userData = [];
    querySnapshot.forEach((doc) => {
      userData?.push({ id: doc.id, data: doc.data() });
    });

    if (querySnapshot.size == 0) {
      alert("Incorrect details!");
      setLoading(false);
      return null;
    }
    let userAlteredData = userData[0]?.data;

    createUserWithEmailAndPassword(
      auth,
      userAlteredData?.email,
      userAlteredData?.password
    )
      .then(async (userCredential) => {
        const user = userCredential.user;
        userAlteredData["joiningId"] = "approved";
        await setDoc(doc(db, "users", user?.uid), userAlteredData)
          .then(async (res) => {
            await deleteDoc(doc(db, "users", userData[0].id))
              .then((ress) => {
                alert("Welcome");
                setLoading(false);
              })
              .catch((error) => {
                setLoading(false);
                const errorMessage = error.message;
                dispatch({ type: GET_ERRORS, payload: errorMessage });
                console.log("error" + errorMessage);
              });
          })
          .catch((error) => {
            setLoading(false);
            const errorMessage = error.message;
            dispatch({ type: GET_ERRORS, payload: errorMessage });
            console.log("error" + errorMessage);
          });
      })
      .catch((error) => {
        setLoading(false);
        const errorMessage = error.message;
        console.log(errorMessage);
        dispatch({ type: GET_ERRORS, payload: errorMessage });
        let err = errorMessage.indexOf("/");
        let fErr = errorMessage.slice(err + 1, errorMessage.length - 2);
        if (fErr == "email-already-in-use") {
          alert("Email already in use");
        }
      });
  } catch (e) {
    setLoading(false);
    dispatch({ type: GET_ERRORS, payload: e.message });
    console.log(e.message);
  }
};

export const createWorkerAccountByAdmin =
  (data, setLoading, setCreatePopupVisible) => async (dispatch) => {
    try {
      const db = getFirestore();
      const storage = getStorage();
      const workerSign = await fetch(data?.workerSign);
      const workerSignBlob = await workerSign.blob();
      const workerSignRef = ref(
        storage,
        `images/workers/${data?.email + data?.password}sign.jpg`
      );

      const profile = await fetch(data?.profile);
      const profileBlob = await profile.blob();
      const profileRef = ref(
        storage,
        `images/workers/${data?.email + data?.password}profile.jpg`
      );
      const q = query(
        collection(db, "users"),
        where("email", "==", data?.email)
      );
      const querySnapshot = await getDocs(q);
      if (querySnapshot.size > 0) {
        alert("Email already in use");
        setLoading(false);
        return null;
      }
      if (!workerSign && !profile) {
        setLoading(false);
        alert("Something Went Wrong");
        return;
      }
      //Upload signature
      await uploadBytes(profileRef, profileBlob)
        .then((snapshot) => {
          getDownloadURL(ref(storage, snapshot?.metadata?.fullPath))
            .then(async (url2) => {
              data["profile"] = url2;
              //Upload Profile
              await uploadBytes(workerSignRef, workerSignBlob)
                .then((snapshot2) => {
                  getDownloadURL(ref(storage, snapshot2?.metadata?.fullPath))
                    .then(async (url3) => {
                      data["workerSign"] = url3;
                      let joiningId =
                        data?.name +
                        "" +
                        Math.floor(1000 + Math.random() * 9000);
                      data["joiningId"] = joiningId;

                      const docRef = await addDoc(
                        collection(db, "users"),
                        data
                      );
                      if (docRef?.id) {
                        alert(
                          `User Joining ID is ${joiningId.replace(/\s/g, "")}`
                        );
                        alert("User has been Created !!");
                        setLoading(false);
                        setCreatePopupVisible(false);
                      }
                    })
                    .catch((error) => {
                      const errorMessage = error.message;
                      console.log(errorMessage);
                      setLoading(false);
                      dispatch({ type: GET_ERRORS, payload: error.message });
                    });
                })
                .catch((error) => {
                  const errorMessage = error.message;
                  console.log(errorMessage);
                  setLoading(false);
                  dispatch({ type: GET_ERRORS, payload: error.message });
                });
            })
            .catch((error) => {
              const errorMessage = error.message;
              console.log(errorMessage);
              setLoading(false);
              dispatch({ type: GET_ERRORS, payload: error.message });
            });
        })
        .catch((error) => {
          const errorMessage = error.message;
          console.log(errorMessage);
          setLoading(false);
          dispatch({ type: GET_ERRORS, payload: error.message });
        });
    } catch (error) {
      setLoading(false);
      const errorMessage = error.message;
      dispatch({ type: GET_ERRORS, payload: errorMessage });
      console.log("error" + errorMessage);
      alert("Something Went Wrong");
    }
  };
export const editWorkerAccountByAdmin =
  (data, setLoading, setCreatePopupVisible, uid) => async (dispatch) => {
    try {
      const db = getFirestore();
      const storage = getStorage();
      const workerSign = await fetch(data?.workerSign);
      const workerSignBlob = await workerSign.blob();
      const workerSignRef = ref(
        storage,
        `images/workers/${data?.email + data?.password}sign.jpg`
      );

      const profile = await fetch(data?.profile);
      const profileBlob = await profile.blob();
      const profileRef = ref(
        storage,
        `images/workers/${data?.email + data?.password}profile.jpg`
      );

      if (!workerSign && !profile) {
        setLoading(false);
        alert("Something Went Wrong");
        return;
      }
      //Upload signature
      await uploadBytes(profileRef, profileBlob)
        .then((snapshot) => {
          getDownloadURL(ref(storage, snapshot?.metadata?.fullPath))
            .then(async (url2) => {
              data["profile"] = url2;
              //Upload Profile
              await uploadBytes(workerSignRef, workerSignBlob)
                .then((snapshot2) => {
                  getDownloadURL(ref(storage, snapshot2?.metadata?.fullPath))
                    .then(async (url3) => {
                      data["workerSign"] = url3;

                      const updateRef = doc(db, "users", uid);
                      await updateDoc(updateRef, data)
                        .then((res) => {
                          setCreatePopupVisible(false);
                          alert("Updated");
                        })
                        .catch((error) => {
                          const errorMessage = error.message;
                          console.log(errorMessage);
                          setLoading(false);
                          dispatch({
                            type: GET_ERRORS,
                            payload: error.message,
                          });
                        });
                    })
                    .catch((error) => {
                      const errorMessage = error.message;
                      console.log(errorMessage);
                      setLoading(false);
                      dispatch({ type: GET_ERRORS, payload: error.message });
                    });
                })
                .catch((error) => {
                  const errorMessage = error.message;
                  console.log(errorMessage);
                  setLoading(false);
                  dispatch({ type: GET_ERRORS, payload: error.message });
                });
            })
            .catch((error) => {
              const errorMessage = error.message;
              console.log(errorMessage);
              setLoading(false);
              dispatch({ type: GET_ERRORS, payload: error.message });
            });
        })
        .catch((error) => {
          const errorMessage = error.message;
          console.log(errorMessage);
          setLoading(false);
          dispatch({ type: GET_ERRORS, payload: error.message });
        });
    } catch (error) {
      setLoading(false);
      const errorMessage = error.message;
      dispatch({ type: GET_ERRORS, payload: errorMessage });
      console.log("error" + errorMessage);
      alert("Something Went Wrong");
    }
  };

export const login = (data, setLoading) => async (dispatch) => {
  try {
    const auth = getAuth();
    const db = getFirestore();
    signInWithEmailAndPassword(auth, data?.email, data?.password)
      .then((userCredential) => {
        const user = userCredential.user;
      })
      .catch((error) => {
        setLoading(false);
        const errorMessage = error.message;
        dispatch({ type: GET_ERRORS, payload: errorMessage });
        alert("Email or password is incorrect !");
      });
  } catch (e) {
    setLoading(false);
    dispatch({ type: GET_ERRORS, payload: e.message });
  }
};

export const SignOut = (data, setLoading) => async (dispatch) => {
  try {
    const auth = getAuth();
    signOut(auth)
      .then(() => {})
      .catch((error) => {
        // An error happened.
      });
  } catch (e) {
    setLoading(false);
    dispatch({ type: GET_ERRORS, payload: e.message });
  }
};

export const getUserDetails = (id, setLoading) => async (dispatch) => {
  try {
    const db = getFirestore();
    const docRef = doc(db, "users", id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      setLoading(false);
      dispatch({ type: GET_USER_DETAILS, payload: docSnap.data() });
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
      setLoading(false);
    }
  } catch (e) {
    setLoading(false);
    dispatch({ type: GET_ERRORS, payload: e.message });
  }
};

export const updateAccountType =
  (id, setLoading, navigation) => async (dispatch) => {
    try {
      console.log(id);
      const db = getFirestore();
      const washingtonRef = doc(db, "users", id);
      await updateDoc(washingtonRef, {
        accountType: "old",
      })
        .then(async (res) => {
          const docRef = doc(db, "users", id);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            setLoading(false);
            dispatch({ type: GET_USER_DETAILS, payload: docSnap.data() });
            navigation.navigate("Home");
          }
        })
        .catch((e) => {
          setLoading(false);
          dispatch({ type: GET_ERRORS, payload: e.message });
        });
    } catch (e) {
      setLoading(false);
      dispatch({ type: GET_ERRORS, payload: e.message });
    }
  };
