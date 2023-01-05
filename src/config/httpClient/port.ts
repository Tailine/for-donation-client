export interface HttpClientPort {
  post(endpoint: string, body: any): Promise<any>
  get(endpoint: string): Promise<any>
}
