const jwt = require('jsonwebtoken');

export interface TokenHandler {
  createToken(tokenData): string;
  decodeToken(token: string): TokenData;
}

interface TokenData {
  username: string;
  userID: number
}

export class jwtTokenHandler implements TokenHandler {
  private encoderKey: string;
  constructor (encoder:string){
    this.encoderKey = encoder;
  }
  public createToken(tokenData:{username: string, userID: number}): string {
    return jwt.sign(tokenData, this.encoderKey);
  }

  public decodeToken(token: string): TokenData {
    return jwt.verify(token, this.encoderKey);
  }
}