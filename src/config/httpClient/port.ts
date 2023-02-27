export interface HttpClientPort {
  post(endpoint: string, body: any, options?: RequestInit): Promise<any>
  get(endpoint: string): Promise<any>
}
