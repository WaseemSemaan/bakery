
/**
 * this service implements the functionality of messages which access the database
 */

import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(private db: AngularFireDatabase) { }


  async sendMessage(msg) { 
    msg.reply = []
    msg.dateSent = new Date().getTime()
    msg.status = "Not Answered"
    let result = await this.db.list('/messages').push(msg)
    return result
  }
  getMessages(){

    return this.db.list('/messages');
  }


  getAll() {

    return this.db.list('/messages')

  }

  get(msgId){
    return this.db.object('/messages/' + msgId)
  }


  async changeStatus(messageID,status){
    let object = await this.db.object('/messages/' + messageID).update({status: status })
    return object
  }

  async addReply(messageID,reply){

    let object = await this.db.object('/messages/' + messageID).update({reply: reply })
    return object
  }


  async sendReply(messageID,reply,name){
    let date = new Date().getTime()
    let rply = {
      content: name + ': ' + reply,
      dateSent: date
    } 

    let result = await this.db.list('/messages/' + messageID + '/replies/').push(rply)
    return result
  }


  getReplies(messageID){
    return this.db.list('/messages/' + messageID + '/replies/')
  }

  

  getMessagesByUser(userId: string) {

    return this.db.list('/messages', ref => ref.orderByChild('userID').equalTo(userId));
  }

 
  

}
