import { Modal, TextInput, Button, TouchableOpacity, Text } from "react-native"
import { useContext, useState } from "react"
import { AuthContext } from "../../../context/AuthContext"
import { PlantContext } from "../../../context/PlantContext"
import { useFormik } from 'formik'
import * as yup from 'yup'

function EditModal ({editModalVisible, setEditModalVisible, specificPlant }) {

    const { userToken } = useContext(AuthContext)
    const { userPlants, setUserPlants } = useContext(PlantContext)

    // const defaultFormObject = {
    //     id: specificPlant.id,
    //     image: '',
    // }

    // const [formObject, setFormObject] = useState(defaultFormObject)

    ////////////////////////////////////////////////
    ///////   Patch from Plant Details
    ////////////////////////////////////////////////

    const editDetailsFormSchema = yup.object().shape({
        uri : yup.string().url('Invalid URL')
    });

    const formik = useFormik({
        initialValues: {
            image: '',
        },
        validationSchema: editDetailsFormSchema,
        onSubmit: (values) => { 
            fetch (`https://customngrok.ngrok.app/plantsbyuser/${specificPlant.id}`,{
            method: "PATCH",
            headers: {
                "Content-type":"application/json",
                "Authorization": `Bearer ${userToken}`,
            },
            body: JSON.stringify(values)
        })
        .then(r=>r.json())
        .then(updatedPlant=>{
            setUserPlants(
                userPlants.map((eachPlant)=>{
                    if (eachPlant.id == updatedPlant.id){
                        return updatedPlant
                    } else{
                        return eachPlant
                    }
                }))
            }
        )
        .catch(error => {console.log(error)})

        setEditModalVisible(false)
        }
    });

    return(
        <Modal
            visible={editModalVisible}
            animationType="slide"
            onRequestClose={()=> setEditModalVisible(false)}
        >
            <TextInput 
                placeholder='New Image URL'
                onChangeText={formik.handleChange('image')}
                value = {formik.values.image}
            />
            {formik.touched.uri && formik.errors.uri && (
                <Text style={{ color: 'red' }}>{formik.errors.image}</Text>
            )}
            <Button 
                title = 'Submit Your Changes'
                onPress={formik.handleSubmit}
            />
            <TouchableOpacity key={specificPlant.id} onPress={()=>setEditModalVisible(false)}>
                <Text>Close</Text>
            </TouchableOpacity>
        </Modal>
    )
}

    // const handleEditSubmit = () => {
        
    //     fetch (`https://customngrok.ngrok.app/plantsbyuser/${formObject.id}`,{
    //         method: "PATCH",
    //         headers: {
    //             "Content-type":"application/json",
    //             "Authorization": `Bearer ${userToken}`,
    //         },
    //         body: JSON.stringify(formObject)
    //     })
    //     .then(r=>r.json())
    //     .then(updatedPlant=>{
    //         setUserPlants(
    //             userPlants.map((eachPlant)=>{
    //                 if (eachPlant.id == updatedPlant.id){
    //                     return updatedPlant
    //                 } else{
    //                     return eachPlant
    //                 }
    //             }))
    //         }
    //     )
    //     .catch(error => {console.log(error)})

    //     setEditModalVisible(false)
    // }

    // const handleInputChange = (id, text) => {
    //     setFormObject(()=>{return(
    //         {...formObject, [id]:text}
    //     )})
    // }

//     return(
//         <Modal
//             visible={editModalVisible}
//             animationType="slide"
//             onRequestClose={()=> setEditModalVisible(false)}
//         >
//             <TextInput 
//                 placeholder='New Image URL'
//                 onChangeText={(text)=>handleInputChange('image', text)}
//                 value = {formObject.image}
//             />
//             <Button 
//                 title = 'Submit Edit'
//                 onPress={handleEditSubmit}
//             />
//             <TouchableOpacity key={specificPlant.id} onPress={()=>setEditModalVisible(false)}>
//                 <Text>Close</Text>
//             </TouchableOpacity>
//         </Modal>
//     )
// }

export default EditModal





// return(
//     <View>
//         <TextInput
//             placeholder='username'
//             onChangeText={formik.handleChange('username')}
//             onBlur={formik.handleBlur('username')}
//             value= {formik.values.username}
//         >
//         </TextInput>
//         {formik.touched.username && formik.errors.username && (
//             <Text style={{ color: 'red' }}>{formik.errors.username}</Text>
//         )}
//         <TextInput
//             placeholder='password'
//             onChangeText={formik.handleChange('password')}
//             onBlue = {formik.handleBlur('password')}
//             value= {formik.values.password}
//         >
//         </TextInput>
//         {formik.touched.password && formik.errors.password && (
//             <Text style={{ color: 'red' }}>{formik.errors.password}</Text>
//         )}
//         <TextInput
//             placeholder='email'
//             onChangeText={formik.handleChange('email')}
//             onBlur={formik.handleBlur('email')}
//             value= {formik.values.email}
//         >
//         </TextInput>
//         {formik.touched.email && formik.errors.email && (
//             <Text style={{ color: 'red' }}>{formik.errors.email}</Text>
//         )}
//         <Button
//             title = 'Sign In'
//             onPress = {formik.handleSubmit}
//         />
//     </View>
// )
// }

