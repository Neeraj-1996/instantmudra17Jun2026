import React, { useState } from 'react';
import {
  SafeAreaView,
  Switch,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,

} from 'react-native';


import * as Animatable from 'react-native-animatable';
import Collapsible from 'react-native-collapsible';
import Accordion from 'react-native-collapsible/Accordion';
import { useNavigation } from '@react-navigation/native';
import Header from '../../components/Header/Header';


const CONTENT = [
  {
    title: 'Q1. What is Instant Mudra?',
    content:
      'Instant Mudra is brand of Chintamani Finlease Ltd Company who help you to make your dreams true by providing you different type of loan.',
  },
  {
    title: 'Q2. Which banks/NBFC you have partnered with?',
    content:
      'We partnered with Chintamani Finlease Limited, NBFC registered with RBI, to offer you the best set of loan products. We will offer you the best loan deal after analysing your profile. Once approved, your loan details will be shown in our app.',
  },
  {
    title: 'Q3. Do I have to pay interest? Is it high?',
    content:
      'The interest rate is equivalent to market rates for any ‘personal loan’ with zero collateral or security. It can be as low as depending on the partner company guidelines and the credit profile of the user.',
  },
  {
    title: 'Q4. Are there any hidden charges?',
    content:
      'No, there are no hidden charges, only one time processing fee varies up to 5% of the sanctioned amount exclusive of applicable GST.',
  },
  {
    title: 'Q5. How do I pay the instalments?',
    content:
      'You can pay your EMI by e-NACH/e-mandate i.e. your account will automatically get debited on due dates.',
  },
  {
    title: 'Q6. How do I pay back?',
    content:
      'The payment is like any other loan payment. You would be directly paying our partner bank. You can make the payment by a cheque/Demand Draft or online directly to the bank.',
  },
  {
    title: 'Q7. How much I can borrow from Instantfin Tech?',
    content:
      'At Instant Mudra sanction and disbursal of loan depends on loan requirement. Loan amount can vary from Rs. 3,000/-upto Rs. 30,000/- for salaried, A borrower can apply for a loan maximum upto Rs. 30,000/-. For Invoice finance loan amount can be vary from Rs. 3,000/- to Rs. 30,000/-',
  },
];

const SELECTORS = [
  { value: 0 },
  { value: 1 },
  { value: 2 },
  { value: 3 },
  { value: 4 },
  { value: 5 },
  { value: 6 },
  { value: 7 },
  //   { title: 'Reset all' },
];

const Faq = (props) => {
  const [activeSections, setActiveSections] = useState([]);

  const [collapsed, setCollapsed] = useState(true);

  const [multipleSelect, setMultipleSelect] = useState(false);
  const navigation = useNavigation();


  const toggleExpanded = () => {
    setCollapsed(!collapsed);
  };

  const setSections = (sections) => {
    setActiveSections(sections.includes(undefined) ? [] : sections);
  };

  const renderHeader = (section, _, isActive) => {
    return (
      <Animatable.View
        duration={400}
        style={[styles.header, isActive ? styles.active : styles.inactive]}
        transition="backgroundColor">
        <Text style={styles.headerText}>{section.title}</Text>
      </Animatable.View>
    );
  };

  const renderContent = (section, _, isActive) => {
    //Accordion Content view
    return (


      <Animatable.View
        duration={400}
        style={[styles.content, isActive ? styles.active : styles.inactive]}
        transition="backgroundColor">
        <Animatable.Text
          animation={isActive ? 'bounceIn' : undefined}
          style={{ textAlign: 'center', color: '#27374D' }}>
          {section.content}
        </Animatable.Text>
      </Animatable.View>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Header navigation={props.navigation} title={'FAQ'} />






      <View style={styles.container}>
        <ScrollView>

          <View style={styles.selectors}>
            {SELECTORS.map((selector) => (
              <TouchableOpacity activeOpacity={1}
                key={selector.title}
                onPress={() => setSections([selector.value])}

              >
                <View style={styles.selector}>
                  <Text
                    style={
                      activeSections.includes(selector.value) &&
                      styles.activeSelector
                    }>
                    {selector.title}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
          <Accordion
            activeSections={activeSections}

            sections={CONTENT}

            touchableComponent={TouchableOpacity}
            expandMultiple={multipleSelect}

            renderHeader={renderHeader}

            renderContent={renderContent}

            duration={400}

            onChange={setSections}

          />
          {/*Code for Accordion/Expandable List ends here*/}


        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default Faq;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
    paddingTop: 30,
  },
  title: {
    textAlign: 'center',
    fontSize: 25,
    fontWeight: '300',
    marginBottom: 20,
  },
  header: {
    backgroundColor: '#000',
    padding: 20,
  },
  headerText: {
    // textAlign: 'center',
    fontSize: 18,
    fontWeight: '500',
    marginLeft: 20,
    backgroundColor: "#f1f1f1",
    width: '80%',
    elevation: 4,
    color: '#000'

  },
  content: {
    padding: 20,
    backgroundColor: '#fff',
    color: '#000'
  },
  active: {
    backgroundColor: 'rgba(255,255,255,1)',
  },
  inactive: {
    backgroundColor: 'rgba(245,252,255,1)',
  },
  selectors: {
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  selector: {
    backgroundColor: '#F5FCFF',
    padding: 10,
  },
  activeSelector: {
    fontWeight: 'bold',
    color: '#000'
  },
  selectTitle: {
    fontSize: 14,
    fontWeight: '500',
    padding: 10,
    textAlign: 'center',
  },
  multipleToggle: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 30,
    alignItems: 'center',
  },
  multipleToggle__title: {
    fontSize: 16,
    marginRight: 8,
  },
});
