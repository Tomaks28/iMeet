import React, { useState } from "react";
import { StyleSheet, TouchableWithoutFeedback } from "react-native";
import Panel from "./Panel";
import { Text, Image } from "react-native-elements";
import { themes } from "../themes";

interface Props {
  title?: string;
  data?: Array<string>;
  onSelection?: (name: string) => void;
}

const SelectionPanel = ({ title, data, onSelection }: Props) => {
  const [selection, setSelection] = useState<number | null>(null);
  return (
    <Panel title={title}>
      {data &&
        data.map((item, index) => {
          return (
            <TouchableWithoutFeedback
              key={index}
              onPress={() => {
                setSelection(index);
                onSelection && onSelection(data[index]);
              }}
            >
              <Text
                style={
                  selection === index
                    ? styles.selectedItem
                    : styles.deselectedItem
                }
              >
                {item}
              </Text>
            </TouchableWithoutFeedback>
          );
        })}
    </Panel>
  );
};

export default SelectionPanel;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  deselectedItem: {
    padding: 10,
    margin: 5,
    borderRadius: 20,
    fontSize: themes.textFontSize,
  },
  selectedItem: {
    padding: 10,
    margin: 5,
    borderWidth: 2,
    borderRadius: 20,
    fontSize: themes.textFontSize,
    borderColor: themes.colorPrimary,
  },
});
