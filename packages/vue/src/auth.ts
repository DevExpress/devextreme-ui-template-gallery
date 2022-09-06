type userInfo = {
  email: string;
  name: string;
  lastName: string;
  avatarUrl: string;
};

export const defaultUser: userInfo = {
  email: 'jheart@dx-email.com',
  name: 'John',
  lastName: 'Heart',
  avatarUrl: 'https://js.devexpress.com/Demos/WidgetsGallery/JSDemos/images/employees/01.png',
};

export const authInfo: { _user: userInfo | null, [key: string]: any } = {
  _user: defaultUser,
  loggedIn() {
    return !!this._user;
  },

  async logIn(email: string, password: string) {
    try {
      // Send request
      console.log(email, password);
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
    this._user = null;
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
      console.log(email);

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
      console.log(email, recoveryCode);

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
      console.log(email, password);

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
