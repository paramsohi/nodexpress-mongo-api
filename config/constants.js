const globalConstants = {
  LOCALURL: 'http://localhost:9999',
  LIVEURL: '',
  JWTOKENLOCAL: 'attnd',
  JWTOKENLIVE: 'c3f42e68-b461-4bc1-ae2c-da9f27ee3a20',
  EMAIL: {
    LOCALHOST: '',
    LIVE: '',
  },
  FCM: {
    LOCALHOST: {
      SERVERKEY: 'AAAAVlyXLrw:APA91bFln-9gTdozArs4Hr8iJeZmR-Tu8d07vrw3rZMWbKhAQeHh9sP2qfeJmDT_qZ7UUu5RTX6AWog13SCjjzGhIozZR1fEj9d2PwMV9bl93SjExgJlaEkFcb8eNmFiRr82NO0dpE_n',
    },
    LIVE: {
      SERVERKEY: 'AAAAVlyXLrw:APA91bFln-9gTdozArs4Hr8iJeZmR-Tu8d07vrw3rZMWbKhAQeHh9sP2qfeJmDT_qZ7UUu5RTX6AWog13SCjjzGhIozZR1fEj9d2PwMV9bl93SjExgJlaEkFcb8eNmFiRr82NO0dpE_n',
    },
  },
  MONGODB: {
    LOCALHOST: {
      URL: 'mongodb://localhost:27017/hono',
    },
    TEST: {
      URL: 'mongodb://localhost:27017/hono-test',
    },
    LIVE: {
      URL: '',
    },
  },
  FACEBOOK: {
    LOCALHOST: {
      CLIENT_ID: '',
      CLIENT_SECRET: '',
      REDIRECT_URL: '',
    },
    LIVE: {
      CLIENT_ID: '',
      CLIENT_SECRET: '',
      REDIRECT_URL: '',
    },
  },
};

module.exports = globalConstants;
