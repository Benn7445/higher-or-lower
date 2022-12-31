import { Text, View } from "react-native"

const Credits = () => {
    return (
        <View style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "white"
        }}>
            <Text style={{fontSize: 24, fontWeight: "bold", paddingBottom:50}}>
                This app was created by the following:
            </Text>
            <Text style={{fontSize: 16}}>Atif Khalil</Text>
            <Text style={{fontSize: 16}}>Dennis Matheeuzen</Text>
            <Text style={{fontSize: 16}}>Ben Verbraecken</Text>
            <Text style={{fontSize: 24, fontWeight: "bold", paddingTop:50}}>Thank you for playing!</Text>
        </View>
    )
}

export default Credits;