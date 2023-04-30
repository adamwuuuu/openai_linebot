import React,{ useState ,useEffect} from "react";
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import ATable from "../components/atable";
import {  useGridApiRef } from '@mui/x-data-grid';
import axios from "axios"

import FileUpload from "react-mui-fileuploader"

import { Loader, Placeholder } from 'rsuite'; 

export default function Pdf() {

    const [filename,setFilename]=useState(""); 
    const [filestate,setFilestate]=useState({
      selectedFile: null
    });
    const [filesToUpload, setFilesToUpload] = useState([])
    const [load,setLoad]=useState(false)
    const [rows,setRows]=useState([])
    const [gptrows,setGptrows]=useState([])
    const [loadtitle,setLoadtitle]=useState("")

    const apiRef = useGridApiRef();

    const handleFilesChange = (files) => {
      // Update chosen files
      setFilesToUpload([ ...files ])
    };

    const handleFileUploadError = (error) => {
      // Do something...
    }
  
    const uploadFiles = () => {
      // Create a form and post it to server
      setLoadtitle("上傳中.....")
      setLoad(true);
      let formData = new FormData()
      filesToUpload.forEach((file) => formData.append("files", file))
      axios.post("/pdf/upload",formData)
      .then((response)=>{
         let data=response.data;
         let res=[];
         let gptres=[];
         if(data.status){
           for(let i=0;i<data.question.length;i++){
             res.push({id:i+1,question:data.question[i],
              questionNumber:data.questionNumber[i],anwser:data.anwser[i]})
            //  gptres.push({id:i+1,questionNumber:data.questionNumber[i],gptanwser:data.gptanwser[i]})
           }
           setRows(res);
          //  setGptrows(gptres);
         }
         setLoad(false);
      })
      .catch((error)=>{
        console.log(error);
        setLoad(false);
        setRows([]);
        // setGptrows([]);
      })
    }

    const fileinput=(e)=>{
        setFilename(e.target.value);
        console.log(filename);
    }

    // On file select (from the pop up)
    const onFileChange = (e) => {
      setFilestate({ selectedFile: e.target.files[0] });
      console.log(filestate);
    };
     
    // On file upload (click the upload button)
    const onFileUpload = () => {
      // Create an object of formData
      const formData = new FormData();
      // Update the formData object
      formData.append(
        "myFile",
        setFilestate.selectedFile,
        setFilestate.selectedFile.name
      );
    }

    const askGPT=async(question)=>{
      return await axios.post("/api/askgpt",{question:question})
      .then((response)=>{
         let data=response.data;
         let ans=""
         if(data.status){
           ans=data.anwser
         }else{
           ans="No answer"
         }
         setLoad(false);
         return ans;
      })
      .catch((error)=>{
         setLoad(false);
         return `${error}`
      })
    };

    const askGptClick = (e, row) => {
      // e.stopPropagation();
      // const rowIds = apiRef.current.getAllRowIds();
      // const rowId = randomArrayItem(rowIds);
      setLoadtitle("ChatGPT回答中.....")
      setLoad(true);
      let updatedata=askGPT(row.question)
      apiRef.current.updateRows([{ id: row.id, gpt: updatedata}]);      
    };

    const columns = [
      { field: 'id', headerName: 'ID', width: 70 },
      { field: 'questionNumber', headerName: '題目編號', width: 70 },
      { field: 'question', headerName: '題目', width: 200 },
      {
        field: 'anwser',
        headerName: '答案',
        type: 'number',
        width: 130,
      },
      { field: 'askgpt', headerName: '點選', width: 200, renderCell: (params) => {
        return (
          <Button
            onClick={(e) => askGptClick(e, params.row)}
            variant="contained"
          >
            點選
          </Button>
        );
      }},
      {
        field: 'gpt',
        headerName: 'GPT回答',
        description: '',
        sortable: false,
        width: 130,
        valueGetter: (params) =>
          `${params.row.questionNumber || ''} ${params.row.question || ''}`,
      },
    ];

    const gpt_columns = [
      { field: 'id', headerName: 'ID', width: 70 },
      { field: 'questionNumber', headerName: '題目編號', width: 130 },
      { field: 'gptanwser', headerName: 'GPT答案', width: 230 },
      {
        field: 'comment',
        headerName: '備註',
        description: 'This column has a value getter and is not sortable.',
        sortable: false,
        width: 160,
        valueGetter: (params) =>
          `${params.row.questionNumber || ''} ${params.row.gptanwser || ''}`,
      },
    ];
    
    return(
        <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        { load ? (<Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
          }}
        ><Placeholder.Paragraph rows={8} />
        <Loader backdrop content={loadtitle} vertical /></Box>) : 
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
          }}
        >
          <Grid container  justifyContent="center" alignItems="center">
            <Typography variant="h5">
                PDF
            </Typography>
          </Grid>
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={4} lg={3}>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 500,
                  }}
                >
                 <FileUpload 
                   getBase64={false}
                   multiFile={true}
                   disabled={false}
                   title="選擇檔案"
                   header="[拖曳檔案]"
                   leftLabel="或者"
                   rightLabel=""
                   buttonLabel="選擇檔案"
                   buttonRemoveLabel="移除全部檔案"
                   maxFileSize={0}
                   maxUploadFiles={0}
                  //  maxFilesContainerHeight={357}
                   acceptedType={'pdf/*'}
                   errorSizeMessage={'fill it or remove it to use the default error message'}
                   allowedExtensions={['pdf']}
                   onFilesChange={handleFilesChange}
                   onError={handleFileUploadError}
                  //  imageSrc={'path/to/custom/image'}
                  //  BannerProps={{ elevation: 0, variant: "outlined" }}
                   showPlaceholderImage={true}
                   PlaceholderGridProps={{ md: 4 }}
                   LabelsGridProps={{ md: 8 }}
                   onContextReady={context => {
                     // access to component context here
                   }}
                   ContainerProps={{
                     elevation: 0,
                     variant: "outlined",
                     sx: { p: 1 }
                   }}
                   PlaceholderImageDimension={{
                     xs: { width: 128, height: 128 },
                     sm: { width: 128, height: 128 },
                     md: { width: 164, height: 164 },
                     lg: { width: 256, height: 256 }
                   }}
                 />
                 <Button variant="contained" onClick={uploadFiles}>上傳檔案</Button>      
                </Paper>
              </Grid>
              {/* Recent Deposits */}
              <Grid item xs={12} md={4} lg={3}>
                <Paper
                  sx={{
                    p: 3,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 500,
                  }}
                >
                </Paper>
              </Grid>
              {/* Recent Orders */}
              <Grid item xs={12}>
                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                  {/* <ATable /> */}
                  <ATable rows={rows} columns={columns} apiRef={apiRef} />
                </Paper>
              </Grid>
            </Grid>
            {/* <Copyright sx={{ pt: 4 }} /> */}
          </Container>
        </Box> }
      </Box>
    )
}
