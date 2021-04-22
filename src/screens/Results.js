import React from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  processColor,
  Dimensions,
  Image,
  Button

} from 'react-native';

import {BarChart} from 'react-native-charts-wrapper';
import { ClipPath } from 'react-native-svg';

import { Auth } from 'aws-amplify';

const GREEN = processColor('#71BD6A');
const RED = processColor('#D14B5A');
const GREY = processColor('#0E1936');

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const testvalue = 12;

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
            valueFormatter: "##.### years"
          }
        }],
        config: {
          barWidth: 0.6,

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
        textSize: 20,
        textColor: processColor('deepskyblue'),
        fontWeight: '900',
        drawGridLines: false,
        drawAxisLine: false,
        yOffset: 10,

    
      },
      xAxis2: {
        valueFormatter: ['SLEEP', 'DIET', 'EXERCISE', 'STRESS', 'AIR', 'ALLERGY'],
        granularityEnabled: true,
        granularity : 1,
        textSize: 15,
        textColor: processColor('deepskyblue'),
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
          labelCount: 3,
          textSize: 10,
          textColor: processColor('lightslategrey'),
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

        <View style={{height:2.8*windowHeight/6}}>

            <View >
                {/* <Text style={{color: 'white'}}> selected entry</Text>
                <Text style={{color: 'white'}}> {this.state.selectedEntry}</Text> */}
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
                    RESULTS</Text>

                <View style={{alignSelf: "center"}}>
                    <Text 
                        style={{
                            color: "deepskyblue", 
                            height: 70, 
                            textAlign: 'center', 
                            textAlignVertical: 'center', 
                            fontSize: 60, 
                            fontWeight: 'bold',
                            //paddingLeft: 20,
                            //textDecorationLine: 'underline'
                        }}>
                        DNAGE</Text>


                        <Text 
                        style={{
                            color: "lightcyan", 
                            height: 60, 
                            textAlign: 'center', 
                            textAlignVertical: 'center', 
                            fontSize: 50, 
                            fontWeight: 'bold',
                            //paddingLeft: 20,
                            //textDecorationLine: 'underline'
                        }}>
                        32.5</Text>

                        <Text 
                        style={{
                            color: "lightsteelblue", 
                            height: 30, 
                            textAlign: 'center', 
                            textAlignVertical: 'center', 
                            fontSize: 15, 
                            //fontWeight: 'bold',
                            //paddingLeft: 20,
                            //textDecorationLine: 'underline'
                        }}>
                        years</Text>
                </View>

                <View style={{height: 20}}></View>
            </View>

            <View style={styles.container}>



                <View style={{width: windowWidth/2}}>
                    <Text 
                    style={{
                        color: "deepskyblue", 
                        height: 30, 
                        textAlign: 'center', 
                        textAlignVertical: 'center', 
                        fontSize: 25, 
                        fontWeight: 'bold',
                        //paddingLeft: 20,
                        //textDecorationLine: 'underline'
                    }}>
                    AGING RATE</Text>

                    <Text 
                    style={{
                        color: "lightcyan", 
                        height: 53, 
                        textAlign: 'center', 
                        textAlignVertical: 'center', 
                        fontSize: 40, 
                        fontWeight: 'bold',
                        //paddingLeft: 20,
                        //textDecorationLine: 'underline'
                    }}>
                    1.3</Text>
                </View>

                <View style={{width: windowWidth/2}}>
                    <Text 
                    style={{
                        color: "deepskyblue", 
                        height: 30, 
                        textAlign: 'center', 
                        textAlignVertical: 'center', 
                        fontSize: 25, 
                        fontWeight: 'bold',
                        //paddingLeft: 20,
                        //textDecorationLine: 'underline'
                    }}>
                    AGE SHIFT</Text>

                    <Text 
                    style={{
                        color: "lightcyan", 
                        height: 53, 
                        textAlign: 'center', 
                        textAlignVertical: 'center', 
                        fontSize: 40, 
                        fontWeight: 'bold',
                        //paddingLeft: 20,
                        //textDecorationLine: 'underline'
                    }}>
                    0.2</Text>

                    <Text 
                    style={{
                        color: "lightsteelblue", 
                        height: 20, 
                        textAlign: 'center', 
                        textAlignVertical: 'center', 
                        fontSize: 12, 
                        //fontWeight: 'bold',
                        //paddingLeft: 20,
                        //textDecorationLine: 'underline'
                    }}>
                    years older</Text>
                </View>

            </View>

        </View >
        
            <Text 
                style={{
                    backgroundColor: '#171717',

                    color: "lightsteelblue", 
                    height: 90, 
                    textAlign: 'center', 
                    textAlignVertical: 'center', 
                    fontSize: 22, 
                    paddingLeft: 20,
                    fontWeight: '500',
                    //textDecorationLine: 'underline'
                    }}>
                AGE SHIFT - LIFESTYLE IMPACT</Text>

        <View style={styles.container2}>


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
            drawValueAboveBar={true}
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
  container2: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#171717'
    
  },
  chart1: {

    width: (windowWidth/3)
  },
  chart2: {
    width: (2*windowWidth/3)
  }
});

export default BarChartScreen;