import React from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  processColor,
  Dimensions,
  ScrollView,
  ImageBackground,
  SafeAreaView
} from 'react-native';
import update from 'immutability-helper';
import _ from 'lodash';
import {LineChart, BarChart, CombinedChart} from 'react-native-charts-wrapper';
import LinearGradient from 'react-native-linear-gradient';

import { AnimatedCircularProgress } from 'react-native-circular-progress';

const yellow = "#F6D501"

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const GREEN = processColor('limegreen');
const RED = processColor('firebrick');
const BLUE1 = processColor('deepskyblue');
const BLUE2 = processColor('deepskyblue');
const BLUE3 = processColor('deepskyblue');
const BLUE = processColor('deepskyblue');

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
          colors: [processColor('deepskyblue'),processColor('fuchsia')],
          labels: ['DNAge','AVERAGE'],
        }
      },
      marker: {
        enabled: true,
        markerColor: processColor('black'),
        textColor: processColor('white'),
        markerFontSize: 26,
      },
      selectedEntry: "",
      yAxis: {left:{textColor: processColor('white'), drawGridLines: false, drawAxisLine: true, axisLineColor: processColor('white'), axisLineWidth: 2, drawLabels: false, axisMaximum: 34, axisMinimum: 31}, right: {enabled: false}},
      xAxis: {textColor: processColor('white'), position: 'BOTTOM', drawGridLines: false, drawAxisLine: true, axisLineColor: processColor('white'), axisLineWidth: 2, drawLabels: false, axisMaximum: 34, axisMinimum: 31 },
      data2: {
        dataSets: [{
          values: [{y: 0.4}, {y: 0.0}, {y: -0.1}, {y: 0.2}],
          label: 'Zero line dataset',
          config: {
            colors: [GREEN, GREEN, RED, GREEN],
            barSpacePercent: 0,
            barShadowColor: processColor('white'),
            highlightAlpha: 0,
            highlightColor: processColor('white'),
            valueTextSize: 12,
            valueTextColor: processColor('white'),
            valueFormatter: "#.## yrs"

          }
        }],
        config: {
          barWidth: 0.35
        }
      },
      data3: {
        dataSets: [{
          values: [{y: 0.988}, {y: 1.000}, {y: 1.003}, {y: 0.994}],
          label: 'Zero line dataset',
          config: {
            colors: [BLUE, BLUE, BLUE, BLUE],
            barSpacePercent: 0,
            barShadowColor: processColor('white'),
            highlightAlpha: 0,
            highlightColor: processColor('white'),
            valueTextSize: 12,
            valueTextColor: processColor('white'),
          }
        }],
        config: {
          barWidth: 0.35
        }
      },
      xAxis2: {
        enabled: true,
        valueFormatter: ['02/22/20', '04/14/20', '05/10/20', '09/24/20'],
        granularityEnabled: true,
        granularity : 1,
        textSize: 13,
        textColor: processColor('white'),
        fontWeight: '900',
        drawGridLines: false,
        drawAxisLine: false,
      },
      yAxis2: {
        left: {
          axisMaximum: .55,
          axisMinimum: -.3,
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
      xAxis3: {
        enabled: true,
        valueFormatter: ['02/22/20', '04/14/20', '05/10/20', '09/24/20'],
        granularityEnabled: true,
        granularity : 1,
        textSize: 13,
        textColor: processColor('white'),
        fontWeight: '900',
        drawGridLines: false,
        drawAxisLine: false,
      },
      yAxis3: {
        left: {
          //axisMaximum: .8,
          //axisMinimum: -.8,
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
      xAxis4: {
        //drawLabels: false,
        valueFormatter: ['','09/24/20', '10/30/20', '03/24/21', '8/18/21'],
        granularityEnabled: true,
        granularity: 1,
        textSize: 12,
        textColor: processColor('white'),
        drawGridLines: true,
        gridColor: processColor('gray'),
        yOffset: 15,
        //position: 'BOTTOM', 
        drawAxisLine: false, 
        axisLineColor: processColor('white'), 
        axisLineWidth: 2, 
      },
      yAxis4: {
        left: {      
          enabled: true,
          drawLabels: true,
          granularityEnabled: true,
          granularity: 10,
          axisMaximum: 1.005,
          axisMinimum: 0.993,
          drawAxisLine: false, 
          axisLineColor: processColor('white'), 
          axisLineWidth: 2
        },
        right: {
          enabled: false,
          drawLabels: false,
        }
      },
      legend4: {
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
        verticalAlignment: 'BOTTOM',
        drawInside: false,
        custom: {
          colors: [processColor('deepskyblue'),processColor('fuchsia')],
          labels: ['Aging Rate','1 yrs/yr'],
        }
      },
      marker4: {
        enabled: true,
        markerColor: processColor('#F0C0FF8C'),
        textColor: processColor('white'),
        markerFontSize: 14,
      },
      data4: {
        lineData: {
          dataSets: [{
            values: [1, 1, 1, 1,1,1],
            label: 'Sine function',
            config: {
              drawValues: false,
              colors: [processColor('fuchsia')],
              mode: "CUBIC_BEZIER",
              drawCircles: false,
              lineWidth: 2,
              axisDependency: "LEFT",
              dashedLine: {
                lineLength: 20,
                spaceLength: 20
              }
            }
          },],
        },
        scatterData: {
          dataSets: [{
            values: [-2, 0.998, 2.000, 1.003, 0.994],
            label: 'Company A',
            config: {
              colors: [processColor('deepskyblue')],
              drawValues: true,
              valueTextColor: processColor('white'),
              scatterShapeSize: 22,
              scatterShape: 'SQUARE',
              valueTextSize:14,
              valueFormatter: "###.#### yrs/yr",
            }
          },
        ],
        },
      }

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
                {x: 0, y: 0, marker: ""},
                {x: 100, y: 100, marker:""  },
                ],
              label: 'refer',
              config: {
                textColor: processColor('white'),
                lineWidth: 1.5,
                drawValues: false,
                drawCircles: false,
                highlightColor: processColor('white'),
                color: processColor('fuchsia'),
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
                {x: 1, y: 1, marker: "age shift = 0.4 yrs younger"},

                {x: 32, y: 31.6, marker: "age shift = 0.4 yrs younger"},
                {x: 32.1, y: 32.1, marker:"age shift = 0 yrs"  },
                {x: 32.5, y: 32.6, marker: "age shift = 0.1 yrs older"},
                {x: 32.9, y: 32.7, marker: "age shift = 0.2 years younger"},
                ],
              label: 'user',
              config: {
                lineWidth: 2,
                drawValues: true,
                circleRadius: 4,
                highlightEnabled: true,
                drawHighlightIndicators: false,
                color: processColor('deepskyblue'),
                drawFilled: false,
                valueTextSize:0,
                fillColor: processColor('black'),
                fillAlpha: 45,
                valueFormatter: "###.## yrs",
                circleColor: processColor('white'),
                valueTextColor: processColor('white'),
              }
            },
            {
              values: [
                {x: 10000, y: 10000, marker: "age shift = 0.4 yrs younger"},

                {x: 32.9, y: 32.7, marker: "age shift = 0.4 yrs younger"},
,
                ],
              label: 'user',
              config: {
                lineWidth: 2,
                drawValues: true,
                circleRadius: 4,
                highlightEnabled: true,
                drawHighlightIndicators: false,
                color: processColor('deepskyblue'),
                drawFilled: false,
                valueTextSize:0,
                fillColor: processColor('black'),
                fillAlpha: 45,
                valueFormatter: "###.## yrs",
                circleColor: processColor('white'),
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
      <SafeAreaView style={styles.safeAreaContainer}>
      <ImageBackground source={require('../assets/dna3.jpg')} imageStyle={{opacity:0.25}} style={{flex: 1, width: windowWidth, height: windowHeight, opacity: 20}}>

      <ScrollView>
        <LinearGradient
        //colors={['#100D1F', '#191628', '#232030', '#14141f', '#061419']}
        colors={['rgba(8, 9, 17, .5)', 'rgba(8, 9, 17, .7)', 'rgba(8, 9, 17, 1)', '#061419', '#061419', 'black']}
        //style={{flex: 1}}
        >
      <View style={{flex: 1, 
                    //backgroundColor: 'black'
                    }}>
        <View style={{}}>
          {/* <Text> selected entry</Text>
          <Text> {this.state.selectedEntry}</Text> */}
                <Text 
                    style={{
                        color: "white", 
                        height: 60, 
                        textAlign: 'left', 
                        textAlignVertical: 'center', 
                        fontSize: 20, 
                        fontWeight: 'bold',
                        paddingLeft: 20,
                        //textDecorationLine: 'underline'
                    }}>
                PERSONAL TRENDS</Text>
        </View>
        {/* <View style={{height: 20}}></View> */}
        <View style={{flex: 1}}>

        <View style={{flex: 1,
                              flexDirection: 'column',
                              justifyContent: 'space-around',}}>

<View style={{flex: 1, flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
                    <Text 
                        style={{
                            color: "#F6D501", 
                            height: 70, 
                            textAlign: 'center', 
                            textAlignVertical: 'center', 
                            fontSize: 35, 
                            //fontWeight: 'bold',
                            transform : [ {translateY: 20}],
                            fontFamily: 'MontserratMedium-nRxlJ'

                            //paddingLeft: 20,
                            //textDecorationLine: 'underline'
                            // textShadowOffset: { width: .4, height: .4 },
                            // textShadowRadius: 1,
                            // textShadowColor: 'white',
                        }}>
                        Best Age Shift</Text>
                        <View style={{height: 40}}></View>
                        <AnimatedCircularProgress
                                size={175}
                                width={10}
                                backgroundWidth={2.5}
                                fillLineCap={'round'}
                                lineCap={'round'}
                                fill={20}
                                arcSweepAngle={180}
                                rotation={270}
                                tintColor="limegreen"
                                backgroundColor='lightsteelblue'
                                duration={1}
                                prefill={20}>
                                {
                                  (fill) => (
                                    <Text>
                                      { this.state.fill }

                                      <View>

                              <Text 
                              style={{
                                  color: "white", 
                                  height: 75, 
                                  textAlign: 'center', 
                                  textAlignVertical: 'center', 
                                  fontSize: 50, 
                                  //fontWeight: 'bold',
                                  fontFamily: 'MontserratRegular-BWBEl',

                                  //paddingLeft: 20,
                                  //textDecorationLine: 'underline'
                                  textShadowOffset: { width: .4, height: .4 },
                                  textShadowRadius: 1,
                                  textShadowColor: 'deepskyblue',
                                  //transform : [ {translateY: -5}],
                              }}>
                              0.20</Text>

                              <Text 
                              style={{
                                  color: "lightsteelblue", 
                                  height: 30, 
                                  textAlign: 'center', 
                                  textAlignVertical: 'center', 
                                  fontSize: 15, 
                                  transform : [ {translateY: -10}],

                                  //fontWeight: 'bold',
                                  //paddingLeft: 20,
                                  //textDecorationLine: 'underline'
                              }}>
                              years younger</Text>

                              </View>

                                    </Text>
                                    
                                  )
                                }
                              </AnimatedCircularProgress>
                    </View>




                </View>


                <View style={{flex: 1,
                              flexDirection: 'column',
                              justifyContent: 'space-around',}}>

<View style={{flex: 1, flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
                    <Text 
                        style={{
                            color: "#F6D501", 
                            height: 70, 
                            textAlign: 'center', 
                            textAlignVertical: 'center', 
                            fontSize: 35, 
                            //fontWeight: 'bold',
                            transform : [ {translateY: 20}],
                            fontFamily: 'MontserratMedium-nRxlJ'

                            //paddingLeft: 20,
                            //textDecorationLine: 'underline'
                            // textShadowOffset: { width: .4, height: .4 },
                            // textShadowRadius: 1,
                            // textShadowColor: 'white',
                        }}>
                        Average Age Shift</Text>
                        <View style={{height: 40}}></View>
                        <AnimatedCircularProgress
                                size={175}
                                width={10}
                                backgroundWidth={2.5}
                                fillLineCap={'round'}
                                lineCap={'round'}
                                fill={10}
                                arcSweepAngle={180}
                                rotation={270}
                                tintColor="limegreen"
                                backgroundColor='lightsteelblue'
                                duration={1}
                                prefill={10}
                                >
                                {
                                  (fill) => (
                                    <Text>
                                      { this.state.fill }

                                      <View>

                              <Text 
                              style={{
                                  color: "white", 
                                  height: 75, 
                                  textAlign: 'center', 
                                  textAlignVertical: 'center', 
                                  fontSize: 50, 
                                  //fontWeight: 'bold',
                                  fontFamily: 'MontserratRegular-BWBEl',

                                  //paddingLeft: 20,
                                  //textDecorationLine: 'underline'
                                  textShadowOffset: { width: .4, height: .4 },
                                  textShadowRadius: 1,
                                  textShadowColor: 'deepskyblue',
                                  //transform : [ {translateY: -5}],
                              }}>
                              0.13</Text>

                              <Text 
                              style={{
                                  color: "lightsteelblue", 
                                  height: 30, 
                                  textAlign: 'center', 
                                  textAlignVertical: 'center', 
                                  fontSize: 15, 
                                  transform : [ {translateY: -10}],

                                  //fontWeight: 'bold',
                                  //paddingLeft: 20,
                                  //textDecorationLine: 'underline'
                              }}>
                              years younger</Text>

                              </View>

                                    </Text>
                                    
                                  )
                                }
                              </AnimatedCircularProgress>
                    </View>




                </View>

                  <View style={{height: 25}}></View>
        </View>
    <View style={{flex: 1}}>
    <View style={{}}>
                <Text 
                        style={{
                            //backgroundColor: 'black',
                            color: yellow, 
                            height: 70, 
                            textAlign: 'center', 
                            textAlignVertical: 'center', 
                            fontSize: 35, 
                            //paddingLeft: 20,
                            //fontWeight: 'bold',
                            //textDecorationLine: 'underline'
                            // textShadowOffset: { width: .4, height: .4 },
                            // textShadowRadius: 1,
                            // textShadowColor: 'deepskyblue',
                            fontFamily: 'MontserratMedium-nRxlJ'

                            }}>
                        DNAge Test History</Text>
                </View>
                <View style={{height: 10}}></View>
        <View style={styles.container}>
          <View style={{transform: [{ rotateZ: '-90deg'}], height:25, justifyContent: 'center', alignItems: 'flex-end', alignSelf: 'center'}}>
            <Text style={{fontSize: 15, color: 'black'}}> a</Text>
          </View>
          <View style={{transform: [{ rotateZ: '-90deg'}], height:25, justifyContent: 'center', alignItems: 'flex-end', alignSelf: 'center'}}>
            <Text style={{fontSize: 15, color: 'white'}}>DNAge</Text>
          </View>
          <LineChart
            doubleTapToZoomEnabled={false}
            style={styles.chart}
            data={this.state.data}
            chartDescription={{text: ''}}
            legend={this.state.legend}
            marker={this.state.marker}
            drawGridBackground={false}
            //gridBackgroundColor={processColor('black')}
            //chartBackgroundColor={processColor('black')}
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
        <View style={{paddingLeft: 60, height:25, justifyContent: 'center', alignSelf: 'center'}}>
            <Text style={{fontSize: 15, color: 'white'}}>Calendar Age</Text>
          </View>
          <View style={{height: 20}}></View>
    </View>
    <View style={{height: 20}}></View>
    <View style={{flex: 1}}>
        <View style={{}}>
                    <Text 
                            style={{
                                //backgroundColor: 'black',
                                color: yellow, 
                                height: 70, 
                                textAlign: 'center', 
                                textAlignVertical: 'center', 
                                fontSize: 35, 
                                //paddingLeft: 20,
                                //fontWeight: 'bold',
                                //textDecorationLine: 'underline'
                                // textShadowOffset: { width: .4, height: .4 },
                                // textShadowRadius: 1,
                                // textShadowColor: 'deepskyblue',
                                fontFamily: 'MontserratMedium-nRxlJ'

                                }}>
                            Age Shift History</Text>
                    </View>
                    <View style={{height: 10}}></View>

                    <View style={{flexDirection: 'row'}}>
                        
                        
                        <View style={{flex:1}}>
                            <View style={{  
                                      width: 50,
                                      height: 50
                                    //flex:1,
                                    //transform : [ { rotate: '270deg'}],   
                                    //width: '25%',
                                    //backgroundColor: 'black',
                                        }}>
                                <Text style={{ 
                                          //flex: 1,
                                          //backgroundColor: 'black',
                                          alignSelf: 'center',
                                          textAlignVertical: 'top',
                                          width: 150,
                                          transform : [ { rotate: '-90deg'},
                                                        {translateX: -152},
                                                        {translateY: -10}
                                                      ],
                                          fontSize: 13, 
                                          color: 'white'}}>
                                      Older       Younger
                                  </Text>
                              </View>
                          </View>
        <View style={{}}>
          <BarChart
            doubleTapToZoomEnabled={false}
            dragEnabled={false}
            drawValueAboveBar={true}
            style={{flex: 1, height: 300, width: windowWidth}}
            data={this.state.data2}
            xAxis={this.state.xAxis2}
            yAxis={this.state.yAxis2}
            chartDescription={{text: ''}}
            legend={{enabled: false}}
          />
        </View>
        </View>

      </View>
        <View style={{flex: 1}}>
            <View style={{}}>
                        <Text 
                                style={{
                                    //backgroundColor: 'black',
                                    color: yellow, 
                                    height: 70, 
                                    textAlign: 'center', 
                                    textAlignVertical: 'center', 
                                    fontSize: 35, 
                                    //paddingLeft: 20,
                                    //fontWeight: 'bold',
                                    //textDecorationLine: 'underline'
                                    // textShadowOffset: { width: .4, height: .4 },
                                    // textShadowRadius: 1,
                                    // textShadowColor: 'deepskyblue',
                                    fontFamily: 'MontserratMedium-nRxlJ'

                                    }}>
                                Aging Rate History</Text>
                        </View>
                        <View style={{}}>
                        <View style={{height: 375}}>
                                    <View style={{height: 10}}></View>
                                    {/* <View style={{height: 80}}>
                                      <Text> selected entry</Text>
                                      <Text> {this.state.selectedEntry}</Text>
                                    </View> */}
                                    <View style={{flex: 1, flexDirection: 'row'}}>
                                                        <View style={{width: 20  
                                                                    }}>
                                                            <Text style={{ 
                                                                      width: 150,
                                                                      transform : [ { rotate: '-90deg'},
                                                                                    {translateX: -115},
                                                                                    {translateY: -65}
                                                                                  ],
                                                                      fontSize: 13, 
                                                                      color: 'white'}}>
                                                                  Aging Rate
                                                              </Text>
                                                          </View>
                                    <View style={{flex: 1, height: 300, width: 300}}>
                                      <CombinedChart
                                        touchEnabled={false}
                                        doubleTapToZoomEnabled={false}
                                        visibleRange={{x: { min: 5, max: 5 }}}
                                        data={this.state.data4}
                                        xAxis={this.state.xAxis4}
                                        yAxis={this.state.yAxis4}
                                        legend={this.state.legend4}
                                        //onSelect={this.handleSelect.bind(this)}
                                        //onChange={(event) => console.log(event.nativeEvent)}
                                        marker={this.state.marker}
                                        highlights={this.state.highlights}
                                        highlightFullBarEnabled={false}
                                        drawOrder={['SCATTER','LINE','BAR']}
                                        drawBorders={true}
                                        borderColor={processColor("white")}
                                        borderWidth={2}
                                        style={{flex: 1}}
                                        />
                                    </View>
                                    </View>
                                  </View>

                        </View>
          </View>

      </View>
      </LinearGradient>
      </ScrollView>
      </ImageBackground>
      </SafeAreaView>
    );
  }
}
const styles = StyleSheet.create({
  safeAreaContainer: {
    flex: 1,
    backgroundColor: 'black'
  },
  container: {
    flex: 1,
    flexDirection: 'row',
    //justifyContent: 'space-around',
    //backgroundColor: 'black'
  },
  chart: {
    flex: 1,
    //backgroundColor: 'black',
    height: (2*windowHeight/5),
  }
});
export default TimeSeriesLineChartScreen;