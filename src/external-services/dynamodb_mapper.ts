import { DataMapper } from '@aws/dynamodb-data-mapper'
import DynamoDB from 'aws-sdk/clients/dynamodb'

let client

client = new DynamoDB({
  region: process.env.REACT_APP_REGION || 'ap-southeast-1',
  //   credentials: {
  //     accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID as string,
  //     secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY as string,
  //   },
})

const mapper = new DataMapper({ client })
export default mapper
