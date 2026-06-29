import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
// @ts-ignore — no official types for passport-42
import { Strategy as FortyTwoStrategy } from "passport-42";
import User from "../models/User";

const BACKEND_URL = process.env.BACKEND_URL || "http://localhost:3000";

passport.use(
  new FortyTwoStrategy(
    {
      clientID: process.env.FORTY_TWO_CLIENT_ID!,
      clientSecret: process.env.FORTY_TWO_CLIENT_SECRET!,
      callbackURL: `${BACKEND_URL}/api/auth/oauth/42/callback`,
    },
    async (
      _accessToken: string,
      _refreshToken: string,
      profile: any,
      done: Function
    ) => {
      try {
        let user = await User.findOne({ provider: "42", providerId: profile.id });

        if (!user) {
          user = await User.create({
            provider: "42",
            providerId: profile.id,
            email: profile.emails?.[0]?.value || `${profile.id}@42.fr`,
            username: profile.username || `42_${profile.id}`,
            firstName: profile.name?.givenName || profile.displayName || "",
            lastName: profile.name?.familyName || "",
            profilePicture: profile.photos?.[0]?.value || "",
          });
        }

        return done(null, user);
      } catch (err) {
        return done(err);
      }
    }
  )
);

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      callbackURL: `${BACKEND_URL}/api/auth/oauth/google/callback`,
    },
    async (_accessToken, _refreshToken, profile, done) => {
      try {
        let user = await User.findOne({
          provider: "google",
          providerId: profile.id,
        });

        if (!user) {
          user = await User.create({
            provider: "google",
            providerId: profile.id,
            email: profile.emails?.[0]?.value || `${profile.id}@google.com`,
            username: `google_${profile.id}`,
            firstName: profile.name?.givenName || "",
            lastName: profile.name?.familyName || "",
            profilePicture: profile.photos?.[0]?.value || "",
          });
        }

        return done(null, user);
      } catch (err) {
        return done(err as Error);
      }
    }
  )
);

export default passport;
