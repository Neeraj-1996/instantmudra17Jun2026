import React, { useEffect, useState } from "react";
import { Modal, View, Text, Button,Alert } from "react-native";
// import CheckBox from "@react-native-community/checkbox";
import CustomCheckBox from "../../components/Checkbox/Checkbox";
import { BackHandler } from "react-native";
import { BASE_URL } from "../../utils";
// import { baseUrl } from "../Url/baseUrl";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ReviewModal = ({ visible, onClose }) => {
  const [reasons, setReasons] = useState([]);
  const [selectedReasonId, setSelectedReasonId] = useState(null);

  useEffect(() => {
    const fetchReasons = async () => {
      try {
        const response = await axios.get(
          BASE_URL+"API/getReason"
        );
        if (response.data.status === true) {
          setReasons(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching reasons:", error);
      }
    };

    fetchReasons();
  }, []);
// for toggle cheqebox
  const handleCheckboxChange = (id) => {
    setSelectedReasonId((prev) => (prev === id ? null : id)); 
  };


const handleSubmit = async () => {
    const phone = await AsyncStorage.getItem('phone');
    // console.log('phoe',phone)
     const selectedReason = reasons.find((reason) => reason.id === selectedReasonId);
    if (!selectedReason) {
        Alert.alert("Pelase select a reason");
      return;
    }
    const payload = {
      phone: phone, 
      reason: selectedReason.name,
      msg: "msg", 
    };
    console.log("payload",payload);
    try {const response = await axios.post(
      BASE_URL+'API/reason',
        payload,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("API Response:", response.data);
      BackHandler.exitApp();
    } catch (error) {
      console.error("Error submitting reason:", error);
    }
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <View
        style={{
          flex: 1,
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <View
          style={{
            width: "80%",
            backgroundColor: "#fff",
            borderRadius: 8,
            padding: 16,
          }}
        >
          <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 16 }}>
            Why are you leaving?
          </Text>
          {reasons.map((reason) => (
            <View
              key={reason.id}
              style={{ flexDirection: "row", alignItems: "center", marginBottom: 8 }}
            >
              <CustomCheckBox
  isChecked={selectedReasonId === reason.id}
  onToggle={() => handleCheckboxChange(reason.id)}
/>
              {/* <CheckBox
                value={selectedReasonId === reason.id}
                onValueChange={() => handleCheckboxChange(reason.id)}
              /> */}
              <Text>{reason.name}</Text>
            </View>
          ))}
          <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 16 }}>
            <Button title="Submit" onPress={handleSubmit} />
            <Button title="Cancel" onPress={onClose}  color='#ff5733'/>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default ReviewModal;


// import React, { useState } from 'react';
// import { Modal, View, Text, StyleSheet, TouchableOpacity,BackHandler } from 'react-native';
// import CheckBox from '@react-native-community/checkbox';

// const ReviewModal = ({ visible, onClose }) => {
//   const [reasons, setReasons] = useState({
//     reason1: false,
//     reason2: false,
//     reason3: false,
//     reason4: false,
//   });

//   const toggleReason = (reason) => {
//     setReasons((prev) => ({ ...prev, [reason]: !prev[reason] }));
//   };

// //   const handleSubmit = () => {
// //     const selectedReasons = Object.entries(reasons)
// //       .filter(([_, isChecked]) => isChecked)
// //       .map(([reason]) => reason);
// //     console.log('Selected reasons:', selectedReasons); // Handle this as per your logic
// //     onClose();
// //   };
// const handleSubmit = () => {
//     // Handle form submission if needed
//     console.log('Reasons:', reasons);

//     // Exit the app
//     BackHandler.exitApp();
//   };


//   return (
//     <Modal visible={visible} transparent animationType="slide">
//       <View style={styles.container}>
//         <View style={styles.modalContent}>
//           <Text style={styles.title}>Why are you leaving?</Text>
//           <View style={styles.checkboxContainer}>
//             <CheckBox
//               value={reasons.reason1}
//               onValueChange={() => toggleReason('reason1')}
//             />
//             <Text style={styles.label}>Reason 1: Difficult to use</Text>
//           </View>
//           <View style={styles.checkboxContainer}>
//             <CheckBox
//               value={reasons.reason2}
//               onValueChange={() => toggleReason('reason2')}
//             />
//             <Text style={styles.label}>Reason 2: Not what I expected</Text>
//           </View>
//           <View style={styles.checkboxContainer}>
//             <CheckBox
//               value={reasons.reason3}
//               onValueChange={() => toggleReason('reason3')}
//             />
//             <Text style={styles.label}>Reason 3: Found a better app</Text>
//           </View>
//           <View style={styles.checkboxContainer}>
//             <CheckBox
//               value={reasons.reason4}
//               onValueChange={() => toggleReason('reason4')}
//             />
//             <Text style={styles.label}>Reason 4: Other reasons</Text>
//           </View>
//           <TouchableOpacity onPress={handleSubmit} style={styles.submitButton}>
//             <Text style={styles.buttonText}>Submit</Text>
//           </TouchableOpacity>
//           <TouchableOpacity onPress={onClose} style={styles.cancelButton}>
//             <Text style={styles.buttonText}>Cancel</Text>
//           </TouchableOpacity>
//         </View>
//       </View>
//     </Modal>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: 'rgba(0, 0, 0, 0.5)',
//   },
//   modalContent: {
//     width: '80%',
//     backgroundColor: 'white',
//     borderRadius: 10,
//     padding: 20,
//     alignItems: 'center',
//   },
//   title: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     marginBottom: 20,
//   },
//   checkboxContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 10,
//   },
//   label: {
//     fontSize: 16,
//     marginLeft: 8,
//   },
//   submitButton: {
//     backgroundColor: '#31519c',
//     padding: 10,
//     marginTop: 20,
//     borderRadius: 5,
//     width: '100%',
//     alignItems: 'center',
//   },
//   cancelButton: {
//     backgroundColor: 'red',
//     padding: 10,
//     marginTop: 10,
//     borderRadius: 5,
//     width: '100%',
//     alignItems: 'center',
//   },
//   buttonText: {
//     color: 'white',
//     fontSize: 16,
//   },
// });

// export default ReviewModal;
