const jwt = require('jsonwebtoken');

export interface TokenHandler {
  createToken(tokenData: TokenData): string;
  decodeToken(token: string): TokenData;
}

interface TokenData {
  username: string;
  user_ID: number;
}

export class JwtTokenHandler implements TokenHandler {
  private encoderKey: string;
  constructor(encoder: string) {
    this.encoderKey = encoder;
  }
  public createToken(tokenData: TokenData): string {
    return jwt.sign(tokenData, this.encoderKey);
  }

  public decodeToken(token: string): TokenData {
    return jwt.verify(token, this.encoderKey);
  }
}
