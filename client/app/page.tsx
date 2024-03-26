"use client";
import { useState } from "react";
import * as flatted from "flatted";

// Now you can use flatted
export default function Home() {
  const [result, setResult] = useState("");
  const searchHint: HTMLInputElement | any = document.getElementById("search");

  // function for file loading
  function onFileChange(event: any) {
    const file = event.target.files[0];
    const fileReader = new FileReader();
    fileReader.onload = onLoadFile;
    fileReader.readAsArrayBuffer(file);
  }

  //function for pdf to text
  async function onLoadFile(event: any) {
    const typedarray = new Uint8Array(event.target.result);
    const pdf = await pdfjsLib.getDocument({ data: typedarray }).promise;
    console.log("loaded pdf:", pdf.numPages);

    let text = ""; // Initialize text variable

    for (let index = 1; index <= pdf.numPages; index++) {
      const page = await pdf.getPage(index);
      const content = await page.getTextContent();

      if (!content.items || content.items.length === 0) {
        console.log("No text content found on page");
        continue;
      }
      await content.items.forEach((item: any) => {
        text += item.str + " ";
      });
    }

    // sendToAPI(text)
    const searchHint = getSearch();
    if (searchHint.length == 0) {
      setResult("pleas enter anything");
    } else {
      setResult("");
      sendToAPI(text, searchHint);
    }
  }

  function getSearch() {
    return searchHint.value;
  }

  function clear(){
    
    searchHint.value = ''
  }

  function sendToAPI(text: string, searchHint: string) {
    fetch("/api", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: flatted.stringify({ text, searchHint }),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log("result");

        console.log(data);
        setResult(data.result);
      })
      .catch((error) => {
        console.error("Error on API Bridge:", error);
      });
  }

  return (
    <>
      <h1 className="first-head">AI & PDF</h1>
      <p></p>
      <div className="div-pdf">
        <h1>Up load PDF</h1>
        <input
          type="file"
          placeholder="Only Pdf"
          accept=".pdf"
          name="file"
          onChange={onFileChange}
          id="file"
        />
      </div>
      <br />
      <div className="typewriter">
        <h1 className="typewriter-text">{result}</h1>
      </div>
      
      <div className="search-div">
        <input
          style={{ color: "black" }}
          type="text"
          placeholder="write your question about Pdf"
          name="search"
          id="search"
        />
      </div>

      <div className="button-div">
      <button id="submit" onClick={onFileChange}>Submit</button>
      <button id="reset" onClick={clear}  type="reset">Clear</button>
      </div>

      
    </>
  );
}
