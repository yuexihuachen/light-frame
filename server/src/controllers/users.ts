import { Request, Response } from "express";
import { User } from "../schemas/index";
import { CONSTANTS } from "../constants/constants";
import Jwt from 'jsonwebtoken';

const getTokens = (user: any) => {
  // at Token expires 6 hours
  const atExpires: string = "6 h";
  // const atExpires: number =  Math.floor(Date.now() / 1000) + 60 * 1;
  // rt Token expires 7 days
  const rtExpires: string = "7 d";
  // const rtExpires: number = Math.floor(Date.now() / 1000) + 60 * 7;

  const payload = { _id: user._id, username: user.username };
  /* eslint-disable */
  const at: string = Jwt.sign(payload,process.env.AT_SECRET as string,{expiresIn: atExpires})

  const rt: string  = Jwt.sign(payload,process.env.RT_SECRET as string,{expiresIn: rtExpires})

  return {
    at,
    rt,
  };
}

export class Users {
  async loginUser (req: Request, res: Response) {
    const { username, password } = req.body;
  
    const user = await User.findOne({ username, password });
    
    let response: any = {
      code: -1,
      data: "No user found with this username",
      message: "failed",
    }
    if (user) {
      const tokenUser = {
        _id: user._id,
        username: user.username,
      };
    
      const { at, rt } = getTokens(tokenUser);
    
      res.cookie("at", at);
      res.cookie("rt", rt);
      response = {
        code: 0,
        data: {
          at,
          rt,
        },
        message: "success",
      }
    }
  
    res.json(response);
  }

  async refreshToken(req: Request, res: Response) {
    const { refreshToken } = req.body;
    let newToken = CONSTANTS.INVALID_REFRESH_TOKEN;
    const verifyUser = await Jwt.verify(
      refreshToken,
      process.env.RT_SECRET as string
    );
    if (!verifyUser) {
      newToken = CONSTANTS.INVALID_REFRESH_TOKEN
    } else {
      try {
        const { at, rt } = getTokens(verifyUser);

        res.cookie("at", at);
        res.cookie("rt", rt);
        newToken = CONSTANTS.SUCCESS;
      } catch (err) {
        newToken = CONSTANTS.INVALID_REFRESH_TOKEN
      }
    }
  
    res.json(newToken);
  }
  

}