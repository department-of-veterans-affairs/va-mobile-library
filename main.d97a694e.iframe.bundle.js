(self.webpackChunk_department_of_veterans_affairs_mobile_component_library=self.webpackChunk_department_of_veterans_affairs_mobile_component_library||[]).push([[179],{"./.storybook/web/preview.ts":(__unused_webpack_module,exports,__webpack_require__)=>{__webpack_require__("./node_modules/core-js/modules/es.object.define-property.js"),Object.defineProperty(exports,"__esModule",{value:!0}),exports.parameters=exports.decorators=void 0;var _storybookAddonDesigns=__webpack_require__("./node_modules/storybook-addon-designs/esm/index.js");exports.parameters={actions:{argTypesRegex:"^on[A-Z].*"},controls:{matchers:{color:/(background|color)$/i,date:/Date$/}}};var decorators=[_storybookAddonDesigns.withDesign];exports.decorators=decorators},"./.storybook/web/preview.ts-generated-config-entry.js":(__unused_webpack_module,__unused_webpack_exports,__webpack_require__)=>{__webpack_require__("./node_modules/core-js/modules/es.weak-map.js"),__webpack_require__("./node_modules/core-js/modules/es.object.to-string.js"),__webpack_require__("./node_modules/core-js/modules/es.string.iterator.js"),__webpack_require__("./node_modules/core-js/modules/es.array.iterator.js"),__webpack_require__("./node_modules/core-js/modules/web.dom-collections.iterator.js"),__webpack_require__("./node_modules/core-js/modules/es.object.define-property.js"),__webpack_require__("./node_modules/core-js/modules/es.object.get-own-property-descriptor.js"),__webpack_require__("./node_modules/core-js/modules/es.object.keys.js"),__webpack_require__("./node_modules/core-js/modules/es.symbol.js"),__webpack_require__("./node_modules/core-js/modules/es.array.filter.js"),__webpack_require__("./node_modules/core-js/modules/es.array.for-each.js"),__webpack_require__("./node_modules/core-js/modules/web.dom-collections.for-each.js"),__webpack_require__("./node_modules/core-js/modules/es.object.get-own-property-descriptors.js"),__webpack_require__("./node_modules/core-js/modules/es.object.define-properties.js");var _clientApi=__webpack_require__("./node_modules/@storybook/client-api/dist/esm/index.js"),config=function _interopRequireWildcard(obj,nodeInterop){if(!nodeInterop&&obj&&obj.__esModule)return obj;if(null===obj||"object"!=typeof obj&&"function"!=typeof obj)return{default:obj};var cache=_getRequireWildcardCache(nodeInterop);if(cache&&cache.has(obj))return cache.get(obj);var newObj={},hasPropertyDescriptor=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var key in obj)if("default"!==key&&Object.prototype.hasOwnProperty.call(obj,key)){var desc=hasPropertyDescriptor?Object.getOwnPropertyDescriptor(obj,key):null;desc&&(desc.get||desc.set)?Object.defineProperty(newObj,key,desc):newObj[key]=obj[key]}newObj.default=obj,cache&&cache.set(obj,newObj);return newObj}(__webpack_require__("./.storybook/web/preview.ts"));function _getRequireWildcardCache(nodeInterop){if("function"!=typeof WeakMap)return null;var cacheBabelInterop=new WeakMap,cacheNodeInterop=new WeakMap;return(_getRequireWildcardCache=function _getRequireWildcardCache(nodeInterop){return nodeInterop?cacheNodeInterop:cacheBabelInterop})(nodeInterop)}function ownKeys(object,enumerableOnly){var keys=Object.keys(object);if(Object.getOwnPropertySymbols){var symbols=Object.getOwnPropertySymbols(object);enumerableOnly&&(symbols=symbols.filter((function(sym){return Object.getOwnPropertyDescriptor(object,sym).enumerable}))),keys.push.apply(keys,symbols)}return keys}function _defineProperty(obj,key,value){return key in obj?Object.defineProperty(obj,key,{value,enumerable:!0,configurable:!0,writable:!0}):obj[key]=value,obj}Object.keys(config).forEach((function(key){var value=config[key];switch(key){case"args":return(0,_clientApi.addArgs)(value);case"argTypes":return(0,_clientApi.addArgTypes)(value);case"decorators":return value.forEach((function(decorator){return(0,_clientApi.addDecorator)(decorator,!1)}));case"loaders":return value.forEach((function(loader){return(0,_clientApi.addLoader)(loader,!1)}));case"parameters":return(0,_clientApi.addParameters)(function _objectSpread(target){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?ownKeys(Object(source),!0).forEach((function(key){_defineProperty(target,key,source[key])})):Object.getOwnPropertyDescriptors?Object.defineProperties(target,Object.getOwnPropertyDescriptors(source)):ownKeys(Object(source)).forEach((function(key){Object.defineProperty(target,key,Object.getOwnPropertyDescriptor(source,key))}))}return target}({},value),!1);case"argTypesEnhancers":return value.forEach((function(enhancer){return(0,_clientApi.addArgTypesEnhancer)(enhancer)}));case"argsEnhancers":return value.forEach((function(enhancer){return(0,_clientApi.addArgsEnhancer)(enhancer)}));case"render":return(0,_clientApi.setGlobalRender)(value);case"globals":case"globalTypes":var v={};return v[key]=value,(0,_clientApi.addParameters)(v,!1);case"__namedExportsOrder":case"decorateStory":case"renderToDOM":return null;default:return console.log(key+" was not supported :( !")}}))},"./src/components/SegmentedControl/SegmentedControl.stories.tsx":(__unused_webpack_module,exports,__webpack_require__)=>{__webpack_require__("./node_modules/core-js/modules/es.object.define-property.js"),__webpack_require__("./node_modules/core-js/modules/es.weak-map.js"),__webpack_require__("./node_modules/core-js/modules/es.object.to-string.js"),__webpack_require__("./node_modules/core-js/modules/es.string.iterator.js"),__webpack_require__("./node_modules/core-js/modules/es.array.iterator.js"),__webpack_require__("./node_modules/core-js/modules/web.dom-collections.iterator.js"),__webpack_require__("./node_modules/core-js/modules/es.object.get-own-property-descriptor.js");var _interopRequireDefault=__webpack_require__("./node_modules/@babel/runtime/helpers/interopRequireDefault.js");Object.defineProperty(exports,"__esModule",{value:!0}),exports.twoSegments=exports.default=void 0;var _slicedToArray2=_interopRequireDefault(__webpack_require__("./node_modules/@babel/runtime/helpers/slicedToArray.js")),_View=_interopRequireDefault(__webpack_require__("./node_modules/react-native-web/dist/exports/View/index.js")),_react=function _interopRequireWildcard(obj,nodeInterop){if(!nodeInterop&&obj&&obj.__esModule)return obj;if(null===obj||"object"!=typeof obj&&"function"!=typeof obj)return{default:obj};var cache=_getRequireWildcardCache(nodeInterop);if(cache&&cache.has(obj))return cache.get(obj);var newObj={},hasPropertyDescriptor=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var key in obj)if("default"!==key&&Object.prototype.hasOwnProperty.call(obj,key)){var desc=hasPropertyDescriptor?Object.getOwnPropertyDescriptor(obj,key):null;desc&&(desc.get||desc.set)?Object.defineProperty(newObj,key,desc):newObj[key]=obj[key]}newObj.default=obj,cache&&cache.set(obj,newObj);return newObj}(__webpack_require__("./node_modules/react/index.js")),_SegmentedControl=__webpack_require__("./src/components/SegmentedControl/SegmentedControl.tsx"),_utils=__webpack_require__("./src/utils/index.tsx"),_jsxRuntime=__webpack_require__("./node_modules/react/jsx-runtime.js");function _getRequireWildcardCache(nodeInterop){if("function"!=typeof WeakMap)return null;var cacheBabelInterop=new WeakMap,cacheNodeInterop=new WeakMap;return(_getRequireWildcardCache=function _getRequireWildcardCache(nodeInterop){return nodeInterop?cacheNodeInterop:cacheBabelInterop})(nodeInterop)}var _default={title:"Segmented control",component:_SegmentedControl.SegmentedControl,parameters:{docs:(0,_utils.generateDocs)({name:"Segmented control",docUrl:"https://department-of-veterans-affairs.github.io/va-mobile-app/design/Components/Navigation/Secondary/SegmentedControl"})},decorators:[function(Story){return(0,_jsxRuntime.jsx)(_View.default,{style:{flex:1,justifyContent:"center",alignItems:"center"},children:Story()})}]};exports.default=_default;var twoSegments={render:function statefulComponentRenderer(props){var labels=props.labels,a11yLabels=props.a11yLabels,a11yHints=props.a11yHints,_useState=(0,_react.useState)(0),_useState2=(0,_slicedToArray2.default)(_useState,2),selectedSegment=_useState2[0],setSelectedSegment=_useState2[1];return(0,_jsxRuntime.jsx)(_SegmentedControl.SegmentedControl,{labels,onChange:setSelectedSegment,selected:selectedSegment,a11yLabels,a11yHints})},args:{labels:["Inbox (3)","Folders"],a11yLabels:["Inbox"],a11yHints:["You have 3 unread messages. Review messages in your inbox","Review your folders"]},parameters:{design:[{name:"Figma component overview",type:"figma",url:"https://www.figma.com/file/QVLPB3eOunmKrgQOuOt0SU/%F0%9F%93%90-DesignLibrary2.0---VAMobile?type=design&node-id=7332%3A11330&mode=design&t=IfpGfogEOoBtNhmN-1"},{name:"Figma examples",type:"figma",url:"https://www.figma.com/file/QVLPB3eOunmKrgQOuOt0SU/%F0%9F%93%90-DesignLibrary2.0---VAMobile?type=design&node-id=7332%3A11331&mode=design&t=IfpGfogEOoBtNhmN-1"}]}};exports.twoSegments=twoSegments;try{Meta.displayName="Meta",Meta.__docgenInfo={description:"Metadata to configure the stories for a component.",displayName:"Meta",props:{}}}catch(e){}try{Meta.displayName="Meta",Meta.__docgenInfo={description:"Metadata to configure the stories for a component.",displayName:"Meta",props:{}}}catch(e){}try{Meta.displayName="Meta",Meta.__docgenInfo={description:"Metadata to configure the stories for a component.",displayName:"Meta",props:{}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/SegmentedControl/SegmentedControl.stories.tsx#Meta"]={docgenInfo:Meta.__docgenInfo,name:"Meta",path:"src/components/SegmentedControl/SegmentedControl.stories.tsx#Meta"})}catch(__react_docgen_typescript_loader_error){}},"./src/components/SegmentedControl/SegmentedControl.tsx":(__unused_webpack_module,exports,__webpack_require__)=>{var _templateObject,_taggedTemplateLiteralLoose=__webpack_require__("./node_modules/@babel/runtime/helpers/taggedTemplateLiteralLoose.js");__webpack_require__("./node_modules/core-js/modules/es.object.define-property.js"),__webpack_require__("./node_modules/core-js/modules/es.weak-map.js"),__webpack_require__("./node_modules/core-js/modules/es.object.to-string.js"),__webpack_require__("./node_modules/core-js/modules/es.string.iterator.js"),__webpack_require__("./node_modules/core-js/modules/es.array.iterator.js"),__webpack_require__("./node_modules/core-js/modules/web.dom-collections.iterator.js"),__webpack_require__("./node_modules/core-js/modules/es.object.get-own-property-descriptor.js"),__webpack_require__("./node_modules/core-js/modules/es.object.assign.js"),__webpack_require__("./node_modules/core-js/modules/es.array.map.js");var _interopRequireDefault=__webpack_require__("./node_modules/@babel/runtime/helpers/interopRequireDefault.js");Object.defineProperty(exports,"__esModule",{value:!0}),exports.SegmentedControl=void 0;var _Text=_interopRequireDefault(__webpack_require__("./node_modules/react-native-web/dist/exports/Text/index.js")),_TouchableOpacity=_interopRequireDefault(__webpack_require__("./node_modules/react-native-web/dist/exports/TouchableOpacity/index.js")),_View=_interopRequireDefault(__webpack_require__("./node_modules/react-native-web/dist/exports/View/index.js")),_useColorScheme=_interopRequireDefault(__webpack_require__("./node_modules/react-native-web/dist/exports/useColorScheme/index.js")),_reactI18next=__webpack_require__("./node_modules/react-i18next/dist/es/index.js"),_react=function _interopRequireWildcard(obj,nodeInterop){if(!nodeInterop&&obj&&obj.__esModule)return obj;if(null===obj||"object"!=typeof obj&&"function"!=typeof obj)return{default:obj};var cache=_getRequireWildcardCache(nodeInterop);if(cache&&cache.has(obj))return cache.get(obj);var newObj={},hasPropertyDescriptor=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var key in obj)if("default"!==key&&Object.prototype.hasOwnProperty.call(obj,key)){var desc=hasPropertyDescriptor?Object.getOwnPropertyDescriptor(obj,key):null;desc&&(desc.get||desc.set)?Object.defineProperty(newObj,key,desc):newObj[key]=obj[key]}newObj.default=obj,cache&&cache.set(obj,newObj);return newObj}(__webpack_require__("./node_modules/react/index.js")),_native=_interopRequireDefault(__webpack_require__("./node_modules/styled-components/native/dist/styled-components.native.esm.js")),_wrapper=__webpack_require__("./src/wrapper.tsx"),_jsxRuntime=__webpack_require__("./node_modules/react/jsx-runtime.js");function _getRequireWildcardCache(nodeInterop){if("function"!=typeof WeakMap)return null;var cacheBabelInterop=new WeakMap,cacheNodeInterop=new WeakMap;return(_getRequireWildcardCache=function _getRequireWildcardCache(nodeInterop){return nodeInterop?cacheNodeInterop:cacheBabelInterop})(nodeInterop)}var Segment=(0,_native.default)(_TouchableOpacity.default)(_templateObject||(_templateObject=_taggedTemplateLiteralLoose(["\n  border-radius: 8px;\n  padding-vertical: 7px;\n  width: ",";\n  elevation: ",";\n  background-color: ",";\n"])),(function(props){return props.widthPct}),(function(props){return props.isSelected?4:0}),(function(props){return props.backgroundColor})),SegmentedControl=function SegmentedControl(_ref){var labels=_ref.labels,onChange=_ref.onChange,selected=_ref.selected,a11yLabels=_ref.a11yLabels,a11yHints=_ref.a11yHints,t=(0,_reactI18next.useTranslation)().t,colorScheme=(0,_useColorScheme.default)();(0,_react.useEffect)((function(){onChange(selected)}),[selected,onChange,labels]);var textColor,activeBgColor,inactiveBgColor,colorTokens_white="#FFFFFF",colorTokens_gray={dark:"#323A45",lighter:"#D6D7D9",lightest:"#F1F1F1",medium:"#757575"};"light"===colorScheme?(textColor=colorTokens_gray.dark,activeBgColor=colorTokens_white,inactiveBgColor=colorTokens_gray.lighter):(textColor=colorTokens_gray.lightest,activeBgColor=colorTokens_gray.medium,inactiveBgColor=colorTokens_gray.dark);var viewStyle={alignSelf:"stretch",backgroundColor:inactiveBgColor,borderRadius:8,flexDirection:"row",flexWrap:"wrap",justifyContent:"space-between",padding:2};return(0,_jsxRuntime.jsx)(_wrapper.ComponentWrapper,{children:(0,_jsxRuntime.jsx)(_View.default,{style:viewStyle,accessibilityRole:"tablist",children:labels.map((function(label,index){return function buildSegment(label,index){var isSelected=selected===index,accessibilityLabel=a11yLabels&&a11yLabels[index]||labels[index],accessibilityValue={text:t("listPosition",{position:index+1,total:labels.length})},font={fontFamily:isSelected?"SourceSansPro-Bold":"SourceSansPro-Regular",fontSize:20,lineHeight:30},textStyle=Object.assign({},font,{color:textColor,textAlign:"center"});return(0,_jsxRuntime.jsx)(Segment,{onPress:function onPress(){return onChange(index)},backgroundColor:isSelected?activeBgColor:inactiveBgColor,isSelected,widthPct:100/labels.length+"%",accessibilityLabel,accessibilityHint:a11yHints?a11yHints[index]:"",accessibilityValue,accessibilityRole:"tab",accessibilityState:{selected:isSelected},children:(0,_jsxRuntime.jsx)(_Text.default,{allowFontScaling:!1,style:textStyle,children:label})},index)}(label,index)}))})})};exports.SegmentedControl=SegmentedControl;try{SegmentedControl.displayName="SegmentedControl",SegmentedControl.__docgenInfo={description:"A component used to switch between related views of information within the same context",displayName:"SegmentedControl",props:{labels:{defaultValue:null,description:"Array of segment labels",name:"labels",required:!0,type:{name:"string[]",raw:null,value:null}},onChange:{defaultValue:null,description:"Handler function for changing segment selection",name:"onChange",required:!0,type:{name:"(selection: number) => void",raw:null,value:null}},selected:{defaultValue:null,description:"Index of the currently selected segment",name:"selected",required:!0,type:{name:"number",raw:null,value:null}},a11yLabels:{defaultValue:null,description:"Optional array of segment accessibility override labels",name:"a11yLabels",required:!1,type:{name:"string[]",raw:null,value:null}},a11yHints:{defaultValue:null,description:"Optional array of segment accessibility hints",name:"a11yHints",required:!1,type:{name:"string[]",raw:null,value:null}}}}}catch(e){}try{SegmentedControl.displayName="SegmentedControl",SegmentedControl.__docgenInfo={description:"A component used to switch between related views of information within the same context",displayName:"SegmentedControl",props:{'"labels"':{defaultValue:null,description:"Array of segment labels",name:"labels",required:!0,type:{name:"string[]",raw:null,value:null}},'"onChange"':{defaultValue:null,description:"Handler function for changing segment selection",name:"onChange",required:!0,type:{name:"(selection: number) => void",raw:null,value:null}},'"selected"':{defaultValue:null,description:"Index of the currently selected segment",name:"selected",required:!0,type:{name:"number",raw:null,value:null}},'"a11yLabels"':{defaultValue:null,description:"Optional array of segment accessibility override labels",name:"a11yLabels",required:!1,type:{name:"string[]",raw:null,value:null}},'"a11yHints"':{defaultValue:null,description:"Optional array of segment accessibility hints",name:"a11yHints",required:!1,type:{name:"string[]",raw:null,value:null}}}}}catch(e){}try{SegmentedControl.displayName="SegmentedControl",SegmentedControl.__docgenInfo={description:"A component used to switch between related views of information within the same context",displayName:"SegmentedControl",props:{labels:{defaultValue:null,description:"Array of segment labels",name:"labels",required:!0,type:{name:"string[]"}},onChange:{defaultValue:null,description:"Handler function for changing segment selection",name:"onChange",required:!0,type:{name:"(selection: number) => void"}},selected:{defaultValue:null,description:"Index of the currently selected segment",name:"selected",required:!0,type:{name:"number"}},a11yLabels:{defaultValue:null,description:"Optional array of segment accessibility override labels",name:"a11yLabels",required:!1,type:{name:"string[]"}},a11yHints:{defaultValue:null,description:"Optional array of segment accessibility hints",name:"a11yHints",required:!1,type:{name:"string[]"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/SegmentedControl/SegmentedControl.tsx#SegmentedControl"]={docgenInfo:SegmentedControl.__docgenInfo,name:"SegmentedControl",path:"src/components/SegmentedControl/SegmentedControl.tsx#SegmentedControl"})}catch(__react_docgen_typescript_loader_error){}},"./src/utils/index.tsx":(__unused_webpack_module,exports,__webpack_require__)=>{__webpack_require__("./node_modules/core-js/modules/es.object.define-property.js"),__webpack_require__("./node_modules/core-js/modules/es.function.name.js");var _interopRequireDefault=__webpack_require__("./node_modules/@babel/runtime/helpers/interopRequireDefault.js");Object.defineProperty(exports,"__esModule",{value:!0}),exports.generateDocs=exports.DocLink=void 0;var _addonDocs=__webpack_require__("./node_modules/@storybook/addon-docs/dist/esm/index.js"),_Linking=_interopRequireDefault(__webpack_require__("./node_modules/react-native-web/dist/exports/Linking/index.js")),_Text=_interopRequireDefault(__webpack_require__("./node_modules/react-native-web/dist/exports/Text/index.js")),_View=_interopRequireDefault(__webpack_require__("./node_modules/react-native-web/dist/exports/View/index.js")),_jsxRuntime=(_interopRequireDefault(__webpack_require__("./node_modules/react/index.js")),__webpack_require__("./node_modules/react/jsx-runtime.js")),DocLink=function DocLink(_ref){var name=_ref.name,docUrl=_ref.docUrl;return(0,_jsxRuntime.jsx)(_View.default,{style:{marginVertical:10},children:(0,_jsxRuntime.jsxs)(_Text.default,{style:{color:"blue",textDecorationLine:"underline",lineHeight:20},onPress:function onPress(){_Linking.default.openURL(docUrl)},children:["View guidance for the ",name," component on the VA Mobile Documentation Site"]})})};exports.DocLink=DocLink;var generateDocs=function generateDocs(_ref2){var name=_ref2.name,docUrl=_ref2.docUrl;return{page:function page(){return(0,_jsxRuntime.jsxs)(_jsxRuntime.Fragment,{children:[(0,_jsxRuntime.jsx)(_addonDocs.Title,{}),(0,_jsxRuntime.jsx)(_addonDocs.Subtitle,{}),(0,_jsxRuntime.jsx)(DocLink,{name,docUrl}),(0,_jsxRuntime.jsx)(_addonDocs.Description,{}),(0,_jsxRuntime.jsx)(_addonDocs.Primary,{}),(0,_jsxRuntime.jsx)(_addonDocs.ArgsTable,{}),(0,_jsxRuntime.jsx)(_addonDocs.Stories,{})]})}}};exports.generateDocs=generateDocs;try{DocLink.displayName="DocLink",DocLink.__docgenInfo={description:"",displayName:"DocLink",props:{name:{defaultValue:null,description:"",name:"name",required:!0,type:{name:"string",raw:null,value:null}},docUrl:{defaultValue:null,description:"",name:"docUrl",required:!0,type:{name:"string",raw:null,value:null}}}}}catch(e){}try{generateDocs.displayName="generateDocs",generateDocs.__docgenInfo={description:"",displayName:"generateDocs",props:{name:{defaultValue:null,description:"",name:"name",required:!0,type:{name:"string",raw:null,value:null}},docUrl:{defaultValue:null,description:"",name:"docUrl",required:!0,type:{name:"string",raw:null,value:null}}}}}catch(e){}try{DocLink.displayName="DocLink",DocLink.__docgenInfo={description:"",displayName:"DocLink",props:{'"name"':{defaultValue:null,description:"",name:"name",required:!0,type:{name:"string",raw:null,value:null}},'"docUrl"':{defaultValue:null,description:"",name:"docUrl",required:!0,type:{name:"string",raw:null,value:null}}}}}catch(e){}try{generateDocs.displayName="generateDocs",generateDocs.__docgenInfo={description:"",displayName:"generateDocs",props:{'"name"':{defaultValue:null,description:"",name:"name",required:!0,type:{name:"string",raw:null,value:null}},'"docUrl"':{defaultValue:null,description:"",name:"docUrl",required:!0,type:{name:"string",raw:null,value:null}}}}}catch(e){}try{DocLink.displayName="DocLink",DocLink.__docgenInfo={description:"",displayName:"DocLink",props:{name:{defaultValue:null,description:"",name:"name",required:!0,type:{name:"string"}},docUrl:{defaultValue:null,description:"",name:"docUrl",required:!0,type:{name:"string"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/utils/index.tsx#DocLink"]={docgenInfo:DocLink.__docgenInfo,name:"DocLink",path:"src/utils/index.tsx#DocLink"})}catch(__react_docgen_typescript_loader_error){}try{generateDocs.displayName="generateDocs",generateDocs.__docgenInfo={description:"",displayName:"generateDocs",props:{name:{defaultValue:null,description:"",name:"name",required:!0,type:{name:"string"}},docUrl:{defaultValue:null,description:"",name:"docUrl",required:!0,type:{name:"string"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/utils/index.tsx#generateDocs"]={docgenInfo:generateDocs.__docgenInfo,name:"generateDocs",path:"src/utils/index.tsx#generateDocs"})}catch(__react_docgen_typescript_loader_error){}},"./src/utils/translation/i18n.ts":(__unused_webpack_module,exports,__webpack_require__)=>{__webpack_require__("./node_modules/core-js/modules/es.object.define-property.js"),__webpack_require__("./node_modules/core-js/modules/es.weak-map.js"),__webpack_require__("./node_modules/core-js/modules/es.object.to-string.js"),__webpack_require__("./node_modules/core-js/modules/es.string.iterator.js"),__webpack_require__("./node_modules/core-js/modules/es.array.iterator.js"),__webpack_require__("./node_modules/core-js/modules/web.dom-collections.iterator.js"),__webpack_require__("./node_modules/core-js/modules/es.object.get-own-property-descriptor.js");var _interopRequireDefault=__webpack_require__("./node_modules/@babel/runtime/helpers/interopRequireDefault.js");Object.defineProperty(exports,"__esModule",{value:!0}),exports.resources=exports.default=void 0;var _reactI18next=__webpack_require__("./node_modules/react-i18next/dist/es/index.js"),_i18nextReactNativeLanguageDetector=_interopRequireDefault(__webpack_require__("./node_modules/@os-team/i18next-react-native-language-detector/dist/index.js")),_i18next=_interopRequireDefault(__webpack_require__("./node_modules/i18next/dist/cjs/i18next.js"));function _getRequireWildcardCache(nodeInterop){if("function"!=typeof WeakMap)return null;var cacheBabelInterop=new WeakMap,cacheNodeInterop=new WeakMap;return(_getRequireWildcardCache=function _getRequireWildcardCache(nodeInterop){return nodeInterop?cacheNodeInterop:cacheBabelInterop})(nodeInterop)}var resources={en:{translation:function _interopRequireWildcard(obj,nodeInterop){if(!nodeInterop&&obj&&obj.__esModule)return obj;if(null===obj||"object"!=typeof obj&&"function"!=typeof obj)return{default:obj};var cache=_getRequireWildcardCache(nodeInterop);if(cache&&cache.has(obj))return cache.get(obj);var newObj={},hasPropertyDescriptor=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var key in obj)if("default"!==key&&Object.prototype.hasOwnProperty.call(obj,key)){var desc=hasPropertyDescriptor?Object.getOwnPropertyDescriptor(obj,key):null;desc&&(desc.get||desc.set)?Object.defineProperty(newObj,key,desc):newObj[key]=obj[key]}newObj.default=obj,cache&&cache.set(obj,newObj);return newObj}(__webpack_require__("./src/utils/translation/en.json"))}};exports.resources=resources,"true"!=={}.STORYBOOK_WEB&&_i18next.default.use(_i18nextReactNativeLanguageDetector.default),_i18next.default.use(_reactI18next.initReactI18next).init({resources,keySeparator:!1,fallbackLng:"en",compatibilityJSON:"v3",debug:!0,interpolation:{escapeValue:!1,formatSeparator:","},react:{useSuspense:!0}});var _default=_i18next.default;exports.default=_default},"./src/wrapper.tsx":(__unused_webpack_module,exports,__webpack_require__)=>{__webpack_require__("./node_modules/core-js/modules/es.object.define-property.js");var _interopRequireDefault=__webpack_require__("./node_modules/@babel/runtime/helpers/interopRequireDefault.js");Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=exports.ComponentWrapper=void 0;var _reactI18next=__webpack_require__("./node_modules/react-i18next/dist/es/index.js"),_i18n=(_interopRequireDefault(__webpack_require__("./node_modules/react/index.js")),_interopRequireDefault(__webpack_require__("./src/utils/translation/i18n.ts"))),_jsxRuntime=__webpack_require__("./node_modules/react/jsx-runtime.js");exports.default=null;var ComponentWrapper=function ComponentWrapper(props){return(0,_jsxRuntime.jsx)(_reactI18next.I18nextProvider,{i18n:_i18n.default,children:props?props.children:null})};exports.ComponentWrapper=ComponentWrapper;try{wrapper.displayName="wrapper",wrapper.__docgenInfo={description:"App is null in the wrapper environment--for running as a package within another App",displayName:"wrapper",props:{}}}catch(e){}try{ComponentWrapper.displayName="ComponentWrapper",ComponentWrapper.__docgenInfo={description:"Simple wrapping function for non-visual global component package utilities",displayName:"ComponentWrapper",props:{}}}catch(e){}try{wrapper.displayName="wrapper",wrapper.__docgenInfo={description:"App is null in the wrapper environment--for running as a package within another App",displayName:"wrapper",props:{}}}catch(e){}try{ComponentWrapper.displayName="ComponentWrapper",ComponentWrapper.__docgenInfo={description:"Simple wrapping function for non-visual global component package utilities",displayName:"ComponentWrapper",props:{}}}catch(e){}try{wrapper.displayName="wrapper",wrapper.__docgenInfo={description:"App is null in the wrapper environment--for running as a package within another App",displayName:"wrapper",props:{}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/wrapper.tsx#wrapper"]={docgenInfo:wrapper.__docgenInfo,name:"wrapper",path:"src/wrapper.tsx#wrapper"})}catch(__react_docgen_typescript_loader_error){}try{ComponentWrapper.displayName="ComponentWrapper",ComponentWrapper.__docgenInfo={description:"Simple wrapping function for non-visual global component package utilities",displayName:"ComponentWrapper",props:{}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/wrapper.tsx#ComponentWrapper"]={docgenInfo:ComponentWrapper.__docgenInfo,name:"ComponentWrapper",path:"src/wrapper.tsx#ComponentWrapper"})}catch(__react_docgen_typescript_loader_error){}},"./storybook-init-framework-entry.js":(__unused_webpack_module,__unused_webpack_exports,__webpack_require__)=>{__webpack_require__("./node_modules/@storybook/react/dist/esm/client/index.js")},"./src/components sync recursive ^\\.(?:(?:^%7C\\/%7C(?:(?:(?%21(?:^%7C\\/)\\.).)*?)\\/)(?%21\\.)(?=.)[^/]*?\\.stories\\.(js%7Cjsx%7Cts%7Ctsx))$":(module,__unused_webpack_exports,__webpack_require__)=>{var map={"./SegmentedControl/SegmentedControl.stories.tsx":"./src/components/SegmentedControl/SegmentedControl.stories.tsx"};function webpackContext(req){var id=webpackContextResolve(req);return __webpack_require__(id)}function webpackContextResolve(req){if(!__webpack_require__.o(map,req)){var e=new Error("Cannot find module '"+req+"'");throw e.code="MODULE_NOT_FOUND",e}return map[req]}webpackContext.keys=function webpackContextKeys(){return Object.keys(map)},webpackContext.resolve=webpackContextResolve,module.exports=webpackContext,webpackContext.id="./src/components sync recursive ^\\.(?:(?:^%7C\\/%7C(?:(?:(?%21(?:^%7C\\/)\\.).)*?)\\/)(?%21\\.)(?=.)[^/]*?\\.stories\\.(js%7Cjsx%7Cts%7Ctsx))$"},"./src/components sync recursive ^\\.(?:(?:^%7C\\/%7C(?:(?:(?%21(?:^%7C\\/)\\.).)*?)\\/)(?%21\\.)(?=.)[^/]*?\\.stories\\.mdx)$":module=>{function webpackEmptyContext(req){var e=new Error("Cannot find module '"+req+"'");throw e.code="MODULE_NOT_FOUND",e}webpackEmptyContext.keys=()=>[],webpackEmptyContext.resolve=webpackEmptyContext,webpackEmptyContext.id="./src/components sync recursive ^\\.(?:(?:^%7C\\/%7C(?:(?:(?%21(?:^%7C\\/)\\.).)*?)\\/)(?%21\\.)(?=.)[^/]*?\\.stories\\.mdx)$",module.exports=webpackEmptyContext},"?4f7e":()=>{},"?2145":()=>{},"?2fe4":()=>{},"?7d98":()=>{},"?01a3":()=>{},"?e14e":()=>{},"./generated-stories-entry.cjs":(module,__unused_webpack_exports,__webpack_require__)=>{"use strict";module=__webpack_require__.nmd(module),(0,__webpack_require__("./node_modules/@storybook/react/dist/esm/client/index.js").configure)([__webpack_require__("./src/components sync recursive ^\\.(?:(?:^%7C\\/%7C(?:(?:(?%21(?:^%7C\\/)\\.).)*?)\\/)(?%21\\.)(?=.)[^/]*?\\.stories\\.mdx)$"),__webpack_require__("./src/components sync recursive ^\\.(?:(?:^%7C\\/%7C(?:(?:(?%21(?:^%7C\\/)\\.).)*?)\\/)(?%21\\.)(?=.)[^/]*?\\.stories\\.(js%7Cjsx%7Cts%7Ctsx))$")],module,!1)},"./src/utils/translation/en.json":module=>{"use strict";module.exports=JSON.parse('{"listPosition":"{{position}} of {{total}}"}')}},__webpack_require__=>{var __webpack_exec__=moduleId=>__webpack_require__(__webpack_require__.s=moduleId);__webpack_require__.O(0,[439],(()=>(__webpack_exec__("./node_modules/@storybook/core-server/node_modules/@storybook/core-client/dist/esm/globals/polyfills.js"),__webpack_exec__("./node_modules/@storybook/core-server/node_modules/@storybook/core-client/dist/esm/globals/globals.js"),__webpack_exec__("./storybook-init-framework-entry.js"),__webpack_exec__("./node_modules/@storybook/react/dist/esm/client/docs/config-generated-config-entry.js"),__webpack_exec__("./node_modules/@storybook/react/dist/esm/client/preview/config-generated-config-entry.js"),__webpack_exec__("./node_modules/@storybook/addon-links/preview.js-generated-config-entry.js"),__webpack_exec__("./node_modules/@storybook/addon-docs/preview.js-generated-config-entry.js"),__webpack_exec__("./node_modules/@storybook/addon-actions/preview.js-generated-config-entry.js"),__webpack_exec__("./node_modules/@storybook/addon-backgrounds/preview.js-generated-config-entry.js"),__webpack_exec__("./node_modules/@storybook/addon-measure/preview.js-generated-config-entry.js"),__webpack_exec__("./node_modules/@storybook/addon-outline/preview.js-generated-config-entry.js"),__webpack_exec__("./.storybook/web/preview.ts-generated-config-entry.js"),__webpack_exec__("./generated-stories-entry.cjs"))));__webpack_require__.O()}]);