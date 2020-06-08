import React, {Component} from 'react';
import {TouchableOpacity, Text} from 'react-native';
import PropTypes from 'prop-types';

import ProgressIndictor from './progressCircle';
import styleConstructor from './style';
import {shouldUpdate} from '../../../component-updater';


class Day extends Component {
  static displayName = 'IGNORE';
  
  static propTypes = {
    // TODO: disabled props should be removed
    state: PropTypes.oneOf(['selected', 'disabled', 'today', '']),
    // Specify theme properties to override specific styles for calendar parts. Default = {}
    theme: PropTypes.object,
    marking: PropTypes.any,
    onPress: PropTypes.func,
    onLongPress: PropTypes.func,
    date: PropTypes.object
  };

  constructor(props) {
    super(props);

    this.style = styleConstructor(props.theme);

    this.onDayPress = this.onDayPress.bind(this);
    this.onDayLongPress = this.onDayLongPress.bind(this);
  }

  onDayPress() {
    this.props.onPress(this.props.date);
  }
  onDayLongPress() {
    this.props.onLongPress(this.props.date);
  }

  shouldComponentUpdate(nextProps) {
    return shouldUpdate(this.props, nextProps, ['state', 'children', 'marking', 'onPress', 'onLongPress']);
  }

  render() {
    let containerStyle = [this.style.base];
    let textStyle = [this.style.text];
    
    let marking = this.props.marking || {};
    if (marking && marking.constructor === Array && marking.length) {
      marking = {
        marking: true
      };
    }

    let showIndictor = false
    let indictorStyle = {}

    const isDisabled = typeof marking.disabled !== 'undefined' ? marking.disabled : this.props.state === 'disabled';
    
    if (marking.selected) {
      containerStyle.push(this.style.selected);
      textStyle.push(this.style.selectedText);
    } else if (isDisabled) {
      textStyle.push(this.style.disabledText);
    } else if (this.props.state === 'today') {
      containerStyle.push(this.style.today);
      textStyle.push(this.style.todayText);
    }

    if (marking.customStyles && typeof marking.customStyles === 'object') {
      const styles = marking.customStyles;
      if (styles.container) {
        if (styles.container.borderRadius === undefined) {
          styles.container.borderRadius = 16;
        }
        containerStyle.push(styles.container);
      }
      if (styles.text) {
        textStyle.push(styles.text);
      }
      if (styles.showIndictor){
        showIndictor = styles.showIndictor
      }
      if(styles.indictorStyle){
        indictorStyle = styles.indictorStyle
      }
    }

    return (
      <ProgressIndictor 
        showProgress = {showIndictor}
        indictorStyle = {indictorStyle}
      >
        <TouchableOpacity
          testID={this.props.testID}
          style={containerStyle}
          onPress={this.onDayPress}
          onLongPress={this.onDayLongPress}
          activeOpacity={marking.activeOpacity}
          disabled={marking.disableTouchEvent}
          accessibilityRole={isDisabled ? undefined : 'button'}
          accessibilityLabel={this.props.accessibilityLabel}
        >

            <Text allowFontScaling={false} style={textStyle}>{String(this.props.children)}</Text>
        </TouchableOpacity>
      </ProgressIndictor>
    );
  }
}

export default Day;
