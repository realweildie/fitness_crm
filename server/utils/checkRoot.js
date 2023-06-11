import getUserRole from "./getUserRole.js";

export default async (req, res, next) => {
  const role = await getUserRole(req.userId);

  if (!role === "admin") {
    return res.status(400).json({
      success: false,
      message: "no permission",
    });
  }

  next();
};
