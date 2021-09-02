import React, {Component} from "react";
import { StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import { BarCodeScanner } from "expo-barcode-scanner";
import * as Permissions from "expo-permissions"

export default class Transactions extends Component {

    constructor(){
        super()
        this.state ={
            hasCameraPermissions: null,
            scan: false,
            scanData: "",
            btnState: "normal",
        }
    }

    getCameraPermission = async()=>{
        const {status} = await Permissions.askAsync(Permissions.CAMERA)
        this.setState({
        hasCameraPermissions: status === "granted",
        btnState:"clicked"
    })
    }

    handleBarCodeScanned = async({type,data})=>{
        this.setState({
            scan : true,
            scanData : data,
            btnState: "normal"
        })
    }

    render(){
        const hasCameraPermissions = this.state.hasCameraPermissions
        const scan = this.state.scan 
        const btnState = this.state.btnState

         if (btnState === "clicked" && hasCameraPermissions){

        return(
            <BarCodeScanner 
            onBarCodeScanned = {scan ? undefined : this.handleBarCodeScanned}
            /> 
           )
        }  else if(btnState === "normal"){
            return(
            <View style={styles.container}>
                <Text>
                    {hasCameraPermissions === true ? this.state.scanData:"requestCameraPermission"}
                </Text>
                  
                <TouchableOpacity style={styles.scanbtn} 
                  onPress={this.getCameraPermission}> 
                    Scan QR code of book
                </TouchableOpacity>

            </View>
        )
       }
    }
}

const styles = StyleSheet.create({
     scanbtn:{
         backgroundColor: "blue",
         marginTop: 20
     },

    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });