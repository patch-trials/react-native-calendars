import React, {Component} from 'react';
import {TouchableOpacity, Text} from 'react-native';
import PropTypes from 'prop-types';

import ProgressCircle from 'react-native-progress-circle';
import styleConstructor from './style';
import {shouldUpdate} from '../../../component-updater';


function ProgressIndicator(props) {
    const {showProgress, indicatorStyle, children} = props;

    // console.log('in progressIndicator:', showProgress, indicatorStyle)
    return (
        <>
            {showProgress ? 
            (<ProgressCircle
                percent={indicatorStyle.progress}
                radius={indicatorStyle.width/2}
                borderWidth={indicatorStyle.borderWidth}
                containerStyle={indicatorStyle.containerStyle}
                outerCircleStyle = {indicatorStyle.outerCircleStyle}
                color={indicatorStyle.progress >= 100 ? indicatorStyle.completeColor : indicatorStyle.incompleteColor}
                shadowColor={indicatorStyle.progress >= 100 ? indicatorStyle.completeColor : indicatorStyle.incompleteColor}
                bgColor={indicatorStyle.progress >= 100 ? indicatorStyle.completeColor : indicatorStyle.incompleteColor}
                // bgColor={indicatorStyle.backgroundColor}
                >
                {children}
             </ProgressCircle>)
             :
             (
                 <>
             {children}
                 </>
             )
            }
        </>
    );
}

export default ProgressIndicator;
