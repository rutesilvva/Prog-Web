import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export type UserRole = 'guest' | 'customer' | 'admin';
export interface User {
  name: string;
  email: string;
  role: UserRole;
}

const LS_KEY = 'auth_user';
@Injectable({ providedIn: 'root' })
export class AuthService {
  private _user$ = new BehaviorSubject<User | null>(this.load());
  user$ = this._user$.asObservable();

  private load(): User | null {
    try {
      const raw = localStorage.getItem(LS_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  }

  private persist(u: User | null) {
    if (u) localStorage.setItem(LS_KEY, JSON.stringify(u));
    else localStorage.removeItem(LS_KEY);
  }

  loginAs(role: UserRole, name = 'Usuário', email = 'user@example.com') {
    const u: User = { name, email, role };
    this._user$.next(u);
    this.persist(u);
  }

  logout() {
    this._user$.next(null);
    this.persist(null);
  }

  get user(): User | null {
    return this._user$.value || this.load(); // garante que busca do localStorage
  }

  isAdmin()  { return this.user?.role === 'admin'; }
  isLogged() { return !!this.user; }
}
