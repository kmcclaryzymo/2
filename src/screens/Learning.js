import React from 'react';
import { View, Text, Image, StyleSheet, Dimensions, ScrollView, Linking, TouchableOpacity } from 'react-native';

import LinearGradient from 'react-native-linear-gradient';


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const pad = 30;
const space = 30;

function Learning(props) {


    
    return (

        <ScrollView style={{width: windowWidth}}>
        <LinearGradient 
            //colors={['#061419', '#14141f', 'black', '#14141f', '#061419']}
            colors={['gray', '#061419', 'darkslateblue', '#061419', 'black']}

            //style={{flex: 1}}
            >

        <View style={{alignSelf: 'center', width: windowWidth - 30}}>
        
        <View style={{height: space}}></View>

            <TouchableOpacity onPress={ ()=> Linking.openURL('https://www.nature.com/articles/d41586-019-03164-5')}>
                <View style={styles.tileContainer}>
                    <View style={{height: pad}}></View>

                    <Image style={styles.image} source={require('../assets/crispr.png')} />
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
            </TouchableOpacity>

                <View style={{height: space}}></View>


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

                <View style={{height: space}}></View>


                <View style={styles.tileContainer}>
                    <View style={{height: pad}}></View>

                    <Image style={styles.image} source={require('../assets/cells.jpg')} />
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

                <View style={{height: space}}></View>


                <View style={styles.tileContainer}>
                    <View style={{height: pad}}></View>

                    <Image style={styles.image} source={require('../assets/watermolecule.jpg')} />
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



        </View>
        </LinearGradient>

        </ScrollView>
    );
}



const styles = StyleSheet.create({

    tileContainer: {
        backgroundColor: 'black',
        //height: 500,
        paddingHorizontal: 10,
        borderRadius:20,
        borderWidth: 1,
        borderColor: '#fff'
    },
    image: {
        alignSelf: 'center',
        height: 150,
        width: 300,
        borderRadius:20,
        borderWidth: 1,
        borderColor: 'gray',
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
        color: 'deepskyblue'
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