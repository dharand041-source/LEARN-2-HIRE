import { AssessmentQuestion } from "@/types";

export interface QuestionTranslation {
  question: string;
  options?: string[];
  explanation?: string;
}

export type MultilingualQuestionMap = Record<
  string, // question.id
  Partial<Record<"ta" | "hi" | "te" | "ml" | "kn", QuestionTranslation>>
>;

export const QUESTION_TRANSLATIONS: MultilingualQuestionMap = {
  // =========================================================================
  // Full Stack Developer
  // =========================================================================
  "FS-MCQ-01": {
    ta: {
      question: "RFC 5789 விதியின்படி, ஏற்கனவே உள்ள ஒரு வளத்தை முழுமையாக மாற்றுவதற்குப் பதிலாக, அதன் ஒரு பகுதியை மட்டும் மாற்றுவதற்கு (Partial modification) வரையறுக்கப்பட்ட HTTP முறை எது?",
      options: [
        "GET",
        "POST",
        "PUT",
        "PATCH",
        "DELETE",
        "HEAD",
        "OPTIONS",
        "CONNECT",
        "TRACE",
        "PURGE",
      ],
      explanation: "RFC 5789 விதியானது பகுதியளவு வள மாற்றங்களுக்கு PATCH முறையை அறிமுகப்படுத்தியது. மாறாக, PUT முறையானது முழு வளத்தையும் மாற்றியமைக்கிறது.",
    },
    hi: {
      question: "RFC 5789 द्वारा विशेष रूप से मौजूदा संसाधन को पूरी तरह से बदलने के बजाय आंशिक संशोधन (partial modification) लागू करने के लिए कौन सी HTTP विधि परिभाषित की गई है?",
      options: [
        "GET",
        "POST",
        "PUT",
        "PATCH",
        "DELETE",
        "HEAD",
        "OPTIONS",
        "CONNECT",
        "TRACE",
        "PURGE",
      ],
      explanation: "RFC 5789 ने आंशिक संसाधन संशोधनों के लिए PATCH विधि पेश की। इसके विपरीत, PUT idempotent है और पूरे संसाधन प्रतिनिधित्व को बदलता है।",
    },
    te: {
      question: "RFC 5789 ప్రకారం, ఇప్పటికే ఉన్న వనరును పూర్తిగా భర్తీ చేయకుండా పాక్షిక సవరణలను (partial modifications) వర్తింపజేయడానికి ఏ HTTP పద్ధతి నిర్వచించబడింది?",
      options: [
        "GET",
        "POST",
        "PUT",
        "PATCH",
        "DELETE",
        "HEAD",
        "OPTIONS",
        "CONNECT",
        "TRACE",
        "PURGE",
      ],
      explanation: "RFC 5789 పాక్షిక వనరుల సవరణల కోసం PATCH పద్ధతిని పరిచయం చేసింది. దీనికి విరుద్ధంగా, PUT సాధారణంగా మొత్తం వనరును భర్తీ చేస్తుంది.",
    },
    ml: {
      question: "RFC 5789 പ്രകാരം, നിലവിലുള്ള ഒരു റിസോഴ്സ് പൂർണ്ണമായി മാറ്റുന്നതിന് പകരം ഭാഗികമായി മാറ്റങ്ങൾ വരുത്താൻ (partial modification) നിർവചിച്ചിരിക്കുന്ന HTTP രീതി ഏതാണ്?",
      options: [
        "GET",
        "POST",
        "PUT",
        "PATCH",
        "DELETE",
        "HEAD",
        "OPTIONS",
        "CONNECT",
        "TRACE",
        "PURGE",
      ],
      explanation: "ഭാഗിക റിസോഴ്സ് മാറ്റങ്ങൾക്കായി RFC 5789 PATCH രീതി അവതരിപ്പിച്ചു. അതേസമയം PUT രീതി മുഴുവൻ റിസോഴ്സിനെയും മാറ്റുന്നു.",
    },
    kn: {
      question: "RFC 5789 ಪ್ರಕಾರ, ಅಸ್ತಿತ್ವದಲ್ಲಿರುವ ಸಂಪನ್ಮೂಲವನ್ನು ಸಂಪೂರ್ಣವಾಗಿ ಬದಲಾಯಿಸುವ ಬದಲು ಭಾಗಶಃ ಮಾರ್ಪಾಡುಗಳನ್ನು (partial modification) ಅನ್ವಯಿಸಲು ಯಾವ HTTP ವಿಧಾನವನ್ನು ವ್ಯಾಖ್ಯಾನಿಸಲಾಗಿದೆ?",
      options: [
        "GET",
        "POST",
        "PUT",
        "PATCH",
        "DELETE",
        "HEAD",
        "OPTIONS",
        "CONNECT",
        "TRACE",
        "PURGE",
      ],
      explanation: "RFC 5789 ಭಾಗಶಃ ಸಂಪನ್ಮೂಲ ಮಾರ್ಪಾಡುಗಳಿಗಾಗಿ PATCH ವಿಧಾನವನ್ನು ಪರಿಚಯಿಸಿತು. ಇದಕ್ಕೆ ವಿರುದ್ಧವಾಗಿ, PUT ಸಂಪೂರ್ಣ ಸಂಪನ್ಮೂಲವನ್ನು ಬದಲಾಯಿಸುತ್ತದೆ.",
    },
  },

  "FS-MCQ-02": {
    ta: {
      question: "JavaScript V8 நிகழ்வு சுழற்சியில் (event loop), இயங்கும் கால் ஸ்டாக் ஃபிரேம் முடிந்தவுடன், எந்த மேக்ரோடாஸ்க்குகளும் செயல்படுத்தப்படுவதற்கு முன்பு, எந்த வரிசை முன்னுரிமை செயல்பாட்டைக் கொண்டுள்ளது?",
      options: [
        "Macrotask Queue",
        "Timer Queue (setTimeout/setInterval)",
        "I/O Callbacks Queue",
        "Microtask Queue (Promises, queueMicrotask)",
        "Check Queue (setImmediate)",
        "Close Callbacks Queue",
        "Idle / Prepare Phase Queue",
        "Garbage Collection Queue",
        "Worker Threads Queue",
        "Network Socket Queue",
      ],
      explanation: "Microtask Queue (Promise reactions, queueMicrotask) நிகழ்வு சுழற்சி அடுத்த மேக்ரோடாஸ்க்கிற்கு நகர்வதற்கு முன்பு முழுமையாக முடிக்கப்படுகிறது.",
    },
    hi: {
      question: "JavaScript V8 इवेंट लूप में, वर्तमान कॉल स्टैक पूरा होने के तुरंत बाद, किसी भी मैक्रोटास्क से पहले किस कतार को प्राथमिकता निष्पादन प्राप्त होता है?",
      options: [
        "Macrotask Queue",
        "Timer Queue (setTimeout/setInterval)",
        "I/O Callbacks Queue",
        "Microtask Queue (Promises, queueMicrotask)",
        "Check Queue (setImmediate)",
        "Close Callbacks Queue",
        "Idle / Prepare Phase Queue",
        "Garbage Collection Queue",
        "Worker Threads Queue",
        "Network Socket Queue",
      ],
      explanation: "Microtask Queue (Promise रिएक्शन्स, queueMicrotask) प्रत्येक कार्य के अंत में पूरी तरह से संसाधित की जाती है।",
    },
    te: {
      question: "JavaScript V8 ఈవెంట్ లూప్‌లో, ప్రస్తుతం నడుస్తున్న కాల్ స్టాక్ ముగిసిన వెంటనే, ఏదైనా మాక్రోటాస్క్‌లకు ముందు ఏ క్యూ ప్రాధాన్యతను కలిగి ఉంటుంది?",
      options: [
        "Macrotask Queue",
        "Timer Queue (setTimeout/setInterval)",
        "I/O Callbacks Queue",
        "Microtask Queue (Promises, queueMicrotask)",
        "Check Queue (setImmediate)",
        "Close Callbacks Queue",
        "Idle / Prepare Phase Queue",
        "Garbage Collection Queue",
        "Worker Threads Queue",
        "Network Socket Queue",
      ],
      explanation: "Microtask Queue (Promises, queueMicrotask) ఈవెంట్ లూప్ తదుపరి మాక్రోటాస్క్‌కు వెళ్లే ముందు పూర్తిగా ప్రాసెస్ చేయబడుతుంది.",
    },
    ml: {
      question: "JavaScript V8 ഇവന്റ് ലൂപ്പിൽ, നിലവിലെ കോൾ സ്റ്റാക്ക് പൂർത്തിയായ ഉടൻ, ഏതെങ്കിലും മാക്രോടാസ്കുകൾക്ക് മുമ്പ് ഏത് ക്യൂവിനാണ് മുൻഗണന?",
      options: [
        "Macrotask Queue",
        "Timer Queue (setTimeout/setInterval)",
        "I/O Callbacks Queue",
        "Microtask Queue (Promises, queueMicrotask)",
        "Check Queue (setImmediate)",
        "Close Callbacks Queue",
        "Idle / Prepare Phase Queue",
        "Garbage Collection Queue",
        "Worker Threads Queue",
        "Network Socket Queue",
      ],
      explanation: "Microtask Queue (Promises, queueMicrotask) അടുത്ത മാക്രോടാസ്കിലേക്ക് കടക്കുന്നതിന് മുമ്പ് പൂർണ്ണമായി എക്സിക്യൂട്ട് ചെയ്യപ്പെടുന്നു.",
    },
    kn: {
      question: "JavaScript V8 ಈವೆಂಟ್ ಲೂಪ್‌ನಲ್ಲಿ, ಪ್ರಸ್ತುತ ಚಾಲನೆಯಲ್ಲಿರುವ ಕಾಲ್ ಸ್ಟ್ಯಾಕ್ ಮುಗಿದ ತಕ್ಷಣ, ಯಾವುದೇ ಮ್ಯಾಕ್ರೋಟಾಸ್ಕ್‌ಗಳಿಗಿಂತ ಮೊದಲು ಯಾವ ಕ್ಯೂ ಆದ್ಯತೆಯನ್ನು ಹೊಂದಿದೆ?",
      options: [
        "Macrotask Queue",
        "Timer Queue (setTimeout/setInterval)",
        "I/O Callbacks Queue",
        "Microtask Queue (Promises, queueMicrotask)",
        "Check Queue (setImmediate)",
        "Close Callbacks Queue",
        "Idle / Prepare Phase Queue",
        "Garbage Collection Queue",
        "Worker Threads Queue",
        "Network Socket Queue",
      ],
      explanation: "Microtask Queue (Promises, queueMicrotask) ಮುಂದಿನ ಮ್ಯಾಕ್ರೋಟಾಸ್ಕ್‌ಗೆ ಮುನ್ನಡೆಯುವ ಮೊದಲು ಸಂಪೂರ್ಣವಾಗಿ ಪ್ರಕ್ರಿಯೆಗೊಳಿಸಲ್ಪಡುತ್ತದೆ.",
    },
  },

  "FS-MCQ-03": {
    ta: {
      question: "React-ல், ஆழமாக கூடு கட்டப்பட்ட (deeply nested) குழந்தை கூறுகளுக்கு கால்பேக் சார்புகளை அனுப்பும்போது தேவையற்ற மறு-ரெண்டரிங்கைத் தடுக்க எந்த Hook பயன்படுகிறது?",
      options: [
        "useMemo",
        "useCallback",
        "useRef",
        "useEffect",
        "useLayoutEffect",
        "useReducer",
        "useTransition",
        "useDeferredValue",
        "useId",
        "useImperativeHandle",
      ],
      explanation: "useCallback ஒரு மெಮೊரைஸ் செய்யப்பட்ட கால்பேக் சார்பை திருப்பி அனுப்புகிறது, இது தேவையற்ற மறு-ரெண்டரிங்கைத் தடுக்கிறது.",
    },
    hi: {
      question: "React में, चाइल्ड घटकों में अनावश्यक री-रेंडर को रोकने के लिए कॉलबैक फ़ंक्शन को मेमोइज़ करने हेतु कौन सा Hook उपयोग किया जाता है?",
      options: [
        "useMemo",
        "useCallback",
        "useRef",
        "useEffect",
        "useLayoutEffect",
        "useReducer",
        "useTransition",
        "useDeferredValue",
        "useId",
        "useImperativeHandle",
      ],
      explanation: "useCallback एक मेमोइज़्ड कॉलबैक फ़ंक्शन लौटाता है, जिससे प्रॉप्स पर निर्भर री-रेंडरिंग से बचा जा सकता है।",
    },
    te: {
      question: "React లో, చైల్డ్ కాంపోనెంట్లలో అనవసరమైన రీ-రెండరింగ్‌ను నిరోధించడానికి కాల్‌బ్యాక్ ఫంక్షన్‌ను మెమోయిజ్ చేయడానికి ఏ Hook ఉపయోగించబడుతుంది?",
      options: [
        "useMemo",
        "useCallback",
        "useRef",
        "useEffect",
        "useLayoutEffect",
        "useReducer",
        "useTransition",
        "useDeferredValue",
        "useId",
        "useImperativeHandle",
      ],
      explanation: "useCallback మెమోయిజ్ చేయబడిన కాల్‌బ్యాక్ ఫంక్షన్‌ను తిరిగి ఇస్తుంది, ఇది అనవసరమైన రీ-రెండర్లను నివారిస్తుంది.",
    },
    ml: {
      question: "React-ൽ, ചൈൽഡ് ഘടകങ്ങളിൽ അനാവശ്യ റീ-റെൻഡറിംഗ് തടയുന്നതിന് കോൾബാക്ക് ഫംഗ്ഷൻ മെമ്മോയിസ് ചെയ്യാൻ ഏത് Hook ആണ് ഉപയോഗിക്കുന്നത്?",
      options: [
        "useMemo",
        "useCallback",
        "useRef",
        "useEffect",
        "useLayoutEffect",
        "useReducer",
        "useTransition",
        "useDeferredValue",
        "useId",
        "useImperativeHandle",
      ],
      explanation: "useCallback ഒരു മെമ്മോയിസ് ചെയ്ത കോൾബാക്ക് ഫംഗ്ഷൻ നൽകുന്നു, ഇത് പുനർ-റെൻഡറിംഗ് തടയുന്നു.",
    },
    kn: {
      question: "React ನಲ್ಲಿ, ಚೈಲ್ಡ್ ಕಾಂಪೊನೆಂಟ್‌ಗಳಲ್ಲಿ ಅನಗತ್ಯ ಮರು-ರೆಂಡರಿಂಗ್ ತಡೆಯಲು ಕಾಲ್‌ಬ್ಯಾಕ್ ಫಂಕ್ಷನ್ ಅನ್ನು ಮೆಮೊಯಿಜ್ ಮಾಡಲು ಯಾವ Hook ಬಳಸಲಾಗುತ್ತದೆ?",
      options: [
        "useMemo",
        "useCallback",
        "useRef",
        "useEffect",
        "useLayoutEffect",
        "useReducer",
        "useTransition",
        "useDeferredValue",
        "useId",
        "useImperativeHandle",
      ],
      explanation: "useCallback ಮೆಮೊಯಿಜ್ ಮಾಡಿದ ಕಾಲ್‌ಬ್ಯಾಕ್ ಅನ್ನು ಹಿಂದಿರುಗಿಸುತ್ತದೆ, ಇದು ಅನಗತ್ಯ ಮರು-ರೆಂಡರಿಂಗ್ ಅನ್ನು ತಡೆಯುತ್ತದೆ.",
    },
  },

  "FS-FIB-01": {
    ta: {
      question: "நவீன உலாவிகளில், பாதுகாப்பற்ற Cross-Origin கோரிக்கைகளைத் தடுக்கவும் முன்-விமான (preflight) சோதனைகளை இயக்கவும் பயன்படும் W3C பாதுகாப்பு வழிமுறை எது? (சுருக்கப்பெயர்)",
      explanation: "CORS (Cross-Origin Resource Sharing) உலாவிகளில் பாதுகாப்பு கொள்கைகளை நிர்வகிக்கிறது.",
    },
    hi: {
      question: "आधुनिक ब्राउज़रों में क्रॉस-ओरिजिन अनुरोधों को सुरक्षित रूप से प्रबंधित करने वाले W3C तंत्र का संक्षिप्त नाम (Acronym) क्या है?",
      explanation: "CORS (Cross-Origin Resource Sharing) एक सुरक्षा मानक है जो सर्वर को अन्य मूल से संसाधनों तक पहुँच नियंत्रित करने की अनुमति देता है।",
    },
    te: {
      question: "ఆధునిక బ్రౌజర్లలో క్రాస్-ఆరిజిన్ అభ్యర్థనలను సురక్షితంగా నిర్వహించే W3C భద్రతా మెకానిజం సంక్షిప్త రూపం ఏమిటి?",
      explanation: "CORS (Cross-Origin Resource Sharing) బ్రౌజర్లలో క్రాస్-ఆరిజిన్ అభ్యర్థనలను నియంత్రిస్తుంది.",
    },
    ml: {
      question: "ആധുനിക ബ്രൗസറുകളിൽ ക്രോസ്-ഒറിജിൻ അഭ്യർത്ഥനകൾ സുരക്ഷിതമായി കൈകാര്യം ചെയ്യുന്ന W3C സുരക്ഷാ സംവിധാനത്തിന്റെ ചുരുക്കപ്പേര് എന്താണ്?",
      explanation: "CORS (Cross-Origin Resource Sharing) വെബ് ബ്രൗസറുകളിലെ ഒരു സുരക്ഷാ മാനദണ്ഡമാണ്.",
    },
    kn: {
      question: "ಆಧುನಿಕ ಬ್ರೌಸರ್‌ಗಳಲ್ಲಿ ಕ್ರಾಸ್-ಆರಿಜಿನ್ ವಿನಂತಿಗಳನ್ನು ಸುರಕ್ಷಿತವಾಗಿ ನಿರ್ವಹಿಸುವ W3C ಭದ್ರತಾ ಕಾರ್ಯವಿಧಾನದ ಸಂಕ್ಷಿಪ್ತ ರೂಪವೇನು?",
      explanation: "CORS (Cross-Origin Resource Sharing) ಬ್ರೌಸರ್ ಸಂಪನ್ಮೂಲಗಳನ್ನು ರಕ್ಷಿಸಲು ಬಳಸುವ ಭದ್ರತಾ ಮಾನದಂಡವಾಗಿದೆ.",
    },
  },
};

/**
 * Returns localized version of AssessmentQuestion based on active locale.
 * Fallbacks safely to original English content.
 */
export function getLocalizedQuestion(
  question: AssessmentQuestion,
  locale: string
): AssessmentQuestion {
  if (!locale || locale === "en") {
    return question;
  }

  // 1. Check if question has inline translations
  if (question.translations && question.translations[locale]) {
    const t = question.translations[locale]!;
    return {
      ...question,
      question: t.question || question.question,
      options: t.options && t.options.length > 0 ? t.options : question.options,
      explanation: t.explanation || question.explanation,
    };
  }

  // 2. Check centralized question translations dictionary
  const translatedData = QUESTION_TRANSLATIONS[question.id]?.[locale as "ta" | "hi" | "te" | "ml" | "kn"];
  if (translatedData) {
    return {
      ...question,
      question: translatedData.question || question.question,
      options:
        translatedData.options && translatedData.options.length > 0
          ? translatedData.options
          : question.options,
      explanation: translatedData.explanation || question.explanation,
    };
  }

  // 3. Fallback to English
  return question;
}
