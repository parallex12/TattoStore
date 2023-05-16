import React, { useEffect, useState, useRef } from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { RFValue as rf } from "react-native-responsive-fontsize";
import {
  ActivityIndicator,
  StyleSheet,
  View,
  Text,
  Image,
  Modal,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { connect } from "react-redux";
import { changeTheme, colorScheme } from "../state-management/actions/Theme";
import { editAgendaPopup } from "../state-management/actions/Features/Actions";
import { AntDesign } from "@expo/vector-icons";
import Checkbox from "expo-checkbox";
import FormLeft from "./PopupFormParts/FormLeft";
import FormRight from "./PopupFormParts/FormRight";
import CalendarPopup from "./PopupFormParts/CalendarPopup";
import { updateAppiontment } from "../state-management/actions/Features/Actions";

const EditAgendaPopup = (props) => {
  let color = props?.color_scheme;
  const { prevData, docId, imageID, navigation } = props;
  const [showPopup, setShowPopup] = useState(false);
  const [calendarPopup, setCalendarPopup] = useState(false);
  const [isChecked, setChecked] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    category: null,
    agenda: null,
    bookingDate: null,
    bookingTiming: null,
    agenda: null,
    name: null,
    surname: null,
    email: null,
    phoneNumber: null,
    budget: null,
    serviceNotes: null,
    paymentMethod: null,
    paymentPrice: null,
    servicePrice: null,
    tattooImage: null,
    clientComeFrom: null,
    status: "Pending",
  });

  useEffect(() => {
    setFormData(props?.prevData);
  }, [props?.prevData, showPopup]);

  useEffect(() => {
    setShowPopup(props?.edit_agenda_popup);
  }, [props?.edit_agenda_popup]);

  const styles = StyleSheet.create({
    container: {
      width: wp("100%"),
      height: hp("100%"),
      position: "absolute",
      zIndex: 99999,
      top: 0,
      display: props?.edit_agenda_popup ? "flex" : "none",
      alignItems: "center",
      justifyContent: "center",
    },
    layer: {
      backgroundColor: "#222",
      width: "100%",
      height: "100%",
      position: "absolute",
      zIndex: 99999,
      top: 0,
      opacity: 0.5,
    },
    formBody: {
      width: "51%",
      height: "85%",
      borderRadius: 20,
      backgroundColor: color?.primaryBackground,
      paddingHorizontal: wp("2%"),
      zIndex: 9999999,
      flexDirection: "row",
      paddingVertical: hp("3%"),
    },
    formLeft: {
      flex: 1.2,
      alignItems: "center",
      justifyContent: "flex-start",
      paddingRight: wp("1%"),
    },
    formRight: {
      flex: 1,
      alignItems: "center",
      justifyContent: "flex-start",
      paddingLeft: wp("1%"),
    },
    formFieldStyle1: {
      width: "100%",
      height: hp("4.3%"),
      borderWidth: 1,
      borderColor: color?.bgBorder,
      borderRadius: 6,
      paddingHorizontal: "4%",
      paddingVertical: 5,
      marginBottom: hp("1.5%"),
    },
    formFieldStyle2Wrapper: {
      width: "100%",
      paddingVertical: 5,
    },
    checkbox: {
      marginVertical: 4,
      width: hp("2%"),
      height: hp("2%"),
      borderRadius: 4,
    },
    formFieldStyle2Text: {
      color: color?.text,
      fontSize: rf(7),
      fontFamily: "IM",
      marginBottom: 6,
    },
    formFieldStyle2: {
      width: "50%",
      height: hp("4.3%"),
      borderWidth: 1,
      borderColor: color?.bgBorder,
      borderRadius: 6,
    },
    loadingLayer: {
      width: "100%",
      height: "100%",
      backgroundColor: "rgba(0,0,0,0.5)",
      position: "absolute",
      zIndex: 999999999999,
      alignItems: "center",
      justifyContent: "center",
    },
  });

  const onSubmit = () => {
    // if (
    //   Object.values(formData).includes(null) ||
    //   Object.values(formData).includes("")
    // ) {
    //   alert("Fill all details");
    // } else {
    //   setLoading(true);
    //   props?.createAppiontment(formData,setLoading)
    // }
    setLoading(true);
    props?.updateAppiontment(formData, docId, imageID, navigation, setLoading);
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={showPopup}
      onRequestClose={() => {
        Alert.alert("Modal has been closed.");
        setShowPopup(!showPopup);
      }}
    >
      <View style={styles.container}>
        {loading && (
          <View style={styles.loadingLayer}>
            <ActivityIndicator size="large" color={"#fff"} />
          </View>
        )}
        <TouchableOpacity
          style={styles.layer}
          onPress={() => props?.editAgendaPopup(showPopup)}
        ></TouchableOpacity>
        {/* Popup Body Starts here */}
        {calendarPopup && (
          <CalendarPopup
            setCalendarPopup={setCalendarPopup}
            calendarPopup={calendarPopup}
            setFormData={setFormData}
            formData={formData}
          />
        )}
        <View style={styles.formBody}>
          {/*Form Left Starts here */}
          <FormLeft
            setFormData={setFormData}
            formData={formData}
            calendarPopup={calendarPopup}
            onOpenCalendar={() => setCalendarPopup(!calendarPopup)}
            onSubmit={onSubmit}
          />
          {/*Form Right Starts here */}
          <FormRight formData={formData} setFormData={setFormData} />
        </View>
        {/* Popup Body Ends here */}
      </View>
    </Modal>
  );
};

const mapStateToProps = (state) => ({
  errors: state.errors.errors,
  color_scheme: state.main.color_scheme,
  edit_agenda_popup: state.main.edit_agenda_popup,
});
export default connect(mapStateToProps, {
  changeTheme,
  colorScheme,
  editAgendaPopup,
  updateAppiontment,
})(EditAgendaPopup);
