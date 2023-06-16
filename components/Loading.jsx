import { ActivityIndicator, View, Text} from "react-native"



export const Loading = ({action}) => {
    return (
        <View style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center"
        }}>
            <ActivityIndicator size="large" />
            <Text style={{color:"white", marginTop:10}}>{action}...</Text>
        
        </View>
    )
};