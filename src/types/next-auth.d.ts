import NextAuth from "next-auth";
import { SessionProviderOptions as BadSesssionProviderOptions } from "next-auth/client";
import { Session } from "next-auth";
import { JWT } from "next-auth/jwt";

/** Example on how to extend the built-in session types */
declare module "next-auth" {
  interface Session {
    /** This is an example. You can find me in types/next-auth.d.ts */
    foo: string;
  }
}

/** Example on how to extend the built-in types for JWT */
declare module "next-auth/jwt" {
  interface JWT {
    /** This is an example. You can find me in types/next-auth.d.ts */
    accessToken: string;
    iat: number;
    exp: number;
  }
}

// declare module "next-auth/client" {
//   /**
//    * Returned by `useSession`, `getSession` and received as a prop on the `Provider` React Context
//    */
//   interface SessionProviderOptions extends BadSesssionProviderOptions {
//     session: any;
//   }
// }
