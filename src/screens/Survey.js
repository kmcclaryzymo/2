import React, { Component, useEffect, useState } from 'react';
import { StyleSheet, Button, ScrollView, Text, TextInput, View, Dimensions, TouchableOpacity, ImageBackground, SafeAreaView } from 'react-native';
import { SimpleSurvey } from 'react-native-simple-survey';
import { COLORS } from './validColors';
import { Auth } from 'aws-amplify'
import { API, graphqlOperation } from 'aws-amplify'
import { createTodo } from '../graphql/mutations'
import { listTodos } from '../graphql/queries'
import LinearGradient from 'react-native-linear-gradient';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
let surveyFinished = false

const initialState = { name: '', description: '', newcat: '', emailAddress: '', testField1: '', testField2: '', testField3: '',
                        t1: '', 
                        t2: '', 
                        t3: '', 
                        t4: '', 
                        t5: '', 
                        t6: '', 
                        t7: '', 
                        t8: '', 
                        t9: '', 
                        t10: '',
                        t11: '',
                        t12: '',
                        t13: '',
                        t14: '',
                        t15: '',
                        t16: '',
                        t17: '',
                        t18: '',
                        t19: '',
                        t20: '',
                        t21: '',
                        t22: '',
                        t23: '',
                        t24: '',
                        t25: '',
                        t26: '',
                        t27: '',
                        t28: '',
                        t29: '',
                        t30: '',
                        t31: ''}
let thanksText = ''
uidtext = ""
let emailAddress = ""

const GREEN = 'limegreen';
const PURPLE = 'rgba(108,48,237,1)';



const survey = [
    {
        questionType: 'Info',
        questionText: 'Welcome to the DNAge app! \n\nPlease tap next to begin your introduction survey'
    },
    {
        questionType: 'TextInput',
        questionText: 'Date of Birth',
        questionId: 'DOB',
        placeholderText: 'MM/DD/YY',
    },
    {
        questionType: 'SelectionGroup',
        questionText:
            'What is your gender?',
        questionId: 'gender',
        options: [
            {
                optionText: 'Male',
                value: 'male'
            },
            {
                optionText: 'Female',
                value: 'female'
            },
            {
                optionText: 'Other',
                value: 'other'
            },
            {
                optionText: 'Prefer no to say',
                value: 'none'
            },
        ]
    },
    {
        questionType: 'NumericInput',
        questionText: 'Height',
        questionId: 'height',
        placeholderText: 'inches',
    },
    {
        questionType: 'NumericInput',
        questionText: 'Weight',
        placeholderText: 'lbs',
    },
    {
        questionType: 'MultipleSelectionGroup',
        questionText:
            'Race & Ethinicity (select all that apply)',
        questionId: 'race',
        questionSettings: {
            maxMultiSelect: 7,
            minMultiSelect: 1,
        },
        options: [
            {
                optionText: 'American Indian / Native American',
                value: 'nativeAmerican'
            },
            {
                optionText: 'Asian',
                value: 'asian'
            },
            {
                optionText: 'Black / African American',
                value: 'black'
            },
            {
                optionText: 'Hispanic / Latino',
                value: 'hispanic'
            },
            {
                optionText: 'Native Hawaiian / Other Pacific Islander',
                value: 'pacificIslander'
            },
            {
                optionText: 'White / Caucasian',
                value: 'white'
            },
            {
                optionText: 'Other',
                value: 'other'
            },
            {
                optionText: 'Prefer not to say',
                value: 'none'
            },
        ]
    },
    {
        questionType: 'SelectionGroup',
        questionText:
            'Do you use tobacco products?',
        questionId: 'tobacco',
        options: [
            {
                optionText: 'Regularly (at least 1 pack per day)',
                value: 'regularly'
            },
            {
                optionText: 'Occasionally',
                value: 'occasionally'
            },
            {
                optionText: 'Not anymore, I quit',
                value: 'quit'
            },
            {
                optionText: 'Never',
                value: 'never'
            },
        ]
    },
    {
        questionType: 'SelectionGroup',
        questionText:
            'Diet',
        questionId: 'diet',
        options: [
            {
                optionText: 'Mostly meat',
                value: 'meat'
            },
            {
                optionText: 'Mostly vegetables',
                value: 'vegetables'
            },
            {
                optionText: 'Both meat and vegetables',
                value: 'both'
            },
            {
                optionText: 'Vegan',
                value: 'vegan'
            },
            {
                optionText: 'Vegetarian',
                value: 'vegetarian'
            },
            {
                optionText: 'Pescatarian',
                value: 'pescatarian'
            },
            {
                optionText: 'Other',
                value: 'other'
            },
        ]
    },
    {
        questionType: 'SelectionGroup',
        questionText:
            'How often do you drink?',
        questionId: 'alcohol',
        options: [
            {
                optionText: 'Every day',
                value: 'daily'
            },
            {
                optionText: '2-3 times per week',
                value: 'twoThreeWeek'
            },
            {
                optionText: '4-5 times per week',
                value: 'fourFiveWeek'
            },
            {
                optionText: 'Once per week',
                value: 'singleWeek'
            },
            {
                optionText: 'On special occasions',
                value: 'special'
            },
            {
                optionText: 'Never',
                value: 'never'
            },
        ]
    },
    {
        questionType: 'SelectionGroup',
        questionText:
            'How often do you exercise per week?',
        questionId: 'exercise',
        options: [
            {
                optionText: 'Never',
                value: 'never'
            },
            {
                optionText: '1-2 times per week',
                value: 'oneToTwo'
            },
            {
                optionText: '3-4 times per week',
                value: 'threeToFour'
            },
            {
                optionText: '5-7 times per week',
                value: 'fivetoSeven'
            },
            {
                optionText: '8 or more times per week',
                value: 'eightOrMore'
            },
        ]
    },
    {
        questionType: 'SelectionGroup',
        questionText:
            'On average, how many hours of sleep do you get per night?',
        questionId: 'sleep',
        options: [
            {
                optionText: '5 hours or less',
                value: 'fiveOrLess'
            },
            {
                optionText: '6 to 8 hours',
                value: 'sixToEight'
            },
            {
                optionText: 'more than 8 hours',
                value: 'moreThanEight'
            },
        ]
    },
    {
        questionType: 'MultipleSelectionGroup',
        questionText:
            'Do you take any of the following nutritional supplements? (select all that apply)',
        questionId: 'nutritionalSupplements',
        questionSettings: {
            maxMultiSelect: 7,
            minMultiSelect: 1,
        },
        options: [
            {
                optionText: 'Antioxidants: coenzyme Q10, green tea extract, resveratrol, etc.',
                value: 'antioxidants'
            },
            {
                optionText: 'Digestive support: probiotic, digestive enzymes, etc.',
                value: 'deigestive'
            },
            {
                optionText: 'Fish oil/ Omega fatty acids',
                value: 'fishOil'
            },
            {
                optionText: 'Herbal supplements',
                value: 'herbal'
            },
            {
                optionText: 'Minerals: calcium, iron, etc.',
                value: 'minerals'
            },
            {
                optionText: 'Vitamins',
                value: 'vitamins'
            },
            {
                optionText: 'Other',
                value: 'other'
            },
            {
              optionText: 'None of the above',
              value: 'none'
          },
        ]
    },
    {
        questionType: 'MultipleSelectionGroup',
        questionText:
            'Do you take any of the following supplements? (select all that apply)',
        questionId: 'supplements',
        questionSettings: {
            maxMultiSelect: 8,
            minMultiSelect: 1,
        },
        options: [
            {
                optionText: 'Dehydroepiandrosterone (DHEA)',
                value: 'dhea'
            },
            {
                optionText: 'Metformin',
                value: 'metformin'
            },
            {
                optionText: 'Nicotinamide ribose (NR), nicotinamide adenine dinucleotide (NAD), etc.',
                value: 'nad'
            },
            {
                optionText: 'Rapamycin',
                value: 'rapamycin'
            },
            {
                optionText: 'Resveratrol',
                value: 'reservatrol'
            },
            {
                optionText: 'TA-65, Cycloastragenol, Astragalus',
                value: 'ta'
            },
            {
                optionText: 'Sulforaphane, broccoli extract',
                value: 'sulforaphane'
            },
            {
              optionText: 'None of the above',
              value: 'none'
            },
        ]
    },
    {
        questionType: 'MultipleSelectionGroup',
        questionText:
            'Do you actively engage in anti-aging interventions? (select all that apply)',
        questionId: 'supplements',
        questionSettings: {
            maxMultiSelect: 6,
            minMultiSelect: 1,
        },
        options: [
            {
                optionText: 'Hormone replacement therapy',
                value: 'hormone'
            },
            {
                optionText: 'GDF11 therapy',
                value: 'gdf11'
            },
            {
                optionText: 'NAD therapy',
                value: 'nad'
            },
            {
                optionText: 'Stem cell therapy',
                value: 'stemCell'
            },
            {
                optionText: 'Dasatinib / Quercetin therapy',
                value: 'dasatinib'
            },
            {
                optionText: 'Other',
                value: 'other'
            },
            {
              optionText: 'None of the above',
              value: 'none'
          },
        ]
    },
    {
        questionType: 'MultipleSelectionGroup',
        questionText:
            'Have you ever been diagnosed with, or treated for, any of the following blood conditions? (select all that apply)',
        questionId: 'blood',
        questionSettings: {
            maxMultiSelect: 9,
            minMultiSelect: 1,
        },
        options: [
            {
                optionText: 'Anemia',
                value: 'anemia'
            },
            {
                optionText: 'Sickle cell disease',
                value: 'sickleCell'
            },
            {
                optionText: 'Thalassemia',
                value: 'thalassemia'
            },
            {
                optionText: 'Multiple myeloma',
                value: 'myeloma'
            },
            {
                optionText: 'Leukemia',
                value: 'leukemia'
            },
            {
                optionText: 'Hemophilia',
                value: 'hemophilia'
            },
            {
                optionText: 'Lymphoma',
                value: 'lymphoma'
            },
            {
                optionText: 'Other',
                value: 'other'
            },
            {
              optionText: 'None of the above',
              value: 'none'
          },
        ]
    },
    {
        questionType: 'MultipleSelectionGroup',
        questionText:
            'Have you ever been diagnosed with, or treated for, any of the following metabolic disorders? (select all that apply)',
        questionId: 'blood',
        questionSettings: {
            maxMultiSelect: 7,
            minMultiSelect: 1,
        },
        options: [
            {
                optionText: 'Prediabetes',
                value: 'prediabetes'
            },
            {
                optionText: 'Type 1 diabetes',
                value: 't1d'
            },
            {
                optionText: 'Type 2 diabetes',
                value: 't2d'
            },
            {
                optionText: 'Gestational diabetes',
                value: 'gestational'
            },
            {
                optionText: 'Mitochondrial disorders',
                value: 'mito'
            },
            {
                optionText: 'Other',
                value: 'other'
            },
            {
              optionText: 'None of the above',
              value: 'none'
          },
        ]
    },
    {
        questionType: 'SelectionGroup',
        questionText:
            'What is your highest ever total cholesterol level?',
        questionId: 'cholesterol',
        options: [
            {
                optionText: 'Below 200 mg/dL or 5.2 nmol/L',
                value: 'below200'
            },
            {
                optionText: '200-239 mg/dL or 5.2-6.1 nmol/L',
                value: '200To239'
            },
            {
                optionText: '240-260 mg/dL or 6.2-6.7 nmol/L',
                value: '240To260'
            },
            {
                optionText: 'Above 260 mg/dL or 6.7 mmol/L',
                value: 'above260'
            },
            {
                optionText: 'I do not know',
                value: 'dontKnow'
            },
        ]
    },
    {
        questionType: 'MultipleSelectionGroup',
        questionText:
            'Have you ever been diagnosed with, or treated for, any of the following cardiovascular diseases? (select all that apply)',
        questionId: 'cardiovascular',
        questionSettings: {
            maxMultiSelect: 5,
            minMultiSelect: 1,
        },
        options: [
            {
                optionText: 'Heart Attack',
                value: 'heartAttack'
            },
            {
                optionText: 'Stroke',
                value: 'stroke'
            },
            {
                optionText: 'Heart Failure',
                value: 'heartFailure'
            },
            {
                optionText: 'Other',
                value: 'other'
            },
            {
              optionText: 'None of the above',
              value: 'none'
          },
        ]
    },
    {
        questionType: 'MultipleSelectionGroup',
        questionText:
            'Have you ever been diagnosed with, or treated for, any of the following conditions? (select all that apply)',
        questionId: 'neuro',
        questionSettings: {
            maxMultiSelect: 4,
            minMultiSelect: 1,
        },
        options: [
            {
                optionText: 'Alzheimers disease',
                value: 'alzheimers'
            },
            {
                optionText: 'Parkinsons disease',
                value: 'parkinsons'
            },
            {
                optionText: 'Traumatic brain injury (TBI)',
                value: 'tbi'
            },
            {
                optionText: 'None of the above',
                value: 'none'
            },
        ]
    },
    {
        questionType: 'MultipleSelectionGroup',
        questionText:
            'Have you ever been diagnosed with, or treated for, any of the following conditions? (select all that apply)',
        questionId: 'joint',
        questionSettings: {
            maxMultiSelect: 6,
            minMultiSelect: 1,
        },
        options: [
            {
                optionText: 'Osteoarthritis',
                value: 'osteoarthritis'
            },
            {
                optionText: 'Rheumatoid arthritis',
                value: 'rheumatoid'
            },
            {
                optionText: 'Psoriatic arthritis',
                value: 'psoriatic'
            },
            {
                optionText: 'Gout',
                value: 'gout'
            },
            {
                optionText: 'Fibromyalgia',
                value: 'fibromyalgia'
            },
            {
                optionText: 'None of the above',
                value: 'none'
            },
        ]
    },
    {
        questionType: 'MultipleSelectionGroup',
        questionText:
            'Have you ever been diagnosed with, or treated for, any of the following prostate diseases? (select all that apply)',
        questionId: 'prostate',
        questionSettings: {
            maxMultiSelect: 5,
            minMultiSelect: 1,
        },
        options: [
            {
                optionText: 'Enlarged prostate / benign prostatic hyperplasia (BPH)',
                value: 'enlarged'
            },
            {
                optionText: 'Prostate cancer',
                value: 'cancer'
            },
            {
                optionText: 'Elevated Prostate-specific antigen (PSA) level',
                value: 'elevated'
            },
            {
                optionText: 'Gout',
                value: 'gout'
            },
            {
                optionText: 'None of the above',
                value: 'none'
            },
        ]
    },
    {
        questionType: 'MultipleSelectionGroup',
        questionText:
            'Have you ever been diagnosed with, or treated for, any of the following conditions? (select all that apply)',
        questionId: 'kidney',
        questionSettings: {
            maxMultiSelect: 5,
            minMultiSelect: 1,
        },
        options: [
            {
                optionText: 'Recurrent urinary tract infections (UTI)',
                value: 'uti'
            },
            {
                optionText: 'Kidney stones',
                value: 'kidneyStones'
            },
            {
                optionText: 'Chronic kidney disease',
                value: 'kidneyDisease'
            },
            {
                optionText: 'Kidney cancer',
                value: 'kidneyCancer'
            },
            {
                optionText: 'Bladder cancer',
                value: 'bladderCancer'
            },
            {
              optionText: 'None of the above',
              value: 'none'
          },
        ]
    },
    {
        questionType: 'MultipleSelectionGroup',
        questionText:
            'Have you ever been diagnosed with, or treated for, any of the following gum diseases? (select all that apply)',
        questionId: 'gum',
        questionSettings: {
            maxMultiSelect: 4,
            minMultiSelect: 1,
        },
        options: [
            {
                optionText: 'Periodontal diseases',
                value: 'periodontal'
            },
            {
                optionText: 'Oral cancer',
                value: 'oralCancer'
            },
            {
              optionText: 'Other',
              value: 'other'
            },
            {
                optionText: 'None of the above',
                value: 'none'
            },
        ]
    },
    {
        questionType: 'TextInput',
        questionText: 'Have you ever been diagnosed with, or treated for, any other condition not yet mentioned?',
        questionId: 'otherDisease',
        placeholderText: 'Yes or No, if yes please specify',
    },
    {
        questionType: 'TextInput',
        questionText: 'Do you take any medications?',
        questionId: 'medications',
        placeholderText: 'Yes or No, if yes please specify',
    },
    {
        questionType: 'MultipleSelectionGroup',
        questionText:
            'Do you have the following genetic variant? (select all that apply)',
        questionId: 'geneVariant',
        questionSettings: {
            maxMultiSelect: 4,
            minMultiSelect: 1,
        },
        options: [
            {
                optionText: 'Factor V',
                value: 'factorV'
            },
            {
                optionText: 'MTHFR',
                value: 'mthfr'
            },
            {
                optionText: 'Apolipoprotein E (ApoE)',
                value: 'apoe'
            },
            {
              optionText: 'None of the above',
              value: 'none'
          },
            {
                optionText: 'I do not know',
                value: 'doNotKnow'
            },
        ]
    },
    {
        questionType: 'NumericInput',
        questionText: 'How old was your mother when she gave birth to you?',
        questionId: 'motherAge',
        placeholderText: 'Age',
    },
    {
        questionType: 'SelectionGroup',
        questionText:
            'Do you have parents that lived to or beyond 90 years of age?',
        questionId: 'parentsAge',
        options: [
            {
                optionText: 'Yes',
                value: 'yes'
            },
            {
                optionText: 'No',
                value: 'no'
            },
            {
                optionText: 'I do not know',
                value: 'other'
            },
        ]
    },
    {
        questionType: 'SelectionGroup',
        questionText:
            'Do you have Grand-parents that lived to or beyond 90 years of age?',
        questionId: 'grandparentsAge',
        options: [
            {
                optionText: 'Yes',
                value: 'yes'
            },
            {
                optionText: 'No',
                value: 'no'
            },
            {
                optionText: 'I do not know',
                value: 'other'
            },
        ]
    },
    {
        questionType: 'SelectionGroup',
        questionText:
            'Do you have Great-grand-parents that lived to or beyond 90 years of age?',
        questionId: 'greatgrandparentsAge',
        options: [
            {
                optionText: 'Yes',
                value: 'yes'
            },
            {
                optionText: 'No',
                value: 'no'
            },
            {
                optionText: 'I do not know',
                value: 'other'
            },
        ]
    },
    {
        questionType: 'SelectionGroup',
        questionText:
            'Do you want to share your myDNAge® report with your physicians, other care providers or professionals, etc.?',
        questionId: 'shareWithPhysician',
        options: [
            {
                optionText: 'Yes',
                value: 'yes'
            },
            {
                optionText: 'No',
                value: 'no'
            },
        ]
    },
];
let answer1 = ''
let answer2 = ''
let answer3 = ''
let answer4 = ''
let answer5 = ''
let answer6 = ''
let answer7 = ''
let answer8 = ''
let answer9 = ''
let answer10 = ''
let answer11 = ''
let answer12 = ''
let answer13 = ''
let answer14 = ''
let answer15 = ''
let answer16 = ''
let answer17 = ''
let answer18 = ''
let answer19 = ''
let answer20 = ''
let answer21 = ''
let answer22 = ''
let answer23 = ''
let answer24 = ''
let answer25 = ''
let answer26 = ''
let answer27 = ''
let answer28 = ''
let answer29 = ''
let answer30 = ''
let answer31 = ''
let results = "";
let answersSoFar = "";
// function constructor(props) {
//   super(props);
//   this.state = { backgroundColor: PURPLE, answersSoFar: '' };
// }
/**
*  After each answer is submitted this function is called. Here you can take additional steps in response to the 
*  user's answers. From updating a 'correct answers' counter to exiting out of an onboarding flow if the user is 
*  is restricted (age, geo-fencing) from your app.
*/
const onAnswerSubmitted = (answer) => {
  // console.log('here')
  // console.log("1 " + JSON.stringify(answer, 2))
  // console.log("2 " + JSON.stringify(surveyRef.getAnswers()))
  // answersSoFar = surveyRef.getAnswers()
  // console.log("3 " + answersSoFar)
  //console.log("4 " + JSON.stringify(answersSoFar[0].value))
  //console.log("5 " + JSON.stringify(answersSoFar[1].value))
  //this.setState({ answersSoFar: JSON.stringify(surveyRef.getAnswers(), 2) });
  // switch (answer.questionId) {
  //     case 'favoriteColor': {
  //         if (COLORS.includes(answer.value.toLowerCase())) {
  //             this.setState({ backgroundColor: answer.value.toLowerCase() });
  //         }
  //         break;
  //     }
  //     default:
  //         break;
  // }
}
// function onAnswerSubmitted(answer) {
// }
function renderPreviousButton(onPress, enabled) {
  return (
    <View style={{ flexGrow: 1, width: 130, marginTop: 10, marginBottom: 10, paddingHorizontal: 10, borderRadius: 10,}}>
    <TouchableOpacity
        color={'limegreen'}
        onPress={onPress}
        disabled={!enabled}
        backgroundColor={"GREEN"}
        title={'Previous'}
    >
        <View style={{backgroundColor: '#F6D501', height: 35, alignItems: 'center', justifyContent: 'center', borderRadius: 10,}}>
        <Text style={{fontFamily: 'MontserratBold-DOWZd'}}>PREVIOUS</Text>
        </View>
    </TouchableOpacity>
</View>
  );
}
function renderNextButton(onPress, enabled) {
  return (
      <View style={{ flexGrow: 1, width: 130, marginTop: 10, marginBottom: 10, paddingHorizontal: 10, borderRadius: 10,}}>
          <TouchableOpacity
              color={'limegreen'}
              onPress={onPress}
              disabled={!enabled}
              backgroundColor={GREEN}
              title={'Next'}
          >
              <View style={{backgroundColor: 'limegreen', height: 35, alignItems: 'center', justifyContent: 'center', borderRadius: 10,}}>
              <Text style={{fontFamily: 'MontserratBold-DOWZd', color: 'black'}}>NEXT</Text>
              </View>
          </TouchableOpacity>
      </View>
  );
}
function renderFinishedButton(onPress, enabled) {
  return (
    <View style={{ flexGrow: 1, width: 130, marginTop: 10, marginBottom: 10, paddingHorizontal: 10, borderRadius: 10,}}>
    <TouchableOpacity
        color={'limegreen'}
        onPress={onPress}
        disabled={!enabled}
        backgroundColor={GREEN}
        title={'Finished'}
    >
        <View style={{backgroundColor: 'white', height: 35, alignItems: 'center', justifyContent: 'center', borderRadius: 10,}}>
        <Text style={{fontFamily: 'MontserratBold-DOWZd', color: 'black'}}>FINISH</Text>
        </View>
    </TouchableOpacity>
    </View>
  );
}
function renderButton(data, index, isSelected, onPress) {
  return (
    <View>
      <View style={{height: 5}}></View>
      <View
          key={`selection_button_view_${index}`}
          style={{ marginTop: 5, marginBottom: 5, justifyContent: 'flex-start' }}
      >
          <Button
              title={data.optionText}
              onPress={onPress}
              color={isSelected ? GREEN : PURPLE}
              style={isSelected ? { fontWeight: 'bold' } : {}} 
              key={`button_${index}`}
          />
      </View>
      </View>
  );
}
function renderQuestionText(questionText) {
  return (
      <View style={{ marginLeft: 10, marginRight: 10 }}>
          <Text numLines={1} style={styles.questionText}>{questionText}</Text>
      </View>
  );
}
function renderTextBox(onChange, value, placeholder, onBlur) {
  return (
      <View>
          <TextInput
              style={styles.textBox}
              onChangeText={text => onChange(text)}
              numberOfLines={1}
              underlineColorAndroid={'white'}
              placeholder={placeholder}
              placeholderTextColor={'rgba(184,184,184,1)'}
              value={value}
              multiline
              onBlur={onBlur}
              blurOnSubmit
              returnKeyType='done'
          />
      </View>
  );
}
function renderNumericInput(onChange, value, placeholder, onBlur) {
  return (<TextInput 
      style={styles.numericInput}
      onChangeText={text => { onChange(text); }}
      underlineColorAndroid={'white'}
      placeholderTextColor={'rgba(184,184,184,1)'}
      value={String(value)}
      placeholder={placeholder}
      keyboardType={'numeric'}
      onBlur={onBlur}
      maxLength={3}
  />);
}
function renderInfoText(infoText) {
  return (
      <View style={{ marginLeft: 10, marginRight: 10 }}>
          <Text style={styles.infoText}>{infoText}</Text>
      </View>
  );
}
let surveyRef = {}
const App = () => {
  Auth.currentAuthenticatedUser().then((user) => {
    uidtext = user.attributes.email;
    emailAddress = uidtext;
  });
  const [formState, setFormState] = useState(initialState)
  const [todos, setTodos] = useState([])
  useEffect(() => {
    fetchTodos()
  }, [])
  function setInput(key, value) {
    setFormState({ ...formState, [key]: value })
  }
  async function fetchTodos() {
    try {
      const todoData = await API.graphql(graphqlOperation(listTodos))
      const todos = todoData.data.listTodos.items
      let newlist = []
      for (let items of todos){
        if (items.emailAddress == emailAddress){
          newlist.push(items)
        }
      }
      setTodos(newlist)
    } catch (err) { console.log('error fetching todos') }
  }
  async function addTodo() {
    try {
      formState.emailAddress = uidtext
      formState.testField1 = "t1"
      formState.testField2 = "t2"
      formState.testField3 = "t3"
      formState.t1 = answer1
      formState.t2 = answer2
      formState.t3 = answer3
      formState.t4 = answer4
      formState.t5 = answer5
      formState.t6 = answer6
      formState.t7 = answer7
      formState.t8 = answer8
      formState.t9 = answer9
      formState.t10 = answer10
      formState.t11 = answer11
      formState.t12 = answer12
      formState.t13 = answer13
      formState.t14 = answer14
      formState.t15 = answer15
      formState.t16 = answer16
      formState.t17 = answer17
      formState.t18 = answer18
      formState.t19 = answer19
      formState.t20 = answer20
      formState.t21 = answer21
      formState.t22 = answer22
      formState.t23 = answer23
      formState.t24 = answer24
      formState.t25 = answer25
      formState.t26 = answer26
      formState.t27 = answer27
      formState.t28 = answer28
      formState.t29 = answer29
      formState.t30 = answer30
      formState.t31 = answer31
      console.log("here2")
      const todo = { ...formState }
      setTodos([...todos, todo])
      setFormState(initialState)
      await API.graphql(graphqlOperation(createTodo, {input: todo}))
    } catch (err) {
      console.log('error creating todo:', err)
    }
  }
  function onSurveyFinished(answers) {
    /** 
     *  By using the spread operator, array entries with no values, such as info questions, are removed.
     *  This is also where a final cleanup of values, making them ready to insert into your DB or pass along
     *  to the rest of your code, can be done.
     * 
     *  Answers are returned in an array, of the form 
     *  [
     *  {questionId: string, value: any},
     *  {questionId: string, value: any},
     *  ...
     *  ]
     *  Questions of type selection group are more flexible, the entirity of the 'options' object is returned
     *  to you.
     *  
     *  As an example
     *  { 
     *      questionId: "favoritePet", 
     *      value: { 
     *          optionText: "Dogs",
     *          value: "dog"
     *      }
     *  }
     *  This flexibility makes SelectionGroup an incredibly powerful component on its own. If needed it is a 
     *  separate NPM package, react-native-selection-group, which has additional features such as multi-selection.
     */
    const infoQuestionsRemoved = [...answers];
    // Convert from an array to a proper object. This won't work if you have duplicate questionIds
    const answersAsObj = {};
    for (const elem of infoQuestionsRemoved) { answersAsObj[elem.questionId] = elem.value; }
    console.log(JSON.stringify(answersAsObj))
    console.log("RESULTS " + answersAsObj)
    answer1 = answersAsObj.DOB
    console.log("A1 " + answer1)
    answer2 = answersAsObj.gender.value
    console.log("B2 " + answer2)
    answer3 = answersAsObj.height
    console.log(answer3)
    // answer4 = answersAsObj.weight 
    // console.log(answer4)
    // answer5 = answersAsObj.race.value
    // answer6 = answersAsObj.tobacco.value
    // answer7 = answersAsObj.diet.value
    // answer8 = answersAsObj.alcohol.value
    // answer9 = answersAsObj.exercise.value
    // answer10 = answersAsObj.sleep.value
    // answer11 = answersAsObj.nutritionalSupplements.value
    // answer12 = answersAsObj.supplements.value
    // answer13 = answersAsObj.blood.value
    // answer14 = answersAsObj.cholesterol.value
    // answer15 = answersAsObj.cardiovascular.value
    // answer16 = answersAsObj.neuro.value
    // answer17 = answersAsObj.joint.value
    // answer18 = answersAsObj.prostate.value
    // answer19 = answersAsObj.kidney.value
    // answer20 = answersAsObj.gum.value
    // answer21 = answersAsObj.otherDisease
    // answer22 = answersAsObj.medications
    // answer23 = answersAsObj.geneVariant.value
    // answer24 = answersAsObj.motherAge
    // answer25 = answersAsObj.parentsAge.value
    // answer26 = answersAsObj.grandparentsAge.value
    // answer27 = answersAsObj.greatgrandparentsAge.value
    // answer28 = answersAsObj.shareWithPhysician.value
    addTodo()
    thanksText = 'Thanks for completing the survey!'
    //this.props.navigation.navigate('SurveyCompleted', { surveyAnswers: answersAsObj });
  }
        return (

          <SafeAreaView style={styles.safeAreaContainer}>
          <ImageBackground source={require('../assets/dna3.jpg')} imageStyle={{opacity:0.25}} style={{flex: 1, width: windowWidth, height: windowHeight, opacity: 20}}>
    
          <ScrollView>
            <LinearGradient
            //colors={['#100D1F', '#191628', '#232030', '#14141f', '#061419']}
            colors={['rgba(8, 9, 17, .5)', 'rgba(8, 9, 17, .5)', '#14141f', 'black']}
            //style={{flex: 1}}
            >
            <View style={{height: windowHeight}}>
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
      SURVEYS & RESEARCH</Text>
                    <View style={{height: 30}}></View>
                    <View>
                    <SimpleSurvey
                        ref={(s) => { surveyRef = s; }}
                        survey={survey}
                        renderSelector={renderButton}
                        containerStyle={styles.surveyContainer}
                        selectionGroupContainerStyle={styles.selectionGroupContainer}
                        navButtonContainerStyle={{ flexDirection: 'row', justifyContent: 'space-around' }}
                        renderPrevious={renderPreviousButton}
                        renderNext={renderNextButton}
                        renderFinished={renderFinishedButton}
                        renderQuestionText={renderQuestionText}
                        onSurveyFinished={(answers) => onSurveyFinished(answers)}
                        onAnswerSubmitted={(answer) => onAnswerSubmitted(answer)}
                        renderTextInput={renderTextBox}
                        renderNumericInput={renderNumericInput}
                        renderInfo={renderInfoText}
                    />
                    </View>
                    <View>
                    <View style={{height: 50}}></View>
                    <Text style={{textAlign:'center', color: 'white', fontFamily: 'MontserratMedium-nRxlJ', fontSize: 20}}>{thanksText}</Text>
                    {/* <Text>{answersSoFar}</Text>
                    <Button title={"Submit"} onPress={addTodo}></Button> */}
                </View>
                {/* <ScrollView style={styles.answersContainer}>
                    <Text style={{textAlign:'center'}}>JSON output</Text>
                    <Text>test out</Text>
                    <Text>{answersSoFar}</Text>
                                            {
                                todos.map((todo, index) => (
                                <View key={todo.id ? todo.id : index} style={styles.todo}>
                                    <Text style={styles.todoName}>{todo.name}</Text>
                                    <Text>{todo.description}</Text>
                                    <Text>{todo.newcat}</Text>
                                    <Text>{todo.emailAddress}</Text>
                                </View>
                                ))
                            }
                </ScrollView> */}
            </View>
            </LinearGradient>
            </ScrollView>
            </ImageBackground>
            </SafeAreaView>
        );
    }
const styles = StyleSheet.create({
    button: {
        margin: 10,
        height: 30,
        width: 140,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    container: {
        //minWidth: '70%',
        //maxWidth: '90%',
        alignItems: 'stretch',
        justifyContent: 'center',
        borderRadius: 10,
        borderColor: 'white'

        //flex: 1, 
    },
    // answersContainer: {
    //     width: '90%',
    //     maxHeight: '20%',
    //     marginTop: 50,
    //     paddingHorizontal: 20,
    //     paddingVertical: 10,
    //     marginBottom: 20,
    //     backgroundColor: 'white',
    //     elevation: 20,
    //     borderRadius: 10,
    // },
    surveyContainer: {
        width: 'auto',
        alignSelf: 'center',
        backgroundColor: 'rgba(40,40,40,1)',
        borderBottomLeftRadius: 5,
        borderBottomRightRadius: 5,
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
        alignContent: 'center',
        paddingVertical: 30,
        paddingHorizontal: 10,
        flexGrow: 0,
        shadowColor: "gold",
        shadowOffset: {
            width: 4,
            height: 4,
        },
        shadowOpacity: 1,
        shadowRadius: 2,
        elevation: 8,        
    },
    selectionGroupContainer: {
        flexDirection: 'column',
        backgroundColor: 'rgba(35,35,35,1)',
        alignContent: 'flex-end',
        padding: 20,
    },
    navButtonText: {
        margin: 10,
        fontSize: 20,
        color: 'white',
        width: 'auto'
    },
    answers: {
        alignSelf: 'center',
        marginBottom: 10,
    },
    navigationButton: {
        minHeight: 40,
        backgroundColor: GREEN,
        padding: 0,
        borderRadius: 100,
        marginTop: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    background: {
        //flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    questionText: {
        marginBottom: 20,
        fontSize: 20,
        fontFamily: 'MontserratMedium-nRxlJ',
        color: 'white'
    },
    textBox: {
        borderWidth: 1,
        borderColor: 'rgba(204,204,204,1)',
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 10,
        textAlignVertical: 'top',
        marginLeft: 10,
        marginRight: 10,
        marginBottom: 20

    },
    numericInput: {
        borderWidth: 1,
        borderColor: 'rgba(204,204,204,1)',
        backgroundColor: 'white',
        borderRadius: 2,
        padding: 10,
        textAlignVertical: 'top',
        marginLeft: 10,
        marginRight: 10,
        marginBottom: 20
    },
    infoText: {
        marginBottom: 20,
        fontSize: 20,
        marginLeft: 10,
        color: 'white',
        fontFamily: 'MontserratMedium-nRxlJ',

    },
    safeAreaContainer: {
      flex: 1,
      backgroundColor: 'black'
    },
});
export default App