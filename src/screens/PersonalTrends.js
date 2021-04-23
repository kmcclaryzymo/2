import React from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  processColor
} from 'react-native';
import update from 'immutability-helper';

import _ from 'lodash';
import {LineChart} from 'react-native-charts-wrapper';

class TimeSeriesLineChartScreen extends React.Component {

  constructor() {
    super();

    this.state = {
      data: {},
      legend: {
        enabled: true,
        textColor: processColor('white'),
        textSize: 12,
        form: 'LINE',
        formSize: 14,
        xEntrySpace: 10,
        yEntrySpace: 5,
        formToTextSpace: 5,
        wordWrapEnabled: true,
        maxSizePercent: 0.5,
        horizontalAlignment: 'LEFT',
        verticalAlignment: 'TOP',
        drawInside: true,
        custom: {
          colors: [processColor('deepskyblue'),processColor('rebeccapurple')],
          labels: ['DNAGE','AVERAGE'],
        }
      },
      marker: {
        enabled: true,
        markerColor: processColor('white'),
        textColor: processColor('blue'),
        markerFontSize: 14,
      },

      selectedEntry: "",
      yAxis: {left:{textColor: processColor('white'), drawGridLines: false, drawAxisLine: true, axisLineColor: processColor('white'), axisLineWidth: 2, drawLabels: false}, right: {enabled: false}},
      xAxis: {textColor: processColor('white'), position: 'BOTTOM', drawGridLines: false, drawAxisLine: true, axisLineColor: processColor('white'), axisLineWidth: 2, drawLabels: false},

    }

  }

  componentDidMount() {
    const size = 0;

    this.setState(
      update(this.state, {
        data: {
          $set: {
            dataSets: [{
              values: [
                {x: 31.8, y: 31.8, marker: "eat eat eat, never\n stop eat"},
                {x: 33, y: 33, marker:""  },

                ],
              label: 'refer',
              config: {
                textColor: processColor('white'),
                lineWidth: 1.5,
                drawValues: false,
                drawCircles: false,
                highlightColor: processColor('white'),
                color: processColor('rebeccapurple'),
                drawFilled: false,
                fillColor: processColor('white'),
                fillAlpha: 60,
                highlightEnabled: true,
                dashedLine: {
                  lineLength: 20,
                  spaceLength: 20
                }
              }
            }, {
              values: [
                {x: 32, y: 31.9, marker: "age shift = x"},
                {x: 32.1, y: 32.05, marker:"age shift = x"  },
                {x: 32.5, y: 32.65, marker: "age shift = x"},
                {x: 32.9, y: 32.68, marker: "age shift = x"},

                ],

              label: 'user',
              config: {
                lineWidth: 2,
                drawValues: true,

                circleRadius: 5,
                highlightEnabled: true,
                drawHighlightIndicators: false,
                color: processColor('deepskyblue'),
                drawFilled: false,
                valueTextSize:14,
                fillColor: processColor('black'),
                fillAlpha: 45,
                valueFormatter: "###.## yrs",
                circleColor: processColor('deepskyblue'),
                valueTextColor: processColor('white'),

              }
            }],
          }
        }
      })
    );
  }

  _randomParabolaValues(size: number) {
    return _.times(size, (index) => {
      return {x: index, y: index}
    });
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

    let borderColor = processColor("white");
    return (
      <View style={{flex: 1, backgroundColor: 'black'}}>

        <View style={{height:350}}>
          {/* <Text> selected entry</Text>
          <Text> {this.state.selectedEntry}</Text> */}
                <Text 
                    style={{
                        color: "lightcyan", 
                        height: 60, 
                        textAlign: 'left', 
                        textAlignVertical: 'center', 
                        fontSize: 20, 
                        fontWeight: 'bold',
                        paddingLeft: 20,
                        //textDecorationLine: 'underline'
                    }}>
                TRENDS</Text>
        </View>

        <View style={styles.container}>

          <View style={{transform: [{ rotateZ: '-90deg'}], height:25, justifyContent: 'center', alignItems: 'flex-end', alignSelf: 'center'}}>
            <Text style={{fontSize: 15, color: 'black'}}> a</Text>
          </View>

          <View style={{transform: [{ rotateZ: '-90deg'}], height:25, justifyContent: 'center', alignItems: 'flex-end', alignSelf: 'center'}}>
            <Text style={{fontSize: 15, color: 'white'}}>DNAge</Text>
          </View>
          

          <LineChart
            style={styles.chart}
            data={this.state.data}
            chartDescription={{text: ''}}
            legend={this.state.legend}
            marker={this.state.marker}
            drawGridBackground={false}
            
            gridBackgroundColor={processColor('black')}
            chartBackgroundColor={processColor('black')}
            
            borderColor={borderColor}
            borderWidth={0}
            drawBorders={false}
            yAxis={this.state.yAxis}
            xAxis={this.state.xAxis}
            
            onSelect={this.handleSelect.bind(this)}
            onChange={(event) => console.log(event.nativeEvent)}

            ref="chart"
          />

          <View style={{transform: [{ rotateZ: '-90deg'}], height:25, justifyContent: 'center', alignItems: 'flex-end', alignSelf: 'center'}}>
            <Text style={{fontSize: 15, color: 'black'}}> a</Text>
          </View>

        </View>
        <View style={{backgroundColor: 'black', paddingLeft: 60, height:25, justifyContent: 'center', alignSelf: 'center'}}>
            <Text style={{fontSize: 15, color: 'white'}}>Calendar Age</Text>
          </View>
      </View>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    //justifyContent: 'space-around',
    backgroundColor: 'black'
  },
  chart: {
    flex: 1,
    backgroundColor: 'black'

  }
});

export default TimeSeriesLineChartScreen;
