import { Button, SafeAreaView, Text, View } from 'react-native';

import { useNotification } from '@/context/NotificationContext';

export default function HomeScreen() {
  const { notification, expoPushToken, error } = useNotification();

  if (error) {
    return <Text>Error: {error.message}</Text>;
  }

  async function sendPushNotification(expoPushToken: string) {
    const message = {
      to: expoPushToken,
      sound: 'default',
      title: 'Original Title',
      body: 'And here is the body!',
      data: { someData: 'goes here' },
    };

    await fetch('https://exp.host/--/api/v2/push/send', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Accept-encoding': 'gzip, deflate',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(message),
    });
  }

  return (
    <View style={{ flex: 1 }}>
      <SafeAreaView style={{ flex: 1 }}>
        <Text style={{ color: 'red' }}>Your push token:</Text>
        <Text>{expoPushToken}</Text>
        <Text>This is a demo por the notification of the FIPCA app</Text>
        <Text>{notification?.request.content.title}</Text>
        <Text>
          {JSON.stringify(notification?.request.content.data, null, 2)}
        </Text>

        <Button
          title="Press to Send Notification"
          onPress={async () => {
            if (expoPushToken) {
              // Add this null check
              await sendPushNotification(expoPushToken);
            } else {
              // Handle the case when token is null
              console.warn('Push token is not available');
            }
          }}
        />
      </SafeAreaView>
    </View>
  );
}
