import React, { useState } from "react";
import {
  Text,
  View,
  TextInput,
  Modal,
  TouchableHighlight,
  TouchableOpacity
} from "react-native";
import { Button } from "react-native-elements";
import { ScrollView } from "react-native-gesture-handler";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import Colors from "../constants/Colors";
import styles from "../constants/styles";
import TransparentModal from "../components/TransparentModal";

export default function NewPlanScreen({ navigation }) {
  const initState = {
    planName: null,
    length: null,
    days: null
  };
  const [formData, setFormData] = useState(initState);
  const [modalVisible, setModalVisible] = useState(true);
  const [inputBorderColor, setInputBorderColor] = useState(Colors.lightGray);
  const [lengthBorderColor, setLengthBorderColor] = useState(Colors.lightGray);
  const [showWeeks, setShowWeeks] = useState(false);
  const [dayModalVisible, setDayModalVisible] = useState(false);
  const [selectedDay, setSelectedDay] = useState(null);

  return (
    <View style={styles.container}>
      <Modal
        animationType={"fade"}
        visible={modalVisible}
        statusBarTranslucent={false}
      >
        <View style={{ backgroundColor: "#fafafa", flex: 1 }}>
          <Text
            style={[
              styles.titleText,
              { paddingTop: 20, textAlign: "center", fontSize: 33 }
            ]}
          >
            New Plan
          </Text>
          <View style={styles.inputContainer}>
            <View style={styles.inputGroup}>
              <Text style={styles.textLabel}>Plan Name</Text>
              <TextInput
                style={[
                  styles.inputBox,
                  { borderColor: inputBorderColor, flex: 2 }
                ]}
                onFocus={() => {
                  setInputBorderColor(Colors.teal);
                }}
                onBlur={() => {
                  setInputBorderColor(Colors.lightGray);
                }}
                onChangeText={text =>
                  setFormData({ ...formData, planName: text })
                }
                value={formData.planName}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.textLabel}>Length</Text>
              <TextInput
                style={[
                  styles.inputBox,
                  { borderColor: lengthBorderColor, flex: 1, marginLeft: 5 }
                ]}
                onFocus={() => {
                  setLengthBorderColor(Colors.teal);
                }}
                onBlur={() => {
                  setLengthBorderColor(Colors.lightGray);
                }}
                onChangeText={text =>
                  setFormData({ ...formData, length: parseInt(text) })
                }
                value={!formData.length ? null : formData.length.toString()}
                keyboardType="number-pad"
              />
              <DaysWeeksPicker
                showWeeks={showWeeks}
                setShowWeeks={() => setShowWeeks(!showWeeks)}
              />
            </View>

            <View style={{ alignItems: "center", marginTop: 20 }}>
              <Button
                color={Colors.purpleBlue}
                onPress={() => setModalVisible(false)}
                title="Create Plan"
                buttonStyle={{
                  width: 150,
                  padding: 15,
                  backgroundColor: Colors.orange
                }}
                disabledStyle={{ backgroundColor: Colors.dullOrange }}
                disabled={!formData.planName || !formData.length}
              />
            </View>
          </View>
        </View>
      </Modal>

      <TouchableOpacity
        style={{ paddingLeft: 10, paddingTop: 10 }}
        onPress={() => setModalVisible(true)}
      >
        <Text>
          <Ionicons
            size={40}
            color={Colors.purpleBlue}
            name="md-arrow-round-back"
          />
        </Text>
      </TouchableOpacity>

      <ScrollView style={styles.inputContainer}>
        <WorkoutList
          length={formData.length}
          showWeeks={showWeeks}
          setDayModalVisible={() => setDayModalVisible(true)}
        />
      </ScrollView>

      <TransparentModal
        modalVisible={dayModalVisible}
        setModalVisible={() => setDayModalVisible(!dayModalVisible)}
        navigation={navigation}
      />
    </View>
  );
}

function WorkoutList({ length, showWeeks, setDayModalVisible }) {
  const lengthDays = showWeeks ? length * 7 : length;

  if (!length) return null;
  else {
    const planList = [...new Array(lengthDays)];
    let week = 1;

    return planList.map((day, i) => {
      let weekLabel = "";
      if (i === 0 || i % 7 === 0) {
        weekLabel = `Week ${week}`;
        week++;
      } else weekLabel = "";

      return (
        <View key={i} style={{ height: 50 }}>
          <TouchableOpacity
            onPress={setDayModalVisible}
            style={[styles.borderedHighlight, { flexDirection: "row" }]}
          >
            <Text
              style={{
                flex: 1,
                color: Colors.orange,
                alignSelf: "flex-start",
                padding: 7
              }}
            >
              {weekLabel}
            </Text>
            <Text style={styles.textLabel}>Day {i + 1}</Text>
            <Text
              style={{
                alignSelf: "flex-start",
                padding: 7,
                color: Colors.teal
              }}
            >
              REST
            </Text>
          </TouchableOpacity>
        </View>
      );
    });
  }
}

function DaysWeeksPicker({ showWeeks, setShowWeeks }) {
  if (!showWeeks) {
    return (
      <TouchableHighlight
        onPress={setShowWeeks}
        style={[styles.borderedHighlight, { marginLeft: 10 }]}
        underlayColor={Colors.teal}
      >
        <Text style={styles.textLabel}>
          Days{"    "}
          <FontAwesome size={20} name="caret-down" />
        </Text>
      </TouchableHighlight>
    );
  } else {
    return (
      <TouchableHighlight
        style={[styles.borderedHighlight, { marginLeft: 10 }]}
        onPress={setShowWeeks}
        underlayColor={Colors.teal}
      >
        <Text style={[styles.textLabel, {}]}>
          Weeks {"  "}
          <FontAwesome size={20} name="caret-down" />
        </Text>
      </TouchableHighlight>
    );
  }
}
