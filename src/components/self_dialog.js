import  React,{ useState } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

export const Self_Dialog=async(title,content,type,yesno,isclear)=>{
  const reactSwal = withReactContent(Swal);
  if(!yesno){
    await reactSwal.fire({
      title: <strong>{title}</strong>,
      html: <i>{content}!</i>,
      icon: type
    });	
  }
  else{
    await reactSwal.fire({
      title: <strong>{title}</strong>,
      html:<i>{content}!</i>,
      icon: type,
	  showCancelButton: true,
      confirmButtonText: '是',
  	  cancelButtonText: '取消'
    }).then(async(result) => {
     if(result.isConfirmed){	  
 	  await Swal.fire({
	     title:`<strong>${title}</strong>`,
	     html:`<i>已經${content}</i>`,
	     icon: 'success'
	   })  
        //if(isclear){
		//	localStorage.clear();
		//	window.location.replace("/");
		//}       
	  }
	 else{
	  await Swal.fire({
	    title:`<strong>${title}</strong>`,
	    html:`<i>已取消${content}</i>`,
	    icon: 'error'
	  })
    }
   })
  }
  if(isclear){
  　　localStorage.clear();
  　　window.location.replace("/");
  } 
}