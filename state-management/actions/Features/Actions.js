import {
  GET_ERRORS,
  CREATE_AGENDA_POPUP,
  SELECTED_APPIONTMENT_DATE,
  GET_All_APPIONTMENT,
  EDIT_AGENDA_POPUP,
  GET_ALL_CLIENTS,
  GET_ALL_WORKERS,
  GET_ALL_PRODUCTS,
} from "../../types/types";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";
import {
  doc,
  addDoc,
  collection,
  updateDoc,
  query,
  where,
  onSnapshot,
  setDoc,
  getDocs,
  deleteDoc,
} from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

export const createAgendaPopup = (showPopup) => async (dispatch) => {
  try {
    if (showPopup) {
      dispatch({ type: CREATE_AGENDA_POPUP, payload: false });
    } else {
      dispatch({ type: CREATE_AGENDA_POPUP, payload: true });
    }
  } catch (e) {
    setLoading(false);
    dispatch({ type: GET_ERRORS, payload: e.message });
    console.log(e.message);
  }
};
export const editAgendaPopup = (showPopup) => async (dispatch) => {
  try {
    if (showPopup) {
      dispatch({ type: EDIT_AGENDA_POPUP, payload: false });
    } else {
      dispatch({ type: EDIT_AGENDA_POPUP, payload: true });
    }
  } catch (e) {
    setLoading(false);
    dispatch({ type: GET_ERRORS, payload: e.message });
    console.log(e.message);
  }
};

export const selectAppiontmentDate = (data) => async (dispatch) => {
  try {
    dispatch({
      type: SELECTED_APPIONTMENT_DATE,
      payload: data,
    });
  } catch (e) {
    dispatch({ type: GET_ERRORS, payload: e.message });
    console.log(e.message);
  }
};

export const createClient = (data, setLoading) => async (dispatch) => {
  try {
    const db = firebase.firestore();
    var id = Math.random().toString(16).slice(2);
    await setDoc(doc(db, "clients", id), data)
      .then(async (res) => {
        const querySnapshot = await getDocs(collection(db, "clients"));
        let arr = [];
        querySnapshot.forEach((doc) => {
          arr.push({ id: doc.id, data: doc.data() });
        });
        dispatch({ type: GET_ALL_CLIENTS, payload: arr });
        alert("Client Added");
        setLoading(false);
      })
      .catch((error) => {
        const errorMessage = error.message;
        console.log(errorMessage);
        setLoading(false);
        dispatch({ type: GET_ERRORS, payload: error.message });
      });
  } catch (e) {
    dispatch({ type: GET_ERRORS, payload: e.message });
    console.log(e.message);
  }
};

export const createProduct =
  (data, setLoading, setCreatePopupVisible) => async (dispatch) => {
    try {
      const storage = firebase.storage();
      const db = firebase.firestore();
      const imgRes = await fetch(data?.productImage);
      const blob = await imgRes.blob();
      var id = "id" + Math.random().toString(16).slice(2);
      const imgRef = ref(storage, `images/products/${data?.Product + id}.jpg`);
      var id = Math.random().toString(16).slice(2);

      uploadBytes(imgRef, blob)
        .then((snapshot) => {
          getDownloadURL(ref(storage, snapshot?.metadata?.fullPath))
            .then(async (url2) => {
              data["productImage"] = url2;
              await setDoc(doc(db, "products", id), data)
                .then(async (res) => {
                  const querySnapshot = await getDocs(
                    collection(db, "products")
                  );
                  let arr = [];
                  querySnapshot.forEach((doc) => {
                    arr.push({ id: doc.id, data: doc.data() });
                  });
                  dispatch({ type: GET_ALL_PRODUCTS, payload: arr });
                  alert("Product Added");
                  setLoading(false);
                  setCreatePopupVisible(false);
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
    } catch (e) {
      dispatch({ type: GET_ERRORS, payload: e.message });
      console.log(e.message);
    }
  };

export const editProduct =
  (data, setLoading, setCreatePopupVisible, imgPath, uid) =>
  async (dispatch) => {
    try {
      const storage = firebase.storage();
      const db = firebase.firestore();
      const imgRes = await fetch(data?.productImage);
      const blob = await imgRes.blob();
      var id = "id" + Math.random().toString(16).slice(2);
      const imgRef = ref(storage, `images/products/${imgPath}.jpg`);
      var id = Math.random().toString(16).slice(2);

      uploadBytes(imgRef, blob)
        .then((snapshot) => {
          getDownloadURL(ref(storage, snapshot?.metadata?.fullPath))
            .then(async (url2) => {
              data["productImage"] = url2;
              await setDoc(doc(db, "products", uid), data)
                .then(async (res) => {
                  const querySnapshot = await getDocs(
                    collection(db, "products")
                  );
                  let arr = [];
                  querySnapshot.forEach((doc) => {
                    arr.push({ id: doc.id, data: doc.data() });
                  });
                  dispatch({ type: GET_ALL_PRODUCTS, payload: arr });
                  alert("Product Updated");
                  setLoading(false);
                  setCreatePopupVisible(false);
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
    } catch (e) {
      dispatch({ type: GET_ERRORS, payload: e.message });
      console.log(e.message);
    }
  };

export const getAllClients = (setLoading) => async (dispatch) => {
  try {
    const db = firebase.firestore();
    const querySnapshot = await getDocs(collection(db, "clients"));
    let arr = [];
    querySnapshot.forEach((doc) => {
      arr.push({ id: doc.id, data: doc.data() });
    });
    dispatch({ type: GET_ALL_CLIENTS, payload: arr });
    setLoading(false);
  } catch (e) {
    dispatch({ type: GET_ERRORS, payload: e.message });
    console.log(e.message);
  }
};

export const deleteAppiontment =
  (id, navigation, setLoading) => async (dispatch) => {
    try {
      const db = firebase.firestore();
      await deleteDoc(doc(db, "appiontments", id));
      setLoading(false);
      navigation.navigate("Dashboard");
    } catch (e) {
      dispatch({ type: GET_ERRORS, payload: e.message });
      console.log(e.message);
      setLoading(false);
    }
  };

export const deleteProduct = (id, setLoading) => async (dispatch) => {
  try {
    const db = firebase.firestore();
    await deleteDoc(doc(db, "products", id));
    setLoading(false);
  } catch (e) {
    dispatch({ type: GET_ERRORS, payload: e.message });
    console.log(e.message);
    setLoading(false);
  }
};

export const disableWorkerAccount =
  (id, accountStatus, setLoading, onRefresh) => async (dispatch) => {
    try {
      const db = firebase.firestore();
      const userRef = doc(db, "users", id);
      await updateDoc(userRef, {
        accountStatus: accountStatus == "disabled" ? "enabled" : "disabled",
      })
        .then((res) => {
          setLoading(false);
          alert(
            `Trabajador ha sido ${
              accountStatus == "disabled" ? "activado" : "desactivado"
            }`
          );
        })
        .catch((e) => {
          setLoading(false);
          console.log(e.message);
          alert("Something went wrong!");
        });
    } catch (e) {
      dispatch({ type: GET_ERRORS, payload: e.message });
      console.log(e.message);
      setLoading(false);
    }
  };

export const getAllProducts = (setLoading) => async (dispatch) => {
  try {
    const db = firebase.firestore();
    const querySnapshot = await getDocs(collection(db, "products"));
    let arr = [];
    querySnapshot.forEach((doc) => {
      arr.push({ id: doc.id, data: doc.data() });
    });
    setLoading(false);
    dispatch({ type: GET_ALL_PRODUCTS, payload: arr });
  } catch (e) {
    dispatch({ type: GET_ERRORS, payload: e.message });
    console.log(e.message);
  }
};
export const updateProduct = (data, docId, setLoading) => async (dispatch) => {
  try {
    const db = firebase.firestore();
    const updateRef = doc(db, "products", docId);

    await updateDoc(updateRef, data)
      .then(async (res) => {
        const querySnapshot = await getDocs(collection(db, "products"));
        let arr = [];
        querySnapshot.forEach((doc) => {
          arr.push({ id: doc.id, data: doc.data() });
        });
        dispatch({ type: GET_ALL_PRODUCTS, payload: arr });
        setLoading(false);
      })
      .catch((error) => {
        const errorMessage = error.message;
        console.log(errorMessage);

        setLoading(false);
        dispatch({ type: GET_ERRORS, payload: error.message });
      });
  } catch (e) {
    console.log(e.message);
  }
};

export const createAppiontment = (data, setLoading) => async (dispatch) => {
  try {
    const storage = firebase.storage();
    const db = firebase.firestore();
    const imgRes = await fetch(data?.tattooImage);
    const blob = await imgRes.blob();
    var id = "id" + Math.random().toString(16).slice(2);
    const imgRef = ref(storage, `images/appiontments/${data?.email + id}.jpg`);

    uploadBytes(imgRef, blob)
      .then((snapshot) => {
        getDownloadURL(ref(storage, snapshot?.metadata?.fullPath))
          .then(async (url2) => {
            data["tattooImage"] = url2;
            await addDoc(collection(db, "appiontments"), data)
              .then((res) => {
                dispatch({ type: CREATE_AGENDA_POPUP, payload: false });
                alert("Successfull");
                setLoading(false);
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
    console.log(errorMessage);
    console.log("try catch");
    dispatch({ type: GET_ERRORS, payload: error.message });
  }
};

export const updateAppiontment =
  (data, docId, imageID, navigation, setLoading) => async (dispatch) => {
    try {
      const storage = firebase.storage();
      const db = firebase.firestore();
      const imgRes = await fetch(data?.tattooImage);
      const blob = await imgRes.blob();
      var id = "id" + imageID;
      const imgRef = ref(
        storage,
        `images/appiontments/${data?.email + id}.jpg`
      );

      const updateRef = doc(db, "appiontments", docId);

      uploadBytes(imgRef, blob)
        .then((snapshot) => {
          getDownloadURL(ref(storage, snapshot?.metadata?.fullPath))
            .then(async (url2) => {
              data["tattooImage"] = url2;
              await updateDoc(updateRef, data)
                .then((res) => {
                  alert("Edited done.");
                  setLoading(false);
                  dispatch({ type: EDIT_AGENDA_POPUP, payload: false });
                  navigation.navigate("Dashboard");
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
      console.log(errorMessage);
      console.log("try catch");
      dispatch({ type: GET_ERRORS, payload: error.message });
    }
  };

export const getAllAppiontments = (setLoading) => async (dispatch) => {
  try {
    const db = firebase.firestore();
    const q = query(
      collection(db, "appiontments"),
      where("status", "!=", "expired")
    );
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const appiontments = [];
      querySnapshot.forEach((doc) => {
        appiontments.push({ id: doc.id, data: doc.data() });
      });
      dispatch({ type: GET_All_APPIONTMENT, payload: appiontments });
      setLoading(false);
    });
  } catch (error) {
    setLoading(false);
    const errorMessage = error.message;
    console.log(errorMessage);
    console.log("try catch");
    dispatch({ type: GET_ERRORS, payload: error.message });
  }
};

export const updateSession = (data, docId, setLoading,navigation) => async (dispatch) => {
  try {
    const db = firebase.firestore();
    const updateRef = doc(db, "appiontments", docId);

    await updateDoc(updateRef, data)
      .then((res) => {
        alert("Session Completed");
        setLoading(false);
        navigation.navigate("Dashboard");
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
    console.log(errorMessage);
    dispatch({ type: GET_ERRORS, payload: error.message });
  }
};

export const getAllWorkers = (setLoading) => async (dispatch) => {
  try {
    const db = firebase.firestore();
    const q = query(collection(db, "users"), where("role", "==", "worker"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const workers = [];
      querySnapshot.forEach((doc) => {
        workers.push({ id: doc.id, data: doc.data() });
      });
      dispatch({ type: GET_ALL_WORKERS, payload: workers });
      setLoading(false);
    });
  } catch (error) {
    setLoading(false);
    const errorMessage = error.message;
    console.log(errorMessage);
    console.log("try catch");
    dispatch({ type: GET_ERRORS, payload: error.message });
  }
};
