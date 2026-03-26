import { sql } from "drizzle-orm";
import { index, uniqueIndex } from "drizzle-orm/pg-core";
import type { AnyPgColumn } from "drizzle-orm/pg-core";

type UsersTable = {
  piUid: AnyPgColumn;
  subscription: AnyPgColumn;
};

type NftsTable = {
  status: AnyPgColumn;
  ownerId: AnyPgColumn;
  creatorId: AnyPgColumn;
  pricePi: AnyPgColumn;
  createdAt: AnyPgColumn;
};

type ListingIntentsTable = {
  piPaymentId: AnyPgColumn;
  nftId: AnyPgColumn;
  buyerId: AnyPgColumn;
  status: AnyPgColumn;
};

type TransactionsTable = {
  txHash: AnyPgColumn;
  logIndex: AnyPgColumn;
  buyerId: AnyPgColumn;
  sellerId: AnyPgColumn;
  nftId: AnyPgColumn;
  piPaymentId: AnyPgColumn;
};

type SubscriptionsTable = {
  userId: AnyPgColumn;
  expiresAt: AnyPgColumn;
  status: AnyPgColumn;
};

export const usersIndexes = (table: UsersTable) => ({
  usersPiUidUniqueIdx: uniqueIndex("users_pi_uid_unique_idx").on(table.piUid),
  usersSubscriptionIdx: index("users_subscription_idx").on(table.subscription)
});

export const nftsIndexes = (table: NftsTable) => ({
  nftsStatusIdx: index("nfts_status_idx").on(table.status),
  nftsOwnerIdIdx: index("nfts_owner_id_idx").on(table.ownerId),
  nftsCreatorIdIdx: index("nfts_creator_id_idx").on(table.creatorId),
  nftsListedPriceIdx: index("nfts_listed_price_idx")
    .on(table.pricePi)
    .where(sql`${table.status} = 'listed'`),
  nftsListedCreatedAtDescIdx: index("nfts_listed_created_at_desc_idx")
    .on(sql`${table.createdAt} DESC`)
    .where(sql`${table.status} = 'listed'`)
});

export const listingIntentsIndexes = (table: ListingIntentsTable) => ({
  listingIntentsPiPaymentIdUniqueIdx: uniqueIndex("listing_intents_pi_payment_id_unique_idx").on(
    table.piPaymentId
  ),
  listingIntentsNftIdIdx: index("listing_intents_nft_id_idx").on(table.nftId),
  listingIntentsBuyerIdIdx: index("listing_intents_buyer_id_idx").on(table.buyerId),
  listingIntentsPendingStatusIdx: index("listing_intents_pending_status_idx")
    .on(table.status)
    .where(sql`${table.status} = 'pending'`)
});

export const transactionsIndexes = (table: TransactionsTable) => ({
  transactionsTxHashLogIndexUniqueIdx: uniqueIndex("transactions_tx_hash_log_index_unique_idx")
    .on(table.txHash, table.logIndex)
    .where(sql`${table.txHash} IS NOT NULL`),
  transactionsBuyerIdIdx: index("transactions_buyer_id_idx").on(table.buyerId),
  transactionsSellerIdIdx: index("transactions_seller_id_idx").on(table.sellerId),
  transactionsNftIdIdx: index("transactions_nft_id_idx").on(table.nftId),
  transactionsPiPaymentIdIdx: index("transactions_pi_payment_id_idx").on(table.piPaymentId)
});

export const subscriptionsIndexes = (table: SubscriptionsTable) => ({
  subscriptionsUserIdIdx: index("subscriptions_user_id_idx").on(table.userId),
  subscriptionsActiveExpiresAtIdx: index("subscriptions_active_expires_at_idx")
    .on(table.expiresAt)
    .where(sql`${table.status} = 'active'`)
});

export const indexerStateIndexes = () => ({});
