import Jwt from 'jsonwebtoken';
import { NextFunction, Request, Response } from "express";
import { CONSTANTS } from '../constants/constants';

// Protect Route for Authenticated Users
export const authGuard = (req: Request, res: Response, next: NextFunction) => {
  let token: string = '',
  response;

  if (
    req.header('Authorization') &&
    req.header('Authorization')?.startsWith('Bearer')
  ) {
    try {
      token = req.header('Authorization')?.replace(/Bearer\s+/i, '') as string;

      const user = Jwt.verify(token, process.env.AT_SECRET as string);
      
      if (!user) {
        response = CONSTANTS.INVALID_ACCESS_TOKEN;
      }
    } catch (err) {
      response = CONSTANTS.INVALID_ACCESS_TOKEN;
    }
  } else {
    response = CONSTANTS.INVALID_ACCESS_TOKEN;
  }

  if (response) {
    res.json(response)
  } else {
    next()
  }
}