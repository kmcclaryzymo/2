import React from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  processColor,
  Dimensions
} from 'react-native';

import {BarChart} from 'react-native-charts-wrapper';
import { ClipPath } from 'react-native-svg';

const GREEN = processColor('#71BD6A');
const RED = processColor('#D14B5A');
const GREY = processColor('#0E1936');

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;


class BarChartScreen extends React.Component {



  constructor() {
    super();


    this.state = {
      description: {
        text: ''
      },
      legend: {
        enabled: false,
        textSize: 14,
        form: 'SQUARE',
        formSize: 14,
        xEntrySpace: 10,
        yEntrySpace: 5,
        formToTextSpace: 5,
        wordWrapEnabled: true,
        maxSizePercent: 0.5
      },
      data1: {
        dataSets: [{
          values: [{y: -0.20}, {y: -0.6}, {y: 0.7}],
          label: 'Bar dataSet',
          config: {
            colors: [RED],
            barSpacePercent: 90,
            barShadowColor: processColor('white'),
            highlightAlpha: 100,
            highlightColor: processColor('white'),
            valueTextSize: 15,
            valueTextColor: processColor('white'),

          }
        }],
        config: {
          barWidth: 0.6
        }
          // group: {
          //   fromX: number, // required
          //   groupSpace: number, // required
          //   barSpace: number // required
          // }
      },
      data2: {
        dataSets: [{
          values: [{y: -0.3}, {y: -0.6}, {y: 0.7}, {y: -0.02}, {y: -0.05}, {y: 0.03}],
          label: 'Bar dataSet',
          config: {
            colors: [RED, RED, GREEN, RED, RED, GREEN],
            barSpacePercent: 10,
            barShadowColor: processColor('white'),
            highlightAlpha: 100,
            highlightColor: processColor('white'),
            valueTextSize: 15,
            valueTextColor: processColor('white'),

          }
        }],
        config: {
          barWidth: 0.6
        }
          // group: {
          //   fromX: number, // required
          //   groupSpace: number, // required
          //   barSpace: number // required
          // }
      },
      highlights: [{x: 3}, {x: 6}],
      xAxis1: {
        valueFormatter: ['TOTAL'],
        granularityEnabled: true,
        granularity : 1,
        textSize: 30,
        textColor: processColor('white'),
        drawGridLines: false,
        drawAxisLine: false,
        yOffset: 10,

    
      },
      xAxis2: {
        valueFormatter: ['SLEEP', 'DIET', 'EXERCISE', 'STRESS', 'AIR', 'ALLERGY'],
        granularityEnabled: true,
        granularity : 1,
        textSize: 15,
        textColor: processColor('white'),
        drawGridLines: false,
        drawAxisLine: false,
        yOffset: 15,


    
      },
      
      yAxis1: {
        left: {
          axisMaximum: .7,
          axisMinimum: -.7,
          drawLabels: false,
          drawAxisLine: false,
          drawGridLines: false,
          zeroLine: {
            enabled: true,
            lineWidth: 1,
            lineColor: processColor('white')
          },
        },
        right: {
          enabled: false
        }
      },
      yAxis2: {
        inverted: true,
        left: {
          axisMaximum: .7,
          axisMinimum: -.7,
          labelCount: 5,
          textSize: 10,
          textColor: processColor('white'),
          drawLabels: true,
          drawAxisLine: false,
          drawGridLines: true,
          
          axisLineColor: processColor('red'),

          gridLineWidth: 0.5,
          zeroLine: {
            enabled: true,
            lineWidth: 1,
            lineColor: processColor('white')
          },
          gridDashedLine: {
            lineLength: 4,
            spaceLength: 8,
            phase: 1,
            }
        },
        right: {
          enabled: false
        }
      }

      
    };
  }

  handleSelect(event) {
    let entry = event.nativeEvent
    if (entry == null) {
      this.setState({...this.state, selectedEntry: null})
    } else {
      this.setState({...this.state, selectedEntry: JSON.stringify(entry)})
    }

    console.log(event.nativeEvent)
  }


  render() {
    return (



      <View style={{flex: 1, backgroundColor: '#0F0F16'}}>

        <View style={{height:3*windowHeight/5}}>
          <Text style={{color: 'white'}}> selected entry</Text>
          <Text style={{color: 'white'}}> {this.state.selectedEntry}</Text>
        </View >

        <View style={styles.container}>



        <BarChart
            doubleTapToZoomEnabled={false}
            dragEnabled={false}
            // drawBorders={false}
            // borderWidth={0}
            // borderColor={RED}
            style={styles.chart1}
            data={this.state.data1}
            xAxis={this.state.xAxis1}
            yAxis={this.state.yAxis1}
            animation={{durationY: 2000}}
            legend={this.state.legend}
            description={{text: ''}}
            //gridBackgroundColor={processColor('white')}
            visibleRange={{x: { min: 1, max: 1 }}}
            drawBarShadow={false}
            drawValueAboveBar={false}
            drawHighlightArrow={true}
            onSelect={this.handleSelect.bind(this)}
            highlights={this.state.highlights}
            onChange={(event) => console.log(event.nativeEvent)}
            chartDescription={{text: ''}}


          />


          <BarChart
            doubleTapToZoomEnabled={false}

            drawBorders={false}
            borderWidth={1}
            borderColor={RED}
            style={styles.chart2}
            data={this.state.data2}
            xAxis={this.state.xAxis2}
            yAxis={this.state.yAxis2}
            //animation={{durationX: 2000, durationY: 2000}}
            legend={this.state.legend}
            description={{text: ''}}
            gridBackgroundColor={processColor('white')}
            visibleRange={{x: { min: 3, max: 3 }}}
            drawBarShadow={false}
            drawValueAboveBar={false}
            drawHighlightArrow={true}
            onSelect={this.handleSelect.bind(this)}
            highlights={this.state.highlights}
            onChange={(event) => console.log(event.nativeEvent)}
            chartDescription={{text: ''}}

          />



        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#0F0F16'
    
  },
  chart1: {

    width: (windowWidth/3)
  },
  chart2: {
    width: (2*windowWidth/3)
  }
});

export default BarChartScreen;