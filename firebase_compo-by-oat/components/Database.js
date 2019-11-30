import * as firebase from 'firebase';
import '@firebase/firestore';

const config = {
  apiKey: "AIzaSyDPveUbv_oBXPyLs4BOzekDnJBBKbDYvYc",
  authDomain: "my-project-ab23c.firebaseapp.com",
  databaseURL: "https://my-project-ab23c.firebaseio.com",
  projectId: "my-project-ab23c",
  storageBucket: "my-project-ab23c.appspot.com",
  messagingSenderId: "242044460918",
  appId: "1:242044460918:web:6b4bd07da3e8999c1e6457",
  measurementId: "G-13BE5EX2SE"
}

class Database{

  constructor() {
    if (!firebase.apps.length) {
        firebase.initializeApp(config);
          console.log("firebase apps initializeApp");
    } else {
        console.log("firebase apps already running...");
    }
  }

  getAccount=async()=>{

  }


  async readOnce(id,read_Account_success,read_Account_fail)
  {
  let getDoc=  firebase.firestore().collection('Account').doc(id).get().
  then(doc=>{
    if(doc.exists)
    {
      read_Account_success(doc.data());
    }
    else {
      read_Account_fail();
    }
  }).catch(
    read_Account_fail()
  );
  }

  async readAll(read_Account_success,read_Account_fail)
  {
  let getDoc=  firebase.firestore().collection('Account').get()
  .then(snapshot=>{
    if(snapshot.emtry){
      read_Account_fail();
      return;
    }
    snapshot.forEach(doc=>{
      read_Account_success(doc.data())
    })
  })
  .catch( read_Account_fail());
  }


  async readListening(read_Account_success,read_Account_fail)
  {
    let getDoc=  firebase.firestore().collection('Account').orderBy("time").onSnapshot(
      snapshot=>{
      if(snapshot.emtry){
        read_Account_fail();

        return;
      }
      snapshot.forEach(doc=>{
        read_Account_success(doc.data())
      })
    }
  ).catch( read_Account_fail());
  }

  async deleteAccount(id,delete_Account_success,delete_Account_fail)
  {
    firebase.firestore().collection("Account").doc(id).delete().then(ref=>{delete_Account_success()}).catch(delete_Account_fail())

  }

  async updateAccount(id,account,update_Account_success,update_Account_fail)
  {
    firebase.firestore().collection("Account").doc(id).update(account)
  }



  async createAccount(Account,add_Account_success,add_Account_fail)
  {
    firebase.firestore().collection("Account").add(Account).then(ref=>{add_Account_success(ref.id)}).catch(add_Account_fail())
  }

  async createAccount2(Account,add_Account_success,add_Account_fail)
  {
    //set ชื่อ doc
    try {
      firebase.firestore().collection("Account").doc(Account.firstName).set(Account)
      add_Account_success("Ok");
    } catch (e) {
      add_Account_fail();
    } finally {

    }

  }



}

const database = new Database();
export default database;
