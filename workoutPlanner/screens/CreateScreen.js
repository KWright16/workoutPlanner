// import * as WebBrowser from "expo-web-browser";
import React, { useState } from "react";
import { Text, View, TextInput, Picker } from "react-native";
import { Button } from "react-native-elements";
import { RectButton, ScrollView } from "react-native-gesture-handler";
import { RadioButton } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Colors from "../constants/Colors";
import styles from "../constants/styles";

export default function CreateScreen() {
  const initForm = {
    repeaterType: "timer",
    excerciseName: "",
    timer: null,
    reps: null,
    weightAdded: null,
    weight: null,
    rest: null
  };
  const [inputBorderColor, setInputBorderColor] = useState("#ededed");
  const [hours, setHours] = useState("00");
  const [minutes, setMinutes] = useState("00");
  const [seconds, setSeconds] = useState("00");
  const [weightInputBorderColor, setWeightInputBorderColor] = useState(
    Colors.lightGray
  );
  const [restMinutes, setRestMinutes] = useState("00");
  const [restSecs, setRestSecs] = useState("00");
  const [formData, setFormData] = useState(initForm);

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      <View>
        <Text style={styles.titleText}>Create Excercise Set</Text>
      </View>

      <View style={styles.inputContainer}>
        <View style={styles.inputGroup}>
          <Text style={styles.textLabel}>Excercise</Text>
          <TextInput
            style={[styles.inputBox, { borderColor: inputBorderColor }]}
            onFocus={() => {
              setInputBorderColor(Colors.teal);
            }}
            onBlur={() => {
              setInputBorderColor(Colors.lightGray);
            }}
            onChangeText={text =>
              setFormData({ ...formData, excerciseName: text })
            }
            value={formData.excerciseName}
          />
        </View>

        <View style={styles.inputGroup}>
          <RadioButton.Group
            onValueChange={value =>
              setFormData({ ...formData, repeaterType: value })
            }
            value={formData.repeaterType}
          >
            <View style={styles.radio}>
              <Text style={styles.textLabel}>Timer</Text>
              <RadioButton
                color={Colors.orange}
                uncheckedColor={Colors.darkTeal}
                value="timer"
              />
            </View>
            <View style={styles.radio}>
              <Text style={styles.textLabel}>Reps</Text>
              <RadioButton
                color={Colors.orange}
                uncheckedColor={Colors.darkTeal}
                value="reps"
              />
            </View>
            <View style={styles.radio}>
              <Text style={styles.textLabel}>Max</Text>
              <RadioButton
                color={Colors.orange}
                uncheckedColor={Colors.darkTeal}
                value="max"
              />
            </View>
          </RadioButton.Group>
        </View>

        <RepeaterIncrementer
          repeaterType={formData.repeaterType}
          hours={hours}
          setHours={t => setHours(t)}
          minutes={minutes}
          setMinutes={m => setMinutes(m)}
          secs={seconds}
          setSecs={s => setSeconds(s)}
          reps={formData.reps}
          setReps={r => setFormData({ ...formData, reps: r })}
          inputBorderColor={inputBorderColor}
          setInputBorderColor={bc => setInputBorderColor(bc)}
        />

        <View style={styles.inputGroup}>
          <Text style={[styles.textLabel, { flex: 5 }]}>
            Add / Remove Weight
          </Text>

          <View style={{ alignItems: "center", flexDirection: "row", flex: 2 }}>
            <PlusMinusButton
              iconName={"plus-box"}
              setWeightAdded={() =>
                setFormData({ ...formData, weightAdded: true })
              }
              selected={formData.weightAdded}
            />
            <PlusMinusButton
              iconName={"minus-box"}
              setWeightAdded={() =>
                setFormData({ ...formData, weightAdded: false })
              }
              selected={formData.weightAdded === false}
            />
          </View>
          <TextInput
            keyboardType={"number-pad"}
            style={[
              styles.inputBox,
              { borderColor: weightInputBorderColor, flex: 2 }
            ]}
            placeholder={"Kg"}
            onFocus={() => {
              setWeightInputBorderColor(Colors.teal);
            }}
            onBlur={() => {
              setWeightInputBorderColor(Colors.lightGray);
            }}
            onChangeText={w => setFormData({ ...formData, weight: w })}
            value={formData.weight}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={[styles.textLabel, { flex: 4 }]}>Rest</Text>
          <Text style={[styles.timePickerText, { paddingLeft: 15 }]}>m:</Text>
          <TimePicker
            timeVal={restMinutes}
            timeSetter={setRestMinutes}
            timeType={"m"}
          />
          <Text style={[styles.timePickerText, { paddingLeft: 15 }]}>s:</Text>
          <TimePicker
            timeVal={restSecs}
            timeSetter={setRestSecs}
            timeType={"s"}
          />
        </View>
      </View>
      <View style={{ alignItems: "center" }}>
        <Button
          color={Colors.teal}
          onPress={() =>
            saveExcerciseSet(
              formData,
              hours,
              minutes,
              seconds,
              restMinutes,
              restSecs
            )
          }
          title="Add"
          buttonStyle={{
            width: 100,
            padding: 10,
            backgroundColor: Colors.purpleBlue
          }}
          disabledStyle={{ backgroundColor: "#547394" }}
          disabled={
            formData.excerciseName === "" ||
            (formData.weightAdded === null && formData.weight) ||
            (formData.repeaterType === "timer" &&
              !validateTimer(hours, minutes, seconds)) ||
            (formData.repeaterType === "reps" && !formData.reps)
          }
        />
      </View>
    </ScrollView>
  );
}

function PlusMinusButton({ iconName, setWeightAdded, selected }) {
  return (
    <RectButton underlayColor={"#114B5F"} onPress={setWeightAdded}>
      <MaterialCommunityIcons
        name={iconName}
        size={33}
        color={selected ? "#114B5F" : "#028090"}
      />
    </RectButton>
  );
}

// function OptionButton({ icon, label, onPress, isLastOption }) {
//   return (
//     <RectButton
//       style={[styles.option, isLastOption && styles.lastOption]}
//       onPress={onPress}
//     >
//       <View style={{ flexDirection: "row" }}>
//         <View style={styles.optionIconContainer}>
//           <Ionicons name={icon} size={22} color="rgba(0,0,0,0.35)" />
//         </View>
//         <View style={styles.optionTextContainer}>
//           <Text style={styles.optionText}>{label}</Text>
//         </View>
//       </View>
//     </RectButton>
//   );
// }

function RepeaterIncrementer({
  repeaterType,
  hours,
  setHours,
  minutes,
  setMinutes,
  secs,
  setSecs,
  reps,
  setReps
}) {
  const [inputBorderColor, setInputBorderColor] = useState("#ededed");

  if (repeaterType === "timer") {
    return (
      <View style={styles.inputGroup}>
        <Text style={styles.timePickerText}>h:</Text>
        <TimePicker timeVal={hours} timeSetter={setHours} timeType={"h"} />
        <Text style={[styles.timePickerText, { paddingLeft: 15 }]}>m:</Text>
        <TimePicker timeVal={minutes} timeSetter={setMinutes} timeType={"m"} />
        <Text style={[styles.timePickerText, { paddingLeft: 15 }]}>s:</Text>
        <TimePicker timeVal={secs} timeSetter={setSecs} timeType={"s"} />
      </View>
    );
  } else if (repeaterType === "reps") {
    return (
      <View style={styles.inputGroup}>
        <Text style={[styles.textLabel, { flex: 7 }]}>Reps</Text>
        <TextInput
          keyboardType={"number-pad"}
          style={[styles.inputBox, { borderColor: inputBorderColor, flex: 2 }]}
          onFocus={() => {
            setInputBorderColor("#028090");
          }}
          onBlur={() => {
            setInputBorderColor("#ededed");
          }}
          onChangeText={n => setReps(n)}
          value={reps}
        />
      </View>
    );
  } else {
    return null;
  }
}

function TimePicker({ timeVal, timeSetter, timeType }) {
  const timeList = getTimes(timeType);

  return (
    <Picker
      selectedValue={timeVal}
      onValueChange={timeSetter}
      style={styles.timePicker}
    >
      {timeList.map(t => {
        return <Picker.Item key={t} label={t} value={t} />;
      })}
    </Picker>
  );
}

function saveExcerciseSet(
  formData,
  hours,
  minutes,
  seconds,
  restMinutes,
  restSecs
) {
  formData.timer = `${hours}:${minutes}:${seconds}`;
  formData.rest = `${restMinutes}:${restSecs}`;
}

function validateTimer(hours, minutes, seconds) {
  return hours !== "00" || minutes !== "00" || seconds !== "00";
}

function getTimes(type) {
  let times = [];
  if (type === "h") {
    for (let i = 0; i < 24; i++) {
      times.push(i < 10 ? `0${i}` : `${i}`);
    }
  } else if (type === "m") {
    for (let i = 0; i < 60; i++) {
      times.push(i < 10 ? `0${i}` : `${i}`);
    }
  } else {
    for (let i = 0; i < 60; i += 5) {
      times.push(i < 10 ? `0${i}` : `${i}`);
    }
  }
  return times;
}
