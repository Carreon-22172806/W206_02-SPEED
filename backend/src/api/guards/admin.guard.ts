import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class AdminGuard implements CanActivate {
  private readonly adminKey = 'AdminSecretKey'; 

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const adminKeyHeader = request.headers['admin-key'];

    return adminKeyHeader === this.adminKey;
  }
}