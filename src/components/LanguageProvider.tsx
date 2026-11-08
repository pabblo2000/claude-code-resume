'use client';
import {createContext, useContext, useState, useEffect, type ReactNode} from 'react';
import {type Language, content, copy} from '@/lib/portfolio';
const Context = createContext({lang:'es' as Language, setLang: (_lang: Language) => {}});
export function LanguageProvider({children}:{children:ReactNode}) {
 const [lang,setLanguage]=useState<Language>('es');
 useEffect(()=>{try {const value=new URLSearchParams(location.search).get('lang')||localStorage.getItem('pablo-language'); if(value==='en'||value==='es') setLanguage(value);}catch{}},[]);
 useEffect(()=>{document.documentElement.lang=lang;},[lang]);
 const setLang=(value:Language)=>{setLanguage(value);try{localStorage.setItem('pablo-language',value); const url=new URL(location.href);url.searchParams.set('lang',value);history.replaceState(null,'',url);}catch{}};
 return <Context.Provider value={{lang,setLang}}>{children}</Context.Provider>;
}
export function useLanguage(){const ctx=useContext(Context);return {...ctx,resume:content[ctx.lang],t:copy[ctx.lang]};}
