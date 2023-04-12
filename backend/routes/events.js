//gán các method vào các đường link phù hợp để có thể gọi hya truyền dữ liệu
const express = require("express");

const { getAll, get, add, replace, remove } = require("../data/event");
const {
  isValidText,
  isValidDate,
  isValidImageUrl,
} = require("../util/validation");

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const events = await getAll();
    res.json({ events: events });
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const event = await get(req.params.id);
    res.json({ event: event }); // trả về 1 object có key event và value là event dạng json
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  const data = req.body;

  let errors = {};

  if (!isValidText(data.title)) {
    errors.title = "Invalid title.";
  }

  if (!isValidText(data.description)) {
    errors.description = "Invalid description.";
  }

  if (!isValidDate(data.date)) {
    errors.date = "Invalid date.";
  }

  if (!isValidImageUrl(data.image)) {
    errors.image = "Invalid image.";
  }

  if (Object.keys(errors).length > 0) {
    // kiem tra loi. Nếu Object Error có tồn tại lỗi sẽ
    // return ngay sau đó và k tiến hành tiếp tục đẩy lỗi.
    return res.status(422).json({
      message: "Adding the event failed due to validation errors.",
      errors,
    });
  }

  try {
    await add(data); // thực hiện phương thức thêm dữ liệu
    res.status(201).json({ message: "Event saved.", event: data }); // res để phẩn hồi lại message cũng như status
    // để bên brower có thể truy xuất khi có tước tác truy cập vào router. Khi đó nó sẽ phản hồi lại. Những phản hồi  này có thể được
    //đọc ở bên ng dùng bằng các sử dụng useActionData() như 1 cách thu thập dữ liệu phản hồi từ 1 action.
  } catch (error) {
    next(error);
  }
});

router.post("/edit/:id", async (req, res, next) => {
  const data = req.body;

  let errors = {};

  if (!isValidText(data.title)) {
    errors.title = "Invalid title.";
  }

  if (!isValidText(data.description)) {
    errors.description = "Invalid description.";
  }

  if (!isValidDate(data.date)) {
    errors.date = "Invalid date.";
  }

  if (!isValidImageUrl(data.image)) {
    errors.image = "Invalid image.";
  }

  if (Object.keys(errors).length > 0) {
    return res.status(422).json({
      message: "Updating the event failed due to validation errors.",
      errors,
    });
  }

  try {
    await replace(req.params.id, data);
    res.json({ message: "Event updated.", event: data });
  } catch (error) {
    next(error);
  }
});

// router.delete("/:id", async (req, res, next) => {  // router cùng được chỏ tới
//   try {
//     await remove(req.params.id);
//     res.json({ message: "Event deleted." });
//   } catch (error) {
//     next(error);
//   }
// });

router.post("/xoa/:id", async (req, res, next) => {
  // router cùng được chỏ tới
  try {
    await remove(req.params.id);
    res.json({ message: "Event deleted." });
  } catch (error) {
    next(error);
  }
});
module.exports = router;
