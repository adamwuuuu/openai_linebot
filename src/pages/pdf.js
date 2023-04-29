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
import axios from "axios"
import FileUpload from "react-mui-fileuploader"

// function createData(name, calories, fat, carbs, protein) {
//   return { name, calories, fat, carbs, protein };
// }

// const rows = [
//   createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
//   createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
//   createData('Eclair', 262, 16.0, 24, 6.0),
//   createData('Cupcake', 305, 3.7, 67, 4.3),
//   createData('Gingerbread', 356, 16.0, 49, 3.9),
// ];

export default function Pdf() {

    const [filename,setFilename]=useState(""); 
    const [filestate,setFilestate]=useState({
      selectedFile: null
    });
    const [filesToUpload, setFilesToUpload] = useState([])

    const handleFilesChange = (files) => {
      // Update chosen files
      setFilesToUpload([ ...files ])
    };

    const handleFileUploadError = (error) => {
      // Do something...
    }
  
    const uploadFiles = () => {
      // Create a form and post it to server
      let formData = new FormData()
      filesToUpload.forEach((file) => formData.append("files", file))
      axios.post("/pdf/upload",formData)
      .then((response)=>{
         console.log(response.data);
      })
      .catch((error)=>{
        console.log(error);
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

    useEffect(()=>{
      console.log("file change");
    },[filesToUpload])

    const columns = [
      { field: 'id', headerName: 'ID', width: 70 },
      { field: 'questionNumber', headerName: '題目編號', width: 130 },
      { field: 'question', headerName: '題目', width: 130 },
      {
        field: 'answer',
        headerName: '答案',
        type: 'number',
        width: 90,
      },
      {
        field: 'comment',
        headerName: '備註',
        description: 'This column has a value getter and is not sortable.',
        sortable: false,
        width: 160,
        valueGetter: (params) =>
          `${params.row.questionNumber || ''} ${params.row.question || ''}`,
      },
    ];
    
    const rows = [
      { id: 1, question: 'Snow', questionNumber: 'Jon', answer: 35 },
      { id: 2, question: 'Lannister', questionNumber: 'Cersei', answer: 42 },
      { id: 3, question: 'Lannister', questionNumber: 'Jaime', answer: 45 },
      { id: 4, question: 'Stark', questionNumber: 'Arya', answer: 16 },
      { id: 5, question: 'Targaryen', questionNumber: 'Daenerys', answer: null },
      { id: 6, question: 'Melisandre', questionNumber: null, answer: 150 },
      { id: 7, question: 'Clifford', questionNumber: 'Ferrara', answer: 44 },
      { id: 8, question: 'Frances', questionNumber: 'Rossini', answer: 36 },
      { id: 9, question: 'Roxie', questionNumber: 'Harvey', answer: 65 },
    ];

    return(
        <Box sx={{ display: 'flex' }}>
        <CssBaseline />
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
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
              {/* Chart */}
              <Grid item xs={12} md={8} lg={9}>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 400,
                  }}
                >
                 <FileUpload 
                   getBase64={false}
                   multiFile={true}
                   disabled={false}
                   title="選擇檔案"
                   header="[Drag to drop]"
                   leftLabel="or"
                   rightLabel="to select files"
                   buttonLabel="click here"
                   buttonRemoveLabel="移除全部檔案"
                   maxFileSize={0}
                   maxUploadFiles={0}
                  //  maxFilesContainerHeight={357}
                   acceptedType={'image/*'}
                   errorSizeMessage={'fill it or remove it to use the default error message'}
                  //  allowedExtensions={['jpg', 'jpeg']}
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
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 400,
                  }}
                >
                </Paper>
              </Grid>
              {/* Recent Orders */}
              <Grid item xs={12}>
                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                  {/* <ATable /> */}
                  <ATable rows={rows} columns={columns} />
                </Paper>
              </Grid>
            </Grid>
            {/* <Copyright sx={{ pt: 4 }} /> */}
          </Container>
        </Box>
      </Box>
    )
}
