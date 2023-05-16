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
  TextInput,
} from "react-native";
import { connect } from "react-redux";
import DropDownPicker from "react-native-dropdown-picker";
import { categories } from "./CategoriesData";

const DropDown = (props) => {
  let color = props?.color_scheme;
  const [open, setOpen] = useState(false);
  const [fullData, setFullData] = useState({});
  const [value, setValue] = useState(null);

  const styles = StyleSheet.create({
    DropDownWrapper: {
      width: "100%",
      height: hp("4.3%"),
      flexDirection: "row",
      zIndex: 999999999,
      alignItems: "center",
      justifyContent: "center",
      borderWidth: 0.5,
      borderColor: color?.text,
      borderRadius: 4,
      backgroundColor: color?.primaryBackground,
    },
    DropDownWrapperText: {
      color: color?.text,
      fontSize: rf(6.5),
      fontFamily: "IR",
      paddingHorizontal: 2,
    },
    selectedItem: {
      backgroundColor: color?.buttonPrimary,
      zIndex: 99999999999999,
    },
    selectedItemText: {
      color: color?.buttonText,
      fontSize: rf(6.5),
      fontFamily: "IR",
    },
    itemCont: {
      backgroundColor: color?.bg,
      zIndex: 99999999999,
    },
  });
  const [items, setItems] = useState([]);

  useEffect(() => {
    setItems(props?.items);
  }, []);

  useEffect(() => {
    if (value && props?.type == "category") {
      props?.setFormData((prev) => ({ ...prev, category: value }));
    } else if (value && props?.type == "paymentMethod") {
      props?.setFormData((prev) => ({ ...prev, paymentMethod: value }));
    } else if (value && props?.type == "worker") {
      props?.setFormData((prev) => ({
        ...prev,
        agenda: value,
        agentDetails: fullData,
      }));
    } else {
    }
  }, [value]);

  return (
    <DropDownPicker
      open={open}
      value={
        value != null
          ? value
          : props?.type == "category"
          ? props?.formData?.category
          : props?.formData?.paymentMethod
      }
      items={items}
      setOpen={setOpen}
      onSelectItem={(a) => setFullData(a)}
      setValue={setValue}
      setItems={setItems}
      placeholder={props?.placeholder}
      containerStyle={[styles.DropDownWrapper, { ...props?.style }]}
      textStyle={styles.DropDownWrapperText}
      labelStyle={styles.DropDownWrapperText}
      props={{ style: [styles.DropDownWrapper, { ...props?.style }] }}
      selectedItemContainerStyle={styles.selectedItem}
      selectedItemLabelStyle={styles.selectedItemText}
      arrowIconContainerStyle={{
        marginRight: 10,
      }}
      listItemContainerStyle={styles.itemCont}
    />
  );
};

const mapStateToProps = (state) => ({
  errors: state.errors.errors,
  color_scheme: state.main.color_scheme,
});
export default connect(mapStateToProps, {})(DropDown);
