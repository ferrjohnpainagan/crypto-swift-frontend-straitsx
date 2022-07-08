import {
  attribute,
  hashKey,
  rangeKey,
  table,
} from '@aws/dynamodb-data-mapper-annotations'

@table(`${process.env.NODE_ENV}_customers`)
class Customer {
  @hashKey()
  customerProfileId: string

  @rangeKey()
  bankAccountNumber: string

  @attribute()
  customerName: string

  @attribute()
  registrationType: string

  @attribute()
  registrationId: string

  @attribute()
  countryOfResidence: string // used for sending message to channel using http

  @attribute()
  dateOfBirth: string

  @attribute()
  nationality: string

  @attribute()
  bank: string

  @attribute()
  currency: string

  @attribute()
  balance: number

  @attribute()
  createdAt: Date

  @attribute()
  updatedAt: Date
}

export default Customer
