
// baseUrl =
key = "5989284c43c7bd3f647ed86b95be8673"
 
var express = require("express");

const axios = require('axios');
var app = express();
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
 next();
});

url =  "https://api.themoviedb.org/3/movie/now_playing?api_key=" + key + "&language=en-US&page=1";
app.get("/", function (req, res) {
  axios.get(url).then((response) => {
    res.json(response.data.results.slice(0,5));
    
  }).catch((error) => {
    console.log(error);
  });
});

var server = app.listen(8080, function () {
  console.log("Backend Application listening at http://localhost:8080");
});

//4.1.1
app.get("/multi", function (req, res) {
  url = "https://api.themoviedb.org/3/search/multi?api_key=5989284c43c7bd3f647ed86b95be8673&language=en-US&query=";
  query = req.query.query
  axios.get(url+query).then((response) => {
// 0 = pic, 1 = id, 2 = media, 3 = title
response.data.results = response.data.results.slice(0,12)
    let result = [];
    response.data.results.forEach((element) => {
      let tempJson = {};
      if (element['backdrop_path']!=null) {
        tempJson.backdrop_path = 'https://image.tmdb.org/t/p/w500' + element['backdrop_path'];
      tempJson.id = element['id'];
      tempJson.media_type = element['media_type'];
      if (element['media_type'] == "movie")  tempJson.title = element['title'];
      else tempJson.title = element['name'];
      result.push(tempJson);
      }
      
    });
    res.json(result.slice(0,7));

  }).catch((error) => {
    console.log(error);
  });
});

//4.1.2
app.get("/trendingmovies", function (req, res) {
  url = "https://api.themoviedb.org/3/trending/movie/day?api_key=" +key
  axios.get(url).then((response) => {
    res.json(response.data.results);
  }).catch((error) => {
    console.log(error);
  });
});

//4.1.3
app.get("/topmovies", function (req, res) {
  url = "https://api.themoviedb.org/3/movie/top_rated?api_key=" + key + "&language=en-US&page=1"
  axios.get(url).then((response) => {
    // console.log(response)
    res.json(response.data.results);
  }).catch((error) => {
    console.log(error);
  });
});

//4.1.4
app.get("/currentmovies", function (req, res) {
  url = "https://api.themoviedb.org/3/movie/now_playing?api_key=" + key + "&language=en-US&page=1"
  axios.get(url).then((response) => {
    // console.log(response)
    let result = [];
    response.data.results.forEach((element) => {
      let tempJson = {};
      tempJson.id = element['id'];
      tempJson.title = element['title'];
      tempJson.backdrop_path = element['backdrop_path'];
      tempJson.media_type = element['media_type'];
      result.push(tempJson);
    });
   // console.log(result)
    res.json(result.slice(0,5));
  }).catch((error) => {
    console.log(error);
  });
});

//4.1.5
app.get("/popularmovies", function (req, res) {
  url = "https://api.themoviedb.org/3/movie/popular?api_key=" + key + "&language=en-US&page=1"
  axios.get(url).then((response) => {
    // console.log(response)
    res.json(response.data.results);
  }).catch((error) => {
    console.log(error);
  });
});

//4.1.6
app.get("/recommendedmovies", function (req, res) {
  https://api.themoviedb.org/3/movie/464052/recommendations?api_key=97588ddc4a26e3091152aa0c9a40de22&language=en-US&page=1
  url = "https://api.themoviedb.org/3/movie/"+ req.query.id + "/recommendations?api_key=" + key + "&language=en-US&page=1"
  axios.get(url).then((response) => {
    // console.log(response)
    res.json(response.data.results);
  }).catch((error) => {
    console.log(error);
  });
});

//4.1.7
app.get("/similarmovies", function (req, res) {
  url = "https://api.themoviedb.org/3/movie/"+ req.query.id + "/similar?api_key=" + key + "&language=en-US&page=1"
  axios.get(url).then((response) => {
    // console.log(response)
    res.json(response.data.results);
  }).catch((error) => {
    console.log(error);
  });
});

//4.1.8
app.get("/movievideo", function (req, res) {
  https://api.themoviedb.org/3/movie/464052/videos?api_key=97588ddc4a26e3091152aa0c9a40de22&language=en-US&page=1
  url = "https://api.themoviedb.org/3/movie/"+ req.query.id + "/videos?api_key=" + key + "&language=en-US&page=1"
  axios.get(url).then((response) => {
    // console.log(response)
    res.json(response.data.results);
  }).catch((error) => {
    console.log(error);
  });
});

//4.1.9
app.get("/moviedetails", function (req, res) {
  https://api.themoviedb.org/3/movie/464052?api_key=97588ddc4a26e3091152aa0c9a40de22&language=en-US&page=1
  url = "https://api.themoviedb.org/3/movie/"+ req.query.id + "?api_key=" + key + "&language=en-US&page=1"
  axios.get(url).then((response) => {
    res.json(response.data);
  }).catch((error) => {
    console.log(error);
  });
});

//4.1.10
app.get("/moviereviews", function (req, res) {
  https://api.themoviedb.org/3/movie/464052/reviews?api_key=97588ddc4a26e3091152aa0c9a40de22&language=en-US&page=1
  url = "https://api.themoviedb.org/3/movie/"+ req.query.id  + "/reviews?api_key=" + key + "&language=en-US&page=1"
  axios.get(url).then((response) => {
    // console.log(response)
    res.json(response.data.results.slice(0,10));
  }).catch((error) => {
    console.log(error);
  });
});

//4.1.11
app.get("/moviecast", function (req, res) {
  https://api.themoviedb.org/3/movie/464052/credits?api_key=97588ddc4a26e3091152aa0c9a40de22&language=en-US&page=1
  url = "https://api.themoviedb.org/3/movie/"+ req.query.id + "/credits?api_key=" + key + "&language=en-US&page=1"
  axios.get(url).then((response) => {
    let result = [];
    response.data.cast.forEach((element) => {
      let tempJson = {};
      tempJson.id = element['id'];
      tempJson.name = element['name'];
      tempJson.character = element['character'];
      tempJson.profile_path = element['profile_path'];
      if (tempJson.profile_path!= null) result.push(tempJson);
    });
  res.json(result);
  }).catch((error) => {
    console.log(error);
  });
});

//4.1.12
app.get("/trendingshows", function (req, res) {
             https://api.themoviedb.org/3/trending/tv/day?api_key=97588ddc4a26e3091152aa0c9a40de22
  url = "https://api.themoviedb.org/3/trending/tv/day?api_key=" + key
  axios.get(url).then((response) => {
    // console.log(response)
    res.json(response.data.results);
  }).catch((error) => {
    console.log(error);
  });
});


//4.1.13
app.get("/topshows", function (req, res) {
  https://api.themoviedb.org/3/tv/top_rated?api_key=97588ddc4a26e3091152aa0c9a40de22&language=en-US&page=1
url = "https://api.themoviedb.org/3/tv/top_rated?api_key=" + key + "&language=en-US&page=1"
axios.get(url).then((response) => {
// console.log(response)
res.json(response.data.results);
}).catch((error) => {
console.log(error);
});
});

//4.1.14
app.get("/popularshows", function (req, res) {
           https://api.themoviedb.org/3/tv/popular?api_key=97588ddc4a26e3091152aa0c9a40de22&language=en-US&page=1
url = "https://api.themoviedb.org/3/tv/popular?api_key=" + key + "&language=en-US&page=1"
axios.get(url).then((response) => {
// console.log(response)
res.json(response.data.results);
}).catch((error) => {
console.log(error);
});
});

//4.1.15
app.get("/recommendedshows", function (req, res) {
           https://api.themoviedb.org/3/tv/85271/recommendations?api_key=97588ddc4a26e3091152aa0c9a40de22&language=en-US&page=1
url = "https://api.themoviedb.org/3/tv/"+req.query.id+"/recommendations?api_key=" + key + "&language=en-US&page=1"
axios.get(url).then((response) => {
// console.log(response)
res.json(response.data.results);
}).catch((error) => {
console.log(error);
});
});

//4.1.16
app.get("/similarshows", function (req, res) {
           https://api.themoviedb.org/3/tv/85271/similar?api_key=97588ddc4a26e3091152aa0c9a40de22&language=en-US&page=1
url = "https://api.themoviedb.org/3/tv/"+req.query.id+"/similar?api_key=" + key + "&language=en-US&page=1"
axios.get(url).then((response) => {
//console.log(response)
res.json(response.data.results);
}).catch((error) => {
console.log(error);
});
});

//4.1.17
app.get("/tvvideo", function (req, res) {
           https://api.themoviedb.org/3/tv/85271/videos?api_key=97588ddc4a26e3091152aa0c9a40de22&language=en-US&page=1
url = "https://api.themoviedb.org/3/tv/"+req.query.id+"/videos?api_key=" + key + "&language=en-US&page=1"
axios.get(url).then((response) => {
// console.log(response)
res.json(response.data.results);
}).catch((error) => {
console.log(error);
});
});

//4.1.18
app.get("/tvdetails", function (req, res) {
           https://api.themoviedb.org/3/tv/85271?api_key=97588ddc4a26e3091152aa0c9a40de22&language=en-US&page=1
url = "https://api.themoviedb.org/3/tv/"+req.query.id+"?api_key=" + key + "&language=en-US&page=1"
axios.get(url).then((response) => {
 // console.log(response)
res.json(response.data);
}).catch((error) => {
console.log(error);
});
});

//4.1.19 
app.get("/tvreviews", function (req, res) {
           https://api.themoviedb.org/3/tv/464052/reviews?api_key=97588ddc4a26e3091152aa0c9a40de22&language=en-US&page=1
url = "https://api.themoviedb.org/3/tv/"+req.query.id+"/reviews?api_key=" + key + "&language=en-US&page=1"
axios.get(url).then((response) => {
// console.log(response)
res.json(response.data.results);
}).catch((error) => {
console.log(error);
});
});

//4.1.20
app.get("/tvcast", function (req, res) {
url = "https://api.themoviedb.org/3/tv/"+req.query.id+"/credits?api_key=" + key + "&language=en-US&page=1"
axios.get(url).then((response) => {
// console.log(response)
res.json(response.data.cast);
}).catch((error) => {
console.log(error);
});
});

//4.1.21
app.get("/castdetails", function (req, res) {
             https://api.themoviedb.org/3/person/550843?api_key=97588ddc4a26e3091152aa0c9a40de22&language=en-US&page=1
  url = "https://api.themoviedb.org/3/person/"+req.query.id+"?api_key=" + key + "&language=en-US&page=1"
  axios.get(url).then((response) => {
    let result = [];
    response.data.forEach((element) => {
      let tempJson = {};
      tempJson.id = element['id'];
      tempJson.name = element['name'];
      tempJson.character = element['character'];
      tempJson.profile_path = element['profile_path'];
      if (tempJson.profile_path!= null) result.push(tempJson);
    });
  res.json(result);

  res.json(response.data);
  }).catch((error) => {
  console.log(error);
  });
  });

  //4.1.22
app.get("/castexternal", function (req, res) {
           https://api.themoviedb.org/3/person/550843/external_ids?api_key=97588ddc4a26e3091152aa0c9a40de22&language=en-US&page=1
url = "https://api.themoviedb.org/3/person/"+req.query.id+"/external_ids?api_key=" + key + "&language=en-US&page=1"
axios.get(url).then((response) => {
// console.log(response)
res.json(response.data);
}).catch((error) => {
console.log(error);
});
});