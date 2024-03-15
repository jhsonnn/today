const publicVapidKey =
  "BLXcS3TPLlk4RrEk55kPFbJ6ULHuGJaD5c8qEybxN27dgxTwl9Ij8sm2h-b0Sf4RzOwL7i8AcR_CBv_6lk0TQ84";
// Check for service worker
if ("serviceWorker" in navigator) {
  send().catch((err) => console.log(err));
}
//Register SW, Register Push, Send Push
async function send() {
  //Register Service Worker
  console.log("Registering service worker...");
  const register = await navigator.serviceWorker.register("./worker.js", {
    scope: "/",
  });
  console.log("Service Worker Registered...");

  //Register Push
  console.log("Registering Push...");
  const subscription = await register.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: urlBase64ToUnit8Array(publicVapidKey),
  });
  console.log("Push Registered...");

  //Send Push Notification
  console.log("Sending Push");
  await fetch("http://localhost:7777/subscribe", {
    method: "POST",
    body: JSON.stringify(subscription),
    // headers: {
    //   "content-type": "application/json",
    // },
  });
  console.log("Push Sent...");
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
