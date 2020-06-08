import React, {Component} from 'react';
import {TouchableOpacity, Text} from 'react-native';
import PropTypes from 'prop-types';

import ProgressCircle from 'react-native-progress-circle';
import styleConstructor from './style';
import {shouldUpdate} from '../../../component-updater';


function ProgressIndictor(props) {
    const {showProgress, indictorStyle, children} = props;

    console.log('in progressIndictor:', showProgress, indictorStyle)
    return (
        <>
            {showProgress ? 
            (<ProgressCircle
                percent={indictorStyle.progress}
                radius={indictorStyle.width/2}
                borderWidth={indictorStyle.borderWidth}
                containerStyle={indictorStyle.containerStyle}
               outerCircleStyle = {indictorStyle.outerCircleStyle}
                color={indictorStyle.color}
                shadowColor={indictorStyle.backgroundColor}
                bgColor={indictorStyle.backgroundColor}
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

export default ProgressIndictor;
