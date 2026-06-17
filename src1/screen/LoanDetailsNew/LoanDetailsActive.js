
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  ScrollView,

} from 'react-native';
import styles from './styles';
import LinearGradient from 'react-native-linear-gradient';
import Header from '../../components/Header/Header';
import colors from '../../common';
import LinearButton from '../../components/LinearButton/LinearButton';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { API_BASE_URL } from '../../utils';
import moment from 'moment';
import threeStyles from './stylesThree';
import CustomCheckBox from '../../components/Checkbox/Checkbox';

const LoanDetailsActive = props => {
  // const activeLoanData = props.route?.params?.activeLoanData;
  const [data, setData] = useState('');
  const [showPaymentPopup, setShowPaymentPopup] = useState(false);
  const [showLoader, setShowLoader] = useState(false);
  const [lockedExpandedIds, setLockedExpandedIds] = useState([]);
  const [emiData, setEmiData] = useState([]);
  const [expandedId, setExpandedId] = useState(null);
  const [selectedIds, setSelectedIds] = useState([]);
  const activeLoanData = props.route?.params?.activeLoanData;


  const { loanId, three_month_emi } = props.route.params;

  console.log("three_month_emi", three_month_emi)
  const Null = 'N/A'

  // useEffect(() => {
  //   fetchAppliedLoan();
  //   fetchAppliedLoanThree();
  // }, []);

  useEffect(() => {
    if (three_month_emi === true) {
      fetchAppliedLoanThree();
    } else {
      fetchAppliedLoan();
    }
  }, []);

  const fetchAppliedLoan = async () => {
    setShowLoader(true)
    const impl = await AsyncStorage.getItem('impl');

    console.log('impl????', impl)
    // console.log('LoanDetailsActive.js line-45:', props?.route?.params?.loanId)
    const body = {
      order_id: props?.route?.params?.loanId?.order_id,
    }

    axios
      .post('https://instantmudra.com/admin/API/getIndivisualLoandetails', body)
      .then(res => {
        setShowLoader(false)
        setData(res?.data)
      })
  }

  const fetchAppliedLoanThree = async () => {
    setShowLoader(true);
    const impl = await AsyncStorage.getItem('impl');

    const body = {
      order_id: props?.route?.params?.loanId?.order_id,
      // order_id: "IM-PL-455616",
    };


    axios
      .post('https://instantmudra.com/admin/API/getIndivisualLoandetails_one', body)
      .then(res => {
        setShowLoader(false);
        const data = res?.data?.data;

        if (!data) return;
        setData(data)
        // Construct emiData from the response
        const newEmiData = [
          {
            id: 'emi1',
            date: data.emi_date1,
            status: data.emi_class1,
            statusLabel: data.status_label1,
            check: data.checkbox1 === 'true',
            amount: data.emi_amount,
            bounceAmount: data.bounce_amount1,
            delayDays: data.payment_days1,
            lateCharge: data.late_payment_emi1,
            total: data.total_emi1,
          },
          {
            id: 'emi2',
            date: data.emi_date2,
            status: data.emi_class2,
            statusLabel: data.status_label2,
            check: data.checkbox2 === 'true',
            amount: data.emi_amount,
            bounceAmount: data.bounce_amount2,
            delayDays: data.payment_days2,
            lateCharge: data.late_payment_emi2,
            total: data.total_emi2,
          },
          {
            id: 'emi3',
            date: data.emi_date3,
            status: data.emi_class3,
            statusLabel: data.status_label3,
            check: data.checkbox3 === 'true',
            amount: data.emi_amount,
            bounceAmount: data.bounce_amount3,
            delayDays: data.payment_days3,
            lateCharge: data.late_payment_emi3,
            total: data.total_emi3,
          },
        ];


        setEmiData(newEmiData);
        const selectedByApi = newEmiData.filter(item => item.check).map(item => item.id);
        setLockedExpandedIds(selectedByApi);
        setSelectedIds(selectedByApi);
        if (selectedByApi.length > 0) {
          setExpandedId(selectedByApi[0]);  // or expand all using array if needed
        }


      })
      .catch(err => {
        console.error("Loan fetch error:", err);
        setShowLoader(false);
      });
  };



  // const showbutton = () => {
  //   if (data?.application_status === "Disbursed") {

  //   }
  // }



  const payment = () => {
    return (
      <View
        style={{
          position: 'absolute',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'rgba(0,0,0,0.6)',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0
        }}>

        <View style={{ height: "30%", width: '80%', backgroundColor: 'white', justifyContent: "center", alignItems: "center", borderWidth: 2, borderRadius: 6, borderColor: '#B53059' }}>
          <TouchableOpacity
            onPress={() => setShowPaymentPopup(false)}
            style={{ position: 'absolute', right: 6, top: 6 }}>
            <Image
              style={{ height: 20, width: 20 }}
              source={require('../../assests/closs.png')}
            />
          </TouchableOpacity>

          <Text style={styles.paymentText}>Payment Options</Text>

          <LinearButton
            onPress={() => {
              setShowPaymentPopup(false)
              // const emiAmount = three_month_emi? totalSelectedEmi : data?.collection_amount;
              const emiAmount = three_month_emi ? Math.round(totalSelectedEmi) : Math.round(data?.collection_amount);
              console.log("emiAmount", emiAmount)
              const orderId = data?.order_id.split('-')[2];
              console.log(orderId)
              props.navigation.navigate('IciciPaymentPage', {
                user_id: data?.user_id,
                order_id: orderId,
                // emiAmount: data?.collection_amount
                emiAmount: emiAmount
              })
            }}
            // title={'ICICI Gateway'}
            title={'ICICI Upi'}
            width={170}
            marginTop={20}
          />


        </View>
      </View>
    );
  }


  const repaymentDate = data?.repayment_date ? moment(data?.repayment_date, 'YYYY-MM-DD') : null;
  const todayDate = moment(); // Current date

  // If returnpayment_date exists, stop counting delay days
  const delayDays = repaymentDate && !data?.returnpayment_date
    ? todayDate.diff(repaymentDate, 'days')
    : 0;





  // const toggleAccordion = (id) => {
  //   setExpandedId(prev => (prev === id ? null : id));
  // };

  const toggleAccordion = (id) => {
    const isLocked = lockedExpandedIds.includes(id);

    // Don't allow closing if it's locked
    if (isLocked && expandedId === id) return;

    setExpandedId(prev => (prev === id ? null : id));
  };



  const getStatusColor = (status, label) => {
    if (status === 'paid' && label === 'Paid') return '#2ecc71';
    if (status === 'pending' && label === 'Over Due') return '#f1c40f';
    if (status === 'due' && label === 'Over Due') return '#e74c3c';
    return '#bdc3c7'; // default grey
  };

  const totalSelectedEmi = emiData
    .filter(item => selectedIds.includes(item.id))
    .reduce((sum, item) => sum + parseFloat(item.total || 0), 0)
    .toFixed(2); // Keep 2 decimal places


  return (
    <View style={styles.container} >

      <Header navigation={props.navigation} title={'Loan Active'} />
      {three_month_emi ? (
        <ScrollView style={threeStyles.container}>
          <View style={threeStyles.rowText}>
            <Text style={threeStyles.labelText}>Loan Amount: </Text>
            <Text style={threeStyles.valueText}>₹{data?.loan_amount}</Text>
          </View>

          <View style={threeStyles.rowText}>
            <Text style={threeStyles.labelText}>Loan Disbursed Date: </Text>
            <Text style={threeStyles.valueText}>{moment(data?.disbursed_date).format('DD MMM YYYY')}</Text>
          </View>

          <View style={threeStyles.rowText}>
            <Text style={threeStyles.labelText}>Tenure: </Text>
            <Text style={threeStyles.valueText}>3 Months</Text>
          </View>

          <View style={threeStyles.rowText}>
            <Text style={threeStyles.labelText}>Total Repayable: </Text>
            <Text style={threeStyles.valueText}>₹{parseFloat(data?.total_repayable)}</Text>
          </View>


          {emiData.map(item => {
            const isChecked = selectedIds.includes(item.id);
            const toggleCheck = () => {
              if (item.check) return;
              if (isChecked) {
                setSelectedIds(prev => prev.filter(id => id !== item.id));
              } else {
                setSelectedIds(prev => [...prev, item.id]);
              }
            };
            return (
              <View key={item.id} style={threeStyles.cardWrapper}>
                <View style={threeStyles.cardRow}>
                  {/* Status indicator on the left */}
                  <View style={threeStyles.statusLineWrapper}>
                    <View
                      style={[
                        threeStyles.statusIndicator,
                        { backgroundColor: getStatusColor(item.status, item.statusLabel) },
                      ]}
                    />
                  </View>

                  {/* Main card content */}
                  <View style={threeStyles.cardContentWrapper}>
                    <TouchableOpacity
                      onPress={() => toggleAccordion(item.id)}
                      style={threeStyles.cardHeader}
                    >
                      <Text style={threeStyles.dateText}>{item.date}</Text>

                      <View style={threeStyles.statusContainer}>

                        {item.status !== 'paid' && (<CustomCheckBox isChecked={isChecked} onToggle={toggleCheck} />)}
                        <Text style={[threeStyles.statusText, { color: getStatusColor(item.status, item.statusLabel), marginLeft: 6 }]}>{item.statusLabel}</Text>
                      </View>
                    </TouchableOpacity>

                    {expandedId === item.id && (
                      <View style={threeStyles.cardContent}>
                        <View style={threeStyles.rowText}>
                          <Text style={threeStyles.labelText}>EMI Amount: </Text>
                          <Text style={threeStyles.valueText}>₹{item.amount}</Text>
                        </View>

                        {item.bounceAmount > 0 && (
                          <View style={threeStyles.rowText}>
                            <Text style={threeStyles.labelText}>Bounce Amount: </Text>
                            <Text style={threeStyles.valueText}>₹{item.bounceAmount}</Text>
                          </View>
                        )}
                        {item.delayDays > 0 && (
                          <View style={threeStyles.rowText}>
                            <Text style={threeStyles.labelText}>Delay Days: </Text>
                            <Text style={threeStyles.valueText}>{item.delayDays} days</Text>
                          </View>
                        )}

                        {item.lateCharge > 0 && (
                          <View style={threeStyles.rowText}>
                            <Text style={threeStyles.labelText}>Late Payment Charge: </Text>
                            <Text style={threeStyles.valueText}>₹{item.lateCharge}</Text>
                          </View>
                        )}
                        <View style={[threeStyles.rowText, threeStyles.total]}>
                          <Text style={threeStyles.labelText}>Total EMI: </Text>
                          <Text style={threeStyles.valueText}>₹{item.total}</Text>
                        </View>
                      </View>
                    )}

                  </View>
                </View>
              </View>
            )
          })}

          <View style={threeStyles.cardFooterWrapper}>
            <View style={threeStyles.footer}>
              <Text style={threeStyles.labelTextFooter}>Total EMI Amount:</Text>
              <Text style={threeStyles.valueText}> ₹{totalSelectedEmi}</Text>
            </View>
          </View>


          {data?.application_status == "Disbursed" || data?.application_status == "Settled" || data?.application_status == "Defaulter" ?
            <LinearButton
              onPress={() => setShowPaymentPopup(true)}
              title={'Pay Now'}
              width={150}
              marginTop={50}
            />
            :
            <Text style={{ color: "#fff" }}>Hello</Text>
          }
        </ScrollView>) : (
        <ScrollView style={{ flex: 1, backgroundColor: 'white', padding: 20, }}>

          {/* <Loader showLoader={showLoader} /> */}
          {showLoader && (
            <View
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <View
                style={{
                  height: 100,
                  width: 100,
                  backgroundColor: "#d9d9d9",
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <ActivityIndicator color={'white'} size={'large'} />
              </View>
            </View>
          )}
          <View
            style={{
              width: '100%',
              borderColor: 'green',
              borderWidth: 2,
              borderRadius: 8,
              padding: 8,
              marginTop: 20,

            }}>
            <View style={styles.field}>
              <Text style={styles.fieldText}>Reference ID</Text>
              <Text style={styles.fieldText1}>
                {data?.order_id + ' '}
              </Text>
            </View>
            <View style={{ width: "100%", borderWidth: 0.2, opacity: 0.2 }}></View>
            <View style={styles.field}>
              <Text style={styles.fieldText}>Loan Amount Applied</Text>
              <Text style={styles.fieldText1}>
                ₹ {data?.loan_amount + ' '}
              </Text>
            </View>
            <View style={{ width: "100%", borderWidth: 0.2, opacity: 0.2 }}></View>
            <View style={{ width: "100%", borderWidth: 0.2, opacity: 0.2 }}></View>
            <View style={styles.field}>
              {/* <Text style={[styles.fieldText, { color: '#596FB7' }]}>Loan Applied Date</Text> */}
              <Text style={[styles.fieldText, { color: '#596FB7' }]}>Loan Availed Date</Text>
              <Text style={[styles.fieldText1, { color: '#596FB7' }]}>
                {/* {moment(data?.disbursed_date).format('DD-MM-YYYY') + ' ' ? Null : moment(data?.disbursed_date).format('DD-MM-YYYY') + ' '} */}
                {data?.applied_date ? moment(data?.applied_date).format('DD-MM-YYYY') : moment(data?.date_created).format('DD-MM-YYYY')}
              </Text>
            </View>
            <View style={{ width: "100%", borderWidth: 0.2, opacity: 0.2 }}></View>
            <View style={styles.field}>
              <Text style={[styles.fieldText, { color: '#596FB7' }]}>Loan Due Date</Text>
              <Text style={[styles.fieldText1, { color: '#596FB7' }]}>
                {data?.applied_date ? moment(data?.repayment_date).format('DD-MM-YYYY') : moment(data?.date_created).format('DD-MM-YYYY')}
              </Text>
            </View>
            <View style={{ width: "100%", borderWidth: 0.2, opacity: 0.2 }}></View>

            <View style={styles.field}>
              <Text style={styles.fieldText}>EMI Amount</Text>
              <Text style={styles.fieldText1}>
                ₹ {parseFloat(data?.loan_amount || 0) + parseFloat(data?.total_interest || 0)}
              </Text>
            </View>
            <View style={{ width: "100%", borderWidth: 0.2, opacity: 0.2 }}></View>
            <View style={styles.field}>
              <Text style={styles.fieldText}>Delay Days</Text>
              <Text style={styles.fieldText1}>
                {data?.days + ' ' ? data?.days + ' ' : Null}
              </Text>
            </View>
            <View style={{ width: "100%", borderWidth: 0.2, opacity: 0.2 }}></View>
            <View style={styles.field}>
              <Text style={styles.fieldText}>Late Payment Charge</Text>
              <Text style={styles.fieldText1}>
                {/* {data?.fine_amount ?? '-'} */}
                {data?.late_amt + ' '}
              </Text>
            </View>
            <View style={{ width: "100%", borderWidth: 0.2, opacity: 0.2 }}>

            </View>
            <View style={styles.field}>
              <Text style={styles.fieldText}>Bounce Amount</Text>
              <Text style={styles.fieldText1}>
                {/* {data?.fine_amount ?? '-'} */}
                {data?.check_bounce_amount + ''}
              </Text>
            </View>
            <View style={{ width: "100%", borderWidth: 0.2, opacity: 0.2 }}></View>
            <View style={styles.field}>
              <Text style={styles.fieldText}>Overdue Amount</Text>
              <Text style={styles.fieldText1}>{parseFloat(data?.balance_amount || 0)}</Text>
            </View>
            <View style={{ width: "100%", borderWidth: 0.2, opacity: 0.2 }}></View>
            <View style={styles.field}>
              <Text style={styles.fieldText}>Received Payment</Text>
              <Text style={styles.fieldText1}>
                {data?.return_amount}
              </Text>
            </View>
            <View style={{ width: "100%", borderWidth: 0.2, opacity: 0.2 }}></View>
            <View style={styles.field}>
              <Text style={styles.fieldText}>Rebate Amount</Text>
              <Text style={styles.fieldText1}>{data?.rebate_data}</Text>
            </View>
            <View style={{ width: "100%", borderWidth: 0.2, opacity: 0.2 }}></View>
            <View style={styles.field}>
              <Text style={styles.fieldText}>Balance Amount</Text>
              <Text style={styles.fieldText1}>
                ₹ {data?.collection_amount + ' ' ? data?.collection_amount + ' ' : Null}
              </Text>
            </View>
            <View style={{ width: "100%", borderWidth: 0.2, opacity: 0.2 }} /><View>
              <Text style={{ color: "#fff" }}>hii</Text>
            </View>
          </View>

          {data?.application_status == "Disbursed" || data?.application_status == "Settled" || data?.application_status == "Defaulter"
            ?
            <LinearButton
              onPress={() => setShowPaymentPopup(true)}
              title={'Pay Now'}
              width={150}
              marginTop={50}
            />
            :
            <Text style={{ color: "#fff" }}>Hello</Text>
          }
          <View style={{ width: '100%', height: 100, }}></View>

        </ScrollView>)}



      {showPaymentPopup && payment()}

    </View>




  );
};
export default LoanDetailsActive;
