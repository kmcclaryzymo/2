import React, { useState, useEffect } from 'react';
import { ActivityIndicator, View, Text, Dimensions } from 'react-native';

import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart,
  chartConfig
} from 'react-native-chart-kit'

function Graphs(props) {
  
  const barData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June'],
    datasets: [
      {
        data: [20, 45, 28, 80, 99, 43],
      },
    ],
  };
  
  
  return (


<View>
  <Text>
    Bezier Line Chart
  </Text>
  <BarChart
    // style={graphStyle}
    data={barData}
    width={Dimensions.get('window').width}
    height={220}
    yAxisLabel={'$'}

    chartConfig={{
      backgroundColor: '#e26a00',
      backgroundGradientFrom: 'chocolate',
      backgroundGradientTo: 'darkblue',
      decimalPlaces: 2, // optional, defaults to 2dp
      color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
      style: {borderRadius: 16}
    
    }        
    }
/>
</View>


  );
}

export default Graphs;
