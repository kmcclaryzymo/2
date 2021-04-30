import React from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View, processColor
} from 'react-native';

import {BarChart} from 'react-native-charts-wrapper';

class StackedBarChartScreen extends React.Component {

  constructor() {
    super();

    this.state = {
      legend: {
        enabled: true,
        textSize: 14,
        form: "SQUARE",
        formSize: 14,
        xEntrySpace: 10,
        yEntrySpace: 5,
        wordWrapEnabled: true
      },
      data: {
        dataSets: [{
          values: [0.4, 0, -0.1, 0.2],
          label: 'Total',
          config: {
            drawValues: false,
            colors: [processColor('gray')],
            barShadowColor: processColor('white'),
            highlightAlpha: 0,
            highlightColor: processColor('white'),
            valueTextSize: 15,
            valueTextColor: processColor('white'),
          }
        }, {
          values: [-0.1, -0.2, 0.2, 0.1],
          label: 'Sleep',
          config: {
            drawValues: false,
            colors: [processColor('darkblue')],
            barShadowColor: processColor('white'),
            highlightAlpha: 0,
            highlightColor: processColor('white'),
            valueTextSize: 15,
            valueTextColor: processColor('white'),
          }
        }, {
          values: [-0.2,-0.1, -0.4, -0.1],
          label: 'Diet',
          config: {
            drawValues: false,
            colors: [processColor('darkgreen')],
            barShadowColor: processColor('white'),
            highlightAlpha: 0,
            highlightColor: processColor('white'),
            valueTextSize: 15,
            valueTextColor: processColor('white'),
          }
        },
        {
          values: [0.7, 0.3, 0.1, 0.2],
          label: 'Exercise',
          config: {
            drawValues: false,
            colors: [processColor('darkred')],
            barShadowColor: processColor('white'),
            highlightAlpha: 0,
            highlightColor: processColor('white'),
            valueTextSize: 15,
            valueTextColor: processColor('white'),
          }
        }
      
      ],
        config: {

          barWidth: 0.1,
          group: {
            fromX: 0,
            groupSpace: 0.4,
            barSpace: 0,
          },

        }
      },
      xAxis: {
        valueFormatter: ['09/24/20', '10/30/20', '3/24/21', '8/18/21'],
        granularityEnabled: true,
        granularity: 1,
        axisMaximum: 5,
        axisMinimum: 0,
        centerAxisLabels: true
      },
      yAxis: {
        left: {
          axisMaximum: .8,
          axisMinimum: -.8,
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
      marker: {
        enabled: true,
        markerColor: processColor('#F0C0FF8C'),
        textColor: processColor('black'),
        markerFontSize: 14,
      },

    };
  }

    componentDidMount() {
    // in this example, there are line, bar, candle, scatter, bubble in this combined chart.
    // according to MpAndroidChart, the default data sequence is line, bar, scatter, candle, bubble.
    // so 4 should be used as dataIndex to highlight bubble data.

    // if there is only bar, bubble in this combined chart.
    // 1 should be used as dataIndex to highlight bubble data.

    this.setState({...this.state, highlights: [{x: 1, y:40}, {x: 2, y:50}]})
  }

  // handleSelect(event) {
  //   let entry = event.nativeEvent
  //   if (entry == null) {
  //     this.setState({...this.state, selectedEntry: null})
  //   } else {
  //     this.setState({...this.state, selectedEntry: JSON.stringify(entry)})
  //   }

  //   console.log(event.nativeEvent)
  // }

  render() {
    return (
      <View style={{flex: 1}}>

        <View style={{height:80}}>
          <Text> selected entry</Text>
          <Text> {this.state.selectedEntry}</Text>
        </View>

        <View style={styles.container}>
          <BarChart
            style={styles.chart}
            xAxis={this.state.xAxis}
            yAxis={this.state}
            data={this.state.data}
            legend={this.state.legend}
            drawValueAboveBar={true}
            //onSelect={this.handleSelect.bind(this)}
            //onChange={(event) => console.log(event.nativeEvent)}
            //highlights={this.state.highlights}
            marker={this.state.marker}
          />
        </View>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF'
  },
  chart: {
    flex: 1
  }
});

export default StackedBarChartScreen;
