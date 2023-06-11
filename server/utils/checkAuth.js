import jwt from "jsonwebtoken";

export default (req, res, next) => {
  const token = (req.headers.authorization || "").replace(/Bearer\s?/, "");

  if (token) {
    try {
      const decodedToken = jwt.verify(token, "key_from_env");
      req.userId = decodedToken._id;

      next();
    } catch (error) {
      return res.status(403).json({
        success: false,
        message: "Access error",
      });
    }
  } else {
    return res.status(403).json({ success: false, message: "No token" });
  }
};
