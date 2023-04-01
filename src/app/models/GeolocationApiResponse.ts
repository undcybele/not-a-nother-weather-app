export interface Feature {
  id: string,
  type: string,
  relevance: string,
  text: string,
  place_name: string,
  center: Array<number>,
}

export interface GeolocationApiResponse {
  type: string,
  query: Array<string>,
  features: Array<Feature>
}
