<template>
  <div class="container mt-4">
    <h1>Weather Check</h1>

    <!-- City search form -->
    <div class="row mb-4">
      <div class="col-md-6">
        <div class="input-group">
          <input
            type="text"
            class="form-control"
            v-model="city"
            placeholder="Enter city name"
            @keyup.enter="searchByCity"
          >
          <button
            class="btn btn-primary"
            type="button"
            @click="searchByCity"
          >
            Search
          </button>
        </div>
      </div>
    </div>

    <!-- Weather data display -->
    <main>
      <!-- If there are weather data returned, then display the information -->
      <div v-if="weatherData" class="card">
        <div class="card-body">
          <h2>
            {{ weatherData.name }}, {{ weatherData.sys.country }}
          </h2>
          <div class="d-flex align-items-center mb-3">
            <!-- Weather icon -->
            <img :src="iconUrl" alt="Weather Icon" class="me-3" />
            <p class="h3 mb-0">{{ temperature }} °C</p>
          </div>
          <!-- weather[0] means the current weather, the way we need to obtain data depends on how the API JSON data looks -->
          <span class="badge bg-info fs-6">{{ weatherData.weather[0].description }}</span>
        </div>
      </div>

      <!-- Loading state -->
      <div v-if="loading" class="text-center">
        <div class="spinner-border" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
        <p class="mt-2">Fetching weather data...</p>
      </div>

      <!-- Error message -->
      <div v-if="error" class="alert alert-danger" role="alert">
        {{ error }}
      </div>
    </main>
  </div>
</template>

<script>
import axios from "axios";
const apikey = "28d48eff50dd1839cb58607eee276fd3";

export default {
  name: "WeatherView",
  data() {
    return {
      city: "",
      weatherData: null,
      hourlyForecast: [],
      dailyForecast: [],
      loading: false,
      error: null
    };
  },
  // computed is a property that is used to define a property that is dependent on other data properties
  // If we using a more easy to understand words to understand the concept:
  // the derived value such as temperature automatically update when the relevant value change
  computed: {
    // There are multiple way to obtain the data in Celsius format
    // Calculation by yourself like below after data is retrieved or via API parameters
    // Example of adding additional units requirement, if you choose this, remember to change section 3.1
    // https://api.openweathermap.org/data/2.5/weather?lat=XXX&lon=-XXX.15&appid={API key}&units=metric
    temperature() {
      return this.weatherData
        ? Math.floor(this.weatherData.main.temp - 273)
        : null;
    },
    // Get the current weather icon using the API link
    iconUrl() {
      return this.weatherData
        ? `http://api.openweathermap.org/img/w/${this.weatherData.weather[0].icon}.png`
        : null;
    },
  },
  // There are two steps involved in this,
  // step 1: identify current location
  // step 2: after identify, get the weather data straight based on the current location
  mounted() {
    this.fetchCurrentLocationWeather();
  },
  methods: {
    // Async in a easy to understand way means the method will run in backend thread,
    // And it won't occupy the main thread, so the user experience is still smooth
    async fetchCurrentLocationWeather() {
      // The navigator.geolocation object is part of the Web API provided by modern web browsers
      // Please note this function is not belongs to Vue or openweather
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(async (position) => {
          const { latitude, longitude } = position.coords;
          // API link to obtain the current weather based on the current location browser identified
          const url = `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apikey}`;
          // await means wait for the fetchWeatherData method to complete before proceeding
          await this.fetchWeatherData(url);
        });
      }
    },

    // Search weather by city
    async searchByCity() {
      if (!this.city.trim()) {
        this.error = "Please enter city name";
        return;
      }

      this.loading = true;
      this.error = null;

      // Try with Australian country code first, then fallback to general search
      try {
        const urlWithCountry = `http://api.openweathermap.org/data/2.5/weather?q=${this.city},AU&appid=${apikey}`;
        await this.fetchWeatherData(urlWithCountry);
      } catch {
        // If search with country code fails, try without country code
        const urlGeneral = `http://api.openweathermap.org/data/2.5/weather?q=${this.city}&appid=${apikey}`;
        await this.fetchWeatherData(urlGeneral);
      }
    },

    async fetchWeatherData(url) {
      try {
        const response = await axios.get(url);
        // Returned data from API is stored as JSON file in weatherData
        this.weatherData = response.data;
        this.loading = false;
      } catch (error) {
        console.error("Error fetching weather data:", error);
        this.error = "Failed to fetch weather data, please check city name or network connection";
        this.loading = false;
      }
    }
  }
};
</script>

<style scoped>
.card {
  max-width: 500px;
  margin: 0 auto;
}

.input-group {
  max-width: 400px;
}

.spinner-border {
  width: 3rem;
  height: 3rem;
}
</style>
