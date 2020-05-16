import React from "react";

import { Bubble } from "../components";
import { MessageStatusType } from "../interfaces";
import moment from "moment";

interface Chat {
  from: string;
  to: string;
  name: string;
  avatar_url: string;
  message: string;
  date: number;
  status: MessageStatusType;
}

const chats: Array<Chat> = [
  {
    from: "user:2",
    to: "user:1",
    name: "Amy",
    avatar_url:
      "https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg",
    message: "Bonjour !",
    date: 1589300002640,
    status: "red",
  },
  {
    from: "user:1",
    to: "user:2",
    name: "Amy",
    avatar_url:
      "https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg",
    message: "Hello !",
    date: 1589304073000,
    status: "red",
  },
  {
    from: "user:1",
    to: "user:2",
    name: "Amy",
    avatar_url:
      "https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg",
    message:
      "Tu vas bien ? Ce n'est pas bien de snober une personne !!! Tu vas bien ? Ce n'est pas bien de snober une personne !!! Tu vas bien ? Ce n'est pas bien de snober une personne !!! 😔❤️😭",
    date: 1589462473000,
    status: "received",
  },
  {
    from: "user:1",
    to: "user:1",
    name: "Amy",
    avatar_url:
      "https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg",
    message: "allo !!!! !",
    date: 1589480473000,
    status: "sent",
  },
  {
    from: "user:1",
    to: "user:1",
    name: "Amy",
    avatar_url:
      "https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg",
    message: "Youhou !",
    date: 1589566873000,
    status: "pending",
  },
];

// const ChatList = chats.reverse().map((item, index) => {
const ChatList = chats.map((item, index) => {
  return {
    id: index,
    date: item.date,
    component: (
      <Bubble
        position={item.from === "user:2" ? "left" : "right"}
        message={item.message}
        readStatus={item.status}
        date={item.date}
      />
    ),
  };
});

const BubbleList: any = [];
let initialDate: number | moment.Moment = 0;
console.log("*********");
ChatList.forEach((element, index) => {
  const currentDate = moment.utc(initialDate).startOf("day");
  const elementDate = moment.utc(element.date).startOf("day");
  console.log("initial", currentDate, "elementDate", elementDate);
  if (currentDate !== elementDate) {
    initialDate = elementDate;
    BubbleList.push();
    BubbleList.push();
  } else {
    BubbleList.push();
  }
});

export { chats, BubbleList };
