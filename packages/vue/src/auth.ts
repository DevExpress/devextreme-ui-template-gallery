export interface UserInfo {
  email: string;
  name: string;
  lastName: string;
  avatarUrl: string;
}

export const defaultUser: UserInfo = {
  email: 'jheart@dx-email.com',
  name: 'John',
  lastName: 'Heart',
  avatarUrl: 'https://js.devexpress.com/Demos/WidgetsGallery/JSDemos/images/employees/01.png',
};

export type AuthUser = {isOk: boolean, data?: UserInfo | null};

interface AuthInfo {
  _user: UserInfo | null,
  loggedIn: () => boolean,
  logOut: () => Promise<void>,
  logIn: (email:string, password: string) => Promise<Record<string, unknown>>
  createAccount: (email:string, password: string) => Promise<Record<string, unknown>>
  resetPassword: (email:string) => Promise<Record<string, unknown>>
  changePassword: (email:string, recoveryCode: string) => Promise<Record<string, unknown>>
  getUser: () => Promise<AuthUser>
}

export const authInfo: AuthInfo = {
  _user: defaultUser,
  loggedIn() {
    return !!this._user;
  },
  /* eslint-disable @typescript-eslint/no-unused-vars */
  async logIn(email: string, password: string) {
    try {
      // Send request
      this._user = { ...defaultUser, email };

      return {
        isOk: true,
        data: this._user,
      };
    } catch {
      return {
        isOk: false,
        message: 'Authentication failed',
      };
    }
  },

  async logOut() {
    /* this._user = null; */
  },

  async getUser() {
    try {
      // Send request

      return {
        isOk: true,
        data: this._user,
      };
    } catch {
      return {
        isOk: false,
      };
    }
  },

  async resetPassword(email: string) {
    try {
      // Send request
      return {
        isOk: true,
      };
    } catch {
      return {
        isOk: false,
        message: 'Failed to reset password',
      };
    }
  },

  async changePassword(email: string, recoveryCode: string) {
    try {
      // Send request
      return {
        isOk: true,
      };
    } catch {
      return {
        isOk: false,
        message: 'Failed to change password',
      };
    }
  },

  async createAccount(email: string, password: string) {
    try {
      // Send request
      return {
        isOk: true,
      };
    } catch {
      return {
        isOk: false,
        message: 'Failed to create account',
      };
    }
  },
};
