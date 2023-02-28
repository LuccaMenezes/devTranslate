import { useState, useEffect } from 'react';
import axios from 'axios';
import { useSpeechSynthesis } from 'react-speech-kit';



const Translate = () => {
   const [options, setOptions] = useState([]);
   const [to, setTo] = useState('en');
   const [from, setFrom] = useState('en');
   const [input, setInput] = useState('');
   const [output, setOutput] = useState('');
 
   const { speak } = useSpeechSynthesis();
 
   const translate = () => {

    const params = new URLSearchParams();
    params.append('q', input);
    params.append('source', from);
    params.append('target', to);
    params.append('api_key', 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx');
 
    axios.post('https://libretranslate.de/translate',params, {
      headers: {
        'accept': 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    }).then(res=>{
      console.log(res.data)
      setOutput(res.data.translatedText)
    })
  };
 
  useEffect(() => {
    axios
      .get('https://libretranslate.de/languages', {
        headers: { accept: 'application/json' },
      })
      .then((res) => {
        console.log(res.data);
        setOptions(res.data);
      });

      if (input === '') {
         setOutput('');
       }
     }, [input]);
 
   return (
    <div>
    <div>
      De ({from}) :
      <select onChange={(e) => setFrom(e.target.value)}>
        {options.map((opt) => (
          <option key={opt.code} value={opt.code}>
            {opt.name}
          </option>
        ))}
      </select>
      Para ({to}) :
      <select onChange={(e) => setTo(e.target.value)}>
        {options.map((opt) => (
          <option key={opt.code} value={opt.code}>
            {opt.name}
          </option>
        ))}
      </select>
    </div>
    <div>
      <textarea
        cols="50"
        rows="8"
        onInput={(e) => setInput(e.target.value)}
      ></textarea>
    </div>
    <div>
      <textarea cols="50" rows="8" value={output} ></textarea>
    </div>
    <div>
      <button onClick={e=>translate()}>Traduzir</button>
    </div>
    <div>
      <button onClick={e => speak({ text: output })}>Ouvir</button>
   </div>
  </div>
 );
 }


export default Translate;