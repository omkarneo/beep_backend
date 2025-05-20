
const admin = require("firebase-admin");

const { mongo, usermodel } = require("./mongoose");


const initializeFireBase=()=>{
  var admin = require("firebase-admin");

  var serviceAccount = require("./beep-moblie-firebase-adminsdk-fbsvc-c3c00ab5fe.json");

  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

const sendPushNotification=async (title, body, userId, imageUrl, roomid)=>{
  // the function below is a db call. replace with your respective db query
  const user = await usermodel.findById({_id:userId});
  
  const token = user.fcmToken;
  let badge = user.badge ?? 0; // if user.badge is null badge is assigned a 0 value
  
  if(token === null || token === undefined || token.length < 2){
    console.log('this is an invalid token');
    return;
  }

  const message = {
    notification: {
      title,
      body,
    },
    android: {
      notification: {
        channel_id: "MESSAGE_CHANNEL", // *
        icon: "message_icon", // *
        tag: "message", // *
        image: imageUrl,
      },
    },
    apns: {
      payload: {
        aps: {
          badge,
          sound: "chime.caf",
        },
      },
    },
    data: {
      title,
      body,
      roomid,
    },
    token,
  };
    await admin.messaging().send(message);
  
}


module.exports = {
  sendPushNotification,
  initializeFireBase,
};