import React from 'react';
import PropTypes from 'prop-types';
import Ripple from 'react-native-material-ripple';
import styles from './style';
import {View, Text, Image} from 'react-native';
import {isEmpty} from 'lodash';
import ActionSheet from './ActionSheetCustom';

const CANCEL_INDEX = 0;
const DESTRUCTIVE_INDEX = 0;
class Dropdown extends React.Component {
  static propTypes = {
    options: PropTypes.any.isRequired,
    headerTilte: PropTypes.string.isRequired,
    cancelButton: PropTypes.string,
    subHeader: PropTypes.string,
    disabled: PropTypes.bool,
    borderStyle: PropTypes.object,
    textStyle: PropTypes.object,
    iconStyle: PropTypes.object,
    showArrowIcon: PropTypes.bool,
    onSelect: PropTypes.func,
    containerStyle: PropTypes.any,
    labelStyle: PropTypes.any,
    label: PropTypes.any,
    placeholderText: PropTypes.string,
    placeHolderStyle: PropTypes.any,
  };

  static defaultProps = {
    options: [],
    headerTilte: 'List of Items',
    cancelButton: 'Cancel',
    subHeader: 'No data Available',
    disabled: false,
    borderStyle: {},
    textStyle: {},
    iconStyle: {},
    showArrowIcon: true,
    onSelect: () => {},
    containerStyle: {},
    labelStyle: {},
    label: '',
    placeholderText: 'Select Option', // 'Select Option'
    placeHolderStyle: {},
  };
  constructor(props) {
    super(props);

    this.state = {
      selected: {},
      selectedText: '',
      focused: false,
    };
    this.updateDropdownList();
  }

  componentDidMount() {}
  componentDidUpdate() {
    this.updateDropdownList();
  }

  updateDropdownList = () => {
    this.subHeader = '';
    this.options = [...this.props.options];
    this.options.unshift({title: this.props.cancelButton});

    if (this.options.length < 2) {
      this.subHeader = this.props.subHeader;
    }
  };

  showActionSheet = () => {
    this.ActionSheet.show();
    let focused = true;
    this.setState({focused: focused}, () => {});
  };

  handlePress = (buttonIndex) => {
    let focused;
    if (buttonIndex != 0) {
      let selectedValue = this.options[buttonIndex].title;
      this.setState({
        selected: this.options[buttonIndex],
        selectedText: selectedValue,
      });
      this.props.onSelect(this.options[buttonIndex]);
    } else {
      this.props.onSelect(this.options[buttonIndex].title);
    }
    if (buttonIndex > 0) {
      // as 0 index is for cancel button
      focused = true;
    } else {
      if (this.state.selectedText != '') {
        focused = true;
      } else {
        focused = false;
      }
    }
    this.setState({focused: focused});
  };

  checkObject = (obj) => {
    return Object.keys(obj).length === 0;
  };

  render() {
    return (
      <View style={styles.container}>
        <Ripple
          style={[styles.defaultButton]}
          disabled={this.props.disabled}
          onPress={this.showActionSheet}>
          <Text
            style={[
              styles.defaultText,
              this.props.textStyle,
              isEmpty(this.state.selectedText) && this.props.placeHolderTextStyle,
            ]}>
            {!this.checkObject(this.state.selectedText)
              ? this.state.selectedText
              : this.props.label == ''
              ? this.props.placeholderText
              : ''}
          </Text>
            <Image
              style={{height: 20, width: 20, position: 'absolute', right: 6, top: 10}}
              source={require('../../assests/downArrow.png')}
            />
        </Ripple>
        <ActionSheet
          ref={o => {
            this.ActionSheet = o;
          }}
          title={this.props.headerTilte}
          message={this.subHeader}
          options={this.options}
          cancelButtonIndex={CANCEL_INDEX}
          destructiveButtonIndex={DESTRUCTIVE_INDEX}
          onPress={this.handlePress}
          titleBox={this.props.titleBox}
        />
      </View>
    );
  }
}

export default Dropdown;
