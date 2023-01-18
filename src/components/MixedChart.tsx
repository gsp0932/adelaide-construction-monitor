import * as React from 'react';
import ReactApexChart from 'react-apexcharts';

class MixedChart extends React.Component <any, any> {
        constructor(props) {
          super(props);

          this.state = {
          
            series: [{
              name: 'Temperature',
              type: 'column',
              color: '#FF5349',
              data: new Array(8).fill(15).map(element=>parseInt(element+Math.random()*15))
            }, {
              name: 'Humidity',
              type: 'column',
              color: '#008FFB',
              data: new Array(8).fill(65).map(element=>parseInt(element+Math.random()*30))
            }, {
              name: 'PM2.5',
              type: 'line',
              data: [20, 29, 37, 36, 44, 45, 50, 52]
            }],
            options: {
              chart: {
                height: 350,
                type: 'line',
                stacked: false,
              },
              dataLabels: {
                enabled: false
              },
              stroke: {
                width: [1, 1, 4]
              },
              title: {
                text: 'Historical data',
                align: 'left',
                offsetX: 10,
              },
              toolbar: {
                tools: {
                  download: true,
                  selection: true,
                  zoom: true,
                  zoomin: true,
                  zoomout: true,
                  pan: true,
                  reset: true
                }
              },
              xaxis: {
                categories: [2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022],
                labels: {
                  style: {
                    fontSize: '9px'
                  }
                },
                
              },
              yaxis: [
                {
                  axisTicks: {
                    show: true,
                  },
                  axisBorder: {
                    show: true,
                    color: '#FF5349'
                  },
                  labels: {
                    style: {
                      colors: '#FF5349',
                    }
                  },
                  title: {
                    text: "Temperature (Celsius)",
                    style: {
                      color: '#FF5349',
                    }
                  },
                  tooltip: {
                    enabled: true
                  }
                },
                {
                  seriesName: 'Temperature',
                  opposite: true,
                  axisTicks: {
                    show: true,
                  },
                  axisBorder: {
                    show: true,
                    color: '#008FFB'
                  },
                  labels: {
                    style: {
                      colors: '#008FFB',
                    }
                  },
                  title: {
                    text: "Humidity (%)",
                    style: {
                      color: '#008FFB',
                    }
                  },
                },
                {
                  seriesName: 'PM2.5',
                  opposite: true,
                  axisTicks: {
                    show: true,
                  },
                  axisBorder: {
                    show: true,
                    color: '#FEB019'
                  },
                  labels: {
                    style: {
                      colors: '#FEB019',
                    },
                  },
                  title: {
                    text: "PM2.5 (mm)",
                    style: {
                      color: '#FEB019',
                    }
                  }
                },
              ],
              tooltip: {
                fixed: {
                  enabled: true,
                  position: 'topLeft', // topRight, topLeft, bottomRight, bottomLeft
                  offsetY: 30,
                  offsetX: 60
                },
              },
              legend: {
                horizontalAlign: 'left',
                offsetX: 40
              }
            },
          
          
          };
        }

      

        render() {
          return (
            

      <div id="chart">
  <ReactApexChart options={this.state.options} series={this.state.series} type="line" height={300} width={400}/>
</div>
 );
}
}


export default MixedChart;
