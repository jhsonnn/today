const express = require("express");
const webPush = require("web-push");
const bodyParser = require("body-parser");
const path = require("path");
const cors = require("cors");
const admin = require("firebase-admin");
const app = express();
 // 모든 origin에 대해 모든 HTTP 메서드 요청을 허용 CORS오류 해결
app.use(cors());

// Firebase Admin SDK 초기화 -> 연결
const serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

//Set static path
app.use(express.static(path.join(__dirname, "client/public")));
app.use(bodyParser.json());

//키값 넣기 웹 푸시 알림 보내기위한 인증
// const = 여기에 퍼블릭키와 프라이빗 키를 넣어주세용!~

webPush.setVapidDetails(
  "mailto:test@test.com",
  publicVapidKey,
  privateVapidKey
);

// Subscribe Route 구독정보를 파이어베이스에 저장.
app.post("/subscribe", async (req, res) => {
  try {
    const subscriptionData = req.body;
    // Save subscription data to Firestore
    await db.collection("subscriptions").add(subscriptionData);
    res.status(201).json({});
  } catch (error) {
    console.error("Error saving subscription:", error);
    res.status(500).json({ error: "Failed to save subscription." });
  }
});

// Send push notification to subscribers 모든 구독자들에게 푸시알림 보내는 함수.
async function sendPushNotification(payload) {
  try {
    // Retrieve all subscriptions from Firestore
    const snapshot = await db.collection("subscriptions").get();
    const subscriptions = [];
    snapshot.forEach((doc) => {
      subscriptions.push(doc.data());
    });
    // Send push notification to each subscriber
    await Promise.all(
      subscriptions.map((subscription) =>
        webPush.sendNotification(subscription, payload)
      )
    );
    console.log("Push notifications sent to all subscribers.");
  } catch (error) {
    console.error("Error sending push notifications:", error);
  }
}

// Route to handle new diary entries => 새로운 일기가 추가될때 푸시알림 , 파이어베이스에 저장
app.post("/newDiaryEntry", async (req, res) => {
  const { title, content } = req.body;
  const payload = JSON.stringify({
    title: "New Diary Entry",
    body: `A new diary entry titled "${title}" has been added!`,
  });
  try {
    // Save new diary entry to Firestore
    await db.collection("diary").add({ title, content, createdAt: new Date() });
    // Send push notification to all subscribers
    await sendPushNotification(payload);
    res.status(201).json({ message: "New diary entry added successfully." });
  } catch (error) {
    console.error("Error adding new diary entry:", error);
    res.status(500).json({ error: "Failed to add new diary entry." });
  }
});

const port = 7777;

app.listen(port, () => {
  console.log(`Server started on ${port}`);
});
