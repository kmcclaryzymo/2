import React from 'react';
import { View, Text, Image, StyleSheet, Dimensions, ScrollView, Linking, TouchableOpacity, SafeAreaView, ImageBackground } from 'react-native';

import LinearGradient from 'react-native-linear-gradient';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const pad = 30;
const space = 30;

function Learning(props) {

    
    return (

        <SafeAreaView style={styles.safeAreaContainer}>
        <ImageBackground source={require('../assets/dna3.jpg')} imageStyle={{opacity:0.25}} style={{flex: 1, width: windowWidth, height: windowHeight, opacity: 20}}>
  
        <ScrollView>
          <LinearGradient
          //colors={['#100D1F', '#191628', '#232030', '#14141f', '#061419']}
          colors={['rgba(8, 9, 17, .2)', 'rgba(8, 9, 17, .2)', '#14141f', '#061419', 'black']}
          //style={{flex: 1}}
          >
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
      LEARNING CENTER</Text>
        <View style={{alignSelf: 'center', width: windowWidth - 30}}>
        
        <View style={{height: 10}}></View>

             <TouchableOpacity onPress={ ()=> Linking.openURL('https://www.zymoresearch.com/blogs/blog/turning-back-the-epigenetic-aging-clock')}>

                <View style={styles.tileContainer}>
                    <View style={{height: pad}}></View>

                    <Image style={styles.image} source={require('../assets/zymologo.png')} />
                    <Text style={styles.title}>
                        Turning Back the Epigenetic Clock
                    </Text>
                    <Text style={styles.author}>
                        Zymo Research Corporation
                    </Text>
                    <Text style={styles.date}>
                        September 2019
                    </Text>
                    <Text style={styles.description}>
                    Aging is a major factor associated with chronic disease, which accounts for nearly two thirds of all deaths and contributes to approximately 75% of annual health care costs in the United States. As scientists and doctors search for novel therapies and interventions to deal with aging and related diseases, the epigenetic clock has emerged as an important tool able to predict biological, as opposed to chronological, age in mammals. Now, a new study provides the first evidence that reversal of biological age in humans may be possible.                    </Text>
                </View>
                </TouchableOpacity>

                <View style={{height: space}}></View>
            <TouchableOpacity onPress={ ()=> Linking.openURL('https://www.nature.com/articles/d41586-019-03164-5')}>
                <View style={styles.tileContainer}>
                    <View style={{height: pad}}></View>

                    <Image style={styles.image} source={require('../assets/protein.jpg')} />
                    <Text style={styles.title}>
                        CRISPR 2.0 now with an On/Off switch
                    </Text>
                    <Text style={styles.author}>
                        Tina Hu-Seliger, Ph.D.
                    </Text>
                    <Text style={styles.date}>
                        April 2021
                    </Text>
                    <Text style={styles.description}>
                        In anticipation of DNA Day on April 25, for this month’s Abstract we’ve rounded up articles on some extraordinary developments in genetics, genomics, and gene-related biotechnology. We cover a groundbreaking update to CRISPR-Cas9, how suppressing the expression of a single gene may help humans regrow lost teeth, and a team of scientists spearheading COVID-19 variant research who are calling for greater resources to support their open-source technology. 
                    </Text>
                </View>
            </TouchableOpacity >

        <View style={{height: space}}></View>


            <TouchableOpacity onPress={ ()=> Linking.openURL('https://www.cdc.gov/genomics/disease/epigenetics.htm')}>

                <View style={styles.tileContainer}>
                    <View style={{height: pad}}></View>

                    <Image style={styles.image} source={require('../assets/cdclogo.jpg')} />
                    <Text style={styles.title}>
                        What is Epigenetics?
                    </Text>
                    <Text style={styles.author}>
                        Centers for Disease Control and Prevention
                    </Text>
                    <Text style={styles.date}>
                        August 2020
                    </Text>
                    <Text style={styles.description}>
                    Your genes play an important role in your health, but so do your behaviors and environment, such as what you eat and how physically active you are. Epigenetics is the study of how your behaviors and environment can cause changes that affect the way your genes work. Unlike genetic changes, epigenetic changes are reversible and do not change your DNA sequence, but they can change how your body reads a DNA sequence.                    </Text>
                </View>
                </TouchableOpacity>

        <View style={{height: space}}></View>

            <TouchableOpacity onPress={ ()=> Linking.openURL('https://www.nia.nih.gov/news/epigenetics-aging-what-bodys-hands-time-tell-us')}>

                <View style={styles.tileContainer}>
                    <View style={{height: pad}}></View>

                    <Image style={styles.image} source={require('../assets/epigeneticsCode.jpg')} />
                    <Text style={styles.title}>
                        The epigenetics of aging: What the body’s hands of time tell us
                    </Text>
                    <Text style={styles.author}>
                        NIH National Institute on Aging
                    </Text>
                    <Text style={styles.date}>
                        March 2021
                    </Text>
                    <Text style={styles.description}>
                    We’ve all met older adults who seem younger, whose bodies and brains seem decades nimbler than their actual ages, and wondered, “What makes them different?” Despite the wide range of supplements and related products that claim, without scientific evidence, that they can turn back the years, the key to foiling Father Time may lie in the field of epigenetics.                    </Text>
                </View>
                </TouchableOpacity>


        </View>
        </LinearGradient>

        </ScrollView>
        </ImageBackground>
        </SafeAreaView>
    );
}


const styles = StyleSheet.create({
    safeAreaContainer: {
        flex: 1,
        backgroundColor: 'black'
      },
    tileContainer: {
        backgroundColor: 'rgba(30, 30, 30, 1)',
        //height: 500,
        paddingHorizontal: 10,
        borderRadius:20,
        borderWidth: 1,
        borderColor: 'rgba(246, 213, 1, .1)',
        shadowColor: "gold",
        shadowOffset: {
            width: 4,
            height: 4,
        },
        shadowOpacity: 1,
        shadowRadius: 2,
        elevation: 5, 
    },
    image: {
        alignSelf: 'center',
        height: 150,
        width: 300,
        borderRadius:20,
        borderWidth: 1,
        borderColor: 'gray',
        backgroundColor: 'white'
    },
    title: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'left',
        paddingHorizontal: 20,
        paddingVertical: 10,
    },
    author: {
        fontSize: 15,
        fontWeight: 'bold',
        paddingHorizontal: 20,

        textAlign: 'left',
        color: 'rgba(246, 213, 1, 1)'
    },
    date: {
        color: 'gray',
        fontSize: 10,
        fontWeight: 'bold',
        textAlign: 'left',
        paddingHorizontal: 20,

    },
    description: {
        color: 'white',
        textAlign: 'justify',
        paddingHorizontal: 20,
        paddingVertical: 10,
        paddingBottom: 20

    },
})

export default Learning;