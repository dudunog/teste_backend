import Dotenv from "dotenv";

Dotenv.config();

export interface IEnvironment {
  infrastructure: {
    server: {
      rest: {
        express: {
          port: number;
        };
      };
    };
    web: {
      url: string;
    };
    database: {
      postgresql: {
        host: string;
        port: number;
        user: string;
        password: string;
        database: string;
      };
    };
  };
  secrets: {
    jwt: string;
    temporary_permission: string;
  };
}

const Environment: IEnvironment = {
  infrastructure: {
    server: {
      rest: {
        express: {
          port: Number(process.env.SERVER_PORT) || 49120,
        },
      },
    },
    web: {
      url: process.env.WEB_URL,
    },
    database: {
      postgresql: {
        host: process.env.POSTGRES_HOST || "localhost",
        port: Number(process.env.POSTGRES_PORT) || 5438,
        user: process.env.POSTGRES_USER || "development",
        password: process.env.POSTGRES_PASSWORD || "",
        database: process.env.POSTGRES_DB || "tasksdb",
      },
    },
  },
  secrets: {
    jwt: String(process.env.JWT_SECRET),
    temporary_permission: String(process.env.TEMPORARY_PERMISSION_SECRET),
  },
};
export { Environment };
