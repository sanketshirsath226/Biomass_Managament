import { useState} from 'react';
import { Drawer } from 'react-native-paper';
import {Platform, StatusBar, StyleSheet} from "react-native";
import Spacing from "../constants/Spacing";

const NavDrawer = () => {
  const [active, setActive] = useState("")
  const navBarElement = [
      {
          name : "Dashboard",
          navigate : "Dashboard"
      },
      {
          name : "Prediction",
          navigate : "Prediction"
      },
      {
          name : "Map",
          navigate : "Map"
      },
      {
          name : "Profile",
          navigate : "Profile"
      },
      {
          name : "History",
          navigate : "History"
      }
  ];

  const renderElement = navBarElement.map((element,index)=>{
      return (
          <Drawer.Item
              key={index}
              label={element.name}
              active={active === element.name}
              onPress={() => setActive(element.name)}
          />
      )
  })
  return (
    <Drawer.Section  style={styles.drawerContainer}>
        {renderElement}
    </Drawer.Section>
  );
};


const styles = StyleSheet.create({
    drawerContainer : {
            flex : 1,
            width : '75%',
            paddingTop: Platform.OS === "android" ? StatusBar.currentHeight + Spacing : null,
            backgroundColor: '#f8f8f8',
    }
})
export default NavDrawer;
