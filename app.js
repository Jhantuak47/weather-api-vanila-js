("use strict");
/**
 * Software Developer test.
 *
 * Doing research and making API calls are an important part of what we do at FreightWise.  This test will
 * demonstrate your abilities to:
 *
 * - Make an API call
 * - Research an API
 * - Do basic DOM manipulation
 * - Parse data
 * - Handle errors
 * - Be creative
 *
 * Feel free to ask any questions you may have.  Use a lot of comments, and explain why you are doing things.
 * Don't spend more than 1-2 hours on it - we aren't expecting a finished product, but it should work and look
 * nice.  Feel free to use any third party libraries, and if you do so, explain why you used them instead of
 * built in browser APIs.
 *
 * Instructions:
 * - Use the axios (https://github.com/axios/axios) request library to make an API call to the OpenWeatherMap
 *   API for Current Weather Data using this API key:  25e989bd41e3e24ce13173d8126e0fd6
 *   We've already imported this library to get you started.
 * - Use either async/await or Promises.
 * - Get the weather for Brentwood, TN, and write it to the DOM using the `setResults` method below.  Be
 *   creative and make it look nice.
 * - Handle errors and use the `setError` method below to display the error.  Also make it look nice.
 * - If you find any mistakes in the test, fix them, and leave a comment about what you fixed and why.
 * - Make sure your code is readable and maintainable.
 * - Use plenty of descriptive comments.
 * - Make sure your code runs in the latest version of Google Chrome and Firefox (ES6 is allowed).
 * - Make your code live (GitHub with GitHub pages works nice).
 * - Send a link to your finished test to dev-team-jobs@freightwisellc.com.
 *
 * Feel free to add your own twist to it (completely optional).  Here are a few ideas:
 * - Sign up for NewsAPI.org and get the Top Headlines and show them along with the weather.
 * - Use the browser location API to get the user's current location, and show that location's weather.
 * - Show a satellite map of the weather in Brentwood.
 * - Request a user's phone number and send them an SMS with the weather.
 */

/**
 * Solution
 *
 * Chossen to separate the js file from the embaded html. Because it's improve the readability and help in error validation.
 *
 * Choose to use Tailwind css as external library/framework.
 * Tailwind provide very elegant way of writing css.
 * Tailwind is easy and free to use, Highly customizable and good for larger html file.
 *
 */
class Test {
  constructor() {
    /**
     * changed the class name from test-results to test-result, get selected by id.
     *
     * Presumed that each location can show one weather report at one time.
     */
    this.testResults = document.getElementById("test-result");

    /**
     * Fetched the location using geocode api for Brentwood, TN
     *
     * http://api.openweathermap.org/geo/1.0/direct?q=Brentwood,US&limit=5&appid=a7280a7b684397d684e685653bfdaf10
     */
    this.locations = [
      {
        name: "Brentwood",
        lat: 37.9317766,
        lon: -121.696026,
        country: "US",
        state: "California",
      },
      {
        name: "Brentwood",
        lat: 38.6175522,
        lon: -90.3492829,
        country: "US",
        state: "Missouri",
      },
      {
        name: "Brentwood",
        lat: 34.0521403,
        lon: -118.4740699,
        country: "US",
        state: "California",
      },
      {
        name: "Brentwood",
        lat: 36.0325687,
        lon: -86.7825235,
        country: "US",
        state: "Tennessee",
      },
      {
        name: "Brentwood",
        lat: 40.7812093,
        lon: -73.2462273,
        country: "US",
        state: "New York",
      },
    ];

    this.baseUrl = "https://api.openweathermap.org/data/2.5/weather";
  }

  async run() {
    this.showlocations();
  }

  /**
   *
   * @param {string} message
   *
   * set the error if any to the dom element.
   */
  setError(message, response) {
    // this.testResults.innerHTML = (results || "").toString();
    // remove all previous elements attached
    this.testResults.innerHTML = "";
    // creted elements to show reslut card.
    let h = document.createElement("h");
    h.innerHTML = message;
    h.className = "text-xl text-red-500 text-center self-center shadow-lg";

    this.testResults.className = "flex flex-col shadow-lg p-4";
    this.testResults.appendChild(h);

    if (response) {
      let ul = document.createElement("ul");
      let errCode = document.createElement("li");
      let errMsg = document.createElement("li");

      errCode.innerHTML = `Status: ${response.data.cod}`;
      errMsg.innerHTML = `Message: ${response.data.message}`;

      errMsg.className = "border border-red-600 text-red-400";
      errCode.className = "text-red-400";

      ul.appendChild(errCode);
      ul.appendChild(errMsg);

      ul.className = "flex flex-col list-disc p-4";
      this.testResults.appendChild(ul);
    }
  }

  /**
   *
   * @param {array} results
   *
   * recieves result set of weather reports
   *
   * @return undefined
   *
   *
   */
  setResults(results) {
    // resetting the reslut content to null
    this.testResults.innerHTML = "";

    // creted elements to show reslut card.
    let weather = results.weather[0];
    let h = document.createElement("h");
    h.innerHTML = results.name;
    h.className = "text-2xl text-center self-center";

    let description = document.createElement("span");
    description.innerText = "Weather :";
    description.className = "font-bold text-base";

    let report = document.createElement("span");
    report.innerText = weather.description;
    report.className = "font-bold text-base text-gray-400";

    let p = document.createElement("p");
    p.className = "flex gap-2";
    p.appendChild(description);
    p.appendChild(report);

    let info = document.createElement("span");
    info.innerHTML = `Wind Speed: ${results.wind.speed} <br> Visibility: ${results.visibility} <br> Temp: ${results.main.temp}`;
    info.className = "text-xs text-gray-300 font-bold";

    this.testResults.className = "flex shadow-lg flex-col p-6 rounded-xl gap-2";
    this.testResults.appendChild(h);
    this.testResults.appendChild(p);
    this.testResults.appendChild(info);
  }

  fetchWeatherReport(e, location) {
    if (!location) {
      //show error message, not found.
      this.setError("Location doesnot Exists");
      return;
    }
    const url = `${this.baseUrl}?lat=${location.lat}&lon=${location.lon}&appid=a7280a7b684397d684e685653bfdaf10`;
    axios
      .get(url)
      .then((res) => {
        if (res.status === 200) {
          this.setResults(res.data);
        }
      })
      .catch((err) => {
        console.log(err);
        this.setError(err.message, err.response);
      });
  }

  /**
   * method us to get the location based on the user input if applicable.
   */
  showlocations() {
    // can be used to fetch longitude and latitude information based on county, state and city.

    // in the current scenario as suggested to get the weather report for Brentwood, TN. Therefore used it as static data.

    let ul = document.createElement("ul");
    ul.className = "list-none flex gap-2 mx-auto";

    this.locations.map((location, index) => {
      let li = document.createElement("li");
      li.setAttribute("key", index);

      let locationBtn = document.createElement("button");

      locationBtn.type = "button";
      locationBtn.innerText = `${location.name}, ${location.state}, ${location.country}`;
      locationBtn.className = `bg-green-700 rounded-lg px-4 py-2 text-white hover:bg-green-600`;

      locationBtn.onclick = (e) => this.fetchWeatherReport(e, location);
      li.appendChild(locationBtn);
      ul.appendChild(li);
    });

    const elem = document.getElementById("locations");
    elem.appendChild(ul);
  }
}

/**
 * Creates a button for kicking off the test and adds it to the DOM.
 *
 * @param {HTMLElement} context  the parent element to add the button to
 * @param {Test}        test     the test to be executed
 * @returns {HTMLElement} the button added to the test
 */
function addButtonForTest(context, test) {
  let testButton = document.createElement("button");

  testButton.type = "button";
  testButton.innerText = "Get the Nashville Weather";
  testButton.onclick = () => test.run();

  context.appendChild(testButton);

  return testButton;
}

// Create the Test and add a button to the UI for running the test
const test = new Test();
const buttonContainer = document.getElementsByClassName("button-container")[0];

addButtonForTest(buttonContainer, test);
