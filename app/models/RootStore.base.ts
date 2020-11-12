/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */
/* tslint:disable */
import { ObservableMap } from "mobx"
import { types } from "mobx-state-tree"
import { MSTGQLStore, configureStoreMixin, QueryOptions, withTypedRefs } from "mst-gql"

import { PriceModel, PriceModelType } from "./PriceModel"
import { priceModelPrimitives, PriceModelSelector } from "./PriceModel.base"
import { WalletModel, WalletModelType } from "./WalletModel"
import { walletModelPrimitives, WalletModelSelector } from "./WalletModel.base"
import { TransactionModel, TransactionModelType } from "./TransactionModel"
import { transactionModelPrimitives, TransactionModelSelector } from "./TransactionModel.base"
import { EarnModel, EarnModelType } from "./EarnModel"
import { earnModelPrimitives, EarnModelSelector } from "./EarnModel.base"
import { UserModel, UserModelType } from "./UserModel"
import { userModelPrimitives, UserModelSelector } from "./UserModel.base"
import { MarkerModel, MarkerModelType } from "./MarkerModel"
import { markerModelPrimitives, MarkerModelSelector } from "./MarkerModel.base"
import { CoordinateModel, CoordinateModelType } from "./CoordinateModel"
import { coordinateModelPrimitives, CoordinateModelSelector } from "./CoordinateModel.base"
import { BuildParameterModel, BuildParameterModelType } from "./BuildParameterModel"
import { buildParameterModelPrimitives, BuildParameterModelSelector } from "./BuildParameterModel.base"
import { NodeStatsModel, NodeStatsModelType } from "./NodeStatsModel"
import { nodeStatsModelPrimitives, NodeStatsModelSelector } from "./NodeStatsModel.base"
import { LastOnChainAddressModel, LastOnChainAddressModelType } from "./LastOnChainAddressModel"
import { lastOnChainAddressModelPrimitives, LastOnChainAddressModelSelector } from "./LastOnChainAddressModel.base"
import { SuccessModel, SuccessModelType } from "./SuccessModel"
import { successModelPrimitives, SuccessModelSelector } from "./SuccessModel.base"
import { TokenModel, TokenModelType } from "./TokenModel"
import { tokenModelPrimitives, TokenModelSelector } from "./TokenModel.base"
import { OnchainTransactionModel, OnchainTransactionModelType } from "./OnchainTransactionModel"
import { onchainTransactionModelPrimitives, OnchainTransactionModelSelector } from "./OnchainTransactionModel.base"
import { InvoiceModel, InvoiceModelType } from "./InvoiceModel"
import { invoiceModelPrimitives, InvoiceModelSelector } from "./InvoiceModel.base"
import { OnChainModel, OnChainModelType } from "./OnChainModel"
import { onChainModelPrimitives, OnChainModelSelector } from "./OnChainModel.base"
import { UpdateUserModel, UpdateUserModelType } from "./UpdateUserModel"
import { updateUserModelPrimitives, UpdateUserModelSelector } from "./UpdateUserModel.base"



export type InputUser = {
  id?: string
  level?: number
}
/* The TypeScript type that explicits the refs to other models in order to prevent a circular refs issue */
type Refs = {
  prices: ObservableMap<string, PriceModelType>,
  wallets: ObservableMap<string, WalletModelType>,
  transactions: ObservableMap<string, TransactionModelType>,
  earns: ObservableMap<string, EarnModelType>,
  users: ObservableMap<string, UserModelType>,
  markers: ObservableMap<string, MarkerModelType>,
  buildParameters: ObservableMap<string, BuildParameterModelType>,
  nodeStats: ObservableMap<string, NodeStatsModelType>,
  lastOnChainAddresses: ObservableMap<string, LastOnChainAddressModelType>
}


/**
* Enums for the names of base graphql actions
*/
export enum RootStoreBaseQueries {
queryPrices="queryPrices",
queryWallet="queryWallet",
queryEarnList="queryEarnList",
queryMe="queryMe",
queryMaps="queryMaps",
queryBuildParameters="queryBuildParameters",
queryNodeStats="queryNodeStats",
queryGetLastOnChainAddress="queryGetLastOnChainAddress",
queryUsernameExists="queryUsernameExists"
}
export enum RootStoreBaseMutations {
mutateRequestPhoneCode="mutateRequestPhoneCode",
mutateLogin="mutateLogin",
mutateOpenChannel="mutateOpenChannel",
mutatePublicInvoice="mutatePublicInvoice",
mutateOnchain="mutateOnchain",
mutateInvoice="mutateInvoice",
mutateEarnCompleted="mutateEarnCompleted",
mutateUpdateUser="mutateUpdateUser",
mutateDeleteUser="mutateDeleteUser",
mutateAddDeviceToken="mutateAddDeviceToken",
mutateTestMessage="mutateTestMessage"
}

/**
* Store, managing, among others, all the objects received through graphQL
*/
export const RootStoreBase = withTypedRefs<Refs>()(MSTGQLStore
  .named("RootStore")
  .extend(configureStoreMixin([['Price', () => PriceModel], ['Wallet', () => WalletModel], ['Transaction', () => TransactionModel], ['Earn', () => EarnModel], ['User', () => UserModel], ['Marker', () => MarkerModel], ['Coordinate', () => CoordinateModel], ['BuildParameter', () => BuildParameterModel], ['NodeStats', () => NodeStatsModel], ['LastOnChainAddress', () => LastOnChainAddressModel], ['Success', () => SuccessModel], ['Token', () => TokenModel], ['OnchainTransaction', () => OnchainTransactionModel], ['Invoice', () => InvoiceModel], ['OnChain', () => OnChainModel], ['UpdateUser', () => UpdateUserModel]], ['Price', 'Wallet', 'Transaction', 'Earn', 'User', 'Marker', 'BuildParameter', 'NodeStats', 'LastOnChainAddress'], "js"))
  .props({
    prices: types.optional(types.map(types.late((): any => PriceModel)), {}),
    wallets: types.optional(types.map(types.late((): any => WalletModel)), {}),
    transactions: types.optional(types.map(types.late((): any => TransactionModel)), {}),
    earns: types.optional(types.map(types.late((): any => EarnModel)), {}),
    users: types.optional(types.map(types.late((): any => UserModel)), {}),
    markers: types.optional(types.map(types.late((): any => MarkerModel)), {}),
    buildParameters: types.optional(types.map(types.late((): any => BuildParameterModel)), {}),
    nodeStats: types.optional(types.map(types.late((): any => NodeStatsModel)), {}),
    lastOnChainAddresses: types.optional(types.map(types.late((): any => LastOnChainAddressModel)), {})
  })
  .actions(self => ({
    queryPrices(variables?: {  }, resultSelector: string | ((qb: PriceModelSelector) => PriceModelSelector) = priceModelPrimitives.toString(), options: QueryOptions = {}) {
      return self.query<{ prices: PriceModelType[]}>(`query prices { prices {
        ${typeof resultSelector === "function" ? resultSelector(new PriceModelSelector()).toString() : resultSelector}
      } }`, variables, options)
    },
    queryWallet(variables?: {  }, resultSelector: string | ((qb: WalletModelSelector) => WalletModelSelector) = walletModelPrimitives.toString(), options: QueryOptions = {}) {
      return self.query<{ wallet: WalletModelType[]}>(`query wallet { wallet {
        ${typeof resultSelector === "function" ? resultSelector(new WalletModelSelector()).toString() : resultSelector}
      } }`, variables, options)
    },
    queryEarnList(variables?: {  }, resultSelector: string | ((qb: EarnModelSelector) => EarnModelSelector) = earnModelPrimitives.toString(), options: QueryOptions = {}) {
      return self.query<{ earnList: EarnModelType[]}>(`query earnList { earnList {
        ${typeof resultSelector === "function" ? resultSelector(new EarnModelSelector()).toString() : resultSelector}
      } }`, variables, options)
    },
    queryMe(variables?: {  }, resultSelector: string | ((qb: UserModelSelector) => UserModelSelector) = userModelPrimitives.toString(), options: QueryOptions = {}) {
      return self.query<{ me: UserModelType}>(`query me { me {
        ${typeof resultSelector === "function" ? resultSelector(new UserModelSelector()).toString() : resultSelector}
      } }`, variables, options)
    },
    queryMaps(variables?: {  }, resultSelector: string | ((qb: MarkerModelSelector) => MarkerModelSelector) = markerModelPrimitives.toString(), options: QueryOptions = {}) {
      return self.query<{ maps: MarkerModelType[]}>(`query maps { maps {
        ${typeof resultSelector === "function" ? resultSelector(new MarkerModelSelector()).toString() : resultSelector}
      } }`, variables, options)
    },
    queryBuildParameters(variables: { appVersion?: string, buildVersion?: string }, resultSelector: string | ((qb: BuildParameterModelSelector) => BuildParameterModelSelector) = buildParameterModelPrimitives.toString(), options: QueryOptions = {}) {
      return self.query<{ buildParameters: BuildParameterModelType}>(`query buildParameters($appVersion: String, $buildVersion: String) { buildParameters(appVersion: $appVersion, buildVersion: $buildVersion) {
        ${typeof resultSelector === "function" ? resultSelector(new BuildParameterModelSelector()).toString() : resultSelector}
      } }`, variables, options)
    },
    queryNodeStats(variables?: {  }, resultSelector: string | ((qb: NodeStatsModelSelector) => NodeStatsModelSelector) = nodeStatsModelPrimitives.toString(), options: QueryOptions = {}) {
      return self.query<{ nodeStats: NodeStatsModelType}>(`query nodeStats { nodeStats {
        ${typeof resultSelector === "function" ? resultSelector(new NodeStatsModelSelector()).toString() : resultSelector}
      } }`, variables, options)
    },
    queryGetLastOnChainAddress(variables?: {  }, resultSelector: string | ((qb: LastOnChainAddressModelSelector) => LastOnChainAddressModelSelector) = lastOnChainAddressModelPrimitives.toString(), options: QueryOptions = {}) {
      return self.query<{ getLastOnChainAddress: LastOnChainAddressModelType}>(`query getLastOnChainAddress { getLastOnChainAddress {
        ${typeof resultSelector === "function" ? resultSelector(new LastOnChainAddressModelSelector()).toString() : resultSelector}
      } }`, variables, options)
    },
    queryUsernameExists(variables: { username: string }, options: QueryOptions = {}) {
      return self.query<{ usernameExists: boolean }>(`query usernameExists($username: String!) { usernameExists(username: $username) }`, variables, options)
    },
    mutateRequestPhoneCode(variables: { phone?: string }, resultSelector: string | ((qb: SuccessModelSelector) => SuccessModelSelector) = successModelPrimitives.toString(), optimisticUpdate?: () => void) {
      return self.mutate<{ requestPhoneCode: SuccessModelType}>(`mutation requestPhoneCode($phone: String) { requestPhoneCode(phone: $phone) {
        ${typeof resultSelector === "function" ? resultSelector(new SuccessModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    mutateLogin(variables: { phone?: string, code?: number, currency?: string }, resultSelector: string | ((qb: TokenModelSelector) => TokenModelSelector) = tokenModelPrimitives.toString(), optimisticUpdate?: () => void) {
      return self.mutate<{ login: TokenModelType}>(`mutation login($phone: String, $code: Int, $currency: String) { login(phone: $phone, code: $code, currency: $currency) {
        ${typeof resultSelector === "function" ? resultSelector(new TokenModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    mutateOpenChannel(variables: { localTokens?: number, publicKey?: string, socket?: string }, resultSelector: string | ((qb: OnchainTransactionModelSelector) => OnchainTransactionModelSelector) = onchainTransactionModelPrimitives.toString(), optimisticUpdate?: () => void) {
      return self.mutate<{ openChannel: OnchainTransactionModelType}>(`mutation openChannel($localTokens: Int, $publicKey: String, $socket: String) { openChannel(local_tokens: $localTokens, public_key: $publicKey, socket: $socket) {
        ${typeof resultSelector === "function" ? resultSelector(new OnchainTransactionModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    mutatePublicInvoice(variables: { username: string }, resultSelector: string | ((qb: InvoiceModelSelector) => InvoiceModelSelector) = invoiceModelPrimitives.toString(), optimisticUpdate?: () => void) {
      return self.mutate<{ publicInvoice: InvoiceModelType}>(`mutation publicInvoice($username: String!) { publicInvoice(username: $username) {
        ${typeof resultSelector === "function" ? resultSelector(new InvoiceModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    mutateOnchain(variables?: {  }, resultSelector: string | ((qb: OnChainModelSelector) => OnChainModelSelector) = onChainModelPrimitives.toString(), optimisticUpdate?: () => void) {
      return self.mutate<{ onchain: OnChainModelType}>(`mutation onchain { onchain {
        ${typeof resultSelector === "function" ? resultSelector(new OnChainModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    mutateInvoice(variables?: {  }, resultSelector: string | ((qb: InvoiceModelSelector) => InvoiceModelSelector) = invoiceModelPrimitives.toString(), optimisticUpdate?: () => void) {
      return self.mutate<{ invoice: InvoiceModelType}>(`mutation invoice { invoice {
        ${typeof resultSelector === "function" ? resultSelector(new InvoiceModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    mutateEarnCompleted(variables: { ids?: string[] }, resultSelector: string | ((qb: EarnModelSelector) => EarnModelSelector) = earnModelPrimitives.toString(), optimisticUpdate?: () => void) {
      return self.mutate<{ earnCompleted: EarnModelType[]}>(`mutation earnCompleted($ids: [ID]) { earnCompleted(ids: $ids) {
        ${typeof resultSelector === "function" ? resultSelector(new EarnModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    mutateUpdateUser(variables?: {  }, resultSelector: string | ((qb: UpdateUserModelSelector) => UpdateUserModelSelector) = updateUserModelPrimitives.toString(), optimisticUpdate?: () => void) {
      return self.mutate<{ updateUser: UpdateUserModelType}>(`mutation updateUser { updateUser {
        ${typeof resultSelector === "function" ? resultSelector(new UpdateUserModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    mutateDeleteUser(variables?: {  }, optimisticUpdate?: () => void) {
      return self.mutate<{ deleteUser: boolean }>(`mutation deleteUser { deleteUser }`, variables, optimisticUpdate)
    },
    mutateAddDeviceToken(variables: { deviceToken?: string }, resultSelector: string | ((qb: SuccessModelSelector) => SuccessModelSelector) = successModelPrimitives.toString(), optimisticUpdate?: () => void) {
      return self.mutate<{ addDeviceToken: SuccessModelType}>(`mutation addDeviceToken($deviceToken: String) { addDeviceToken(deviceToken: $deviceToken) {
        ${typeof resultSelector === "function" ? resultSelector(new SuccessModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    mutateTestMessage(variables?: {  }, resultSelector: string | ((qb: SuccessModelSelector) => SuccessModelSelector) = successModelPrimitives.toString(), optimisticUpdate?: () => void) {
      return self.mutate<{ testMessage: SuccessModelType}>(`mutation testMessage { testMessage {
        ${typeof resultSelector === "function" ? resultSelector(new SuccessModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
  })))
