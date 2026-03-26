import {
  pgTable,
  uuid,
  text,
  timestamp,
  numeric,
  boolean,
  integer,
  pgEnum,
} from "drizzle-orm/pg-core";

export const roleEnum = pgEnum("role", ["artist", "collector", "admin"]);

export const listingStatusEnum = pgEnum("listing_status", [
  "draft",
  "active",
  "sold",
  "cancelled",
]);

export const paymentStatusEnum = pgEnum("payment_status", [
  "pending",
  "approved",
  "completed",
  "cancelled",
]);

export const users = pgTable("users", {
  id: uuid("id").defaultRandom().primaryKey(),
  piUid: text("pi_uid").unique().notNull(),
  username: text("username").unique().notNull(),
  displayName: text("display_name"),
  bio: text("bio"),
  avatarUrl: text("avatar_url"),
  role: roleEnum("role").default("collector").notNull(),
  subscribedUntil: timestamp("subscribed_until", { withTimezone: true }),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
});

export const artworks = pgTable("artworks", {
  id: uuid("id").defaultRandom().primaryKey(),
  artistId: uuid("artist_id").references(() => users.id).notNull(),
  title: text("title").notNull(),
  description: text("description"),
  medium: text("medium"),
  dimensions: text("dimensions"),
  year: integer("year"),
  imageUrl: text("image_url").notNull(),
  ipfsCid: text("ipfs_cid"),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
});

export const listings = pgTable("listings", {
  id: uuid("id").defaultRandom().primaryKey(),
  artworkId: uuid("artwork_id").references(() => artworks.id).notNull(),
  sellerId: uuid("seller_id").references(() => users.id).notNull(),
  pricePi: numeric("price_pi", { precision: 18, scale: 7 }).notNull(),
  platformFee: numeric("platform_fee", { precision: 18, scale: 7 }).notNull(),
  status: listingStatusEnum("status").default("draft").notNull(),
  listedAt: timestamp("listed_at", { withTimezone: true }),
  soldAt: timestamp("sold_at", { withTimezone: true }),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});

export const orders = pgTable("orders", {
  id: uuid("id").defaultRandom().primaryKey(),
  listingId: uuid("listing_id").references(() => listings.id).notNull(),
  buyerId: uuid("buyer_id").references(() => users.id).notNull(),
  piPaymentId: text("pi_payment_id").unique(),
  txid: text("txid"),
  amountPi: numeric("amount_pi", { precision: 18, scale: 7 }).notNull(),
  status: paymentStatusEnum("status").default("pending").notNull(),
  completedAt: timestamp("completed_at", { withTimezone: true }),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});

export const subscriptions = pgTable("subscriptions", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: uuid("user_id").references(() => users.id).notNull(),
  piPaymentId: text("pi_payment_id").unique(),
  amountPi: numeric("amount_pi", { precision: 18, scale: 7 }).notNull(),
  startsAt: timestamp("starts_at", { withTimezone: true }).notNull(),
  endsAt: timestamp("ends_at", { withTimezone: true }).notNull(),
  active: boolean("active").default(true).notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});
