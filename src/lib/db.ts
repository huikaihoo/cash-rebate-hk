import Dexie, { PromiseExtended, Table, TransactionMode, TXWithTables } from 'dexie'

import { CreditCard, Rebate, RebateIndex } from '@/services/credit-card/model'

const DB_VERSION_CORE = 1

export interface Metadata {
  key: string
  checksum: string
  updatedAt: Date
}

export class CoreDb extends Dexie {
  creditCards!: Table<CreditCard>
  rebates!: Table<Rebate>
  rebateIndexes!: Table<RebateIndex>
  metadata!: Table<Metadata>

  constructor() {
    super('Core')
    this.version(DB_VERSION_CORE).stores({
      creditCards: 'id, bankId',
      rebates: 'id, cardId, *channels',
      rebateIndexes: '++id, channel',
      metadata: 'key',
    })
  }

  creditCardTrx<U>(
    mode: TransactionMode,
    scope: (trans: TXWithTables<this>) => PromiseLike<U> | U,
  ): PromiseExtended<U> {
    return this.transaction(
      mode,
      this.creditCards,
      this.rebates,
      this.rebateIndexes,
      this.metadata,
      scope,
    )
  }
}

export const coreDb = new CoreDb()

export async function resetTable<T>(table: Table<T>, records: T[]): Promise<void> {
  await table.clear()
  if (records.length > 0) {
    await table.bulkPut(records)
  }
}

interface JoinConfig<T, S> {
  target: Table<T> // The target table to join with
  getKey: (source: S) => string // Function to extract the key from the source record
  targetKey?: string // Optional key field for the target table (defaults to 'id')
}

/**
 * Joins multiple target Dexie tables to pre-fetched source records using custom join logic
 * @param sourceRecords - Pre-fetched records from the source table containing relationship mappings
 * @param targetConfigs - Array of configurations for each target table to join
 * @param joinFn - Function to combine the source and target records into the desired result
 * @returns Promise of joined results based on the return type of joinFn
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function joinTables<T extends any[], S, R>(
  sourceRecords: S[],
  targetConfigs: JoinConfig<T[number], S>[],
  joinFn: (targets: { [K in keyof T]: T[K] }, source: S) => R,
): Promise<R[]> {
  if (sourceRecords.length === 0) {
    return []
  }

  // Extract keys for each target table from source records
  const keyPromises = targetConfigs.map((config) =>
    sourceRecords.map((source) => config.getKey(source)),
  )

  // Fetch records from all target tables in parallel
  const targetRecordPromises = targetConfigs.map((config, i) =>
    config.target
      .where(config.targetKey || 'id')
      .anyOf(keyPromises[i])
      .toArray(),
  )

  const targetRecords = await Promise.all(targetRecordPromises)

  // Create lookup maps for each target table using the specified key field (defaults to 'id')
  const targetMaps = targetRecords.map((records, i) => {
    const keyField = targetConfigs[i].targetKey || 'id'
    return new Map(records.map((record) => [record[keyField], record]))
  })

  // Combine source and target records using the provided join function
  return sourceRecords.map((source) => {
    const targetRecordsForSource = targetConfigs.map((config, i) => {
      const key = config.getKey(source)
      return targetMaps[i].get(key)
    }) as { [K in keyof T]: T[K] }

    return joinFn(targetRecordsForSource, source)
  })
}
