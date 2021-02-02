import { Component, OnInit } from '@angular/core';
import { Dialog, Message } from '../types/dialogs.types';

@Component({
  selector: 'app-dialogs',
  templateUrl: './dialogs.component.html',
  styleUrls: ['./dialogs.component.scss']
})
export class DialogsComponent implements OnInit {
  dialog: Dialog = {
    author: 'Arthur',
    chats: [
      {
        author: 'Natalia',
        messages: [
          {
            date: '12.12.12 14:05:12',
            direction: 'in',
            body: 'Hello my friend, such a very good day today'
          },
          {
            date: '12.12.12 14:05:12',
            direction: 'out',
            body: 'I\'m sleeping, sorry'
          }
        ]
      },
      {
        author: 'Oleg',
        messages: [
          {
            date: '12.12.12 14:05:12',
            direction: 'in',
            body: 'Olla, amigo'
          },
          {
            date: '12.12.12 14:05:13',
            direction: 'in',
            body: 'Hello world'
          }
        ]
      }
    ]
  };
  activeAuthor: string;
  activeChat: Array<Message>;

  constructor() { }

  ngOnInit(): void {
  }

  changeDialog(name: string): void {
    this.activeAuthor = name;
    this.dialog.chats.forEach(chat => {
      if (chat.author === name) {
        this.activeChat = chat.messages
      }
    })
  }
}