import { jwt } from 'jsonwebtoken';
import { SECRET_KEY } from "../utils/constants";

export const checkAuth = (req:any, res:any, next:any) => {
  try {
    // Header format: "Bearer <token>"
    const token = req.headers.authorization.split(" ")[1];
    
    // Verify the token
    const decodedToken = jwt.verify(token, SECRET_KEY);
    
    // Attach user data to the request object so routes can use it
    req.userData = { email: decodedToken.email, userId: decodedToken.userId };
    
    next(); // Move to the next function (the controller)
  } catch (error) {
    res.status(401).json({ message: "You are not authenticated!" });
  }
};