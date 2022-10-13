const ajsonQuery = {"query": [
  {
      "code": "Vuosi",
      "selection": {
          "filter": "item",
          "values": [
              "2000",
              "2001",
              "2002",
              "2003",
              "2004",
              "2005",
              "2006",
              "2007",
              "2008",
              "2009",
              "2010",
              "2011",
              "2012",
              "2013",
              "2014",
              "2015",
              "2016",
              "2017",
              "2018",
              "2019",
              "2020",
              "2021"
          ]
      }
  },
  {
      "code": "Alue",
      "selection": {
          "filter": "item",
          "values": [
              "SSS"
          ]
      }
  },
  {
      "code": "Tiedot",
      "selection": {
          "filter": "item",
          "values": [
              "vaesto"
          ]
      }
  }
],
"response": {
  "format": "json-stat2"
}
}


const fetchData = async() => {
  const url = "https://statfin.stat.fi/PxWeb/api/v1/en/StatFin/synt/statfin_synt_pxt_12dy.px"

  const res = await fetch(url, {
    method: "POST",
    headers: {"content-type": "application/json"},
    body: JSON.stringify(ajsonQuery)
  })
  if(!res.ok){
    return
  }
  const data = await res.json()
  return data

}

const buildChart1 = async () => {
  const data = await fetchData()




  const alue = Object.values(data.dimension.Alue.category.label);
  const vuodet = Object.values(data.dimension.Vuosi.category.label);
  const tiedot = (data.value);

  //console.log(alue)
  //console.log(vuodet)
  //console.log(tiedot)

  /*tiedot.forEach((tieto, index) =>{

    tiedot[index] = {
      name: alue,
      values: tiedot[index]
  }


  })*/



   dataset =[{
      name: alue,
      values: tiedot}]
  

  const chartingData = {
    labels: vuodet,
    datasets: dataset

  
}


const chart = new frappe.Chart("#chart", {
  title: alue,
  data: chartingData,
  type: "line",
  height: 400,
  colors: ['#f54b4b'],
  lineOptions: {
    hideDots: 1,
    regionFill: 0
}

})

}

buildChart1()