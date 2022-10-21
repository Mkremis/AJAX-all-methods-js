// ******************************AJAX CON XMLHttpRequest************************************************
(() => {
  // paso 1: crear instancia del objeto XMLHttpRequest
  const xhr = new XMLHttpRequest(),
    $xhr = document.getElementById("xml"),
    $fragment = document.createDocumentFragment();
  $output1 = document.getElementById("status-xml");
  let message;

  // paso 2: asignar eventos a la instancia del objeto XMLHttpRequest
  xhr.addEventListener("readystatechange", (e) => {
    if (xhr.readyState !== 4) return;
    if (xhr.status >= 200 && xhr.status < 300) {
      message = xhr.statusText || "petición exitosa";
      $output1.innerHTML = `Estado de la petición: <mark>Status ${xhr.status} - ${message}</mark>`;
      // console.log(xhr.responseText);
      let json = JSON.parse(xhr.responseText);
      // console.log(json);
      json.forEach((element) => {
        const li = document.createElement("li");
        li.innerHTML = Object.entries(element);
        $fragment.appendChild(li);
      });
      $xhr.appendChild($fragment);
    } else {
      message = xhr.statusText || "ocurrió un error";
      $output.innerHTML = `Estado de la petición: <mark>Status ${xhr.status} - ${message}</mark>`;
    }
    console.log("esta linea se ejecutara siempre");
  });
  // paso 3: instruccion que abrira la peticion
  xhr.open("GET", "https://jsonplaceholder.typicode.com/users");
  // paso 4: enviar la peticion
  xhr.send();
})();

// ******************************AJAX CON API FETCH************************************************
(() => {
  const $fetch = document.getElementById("fetch"),
    $fragment = document.createDocumentFragment();
  $output2 = document.getElementById("status-fetch");

  fetch("https://jsonplaceholder.typicode.com/users")
    .then((res) => (res.ok ? res.json() : Promise.reject(res)))
    .then((json) => {
      $output2.innerHTML = `Estado de la petición: <mark> OK </mark>`;
      json.forEach((element) => {
        const li = document.createElement("li");
        li.innerHTML = Object.entries(element);
        $fragment.appendChild(li);
      });
      $fetch.appendChild($fragment);
    })
    .catch(
      (err) =>
        ($output2.innerHTML = `Estado de la petición: <mark> ${err.status} - ${err.statusText}</mark>`)
    )
    .finally(() => console.log("esta linea se ejecutara siempre"));
})();

// ******************************AJAX CON API FETCH con Async Function************************************************
(() => {
  const $fetch2 = document.getElementById("fetch-async"),
    $fragment = document.createDocumentFragment();
  $output3 = document.getElementById("status-async");

  async function getData() {
    try {
      let res = await fetch("https://jsonplaceholder.typicode.com/users"),
        json = await res.json();
      if (!res.ok) throw { status: res.status, statusText: res.statusText };
      $output3.innerHTML = `Estado de la petición: <mark>Status: ${res.status} - ${res.statusText} </mark>`;
      json.forEach((element) => {
        const li = document.createElement("li");
        li.innerHTML = Object.entries(element);
        $fragment.appendChild(li);
      });
      $fetch2.appendChild($fragment);
    } catch (err) {
      $output3.innerHTML = `Estado de la petición: <mark> ${err.status} - ${err.statusText}</mark>`;
    } finally {
      console.log("esta linea se ejecutara siempre");
    }
  }
  getData();
})();
