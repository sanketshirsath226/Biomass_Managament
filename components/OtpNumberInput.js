import {StyleSheet, TextInput} from "react-native";
import Colors from "../constants/Colors";
import Spacing from "../constants/Spacing";
import fontSize from "../constants/FontSize";
import Font from "../constants/Font";
import {useState} from "react";

const OtpNumberInput = ({ ...otherProps }) => {
    const [focused, setFocused] = useState(false);
    return(
        <TextInput
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            maxLength={1} keyboardType={'numeric'} style={[
            {
            borderWidth: 2,
            textAlign : 'center',
            fontSize : fontSize.xLarge,
            borderColor: Colors.gray,
            color : Colors.darkText,
            lineHeight : Spacing,
            padding: Spacing * 2,
            borderRadius : Spacing * 2,
        },
            focused && {
                borderWidth: 3,
                borderColor: Colors.primary,
                shadowOffset: { width: 4, height: Spacing },
                shadowColor: Colors.primary,
                shadowOpacity: 0.2,
                shadowRadius: Spacing,
            }
        ]}
        />

    )
}

export default OtpNumberInput;

const styles = StyleSheet.create({});

