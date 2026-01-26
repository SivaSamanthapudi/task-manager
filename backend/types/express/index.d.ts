declare global {
  namespace Express {
    interface Request {
      userData?: {
        userId: string;
      };
    }
  }
}

export {};
