import React from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { themes } from "../store";
import { MessageStatusType } from "../interfaces";

interface Props {
  status: MessageStatusType;
}

const MessageStatus = ({ status }: Props) => {
  let type = { name: "", color: themes.bubbleStatusUnread };
  switch (status) {
    case "pending":
      type = { name: "timer", color: themes.bubbleStatusUnread };
      break;
    case "received":
      type = { name: "check-all", color: themes.bubbleStatusUnread };
      break;
    case "sent":
      type = { name: "check", color: themes.bubbleStatusUnread };
      break;
    case "red":
      type = { name: "check-all", color: themes.bubbleStatusRead };
      break;
    default:
  }
  return (
    <MaterialCommunityIcons
      name={type.name}
      size={themes.bubbleStatusSize}
      color={type.color}
    />
  );
};

export default MessageStatus;
