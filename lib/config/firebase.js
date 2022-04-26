
import PushNotification from 'react-native-push-notification';
const Firebase = () => {
  PushNotification.configure({
    onRegister: function (token: any) {
      console.log('TOKEN welcome:', token);
    },

    onNotification: function (notification) {
      console.log('NOTIFICATIONS:', notification);
      // noticeAction();
    },
  });
};
export default Firebase;
