let speaking = false;
let paused = false;
const supportedLength = 32000 ;
const synth = window.speechSynthesis;

const stringChop =  (str) => {
    let size = supportedLength;
    if (str == null) return [];
    str = String(str);
    size = ~~size;
return size > 0 ? str.match(new RegExp('.{1,' + size + '}', 'g')) : [str];
}
const speak = (params) => {
    const {text, lang, rate, pitch, volume} = params
    cancel();
    
    const voices = synth.getVoices();
    let textArr = text.split(".");

    textArr.forEach(line => {
        let speech = new SpeechSynthesisUtterance(line);
        speech.voice = voices.filter((value) => value.lang === lang)[0];
        speech.lang = lang;
        speech.rate = rate;
        speech.pitch = pitch;
        speech.volume = volume;
        synth.speak(speech)
    });
    if(synth){
        ({ speaking , paused } = synth);
    }  
    return synth;

}

const pause = () => {
    synth.pause();
    if(synth){
        ({ speaking , paused } = synth);
    }  
    
}

const resume = () => {
    synth.resume();
    if(synth){
        ({ speaking , paused } = synth);
    }  
    
}

const cancel = () => {
    synth.cancel();
    if(synth){
        ({ speaking , paused } = synth);
    }  
    
}

const getVoices = () => {
    return window.speechSynthesis.getVoices();
}
export {
    speaking,
    paused,
    speak,
    getVoices,
    pause,
    resume,
    cancel
}