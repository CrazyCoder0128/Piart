import {
  boolean,
  integer,
  numeric,
  pgTable,
  text,
  timestamp,
  uuid,
  varchar
} from "drizzle-orm/pg-core";
import {
  listingIntentsIndexes,
  nftsIndexes,
  subscriptionsIndexes,
  transactionsIndexes,
  usersIndexes
} from "./indexes";

export const users = pgTable(
  "users",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    piUid: varchar("pi_uid", { length: 255 }).notNull().unique(),
    username: varchar("username", { length: 100 }).unique(),
    displayName: varchar("display_name", { length: 200 }),
    bio: text("bio"),
    avatarUrl: text("avatar_url"),
    kycVerified: boolean("kyc_verified").notNull().default(false),
    subscription: text("subscription").notNull().default("free"),
    region: varchar("region", { length: 10 }),
    piWallet: varchar("pi_wallet", { length: 255 }),
    adsEnabled: boolean("ads_enabled").notNull().default(true),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow()
  },
  (table) => usersIndexes(table)
);

export const nfts = pgTable(
  "nfts",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    creatorId: uuid("creator_id")
      .notNull()
      .references(() => users.id),
    ownerId: uuid("owner_id")
      .notNull()
      .references(() => users.id),
    title: varchar("title", { length: 500 }).notNull(),
    description: text("description"),
    mediaUrl: text("media_url").notNull(),
    thumbnailUrl: text("thumbnail_url"),
    pricePi: numeric("price_pi", { precision: 18, scale: 6 }),
    status: text("status").notNull().default("draft"),
    physicalCert: text("physical_cert"),
    tokenId: varchar("token_id", { length: 255 }),
    metadataUri: text("metadata_uri"),
    viewCount: integer("view_count").notNull().default(0),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow()
  },
  (table) => nftsIndexes(table)
);

export const listingIntents = pgTable(
  "listing_intents",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    nftId: uuid("nft_id")
      .notNull()
      .references(() => nfts.id),
    buyerId: uuid("buyer_id")
      .notNull()
      .references(() => users.id),
    piPaymentId: varchar("pi_payment_id", { length: 255 }).notNull().unique(),
    status: text("status").notNull().default("pending"),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
    resolvedAt: timestamp("resolved_at", { withTimezone: true })
  },
  (table) => listingIntentsIndexes(table)
);

export const transactions = pgTable(
  "transactions",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    nftId: uuid("nft_id")
      .notNull()
      .references(() => nfts.id),
    buyerId: uuid("buyer_id")
      .notNull()
      .references(() => users.id),
    sellerId: uuid("seller_id")
      .notNull()
      .references(() => users.id),
    pricePi: numeric("price_pi", { precision: 18, scale: 6 }).notNull(),
    platformFee: numeric("platform_fee", { precision: 18, scale: 6 }).notNull(),
    sellerAmount: numeric("seller_amount", { precision: 18, scale: 6 }).notNull(),
    piPaymentId: varchar("pi_payment_id", { length: 255 }),
    piTxnId: varchar("pi_txn_id", { length: 255 }),
    txHash: varchar("tx_hash", { length: 255 }),
    logIndex: integer("log_index"),
    status: text("status").notNull().default("pending"),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
    completedAt: timestamp("completed_at", { withTimezone: true })
  },
  (table) => transactionsIndexes(table)
);

export const indexerState = pgTable(
  "indexer_state",
  {
    key: varchar("key", { length: 100 }).primaryKey(),
    value: text("value").notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow()
  }
);

export const subscriptions = pgTable(
  "subscriptions",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    userId: uuid("user_id")
      .notNull()
      .references(() => users.id),
    piPaymentId: varchar("pi_payment_id", { length: 255 }).notNull().unique(),
    status: text("status").notNull().default("active"),
    startedAt: timestamp("started_at", { withTimezone: true }).notNull().defaultNow(),
    expiresAt: timestamp("expires_at", { withTimezone: true }).notNull(),
    pricePi: numeric("price_pi", { precision: 18, scale: 6 }).notNull()
  },
  (table) => subscriptionsIndexes(table)
);
