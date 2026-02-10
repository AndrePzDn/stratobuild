import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

type AuthToken = {
  _id: string;
  role: string;
};

export interface AuthRequest extends Request {
  admin: { _id: string; role: string };
}

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest() as AuthRequest;
    const authorizationHeader = request.headers['authorization'];
    let token: string | undefined = undefined;
    if (authorizationHeader) {
      token = authorizationHeader.split(' ')[1];
    }

    if (!token) {
      throw new UnauthorizedException({
        success: false,
        result: null,
        message: 'No token provided',
      });
    }

    try {
      const tokenPayload: AuthToken = await this.jwtService.verifyAsync(token);
      request.admin = {
        _id: tokenPayload._id,
        role: tokenPayload.role,
      };
      return true;
    } catch {
      throw new UnauthorizedException({
        success: false,
        result: null,
        message: 'Invalid token',
      });
    }
  }
}
