import { useState} from 'react';
import { Drawer } from 'react-native-paper';
import {Platform, StatusBar, StyleSheet} from "react-native";
import Spacing from "../constants/Spacing";
import ProfileCard from "./ProfileCard";
// import ProfileCard from "./ProfileCard";

const NavDrawer = ({route , navigation}) => {
  const [active, setActive] = useState("")
  const {navBarElement} = route.params

  const renderElement = navBarElement.map((element,index)=>{
      return (
          <Drawer.Item
              key={index}
              label={element.name}
              active={active === element.name}
              rippleColor = "#D5F0C1"
              onPress={() => {navigation.navigate(element.navigate)}}
          />
      )
  })
  return (
      <>
          <ProfileCard/>
          <Drawer.Section  style={styles.drawerContainer} >
              {renderElement}
          </Drawer.Section>
      </>

  );
};


const styles = StyleSheet.create({
    drawerContainer : {
            flex : 1,
            marginTop : '10%',
            width : '100%',
            paddingTop: Platform.OS === "android" ? StatusBar.currentHeight + Spacing : null,
            backgroundColor: '#f8f8f8',
    }
})
export default NavDrawer;
