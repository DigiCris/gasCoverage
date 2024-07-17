
function createBarGraphElement(percentage, legendText, tooltipText) {
    // Crear el elemento HTML
    const barElement = document.createElement('div');
    barElement.classList.add('barra');
  
    const subBarElement = document.createElement('div');
    subBarElement.classList.add('sub_barra', 'b1');
    subBarElement.style.height = percentage;
  
    const tagGElement = document.createElement('div');
    tagGElement.classList.add('tag_g');
    tagGElement.textContent = `${percentage}`;
  
    const tagLegendElement = document.createElement('div');
    tagLegendElement.classList.add('tag_leyenda');
    tagLegendElement.textContent = legendText;
  
    subBarElement.appendChild(tagGElement);
    subBarElement.appendChild(tagLegendElement);
    barElement.appendChild(subBarElement);
  
    // Crear el elemento de tooltip
    const tooltipElement = document.createElement('div');
    tooltipElement.classList.add('tooltip');
  
    const tooltipTextElement = document.createElement('p');
    tooltipTextElement.innerHTML = tooltipText;
  
    tooltipElement.appendChild(tooltipTextElement);
    barElement.appendChild(tooltipElement);
  
    // Obtener el primer elemento con la clase 'graf_board'
    const grafBoardElement = document.querySelector('.graf_board');
  
    // Agregar el elemento al comienzo del primer elemento con la clase 'graf_board'
    grafBoardElement.insertBefore(barElement, grafBoardElement.firstChild);
  }
  
  function getJson() {
      fetch('http://localhost/gasTracker/gasestimates.json', {
          mode: 'cors'
      })
      .then(response => response.json())
      .then(data =>{ 
          //data["External"].json()
          //console.log(data["External"]["DEFAULT_ADMIN_ROLE()"]);
          graficar(data["External"])
          return data["External"];
      })
      .catch(error => console.error(error));
  }
  
  function graficar(data) {
      let numbersObject = {};
      let infiniteArray = [];
      var maxNumber=0;
      for (let key in data) {
      if (data[key] !== "infinite") {
          numbersObject[key] = parseFloat(data[key]);
          if(maxNumber<numbersObject[key]) {
              maxNumber = numbersObject[key];
          }
      } else {
          infiniteArray.push(key);
      }
      }
      
      // Ordenar el objeto numbersObject de menor a mayor
      let sortedNumbersObject = Object.keys(numbersObject)
      .sort((a, b) => numbersObject[a] - numbersObject[b])
      .reduce((obj, key) => {
          obj[key] = numbersObject[key];
          return obj;
      }, {});
  
      //console.log("Numbers Object (sorted):");
      for (let key in sortedNumbersObject) {
          ////console.log(`${key}: ${sortedNumbersObject[key]}`);
          percent = parseInt(100*parseFloat(sortedNumbersObject[key])/maxNumber);
          percent = percent + "%"
          console.log(percent)
          createBarGraphElement(percent, key, sortedNumbersObject[key])
      }
  
      //console.log("\nInfinite Values:");
      for (let key of infiniteArray) {
        //console.log(`${key}: infinite`);
        addParagraph(key)
      }
  }
  
  getJson();



  function addParagraph(func) {
    const paragraph = document.createElement('p');
    paragraph.textContent = func;
  
    const lienzo2 = document.getElementById('lienzo2');
    lienzo2.appendChild(paragraph);
  }

  function downloadAsPDF() {
    const doc = new jsPDF();
    const content = document.getElementById('content').innerHTML;
    doc.setFontSize(12);
    doc.text(content, 10, 10);
    doc.save('mi-pagina.pdf');
  }