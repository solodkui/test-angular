export interface Message {
  date: string;
  direction: string;
  body: string;
}

export interface Dialogs {
  author: string;
  messages: Array<Message>;
}

export interface Dialog {
  author: string;
  chats: Array<Dialogs>;
}