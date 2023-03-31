interface Context {
  id: string,
  short_code: string,
  wikidata: string,
  mapbox_id: string,
  text: string,
}

export interface Feature {
  id: string,
  type: string,
  relevance: string,
  text: string,
  place_name: string,
  center: Array<number>,
  context: Array<Context>,
}

export interface GeolocationApiResponse {
  type: string,
  query: Array<string>,
  features: Array<Feature>
}
