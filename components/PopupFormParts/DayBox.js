import React, { useEffect, useState, useRef, useMemo, memo } from "react";
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
import { apointments } from "./AppiontmentData";

const DayBox = (props) => {
  let color = props?.color_scheme;
  const [perhour, setPerhour] = useState(new Array(37).fill({}));
  let openHours = ["11", "12", "13", "14", "15", "16", "17", "18", "19", "20"];
  const styles = StyleSheet.create({
    timeingLabelColBox: {
      width: "2.3%",
      height: "60%",
      marginRight: ".4%",
    },
    bookedBox: {
      width: "2.3%",
      height: "60%",
      marginRight: ".4%",
      backgroundColor: "transparent",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-around",
    },
    bookedBoxInner: {
      width: "18%",
      height: "100%",
      backgroundColor: "#f7b0b0",
      // marginRight:'10%',
      borderRadius: 3,
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

  const onSelectDate = async (date, time) => {
    let h = time / 4 - 0.25;
    let minutes = h % 1 == 0 ? "00" : (h % 1) * 60;
    let selectedTime = `${openHours[parseInt(h)]}:${minutes}`;
    let from = null;
    let to = null;
    if (props?.selectedCurrentDate?.date != props?.date) {
      props?.setSelectedCurrentDate({
        date: date,
        from: time,
        to: null,
        selectedTime: { from: selectedTime, to: null },
      });
    } else {
      if (time < props?.selectedCurrentDate?.from) {
        props?.setSelectedCurrentDate({
          date: date,
          from: time,
          to: null,
          selectedTime: { from: selectedTime, to: null },
        });
        return;
      }
      if (props?.selectedCurrentDate?.from) {
        props?.setSelectedCurrentDate({
          date: date,
          from: props?.selectedCurrentDate?.from,
          to: time,
          selectedTime: {
            from: props?.selectedCurrentDate?.selectedTime?.from,
            to: selectedTime,
          },
        });
      } else {
        props?.setSelectedCurrentDate({
          date: date,
          from: time,
          to: props?.selectedCurrentDate?.to,
          selectedTime: {
            from: selectedTime,
            to: props?.selectedCurrentDate?.selectedTime?.to,
          },
        });
      }
    }
  };

  return (
    <>
      {perhour?.map((item, index2) => {
        index2 = index2 + 1;
        let h = index2 / 4 - 0.25;
        let minutes = h % 1 == 0 ? "00" : (h % 1) * 60;
        let selectedTime = `${openHours[parseInt(h)]}:${minutes}`;
        let bookedSlots = props?.get_all_appiontments.find(
          (o) => parseInt(o?.data?.bookingDateObject?.day) === props?.date
        );
        let bookedBox =
          index2 >= bookedSlots?.data?.bookingTiming?.from &&
          index2 <= bookedSlots?.data?.bookingTiming?.to &&
          props?.date == bookedSlots?.data?.bookingDateObject?.day &&
          props?.activeDate?.month ==
            bookedSlots?.data?.bookingDateObject?.month &&
          props?.activeDate?.year == bookedSlots?.data?.bookingDateObject?.year;

        if (bookedBox) {
          return (
            <View style={styles.bookedBox} key={index2}>
              <View style={styles.bookedBoxInner}></View>
              <View style={styles.bookedBoxInner}></View>
              <View style={styles.bookedBoxInner}></View>
              <View style={styles.bookedBoxInner}></View>
            </View>
          );
        } else {
          return (
            <TouchableOpacity
              key={index2}
              style={[
                styles.timeingLabelColBox,
                {
                  backgroundColor: bookedBox
                    ? "red"
                    : index2 >= props?.selectedCurrentDate?.from &&
                      index2 <= props?.selectedCurrentDate?.to &&
                      props?.selectedCurrentDate != null &&
                      props?.selectedCurrentDate?.date == props?.date
                    ? color?.selectBoxCalendar
                    : index2 == props?.selectedCurrentDate?.from &&
                      props?.selectedCurrentDate != null &&
                      props?.selectedCurrentDate?.date == props?.date
                    ? color?.selectBoxCalendar
                    : color?.unSelectBoxCalendar,
                },
              ]}
              onPress={() => {
                onSelectDate(props?.date, index2);
              }}
            ></TouchableOpacity>
          );
        }
      })}
    </>
  );
};

const mapStateToProps = (state) => ({
  errors: state.errors.errors,
  color_scheme: state.main.color_scheme,
  selected_appiontment_date: state.main.selected_appiontment_date,
  get_all_appiontments: state.main.get_all_appiontments,
});
export default connect(mapStateToProps, { selectAppiontmentDate })(DayBox);
