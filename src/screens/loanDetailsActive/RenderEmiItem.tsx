import React from "react";
import {
    View,
    Text,
    TouchableOpacity,
} from "react-native";

import GradientButton from "../../components/button/Button";
import CustomCheckbox from "../../components/checkbox/CustomCheckbox";
import {
    EmtyCheckCox,
    FillCheckBox,
} from "../../assets/images";

import { formatDateDMY } from "../../utils/globalFuntion";
import threeStyles from "./ThreeMonth.style";

interface Props {
    item: any;
    index: number;
    expandedIndex: number | null;
    selectedIndexes: number[];
    emiPaymentDetails: any;
    showPayButton: boolean;
    toggleAccordion: (index: number) => void;
    toggleSelect: (index: number) => void;
    handlePayNow: (item: any) => void;
}

const RenderEmiItem = ({
    item,
    index,
    expandedIndex,
    selectedIndexes,
    emiPaymentDetails,
    showPayButton,
    toggleAccordion,
    toggleSelect,
    handlePayNow,
}: Props) => {
    const isOpen = expandedIndex === index;
    const isSelected = selectedIndexes.includes(index);

    const applicationStatus =
        item?.application_status?.trim()?.toLowerCase() || "";

    const emiStatus =
        item?.emi_status?.trim()?.toLowerCase() || "";

    const isMultiEmi =
        emiPaymentDetails?.emi_data?.length > 0;

    const isSingleLoanCard =
        emiPaymentDetails?.data &&
        !emiPaymentDetails?.emi_data?.length;

    // ==========================
    // SINGLE LOAN CARD
    // ==========================
    if (isSingleLoanCard) {
        const canPay =
            applicationStatus === "disbursed" ||
            applicationStatus === "settled" ||
            applicationStatus === "defaulter";

        return (
            <View style={threeStyles.singleLoanCard}>
                <View style={threeStyles.field}>
                    <Text style={threeStyles.fieldText}>
                        Reference ID
                    </Text>
                    <Text style={threeStyles.fieldText1}>
                        {item?.order_id}
                    </Text>
                </View>

                <View style={threeStyles.separator} />

                <View style={threeStyles.field}>
                    <Text style={threeStyles.fieldText}>
                        Loan Amount
                    </Text>
                    <Text style={threeStyles.fieldText1}>
                        ₹ {item?.loan_amount}
                    </Text>
                </View>

                <View style={threeStyles.separator} />

                <View style={threeStyles.field}>
                    <Text style={threeStyles.fieldText}>
                        Interest Amount
                    </Text>
                    <Text style={threeStyles.fieldText1}>
                        ₹ {item?.interest_amount}
                    </Text>
                </View>

                <View style={threeStyles.separator} />

                <View style={threeStyles.field}>
                    <Text
                        style={[
                            threeStyles.fieldText,
                            threeStyles.highlightLabel,
                        ]}
                    >
                        Loan Availed Date
                    </Text>

                    <Text
                        style={[
                            threeStyles.fieldText1,
                            threeStyles.highlightValue,
                        ]}
                    >
                        {formatDateDMY(item?.disbursed_date)}
                    </Text>
                </View>

                <View style={threeStyles.separator} />

                <View style={threeStyles.field}>
                    <Text
                        style={[
                            threeStyles.fieldText,
                            threeStyles.highlightLabel,
                        ]}
                    >
                        Loan Due Date
                    </Text>

                    <Text
                        style={[
                            threeStyles.fieldText1,
                            threeStyles.highlightValue,
                        ]}
                    >
                        {formatDateDMY(item?.due_date)}
                    </Text>
                </View>

                <View style={threeStyles.separator} />

                <View style={threeStyles.field}>
                    <Text style={threeStyles.fieldText}>
                        Tenure Days
                    </Text>
                    <Text style={threeStyles.fieldText1}>
                        {item?.tenure_days}
                    </Text>
                </View>

                <View style={threeStyles.separator} />

                <View style={threeStyles.field}>
                    <Text style={threeStyles.fieldText}>
                        EMI Amount
                    </Text>
                    <Text style={threeStyles.fieldText1}>
                        ₹ {item?.emi_amount}
                    </Text>
                </View>

                <View style={threeStyles.separator} />

                <View style={threeStyles.field}>
                    <Text style={threeStyles.fieldText}>
                        Delay Days
                    </Text>
                    <Text style={threeStyles.fieldText1}>
                        {item?.delay_days}
                    </Text>
                </View>

                <View style={threeStyles.separator} />

                <View style={threeStyles.field}>
                    <Text style={threeStyles.fieldText}>
                        Late Payment Charge
                    </Text>
                    <Text style={threeStyles.fieldText1}>
                        ₹ {item?.late_payment_charge}
                    </Text>
                </View>

                <View style={threeStyles.separator} />

                <View style={threeStyles.field}>
                    <Text style={threeStyles.fieldText}>
                        Bounce Amount
                    </Text>
                    <Text style={threeStyles.fieldText1}>
                        ₹ {item?.bounce_amount}
                    </Text>
                </View>

                <View style={threeStyles.separator} />

                <View style={threeStyles.field}>
                    <Text style={threeStyles.fieldText}>
                        Overdue Amount
                    </Text>
                    <Text style={threeStyles.fieldText1}>
                        ₹ {item?.overdue_amount}
                    </Text>
                </View>

                <View style={threeStyles.separator} />

                <View style={threeStyles.field}>
                    <Text style={threeStyles.fieldText}>
                        Received Amount
                    </Text>
                    <Text style={threeStyles.fieldText1}>
                        ₹ {item?.received_amount}
                    </Text>
                </View>

                <View style={threeStyles.separator} />

                <View style={threeStyles.field}>
                    <Text style={threeStyles.fieldText}>
                        Rebate Amount
                    </Text>
                    <Text style={threeStyles.fieldText1}>
                        ₹ {item?.rebate_amount}
                    </Text>
                </View>

                <View style={threeStyles.separator} />

                <View style={threeStyles.field}>
                    <Text
                        style={[
                            threeStyles.fieldText,
                            threeStyles.totalLabel,
                        ]}
                    >
                        Total Payable Amount
                    </Text>

                    <Text
                        style={[
                            threeStyles.fieldText1,
                            threeStyles.totalValue,
                        ]}
                    >
                        ₹ {item?.total_payable_amount}
                    </Text>
                </View>

                {showPayButton && canPay && (
                    <TouchableOpacity
                        style={threeStyles.payButtonContainer}
                    >
                        <GradientButton
                            title={`Pay ₹${item?.total_payable_amount}`}
                            onPress={() =>
                                handlePayNow({
                                    balance:
                                        item?.total_payable_amount,
                                })
                            }
                        />
                    </TouchableOpacity>
                )}
            </View>
        );
    }

    // ==========================
    // MULTI EMI ACCORDION
    // ==========================

    const canPayMultiple =
        emiStatus === "pending" ||
        emiStatus === "overdue";

    const showCheckbox =
        showPayButton &&
        isMultiEmi &&
        canPayMultiple;

    const showPayEmiButton =
        showPayButton &&
        canPayMultiple &&
        !isSelected;

    return (
        <View
            key={index}
            style={threeStyles.cardWrapper}
        >
            <View style={threeStyles.cardRow}>
                <View style={threeStyles.statusLineWrapper}>
                    <View
                        style={[
                            threeStyles.statusIndicator,
                            {
                                backgroundColor:
                                    emiStatus === "paid"
                                        ? "green"
                                        : emiStatus === "pending"
                                            ? "orange"
                                            : emiStatus === "overdue"
                                                ? "red"
                                                : "gray",
                            },
                        ]}
                    />
                </View>

                <View style={threeStyles.cardContentWrapper}>
                    <TouchableOpacity
                        style={threeStyles.cardHeader}
                        onPress={() => toggleAccordion(index)}
                    >
                        <Text style={threeStyles.dateText}>
                            {formatDateDMY(item?.due_date)}
                        </Text>

                        <View
                            style={{
                                flexDirection: "row",
                                alignItems: "center",
                            }}
                        >
                            {showCheckbox && (
                                <CustomCheckbox
                                    value={isSelected}
                                    onChange={() =>
                                        toggleSelect(index)
                                    }
                                    checkedImage={FillCheckBox}
                                    uncheckedImage={EmtyCheckCox}
                                />
                            )}

                            <Text style={threeStyles.statusText}>
                                {item?.emi_status}
                            </Text>
                        </View>
                    </TouchableOpacity>

                    {isOpen && (
                        <View style={threeStyles.cardContent}>
                            <View style={threeStyles.rowText}>
                                <Text style={threeStyles.labelText}>
                                    EMI Amount:
                                </Text>

                                <Text style={threeStyles.valueText}>
                                    ₹{item?.emi_amount}
                                </Text>
                            </View>

                            {item?.delay_days > 0 && (
                                <View style={threeStyles.rowText}>
                                    <Text style={threeStyles.labelText}>
                                        Delay Days:
                                    </Text>

                                    <Text style={threeStyles.valueText}>
                                        {item?.delay_days} Days
                                    </Text>
                                </View>
                            )}

                            {item?.late_fine > 0 && (
                                <View style={threeStyles.rowText}>
                                    <Text style={threeStyles.labelText}>
                                        Late Fine:
                                    </Text>

                                    <Text style={threeStyles.valueText}>
                                        ₹{item?.late_fine}
                                    </Text>
                                </View>
                            )}

                            {item?.bounce_amount > 0 && (
                                <View style={threeStyles.rowText}>
                                    <Text style={threeStyles.labelText}>
                                        Bounce Amount:
                                    </Text>

                                    <Text style={threeStyles.valueText}>
                                        ₹{item?.bounce_amount}
                                    </Text>
                                </View>
                            )}

                            <View
                                style={[
                                    threeStyles.rowText,
                                    threeStyles.total,
                                ]}
                            >
                                <Text style={threeStyles.labelText}>
                                    Total:
                                </Text>

                                <Text style={threeStyles.valueText}>
                                    ₹
                                    {item?.balance ||
                                        item?.emi_amount}
                                </Text>
                            </View>

                            {showPayEmiButton && (
                                <TouchableOpacity
                                    style={
                                        threeStyles.payButtonContainer
                                    }
                                >
                                    <GradientButton
                                        title="Pay EMI"
                                        onPress={() =>
                                            handlePayNow(item)
                                        }
                                    />
                                </TouchableOpacity>
                            )}
                        </View>
                    )}
                </View>
            </View>
        </View>
    );
};

export default RenderEmiItem;