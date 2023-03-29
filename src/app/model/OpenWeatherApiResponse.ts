interface WeatherDescription {
  id: number,
  main: string,
  description: string,
  icon: string
}

interface MainWeatherData {
  temp: number,
  feels_like: number,
  pressure: number,
  humidity: number,
  temp_min: number,
  temp_max: number
}

interface WindWeatherData {
  speed: number,
  deg: number
}

interface CloudsWeatherData {
  all: number
}

interface HourlyWeatherData {
  dt: number,
  main: MainWeatherData,
  wind: WindWeatherData,
  clouds: CloudsWeatherData,
  weather: Array<WeatherDescription>
}

export interface OpenWeatherApiResponse {
  message: string,
  cod: string,
  city_id: number,
  calctime: number,
  cnt: number,
  list: Array<HourlyWeatherData>,
}
