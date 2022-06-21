import React ,{useState, useEffect } from 'react'
import { 
    onSnapshot ,collection,doc,updateDoc,where,query , deleteDoc , deleteField
} from 'firebase/firestore'
import AddModal from './Modal';
import VisibilityRoundedIcon from '@mui/icons-material/VisibilityRounded';
import PasswordModal from './PasswordModal';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getAuth , signOut,onAuthStateChanged } from 'firebase/auth';
import { useNavigate } from 'react-router';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Collapse from '@mui/material/Collapse';
import ModeEditRoundedIcon from '@mui/icons-material/ModeEditRounded';
import DoneRoundedIcon from '@mui/icons-material/DoneRounded';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import Box from '@mui/material/Box';
import { Grid } from '@mui/material';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import { blueGrey } from '@mui/material/colors';




export default function Home(props) {
    //handle states of add info modal
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    //handle states of password modal
    const [showPassword,setShowPassword] = useState('');
    const [passopen, setPassOpen] = React.useState(false);
    const handlePassOpen = (password) => {
        setShowPassword(password);
        setPassOpen(true);
    }
    const handlePassClose = () => setPassOpen(false);

    //handle states of edit
    const [editOpen, setEditOpen] = useState(false);
    const handleEditOpen = () => setEditOpen(true);
    const handleEditClose = () => setEditOpen(false);

    //edit
    const [editId,setEditId] = useState(null);

    //genmodal handles
    const [genOpen, setGenOpen] = useState(false);
    const handleGenOpen = () => setGenOpen(true);
    const handleGenClose = () => setGenOpen(false);

    let userHash = localStorage.getItem('userHash')
    let auth = getAuth();
    let navigate = useNavigate();
   
    const collectionRef = collection(props.database,'userpasswords');
    const emailQuery = query(collectionRef,where('password','==',userHash))

    

    const [passwordsArray , setPasswordsArray] = useState([]);
    const [passwordObject,setPasswordObject] = useState({});
    const [oldPasswords , setOldpasswords] = useState([]);
    const [editPasswordObject , setEditPasswordObject] = useState({});
    const [editPasswords , setEditPasswords] = useState([]);

    //cryptography section

    let forge = require('node-forge');
    function hash(plainpass){
        var sha = forge.md.sha256.create();
        sha.update(plainpass);
    
        return (sha.digest().toHex());
    }

    function generateKey(){
        const email = sessionStorage.getItem('userEmail');

        const salt = hash(email);
        const derivedKey = forge.pkcs5.pbkdf2(userHash, salt, 4 , 32);//32 is given for 256-bit key

        return derivedKey
    }

    function encryptAES(password){
        const key = generateKey();

        
        const cipher = forge.cipher.createCipher('AES-ECB', key);
        //cipher.start({iv:''});
        cipher.start();
        cipher.update(forge.util.createBuffer(password));
        cipher.finish();

        var encrypted = cipher.output;
       
        encrypted=forge.util.encode64(encrypted.getBytes());
       
        return encrypted;

    }

    function decryptAES(password){
        const key = generateKey();

        const decipher = forge.cipher.createDecipher('AES-ECB',key);
        decipher.start();
        decipher.update(forge.util.createBuffer(forge.util.decode64(password)));
        decipher.finish();

        var decrypted = decipher.output;
        decrypted=forge.util.encodeUtf8(decrypted.getBytes())
        
        return decrypted;

    }
  

    //end of crypto section

    const getPasswords = ()=>{
        onSnapshot(emailQuery,(response)=>{
            setPasswordsArray(response.docs.map((item)=>{
                return {...item.data(),id:item.id}
            }))
            const data = response.docs.map((item)=>{
                return { ...item.data(),id:item.id}
            })
           

            setOldpasswords(data[0].passwordsArray)
           
            
        })
    }
    const handleModalInputs = (event) =>{
        let data ;
        if(event.target.name==='password'){
            
            data = {[event.target.name]:encryptAES(event.target.value)}
           
        }else{
            data = {[event.target.name]:event.target.value}
        }
        
        setPasswordObject({...passwordObject,...data});
        
    }

    const Alert = React.forwardRef(function Alert(props, ref) {
        return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
      });
    
      const [alertopen , setAlertopen] = useState(false);
      const handleAlertClose =()=>{
       setAlertopen(false) 
      }

    const addPasswords = () =>{
        setAlertopen(true);
        const docTOUpdate = doc(props.database, 'userpasswords' , passwordsArray[0].id)
        updateDoc(docTOUpdate,{
            passwordsArray:[...oldPasswords,passwordObject]
        })
    }

   

    const logOut=()=>{
        signOut(auth)
        .then(()=>{
            localStorage.removeItem('userEmail')
            navigate('/')
        })
        .catch((error)=>{
            toast.error(error)
        })
    }

    useEffect(()=>{
        onAuthStateChanged(auth,(response)=>{
            if(response){
                getPasswords()
            }else{
                navigate('/')
            }
        })
        
    },[])

    const [generatedPass,setGeneratedPass] = useState('$@&g#jhP6@H1Z&');

    const arrayOfLowChars=['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z']
    const arrayOfUpperChars= ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z']
    const arrayOfNumeric =['1','2','3','4','5','6','7','8','9','0']
    const arrayOfSpecial=['@','#','$','&']
    const all = [arrayOfLowChars,arrayOfUpperChars,arrayOfNumeric,arrayOfSpecial]
    const handleGenerate = () =>{
        let genPass = '';
        
        for(let i=0;i<14;i++){
            let ranarray = all[Math.floor(Math.random()*all.length)]
            genPass += ranarray[Math.floor(Math.random()*ranarray.length)]

        }
        setGeneratedPass(genPass);
        setGenOpen(true)
        
    }

    
    const deleteEntry = (password,deleteId) =>{
        
        // const docTOUpdate = doc(props.database, 'userpasswords' , passwordsArray[0].id)
        
        // updateDoc(docTOUpdate ,{
        //     passwordsArray:passwordsArray.filter((value)=>
        //         deleteId!==(value.name+value.email)
        //     )
        // })
       
    }
   
   

    function EditValuesForm(props){
        return (
            <><TableRow>
                <TableCell>
                    <TextField 
                    fullWidth 
                    required id="filled-basic" 
                    label="URL" 
                    name='name' 
                    variant="filled" 
                   
                    />
                </TableCell>
                <TableCell>
                    <TextField 
                    fullWidth 
                    required id="filled-basic" 
                    label="Username" 
                    name='email' 
                    variant="filled" 
                    
                    />
                </TableCell>
                <TableCell>
                    <TextField 
                        name='password'
                        fullWidth
                        required
                        id="filled-password-input"
                        label="Password"
                        type="password"
                        variant="filled"
                        
                    />
                </TableCell>
                <TableCell>
                    <CheckCircleRoundedIcon/>
                </TableCell>
                
            </TableRow>
                
            </>
        )
    }

    return (
        <>
        
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <Grid
        container
        direction="row"
        justifyContent="space-around"
        alignItems="center"
        sx={{boxShadow: 2,p:1}}
        >

  
   
        <Typography variant='h4'>Password Manager</Typography>
       <Button variant="outlined" color="error" onClick={logOut}>Log out</Button>
 
    </Grid>
    <Box
        m={1}
        //margin
        display="flex"
        justifyContent="flex-end"
        alignItems="flex-end"
        sx={{p:2,gap:2}}
  
    >
        <Button variant="contained" onClick={handleGenerate}>Generate</Button>
        <Button variant="contained" onClick={handleOpen}>Add</Button>
 
    </Box>

          <TableContainer sx={{ maxHeight: 600 }}>
          
        
          
    
      

         
            <Table stickyHeader aria-label="sticky table" 
               >
              <TableHead className='list-header'>
                <TableRow >
                    <TableCell
                    sx={{bgcolor:blueGrey[100]}}
                    >
                      URL
                    </TableCell>
                    <TableCell
                    sx={{bgcolor:blueGrey[100]}}
                    >
                      Username
                    </TableCell>
                    <TableCell
                 sx={{bgcolor:blueGrey[100]}}
                    >
                      Options
                    </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
             
              {(passwordsArray)?(passwordsArray.map((passwords)=>{
                        return (
                          <>
                          {(passwords)?passwords.passwordsArray.map((password)=>{
                                    return (
                                        <>
                                        {editId===(password.name+password.email)?
                                        <>
                                        <EditValuesForm />
                                        
                                        </>
                                        :
                                        <TableRow >   

                                            <TableCell >{password.name}</TableCell>
                                            <TableCell >{password.email}</TableCell>
                                            <TableCell >   
                                                    <VisibilityRoundedIcon
                                                        onClick={()=>{handlePassOpen(password.password)}}
                                                    />
                                                    <DeleteRoundedIcon onClick={deleteEntry(password,password.name+password.email)}/>
                                                    
                                            </TableCell>  
                                         </TableRow>
                                        }

                                    </>
                                    )
                                    
                                    
                                }):null}
                          </>
                                  
                        )
                    })):null}
              </TableBody>
            </Table>
          </TableContainer>
          
        </Paper>
                <AddModal 
                    open={open} 
                    handleClose={handleClose} 
                    handleModalInputs={handleModalInputs}
                    addPasswords={addPasswords}
                />
                <PasswordModal 
                    passopen={passopen} 
                    handlePassClose={handlePassClose}
                    password={decryptAES(showPassword)}
                    closepm={handlePassClose}
                    
                />
                <PasswordModal 
                    passopen={genOpen} 
                    handlePassClose={handleGenClose}
                    password={generatedPass}
                    closepm={handleGenClose}
                    
                />
            <Snackbar open={alertopen} autoHideDuration={3100} onClose={handleAlertClose}>
                <Alert onClose={handleAlertClose} severity="success" sx={{ width: '100%' }}>
                    Info added successfully
                </Alert>
      </Snackbar>
        </>
    )
}
