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
  TouchableOpacity,
} from "react-native";
import { connect } from "react-redux";
import { selectAppiontmentDate } from "../../state-management/actions/Features/Actions";

const DayBoxTest = React.memo((props) => {
  const delay = (ms) => new Promise((res) => setTimeout(res, ms));
  let color = props?.color_scheme;
  const [perhour, setPerhour] = useState(new Array(36).fill({}));
  const [selectedCurrentDate, setSelectedCurrentDate] = useState(null);
  const [loading, setLoading] = useState(false);

  const styles = StyleSheet.create({
    timeingLabelColBox: {
      width: "2.377%",
      height: "60%",
      marginRight: ".4%",
    },
    loader: {
      position: "absolute",
      zIndex: 9999999999,
      alignSelf: "center",
    },
    loader: {
      width: "100%",
    },
  });

  useEffect(() => {
    props?.date == props?.selectedCurrentDate?.date &&
      setSelectedCurrentDate(props?.selectedCurrentDate);
  }, []);

  const onSelectDate = async (date, time) => {
    if (selectedCurrentDate?.from) {
      setSelectedCurrentDate({
        date: date,
        from: selectedCurrentDate?.from,
        to: time,
      });
      if (selectedCurrentDate?.date != props?.date) {
        setLoading(true);
        await delay(500);
        props?.setSelectedCurrentDate({
          date: date,
          from: selectedCurrentDate?.from,
          to: time,
        });
        setLoading(false);
      }
    } else {
      setSelectedCurrentDate({
        date: date,
        from: time,
        to: selectedCurrentDate?.to,
      });
      if (selectedCurrentDate?.date != props?.date) {
        setLoading(true);
        await delay(500);
        props?.setSelectedCurrentDate({
          date: date,
          from: time,
          to: selectedCurrentDate?.to,
        });
        setLoading(false);
      }
    }
  };

  return (
    <>
      <TouchableOpacity
        style={[
          styles.timeingLabelColBox,
          {
            backgroundColor:
              props?.selectedCurrentDate.filter(
                (e) => e.time === 15 && e.date == props?.date
              ).length > 0
                ? color?.buttonPrimary
                : color?.buttonSecondary,
          },
        ]}
        onPress={() => {
          props?.onSelectDate(props?.date, 15);
        }}
      ></TouchableOpacity>
       <TouchableOpacity
        style={[
          styles.timeingLabelColBox,
          {
            backgroundColor:
              props?.selectedCurrentDate.filter(
                (e) => e.time === 30 && e.date == props?.date
              ).length > 0
                ? color?.buttonPrimary
                : color?.buttonSecondary,
          },
        ]}
        onPress={() => {
          props?.onSelectDate(props?.date, 30);
        }}
      ></TouchableOpacity>
       <TouchableOpacity
        style={[
          styles.timeingLabelColBox,
          {
            backgroundColor:
              props?.selectedCurrentDate.filter(
                (e) => e.time === 45 && e.date == props?.date
              ).length > 0
                ? color?.buttonPrimary
                : color?.buttonSecondary,
          },
        ]}
        onPress={() => {
          props?.onSelectDate(props?.date, 45);
        }}
      ></TouchableOpacity>
       <TouchableOpacity
        style={[
          styles.timeingLabelColBox,
          {
            backgroundColor:
              props?.selectedCurrentDate.filter(
                (e) => e.time === 60 && e.date == props?.date
              ).length > 0
                ? color?.buttonPrimary
                : color?.buttonSecondary,
          },
        ]}
        onPress={() => {
          props?.onSelectDate(props?.date, 60);
        }}
      ></TouchableOpacity>
       <TouchableOpacity
        style={[
          styles.timeingLabelColBox,
          {
            backgroundColor:
              props?.selectedCurrentDate.filter(
                (e) => e.time === 75 && e.date == props?.date
              ).length > 0
                ? color?.buttonPrimary
                : color?.buttonSecondary,
          },
        ]}
        onPress={() => {
          props?.onSelectDate(props?.date, 75);
        }}
      ></TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.timeingLabelColBox,
          {
            backgroundColor:
              props?.selectedCurrentDate.filter(
                (e) => e.time === 90 && e.date == props?.date
              ).length > 0
                ? color?.buttonPrimary
                : color?.buttonSecondary,
          },
        ]}
        onPress={() => {
          props?.onSelectDate(props?.date, 90);
        }}
      ></TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.timeingLabelColBox,
          {
            backgroundColor:
              props?.selectedCurrentDate.filter(
                (e) => e.time === 105 && e.date == props?.date
              ).length > 0
                ? color?.buttonPrimary
                : color?.buttonSecondary,
          },
        ]}
        onPress={() => {
          props?.onSelectDate(props?.date, 105);
        }}
      ></TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.timeingLabelColBox,
          {
            backgroundColor:
              props?.selectedCurrentDate.filter(
                (e) => e.time === 120 && e.date == props?.date
              ).length > 0
                ? color?.buttonPrimary
                : color?.buttonSecondary,
          },
        ]}
        onPress={() => {
          props?.onSelectDate(props?.date, 120);
        }}
      ></TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.timeingLabelColBox,
          {
            backgroundColor:
              props?.selectedCurrentDate.filter(
                (e) => e.time === 135 && e.date == props?.date
              ).length > 0
                ? color?.buttonPrimary
                : color?.buttonSecondary,
          },
        ]}
        onPress={() => {
          props?.onSelectDate(props?.date, 135);
        }}
      ></TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.timeingLabelColBox,
          {
            backgroundColor:
              props?.selectedCurrentDate.filter(
                (e) => e.time === 150 && e.date == props?.date
              ).length > 0
                ? color?.buttonPrimary
                : color?.buttonSecondary,
          },
        ]}
        onPress={() => {
          props?.onSelectDate(props?.date, 150);
        }}
      ></TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.timeingLabelColBox,
          {
            backgroundColor:
              props?.selectedCurrentDate.filter(
                (e) => e.time === 150 && e.date == props?.date
              ).length > 0
                ? color?.buttonPrimary
                : color?.buttonSecondary,
          },
        ]}
        onPress={() => {
          props?.onSelectDate(props?.date, 150);
        }}
      ></TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.timeingLabelColBox,
          {
            backgroundColor:
              props?.selectedCurrentDate.filter(
                (e) => e.time === 150 && e.date == props?.date
              ).length > 0
                ? color?.buttonPrimary
                : color?.buttonSecondary,
          },
        ]}
        onPress={() => {
          props?.onSelectDate(props?.date, 150);
        }}
      ></TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.timeingLabelColBox,
          {
            backgroundColor:
              props?.selectedCurrentDate.filter(
                (e) => e.time === 150 && e.date == props?.date
              ).length > 0
                ? color?.buttonPrimary
                : color?.buttonSecondary,
          },
        ]}
        onPress={() => {
          props?.onSelectDate(props?.date, 150);
        }}
      ></TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.timeingLabelColBox,
          {
            backgroundColor:
              props?.selectedCurrentDate.filter(
                (e) => e.time === 150 && e.date == props?.date
              ).length > 0
                ? color?.buttonPrimary
                : color?.buttonSecondary,
          },
        ]}
        onPress={() => {
          props?.onSelectDate(props?.date, 150);
        }}
      ></TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.timeingLabelColBox,
          {
            backgroundColor:
              props?.selectedCurrentDate.filter(
                (e) => e.time === 150 && e.date == props?.date
              ).length > 0
                ? color?.buttonPrimary
                : color?.buttonSecondary,
          },
        ]}
        onPress={() => {
          props?.onSelectDate(props?.date, 150);
        }}
      ></TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.timeingLabelColBox,
          {
            backgroundColor:
              props?.selectedCurrentDate.filter(
                (e) => e.time === 150 && e.date == props?.date
              ).length > 0
                ? color?.buttonPrimary
                : color?.buttonSecondary,
          },
        ]}
        onPress={() => {
          props?.onSelectDate(props?.date, 150);
        }}
      ></TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.timeingLabelColBox,
          {
            backgroundColor:
              props?.selectedCurrentDate.filter(
                (e) => e.time === 150 && e.date == props?.date
              ).length > 0
                ? color?.buttonPrimary
                : color?.buttonSecondary,
          },
        ]}
        onPress={() => {
          props?.onSelectDate(props?.date, 150);
        }}
      ></TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.timeingLabelColBox,
          {
            backgroundColor:
              props?.selectedCurrentDate.filter(
                (e) => e.time === 150 && e.date == props?.date
              ).length > 0
                ? color?.buttonPrimary
                : color?.buttonSecondary,
          },
        ]}
        onPress={() => {
          props?.onSelectDate(props?.date, 150);
        }}
      ></TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.timeingLabelColBox,
          {
            backgroundColor:
              props?.selectedCurrentDate.filter(
                (e) => e.time === 150 && e.date == props?.date
              ).length > 0
                ? color?.buttonPrimary
                : color?.buttonSecondary,
          },
        ]}
        onPress={() => {
          props?.onSelectDate(props?.date, 150);
        }}
      ></TouchableOpacity>
      
    </>
  );
});

const mapStateToProps = (state) => ({
  errors: state.errors.errors,
  color_scheme: state.main.color_scheme,
  selected_appiontment_date: state.main.selected_appiontment_date,
});
export default connect(mapStateToProps, { selectAppiontmentDate })(DayBoxTest);
