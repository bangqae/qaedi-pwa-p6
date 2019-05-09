/*
Copyright 2018 Google Inc.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/
/*jshint esversion: 6*/

const app = (() => {

  function getImageName(country) { //fungsi getImageName dengan parameter nilai input

    // create and return a promise
    country = country.toLowerCase(); //mengubah value input ke lowercase lalu disimpan ke variabel country
    var promiseOfImageName = new Promise(function(resolve, reject) { //membuat dua status, resolve dan reject
      setTimeout(function() { //jalankan fungsi saat waktu berjalan
        if (country === 'spain' || country === 'chile' || country === 'peru') { //jika terdapat nama kota yg sesuai maka diterima
          resolve(country + '.png'); //panggil nama gambar
        } else {
          reject(Error('Didn\'t receive a valid country name!')); //menampilkan pesan error apabila tidak ketemu / ditolak
        }
      }, 1000); //set waktu selama satu detik (seribu milisecond)
    });
    console.log(promiseOfImageName); //tampilkan output pada console
    return promiseOfImageName; //nilai return

  }

  function isSpain(country) { //optional test.html

    // Optional - create and return a promise that resolves if input is "Spain"
    country = country.toLowerCase(); //mengubah value input ke lowercase lalu disimpan ke variabel country
    var promiseOfImageName = new Promise(function(resolve, reject) { //membuat dua status, resolve dan reject
      setTimeout(function() { //jalankan fungsi saat waktu berjalan
        if (country === 'spain') { //jika nilai input adalah spain
          resolve(country + '.png'); //panggil gambar
        } else {
          reject(Error('Didn\'t receive a valid country name!')); //menampilkan pesan error apabila tidak ketemu
        }
      }, 1000); //set waktu selama satu detik (seribu milisecond)
    });
    console.log(promiseOfImageName); //tampilkan output pada console
    return promiseOfImageName; //nilai return

  }

  function flagChain(country) { //fungsi flagChain dengan parameter nilai input country

    // use the promise
    return getImageName(country) //panggil fungsi getImageName dengan parameter country(value input)
    //panggil fungsi lain sesuai kondisi yg terjadi
    .catch(fallbackName) //untuk reject
    .then(fetchFlag) //untuk berhasil(resolve)
    .then(processFlag) //untuk berhasil(resolve)
    .then(appendFlag) //untuk berhasil(resolve)
    .catch(logError); //untuk reject

  }

  function allFlags(promiseList) {

    // use promise.all
    // inisialisasi variabel promises, yg berisi nama2 bendera
    var promises = [
      getImageName('Spain'),
      getImageName('Chile'),
      getImageName('Peru')
    ];

    allFlags(promises).then(function(result) {
      console.log(result);
    });      

  }


  // call the allFlags function


  // use Promise.race
  var promise1 = new Promise(function(resolve, reject) {
    setTimeout(resolve, 500, 'one');
  });
  
  var promise2 = new Promise(function(resolve, reject) {
    setTimeout(reject, 100, 'two');
  });
  
  Promise.race([promise1, promise2])
    .then(logSuccess)
    .catch(logError);

  /* Helper functions */

  function logSuccess(result) {
    console.log('Success!:\n' + result);
  }

  function logError(err) {
    console.log('Oh no!:\n' + err);
  }

  function returnFalse() {
    return false;
  }

  function fetchFlag(imageName) {
    return fetch('flags/' + imageName); // fetch returns a promise //tampilkan gambar
  }

  function processFlag(flagResponse) {
    if (!flagResponse.ok) {
      throw Error('Bad response for flag request!'); // This will implicitly reject
    }
    return flagResponse.blob(); // blob() returns a promise //konversi gambar ke dalam format blob
  }

  function appendFlag(flagBlob) {
    const flagImage = document.createElement('img');
    const flagDataURL = URL.createObjectURL(flagBlob);
    flagImage.src = flagDataURL;
    const imgContainer = document.getElementById('img-container');
    imgContainer.appendChild(flagImage);
    imgContainer.style.visibility = 'visible';
  }

  function fallbackName() {
    return 'chile.png';
  }

  // Don't worry if you don't understand this, it's not part of Promises.
  // We are using the JavaScript Module Pattern to enable unit testing of
  // our functions.
  return {
    getImageName: (getImageName),
    flagChain: (flagChain),
    isSpain: (isSpain),
    fetchFlag: (fetchFlag),
    processFlag: (processFlag),
    appendFlag: (appendFlag),
    allFlags: (allFlags)
  };

})();
