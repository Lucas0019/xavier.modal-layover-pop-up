/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios'

export type RequestParams = {
  url: string
  body?: any
  headers?: any
}
export default async function httpPostClient({
  url,
  body,
  headers,
}: RequestParams): Promise<any> {
  const res = await axios.post(url, body, headers)

  return res
}
