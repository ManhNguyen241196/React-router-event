const bodyParser = require("body-parser");
const express = require("express");

const eventRoutes = require("./routes/events");

const app = express();

app.use(bodyParser.json()); //  khi gửi dữ liệu thông qua HTML như thông qua form thì sẽ chủ động được chuyển hóa thành data dạng json

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PATCH,DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
}); // sửa rỗi CORS. Cho phép truy xuất giá trị từ các web site ngoài

app.use("/events", eventRoutes);

app.use((error, req, res, next) => {
  const status = error.status || 500;
  const message = error.message || "Something went wrong.";
  res.status(status).json({ message: message });
}); // nếu backend bị lỗi k load dk

app.listen(8080, function () {
  console.log("express server listening on port ");
});
