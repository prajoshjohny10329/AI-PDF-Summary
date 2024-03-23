"use client";

export default function Home() {

  function onFileChange(event : any){
    
    const file = event.target.files[0];
    const fileReader = new FileReader();
    fileReader.onload = onLoadFile;
    fileReader.readAsArrayBuffer(file);
    
  }
  async function onLoadFile(event: any) {
    const typedarray = new Uint8Array(event.target.result);
    const pdf = await pdfjsLib.getDocument({ data: typedarray }).promise;
    console.log("loaded pdf:", pdf.numPages);

    let result = ""; // Initialize result variable

    for (let index = 1; index <= pdf.numPages; index++) {
        const page = await pdf.getPage(index);
        const content = await page.getTextContent();
        
        if (!content.items || content.items.length === 0) {
            console.log("No text content found on page", index);
            continue;
        }
        
        await content.items.forEach((item: any) => {
            result += item.str + " ";
        });
        console.log('Text content of page', index, 'added to result');
    }

    console.log('Process complete!');
    console.log('Final result:', result);
    sendToAPI(result)
}

function sendToAPI(text :any){
  fetch("/api",{
    method: "POST",
    headers: {
      "Content-Type" : "application/json"
    },
    body: JSON.stringify({text})
  }).then((response) =>{
    return response.json();
  }).then((data) => {
    console.log(data);
  }).catch((error) => {
    console.error('Error:', error);
});

}


  return (
    <>
      <h1>Up load PDF</h1>
      <input type="file" placeholder="Only Pdf" accept=".pdf" name="file"  onChange={ onFileChange } id="file"/>
    </>
  );
}
