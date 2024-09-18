import { StatusBar, View ,Text,StyleSheet, TouchableOpacity,FlatList, Image} from "react-native";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';


export default function Inicial (){

  

const data = [
  { id: '1', title: 'Sobre Nós', icon: 'arrow-up-bold-circle-outline'  },
  { id: '2', title: 'Relatório', icon: 'file-chart' },
  { id: '3', title: 'Frota', icon: 'truck-delivery' },
  { id: '4', title: 'Calcular Emissão', icon: 'calculator' },
  { id: '5', title: 'Registrar Veículo', icon: 'book-open-page-variant' },
  { id: '6',icon: 'book-open-page-variant'
  
  
  },
];

    return(
        

    <View  style ={{ flex: 1 , }}>
            <View />

            <View

            style ={{
                width:"100%",
                height:230,
                padding:10,
                backgroundColor:"#87CE57",
                justifyContent:'space-around',
                borderBottomEndRadius: 20,
                borderBottomLeftRadius:20
              
               
                 
              
                
            }}
            >
<Text style={style.headerText}> PreservaHoje </Text>


        </View>



  


<View style={style.container}>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (



          <TouchableOpacity style={style.item}>
            <View style={style.iconContainer}>
              <Icon name={item.icon} size={30} color="#4CAF50" />
            </View>
            <Text style={style.itemTitle}>{item.title}</Text>
          </TouchableOpacity>



        )}
        numColumns={2}
      />
    </View>

        </View>
        
        
        
    
    )
}

const style = StyleSheet.create({

    headerText:{
        color:"black",
       textAlign:"left",
       marginLeft: "20px",
       marginTop:"30px"
        
    },
    container: {
        flex: 1,
        padding: 20,
      
      },
      item: {
        flex: 1,
        margin: 20,
        padding: 25,
        backgroundColor: '#fff',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
      },
      text: {
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
      },


      itemTitle: {
        fontSize: 16,
      },

      title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',},
        
        iconContainer: {
            width: 40,
            height: 40,
            borderRadius: 20,
            backgroundColor: '#e0f2f1',
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: 10,
          },
    
    
   
   
   

})