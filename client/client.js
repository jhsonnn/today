//공개 키 설정 -> 웹 푸시 보내려면 필요함
// const publicVapidKey =
 

// Check for service worker // 브라우저가 서비스워커 지원하는지 확인->지원하면 등록
if ("serviceWorker" in navigator) {
  registerServiceWorker().catch((err) =>
    console.error("Service worker registration failed:", err)
  );
}

// Register service worker 서비스 워커 등록함수.
async function registerServiceWorker() {
  console.log("Registering service worker...");
  const register = await navigator.serviceWorker.register("./worker.js", {
    scope: "/",
  });
  console.log("Service worker registered.");

  // Call the function to subscribe for push notifications
  await subscribeForPushNotifications(register); // -> 푸시알림 구독
}

// Subscribe for push notifications => 푸사일림구독함수
async function subscribeForPushNotifications(register) {
  console.log("Subscribing for push notifications...");
  try {
    const subscription = await register.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: urlBase64ToUnit8Array(publicVapidKey),
    });
    console.log("Push subscription successful:", subscription);
    // Send subscription data to the server
    await sendSubscriptionToServer(subscription); //=> 서버로 구독 정보 전송
  } catch (error) {
    console.error("Push subscription failed:", error);
  }
}

// Send subscription data to the server 구독 정보 서버로 전송
async function sendSubscriptionToServer(subscription) {
  console.log("Sending subscription data to server...");
  try {
    const response = await fetch("http://localhost:7777/subscribe", {
      method: "POST",
      body: JSON.stringify(subscription),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.ok) {
      console.log("Subscription data sent successfully.");
    } else {
      console.error("Failed to send subscription data:", response.status);
    }
  } catch (error) {
    console.error("Error sending subscription data:", error);
  }
}

function urlBase64ToUnit8Array(base64String) {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");
  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);
  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}
