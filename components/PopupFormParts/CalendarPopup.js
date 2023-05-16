import React, {
  useEffect,
  useState,
  useRef,
  useCallback,
  useMemo,
} from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { RFValue as rf } from "react-native-responsive-fontsize";
import {
  VirtualizedList,
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
import { changeTheme, colorScheme } from "../../state-management/actions/Theme";
import { AntDesign, Entypo } from "@expo/vector-icons";
import DayBox from "./DayBox";
import { selectAppiontmentDate } from "../../state-management/actions/Features/Actions";

const CalendarPopup = (props) => {
  const [loading, setLoading] = useState(true);
  const [selectedCurrentDate, setSelectedCurrentDate] = useState(null);
  const [selectedPreviousDate, setSelectedPreviousDate] = useState(null);
  const [totalDays, setTotalDays] = useState([]);
  const [activeDate, setActiveDate] = useState({
    year: new Date()?.getFullYear(),
    month: new Date()?.getMonth() + 1,
    date: new Date()?.getDate(),
  });

  let currentDate = {
    year: new Date()?.getFullYear(),
    month: new Date()?.getMonth() + 1,
    date: new Date()?.getDate(),
  };

  let timingLabelCols = new Array(10).fill(1);

  let color = props?.color_scheme;
  let daysInWord = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vier", "Sáb"];
  let daysInWordEng = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];
  let monthsInWord = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ];

  useEffect(() => {
    if (props?.get_all_appiontments != null) {
      setLoading(false);
    }
  }, [props?.get_all_appiontments]);

  function daysInMonth2(month, year) {
    let date = new Date();
    if (month == currentDate?.month && year == currentDate?.year) {
      let endD = new Date(year, month, 0).getDate() - date?.getDate() + 1;
      return {
        start: currentDate?.date - 1,
        end: eval(currentDate?.date + endD),
      };
    } else {
      return { start: 0, end: new Date(year, month, 0).getDate() };
    }
    // return new Date(year, month, 0).getDate();
  }

  useEffect(() => {
    (async () => {
      if (totalDays?.length <= 0) {
        setTotalDays((prev) => {
          let temp = [];
          for (
            let i = 0;
            i < daysInMonth2(activeDate?.month, activeDate?.year)?.end;
            i++
          ) {
            temp.push({
              day: i,
              totalBox: (
                <DayBox
                  date={i}
                  selectedCurrentDate={selectedCurrentDate}
                  setSelectedCurrentDate={setSelectedCurrentDate}
                  activeDate={activeDate}
                />
              ),
            });
          }
          return temp;
        });
      } else {
        let arr = [...totalDays];
        const indexOfObject = arr.findIndex((object) => {
          return object?.day === selectedCurrentDate?.date;
        });
        setTotalDays((prev) =>
          prev.map((obj) => {
            if (obj?.day == indexOfObject) {
              setSelectedPreviousDate(indexOfObject);
              return {
                ...obj,
                totalBox: (
                  <DayBox
                    date={indexOfObject}
                    selectedCurrentDate={selectedCurrentDate}
                    setSelectedCurrentDate={setSelectedCurrentDate}
                  />
                ),
              };
            } else if (obj?.day == selectedPreviousDate) {
              return {
                ...obj,
                totalBox: (
                  <DayBox
                    date={selectedPreviousDate}
                    selectedCurrentDate={selectedCurrentDate}
                    setSelectedCurrentDate={setSelectedCurrentDate}
                  />
                ),
              };
            }
            return obj;
          })
        );
      }
    })();
  }, [selectedCurrentDate, activeDate, props?.get_all_appiontments]);

  const changeMonth = (type) => {
    let current = activeDate;
    if (current?.month <= 12 && current?.month > 1 && type == "left") {
      setActiveDate({
        year: current?.year,
        month: current?.month - 1,
        date: 1,
      });
    } else if (current?.month == 1 && type == "left") {
      setActiveDate({
        year: current?.year - 1,
        month: 12,
        date: 1,
      });
    } else if (current?.month >= 1 && current?.month < 12 && type == "right") {
      setActiveDate({
        year: current?.year,
        month: current?.month + 1,
        date: 1,
      });
    } else if (current?.month == 12 && type == "right") {
      setActiveDate({
        year: current?.year + 1,
        month: 1,
        date: 1,
      });
    }
    setTotalDays([]);
    setSelectedCurrentDate(null);
  };

  const onConfirmDate = () => {
    props?.setCalendarPopup(!props?.calendarPopup);
    let bookingTiming = {
      selectedTime: selectedCurrentDate?.selectedTime,
      from: selectedCurrentDate?.from,
      to: selectedCurrentDate?.to,
    };
    let bookingDate =
      eval(selectedCurrentDate?.date + 1) +
      "/" +
      activeDate?.month +
      "/" +
      activeDate?.year;
    props?.setFormData((prev) => ({
      ...prev,
      bookingDate: bookingDate,
      bookingDateObject: {
        day: eval(selectedCurrentDate?.date + 1),
        month: activeDate?.month,
        year: activeDate?.year,
      },
      bookingTiming: bookingTiming,
    }));
  };

  const styles = StyleSheet.create({
    calendarWrapper: {
      width: "51%",
      height: "85%",
      borderRadius: 6,
      backgroundColor: color?.primaryBackground,
      zIndex: 99999999,
      paddingBottom: hp("1%"),
      position: "absolute",
      alignSelf: "center",
      marginHorizontal: wp("2%"),
      alignItems: "center",
      justifyContent: "center",
    },
    calendarBtn: {
      width: "15%",
      height: hp("4%"),
      borderRadius: 6,
      borderWidth: 1,
      alignItems: "center",
      justifyContent: "center",
    },
    innerCalendar: {
      width: "100%",
      height: "100%",
      paddingBottom: hp("3%"),
    },
    timeingLabelRowWrapper: {
      width: "100%",
      height: hp("3.5%"),
      flexDirection: "row",
      paddingVertical: 3,
      borderBottomWidth: 1,
      borderBottomColor: color?.bgBorder,
      paddingHorizontal: wp("1%"),
    },
    timeingLabelRowWrapperFirst: {
      width: "100%",
      minHeight: "4%",
      flexDirection: "row",
      paddingVertical: hp("1%"),
      borderBottomWidth: 1,
      borderBottomColor: color?.bgBorder,
      paddingHorizontal: wp("1%"),
    },
    dayLabelRow: {
      width: "10%",
      height: "100%",
      alignItems: "center",
      justifyContent: "center",
    },
    dayLabelRowFirst: {
      width: "10%",
      height: "100%",
      alignItems: "center",
      justifyContent: "center",
    },
    timeingLabelRow: {
      width: "90%",
      height: "100%",
      flexDirection: "row",
      alignItems: "center",
    },
    timeingLabelRowFirst: {
      width: "90%",
      height: "100%",
      flexDirection: "row",
      alignItems: "center",
    },
    timeingLabelCol: {
      marginRight: "7.75%",
      height: "100%",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "flex-start",
      // backgroundColor:'red',
      width: "3%",
    },
    vr: {
      width: "13%",
      height: 5,
      backgroundColor: color?.buttonSecondary,
      position: "absolute",
      bottom: -4,
      left: "40%",
    },
    timeingLabelColBox: {
      width: "2.377%",
      height: "60%",
      marginRight: ".4%",
    },
    calendarHeader: {
      flexDirection: "row",
      minHeight: "6%",
      alignItems: "center",
      paddingHorizontal: wp("1.5%"),
      justifyContent: "space-between",
      borderBottomWidth: 1,
      borderBottomColor: color?.bgBorder,
      paddingVertical: hp("1.5%"),
      marginTop: 10,
    },
    title: {
      color: color?.text,
      fontSize: rf(8),
      fontFamily: "IM",
    },
    timeingLabelColText: {
      color: color?.text,
      fontSize: rf(6.5),
      fontFamily: "IR",
    },
    dayLabelRowText: {
      color: color?.text,
      fontSize: rf(6.5),
      fontFamily: "IR",
    },
    monthWrapper: {
      flexDirection: "row",
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      right: "3%",
    },
    monthChevronLeft: {
      marginRight: 10,
    },
    monthChevronRight: {
      marginLeft: 10,
    },
    monthTitle: {
      color: color?.text,
      fontSize: rf(9),
      fontFamily: "IM",
    },
  });
  let currentTime = 10;

  let memiozeDays = useMemo(() => {
    return totalDays;
  }, [totalDays]);

  return (
    <View style={styles.calendarWrapper}>
      <View style={styles.innerCalendar}>
        <View style={styles.calendarHeader}>
          <Text style={styles.title}>
            {loading ? "loading.." : "Disponibilidad"}
          </Text>
          <View style={styles.monthWrapper}>
            <TouchableOpacity
              style={styles.monthChevronLeft}
              onPress={() => changeMonth("left")}
            >
              <Entypo name="chevron-left" size={rf(12)} color={color?.text} />
            </TouchableOpacity>
            <Text style={styles.monthTitle}>
              {monthsInWord[activeDate?.month - 1] + activeDate?.year}
            </Text>
            <TouchableOpacity
              style={styles.monthChevronRight}
              onPress={() => changeMonth("right")}
            >
              <Entypo name="chevron-right" size={rf(12)} color={color?.text} />
            </TouchableOpacity>
          </View>
          {selectedCurrentDate != null && (
            <TouchableOpacity
              onPress={() => onConfirmDate()}
              style={[styles.closeBtn, { right: wp("1.7%") }]}
            >
              <AntDesign
                name="checkcircle"
                size={rf(12)}
                color={color?.buttonPrimary}
              />
            </TouchableOpacity>
          )}
          <TouchableOpacity
            onPress={() => props?.setCalendarPopup(!props?.calendarPopup)}
            style={styles.closeBtn}
          >
            <AntDesign name="close" size={rf(12)} color={color?.text} />
          </TouchableOpacity>
        </View>

        <View style={styles.timeingLabelRowWrapperFirst}>
          <View style={styles.dayLabelRowFirst}></View>
          <View style={styles.timeingLabelRowFirst}>
            {timingLabelCols?.map((item, index) => {
              currentTime = currentTime + 1;
              return (
                <View key={index} style={styles.timeingLabelCol}>
                  <View style={styles.vr}></View>
                  <Text style={styles.timeingLabelColText}>{currentTime}</Text>
                </View>
              );
            })}
          </View>
        </View>
        <ScrollView>
          {loading && <ActivityIndicator size="large" color={color?.text} />}
          {totalDays?.length > 0 &&
            !loading &&
            totalDays?.map((item, index) => {
              if (
                daysInMonth2(activeDate?.month, activeDate?.year)?.start > index
              )
                return null;
              console.log();
              return (
                <View key={index} style={styles.timeingLabelRowWrapper}>
                  <View style={styles.dayLabelRow}>
                    <Text style={styles.dayLabelRowText}>
                      {item?.day + 1}
                      {" " +
                        daysInWordEng[
                          new Date(
                            activeDate?.year,
                            activeDate?.month - 1,
                            item?.day + 1
                          ).getDay()
                        ]}
                    </Text>
                  </View>
                  <View style={styles.timeingLabelRow}>{item?.totalBox}</View>
                </View>
              );
            })}
        </ScrollView>
      </View>
    </View>
  );
};

const mapStateToProps = (state) => ({
  errors: state.errors.errors,
  color_scheme: state.main.color_scheme,
  create_agenda_popup: state.main.create_agenda_popup,
  selected_appiontment_date: state.main.selected_appiontment_date,
  get_all_appiontments: state.main.get_all_appiontments,
});
export default connect(mapStateToProps, {
  changeTheme,
  colorScheme,
  selectAppiontmentDate,
})(CalendarPopup);
