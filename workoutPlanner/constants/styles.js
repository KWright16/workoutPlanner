import React from "react";
import { StyleSheet } from "react-native";
import Colors from "./Colors";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fafafa"
  },
  contentContainer: {
    paddingTop: 15
  },
  titleText: {
    fontSize: 24,
    color: Colors.teal,
    lineHeight: 50,
    textAlign: "left",
    paddingLeft: 15
  },
  textLabel: {
    fontSize: 16,
    color: Colors.darkTeal,
    lineHeight: 50,
    textAlign: "left",
    flex: 1
  },
  inputContainer: {
    padding: 20,
    flex: 1
  },
  inputBox: {
    height: 50,
    backgroundColor: "#fff",
    flex: 3,
    borderWidth: 1,
    padding: 10,
    borderRadius: 5
  },
  inputGroup: {
    marginBottom: 7,
    flexDirection: "row",
    justifyContent: "space-between"
  },
  radio: {
    flexDirection: "row",
    alignItems: "center"
  },
  timePicker: {
    color: "#114B5F",
    backgroundColor: "#fff",
    flex: 3
  },
  timePickerText: { lineHeight: 50, color: "grey", flex: 1 },
  borderedHighlight: {
    flex: 1,
    borderColor: Colors.lightGray,
    borderWidth: 1,
    borderRadius: 5,
    alignItems: "center",
    backgroundColor: "#fff"
  },
  roundButton: {
    width: 70,
    height: 70,
    borderRadius: 140,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    top: "50%",
    left: "50%",
    margin: -35
  },
  deg0: { translateX: 140 },
  deg60: {
    transform: [{ rotate: "60deg" }, { translateX: 140 }, { rotate: "-60deg" }]
  },
  deg120: {
    transform: [
      { rotate: "120deg" },
      { translateX: 140 },
      { rotate: "-120deg" }
    ]
  },
  deg180: {
    transform: [
      { rotate: "180deg" },
      { translateX: 140 },
      { rotate: "-180deg" }
    ]
  },
  deg240: {
    transform: [
      { rotate: "240deg" },
      { translateX: 140 },
      { rotate: "-240deg" }
    ]
  },
  deg300: {
    transform: [
      { rotate: "300deg" },
      { translateX: 140 },
      { rotate: "-300deg" }
    ]
  }
});
