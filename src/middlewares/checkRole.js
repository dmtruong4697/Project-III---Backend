import { RoleEnum } from "../shared/enum/Role.enum.js";

const checkRole = (role) => {
  return (req, res, next) => {
    const userRole = req.role; 

    if (userRole === role) {
      next();
    } else {
      res.status(403).json({ message: "Không có quyền truy cập" });
    }
  };
};

export {checkRole};
