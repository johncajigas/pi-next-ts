import createCtx from "./createContext";
//setting dark classname and saving to storage
export const [ThemeContext, ThemeProvider] = createCtx<Theme>('dark','theme');
//a test
export const [NameContext, NameProvider] = createCtx<FullName>(undefined,'name');
//alert and its properties
export const [AlertContext,AlertProvider] = createCtx<AlertDialogue>();
//fullscreen attention grabber like images, or popups other than confirmation alerts
export const [AttentionContext,AttentionProvider] = createCtx<AttentionProps>({visible:false,child:()=>null});