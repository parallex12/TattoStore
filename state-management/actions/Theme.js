import { COLOR_SCHEME, GET_ERRORS } from "../types/types";
import AsyncStorage from "@react-native-async-storage/async-storage";
export const colorScheme = (setLoading) => async (dispatch) => {
  try {
    let themeColor = await AsyncStorage.getItem("theme");
    if (themeColor !== null) {
      let theme = {
        bg: themeColor == "light" ? "#F8F8F8" : "#2E2D2D",
        primaryBackground: themeColor == "light" ? "#fff" : "#222222",
        secondaryBackground: themeColor == "light" ? "#fff" : "#464646",
        buttonPrimary: themeColor == "light" ? "#7CA1E9" : "#FAF008",
        selectBoxCalendar: themeColor == "light" ? "#7CA1E9" : "#FAF008",
        unSelectBoxCalendar: themeColor == "light" ? "#C7C6C6" : "#fff",
        buttonSecondary: themeColor == "light" ? "#C7C6C6" : "#fff",
        buttonText: themeColor == "light" ? "#fff" : "#222",
        text: themeColor == "light" ? "#222" : "#fff",
        bgBorder: themeColor == "light" ? "#D3D1D1" : "#D3D1D1",
      };
      dispatch({ type: COLOR_SCHEME, payload: theme });
      setLoading(false);
    } else {
      themeColor = "light";
      let theme = {
        bg: themeColor == "light" ? "#F8F8F8" : "#2E2D2D",
        primaryBackground: themeColor == "light" ? "#fff" : "#222222",
        secondaryBackground: themeColor == "light" ? "#fff" : "#464646",
        buttonPrimary: themeColor == "light" ? "#7CA1E9" : "#FAF008",
        buttonSecondary: themeColor == "light" ? "#C7C6C6" : "#fff",
        selectBoxCalendar: themeColor == "light" ? "#7CA1E9" : "#FAF008",
        unSelectBoxCalendar: themeColor == "light" ? "#C7C6C6" : "#fff",
        buttonText: themeColor == "light" ? "#fff" : "#222",
        text: themeColor == "light" ? "#222" : "#fff",
        bgBorder: themeColor == "light" ? "#D3D1D1" : "#D3D1D1",
      };
      dispatch({ type: COLOR_SCHEME, payload: theme });
      setLoading(false);
    }
  } catch (e) {
    setLoading(false);
    dispatch({ type: GET_ERRORS, payload: e.message });
  }
};

export const changeTheme = () => async (dispatch) => {
  try {
    let themeColor = await AsyncStorage.getItem("theme");
    if (themeColor !== null) {
      await AsyncStorage.setItem(
        "theme",
        themeColor == "light" ? "dark" : "light"
      );
    } else {
      await AsyncStorage.setItem("theme", "dark");
    }
  } catch (e) {
    // saving error
    console.log(e.message);
  }
};
