import WeatherClient from '../WeatherClient.js';
import { fahrenheitToCelsius, mphToKph, convertWeatherUnits } from '../utils/unitConversion.js';

const API_KEY = 'FYK72UUCBXUGU782A7SBZ7CGK';

async function testUnitConversion() {
  console.log('🌤️ Weather Client - Unit Conversion Demo');
  console.log('=========================================');
  
  const weather = new WeatherClient(API_KEY);
  
  try {
    // Get weather in Fahrenheit (API default)
    console.log('\n📡 Fetching weather for London...');
    const weatherData = await weather.getWeather('London');
    
    console.log('\n🌡️ ORIGINAL (Fahrenheit):');
    console.log(`  Temp: ${weatherData.current.temp}°F`);
    console.log(`  Feels like: ${weatherData.current.feelsLike}°F`);
    console.log(`  Wind: ${weatherData.current.windSpeed} mph`);
    console.log(`  High today: ${weatherData.forecast[0].maxTemp}°F`);
    
    // Convert using individual functions
    console.log('\n🔄 CONVERTED (using individual functions):');
    const tempC = fahrenheitToCelsius(weatherData.current.temp);
    const windKph = mphToKph(weatherData.current.windSpeed);
    console.log(`  Temp: ${tempC}°C`);
    console.log(`  Wind: ${windKph} kph`);
    
    // Convert entire object
    console.log('\n🔄 CONVERTED (using helper function):');
    const metricData = convertWeatherUnits(weatherData, 'metric');
    console.log('  Full metric object:', metricData);
    console.log(`  Temp: ${metricData.current.temp}°C`);
    console.log(`  Wind: ${metricData.current.windSpeed} kph`);
    console.log(`  Units:`, metricData.units);
    
  } catch (error) {
    console.error('Demo failed:', error.message);
  }
}

testUnitConversion();